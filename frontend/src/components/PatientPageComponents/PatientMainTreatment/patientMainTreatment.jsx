import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientMainTreatment.css';

const PatientTreatmentComponent = () => {
  const [treatmentData, setTreatmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeUntilSession, setTimeUntilSession] = useState(null);
  const [canJoinSession, setCanJoinSession] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
        const response = await axios.get('http://127.0.0.1:8000/api/patient/treatment/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTreatmentData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load treatment data');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, []);

  useEffect(() => {
    if (!treatmentData?.next_session) return;

    const calculateTime = () => {
      const now = new Date();
      const sessionTime = new Date(treatmentData.next_session.scheduled_time);
      const diffMs = sessionTime - now;
      const diffMins = Math.floor(diffMs / 60000);

      setTimeUntilSession(diffMins);
      setCanJoinSession(diffMins <= 10 && diffMins >= 0);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);

    return () => clearInterval(interval);
  }, [treatmentData]);

  const formatSessionTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div className="patient-treatment-container">Loading...</div>;
  if (error) return <div className="patient-treatment-container">Error: {error}</div>;

  if (treatmentData && !treatmentData.has_therapist) {
    return (
      <div className="patient-treatment-container">
        <div className="patient-treatment-header">
          <h2>Begin Your Treatment Journey</h2>
          <p>Start by selecting a therapist who matches your needs</p>
        </div>
        <div className="patient-treatment-start-card patient-treatment-glow-card">
          <h3>Ready to begin?</h3>
          <p>We'll help you find the right therapist for your needs</p>
          <button 
            className="patient-treatment-start-btn"
            onClick={() => window.location.href = '/findmytherapist'}
          >
            Find My Therapist
          </button>
        </div>
      </div>
    );
  }

  if (treatmentData && !treatmentData.has_plan) {
    return (
      <div className="patient-treatment-container">
        <div className="patient-treatment-header">
          <h2>Your Treatment Journey</h2>
          <p>Your therapist will create a treatment plan for you soon</p>
        </div>
        <div className="patient-treatment-therapist-card patient-treatment-glow-card">
          <div className="patient-treatment-therapist-info">
            <div className="patient-treatment-therapist-avatar">
              <div className="patient-treatment-avatar-placeholder"></div>
            </div>
            <div className="patient-treatment-therapist-details">
              <h2>{treatmentData.therapist.user.username}</h2>
              <p className="patient-treatment-specialization">
                {treatmentData.therapist.specialization || 'Therapist'}
              </p>
              <p className="patient-treatment-bio">
                {treatmentData.therapist.motto || 'Your assigned therapist'}
              </p>
              <div className="patient-treatment-therapist-actions">
                <button 
                  className="patient-treatment-message-btn"
                  onClick={() => window.location.href = '/messages'}
                >
                  Message Therapist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round(
    (treatmentData.completed_sessions / treatmentData.total_sessions) * 100
  );

  const recommendedTrainings = [
    { id: 1, title: "Cognitive Restructuring", duration: "15 min" },
    { id: 2, title: "Behavioral Activation", duration: "20 min" }
  ];

  const therapyTools = [
    { id: 1, title: "Mood Tracker", description: "Track your daily emotions" },
    { id: 2, title: "Thought Journal", description: "Record and challenge negative thoughts" }
  ];

  const guidedMeditations = [
    { id: 1, title: "Mindful Breathing", duration: "10 min" },
    { id: 2, title: "Body Scan Relaxation", duration: "15 min" }
  ];

  return (
    <div className="patient-treatment-container">
      {/* Header */}
      <div className="patient-treatment-header">
        <h2>Your Treatment Plan</h2>
        <p>Progress and resources for your therapy journey</p>
      </div>

      <div className="patient-treatment-progress-section">
        <div className="patient-treatment-progress-card patient-treatment-glow-card">
          <div className="patient-treatment-progress-circle">
            <div 
              className="patient-treatment-circle-progress" 
              style={{ '--percentage': `${progressPercentage}%` }}
            >
              <span>{progressPercentage}%</span>
            </div>
          </div>
          <h3>Treatment Progress</h3>
          <p>
            {treatmentData.completed_sessions} of {treatmentData.total_sessions} sessions completed
          </p>
        </div>

        <div className="patient-treatment-therapist-card patient-treatment-glow-card">
          <div className="patient-treatment-therapist-info">
            <div className="patient-treatment-therapist-avatar">
              <div className="patient-treatment-avatar-placeholder"></div>
            </div>
            <div className="patient-treatment-therapist-details">
              <h2>{treatmentData.therapist.user.username}</h2>
              <p className="patient-treatment-specialization">
                {treatmentData.therapist.specialization || 'Therapist'}
              </p>
              <p className="patient-treatment-bio">
                {treatmentData.therapist.motto || 'Your assigned therapist'}
              </p>
              <div className="patient-treatment-therapist-actions">
                <button 
                  className="patient-treatment-message-btn"
                  onClick={() => window.location.href = '/messages'}
                >
                  Message Therapist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {treatmentData.next_session && (
        <div className="patient-treatment-session-info patient-treatment-glow-card">
          <div className="patient-treatment-session-header">
            <h2>Next Session</h2>
            <p className="patient-treatment-session-time">
              Scheduled for: {formatSessionTime(treatmentData.next_session.scheduled_time)}
            </p>
            <p className="patient-treatment-countdown">
              {timeUntilSession > 0 
                ? `Starts in ${timeUntilSession} minutes` 
                : timeUntilSession === 0 
                  ? 'Session starting now' 
                  : 'Session time passed'}
            </p>
          </div>

          <div className="patient-treatment-session-goals">
            <h3 className="patient-treatment-goals-title">
              Session Goals
            </h3>
            <ul className="patient-treatment-goals-list">
              {treatmentData.treatment_plan.goals.slice(0, 4).map(goal => (
                <li 
                  key={goal.id}
                  className="patient-treatment-goal-item"
                >
                  <span className="patient-treatment-goal-text">{goal.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="patient-treatment-session-actions">
            <button 
              className={`patient-treatment-session-btn ${canJoinSession ? 'patient-treatment-active' : ''}`}
              onClick={() => window.location.href = '/video-session'}
              disabled={!canJoinSession}
            >
              {canJoinSession ? 'Join Session' : `Available in ${timeUntilSession - 10} mins`}
            </button>
            <button 
              className="patient-treatment-reschedule-btn"
              onClick={() => window.location.href = '/reschedule'}
            >
              Reschedule Session
            </button>
          </div>
        </div>
      )}

      <div className="patient-treatment-recommended-content">
        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Recommended Trainings</h2>
          <ul>
            {recommendedTrainings.map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-training-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-training-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.duration}</p>
                <button 
                  className="patient-treatment-action-btn"
                  onClick={() => window.location.href = `/training/${item.id}`}
                >
                  Start
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Therapy Tools</h2>
          <ul>
            {therapyTools.map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-tool-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-tool-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="patient-treatment-action-btn"
                  onClick={() => window.location.href = `/tools/${item.id}`}
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Guided Meditations</h2>
          <ul>
            {guidedMeditations.map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-meditation-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-meditation-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.duration}</p>
                <button 
                  className="patient-treatment-action-btn"
                  onClick={() => window.location.href = `/meditation/${item.id}`}
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientTreatmentComponent;