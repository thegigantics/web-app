import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../styles/styles.css";


const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".story-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          section.classList.add("active");
        }
      });
    };
	
	window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load in case the section is already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="story-container">
      {/* Intro Section */}
      <section className="story-section intro-section" id="section1">
        <div className="story-content">
          <div className="story-text">
            <h1>The GigAntics Community</h1>
            <p>A community born from understanding the <span className="highlight">real challenges</span> professionals face in today's rapidly changing job market.</p>
            <button className="cta-button" onClick={() => scrollToSection("section2")}>
              Discover Our Story
            </button>
          </div>
          <div className="story-image">
            <img src="/images/team.jpg" alt="GigAntics Community" />
          </div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="story-section problem-section" id="section2">
        <div className="story-content">
          <div className="story-image">
            <img src="/images/team-member1.jpg" alt="LinkedIn Layoff Posts" />
          </div>
          <div className="story-text">
            <h2>The Reality We All See</h2>
            <p>Every day on Social Media, we scroll through countless posts with hashtags like <span className="highlight">#layoff</span> and <span className="highlight">#fired</span> from professionals across industries and organizations.</p>
			<p>These posts aren't just statistics. They represent real people facing sudden career disruptions and uncertainty about their future.</p>
          </div>
        </div>
		<button 
		  className="scroll-button"
		  onClick={() => document.getElementById("section3")?.scrollIntoView({ behavior: "smooth" })}
		>
		  🡻
		</button>
      </section>
      
      {/* Isolation Section */}
      <section className="story-section isolation-section" id="section3">
        <div className="story-content">
          <div className="story-text">
            <h2>The Missing Link</h2>
            <p>Why do these situations occur so frequently? Often, professionals focus solely on building technical expertise while neglecting to build meaningful professional connections.</p>
			<p>When challenges arise, they find themselves <span className="highlight">isolated</span> with limited access to opportunities that typically flow through established networks.</p>
		  </div>
          <div className="story-image">
            <img src="/images/team-member2.jpg" alt="Professional Isolation" />
          </div>
        </div>
		<button 
		  className="scroll-button"
		  onClick={() => document.getElementById("section4")?.scrollIntoView({ behavior: "smooth" })}
		>
		  🡻
		</button>
      </section>
      
      {/* Frustration Section */}
      <section className="story-section frustration-section" id="section4">
        <div className="story-content">
          <div className="story-image">
            <img src="/images/team-member3.jpg" alt="Job Search Frustration" />
          </div>
          <div className="story-text">
            <h2>The Mounting Frustration</h2>
            <p>Submitting resumes into digital voids. Attending countless interviews. Facing rejection after rejection. The job search process becomes increasingly demoralizing.</p>
			<p>The emotional toll is severe, and tragically, some professionals lose hope entirely. This is a <span className="highlight">systemic problem</span> that requires a community-based solution.</p>
		  </div>
        </div>
		<button 
		  className="scroll-button"
		  onClick={() => document.getElementById("section5")?.scrollIntoView({ behavior: "smooth" })}
		>
		  🡻
		</button>
      </section>
      
      {/* Solution Section */}
      <section className="story-section solution-section" id="section5">
        <div className="story-content">
          <div className="story-text">
            <h2>Standing Together</h2>
            <p>We recognized that this challenge can only be addressed when professionals come together, forming supportive networks before crises occur.</p>
			<p>By <span className="highlight">proactively connecting</span> and supporting each other, we can create resilience against career disruptions and ensure opportunities are accessible to all.</p>
          </div>
          <div className="story-image">
            <img src="/images/team-member4.jpg" alt="Professional Network" />
          </div>
        </div>
		<button 
		  className="scroll-button"
		  onClick={() => document.getElementById("section6")?.scrollIntoView({ behavior: "smooth" })}
		>
		  🡻
		</button>
      </section>
      
      {/* Birth Section */}
      <section className="story-section birth-section" id="section6">
        <div className="story-content">
          <div className="story-image">
            <img src="/images/favicon.png" alt="GigAntics Launch" />
          </div>
          <div className="story-text">
            <h2>The Birth of GigAntics</h2>
            <p>Here we go, The GigAntics Community was born. A space where professionals from all backgrounds come together to build meaningful connections, share opportunities, and support each other through career transitions.</p>
            <p>We're more than just a network; we're dedicated to transforming how professionals navigate their careers in today's unpredictable job market.</p>
			<a href="/login" className="cta-button">Join Our Community</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
