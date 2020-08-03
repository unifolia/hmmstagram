import React, { useState, useEffect, useCallback } from "react";
import ShowLastComment from "./ShowLastComment";
import ShowAllComments from "./ShowAllComments";
import pottyMouth from "./functions/pottyMouth";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import db from "./Firebase/db";

const Comments = ({ userKey, path }) => {
    const [commentsArray, updateComments] = useState([]);

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
                let objToArray = Object.entries(querySnapshot.data().comments);

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
        }, [userKey, updateComments]
    );

    useEffect(() => {
        getComments();
    }, [getComments]);

    const postComment = () => {
        if (document.getElementById(`input${userKey}`).value) {
            let newComment = pottyMouth(document.getElementById(`input${userKey}`).value);

            db.collection("hmmstagram")
            .doc(userKey)
            .set({
                comments: {
                    [generateCommentKey()]: {
                        "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                        "content": newComment,
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

    let ShowComments = () => {
        if (path === "/") {
            return (
                <ShowLastComment 
                    commentsArray={commentsArray} 
                    userKey={userKey}
                />
            );
        } else {
            return <ShowAllComments commentsArray={commentsArray}/>
        };
    };

    return (
        <>
            <ShowComments/>
            <form className="commentForm" onSubmit={e => {
                e.preventDefault();
                postComment(userKey)}
            }>
                <label 
                    htmlFor={`input${userKey}`} 
                    className="visuallyHidden"
                >
                    Add Comment
                </label>
                <input 
                    placeholder="Add comment" 
                    type="text" 
                    id={`input${userKey}`} 
                    autoComplete="off" 
                />
                <label 
                    htmlFor={`button${userKey}`} 
                    className="visuallyHidden"
                >
                    Post Comment
                </label>
                <button 
                    type="submit" 
                    value="Post"
                    id={`button${userKey}`}
                >
                    Post
                </button>
            </form>
        </>
    );
};

export default Comments;