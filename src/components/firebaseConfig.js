import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyBHO1TTOgnq12I445Ka3oJ-ilE5AIdFiUY",
  authDomain: "todo-app-e345c.firebaseapp.com",
  databaseURL: "https://todo-app-e345c.firebaseio.com",
  projectId: "todo-app-e345c",
  storageBucket: "",
  messagingSenderId: "77862428658",
  appId: "1:77862428658:web:1c702f95c5efa981ae556b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.collection("users");
export { db, auth, currentUser, usersCollection };
