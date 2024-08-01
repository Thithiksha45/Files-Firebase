// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACXtK4U8dgJox-B1NgRgmGXaXEJfPbkFA",
  authDomain: "file-uploader-7e9da.firebaseapp.com",
  projectId: "file-uploader-7e9da",
  storageBucket: "file-uploader-7e9da.appspot.com",
  messagingSenderId: "791036466005",
  appId: "1:791036466005:web:5917bedf2153dccc6155dc",
  measurementId: "G-CWP7480LQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
