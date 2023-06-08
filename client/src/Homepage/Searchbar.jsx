import React from "react";

const SearchBar = ({ searchInput, handleSearch }) => {
    return (
        <div>
            <input
                value={searchInput}
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="form-input w-full appearance-none rounded border border-gray-500 py-0.5 "
            />
        </div>
    )
}

export default SearchBar