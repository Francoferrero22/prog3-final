import app from 'firebase/app' ;
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmm59wmamWlghPKaJB6B66d6VTHj1EyeM",
  authDomain: "prog3final-e9160.firebaseapp.com",
  projectId: "prog3final-e9160",
  storageBucket: "prog3final-e9160.appspot.com",
  messagingSenderId: "396982915530",
  appId: "1:396982915530:web:c8f209984109f3d9077f33",
  measurementId: "G-16M9QGHD2Y"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();