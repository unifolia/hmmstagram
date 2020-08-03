import removeDiacritics from "./removeDiacritics";
import pottyMouth from "./pottyMouth";
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
        
        if (
            /[\u0621-\u064A]+/i.test(name.first) 
            || (quote.indexOf("Trump") >= 0)
        ) {
            Swal.fire("Error! Try again!");
            return;
        } else {
            let generatedTag = `${removeDiacritics(name.first)}${generateNumber()}`;
            let cleanQuote = pottyMouth(quote);
    
            db.collection("hmmstagram")
            .doc(generatedTag)
            .set({
                username: `${generatedTag}`,
                photo: `${picture.large}`,
                comments: [],
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                caption: cleanQuote,
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
                    caption: cleanQuote,
                }];
            }))
            .then(() => {
                window.scrollTo(0, 0);
                document.getElementById("generatePost").disabled = true;
            });
        };
    }))
    .catch(() => {
        Swal.fire(
            "Big oop. Try again!"
        );
    });
};

export default generatePost;