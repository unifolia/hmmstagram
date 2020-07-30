import React from "react";
import { Link } from "@reach/router";
import pottyMouth from "./functions/pottyMouth";

const HiddenComments = ({ userKey, photo, caption, likes, setLikes }) => {
    return (
        <div className="post">
            <header>
                <h2 className="username">{userKey}</h2>
            </header>
            <main className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src={photo} />
                </div>
                <figcaption>{pottyMouth(caption)}</figcaption>
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
            <Link to={`/${userKey}`}>View comments</Link>
        </div>
    )
}

export default HiddenComments