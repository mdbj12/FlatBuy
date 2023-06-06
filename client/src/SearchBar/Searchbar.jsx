import React from "react";

const SearchBar = ({ searchInput, handleSearch }) => {
    return (
        <div>
            <input
                value={searchInput}
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar