import React, { useState ,useEffect, useContext} from "react";
import axios from "axios";
import './ConnectionNavbar.css';

export default function Navbar() {
  return (
    <nav className="Connection-navbar">
      <div className="Connection-navbar-brand">Grace</div>
      <div className="Connection-navbar-actions">
        <button className="Connection-quick-exit-btn">Back</button>
        <button className="Connection-dark-mode-toggle">GO</button>
      </div>
    </nav>
  );
}