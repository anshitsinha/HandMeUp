// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "handmeup-ca17e.firebaseapp.com",
  projectId: "handmeup-ca17e",
  storageBucket: "handmeup-ca17e.appspot.com",
  messagingSenderId: "254603418861",
  appId: "1:254603418861:web:bac77a0c528b67fd2e40e4",
  measurementId: "G-RN1VJXBEDJ",
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

