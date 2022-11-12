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
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

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


const SelectCourse = document.getElementById("SelectCourse");
let unsub;
let todoRef = collection(db, "student");
const fullName = document.getElementById("fullName")
const fatherName = document.getElementById("fatherName");
const phoneNumer = document.getElementById("phoneNumer")
const cnic = document.getElementById("cinc");
const myFile = document.getElementById("formFileMultiple")
const rollNumber = document.getElementById("rollNumber")
const selectSection = document.getElementById("selectSection");
const formSubmit = document.getElementById("formSubmit");
const selectSection1 = document.getElementById("selectSection1");
// let getTodos = () => {
//     unsub = onSnapshot(
//         todoRef,
//         (querySnapshot) => {
//             todoList.innerHTML = "";
//             // allIDs = [];
//             console.log("chalra hai", querySnapshot);
//             querySnapshot.forEach((doc) => {
//                 // allIDs.push(doc.id);
//                 SelectCourse.innerHTML += ` <option value="${doc.data().courseName}">${doc.data().courseName}</option>`;
//         //         SelectCourse.innerHTML += `<li id='${doc.id}'>${doc.data().value
//         //             } <button onclick="deleteTodo('${doc.id}')">Delete</button>
//         // <button onclick="editTodo('${doc.id}','${doc.data().value
//         //             }')">Edit</button>
//         // </li>`;
//             });
//         }
//     );
// };
// window.addEventListener('load', getTodos())

formSubmit.addEventListener("click", async () => {

    let file = myFile.files[0];
    // let uid = auth.currentUser.uid;
    console.log(cnic.value);
    let url = await uploadFiles(file);
    if (SelectCourse.value != "" && selectSection.value != "") {
        try {

            await addDoc(todoRef, {
                SelectCourse: SelectCourse.value,
                fatherName: fatherName.value,
                fullName: fullName.value,
                phoneNumer: phoneNumer.value,
                cnic: cnic.value,
                rollNumber: rollNumber.value,
                selectSection: selectSection.value,

                formFileMultiple: url,
                lastsection: []


                // timestamp: new Date(),


            });

            swal("Good job!", "You clicked the button!", "success");

            fatherName.value = "";
            fullName.value = "";
            cnic.value = "";




        } catch (err) {
            console.log(err);
            swal("Something going wrong", err, "error");
        }
    }
    else {
        swal("Something going wrong", "please select couse option", "error");
    }

})



const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        console.log("upload")
        const storage = getStorage();
        // const auth = getAuth();
        // let uid = auth.currentUser.uid;

        console.log("conect")
        let uid = cnic.value
        const storageRef = ref(storage, `users/${uid}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};


