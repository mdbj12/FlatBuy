from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Consumer(db.Model, SerializerMixin):
    __tablename__ = 'consumer'

    id = db.Column(db.Integer, primaryKey=True)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)    
    address = db.Column(db.String)
    card_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    pass

class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendor'

    id = db.Column(db.Integer, primaryKey=True)
    name = db.Column(db.String)

    pass

class Items(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primaryKey=True)
    name = db.Column(db.String)
    inventory_count = db.Column(db.Integer)
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('inventory_count')
    def validate_inventory(self, key, inventory_count):
        if inventory_count > 0:
            return inventory_count
        raise ValueError('No Existing Inventory')
    pass

class Purchase(db.Model, SerializerMixin):
    __tablename__ = 'purchase'

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumer.id'))
    consumer = db.relationship('Consumer', backref='purchase')
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    item = db.relationship('Items', backref='purchase')
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    passh