from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import Consumer, Item, Cart, CartItem, Rating, db


with app.app_context():

    Consumer.query.delete()
    Item.query.delete()
    Cart.query.delete()
    CartItem.query.delete()
    Rating.query.delete()

    test_user = Consumer(username='lunar', password='123456', email='clifga@gmail.com', first_name='clifton', last_name='gockul', address='11 broadway', phone_number='123456')
    db.session.add(test_user)
    db.session.commit()
    
    test_item1 = Item(name='Flat White Tee', price=20, description='Code in style!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=30, category='shirts')
    test_item2 = Item(name='Flat Olive Tee', price=20, description='Code in style!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=30, category='shirts')
    test_item3 = Item(name='Flat Black Tee', price=20, description='Code in style!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=30, category='shirts')
    db.session.add(test_item1)
    db.session.add(test_item2)
    db.session.add(test_item3)
    db.session.commit()
    
    test_cart = Cart(user_id=test_user.id)
    db.session.add(test_cart)
    db.session.commit()
    
    test_cart_item = CartItem(cart_id=test_cart.id, item_id=test_item1.id, quantity=3)
    db.session.add(test_cart_item)
    db.session.commit()
    
    test_rating = Rating(user_id=test_user.id, item_id=test_item1.id, rate_score=5)
    db.session.add(test_rating)
    db.session.commit()

    print('Database seeded!')
    
