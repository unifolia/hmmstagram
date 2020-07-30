import React from "react";
import Comments from './Comments';

const ExpandedComments = (props) => {
    let { userKey, photo, caption } = props.postData;

    return (
        <div className="post">
            <header>
                <h2 className="username">{userKey}</h2>
            </header>
            <main className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src={photo} />
                </div>
                <figcaption>{caption}</figcaption>
                <section>Likes: {props.likes}
                    <button
                        disabled={false}
                        className={"likeButton"}
                        id={`likeButton${userKey}`}
                        onClick={() => props.setLikes()} 
                        >
                        <span role="img" aria-label="click to like">❤️</span>
                    </button>
                </section>
            </main>
            <Comments userKey={userKey} path={props.path}/>
        </div>
    );
};

export default ExpandedComments;