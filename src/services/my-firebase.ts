import *  as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_HB-H2AsF70cPDZsGMDesEx_XRN0Mb4k",
    authDomain: "rock-n-scroll.firebaseapp.com",
    databaseURL: "https://rock-n-scroll.firebaseio.com",
    projectId: "rock-n-scroll",
    storageBucket: "rock-n-scroll.appspot.com",
    messagingSenderId: "315327248292",
    appId: "1:315327248292:web:682dd5f9766e77c1"
  };

export const app = firebase.initializeApp(firebaseConfig);