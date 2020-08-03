import React from "react";
import { Link } from "@reach/router";

const ShowLastComment = ({ commentsArray, userKey }) => {
    if (commentsArray.length > 0) {
        commentsArray.sort((a, b) => a.time.seconds > b.time.seconds ? 1 : -1);
        let [lastComment] = commentsArray.slice(-1);
        return (
            <>
                <Link to={`/hmmstagram/${userKey}`}>
                    <div className="viewAllComments">
                        View all comments
                    </div>
                </Link>
                <ul className="commentsList">
                    <li className="comment">
                        Latest comment: {lastComment.content}
                    </li>
                </ul>
            </>
        );
    } else {
        return null;
    };
};

export default ShowLastComment;