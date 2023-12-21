// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as strRef,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmcjvhpur9YbaliWCBY2ZdRzirdel2LoI",
  authDomain: "hrmredux.firebaseapp.com",
  projectId: "hrmredux",
  storageBucket: "hrmredux.appspot.com",
  messagingSenderId: "836917970235",
  appId: "1:836917970235:web:b7a19420ec0b3b33dba31e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (file: Blob) => {
  try {
    const storageRef = strRef(storage, crypto.randomUUID());
    const snapshot = await uploadBytes(storageRef, file);
    const imgURL = await getDownloadURL(snapshot.ref);
    return imgURL;
  } catch (error) {
    throw error;
  }
};
