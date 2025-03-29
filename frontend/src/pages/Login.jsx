import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { auth, googleProvider } from "../firebase"; // Ensure firebase is configured
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Ensure correct CSS file is included
import logo from "/images/logo.png"; // Add your logo
import loginImage from "/images/login-image.png"; // Add the left-side image

const Login = () => {
  const [showModal, setShowModal] = useState(true); // Open modal on page load
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in successfully with Google!");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Email Login Error:", error);
    }
  };

  return (
    <div className="login-wrapper">
      {showModal && (
        <div className="login-modal">
          <div className="login-container">
            <div className="login-left">
              <img src={loginImage} alt="Login" />
            </div>
            <div className="login-right">
              <FaUser className="login-icon" />
              <h2>Sign In</h2>
              <form onSubmit={handleEmailLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign In</button>
              </form>
              <p className="forgot-password">Forgot your password?</p>
              <button className="google-login" onClick={handleGoogleLogin}>
                Sign in with Google
              </button>
              <p className="signup-link">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
