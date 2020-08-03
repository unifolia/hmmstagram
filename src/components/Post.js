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
            }
        ));
    });

    const setLikes = () => {
        document.getElementById(`likeButton${userKey}`).disabled = true;
        
        db.collection("hmmstagram")
        .doc(userKey)
        .set({
            likes: firebase.firestore.FieldValue.increment(isLiked ? -1 : 1),
        }, { merge: true })
        .then(() => {
            updateDbLikes(isLiked ? dbLikes -1 : dbLikes + 1);
            updateIsLiked(!isLiked);
            document.getElementById(`likeButton${userKey}`).disabled = false;
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
            />
            <PostDetails 
                path={`/`} 
                postData={props} 
                likes={dbLikes} 
                setLikes={setLikes}
                isLiked={isLiked}
            />
        </Router>
    );
};

export default Post;