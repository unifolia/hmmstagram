import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import firebase from "firebase/app";
import db from "./Firebase/db";
import PostDetails from "./PostDetails";

const Post = (props) => {
    let { userKey, photo, caption } = props
    let [dbLikes, updateDbLikes] = useState("");

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
            likes: firebase.firestore.FieldValue.increment(1),
        }, { merge: true })
        .then(() => {
            updateDbLikes(dbLikes + 1);
            document.getElementById(`likeButton${userKey}`).disabled = false;
        });
    };

    return (
        <Router>
            {/* Changed component data - PostDetails can now be merged with this  */}
            <PostDetails 
                path={`/${userKey}`} 
                postData={props} 
                likes={dbLikes} 
                setLikes={setLikes}
            />
            <PostDetails 
                path={`/`} 
                postData={props} 
                likes={dbLikes} 
                setLikes={setLikes}
            />
        </Router>
    );
};

export default Post;