import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCBiOiYSiyvuJrLy4NQVAszGDQlWj_GoNQ",
  authDomain: "cis371-hw3.firebaseapp.com",
  projectId: "cis371-hw3",
  storageBucket: "cis371-hw3.firebasestorage.app",
  messagingSenderId: "533803921784",
  appId: "1:533803921784:web:8e8c029956465efbff988d",
  measurementId: "G-VDHMJ254WT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
