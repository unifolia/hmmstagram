
import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import Footer from './components/Footer';
import { Router } from "@reach/router";
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
      <Router basepath="/hmmstagram" primary={false}>
        <Footer path="/" updatePostInfo={updatePostInfo}/>
      </Router>
    </>
  );
};

export default App;