import React, { useEffect, useState } from "react";
import "./WelcomeBanner.css";

const WelcomeBanner = ({ userName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide banner after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || !userName) return null;

  return (
    <div className="welcome-banner">
      <span>👋 Hey <strong>{userName}</strong>, Welcome to Gigantics Community!</span>
      <button onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default WelcomeBanner;
