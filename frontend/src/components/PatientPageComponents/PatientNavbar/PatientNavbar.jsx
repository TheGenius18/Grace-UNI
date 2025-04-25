import React from 'react';
import { Link } from 'react-router-dom';
import './PatientNavbar.css';

const PatientNavbar = () => {
  return (
    <nav className="patient-navbar">
      <div className="patient-navbar-container">
        <Link to="/home" className="patient-navbar-logo">
          <span>GRACE</span>
        </Link>
        <ul className="patient-nav-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <Link to="/emergency" className="patient-emergency-btn">
          Emergency
        </Link>
      </div>
    </nav>
  );
};

export default PatientNavbar;