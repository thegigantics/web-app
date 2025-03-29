import React, { useState } from "react";
import { register, googleLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      toast.success("Registration successful! Check your email.");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={googleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
