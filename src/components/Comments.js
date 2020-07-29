import React, { useState, useEffect, useCallback } from "react";
import pottyMouth from "./functions/pottyMouth";
import firebase from "firebase";
import db from "./Firebase/db";

const Comments = ({ userKey }) => {
    const [commentsArray, updateComments] = useState([]);

    let generateCommentKey = () => {
        return window.crypto.getRandomValues(new Int32Array(2)).toString().replace(/,/g, "");
    };

    const getComments = useCallback(
        () => {
            updateComments([]);
            db.collection("hmmstagram")
                .doc(userKey).get().then(querySnapshot => {
                    let objToArray = Object.entries(querySnapshot.data().comments)
                    objToArray.forEach(comment => {
                        let { content, timestamp } = comment[1]
                        let commentInfo = {
                            content: content,
                            time: (timestamp ? timestamp : { seconds: Infinity }),
                        };
                        updateComments(commentsArray => [
                            ...commentsArray, commentInfo
                        ]);
                    });
                });
        }, [userKey]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    // pottyMouth(document.getElementById(`input${userKey}`).value)

    const postComment = () => {
        db.collection("hmmstagram").doc(userKey).set({
            comments: {
                [generateCommentKey()]: {
                    "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                    "content": pottyMouth(document.getElementById(`input${userKey}`).value)
                }
            }
        }, { merge: true })
            .catch(() => alert("Could not post comment. Try again later?"));

        document.getElementById(`input${userKey}`).value = "";

        getComments();
    };

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                postComment(userKey);
            }}>
                <input placeholder="Write comment" type="text" id={`input${userKey}`} autoComplete="off" />
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