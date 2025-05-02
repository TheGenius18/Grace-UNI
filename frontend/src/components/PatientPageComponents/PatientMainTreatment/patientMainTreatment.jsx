import React, { useState, useEffect } from 'react';
import './PatientMainTreatment.css';

const PatientTreatmentComponent = () => {
  const [timeUntilSession, setTimeUntilSession] = useState(null);
  const [canJoinSession, setCanJoinSession] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  // Fake therapist data
  const therapist = {
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist - CBT Specialist",
    bio: "Specializing in depression and anxiety disorders with 10 years of experience. Certified in cognitive behavioral therapy and mindfulness techniques.",
    photo: null
  };

  // Fake session goals data
  const sessionGoals = [
    { id: 1, text: "Identify negative thought patterns", priority: 3 },
    { id: 2, text: "Practice cognitive restructuring techniques", priority: 2 },
    { id: 3, text: "Develop coping strategies for anxiety", priority: 1 },
    { id: 4, text: "Review mood tracking results", priority: 2 }
  ];

  // Fake session data
  const nextSession = new Date(Date.now() + 3600000 * 2).toISOString();
  const completedSessions = 4;
  const totalSessions = 12;

  // Calculate time until next session
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const sessionTime = new Date(nextSession);
      const diffMs = sessionTime - now;
      const diffMins = Math.floor(diffMs / 60000);

      setTimeUntilSession(diffMins);
      setCanJoinSession(diffMins <= 10 && diffMins >= 0);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);

    return () => clearInterval(interval);
  }, [nextSession]);

  const formatSessionTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const progressPercentage = Math.round((completedSessions / totalSessions) * 100);

  // Render star rating based on priority
  const renderPriorityStars = (priority) => {
    return (
      <div className="patient-treatment-goal-stars">
        {[...Array(3)].map((_, i) => (
          <span 
            key={i} 
            className={`patient-treatment-star ${i < priority ? 'patient-treatment-star-filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="patient-treatment-container">
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
            {completedSessions} of {totalSessions} sessions completed
          </p>
        </div>

        <div className="patient-treatment-therapist-card patient-treatment-glow-card">
          <div className="patient-treatment-therapist-info">
            <div className="patient-treatment-therapist-avatar">
              <div className="patient-treatment-avatar-placeholder"></div>
            </div>
            <div className="patient-treatment-therapist-details">
              <h2>{therapist.name}</h2>
              <p className="patient-treatment-specialization">{therapist.specialization}</p>
              <p className="patient-treatment-bio">{therapist.bio}</p>
              
              <div className="patient-treatment-therapist-actions">
                <button 
                  className="patient-treatment-message-btn"
                  onClick={() => console.log('Navigate to chat')}
                >
                  Message Therapist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="patient-treatment-session-info patient-treatment-glow-card">
        <div className="patient-treatment-session-header">
          <h2>Next Session</h2>
          <p className="patient-treatment-session-time">Scheduled for: {formatSessionTime(nextSession)}</p>
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
            {sessionGoals.map(goal => (
              <li 
                key={goal.id}
                className="patient-treatment-goal-item"
              >
                {/* {renderPriorityStars(goal.priority)} */}
                <span className="patient-treatment-goal-text">{goal.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="patient-treatment-session-actions">
          <button 
            className={`patient-treatment-session-btn ${canJoinSession ? 'patient-treatment-active' : ''}`}
            onClick={() => console.log('Join session')}
            disabled={!canJoinSession}
          >
            {canJoinSession ? 'Join Session' : `Available in ${timeUntilSession - 10} mins`}
          </button>
          <button 
            className="patient-treatment-reschedule-btn"
            onClick={() => console.log('Reschedule session')}
          >
            Reschedule Session
          </button>
        </div>
      </div>

      <div className="patient-treatment-recommended-content">
        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Recommended Trainings</h2>
          <ul>
            {[
              { id: 1, title: "Cognitive Restructuring", duration: "15 min" },
              { id: 2, title: "Behavioral Activation", duration: "20 min" }
            ].map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-training-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-training-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.duration}</p>
                <button className="patient-treatment-action-btn">Start</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Therapy Tools</h2>
          <ul>
            {[
              { id: 1, title: "Mood Tracker", description: "Track your daily emotions" },
              { id: 2, title: "Thought Journal", description: "Record and challenge negative thoughts" }
            ].map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-tool-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-tool-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="patient-treatment-action-btn">Open</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="patient-treatment-recommended-section patient-treatment-glow-card">
          <h2>Guided Meditations</h2>
          <ul>
            {[
              { id: 1, title: "Mindful Breathing", duration: "10 min" },
              { id: 2, title: "Body Scan Relaxation", duration: "15 min" }
            ].map(item => (
              <li 
                key={item.id}
                className={isHovered === `patient-treatment-meditation-${item.id}` ? 'patient-treatment-hovered' : ''}
                onMouseEnter={() => setIsHovered(`patient-treatment-meditation-${item.id}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <h3>{item.title}</h3>
                <p>{item.duration}</p>
                <button className="patient-treatment-action-btn">Play</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientTreatmentComponent;