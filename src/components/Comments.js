import React, { useState, useEffect, useCallback } from "react";
import pottyMouth from "./functions/pottyMouth";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import db from "./Firebase/db";

const Comments = ({ userKey }) => {
    const [commentsArray, updateComments] = useState([]);
    let lastComment = commentsArray.slice(-1);

    let generateCommentKey = () => {
        return window.crypto.getRandomValues(new Int32Array(2)).toString().replace(/,/g, "");
    };

    const getComments = useCallback(
        () => {
            updateComments([]);
            db.collection("hmmstagram")
            .doc(userKey)
            .get()
            .then(querySnapshot => {
                let objToArray = Object.entries(querySnapshot.data().comments)

                objToArray.forEach(comment => {
                    let { content, timestamp } = comment[1];
                    let commentInfo = {
                        content: content,
                        time: (timestamp ? 
                            timestamp : { seconds: Infinity }
                        ),
                    };
                    updateComments(commentsArray => [
                        ...commentsArray, commentInfo
                    ]);
                });
            });
        }, [userKey, updateComments]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    const postComment = () => {
        if (document.getElementById(`input${userKey}`).value) {
            db.collection("hmmstagram")
            .doc(userKey)
            .set({
                comments: {
                    [generateCommentKey()]: {
                        "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                        "content": pottyMouth(document.getElementById(`input${userKey}`).value),
                    }
                }
            }, { merge: true })
            .catch(() => Swal.fire("Could not post comment. Try again later?"));

            document.getElementById(`input${userKey}`).value = "";
            getComments();
        } else {
            return;
        };
    };

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                postComment(userKey);
            }}>
                <input 
                    placeholder="Write comment" 
                    type="text" 
                    id={`input${userKey}`} 
                    autoComplete="off" 
                />
                <button type="submit" value="Post"></button>
            </form>
            {/* <Link to={`/${userKey}`}>View all {commentsArray.length} comments</Link> */}

            {/* {lastComment.map((lastComment, i) => {
                return (
                    <ul className="commentsList" key={i}>
                        <li>{lastComment.content}</li>
                    </ul>
                )
            })} */}

            {commentsArray
                .sort((a, b) => a.time.seconds > b.time.seconds ? 1 : -1)
                .map((obj, i) => <li key={i}>{obj.content}</li>)
            }
        </>
    );
};

export default Comments;