import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList"
import SearchBar from '../SearchBar/Searchbar';

function Homepage() {
    const [items, setItems] = useState([]);
    // const [searchItems, setSearchItems] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:5555/get_items")
            .then((r) => r.json())
            .then((itemsArray) => {
                setItems([itemsArray])
            });
        
        }, []);
        
    // console.log(items, "is this working??");

    return (
      <>
        <div className="text-center">
          <h1>FLATBUY HOMEPAGE</h1>
        </div>
        <div>
          <SearchBar />
          <ItemsList items={items}/>
          {/* <SearchBar searchItems={searchItems} /> */}
        </div>
      </>
    );
}


export default Homepage;