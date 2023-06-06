import React, { useEffect, useState } from "react";
import ItemsList from "./Items/ItemsList"
import SearchBar from '../SearchBar/Searchbar';

function Homepage() {
    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:5555/get_items")
            .then((r) => r.json())
            .then((data) => {
                setItems(data.items);
            });
        
        }, []);

    function handleSearch(input){
        setSearchInput(input);
    }
    
    const filterItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
      <>
        <div className="text-center">
          <h1>FLATBUY HOMEPAGE</h1>
        </div>
        <div>
          <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
          <ItemsList items={filterItems} />
        </div>
      </>
    );
}


export default Homepage;