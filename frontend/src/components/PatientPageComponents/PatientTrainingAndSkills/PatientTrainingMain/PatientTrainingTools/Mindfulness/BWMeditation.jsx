import React, { useEffect, useState } from 'react';
import './BWMeditation.css';
// import meditationAudio from './meditation-guide.mp3';

const BWMeditation = ({ onExit }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  // const [audio] = useState(typeof Audio !== 'undefined' ? new Audio(meditationAudio) : null);
  const [particles, setParticles] = useState([]);

  // Handle audio playback
  // useEffect(() => {
  //   if (!audio) return;

  //   if (audioPlaying) {
  //     audio.loop = true;
  //     audio.play().catch(e => console.log("Audio play failed:", e));
  //   } else {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [audioPlaying, audio]);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);

    return () => setParticles([]);
  }, []);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className="bw-meditation">
      <button className="exit-btn" onClick={onExit}>
        ← Back to Mindfulness Hub
      </button>
      
      <div className="bw-container">
        <h2>Mindful Space</h2>
        <p className="instruction">
          {audioPlaying 
            ? "Follow the guided meditation" 
            : "Focus on the moving light and your breath"}
        </p>
        
        <div className="light-beam"></div>
        
        <div className="audio-controls">
          <button 
            className={`audio-toggle ${audioPlaying ? 'playing' : ''}`}
            onClick={toggleAudio}
          >
            {audioPlaying ? '⏸ Pause Guidance' : '▶️ Play Guidance'}
          </button>
          <p className="audio-status">
            {audioPlaying ? "Guided meditation in progress..." : "Silent mode - focus on your breath"}
          </p>
        </div>
        
        <div className="breath-indicator">
          <div className="breath-circle"></div>
          <p>Breathe with the expanding circle</p>
        </div>
      </div>

      {/* Floating particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}vw`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default BWMeditation;