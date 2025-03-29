import { initializeApp, getApps, getApp  } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
 storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
 messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
 appId: import.meta.env.VITE_FIREBASE_APPID,
 measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

// Check if Firebase app is already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, signOut };
