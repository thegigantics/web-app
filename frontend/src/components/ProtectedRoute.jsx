import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming Firebase Auth is set up

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from context

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
