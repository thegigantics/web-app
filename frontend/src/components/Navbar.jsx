import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="layout">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="The GigAntics Logo" />
            </Link>
          </div>
		  
		  {/* Standard Menu (Visible on Large Screens) */}
          <ul className={menuOpen ? "nav-links open" : "nav-links"}>
			<Link to="/">Home</Link> 
			<li><Link to="/blogs">Blogs</Link></li>
			<Link to="/login">Login</Link>
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
          </ul>
		  
		  {/* Hamburger Button (Visible on Small Screens) */}
		  <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </header>
      
      <main className="content">{children}</main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>The GigAntics Community</h3>
            <p>Empowering network professionals since 2025</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><i className="fas fa-envelope"></i> thegigantics@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 The GigAntics Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
