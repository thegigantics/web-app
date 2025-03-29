import React from "react";
import CreateBlog from "../components/CreateBlog";
import { getUser, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
      <CreateBlog />
    </div>
  );
};

export default Dashboard;
