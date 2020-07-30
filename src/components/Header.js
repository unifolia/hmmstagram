import React from "react";
import searchFunction from "./functions/searchFunction";
import { Link, Router } from "@reach/router";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>Hmmstagram</h1>
            </Link>
            <Router>
                <input
                    path="/"
                    type="text"
                    id="searchInput"
                    placeholder={"Search user"}
                    onChange={e => {
                        e.preventDefault();
                        searchFunction("searchInput");
                    }}
                />
            </Router>
        </header>
    );
};

export default Header;