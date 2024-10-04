// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy7odkXCI5VRJlquc-fdB-zarD-43hvhA",
  authDomain: "testeapp-d1bc2.firebaseapp.com",
  projectId: "testeapp-d1bc2",
  storageBucket: "testeapp-d1bc2.appspot.com",
  messagingSenderId: "517146472235",
  appId: "1:517146472235:web:e1f015205e3c7e4b119f6e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
