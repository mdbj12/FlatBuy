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


  const handledelete = (id) => {
    const deleteItem = inCart.filter((item) => item.id !== id);
    setInCart(deleteItem); 
  };
    
  
  const cartItems = inCart.map((items) => {
    return <CardCard  carditem={items.item} quantity={items.quantity} userData={userData} deleteit={handledelete} ></CardCard>
  })

  let cartTotal = inCart.map((items) => {
    return items.item.price * items.quantity
  })
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',});

    cartTotal = formatter.format(cartTotal.reduce((a, b) => a + b, 0));

  console.log(cartItems.price)
    // Render your cart items here using the 'inCart' state
    return (
<section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <header class="text-center">
        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
      </header>
      <div class="mt-8">
        <ul class="space-y-4">
          {cartItems}
        </ul>

        <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div class="w-screen max-w-lg space-y-4">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between">
              </div>

              <div class="flex justify-between">
      
              </div>

              <div class="flex justify-between">
               
              </div>

              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>{cartTotal}</dd>
              </div>
            </dl>

            <div class="flex justify-end">
              <span
                class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

                <p class="whitespace-nowrap text-xs">0 Discounts Applied</p>
              </span>
            </div>

            <div class="flex justify-end">
              <a
                href="#"
                class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  }


export default Cart