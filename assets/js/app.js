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


const search = document.getElementById("search");
const btnsearch = document.getElementById("btnsearch");


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
let todoRef = collection(db, "student");
const card = document.getElementById("card")
let unsubscribe;
btnsearch.addEventListener("click", async () => {
    card.style.display = "flex";

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            card.innerHTML = `  <img src="${doc.data().formFileMultiple}" alt="Avatar" width="150px">
  <div class="containerss">
    <h4><b>${doc.data().fullName}</b></h4> 
    <p>${doc.data().fullName}</p>
    <p>${doc.data().SelectCourse}</p>

    <div class="col-md-12 mb-2">
    
     
      <Select  type="dropdown" id="selectSection"  data-checking="" class="form-control form_input_height " required>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Leave">Leave</option>
        <option value="Late">Late</option>
        

      </Select>
      
    </div>
        <button class="btn btn-outline-success" id="btnsearch" type="submit">Mark Attendus</button>
  </div>`;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    } catch (error) {
        console.log(err);
    }

})

