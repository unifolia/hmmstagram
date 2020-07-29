import React, { useState } from "react";
import Comments from "./Comments";

const Post = ({i}) => {
    return (
        <div>
            <header>
                <h2>James</h2>
            </header>
            <main className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src="https://pbs.twimg.com/profile_images/1286802427639988225/cRWHJDac_400x400.jpg" />
                </div>
                <figcaption>Hello</figcaption>
                {/* Will update "likes" section */}
                <section>Likes: 0</section>
            </main>
            <Comments i={i}/>
        </div>
    );
};

export default Post;