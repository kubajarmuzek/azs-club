import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB622bzKwBaFFN6dZSQilJcbbsR74O5r9M",
  authDomain: "meritoazs.firebaseapp.com",
  projectId: "meritoazs",
  storageBucket: "meritoazs.appspot.com",
  messagingSenderId: "1028757962229",
  appId: "1:1028757962229:web:ce7bef539d039d5f6e34bc"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getDatabase()