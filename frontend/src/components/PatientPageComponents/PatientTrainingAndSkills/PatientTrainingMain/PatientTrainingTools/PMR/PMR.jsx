import React, { useState, useEffect } from 'react';
import './PMR.css';

const PMRComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTense, setIsTense] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

   const muscleGroups = [
    {
      name: "Forehead",
      instruction: "Raise your eyebrows as high as possible, as if surprised",
      relax: "Let your forehead smooth out completely"
    },
    {
      name: "Eyes and Cheeks",
      instruction: "Squeeze your eyes tightly shut and smile widely",
      relax: "Release all tension around your eyes and cheeks"
    },
    {
      name: "Jaw",
      instruction: "Clench your teeth together firmly",
      relax: "Let your jaw drop slightly, keeping teeth slightly apart"
    },
    {
      name: "Neck",
      instruction: "Gently tilt your head back as if looking at the ceiling",
      relax: "Bring your head to a neutral, comfortable position"
    },
    {
      name: "Shoulders",
      instruction: "Raise your shoulders up toward your ears",
      relax: "Let your shoulders drop naturally"
    },
    {
      name: "Upper Arms",
      instruction: "Make fists and bend your arms to flex your biceps",
      relax: "Straighten your arms and relax your hands"
    },
    {
      name: "Hands",
      instruction: "Clench your fists as tightly as possible",
      relax: "Open your hands completely, fingers relaxed"
    },
    {
      name: "Back",
      instruction: "Arch your back slightly and pull shoulder blades together",
      relax: "Return to a neutral, comfortable position"
    },
    {
      name: "Stomach",
      instruction: "Tighten your abdominal muscles as if bracing for a punch",
      relax: "Release all tension in your core"
    },
    {
      name: "Buttocks",
      instruction: "Squeeze your glutes together firmly",
      relax: "Release all tension in your lower body"
    },
    {
      name: "Thighs",
      instruction: "Press your thighs together and tighten the muscles",
      relax: "Let your legs relax completely"
    },
    {
      name: "Calves",
      instruction: "Point your toes downward to flex calves",
      relax: "Return feet to neutral position"
    },
    {
      name: "Feet",
      instruction: "Curl your toes downward and tense your feet",
      relax: "Relax all muscles in your feet"
    }
  ];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      
      // Add pulse effect during last 3 seconds of tension
      if (isTense && timeLeft <= 3) {
        setIsPulsing(true);
      }
    } else if (isRunning && timeLeft === 0) {
      setIsPulsing(false);
      if (isTense) {
        setIsTense(false);
        setTimeLeft(20); // 20 seconds to relax
      } else {
        if (currentStep < muscleGroups.length - 1) {
          setCurrentStep(currentStep + 1);
          setIsTense(true);
          setTimeLeft(7); // 7 seconds to tense
        } else {
          setIsRunning(false);
          setShowSummary(true);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, isTense, currentStep]);

  const startExercise = () => {
    setCurrentStep(0);
    setIsTense(true);
    setTimeLeft(7);
    setIsRunning(true);
    setShowSummary(false);
  };

  const getProgressPercentage = () => {
    return ((currentStep + (isTense ? 0 : 0.5)) / muscleGroups.length) * 100;
  };

  return (
    <div className="pmr-container">
      <h2 className="pmr-title">Progressive Muscle Relaxation</h2>
      <p className="pmr-description">
        This exercise helps reduce muscle tension and promote relaxation by systematically tensing and relaxing different muscle groups.
      </p>

      {!isRunning && !showSummary && (
        <div className="pmr-instructions">
          <h3>Instructions</h3>
          <ol>
            <li>Find a quiet, comfortable place to sit or lie down</li>
            <li>For each muscle group, tense the muscles for 7 seconds</li>
            <li>Then relax completely for 20 seconds</li>
            <li>Pay attention to the difference between tension and relaxation</li>
            <li>Breathe deeply throughout the exercise</li>
          </ol>
          <button onClick={startExercise} className="pmr-button pmr-start-button">
            Begin Relaxation
          </button>
        </div>
      )}

      {isRunning && (
        <div className="pmr-exercise">
          <div className="pmr-progress-container">
            <div className="pmr-progress-bar">
              <div 
                className="pmr-progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <span className="pmr-progress-text">
              Step {currentStep + 1} of {muscleGroups.length}
            </span>
          </div>

          <div className={`pmr-current-step ${isPulsing ? 'pulse' : ''}`}>
            <div className="pmr-muscle-header">
              <h3>{muscleGroups[currentStep].name}</h3>
              <div className={`pmr-status ${isTense ? 'tense' : 'relax'}`}>
                {isTense ? 'Tense' : 'Relax'}
              </div>
            </div>
            
            <p className="pmr-instruction">
              {isTense 
                ? muscleGroups[currentStep].instruction 
                : muscleGroups[currentStep].relax}
            </p>
            
            <div className="pmr-timer-container">
              <div className={`pmr-time-circle ${isTense ? 'tense' : 'relax'}`}>
                {timeLeft}
              </div>
              <span className="pmr-timer-label">
                {isTense ? 'Tensing' : 'Relaxing'} for {timeLeft} seconds
              </span>
            </div>

            <div className="pmr-visual">
              <div className={`pmr-muscle-visual ${isTense ? 'active' : ''}`}>
                <div className="pmr-muscle-icon">
                  {muscleGroups[currentStep].name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsRunning(false)} 
            className="pmr-button pmr-stop-button"
          >
            Stop Exercise
          </button>
        </div>
      )}

      {showSummary && (
        <div className="pmr-summary">
          <div className="pmr-summary-icon">✓</div>
          <h3>Exercise Complete!</h3>
          <p>You've relaxed all major muscle groups. Take a moment to notice how your body feels.</p>
          <p>Practice this technique daily for best results in reducing tension and stress.</p>
          <button onClick={startExercise} className="pmr-button pmr-start-button">
            Start Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PMRComponent;