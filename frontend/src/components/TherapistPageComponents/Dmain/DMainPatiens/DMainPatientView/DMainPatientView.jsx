import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../../../../context/context';
import './DMainPatientView.css';

const PatientView = () => {
  const { currentPatient, setCurrentPatient } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlanExpanded, setIsPlanExpanded] = useState(false);
  const [isAppointmentExpanded, setIsAppointmentExpanded] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  if (!currentPatient) return null;

  const treatmentPlan = {
    diagnosis: 'Generalized Anxiety Disorder',
    goals: ['Reduce catastrophic thinking', 'Improve sleep habits'],
    progress: '65%',
    nextSteps: 'Continue thought records, introduce relaxation techniques'
  };

  const handleStartSession = () => {
    alert(`Starting session with ${currentPatient.name}`);
  };

  const handleStartChat = () => {
    alert(`Opening chat with ${currentPatient.name}`);
  };

  const togglePlanExpansion = () => {
    setIsPlanExpanded(!isPlanExpanded);
    if (isAppointmentExpanded) setIsAppointmentExpanded(false);
  };

  const toggleAppointmentExpansion = () => {
    setIsAppointmentExpanded(!isAppointmentExpanded);
    if (isPlanExpanded) setIsPlanExpanded(false);
  };

  return (
    <div className={`patient-view-container ${isVisible ? 'fade-in' : ''}`}>
      <div className="patient-view">
        <div className="patient-header">
          <div className="patient-avatar-large scale-in">
            {currentPatient.avatar || currentPatient.name.charAt(0)}
          </div>
          <div className="slide-in-right">
            <h1>{currentPatient.name}</h1>
            <p className="patient-meta">Last session: {currentPatient.lastSession}</p>
          </div>
        </div>
        
        <div className="patient-details-rows">
          <div className="detail-row">
            <div className={`detail-card card-enter ${isAppointmentExpanded ? 'expanded' : ''}`}>
              <div className="appointment-header" onClick={toggleAppointmentExpansion}>
                <h2>Appointment</h2>
                <span className="expand-icon">
                  {isAppointmentExpanded ? '−' : '+'}
                </span>
              </div>
              <div className={`appointment-content ${isAppointmentExpanded ? 'expanded' : ''}`}>
                <p className="appointment-time">{currentPatient.nextAppointment}</p>
                <div className="action-buttons">
                  <button 
                    className="primary-button pulse-hover" 
                    onClick={handleStartSession}
                  >
                    Start Therapy Session
                  </button>
                  <button 
                    className="secondary-button pulse-hover" 
                    onClick={handleStartChat}
                  >
                    Message Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="detail-row">
            <div className={`detail-card card-enter ${isPlanExpanded ? 'expanded' : ''}`} 
                 style={{ animationDelay: '0.1s' }}>
              <div className="treatment-header" onClick={togglePlanExpansion}>
                <h2>Treatment Plan</h2>
                <span className="expand-icon">
                  {isPlanExpanded ? '−' : '+'}
                </span>
              </div>
              
              <div className={`treatment-info ${isPlanExpanded ? 'expanded' : ''}`}>
                <div className="info-item">
                  <h3>Diagnosis</h3>
                  <p>{treatmentPlan.diagnosis}</p>
                </div>
                <div className="info-item">
                  <h3>Goals</h3>
                  <ul>
                    {treatmentPlan.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
                <div className="info-item">
                  <h3>Progress</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill progress-animate" 
                      style={{ width: treatmentPlan.progress }}
                      data-width={treatmentPlan.progress}
                    ></div>
                  </div>
                  <p>{treatmentPlan.progress} complete</p>
                </div>
                <div className="info-item">
                  <h3>Next Steps</h3>
                  <p>{treatmentPlan.nextSteps}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="back-button bottom-back-button" 
          onClick={() => setCurrentPatient(null)}
        >
          &larr; Back to all patients
        </button>
      </div>
    </div>
  );
};

export default PatientView;