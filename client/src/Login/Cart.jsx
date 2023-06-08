import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";

const Cart = ({userData}) => {
    const [inCart, setInCart] = useState([]);
    console.log(userData)

    useEffect(() => {
        fetch(`http://127.0.0.1:5556/cart/${userData.id}`)
            .then((r) => r.json())
            .then((data) => {
                setInCart(data);
            });
    }, []);
    console.log(inCart)

    const handledelete = (id) => {
        const deleteItem = inCart.filter((item) => item.id !== id);
        setInCart(deleteItem); 
    };

    const cartItems = inCart.map((items) => {
        return <CartCard carditem={items.item} quantity={items.quantity} userData={userData} deleteit={handledelete}/>
    })

    return (
        <div>
            {cartItems}
        </div>
    )
}

export default Cart