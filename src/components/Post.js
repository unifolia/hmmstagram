import React, { useState } from "react";
import Comments from "./Comments";
import db from "./Firebase/db";

const Post = ({ userKey, photo }) => {
    // let [likes, updateLikes] = setState("");

    // const getLikes = () => {
    //     db.collection("hmmstagram").doc(userKey).get().then((
    //         res => console.log(res.data())
    //     ));
    // };


    // const setLikes = () => {
    //     db.collection("hmmstagram").doc(userKey)
    //     .set({
    //         likes: 5,
    //     }, { merge: true })
    //     .then(() => {
    //         getLikes()
    //     });
    // };

    return (
        <div>
            <header>
                <h2>{userKey}</h2>
            </header>
            <main className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src={photo} />
                </div>
                <figcaption>Hello</figcaption>
                {/* Will update "likes" section */}
                <section>Likes: 0 
                    {/* <span onClick={() => setLikes()}>
                        "Hey"
                    </span> */}
                </section>
            </main>
            <Comments userKey={userKey}/>
        </div>
    );
};

export default Post;