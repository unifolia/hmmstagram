import Axios from "axios";
import Swal from 'sweetalert2';
import db from "../Firebase/db";
import firebase from "firebase/app";

const generatePost = (updatePostInfo) => {
    let regTest = "";

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

        regTest = !(/[\u0621-\u064A]+/i.test(name.first));
        
        if (!regTest) {
            Swal.fire("The API generated an Arabic name - which really messes up my database. Why? I don't know. Please try again.");
            return 
        } else {
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
        };
    }))
    .catch(() => {
        Swal.fire(
            "Oop. Something went wrong with the API. It's not my fault, I swear (jk it might be). Try again."
        );
    });
};

export default generatePost;