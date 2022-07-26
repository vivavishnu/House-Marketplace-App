// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf4rRgNRP5yPgnOVTgDkcL-R74lOpbc9k",
  authDomain: "house-marketplace-app-e13c4.firebaseapp.com",
  projectId: "house-marketplace-app-e13c4",
  storageBucket: "house-marketplace-app-e13c4.appspot.com",
  messagingSenderId: "291298603826",
  appId: "1:291298603826:web:448c28a026427454ff9d2b",
  measurementId: "G-XFH2M980YY",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
