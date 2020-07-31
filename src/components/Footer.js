import React from "react";
import Button from "./Button";

const Footer = ({updatePostInfo}) => {
    return (
        <footer path = "/" >
            <Button path="/" updatePostInfo={updatePostInfo} />
        </footer >
    );
};

export default Footer;