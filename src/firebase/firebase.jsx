// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
  authDomain: "react-authentication--app.firebaseapp.com",
  databaseURL: "https://react-authentication--app-default-rtdb.firebaseio.com",
  projectId: "react-authentication--app",
  storageBucket: "react-authentication--app.appspot.com",
  messagingSenderId: "855222330187",
  appId: "1:855222330187:web:9b19feb9c270696ea3fece",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);