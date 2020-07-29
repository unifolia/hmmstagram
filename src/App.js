import React, { useEffect, useState, useCallback } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import Swal from 'sweetalert2';
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
    renderPosts()
  }, [renderPosts]);

  return (
    <>
      <Header />
      <main>
        <button onClick={() => generatePost(updatePostInfo)}>
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
                userKey={username} 
                photo={photo} 
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
