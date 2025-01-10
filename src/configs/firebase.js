import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7D4ft_ZYo9LripnHfghZL0TjAfFCXOxY",
    authDomain: "blogapp-97612.firebaseapp.com",
    projectId: "blogapp-97612",
    storageBucket: "blogapp-97612.firebasestorage.app",
    messagingSenderId: "793416532922",
    appId: "1:793416532922:web:48a5cd4fb9da9d14cc9383",
    measurementId: "G-TP8WNTHDGT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
