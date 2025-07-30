// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoxGdQ0nC4K6wCp6jma3unAAY9-yfoPL4",
  authDomain: "bonn-products.firebaseapp.com",
  projectId: "bonn-products",
  storageBucket: "bonn-products.firebasestorage.app",
  messagingSenderId: "959615705471",
  appId: "1:959615705471:web:2e1cc29af5ebc214113a4a",
  measurementId: "G-E6S2LP8823"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };