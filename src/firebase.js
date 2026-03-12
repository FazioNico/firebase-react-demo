// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, push, ref, set, update, get, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
    if (user) {
      // save user into database
      const collection = ref(database, 'demo-user/' + user.uid);
      update(collection, {
        name: user.displayName,
      });
    }
    callback(user);
  });
}

export const logout = async () => {
  await signOut(auth);
}

export const getUserSettings = async (userId) => {
  const collection = ref(database, 'demo-user/' + userId);
  const snapshot = await get(collection);
  const data = snapshot.val();
  return data;
}

/**
 * 
 * Basic firebase rules access
{
  "rules": {
    ".write": "false",
 		".read": true,
		"demo-user": {
      "$user_id": {
        // grants write access to the owner of this user account
        // whose uid must exactly match the key ($user_id)
        ".write": "$user_id === auth.uid"
      }
    }
  }
}
   */