import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Config (Replace with your Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAUooLywGkoQDbwzXUm974MeQ7xzpytpfs",
  authDomain: "the-gigantics.firebaseapp.com",
  projectId: "the-gigantics",
  storageBucket: "the-gigantics.firebasestorage.app",
  messagingSenderId: "179033552687",
  appId: "1:179033552687:web:f0528043cb47aba9c5d3da",
  measurementId: "G-HV5MCT2G1N"
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
