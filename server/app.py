from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Consumer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

@app.route('/')
def index():
    return '<h1>HOMEPAGE</h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = Consumer.query.filter_by(username=username).first()
        if user is None:
            return make_response(jsonify({'error': 'User not found'}), 404)
        if user.password != password:
            return make_response(jsonify({'error': 'Invalid password'}), 401)
        return make_response(jsonify({'message': 'Login successful'}), 200)
api.add_resource(Login, '/login')

class Create_User(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        address = data['address']
        phone_number = data['phone_number']
        user = Consumer.query.filter_by(username=username).first()
        if user is not None:
            return make_response(jsonify({'error': 'Username already exists'}), 409)
        user = Consumer(
            username=username, 
            password=password, 
            email=email, 
            first_name=first_name, 
            last_name=last_name, 
            address=address, 
            card_number=card_number
        )
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'User created'}), 201)
api.add_resource(Create_User, '/create_user')

class Create_Cart(Resource):
    items = []
    def post(self):
        data = request.get_json()
        user_id = data['user_id']
        created_at = data['created_at']
        updated_at = data['updated_at']
        cart_items = data['cart_items']
        new_cart = Cart(
            created_at = created_at,
            updated_at = updated_at,
            cart_items = cart_items,
            user_id = user_id
        )
        db.session.add(new_cart)
        db.session.commit()
        return make_response(jsonify({'message': "cart created"}), 201)
api.add_resource(Create_Cart, '/create_cart')

class Update_Cart(Resource, Id):
    def patch(self, id):
        cart_update = Cart.query.filter_by(id=id).first().to_dict()
        data = request.get_json()
        for attr in data:
            setattr(cart_update, attr, data[attr])
        db.session.add(cart_update)
        db.session.commit()
        return make_response(jsonify({'message': 'success, cart updated'}))
api.add_resource(Update_Cart, '/update_cart/<int:id>')
        