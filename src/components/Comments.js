import React, { useState, useEffect, useCallback } from "react";
import pottyMouth from "./pottyMouth";
import firebase from "firebase";
import db from "./Firebase/db";

const Comments = ({ username }) => {
    const [commentsArray, updateComments] = useState([]);
    let incrementer = 1;

    // const getComments = useCallback(
    //     () => {
    //         updateComments([]);
    //         db.collection(`post${id}`).get().then(querySnapshot => {
    //             querySnapshot.forEach((item) => {
    //                 let { comment, timestamp } = item.data();
    //                 let commentInfo = {
    //                     content: comment,
    //                     time: (timestamp ? timestamp : { seconds: Infinity }),
    //                 };
    //                 updateComments(commentsArray => [...commentsArray, commentInfo]);
    //             });
    //         });
    //     }, [id]);

    // useEffect(() => {
    //     getComments();
    // }, [getComments]);

    // pottyMouth(document.getElementById(`input${username}`).value),

    const postComment = () => {
        db.collection("hmmstagram").doc(username).set({
            comments: {
                [incrementer]: {
                    "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                    "content": pottyMouth(document.getElementById(`input${username}`).value)
                }
            }
        }, { merge: true })
        .catch(() => alert("Could not post comment. Try again later?"));

        document.getElementById(`input${username}`).value = "";

        // getComments();
    };

    return (
        <>
        <form onSubmit={e => {
            e.preventDefault();
            postComment(username);
            }
        }>
            <input placeholder="Write comment" type="text" id={`input${username}`} autoComplete="off" />
            <button type="submit" value="Post"></button>
        </form>
        <ul className="commentsList">
            {commentsArray
                .sort((a, b) => a.time.seconds > b.time.seconds ? 1 : -1)
                .map((obj, i) => <li key={i}>{obj.content}</li>)
            }   
        </ul>
        </>
    );
};

export default Comments;