import React from "react";
import Comments from "./Comments";

const Post = ({ username, photo }) => {
    return (
        <div>
            <header>
                <h2>{username}</h2>
            </header>
            <main className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src={photo} />
                </div>
                <figcaption>Hello</figcaption>
                {/* Will update "likes" section */}
                <section>Likes: 0</section>
            </main>
            <Comments username={username}/>
        </div>
    );
};

export default Post;