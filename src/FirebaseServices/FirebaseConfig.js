// Import the functions you need from the SDKs you need
import { initializeApp  }   from "firebase/app";
import { getFirestore }     from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey            : "AIzaSyA4EQJPm7-8Jnj8rPJ2IKnJGZvHjVGneCU",
  authDomain        : "interior-web-app.firebaseapp.com",
  projectId         : "interior-web-app",
  storageBucket     : "interior-web-app.appspot.com",
  messagingSenderId : "240119286170",
  appId             : "1:240119286170:web:5f28e667352d6c78d05223",
  measurementId     : "G-BRDK7PMXF4"
};

// Initialize Firebase
const app       = initializeApp(firebaseConfig);

export const database  = getFirestore(app);
