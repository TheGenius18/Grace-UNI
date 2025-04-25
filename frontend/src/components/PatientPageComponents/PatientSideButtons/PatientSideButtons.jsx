import React from 'react';
import { Link } from 'react-router-dom';
import './PatientSideButtons.css';

const PatientSideButtons = () => {
  return (
    <div className="patient-side-buttons-container">
      <Link to="/diagnosis" className="patient-side-button patient-test-btn">
        Depression Test
      </Link>
      <button className="patient-side-button patient-ai-btn">
        AI Assistant
      </button>
      <button className="patient-side-button patient-info-btn">
        Information
      </button>
    </div>
  );
};

export default PatientSideButtons;