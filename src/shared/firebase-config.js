// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQiUmDLFu1zMhaAzAm-1KmQuUNYPpOjqk",
  authDomain: "ecommerce-cdc3f.firebaseapp.com",
  projectId: "ecommerce-cdc3f",
  storageBucket: "ecommerce-cdc3f.appspot.com",
  messagingSenderId: "322153232852",
  appId: "1:322153232852:web:2e348952026c80d86ebe41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app);