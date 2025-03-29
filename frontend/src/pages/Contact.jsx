import React, { useState } from "react";
import "../styles/styles.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setMessage(result.message || "Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setMessage("Error sending message. Please try again.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Reach out to The GigAntics Community</p>
      </div>
      <section className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions, suggestions, or want to collaborate? We'd love to hear from you!</p>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>thegigantics@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          {message && <div className="success-message">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

