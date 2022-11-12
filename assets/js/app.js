import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    orderBy,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyB816YK0Qn0JQjKgBlFMfb2KzwwIDNp0Jg",
    authDomain: "studentmanagementsystem-5a2ba.firebaseapp.com",
    projectId: "studentmanagementsystem-5a2ba",
    storageBucket: "studentmanagementsystem-5a2ba.appspot.com",
    messagingSenderId: "196119911186",
    appId: "1:196119911186:web:6a316a822cb80800c5b1cb",
    measurementId: "G-H27E5988Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

const auth = getAuth();



const btnlogout = document.getElementById("btnlogout");

btnlogout.addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            console.log('Sign-out successful.');
            window.location.assign("../")
        })
        .catch((error) => {
            // An error happened
            console.log(error)
        });

})



