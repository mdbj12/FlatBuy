from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import Consumer, Items, Cart, CartItem, Rating, db


with app.app_context():

    Consumer.query.delete()
    Items.query.delete()
    Cart.query.delete()
    CartItem.query.delete()
    Rating.query.delete()

    test_user = Consumer(username='test_user', password='test_password', email='test_email', first_name='test_first_name', last_name='test_last_name', address='test_address', phone_number='test_phone_number')
    test_item = Items(name='test_item', price='test_price', description='test_description', image='test_image')
    test_cart = Cart(user_id='test_user_id')
    test_cart_item = CartItem(cart_id='test_cart_id', item_id='test_item_id', quantity=3)
    test_rating = Rating(user_id='test_user_id', item_id='test_item_id', rate_score=5)

    db.session.add(test_user)
    db.session.add(test_item)
    db.session.add(test_cart)
    db.session.add(test_cart_item)
    db.session.add(test_rating)

    db.session.commit()

    print('Database seeded!')
    
