import React from "react";
import Comments from './Comments';

const ExpandedComments = ({ userKey, photo, caption, likes, setLikes }) => {
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
                {/* Will update "likes" section */}
                <section>Likes: {likes}
                    <button
                        disabled={false}
                        className={"likeButton"}
                        id={`likeButton${userKey}`}
                        onClick={() => setLikes()} >
                        <span role="img" aria-label="click to like">❤️</span>
                    </button>
                </section>
            </main>
            <Comments
                path={`/${userKey}`}
                userKey={userKey}
                info={"blah"}
            />
        </div>
    )
}

export default ExpandedComments;