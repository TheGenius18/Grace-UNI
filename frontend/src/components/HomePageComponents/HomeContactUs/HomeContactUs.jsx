import React from "react";
import { useState } from "react";
import "./HomeContactUs.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-info">
          <h2 className="contact-title">Get in touch</h2>
          <div className="contact-image-container">
            <img src="src/assets/images/1.png" alt="Contact us" className="contact-image" />
            <div className="image-glow"></div>
          </div>
          <h3 className="connect-text">Connect with us:</h3>
          <div className="social-links">
            {['facebook', 'twitter', 'youtube', 'linkedin'].map((social) => (
              <a href="#" key={social} className="social-link">
                <i className={`bx bxl-${social}`}></i>
                <span className="social-glow"></span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="contact-form-section">
          <h2 className="form-title">Contact Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className="form-input"
              />
              <label className="form-label">Name</label>
              <div className="input-underline"></div>
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                className="form-input"
              />
              <label className="form-label">Email</label>
              <div className="input-underline"></div>
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
              <label className="form-label">Phone number</label>
              <div className="input-underline"></div>
            </div>
            
            <div className="form-group">
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required 
                className="form-input textarea"
              ></textarea>
              <label className="form-label">Message</label>
              <div className="input-underline"></div>
            </div>
            
            <button type="submit" className="submit-btn">
              <span>Submit</span>
              <div className="btn-glow"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}