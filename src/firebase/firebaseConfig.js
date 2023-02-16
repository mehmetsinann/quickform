// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA6KfPDB4VvTusdk8DLp64rMjkEslc-Tc",
  authDomain: "quickform-cea9e.firebaseapp.com",
  projectId: "quickform-cea9e",
  storageBucket: "quickform-cea9e.appspot.com",
  messagingSenderId: "618042911215",
  appId: "1:618042911215:web:8b46ee2cbf1d1d43cb6e1a",
  measurementId: "G-JE5KJN6S2N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
