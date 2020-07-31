import React from "react";
import SearchInput from "./SearchInput";
import { Link, Router } from "@reach/router";

const Header = () => {
    return (
        <header className="pageHeader">
            <div className="wrapper">
                <nav>
                    <Link to="/">
                        <h1>Hmmstagram</h1>
                    </Link>
                    <Router basepath="/">
                        <SearchInput path="/"/>
                    </Router>
                </nav>
            </div>
        </header>
    );
};

export default Header;