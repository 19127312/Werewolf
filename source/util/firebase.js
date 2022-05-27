import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { useSelector } from 'react-redux';
import { authenticateUser, logoutUser } from '../store/authSlice';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC20ulRx6NZKUjjLW3bH5OD0Vor3uAfyMw",
    authDomain: "werewolf-ab04c.firebaseapp.com",
    projectId: "werewolf-ab04c",
    storageBucket: "werewolf-ab04c.appspot.com",
    messagingSenderId: "1027925714304",
    appId: "1:1027925714304:web:b3a2b91b1c423ed0924d65"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}



export async function signUpFirebase(email, password) {

    return await firebase.auth().createUserWithEmailAndPassword(email, password)
}

export async function signInFirebase(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password)

}

export function logoutFirebase() {
    firebase.auth().signOut()
}