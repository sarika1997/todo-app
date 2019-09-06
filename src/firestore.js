import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBHO1TTOgnq12I445Ka3oJ-ilE5AIdFiUY",
  authDomain: "todo-app-e345c.firebaseapp.com",
  databaseURL: "https://todo-app-e345c.firebaseio.com",
  projectId: "todo-app-e345c",
  storageBucket: "",
  messagingSenderId: "77862428658",
  appId: "1:77862428658:web:1c702f95c5efa981ae556b"
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
