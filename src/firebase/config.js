import app from 'firebase/app' ;
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmm59wmamWlghPKaJB6B66d6VTHj1EyeM",
  authDomain: "prog3final-e9160.firebaseapp.com",
  projectId: "prog3final-e9160",
  storageBucket: "prog3final-e9160.appspot.com",
  messagingSenderId: "396982915530",
  appId: "1:396982915530:web:3e5329b75ddfb9c6077f33",
  measurementId: "G-7P1Q9SE319"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();