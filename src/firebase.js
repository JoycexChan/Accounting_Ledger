// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRGEg58pPv-zR7Yx9uCDwm2BgnkSduWmQ",
  authDomain: "accountingledger.firebaseapp.com",
  projectId: "accountingledger",
  storageBucket: "accountingledger.appspot.com",
  messagingSenderId: "565370165287",
  appId: "1:565370165287:web:65a16ff34026d1cf7b5602",
  measurementId: "G-B3X1EW4L9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
