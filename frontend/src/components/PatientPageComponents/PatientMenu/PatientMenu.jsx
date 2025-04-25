import React, { useState } from 'react';
import './PatientMenu.css';

const PatientMenu = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="patient-menu-container">
      <div className="patient-menu-dots-line"></div>
      <div className="patient-menu-button-wrapper">
        <button 
          className={`patient-menu patient-menu-profile-btn ${activeButton === 'profile' ? 'active' : ''}`}
          onClick={() => handleButtonClick('profile')}
        >
          <span className="patient-menu-dot-animation"></span>
          Profile
        </button>
        <button 
          className={`patient-menu patient-menu-skills-btn ${activeButton === 'skills' ? 'active' : ''}`}
          onClick={() => handleButtonClick('skills')}
        >
          <span className="patient-menu-dot-animation"></span>
          Skills & Tasks
        </button>
        <button 
          className={`patient-menu patient-menu-treatment-btn ${activeButton === 'treatment' ? 'active' : ''}`}
          onClick={() => handleButtonClick('treatment')}
        >
          <span className="patient-menu-dot-animation"></span>
          Treatment
        </button>
      </div>
    </div>
  );
};

export default PatientMenu;