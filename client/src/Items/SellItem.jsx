import { useState } from "react";

const Sellitems = () => {
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
    <div className="flex flex-col justify-center items-center bg-blue-500 rounded-lg shadow-2xl text-black text-2xl font-bold p-10 m-10">
      <h1 className="text-4xl font-bold mb-10">
        Post an Item for Sale
      </h1>
      <form onSubmit={(e) => {
            e.preventDefault();
            handlesubmit(e);
          }}
        className="
            flex flex-col
            justify-center items-center
            w-1/2
            "
      >
        <label>Item Name</label>
        <input
          type="text"
          name="itemname"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
        />
        <label>Item Price</label>
        <input
          type="text"
          name="itemprice"
          placeholder="Item Price"
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <label>Item Description</label>
        <input
          type="text"
          name="itemdescription"
          placeholder="Item Description"
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <label>Item Image</label>
        <input
          type="text"
          name="itemimage"
          placeholder="Item Image"
          onChange={(e) => setItemImage(e.target.value)}
        />
        <label>Item Category</label>
        <input
          type="text"
          name="itemcategory"
          placeholder="Item Category"
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <label>Inventory Count</label>
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
};

export default Sellitems;
