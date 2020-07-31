import React from "react";
import searchFunction from "./functions/searchFunction";

const SearchInput = () => {
    return (
        <input
            type="text"
            id="searchInput"
            placeholder={"Search user"}
            onChange={e => {
            e.preventDefault();
            searchFunction("searchInput");
            }}
        />
    );
};

export default SearchInput;