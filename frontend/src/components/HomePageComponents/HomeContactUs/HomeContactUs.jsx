import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./HomeContactUs.css"

export default function Home() {


    return (
       
      <div className="contact-container">
      <div className="item">
        <div className="contact">
          <div className="first-text">Get in touch </div>
          <img src="src/assets/images/1.png" alt="image" className="image" />
          <div className="social-links">
            <span className="secnd-text">Connect with us:</span>
            <ul className="social-media">
              <li>
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bxl-youtube"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="submit-form">
          <h4 className="third-text text">Contact Us</h4>
          <form action="#" className="form-contact ">
            <div className="input-box">
              <input type="text" className="input" required />
              <label htmlFor="">Name</label>
            </div>
            <div className="input-box">
              <input type="email" className="input" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-box">
              <input type="tel" className="input" />
              <label htmlFor="">Phone number</label>
            </div>
            <div className="input-box">
              <textarea
                name=""
                id="message"
                cols={30}
                rows={10}
                className="input"
                required
              ></textarea>
              <label htmlFor="">Message</label>
            </div>
            <input type="submit" value="Submit" className="contact-btn" />
          </form>
        </div>
      </div>
    </div>
      );
    }