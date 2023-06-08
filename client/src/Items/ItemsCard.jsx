import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Reviews from "./Reviews";

function ItemsCard({ item, userData }) {
  const [cardFlip, setCardFlip] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [itemRating, setItemRating] = useState('')
  const [itemComment, setItemComment] = useState('')
  const [addItem, setAddItem] = useState([])

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
            consumer_id: userData.id,
            // item_id: item.id
        })
    })
    .then((r) => r.json())
    .then((data) => {
        console.log(data)
    })
  }

  function handleReview(){
    setCardFlip((cardFlip) => !cardFlip)
  }

  function handleAddItem(newItem){
    setAddItem([...addItem, newItem])
    console.log('clicked')
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
    <div className='w-64 rounded-lg bg-slate-600 shadow-2xl dark:bg-neutral-700 grid grid-cols-3 content-stretch'>
      <button>
        <img
          src={item.image}
          alt={item.name}
          onClick={handleReview}
          className="rounded-t-lg row-span-1"
        />
        <h2 className="mb-2 text-xl font-medium leading-tight text-slate-400">{item.name}</h2>
        <h3 className="mb-2 text-lg font-medium leading-tight text-slate-400">${item.price}</h3>
        <p className="mb-2">Available Amount: {item.inventory_count}</p>
        {cardFlip ? <Reviews item={item} /> : null}
      </button>
      <button onClick={handleAddItem}>
        <h1>Add to Cart</h1>
      </button>
      <button onClick={toggleModal} > Write Review </button>
        {
          <div>
            <h1>Write Review</h1>
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="Form Popup"
              ariaHideApp={false} >
              <form onSubmit={submitReview}>
                <label>Rating</label>
                <br></br>
                <input
                  type="number"
                  name="itemRating"
                  placeholder="Rate out of 5!"
                  onChange={(e) => setItemRating(e.target.value)}
                />
                <br></br>
                <label>Comments</label>
                <br></br>
                <input
                  type="text"
                  name='itemComment'
                  placeholder="What did you think?"
                  onChange={(e) => setItemComment(e.target.value)}
                />
                <br></br>
                <button type="submit">Submit</button>
                <br></br>
                <button type="button" onClick={toggleModal}>Cancel</button>
              </form>
            </Modal>
          </div>
        }
    </div>
  );
}

export default ItemsCard;
