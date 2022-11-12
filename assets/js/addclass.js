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
            window.location.assign("../../")
        })
        .catch((error) => {
            // An error happened
            console.log(error)
        });

})


let days = [];
const classTiming = document.getElementById("classTiming");
const mon = document.getElementById("mon")
const tue = document.getElementById("tue")
const wed = document.getElementById("wed")
const thu = document.getElementById("thu")
const fri = document.getElementById("fri")
const sat = document.getElementById("sat")
const sun = document.getElementById("sun")

const teacherName = document.getElementById("teacherName")
const sectionName = document.getElementById("sectionName");
const courseName = document.getElementById("courseName");
const batchNumber = document.getElementById("batchNumber")

const formSubmit = document.getElementById("formSubmit");


let todoRef = collection(db, "class");

formSubmit.addEventListener("click", async () => {



    if (mon.checked) {
        days.push(mon.value)
    }
    if (tue.checked) {
        days.push(tue.value)
    }
    if (wed.checked) {
        days.push(wed.value)

    }
    if (thu.checked) {
        days.push(thu.value)
    }
    if (fri.checked) {
        days.push(fri.value)
    }
    if (sat.checked) {
        days.push(sat.value)
    }
    if (sun.checked) {
        days.push(sun.value)
    }
    try {

        await addDoc(todoRef, {
            classTiming: classTiming.value,
            ScheduleOfClasses: days,
            teacherName: teacherName.value,
            sectionName: sectionName.value,
            courseName: courseName.value,
            batchNumber: batchNumber.value


            // timestamp: new Date(),


        });

        swal("Good job!", "You clicked the button!", "success");
        classTiming.value = ""
        mon.checked = false;
        tue.checked = false;
        wed.checked = false;
        thu.checked = false;
        fri.checked = false;
        sat.checked = false;
        sun.checked = false;
        teacherName.value = "";
        sectionName.value = "";
        courseName.value = "";
        batchNumber.value = 0;




    } catch (err) {
        console.log(err);
        swal("Something going wrong", err, "error");
    }

})
