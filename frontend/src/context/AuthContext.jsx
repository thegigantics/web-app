import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Config (Replace with your Firebase credentials)
const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
 storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
 messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
 appId: import.meta.env.VITE_FIREBASE_APPID,
 measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create Context
const AuthContext = createContext();

// Custom Hook to Use Context
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Google Login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
