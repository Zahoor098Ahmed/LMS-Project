
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJsVgn_xvEuvMAUSBznGh8vK2nCjO9WJ4",
  authDomain: "learnig-management-system.firebaseapp.com",
  projectId: "learnig-management-system",
  storageBucket: "learnig-management-system.firebasestorage.app",
  messagingSenderId: "868864751832",
  appId: "1:868864751832:web:fd704b208616d9ebb77fad",
  measurementId: "G-8NZNS08P52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default {app , auth , storage };

