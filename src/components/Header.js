import React from "react";
import SearchInput from "./SearchInput";
import { Link, Router } from "@reach/router";
import searchFunction from "./functions/searchFunction";

const Header = () => {
    return (
        <header className="pageHeader">
            <div className="wrapper">
                <nav>
                    <Link 
                        to="/hmmstagram"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            document.getElementById("searchInput").value = "";
                            searchFunction();
                        }}
                    >
                        <h1>Hmmstagram</h1>
                    </Link>
                    <Router basepath="/hmmstagram" primary={false}>
                        <SearchInput path="/"/>
                    </Router>
                </nav>
            </div>
        </header>
    );
};

export default Header;