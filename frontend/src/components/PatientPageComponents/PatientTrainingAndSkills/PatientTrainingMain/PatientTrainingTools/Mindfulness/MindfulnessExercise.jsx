import React, { useState, useEffect } from 'react';
import './Mindfulness.css';

const MindfulnessExercise = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      title: "Naming",
      description: "Name what you're thinking without judgment",
      example: "e.g., 'Thinking about work', 'Remembering an event'",
      action: "What thought comes to mind right now?"
    },
    {
      title: "Feeling",
      description: "Notice what you're feeling without labeling it good or bad",
      example: "e.g., 'Tension in shoulders', 'Butterflies in stomach'",
      action: "What physical sensation do you notice?"
    },
    {
      title: "Focus",
      description: "Choose one thing to do with full attention",
      example: "e.g., 'Drinking tea', 'Feeling the keyboard keys'",
      action: "What will you focus on right now?"
    },
    {
      title: "Sharing",
      description: "Optionally share or reflect on your experience",
      example: "e.g., 'I noticed I was rushing', 'I felt calmer while focusing'",
      action: "What did you observe during this practice?"
    }
  ];

  useEffect(() => {
    let timer;
    if (isActive && progress < 100) {
      timer = setTimeout(() => setProgress(progress + 1), 50);
    }
    return () => clearTimeout(timer);
  }, [progress, isActive]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
      setIsActive(false);
      setUserInput('');
      setShowFeedback(false);
    } else {
      // Exercise complete
      setCurrentStep(0);
      setProgress(0);
      setIsActive(false);
      setUserInput('');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setShowFeedback(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="mindfulness-container">
      <div className="progress-tracker">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => {
              setCurrentStep(index);
              setProgress(0);
              setIsActive(false);
            }}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="exercise-card">
        <h2 className="step-title-animated">{steps[currentStep].title}</h2>
        <p className="step-description">{steps[currentStep].description}</p>
        <p className="step-example">{steps[currentStep].example}</p>

        {isActive ? (
          <>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="action-section">
              <label>{steps[currentStep].action}</label>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your observation here..."
              />
            </div>

            <button 
              className="next-button"
              onClick={handleNext}
              disabled={!userInput.trim()}
            >
              {currentStep === steps.length - 1 ? 'Complete Exercise' : 'Next Step'}
            </button>
          </>
        ) : (
          <button 
            className="start-button"
            onClick={handleStart}
          >
            Begin {steps[currentStep].title} Step
          </button>
        )}
      </div>

      {showFeedback && (
        <div className="feedback-animation">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="feedback-message">
            Great job completing the mindfulness exercise!
          </div>
        </div>
      )}

      <div className="breathing-animation">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default MindfulnessExercise;