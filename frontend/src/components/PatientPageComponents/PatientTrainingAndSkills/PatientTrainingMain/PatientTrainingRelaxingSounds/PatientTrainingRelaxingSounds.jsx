import React from 'react';
import "./PatientTrainingRelaxingSounds.css"

const RelaxingSounds = () => {
  const sounds = [
    {
      id: 1,
      title: "Gentle Rain",
      duration: "20 min",
      benefit: "Helps with sleep and reduces stress hormones"
    },
    {
      id: 2,
      title: "Ocean Waves",
      duration: "15 min",
      benefit: "Promotes relaxation and lowers heart rate"
    },
    {
      id: 3,
      title: "Forest Birds",
      duration: "15 min",
      benefit: "Elevates mood and reduces anxiety"
    },
    {
      id: 4,
      title: "Mountain Stream",
      duration: "12 min",
      benefit: "Improves focus and mental clarity"
    },
    {
      id: 5,
      title: "Summer Storm",
      duration: "11 min",
      benefit: "Creates a cozy atmosphere for relaxation"
    },
    {
      id: 6,
      title: "Desert Wind",
      duration: "9 min",
      benefit: "Helps with meditation and mindfulness"
    },
    {
      id: 7,
      title: "Autumn Leaves",
      duration: "10 min",
      benefit: "Reduces tension and promotes calmness"
    },
    {
      id: 8,
      title: "Winter Night",
      duration: "14 min",
      benefit: "Aids in deep sleep and relaxation"
    },
    {
      id: 9,
      title: "Zen Garden",
      duration: "15 min",
      benefit: "Encourages mindfulness and presence"
    },
    {
      id: 10,
      title: "Thunderstorm",
      duration: "25 min",
      benefit: "Helps release emotional tension"
    }
  ];

  return (
    <div className="relaxing-sound-component-container">
      <div className="relaxing-sound-component-background-blur"></div>
      
      <div className="relaxing-sound-component-content">
        {/* <h2 className="relaxing-sound-component-title">Relaxing Natural Sounds</h2>
        <p className="relaxing-sound-component-description">
          Immerse yourself in these therapeutic soundscapes to calm your mind
        </p> */}
        
        <div className="relaxing-sound-component-grid">
          {sounds.map((sound) => (
            <div key={sound.id} className="relaxing-sound-component-card">
              <div className="relaxing-sound-component-card-glow"></div>
              <div className="relaxing-sound-component-card-content">
                <div className="relaxing-sound-component-card-header">
                  <h3>{sound.title}</h3>
                  <span className="relaxing-sound-component-duration-badge">
                    {sound.duration}
                  </span>
                </div>
                <p className="relaxing-sound-component-card-benefit">
                  {sound.benefit}
                </p>
                <button className="relaxing-sound-component-play-button">
                  <span className="relaxing-sound-component-play-icon">▶</span>
                  Play Sound
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelaxingSounds;