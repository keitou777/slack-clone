// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// import {
// ​​  GoogleAuthProvider,
// ​​  getAuth,
// ​​  signInWithPopup,
// ​​  signInWithEmailAndPassword,
// ​​  createUserWithEmailAndPassword,
// ​​  sendPasswordResetEmail,
// ​​  signOut,
// ​​} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3AkXKhecJbCkXOJP7lEhSOhJ1ydeGiJE",
  authDomain: "slack-clone-d6766.firebaseapp.com",
  projectId: "slack-clone-d6766",
  storageBucket: "slack-clone-d6766.appspot.com",
  messagingSenderId: "133677627567",
  appId: "1:133677627567:web:9abc90175c01cb2d4efc5a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export { auth, provider, firebaseApp };

export default db;
