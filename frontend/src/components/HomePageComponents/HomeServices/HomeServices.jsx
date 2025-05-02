import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./HomeServices.css"

export default function Home() {
    return (
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-subtitle">Our Services</h2>
          <h1 className="services-title">Our Services & Features</h1>
          <div className="title-underline"></div>
        </div>
        <div className="services-grid">
          <div className="service-box">
            <div className="service-icon-container">
              <img src="src/assets/images/3.png" alt="Diagnosis" className="service-icon" />
              <div className="icon-glow"></div>
            </div>
            <h3>Diagnosis</h3>
            <p>
              Advanced AI-powered diagnosis with comprehensive analysis and personalized insights.
            </p>
            <button className="service-btn">
              <span>See More</span>
              <div className="btn-glow"></div>
            </button>
          </div>
          
          <div className="service-box featured">
            <div className="service-icon-container">
              <img src="src/assets/images/3.png" alt="Emotional Support" className="service-icon" />
              <div className="icon-glow"></div>
            </div>
            <h3>Emotional Support</h3>
            <p>
              24/7 emotional discharge assistance with empathetic AI companionship.
            </p>
            <button className="service-btn">
              <span>See More</span>
              <div className="btn-glow"></div>
            </button>
          </div>
          
          <div className="service-box">
            <div className="service-icon-container">
              <img src="src/assets/images/3.png" alt="Doctor Review" className="service-icon" />
              <div className="icon-glow"></div>
            </div>
            <h3>Doctor Review</h3>
            <p>
              Professional medical review and second opinion from certified practitioners.
            </p>
            <button className="service-btn">
              <span>See More</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </div>
    );
}