import React from "react";
import generatePost from "./functions/generatePost"

const Button = ({ updatePostInfo }) => {
    return (
        <>
            <label htmlFor="generatePost" className="visuallyHidden">
                Generate new post
            </label>
            <button id="generatePost" onClick={() => generatePost(updatePostInfo)}>
                Generate new post
            </button>
        </>
    );
};

export default Button;