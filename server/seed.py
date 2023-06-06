from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import Consumer, Item, Cart, CartItem, Rating, db


with app.app_context():

   
    Item.query.delete()
    Cart.query.delete()
    CartItem.query.delete()
    Rating.query.delete()
    db.session.commit()

    
    test_item1 = Item(name='Flat White Tee', price=20, description='Code in style!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=30, category='shirts')
    test_item2 = Item(name='Flat Pants', price=250, description='smiley face XD', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=10, category='pants')
    test_item3 = Item(name='Flatty Belt', price=25, description='Sheeesh', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=100, category='accessories')
    test_item4 = Item(name='Fluccies', price=200, description='Drip!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=5, category='shoes')
    db.session.add(test_item1)
    db.session.add(test_item2)
    db.session.add(test_item3)
    db.session.add(test_item4)
    db.session.commit()

    testcustomer = Consumer.query.filter_by(id=1).first()
    testcustomer2 = Consumer.query.filter_by(id=2).first()
    test_cart1 = Cart(user_id=testcustomer.id)
    test_cart2 = Cart(user_id=testcustomer2.id)
    db.session.add(test_cart1)
    db.session.add(test_cart2)
    db.session.commit()

    test_cart_item1 = CartItem(cart_id=test_cart1.id, item_id=test_item1.id, quantity=1)
    test_cart_item2 = CartItem(cart_id=test_cart1.id, item_id=test_item2.id, quantity=2)
    test_cart_item3 = CartItem(cart_id=test_cart1.id, item_id=test_item3.id, quantity=3)
    test_cart_item4 = CartItem(cart_id=test_cart2.id, item_id=test_item4.id, quantity=4)
    db.session.add(test_cart_item1)
    db.session.add(test_cart_item2)
    db.session.add(test_cart_item3)
    db.session.add(test_cart_item4)
    db.session.commit()


    # print('Database seeded!')
    
