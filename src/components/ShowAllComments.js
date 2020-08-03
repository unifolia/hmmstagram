import React from "react";

const ShowAllComments = ({ commentsArray }) => {
    return (
            commentsArray
            .sort((a, b) => a.time.seconds > b.time.seconds ? 1 : -1)
            .map((obj, i) => <li className="comment" key={i}>{obj.content}</li>)
        );
};

export default ShowAllComments;