This is our {insert name}, it is an e-commerce app!

FUNTIONALITY:
- As a User(Consumer), you will be able to add items to cart, remove from cart, get multiple items at once
- As a Vendor, you will be able to create new items to sell, Add/Remove Inventory, Submit photos for items

STRETCH GOALS:
- We shall see lmfao

Created by Michael Jeung, Cliff Gokul, Michael Maurer, Queena Feng

export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
flask db init
flask db revision --autogenerate -m "test"
flask db upgrade head
