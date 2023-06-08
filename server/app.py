import os
import pathlib
import requests
from flask import Flask, session, abort, redirect, request, jsonify , url_for
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, Consumer, Item, Cart, CartItem, Rating
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import json
import urllib.parse

app = Flask(__name__)
CORS(app)
app.secret_key = "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"  # make sure this matches with what's in client_secret.json
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # to allow HTTP traffic for local dev

GOOGLE_CLIENT_ID = "557494592758-jfirv2i2cpb2dq3hved78ajtuctjvjnu.apps.googleusercontent.com"
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
    user = Consumer.query.filter_by(email=session["email"]).first()
    if user:
        user_data = {
            "id": user.id,
            "name": session["name"],
            "email": session["email"]
        }
        
        session_data = urllib.parse.quote(json.dumps(user_data))
        redirect_url = "http://localhost:3000/?session_data=" + session_data
        return redirect(redirect_url)
    else:
        return jsonify({"error": "User not found"})

class Get_Items(Resource):
    def get(self):
        try:
            items = Item.query.all()
            return [item.to_dict() for item in items], 200
        except:
            return {'message': 'No items found'}, 404
    def post(self):
        item = Item(name=request.json['name'], price=request.json['price'], description=request.json['description'], image=request.json['image']
        ,category=request.json['category'], inventory_count=request.json['inventory_count'])
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
api.add_resource(Get_Items, '/items')

class Get_Item_By_ID(Resource):
    @login_is_required
    def get(self, item_id):
        try :
            item = Item.query.filter_by(id=item_id).first()
            return item.to_dict(), 200
        except:
            return {'message': 'No item found'}, 404
    
    def patch(self, item_id):
        try:
            data = request.json
            item = Item.query.filter_by(id=item_id).first()

            for attr in data:
                setattr(item, attr, data[attr])

            db.session.add(item)
            db.session.commit()
            return item.to_dict(), 200
        except:
            return {'message': 'No item found'}, 404
        
api.add_resource(Get_Item_By_ID, '/items/<int:item_id>')

class Get_Cart_by_consumer(Resource):
    def get(self, consumer_id):
        try:
            cart = Cart.query.filter_by(user_id=consumer_id).first()
            cartitem = CartItem.query.filter_by(cart_id=cart.id).all()
            return [item.to_dict() for item in cartitem] , 200
        except: 
            return {'message': 'No cart found'} , 404
        
api.add_resource(Get_Cart_by_consumer, '/cart/<int:consumer_id>')

class Add_to_Cart(Resource):
    def post(self ,consumer_id, item_id):
        try:
            cart = Cart.query.filter_by(user_id=consumer_id).first()
            if not cart:
                cart = Cart(user_id=consumer_id)
                db.session.add(cart)
                db.session.commit()
            cartitem = CartItem.query.filter_by(cart_id=cart.id, item_id=item_id).first()
            if not cartitem:
                cartitem = CartItem(cart_id=cart.id, item_id=item_id, quantity=1)
                db.session.add(cartitem)
                db.session.commit()
            else:
                cartitem.quantity += 1
                db.session.add(cartitem)
                db.session.commit()
            return cartitem.to_dict() , 200
        except:
            return {'message': 'No cart found'} , 404
        
    def delete(self, consumer_id, item_id):
        try:
            cart = Cart.query.filter_by(user_id=consumer_id).first()
            cartitem = CartItem.query.filter_by(cart_id=cart.id, item_id=item_id).first()
            if cartitem.quantity == 1:
                db.session.delete(cartitem)
                db.session.commit()
            else:
                cartitem.quantity -= 1
                db.session.add(cartitem)
                db.session.commit()
            return cartitem.to_dict(), 200
        except:
            return {'message': 'No cart found'} , 404
        
api.add_resource(Add_to_Cart, '/cart/<int:consumer_id>/<int:item_id>')

class Get_Rating(Resource):
    def get(self, item_id):
        try:
            rating = Rating.query.filter_by(item_id=item_id).all()
            return [rate.to_dict() for rate in rating], 200
        except:
            return {'message': 'No rating found'}, 404
    def post(self, item_id):
        try:
            ratings = Rating.query.filter_by(item_id=item_id).all()
            comment = request.json['comment']
            rating = request.json['rate_score']
            consumer_id = request.json['consumer_id']
            for rate in ratings:
                if rate.consumer_id == consumer_id:
                    return {'message': 'You have already rated this item'}
            new_rating = Rating(item_id=item_id, comment=comment, rate_score=rating, consumer_id=consumer_id)
            db.session.add(new_rating)
            db.session.commit()
            return new_rating.to_dict(), 200
        except:
            return {'message': 'No rating found'}, 404
api.add_resource(Get_Rating, '/rating/<int:item_id>')



if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5556, debug=True)