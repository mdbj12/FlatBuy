import React, { useState } from "react";

const CartCard = ({carditem, quantity, userData, deleteit}) => {
  const [displayQuantity, setDisplayQuantity] = useState(quantity)

    const handleRemoveFromCart = () => {
      console.log("clicked");
      fetch(`http://127.0.0.1:5556/cart/${userData.id}/${carditem.id}`
      , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consumer_id: userData.id,
          item_id: carditem.id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setDisplayQuantity(displayQuantity -1)
        });
    };
    return (
      <div className = {displayQuantity > 0 ? "flex justify-center" : 'hidden' }>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={carditem.image} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{carditem.name}</div>
            <p className="text-gray-700 text-base">
              {carditem.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className=' inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>Qty {displayQuantity}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${carditem.price}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{carditem.category}</span>
            <button onClick={handleRemoveFromCart} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button'>Remove from cart</button>
          </div>
        </div>
      </div>
    )
}

export default CartCard