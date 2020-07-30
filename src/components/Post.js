import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import firebase from "firebase/app";
import db from "./Firebase/db";
import ExpandedComments from "./ExpandedComments";
import HiddenComments from "./HiddenComments";

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
        <Router>
            <ExpandedComments path={`/${userKey}`} userKey={userKey} photo={photo} caption={caption} likes={likes} setLikes={setLikes}/>
            <HiddenComments path={`/`} userKey={userKey} photo={photo} caption={caption} likes={likes} setLikes={setLikes}/>
        </Router>
    );
};

export default Post;