// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import app from 'firebase/app' ;
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmm59wmamWlghPKaJB6B66d6VTHj1EyeM",
  authDomain: "prog3final-e9160.firebaseapp.com",
  projectId: "prog3final-e9160",
  storageBucket: "prog3final-e9160.appspot.com",
  messagingSenderId: "396982915530",
  appId: "1:396982915530:web:3e5329b75ddfb9c6077f33",
  measurementId: "G-7P1Q9SE319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();