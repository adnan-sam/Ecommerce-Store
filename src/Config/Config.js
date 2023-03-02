import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdZfDGxYllSlMvH2SG1m3YqH53erWxlRI",
  authDomain: "ymtraders-700119-6fed9.firebaseapp.com",
  projectId: "ymtraders-700119-6fed9",
  storageBucket: "ymtraders-700119-6fed9.appspot.com",
  messagingSenderId: "165781067721",
  appId: "1:165781067721:web:e12b965f929927aad2ba18",
  measurementId: "G-B51X8R76MP"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const auth = firebaseApp.auth();
  const fs= firebaseApp.firestore();
  const storage = firebaseApp.storage();

  export {auth,fs,storage};