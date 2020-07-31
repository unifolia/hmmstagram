import React from "react";
import searchFunction from "./functions/searchFunction";
import { Link, Router } from "@reach/router";

const Header = () => {
    return (
        <header className="pageHeader">
            <div className="wrapper">
                <nav>
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
                </nav>
            </div>
        </header>
    );
};

export default Header;