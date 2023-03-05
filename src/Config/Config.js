// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAlxblzzaaL_ftCtgHnFKDpA_U3uWFnoEE",
    authDomain: "ymtraders-700119.firebaseapp.com",
    databaseURL: "https://ymtraders-700119-default-rtdb.firebaseio.com",
    projectId: "ymtraders-700119",
    storageBucket: "ymtraders-700119.appspot.com",
    messagingSenderId: "899435600984",
    appId: "1:899435600984:web:6804931541c305d6d1be2d",
    measurementId: "G-BXG57PHG02"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}