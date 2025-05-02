import React from 'react';
import { Link } from 'react-router-dom';
import './PatientSideButtons.css';

const PatientSideButtons = () => {
  return (
    <div className="patient-page-side-buttons">
      <Link to="/diagnosis" className="patient-page-side-btn patient-page-test-btn">
        <span className="patient-page-btn-text">Depression Test</span>
        <span className="patient-page-btn-icon">+</span>
      </Link>
      <button className="patient-page-side-btn patient-page-ai-btn">
        <span className="patient-page-btn-text">AI Assistant</span>
        <span className="patient-page-btn-icon">⚡</span>
      </button>
      <button className="patient-page-side-btn patient-page-info-btn">
        <span className="patient-page-btn-text">Information</span>
        <span className="patient-page-btn-icon">i</span>
      </button>
    </div>
  );
};

export default PatientSideButtons;