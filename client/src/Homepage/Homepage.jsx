import React, { useEffect, useState } from "react";
import ItemsList from "./Items/ItemsList"
import SearchBar from './SearchBar/Searchbar';

const Homepage = () => {
    // fetching item data
    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:5556/items")
            .then((r) => r.json())
            .then((data) => {
                setItems(data);
            });
        }, []);

    function handleSearch(input){
        setSearchInput(input);
    }
    
    const filterItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    // fetching review data for item based on item_id
    // const [reviews, setReviews] = useState([]);

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:5555/rating/${item_id}`)
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setReviews(data)
    //         });
    // }, []);

    // const filterReviews = reviews.filter((review) => {
    //     return review.name.toLowerCase().includes(searchInput.toLowerCase())
    // });

    return (
      <>
        <h1 className="text-center text-5xl ">FLATBUY HOMEPAGE</h1>
        <div>
          <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
          <ItemsList items={filterItems} />
        </div>
      </>
    );
}


export default Homepage;