import Axios from "axios";
import Swal from 'sweetalert2';
import db from "../Firebase/db";
import firebase from "firebase/app";

const generatePost = (updatePostInfo) => {
    const generateNumber = () => {
        return Math.floor(Math.random() * 99999999);
    };

    let generatePerson = Axios({
        url: "https://randomuser.me/api/",
        dataType: "json",
    });

    let generateCaption = Axios({
        url: "https://api.kanye.rest/",
        dataType: "json",
    });

    Axios
    .all([generatePerson, generateCaption])
    .then(Axios.spread((...res) => {
        let { name, picture } = res[0].data.results[0];
        let { quote } = res[1].data;
        let generatedTag = `${name.first}${generateNumber()}`

        db.collection("hmmstagram")
        .doc(generatedTag)
        .set({
            username: `${generatedTag}`,
            photo: `${picture.large}`,
            comments: [],
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            caption: quote,
        })
        .then(() => updatePostInfo(postInfo => {
            return [...postInfo, {
                username: `${generatedTag}`,
                photo: `${picture.large}`,
                comments: [],
                creation: {
                    seconds: Infinity,
                },
                likes: 0,
                caption: quote,
            }]
        }))
        .then(() => {
            document.getElementById("generatePost").disabled = true;
        });
    }))
    .catch(() => {
        Swal.fire(
            "Error! Try again later or email me at james@jameslewis.io 😅"
        );
    });
};

export default generatePost;