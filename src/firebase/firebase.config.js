import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // ✅ Add this for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYF1TBDQy9DGyN9eGE1TFjCb5KOBcyQLc",
  authDomain: "my-e-diary-25ec9.firebaseapp.com",
  projectId: "my-e-diary-25ec9",
  storageBucket: "my-e-diary-25ec9.firebasestorage.app",
  messagingSenderId: "591987514316",
  appId: "1:591987514316:web:78ca5e92a971dcaf21db69"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const firestore = firebase.firestore(app); // ✅ Correct way for compat

const firebaseSDK = { app, auth, firestore };

export default firebaseSDK;
