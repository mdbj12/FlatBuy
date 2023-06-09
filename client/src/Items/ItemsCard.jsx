import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Reviews from "./Reviews";

function ItemsCard({ item, userData }) {
  const [cardFlip, setCardFlip] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [itemRating, setItemRating] = useState('')
  const [itemComment, setItemComment] = useState('')
  // const [addItem, setAddItem] = useState([])

  const handleSubmitReview = (e) => {
    console.log(itemRating, itemComment, userData, item.id)

    fetch(`http://127.0.0.1:5556/rating/${item.id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            rate_score: itemRating,
            comment: itemComment,
            user_id: userData.id
        })
    })
    .then((r) => r.json())
    .then((data) => {
        console.log(data)
    })
  }

  const handleAddItem = () => {
    console.log('clicked')
    fetch(`http://127.0.0.1:5556/cart/${userData.id}/${item.id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify({
        consumer_id: userData.id,
        item_id: item.id
      })
    })
    .then(r => r.json())
    .then((data) => {
      console.log(data)
    })
  }

  function handleReview(){
    setCardFlip((cardFlip) => !cardFlip)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
    console.log('clicked')
  }

  const submitReview = (e) => {
    e.preventDefault()
    // console.log(reviewInput)
    handleSubmitReview(e)
    toggleModal()
  }

  return (
    <li className="grid">
      <button>
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 rounded object-cover"
        />
        <h2 onClick={handleReview} className="text-sm text-gray-900">{item.name}</h2>
        <h3 className="text-sm text-gray-900">${item.price}</h3>
        <p className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">Available Amount: {item.inventory_count}</p>
        {cardFlip ? <Reviews item={item} /> : null}
      </button>
      <br></br>
      <button onClick={handleAddItem} className="text-gray-900 transition hover:bg-green-400 rounded">
        <h1>Add to Cart</h1>
      </button>
      <div>
        <button onClick={toggleModal} className='text-gray-900 transition hover:bg-amber-300 rounded' > Write Review </button>
      </div>
        {
          <div>
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="Form Popup"
              ariaHideApp={false}
              className=''>
              <form onSubmit={submitReview}>
                <label className="flex">Rating</label>
                <br></br>
                <input
                  type="number"
                  name="itemRating"
                  placeholder="Rate out of 5!"
                  onChange={(e) => setItemRating(e.target.value)}
                  className='rounded shadow-lg px-16 flex'
                />
                <br></br>
                <label className="flex">Comments</label>
                <br></br>
                <input
                  type="text"
                  name='itemComment'
                  placeholder="What did you think?"
                  onChange={(e) => setItemComment(e.target.value)}
                  className="rounded shadow-lg px-16 py-2 flex"
                />
                <br></br>
                <button type="submit" className="text-center px-28 py-6 hover:bg-blue-200 font-bold rounded flex">Submit</button>
                <br></br>
                <button type="button" onClick={toggleModal} className="text-center px-28 py-6 hover:bg-red-200 font-bold rounded flex">Cancel</button>
              </form>
            </Modal>
          </div>
        }
    </li>
  );
}

export default ItemsCard;
