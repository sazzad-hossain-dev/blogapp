// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7D4ft_ZYo9LripnHfghZL0TjAfFCXOxY",
    authDomain: "blogapp-97612.firebaseapp.com",
    projectId: "blogapp-97612",
    storageBucket: "blogapp-97612.firebasestorage.app",
    messagingSenderId: "793416532922",
    appId: "1:793416532922:web:48a5cd4fb9da9d14cc9383",
    measurementId: "G-TP8WNTHDGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
