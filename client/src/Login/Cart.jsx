import React, { useEffect, useState } from "react";

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
    
    return (
        <div>
            <h1>
                Test
            </h1>
        </div>
    )
}

export default Cart