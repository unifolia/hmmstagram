import React from "react";

const ShowAllComments = ({ commentsArray }) => {
    return (
        <ul className="commentsList">
            {commentsArray
            .sort((a, b) => a.time.seconds > b.time.seconds ? 1 : -1)
            .map((obj, i) => {
                return (
                    <li className="comment" key={i}>- {obj.content}</li>
                )
            })}
        </ul>
        );
};

export default ShowAllComments;