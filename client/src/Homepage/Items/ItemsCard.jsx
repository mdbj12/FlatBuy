import React, { useState, useEffect } from "react";

function ItemsCard({ item }) {
  // when item is clicked, this information should popup in another window
  // add this functionality piece later
const [reviews, setReviews] = useState([])
useEffect(() => {
  fetch(`http://127.0.0.1:5556/rating/${item.id}`)
      .then((r) => r.json())
      .then((data) => {
          setReviews(data)
          console.log(data)
      });
}, []);

 const single_review = reviews.map(r => {
  return <div key={r.id}>
          <p>{r.comment}</p>
          <p>{r.rate_score}</p>
        </div>
 })

  return (
    <div className='w-96'>
      <img src={item.image} alt={item.name} className='w-full'/>
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <p>Available Amount: {item.inventory_count}</p>
      <p>{item.description}</p>
      {single_review}
    </div>
  );
}

export default ItemsCard;
