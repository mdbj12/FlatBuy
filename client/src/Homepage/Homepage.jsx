import React, { useEffect, useState } from "react";
import ItemsList from "./Items/ItemsList";
import SearchBar from "./SearchBar/Searchbar";

const Homepage = () => {
  // fetching item data
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
   // Initialize state to null  
  function handleSearch(input) {
    setSearchInput(input);
  }
  useEffect(() => {
    fetch("http://127.0.0.1:5556/items")
    .then((r) => r.json())
    .then((data) => {
      setItems(data);
    });
  }, []);
  
  const filterItems = items.filter((item) => {
    return item.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  
  return (
    <>
      <h1
        className="text-center text-5xl "
        style={{
          color: "#F59E0B",
          fontFamily: "Roboto",
          fontWeight: "bold",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        THE FLATBUY
      </h1>
      <div>
        <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
        <ItemsList items={filterItems} />
      </div>
    </>
  );
};

export default Homepage;
