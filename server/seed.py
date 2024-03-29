from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import Consumer, Item, Cart, CartItem, Rating, db


with app.app_context():

    # Item.query.delete()
    # Cart.query.delete()
    # CartItem.query.delete()
    # Rating.query.delete()
    # db.session.commit()
    
    test_item1 = Item(name='Flat White Tee', price=20, description='Code in style!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=30, category='shirts')
    test_item2 = Item(name='Flat Pants', price=250, description='smiley face XD', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=10, category='pants')
    test_item3 = Item(name='Flatty Belt', price=25, description='Sheeesh', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=100, category='accessories')
    test_item4 = Item(name='Fluccies', price=200, description='Drip!', image='https://www.uniandjack.co.uk/wp-content/uploads/2018/04/Maxomorra-organic-short-sleeve-red-t-shirt.jpg', inventory_count=5, category='shoes')
    test_item5 = Item(name='Michaels vape', price=69420, description='Michael is a vape god', image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fvape-pod&psig=AOvVaw3rKNY1tKDfgaNYdQW5y8ai&ust=1686415800250000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDsiMjStv8CFQAAAAAdAAAAABAE', inventory_count=1, category='misc')
    test_item6 = Item(name='50 Shades of Yinson', price=1, description='This is the whole series of Yinson', image='./images/yinson.JPG', inventory_count=1, category='books')
    test_item7 = Item(name='laptop', price='1500', description='only used for vscode', image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wired.com%2Freview%2Fapple-macbook-air-2018%2F&psig=AOvVaw3qvMCt-WOWmJDXTBGWE1nq&ust=1686416070813000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjM0MjTtv8CFQAAAAAdAAAAABAE', inventory_count=100, category='device')

    db.session.add(test_item1)
    db.session.add(test_item2)
    db.session.add(test_item3)
    db.session.add(test_item4)
    db.session.add(test_item5)
    db.session.add(test_item6)
    db.session.add(test_item7)
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

    test_rating1 = Rating(user_id=testcustomer.id, item_id=test_item1.id, rate_score=5, comment='This is a test comment')
    test_rating2 = Rating(user_id=testcustomer.id, item_id=test_item2.id, rate_score=4 ,comment='this is awesome')
    test_rating3 = Rating(user_id=testcustomer.id, item_id=test_item3.id, rate_score=3 ,comment='this is awesome')
    test_rating4 = Rating(user_id=testcustomer2.id, item_id=test_item1.id, rate_score=2 ,comment='I hate this')

    db.session.add(test_rating1)
    db.session.add(test_rating2)
    db.session.add(test_rating3)
    db.session.add(test_rating4)
    db.session.commit()