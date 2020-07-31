
import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import Footer from './components/Footer';
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
        <div className="wrapper">
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
                    <Post path="/" id={username}
                      userKey={username} photo={photo}
                      caption={caption} key={i}
                    />
                );
              })
            }
          </div>
      </main>
      <Router>
        <Footer path="/" updatePostInfo={updatePostInfo}/>
      </Router>
    </>
  );
};

export default App;