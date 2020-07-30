
import React, { useState, useEffect } from "react";
import Comments from "./Comments";
import pottyMouth from "./functions/pottyMouth";
import firebase from "firebase/app";
import db from "./Firebase/db";

const Post = ({ userKey, photo, caption }) => {
    let [likes, updateLikes] = useState("");

    useEffect(() => {
        db.collection("hmmstagram")
        .doc(userKey)
        .get()
        .then((
            res => {
                let dbLikes = (res.data().likes ? res.data().likes : 0);
                updateLikes(dbLikes);
            }
        ));
    });


    const setLikes = () => {
        document.getElementById(`likeButton${userKey}`).disabled = true;
        
        db.collection("hmmstagram")
        .doc(userKey)
        .set({
            likes: firebase.firestore.FieldValue.increment(1),
        }, { merge: true })
        .then(() => {
            updateLikes(likes + 1);
            document.getElementById(`likeButton${userKey}`).disabled = false;
        });
    };

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
            <Comments userKey={userKey} key={userKey}/>
        </div>
    );
};

export default Post;