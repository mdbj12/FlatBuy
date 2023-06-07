This is our {insert name}, it is an e-commerce app!

FUNTIONALITY:
- As a User(Consumer), you will be able to add items to cart, remove from cart, get multiple items at once
- As a Vendor, you will be able to create new items to sell, Add/Remove Inventory, Submit photos for items

STRETCH GOALS:
- We shall see lmfao

Created by Michael Jeung, Cliff Gokul, Michael Maurer, Queena Feng

Routes
/items
- get all items

/items/<int:item_id>
- get item by id
- patch item by id

/cart/<int:consumer_id>
- get cart by id

/cart/<int:consumer_id>/<int:item_id>
- add item to cart by consumer_id and item_id not sure if this works
- remove item from cart by consumer_id and item_id not sure if this works

/rating/<int:item_id>
- get rating by item_id
- get comment by item_id
- post rating by item_id
- post comment by item_id


grab the current logged in user from the logged in session
const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('/protected_area')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, []);

Back-End Commands
- export FLASK_APP=app.py
- export FLASK_RUN_PORT=5555
- flask db init
- flask db revision --autogenerate -m "test"
- flask db upgrade head
- pipenv install && pipenv shell
- python app.py (to start flask server)

Starting both server and client model
- honcho start -f Procfile.dev