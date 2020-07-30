
import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import Button from './components/Button';
import { Router } from "@reach/router";
import ReCAPTCHA from "react-google-recaptcha";
import db from "../src/components/Firebase/db";
import '../src/styles/App.scss';

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
        <Router>
          <Button path="/" updatePostInfo={updatePostInfo}/>
        </Router>
        {/* <ReCAPTCHA
          className="captcha"
          sitekey="6LdQpLcZAAAAABhXSIm1-3L9e2svi3I--HK_E4mm"
          onChange={() => generatePost()}
        /> */}
          {postInfo
            .sort((a, b) => a.creation.seconds > b.creation.seconds ? 1 : -1)
            .reverse()
            .map((obj, i) => {
              let { photo, username, caption } = obj;
              return (
                  <Post 
                    path="/"
                    id={username}
                    userKey={username}
                    photo={photo}
                    caption={caption}
                    key={i}
                  />
              )
            })
          }
      </main>
      <footer>
      </footer>
    </>
  );
};

export default App;