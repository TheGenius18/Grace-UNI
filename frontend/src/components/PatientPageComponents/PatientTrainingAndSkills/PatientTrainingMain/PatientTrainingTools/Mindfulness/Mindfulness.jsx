import React, { useState, useEffect } from 'react';
import './MindfulnessHub.css';
import MindfulnessExercise from './MindfulnessExercise'; // Your previous component
import BWMeditation from './BWMeditation'; // New B&W component

const MindfulnessHub = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  // Audio management
  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  const startExercise = (type) => {
    setCurrentExercise(type);
  };

  const exitExercise = () => {
    setCurrentExercise(null);
    setAudioPlaying(false);
  };

  if (currentExercise === 'color') {
    return <MindfulnessExercise onExit={exitExercise} />;
  }

  if (currentExercise === 'bw') {
    return <BWMeditation audioPlaying={audioPlaying} onExit={exitExercise} />;
  }

  return (
    <div className="mindfulness-hub">
      <header className="hub-header">
        <h1>Mindfulness Journey</h1>
        <p>Find your center in a busy world</p>
      </header>

      <nav className="hub-nav">
        <button 
          className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About Mindfulness
        </button>
        <button 
          className={`nav-btn ${activeTab === 'steps' ? 'active' : ''}`}
          onClick={() => setActiveTab('steps')}
        >
          How It Works
        </button>
        <button 
          className={`nav-btn ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          Benefits
        </button>
      </nav>

      <main className="hub-content">
        {activeTab === 'about' && (
          <div className="info-section animate-fade">
            <h2>What is Mindfulness?</h2>
            <div className="definition-card">
              <p>
                Mindfulness is the practice of being fully present and engaged in the current moment, 
                without judgment or distraction. It involves:
              </p>
              <ul>
                <li>Paying attention to your thoughts and feelings</li>
                <li>Observing without criticism</li>
                <li>Accepting your present experience</li>
              </ul>
            </div>
            <div className="analogy">
              <h3>Like Watching Clouds</h3>
              <p>
                Imagine your thoughts as clouds passing in the sky. Mindfulness teaches you to 
                observe them without getting carried away by them.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="info-section animate-fade">
            <h2>The Mindfulness Process</h2>
            <div className="steps-container">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Naming</h3>
                <p>Identify your thoughts without judgment ("I notice I'm thinking about...")</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Feeling</h3>
                <p>Acknowledge physical sensations and emotions ("I feel tension in my...")</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Focusing</h3>
                <p>Direct attention to one activity or anchor (breath, sounds, etc.)</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Returning</h3>
                <p>Gently bring focus back when the mind wanders (without self-criticism)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="info-section animate-fade">
            <h2>Benefits of Regular Practice</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🧠</div>
                <h3>Reduced Stress</h3>
                <p>Lowers cortisol levels and improves stress response</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💡</div>
                <h3>Improved Focus</h3>
                <p>Enhances concentration and attention span</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">❤️</div>
                <h3>Emotional Balance</h3>
                <p>Better regulation of emotions and reactions</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🌙</div>
                <h3>Better Sleep</h3>
                <p>Quiets the mind for deeper rest</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="exercise-options">
        <h3>Choose Your Practice:</h3>
        <div className="option-buttons">
          <button 
            className="option-btn color-option"
            onClick={() => startExercise('color')}
          >
            Colorful Guided Exercise
          </button>
          <button 
            className="option-btn bw-option"
            onClick={() => startExercise('bw')}
          >
            <span>Black & White Meditation</span>
            <span className="audio-indicator">
              {audioPlaying ? '🔊 Sound On' : '🔇 Sound Off'}
            </span>
          </button>
          <button 
            className={`audio-toggle ${audioPlaying ? 'active' : ''}`}
            onClick={toggleAudio}
          >
            {audioPlaying ? 'Pause Audio' : 'Enable Audio'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessHub;