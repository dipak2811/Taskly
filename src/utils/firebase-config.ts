import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUPwmLQyG0teHA9p03Jt_wuXJQMXSqq3k",
  authDomain: "taskly-68d75.firebaseapp.com",
  projectId: "taskly-68d75",
  storageBucket: "taskly-68d75.appspot.com",
  messagingSenderId: "599335026774",
  appId: "1:599335026774:web:5449af4256c6075c19bbf7",
  measurementId: "G-M8C9DPRE12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
