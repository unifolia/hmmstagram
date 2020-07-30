
import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import ReCAPTCHA from "react-google-recaptcha";
import db from "../src/components/Firebase/db";
import '../src/styles/App.scss';
import generatePost from "./components/functions/generatePost";

const App = () => {
  const [postInfo, updatePostInfo] = useState([]);

  const renderPosts = useCallback(
    () => {
      db.collection("hmmstagram")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            updatePostInfo(postInfo => [...postInfo, doc.data()]);
          });
        });
    }, []);

  useEffect(() => {
    renderPosts(updatePostInfo)
  }, [renderPosts]);

  return (
    <>
      <Header />
      <main>
        <button id="generatePost" onClick={() => generatePost(updatePostInfo)}>
          Upload y̶o̶u̶r̶ a photo
        </button>
        {/* <ReCAPTCHA
          className="captcha"
          sitekey="6LdQpLcZAAAAABhXSIm1-3L9e2svi3I--HK_E4mm"
          onChange={() => generatePost()}
        /> */}
        {postInfo
          .sort((a, b) => a.creation.seconds > b.creation.seconds ? 1 : -1)
          .reverse()
          .map((obj, i) => {
            (console.log(obj))
            let { photo, username, caption } = obj;
            return (
              <Post
                userKey={username}
                photo={photo}
                caption={caption}
                key={i}
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