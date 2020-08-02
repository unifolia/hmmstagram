import React from "react";
import { Link } from "@reach/router";
import Comments from './Comments';
import pottyMouth from "./functions/pottyMouth";

const PostDetails = (props) => {
    let { userKey, photo, caption } = props.postData;

    const ShowLikes = () => {
        if (props.likes) {
            return (
                <span>{props.likes} {props.likes > 1? "likes" : "like"}</span>
            );
        } else {
            return null;
        };
    };

    return (
        <article className="post">
            <header>
                <Link to={`/hmmstagram/${userKey}`}>
                    <h2 className="username">
                        <div className="usernameImage">
                            <img src={photo} alt=""/>
                        </div>
                        {userKey}
                    </h2>
                </Link>
            </header>
            <div className="postContent">
                <div className="postImage">
                    <img 
                        alt="Icon Living" 
                        src={photo}
                        onDoubleClick={() => props.setLikes()} 
                    />
                </div>
                <section className="likes">
                    <button
                        disabled={false}
                        className={"likeButton"}
                        id={`likeButton${userKey}`}
                        onClick={() => props.setLikes()} 
                        >
                        <span role="img" aria-label="click to like">❤️</span>
                    </button>
                    <ShowLikes />
                </section>
                <Link to={`/hmmstagram/${userKey}`}>
                    <figcaption className="caption">
                        <span>{userKey}</span> {pottyMouth(caption)}
                    </figcaption>
                </Link>
                <div className="comments">
                    <Comments userKey={userKey} path={props.path}/>
                </div>
            </div>
        </article>
    );
};

export default PostDetails;