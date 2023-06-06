import React from "react";

function ItemsCard({ item }) {
  return (
    <li className="w-0">
      <img src={item.image} alt={item.name} className='w-2'/>
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <p>Available Amount: {item.inventory_count}</p>
      <p>{item.description}</p>
    </li>
  );
}

export default ItemsCard;
