import React, {useState} from "react";
import "./PatientTrainingMesitations.css"

const Meditations = () => {
    const meditations = [
      {
        id: 1,
        name: "Mindful Breathing",
        goal: "Reduce stress and increase present-moment awareness",
        duration: "10 min"
      },
      {
        id: 2,
        name: "Body Scan",
        goal: "Release physical tension and connect with your body",
        duration: "15 min"
      },
      {
        id: 3,
        name: "Loving-Kindness",
        goal: "Cultivate compassion for yourself and others",
        duration: "12 min"
      },
      {
        id: 4,
        name: "Guided Visualization",
        goal: "Promote relaxation through mental imagery",
        duration: "20 min"
      },
      {
        id: 5,
        name: "Zen Meditation",
        goal: "Develop focus and mental clarity",
        duration: "15 min"
      },
      {
        id: 6,
        name: "Sleep Meditation",
        goal: "Prepare mind and body for restful sleep",
        duration: "25 min"
      },
      {
        id: 7,
        name: "Sleep Meditation",
        goal: "Prepare mind and body for restful sleep",
        duration: "25 min"
      },
      {
        id: 8,
        name: "Sleep Meditation",
        goal: "Prepare mind and body for restful sleep",
        duration: "25 min"
      }
    ];
  
    return (
      <div className="meditations-container">
        <div className="meditation-cards">
          {meditations.map(meditation => (
            <div key={meditation.id} className="meditation-card">
                <div className="patient-meditation-head">
                    <div className="card-logo-medetation">
                        <img src="src/assets/images/4.png" alt="GRACE" />
                    </div>
                    <h3>{meditation.name}</h3>
                </div>
              <p className="duration">{meditation.duration}</p>
              <p className="goal">{meditation.goal}</p>
              <button className="start-button">start</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Meditations;