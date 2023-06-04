from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Consumer(db.Model, SerializerMixin):
    __tablename__ = 'comsumer'

    id = db.Column(db.Integer, primaryKey=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
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

    @validates('inventory_count')
    def validate_inventory(self, key, inventory_count):
        if inventory_count > 0:
            return inventory_count
        raise ValueError('No Existing Inventory')
    pass