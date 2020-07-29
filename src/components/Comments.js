import React, { useState, useEffect, useCallback } from "react";
import pottyMouth from "./pottyMouth";
import firebase from "firebase";
import db from "./Firebase/db";

const Comments = ({ i }) => {
    const [commentsArray, updateComments] = useState([]);

    const getComments = useCallback(
        () => {
            updateComments([]);
            db.collection(`post${i}`).get().then(querySnapshot => {
                querySnapshot.forEach((item) => {
                    let { comment, timestamp } = item.data();
                    let commentInfo = {
                        content: comment,
                        time: (timestamp ? timestamp : { seconds: Infinity }),
                    };
                    updateComments(commentsArray => [...commentsArray, commentInfo]);
                });
            });
        }, [i]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    const postComment = () => {
        db.collection(`post${i}`).add({
            comment: pottyMouth(document.getElementById(`input${i}`).value),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(() => alert("Could not post comment. Try again later?"));

        document.getElementById(`input${i}`).value = "";

        getComments();
    };

    return (
        <>
        <form onSubmit={e => {
            e.preventDefault();
            postComment(i);
            }
        }>
            <input placeholder="Write comment" type="text" id={`input${i}`} autoComplete="off" />
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