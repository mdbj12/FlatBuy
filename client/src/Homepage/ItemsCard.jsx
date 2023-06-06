import React from "react";
// import ItemsList from "./ItemsList";

function ItemsCard({ item }) {
  // console.log(item)
  return (
    <li className="cards">
      <img src={item.image} alt={item.image} />
      <h4> {item.description} </h4>
      <p>Price: {item.price} </p>
    </li>
  );
}

export default ItemsCard;
