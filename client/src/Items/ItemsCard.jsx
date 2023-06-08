import React, { useState, useEffect } from "react";
import Reviews from "./Reviews";

function ItemsCard({ item }) {
  const [cardFlip, setCardFlip] = useState(false)
  const [addItem, setAddItem] = useState([])
  const [addReview, setAddReview] = useState([])

  function handleReview(){
    setCardFlip((cardFlip) => !cardFlip)
  }

  function writeReview(newReview){
    setAddReview([...addReview, newReview])
    console.log('clicked')
  }

  function handleAddItem(newItem){
    setAddItem([...addItem, newItem])
    console.log('clicked')
  }

//   function handleClick(){
//     fetch(`/rating/${item.id}`, {
//       method: 'POST',
//       headers: {'Content-Type' : 'application/json'},
//         body: JSON.stringify({
//             comment: comment,
//             rating: rating,
//             consumer_id:
//         })
//     })
//     .then((r) => r.json())
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })
//  }

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
        {cardFlip ? <Reviews item={item} writeReview={writeReview} /> : null}
      </button>
      <button onClick={writeReview}>
        <h1>Leave a review</h1>
      </button>
      <button onClick={handleAddItem}>
        <h1>Add to Cart</h1>
      </button>
    </div>
  );
}

export default ItemsCard;
