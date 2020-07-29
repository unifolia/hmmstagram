import firebase from 'firebase/app';
import 'firebase/firebase-firestore';


firebase.initializeApp({
  apiKey: "AIzaSyCZtH9syHhLVk65JipkyY_--HyNkdfU_f4",
  authDomain: "hmmstagram.firebaseapp.com",
  databaseURL: "https://hmmstagram.firebaseio.com",
  projectId: "hmmstagram",
  storageBucket: "hmmstagram.appspot.com",
  messagingSenderId: "1039745113323",
  appId: "1:1039745113323:web:97027e26334f8f066f72ae"
});

var db = firebase.firestore();

export default db;