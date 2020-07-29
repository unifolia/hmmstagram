import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";
import firebase from "firebase/app";
import db from "../src/components/Firebase/db";
import '../src/styles/App.scss';

const App = () => {
  const [postInfo, updatePostInfo] = useState([]);
  let [num, updateNum] = useState(1);

  const renderPosts = useCallback(
    () => {
    db.collection("hmmstagram")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          updatePostInfo(postInfo => [...postInfo, doc.data()]);
          console.log(doc.data())
        });
      });
  }, []);

  useEffect(() => {
    renderPosts()
    db.collection("increment").doc("inc").set({
      incrementer: num,
    }, { merge: true });
  }, [renderPosts, num]);

  const generateNumber = () => {
    return Math.floor(Math.random() * 99999999);
  };

  const generatePost = () => {
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
        }).then(() => updatePostInfo(postInfo => [...postInfo, {
            username: `${generatedTag}`,
            photo: `${picture.large}`,
            comments: [],
            creation: firebase.firestore.FieldValue.serverTimestamp(),
        }]));
    })
    .catch(() => {
      alert("There was an error. Try again!");
    });
  };

    return (
      <>
        <Header />
        <main>
          <button onClick={() => generatePost()}>
            Upload y̶o̶u̶r̶ a photo
          </button>
          {/* <ReCAPTCHA
            className="captcha"
            sitekey="6LdQpLcZAAAAABhXSIm1-3L9e2svi3I--HK_E4mm"
            onChange={() => generatePost()}
          /> */}
          {postInfo
            .reverse()
            .sort((a, b) => a.creation.seconds < b.creation.seconds ? 1 : -1)
            .map((obj, i) => {
              let { photo, username } = obj;
              return (
                <Post 
                  username={username} 
                  photo={photo} 
                  key={i}
                  updateNum={updateNum}
                />
              )
            })
          }
        </main>
        <footer></footer>
      </>
    );
};

export default App;
