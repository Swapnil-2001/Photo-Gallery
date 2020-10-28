import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCdhjWw7skzODkgHRlU6BMAc41Ig6ad5vw",
  authDomain: "photo-gallery-46ff0.firebaseapp.com",
  databaseURL: "https://photo-gallery-46ff0.firebaseio.com",
  projectId: "photo-gallery-46ff0",
  storageBucket: "photo-gallery-46ff0.appspot.com",
  messagingSenderId: "711290812153",
  appId: "1:711290812153:web:c3b3a54be1bfbed81c5428",
  measurementId: "G-5H2TJP9S8Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {})
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {})
    .catch((error) => {
      console.log(error.message);
    });
};

export { projectFirestore, projectStorage, timestamp };
