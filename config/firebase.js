global.XMLHttpRequest = require("xhr2");
const firebase = require("firebase/app");
require("firebase/storage");

let firebaseConfig = {
  apiKey: "AIzaSyDPA-WZ6SwPLQO0xXCakcvONsEUenGNoeY",
  authDomain: "projet-conteneurs.firebaseapp.com",
  projectId: "projet-conteneurs",
  storageBucket: "projet-conteneurs.appspot.com",
  messagingSenderId: "1073973537621",
  appId: "1:1073973537621:web:a0ed6d66be3a92fd5adddc",
};

firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();

module.exports = fbStorage;
