import React from "react";

const SearchBar = ({ searchInput, handleSearch }) => {
    return (
        <div className="flex justify-center items-center mt-4 mb-4">
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