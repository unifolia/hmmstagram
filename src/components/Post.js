import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import firebase from "firebase/app";
import db from "./Firebase/db";
import PostDetails from "./PostDetails";

const Post = (props) => {
    let { userKey } = props
    let [dbLikes, updateDbLikes] = useState("");
    let [isLiked, updateIsLiked] = useState(false);

    useEffect(() => {
        db.collection("hmmstagram")
        .doc(userKey)
        .get()
        .then((
            res => {
                let dbLikes = (res.data().likes ? res.data().likes : 0);
                updateDbLikes(dbLikes);

                // Bug here V
                if (res.data().isNew === true) {
                    updateIsLiked(false);
                } else if (res.data().isNew === false) {
                    updateIsLiked(isLiked);
                } else {
                    return null;
                }
                // Bug here ^
            }
        ));
    }, [userKey, dbLikes, isLiked]);

    const setLikes = () => {
        document.getElementById(`likeButton${userKey}`).disabled = true;
        db.collection("hmmstagram")
        .doc(userKey)
        .set({
            likes: firebase.firestore.FieldValue.increment(isLiked ? -1 : 1),
            isNew: false,
        }, { merge: true })
        .then(() => {
            document.getElementById(`likeButton${userKey}`).disabled = false;
            updateIsLiked(!isLiked)
            updateDbLikes(isLiked ? dbLikes - 1 : dbLikes + 1);
        });
    };

    return (
        <Router basepath="/hmmstagram" primary={false}>
            <PostDetails 
                path={`/${userKey}`} 
                postData={props} 
                likes={dbLikes} 
                setLikes={setLikes}
                isLiked={isLiked}
                key={userKey}
            />
            <PostDetails 
                path={`/`} 
                postData={props} 
                likes={dbLikes} 
                setLikes={setLikes}
                isLiked={isLiked}
                key={userKey}
            />
        </Router>
    );
};

export default Post;