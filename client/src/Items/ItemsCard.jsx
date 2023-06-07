import React, { useState, useEffect } from "react";
import Reviews from "./Reviews";
import Cart from "../Login/Cart";

function ItemsCard({ item }) {
  const [cardFlip, setCardFlip] = useState(false)
  const [addItem, setAddItem] = useState([])

  function handleReview(){
    setCardFlip((cardFlip) => !cardFlip)
  }

  function handleAddItem(newItem){
    setAddItem([...addItem, newItem])
  }

  return (
    <div className='w-64 rounded-lg bg-slate-600 shadow-2xl dark:bg-neutral-700 grid grid-cols-3 content-stretch'>
      <button>
        <img src={item.image} alt={item.name} className="rounded-t-lg" onClick={handleReview}/>
        <h2 className="mb-2 text-xl font-medium leading-tight text-slate-400 ">{item.name}</h2>
        <h3 className="mb-2 text-lg font-medium leading-tight text-slate-400">${item.price}</h3>
        <p className="mb-2">Available Amount: {item.inventory_count}</p>
        {cardFlip ? <Reviews item={item}/> : null}
      </button>
      <button onClick={handleAddItem}>
        <h1>Add to Cart</h1>
          {<Cart />}
      </button>
    </div>
  );
}

export default ItemsCard;
