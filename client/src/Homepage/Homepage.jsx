import React, {useEffect, useState} from "react";
import SearchBar from '../SearchBar/Searchbar';

const Homepage = () => {
    // const [items, setItems] = useState([])
    // const fetchItems = () => {
    //     fetch()
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(data => {
    //             setItems(data)
    //         })
    // }

    // useEffect(() => {
    //     fetchItems()
    // }, [])

    return (
        <>
            <div className='text-center'>
                <h1>FLATBUY HOMEPAGE</h1>
            </div>
            <div>
                <SearchBar/>
            </div>
        </>
    )
}

export default Homepage