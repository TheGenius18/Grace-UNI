import React, { useState } from 'react';
import './SelfDialogue.css';

const SelfDialogueExercise = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    currentThought: '',
    describeOthers: '',
    fairPerspective: '',
    nextTimeAction: ''
  });
  const [reflection, setReflection] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exercise submitted:', answers);
    // You might want to add form validation here
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="sd-step">
            <h2 className="sd-step-title">Step 1: Identify Your Current Thought</h2>
            <p className="sd-step-instruction">What negative or critical thought are you having about yourself right now?</p>
            <textarea
              name="currentThought"
              value={answers.currentThought}
              onChange={handleInputChange}
              placeholder="I'm ... because..."
              className="sd-textarea"
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="sd-step">
            <h2 className="sd-step-title">Step 2: Perspective Shift</h2>
            <p className="sd-step-instruction">If someone you cared about had this thought about themselves, how would you describe them?</p>
            <textarea
              name="describeOthers"
              value={answers.describeOthers}
              onChange={handleInputChange}
              placeholder="I would tell them that..."
              className="sd-textarea"
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="sd-step">
            <h2 className="sd-step-title">Step 3: Fair Perspective</h2>
            <p className="sd-step-instruction">What would be a more fair and balanced way to view this situation?</p>
            <textarea
              name="fairPerspective"
              value={answers.fairPerspective}
              onChange={handleInputChange}
              placeholder="A more balanced view would be..."
              className="sd-textarea"
              required
            />
          </div>
        );
      case 4:
        return (
          <div className="sd-step">
            <h2 className="sd-step-title">Step 4: Future Action</h2>
            <p className="sd-step-instruction">What could you do differently next time without being self-critical?</p>
            <textarea
              name="nextTimeAction"
              value={answers.nextTimeAction}
              onChange={handleInputChange}
              placeholder="Next time I will..."
              className="sd-textarea"
              required
            />
          </div>
        );
      case 5:
        return (
          <div className="sd-step sd-reflection">
            <h2 className="sd-step-title">Reflection</h2>
            <p className="sd-step-instruction">Take a moment to reflect on what you've discovered through this exercise.</p>
            <p className="sd-step-instruction">How does this new perspective feel compared to your original thought?</p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="I notice that..."
              className="sd-textarea sd-reflection-input"
            />
            <div className="sd-summary">
              <h3 className="sd-summary-title">Exercise Summary</h3>
              <p className="sd-summary-item"><strong>Original Thought:</strong> {answers.currentThought}</p>
              <p className="sd-summary-item"><strong>Compassionate View:</strong> {answers.describeOthers}</p>
              <p className="sd-summary-item"><strong>Balanced Perspective:</strong> {answers.fairPerspective}</p>
              <p className="sd-summary-item"><strong>Future Action:</strong> {answers.nextTimeAction}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sd-container">
      <header className="sd-header">
        <h1 className="sd-title">Self-Dialogue Exercise</h1>
        <p className="sd-description">
          This exercise helps you examine your self-talk and develop a more compassionate 
          and fair inner dialogue. Follow the steps to reframe negative thoughts.
        </p>
      </header>
      
      <div className="sd-progress">
        {[1, 2, 3, 4, 5].map((num) => (
          <div 
            key={num} 
            className={`
              sd-progress-step 
              ${step === num ? 'sd-progress-active' : ''} 
              ${step > num ? 'sd-progress-complete' : ''}
            `}
          >
            {num}
          </div>
        ))}
      </div>
      
      <form className="sd-form" onSubmit={handleSubmit}>
        {renderStep()}
        
        <div className="sd-buttons">
          {step > 1 && (
            <button 
              type="button" 
              onClick={handlePrevious} 
              className="sd-button sd-button-secondary"
            >
              ← Previous
            </button>
          )}
          
          {step < 4 && (
            <button 
              type="button" 
              onClick={handleNext} 
              className="sd-button sd-button-primary"
            >
              Next →
            </button>
          )}
          
          {step === 4 && (
            <button 
              type="submit" 
              className="sd-button sd-button-submit"
            >
              Complete Exercise
            </button>
          )}
          
          {step === 5 && (
            <button 
              type="button" 
              className="sd-button sd-button-complete" 
              disabled
            >
              ✓ Exercise Completed
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SelfDialogueExercise;