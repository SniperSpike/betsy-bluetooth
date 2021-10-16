import { getFirestore } from "@firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATwLzati3bcnrDQKJWUrpYOD1rCaQeUZk",
  authDomain: "bluetooth-mediashare.firebaseapp.com",
  projectId: "bluetooth-mediashare",
  storageBucket: "bluetooth-mediashare.appspot.com",
  messagingSenderId: "368131953477",
  appId: "1:368131953477:web:5d6eff870f640c825ca42c",
};

const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase, auth, db };

// import { initializeApp, getApps, getApp } from "firebase/app";
// import {
//   getFirestore,
//   doc,
//   collection,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
//   FieldValue,
//   collectionGroup,
//   deleteDoc,
// } from "firebase/firestore";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyATwLzati3bcnrDQKJWUrpYOD1rCaQeUZk",
//   authDomain: "bluetooth-mediashare.firebaseapp.com",
//   projectId: "bluetooth-mediashare",
//   storageBucket: "bluetooth-mediashare.appspot.com",
//   messagingSenderId: "368131953477",
//   appId: "1:368131953477:web:5d6eff870f640c825ca42c",
// };

// const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const firestore = getFirestore(firebase);
// const auth = getAuth(firebase);

// export {
//   FieldValue,
//   firebase,
//   auth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   collection,
//   firestore,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
//   collectionGroup,
//   deleteDoc,
// };
