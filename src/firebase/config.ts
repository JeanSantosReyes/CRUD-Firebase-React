// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Configuracion JS
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHsGWxi-Wwbghp6wJgcL07ov5j1FomtT4",
    authDomain: "practica-react-js.firebaseapp.com",
    databaseURL: "https://practica-react-js-default-rtdb.firebaseio.com",
    projectId: "practica-react-js",
    storageBucket: "practica-react-js.appspot.com",
    messagingSenderId: "488201038601",
    appId: "1:488201038601:web:1c80c8eb813e7fc3c841d8",
    measurementId: "G-EPFP6F2BVG"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

// Configuracion JS
export const FirebaseDB = getDatabase(FirebaseApp);
