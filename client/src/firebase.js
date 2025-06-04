import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV89DlZ6bR19QVPa5VsF3h6KpvD28fVj0",
  authDomain: "webproject-1a13c.firebaseapp.com",
  projectId: "webproject-1a13c",
  storageBucket: "webproject-1a13c.firebasestorage.app",
  messagingSenderId: "410629211269",
  appId: "1:410629211269:web:31121055a5883c6fe815ec",
  measurementId: "G-B0NB4Y28D6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
