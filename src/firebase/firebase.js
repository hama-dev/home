import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

//Database Details
const firebaseConfig = {
  apiKey: "AIzaSyBVyeWXSuE11duCRc1AWuedjzqsfSFO89s",
  authDomain: "kssite-36ece.firebaseapp.com",
  databaseURL: "https://kssite-36ece.firebaseio.com",
  projectId: "kssite-36ece",
  storageBucket: "gs://kssite-36ece.appspot.com",
  messagingSenderId: "924654604116",
  appId: "1:924654604116:web:da5aefa493bceb46f942c1",
  measurementId: "G-HNZ031CFFT"
};

//Connect the Database to the owe Details
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

//* Set Up The Auth
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

