import os
import pathlib
import requests
from flask import Flask, session, abort, redirect, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Consumer, Item, Cart, CartItem
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests


app = Flask(__name__)
app.secret_key = ""  # make sure this matches with what's in client_secret.json
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # to allow HTTP traffic for local dev

GOOGLE_CLIENT_ID = ""
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5556/callback"
)

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function(*args, **kwargs)

    return wrapper

@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    try:
        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=0
        )
        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")
        session["email"] = id_info.get("email")
        if not Consumer.query.filter_by(email=session["email"]).first():
            new_consumer = Consumer(name=session['name'], email=session['email'])
            db.session.add(new_consumer)
            db.session.commit()
        return redirect("/protected_area")
    except google.auth.exceptions.InvalidValue as e:
        print("Token validation error:", e)
        return "Token validation error. Please try again later."
    except Exception as e:
        print("An error occurred during token verification:", e)
        return "An error occurred during token verification. Please try again."

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"

@app.route("/protected_area")   
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"

class Get_Items(Resource):
    def get(self):
        items = Item.query.all()
        return [item.to_dict() for item in items]
api.add_resource(Get_Items, '/items')

class Get_Cart_by_consumer(Resource):
    def get(self, consumer_id):
        try:
            cart = Cart.query.filter_by(user_id=consumer_id).first()
            cartitem = CartItem.query.filter_by(cart_id=cart.id).all()
            return [item.to_dict() for item in cartitem]
        except: 
            return {'message': 'No cart found'}
        
api.add_resource(Get_Cart_by_consumer, '/cart/<int:consumer_id>')


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5556, debug=True)
