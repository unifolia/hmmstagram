import React from "react";
import searchFunction from "./functions/searchFunction";

const Header = () => {
    return (
        <header>
            <h1>Hmmstagram</h1>
            <input
                type="text"
                id="searchInput"
                placeholder={"Search user"}
                onChange={e => {
                    e.preventDefault();
                    searchFunction("searchInput");
                }}
            />
        </header>
    );
};

export default Header;