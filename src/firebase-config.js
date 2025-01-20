// /frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDADg_e-wFFtUa8EDl_sL8au10IvNGDPhg",
  authDomain: "homesurveillancesystem-1f07a.firebaseapp.com",
  databaseURL: "https://homesurveillancesystem-1f07a-default-rtdb.firebaseio.com",
  projectId: "homesurveillancesystem-1f07a",
  storageBucket: "homesurveillancesystem-1f07a.firebasestorage.app",
  messagingSenderId: "546290862917",
  appId: "1:546290862917:web:292746635e4e038d8d8c2c",
  measurementId: "G-9SXMK25PRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
