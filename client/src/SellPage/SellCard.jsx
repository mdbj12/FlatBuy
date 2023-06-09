import { useState } from "react";

const SellCard = ({carditem , quantity}) => {
  const [itemname, setItemName] = useState("");
  const [itemprice, setItemPrice] = useState("");
  const [itemdescription, setItemDescription] = useState("");
  const [itemimage, setItemImage] = useState("");
  const [itemcategory, setItemCategory] = useState("");
  const [inventory_count, setInventoryCount] = useState("");
 
  const handlesubmit = (e) => {
    
    console.log(itemname, itemprice, itemdescription, itemimage, itemcategory);
    fetch("http://127.0.0.1:5556/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemname,
        price: itemprice,
        description: itemdescription,
        image: itemimage,
        category: itemcategory,
        inventory_count: inventory_count,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-16 object-contain"
    >
      <h1
        className="
            text-4xl
            font-bold
            mb-10
        "
      >
        New Item
      </h1>
      <form onSubmit={(e) => {
            e.preventDefault();
            handlesubmit(e);
          }}
        className="
            flex flex-col
            justify-center items-center
            p-4
            accent-black
            bg-white 
            shadow-md 
            rounded 
            px-8 
            pt-6 
            pb-8 
            mb-4
            "
      >
        <input
          className="green-300"
          type="text"
          name="itemname"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          name="itemprice"
          placeholder="Item Price"
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <input
          type="text"
          name="itemdescription"
          placeholder="Item Description"
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input
          type="text"
          name="itemimage"
          placeholder="Item Image"
          onChange={(e) => setItemImage(e.target.value)}
        />
        <input
          type="text"
          name="itemcategory"
          placeholder="Item Category"
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="text"
          name="inventory_count"
          placeholder="Inventory Count"
          onChange={(e) => setInventoryCount(e.target.value)}
        />
        <button
          className="bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2 px-4
            rounded-full
            mt-10"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SellCard