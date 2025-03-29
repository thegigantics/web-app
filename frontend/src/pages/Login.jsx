import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>

        {user ? (
          <>
            <p className="mb-4 text-gray-700">Hello, {user.displayName} 👋</p>
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="google-login-btn"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="google-icon"
            />
            <span className="google-text">Login with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
