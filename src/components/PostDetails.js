import React from "react";
import { Link } from "@reach/router";
import Comments from './Comments';

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
                        <span role="img" aria-label="click to like">
                            {props.isLiked ? 
                            <i className="fas fa-heart"></i> 
                          : <i className="far fa-heart"></i>}
                        </span>
                    </button>
                    <ShowLikes />
                </section>
                <Link to={`/hmmstagram/${userKey}`}>
                    <figcaption className="caption">
                        <span>{userKey}</span> {caption}
                    </figcaption>
                </Link>
                <div className="comments">
                    <Comments userKey={userKey} path={props.path} key={userKey}/>
                </div>
            </div>
        </article>
    );
};

export default PostDetails;