import React from "react";
import { Link } from "react-router-dom";
import { getUser, logout } from "../services/authService";

const Navbar = () => {
  const user = getUser();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">My Blog</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link to="/create-blog">Create Blog</Link>
          </li>
        )}
        {user?.role === "superadmin" && (
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
