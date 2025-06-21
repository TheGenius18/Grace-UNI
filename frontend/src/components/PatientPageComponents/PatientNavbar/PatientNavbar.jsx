import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './PatientNavbar.css';
import { Context } from '../../../context/context';

const PatientNavbar = () => {
  const { PMainChanger, setPMainChanger } = useContext(Context);
  const [activeButton, setActiveButton] = useState('main');
  const [ripple, setRipple] = useState({ x: 0, y: 0, id: null, buttonId: null });

  const handleButtonClick = (buttonName, e) => {
    setActiveButton(buttonName);
    setPMainChanger(buttonName);
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y, id: Date.now(), buttonId: buttonName });
    setTimeout(() => setRipple(prev => 
      prev.id === Date.now() ? { ...prev, id: null } : prev
    ), 600);
  };

  const menuItems = [
    { id: 'main', label: 'Main' },
    { id: 'treatment', label: 'Treatment' },
    { id: 'training', label: 'Tools' },
    { id: 'profile', label: 'Profile' },
    
   
  ];

  return (
    <nav className="patient-navbar">
      <div className="patient-navbar-container">
        <Link to="/home" className="patient-navbar-logo">
          <span>GRACE</span>
        </Link>
        
        <div className="patient-nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`patient-nav-btn ${activeButton === item.id ? 'patient-nav-active' : ''}`}
              onClick={(e) => handleButtonClick(item.id, e)}
              aria-current={activeButton === item.id ? 'page' : undefined}
            >
              {item.label}
              {activeButton === item.id && (
                <span className="patient-nav-dot-animation"></span>
              )}
              {ripple.id && ripple.buttonId === item.id && (
                <span 
                  className="patient-nav-ripple" 
                  style={{
                    left: ripple.x,
                    top: ripple.y
                  }}
                />
              )}
            </button>
          ))}
        </div>
        
        <Link to="/emergency" className="patient-emergency-btn emergency-mode urgent">
          <span className="patient-emergency-text">Emergency</span>
        </Link>
      </div>
    </nav>
  );
};

export default PatientNavbar;