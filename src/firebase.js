// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, push, ref, set, update, get, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoOOzdankTbnQzszLS7Vi-wI3erKVd248",
  authDomain: "demo2020-75757.firebaseapp.com",
  databaseURL: "https://demo2020-75757.firebaseio.com",
  projectId: "demo2020-75757",
  storageBucket: "demo2020-75757.appspot.com",
  messagingSenderId: "517554055042",
  appId: "1:517554055042:web:b77aa47b36c9f9d685519b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const auth = getAuth(app);

export const saveUserName = async (userName) => {
  const collection = ref(database, 'demo-user');
  await push(collection, {
    name: userName,
  });
  console.log('user name saved');
}

export const getUsers = async () => {
  const collection = ref(database, 'demo-user');
  const snapshot = await get(collection);
  console.log('snapshot', snapshot);
  const data = snapshot.val();
  return data;
}

export const listenUsers = (callback) => {
  const collection = ref(database, 'demo-user');
  onValue(collection, (snapshot) => {
    const data = snapshot.val();
    const usersArray = Object.values(data);
    callback(usersArray);
  });
}

export const login = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log('user info', result);
}

export const listenAuth = (callback) => {
  onAuthStateChanged(auth, (user)=> {
    callback(user);
  });
}

export const logout = async () => {
  await signOut(auth);
}