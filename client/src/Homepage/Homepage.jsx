import React, { useEffect, useState } from "react";
import ItemsList from "../Items/ItemsList";
import SearchBar from "./Searchbar";

const Homepage = ({userData}) => {
  // fetching item data
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  console.log(userData)
  
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

  function handleSearch(input){
    setSearchInput(input);
  };
      
  return (
    <>
      <h1 className="text-center text-5xl" style={{color:'#f59e0b', fontFamily:'Roboto', fontWeight:'bolder', margin:'2rem' }}>FLATBUY</h1>
      <div>
        <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
        <ItemsList items={filterItems} userData={userData} />
      </div>
    </>
  );
}

export default Homepage;