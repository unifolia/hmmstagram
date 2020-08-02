import React from "react";
import Button from "./Button";

const Footer = ({updatePostInfo}) => {
    return (
        <footer>
            <Button updatePostInfo={updatePostInfo} />
        </footer >
    );
};

export default Footer;