import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyClRe3Qb-uWXmdC1esR7ZrRPa2DbUIH6SU",
    authDomain: "social-media-app-ea07d.firebaseapp.com",
    databaseURL: "https://social-media-app-ea07d-default-rtdb.firebaseio.com",
    projectId: "social-media-app-ea07d",
    storageBucket: "social-media-app-ea07d.appspot.com",
    messagingSenderId: "217990996148",
    appId: "1:217990996148:web:cf69e828f30269179bb7e1",
    measurementId: "G-J29DFKZXNW"
};
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};