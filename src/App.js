import React, { useEffect } from 'react';
// import Axios from "axios";
import Header from "./components/Header";
import Post from "./components/Post";
import '../src/styles/App.scss';

const App = () => {
  // Rendering multiple items for test purposes
  let whateverArray = [1, 2, 3, 4]

  // Not using this function yet
  // useEffect(() => {
  //   Axios({
  //     url: 'https://randomuser.me/api/',
  //     dataType: 'json',
  //   }).then(res => console.log(res.data.results[0]))
  // })

  return (
    <>
      <Header />
      <main>
        <button>
          Upload y̶o̶u̶r̶ a photo
        </button>
        {whateverArray.map(num => <Post i={num} key={num}/>)}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
