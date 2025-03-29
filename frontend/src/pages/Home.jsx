import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to GigAntics Community</h1>
          <p>We Are On A Mission to Build A Better Future To Fight Unemployment!</p>
          <Link to="/about" className="btn">Our Story</Link>
        </div>
      </div>

      {/* Header */}
      <div className="page-header">
        <h1>A Simple 3-step Process to Get a Job!</h1>
      </div>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <img src="/images/network-setup.jpg" alt="Network Setup" />
          <h2>Reach Us Out</h2>
          <p>We hear about you and your skill sets.</p>
        </div>
        <div className="feature-card">
          <img src="/images/community.jpg" alt="Networking Community" />
          <h2>Connect with Mentor</h2>
          <p>We find out the best Mentor from our community and align them with you.</p>
        </div>
        <div className="feature-card">
          <img src="/images/events.jpg" alt="Networking Events" />
          <h2>Your Participation</h2>
          <p>Your 1:1 Gig participation with our Mentor and you will get a job once you complete it. No interviews or resumes required.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Do you love to be part of this Community?</h2>
        <p>Join us today to fight this crisis together.</p>
        <Link to="/contact" className="btn">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;
