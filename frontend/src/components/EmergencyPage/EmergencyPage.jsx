import React, { useState, useRef, useEffect } from 'react';
import './EmergencyPage.css';
import Navbar from "../HomePageComponents/HomeNavbar/HomeNavbar"

const EmergencyPage = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const detailsRef = useRef(null);
  
  const emergencies = [
    {
        id: 1,
        title: "Suicidal Thoughts",
        description: "Having persistent thoughts about ending your life or making plans to do so.",
        advice: [
          "Reach out to someone you trust immediately",
          "Call a suicide hotline in your area",
          "Remove any means of self-harm from your environment",
          "Remember these feelings are temporary and help is available"
        ]
      },
      {
        id: 2,
        title: "Severe Anxiety Attack",
        description: "Experiencing overwhelming panic, rapid heartbeat, shortness of breath, and fear of losing control.",
        advice: [
          "Practice deep breathing (inhale for 4 counts, hold for 4, exhale for 6)",
          "Use grounding techniques (name 5 things you can see, 4 you can touch, etc.)",
          "Move to a quiet space if possible",
          "Remind yourself this will pass - anxiety attacks typically peak within 10 minutes"
        ]
      },
      {
        id: 3,
        title: "Self-Harm Urges",
        description: "Feeling strong impulses to hurt yourself as a way to cope with emotional pain.",
        advice: [
          "Delay acting on the urge for 15 minutes at a time",
          "Use alternatives like holding ice, snapping a rubber band, or drawing on skin",
          "Reach out to your support system",
          "Identify and address the underlying emotions causing the urge"
        ]
      },
      {
        id: 4,
        title: "Psychotic Symptoms",
        description: "Experiencing hallucinations, delusions, or losing touch with reality.",
        advice: [
          "Contact your mental health professional immediately",
          "Have a trusted person stay with you",
          "Avoid making major decisions while experiencing symptoms",
          "Remind yourself that these are symptoms, not reality"
        ]
      },
      {
        id: 5,
        title: "Extreme Isolation",
        description: "Withdrawing completely from social contact for an extended period.",
        advice: [
          "Start with small social steps (text, then call, then visit)",
          "Schedule brief check-ins with supportive people",
          "Consider joining an online support group",
          "Set achievable daily social goals"
        ]
      },
      {
        id: 6,
        title: "Medication Reaction",
        description: "Experiencing severe side effects or adverse reactions to psychiatric medication.",
        advice: [
          "Contact your prescribing doctor immediately",
          "Do not stop medication abruptly without medical advice",
          "Note all symptoms and when they started",
          "If severe (difficulty breathing, swelling), go to emergency room"
        ]
      },
      {
        id: 7,
        title: "Trauma Flashback",
        description: "Re-experiencing past traumatic events as if they're happening now.",
        advice: [
          "Use grounding techniques to reconnect with the present",
          "Remind yourself you're safe now",
          "Engage your senses (strong smells, textured objects)",
          "Reach out to your therapist or support person"
        ]
      },
      {
        id: 8,
        title: "Severe Depression Episode",
        description: "Unable to perform basic self-care, persistent hopelessness, or feeling completely numb.",
        advice: [
          "Break tasks into tiny, manageable steps",
          "Focus on basic needs (hydration, nutrition, hygiene)",
          "Avoid making major life decisions during this time",
          "Reach out for professional support"
        ]
      },
      {
        id: 9,
        title: "Substance Abuse Relapse",
        description: "Returning to harmful substance use after a period of abstinence.",
        advice: [
          "Reach out to your support network immediately",
          "Attend a support group meeting",
          "Remove substances from your environment",
          "Remember relapse is part of recovery for many people"
        ]
      },
      {
        id: 10,
        title: "Emotional Overwhelm",
        description: "Feeling completely flooded by emotions and unable to cope.",
        advice: [
          "Use the TIPP technique: Temperature (cold water on face), Intense exercise, Paced breathing, Paired muscle relaxation",
          "Create distance with " + 
          "journaling or art",
          "Practice self-compassion - acknowledge how hard this is",
          "Contact your therapist to process what triggered this"
        ]
      }
  ];

  const handleNotifyTherapist = () => {
    console.log(`Notifying therapist about emergency: ${selectedEmergency.title}`);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  const handleCardClick = (emergency) => {
    setSelectedEmergency(emergency);
  };

  useEffect(() => {
    if (selectedEmergency && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [selectedEmergency]);

  return (
    <div className="emergency-component">
    <Navbar/>
    <div className="emergency-component-container">
      <h1 className="emergency-component-title">Mental Health Emergency Resources</h1>
      <p className="emergency-component-text">Select an emergency situation to view guidance and support options</p>
      
      <div>
        <h2 className="emergency-component-section-title">Common Emergencies</h2>
        <div className="emergency-component-list">
          {emergencies.map(emergency => (
            <div 
              key={emergency.id}
              className="emergency-component-card"
              onClick={() => handleCardClick(emergency)}
            >
              <h3 className="emergency-component-card-title">{emergency.title}</h3>
              <p className="emergency-component-card-description">{emergency.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div ref={detailsRef}>
        {selectedEmergency && (
          <div className="emergency-component-detail">
            <h3 className="emergency-component-emergency-title">{selectedEmergency.title}</h3>
            <p className="emergency-component-text">{selectedEmergency.description}</p>
            
            <h4 className="emergency-component-subtitle">Recommended Actions:</h4>
            <ul className="emergency-component-advice-list">
              {selectedEmergency.advice.map((item, index) => (
                <li key={index} className="emergency-component-advice-item">{item}</li>
              ))}
            </ul>
            
            <button 
              className="emergency-component-notify-button"
              onClick={handleNotifyTherapist}
              disabled={messageSent}
            >
              {messageSent ? "Therapist Notified" : "Notify My Therapist"}
            </button>
            
            {messageSent && (
              <p className="emergency-component-text">Your therapist has been notified about this emergency and will reach out to you.</p>
            )}
          </div>
        )}
      </div>
      
      <div className="emergency-component-crisis-support">
        <h2 className="emergency-component-section-title">24/7 Crisis Support</h2>
        <p className="emergency-component-text">If you're in immediate danger, please call emergency services or a crisis hotline:</p>
        <ul className="emergency-component-crisis-list">
          <li className="emergency-component-crisis-item">National Suicide Prevention Lifeline: 988 (US)</li>
          <li className="emergency-component-crisis-item">Crisis Text Line: Text HOME to 741741 (US)</li>
          <li className="emergency-component-crisis-item">Your local emergency number</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default EmergencyPage;