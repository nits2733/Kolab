// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kolab-8f893.firebaseapp.com",
  projectId: "kolab-8f893",
  storageBucket: "kolab-8f893.firebasestorage.app",
  messagingSenderId: "944395821791",
  appId: "1:944395821791:web:132b150e3ed1b02437ff6a",
  measurementId: "G-B8LCY7HDR3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
