import Axios from "axios";
import Swal from 'sweetalert2';
import db from "../Firebase/db";
import firebase from "firebase/app";

const generatePost = (updatePostInfo) => {
    const generateNumber = () => {
        return Math.floor(Math.random() * 99999999);
    };

    Axios({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
    })
    .then((res) => {
        let { name, picture } = res.data.results[0];
        let generatedTag = `${name.first}${generateNumber()}`

        db.collection("hmmstagram").doc(generatedTag)
        .set({
            username: `${generatedTag}`,
            photo: `${picture.large}`,
            comments: [],
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
        })
        .then(() => updatePostInfo(postInfo => [...postInfo, {
            username: `${generatedTag}`,
            photo: `${picture.large}`,
            comments: [],
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0}]
        ));
    })
    .catch(() => {
        Swal.fire(
            "Error! Try again later or email me at james@jameslewis.io 😅"
        );
    });
};

export default generatePost;