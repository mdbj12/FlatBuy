from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Consumer(db.Model, SerializerMixin):
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    rating = db.relationship('Rating', backref='consumer')
    cart = db.relationship('Cart', backref='consumer')

    serialize_rules = ( '-rating', '-cart', '-cart_items')

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    cart_items = db.relationship('CartItem', backref='cart')
    items = association_proxy('cart_items', 'item')

    serialize_rules = ('-cart_items', '-consumer')
    
class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    items = association_proxy('item', 'name')

class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    rate_score = db.Column(db.Integer)
    comment = db.Column(db.String)
    items = association_proxy('item', 'name')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_only = ('rate_score', 'comment', 'items', 'user_id', 'item_id', 'id', 'created_at', 'updated_at', 'consumer')


class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    inventory_count = db.Column(db.Integer)
    price = db.Column(db.Float)
    category = db.Column(db.String)
    description = db.Column(db.String)
    rating = db.relationship('Rating', backref='item')
    image = db.Column(db.String)
    cart_items = db.relationship('CartItem', backref='item')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-cart_items', '-rating')

    @validates('category')
    def validate_category(self, key, category):
        if category not in ['shirts', 'shoes', 'pants', 'accessories']:
            raise ValueError("Invalid category")
        return category

    @validates('inventory_count')
    def validate_inventory_count(self, key, inventory_count):
        if inventory_count < 0:
            raise ValueError("Invalid inventory count")
        return inventory_count

    @validates('price')
    def validate_price(self, key, price):
        if price < 0:
            raise ValueError("Invalid price")
        return price
    
    @validates('name')
    def validate_name(self, key, name):
        if len(name) < 1:
            raise ValueError("Invalid name")
        return name