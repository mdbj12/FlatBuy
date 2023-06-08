import React, { useEffect, useState } from "react";
import CardCard from "./CardCard";

const Cart = ({userData}) => {
    const [inCart, setInCart] = useState([]);

   useEffect(() => {
    fetch(`http://127.0.0.1:5556/cart/${userData.id}`)
      .then((res) => res.json())
      .then((data) => {
        setInCart(data);
      });
  }, []);
  
  const cartItems = inCart.map((items) => {
    return <CardCard  carditem={items.item} quantity={items.quantity} userData={userData} ></CardCard>
  })

  console.log(cartItems.price)
    // Render your cart items here using the 'inCart' state
    return (
      <div>
        {cartItems}
      </div>
    );
  }


export default Cart