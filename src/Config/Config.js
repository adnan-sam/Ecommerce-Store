import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAlxblzzaaL_ftCtgHnFKDpA_U3uWFnoEE",
    authDomain: "ymtraders-700119.firebaseapp.com",
    projectId: "ymtraders-700119",
    storageBucket: "ymtraders-700119.appspot.com",
    messagingSenderId: "899435600984",
    appId: "1:899435600984:web:71fa45c1ac6d525bd1be2d",
    measurementId: "G-VBG0BTLEGT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebaseApp.auth();
  const fs= firebaseApp.firestore();
  const storage = firebaseApp.storage();

  export {auth,fs,storage};