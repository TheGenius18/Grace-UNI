import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./HomeServices.css"

export default function Home() {


    return (
       
      <div className="services-container">
      <h2>Our Services</h2>
      <h1>Our Services & Features</h1>
      <div className="row">
        <div className="box">
          <img src="src/assets/images/3.png" alt="banner logo" />
          <h3>Diangnosis</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
            sunt.
          </p>
          <button className="btn">See More</button>
        </div>
        <div className="box" id="special-box">
          <img src="src/assets/images/3.png" alt="banner logo" />
          <h3>Emotional discharge</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
            sunt.
          </p>
          <button className="btn">See More</button>
        </div>
        <div className="box">
          <img src="src/assets/images/3.png" alt="banner logo" />
          <h3>Doctor Review</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
            sunt.
          </p>
          <button className="btn">SEE MORE</button>
        </div>
      </div>
    </div>
      );
    }