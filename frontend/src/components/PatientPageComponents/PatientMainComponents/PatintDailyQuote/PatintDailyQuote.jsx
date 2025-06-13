import React, { useState, useEffect, useRef } from 'react';
import './PatintDailyQuote.css';

const DailyQuote = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [typedQuote, setTypedQuote] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  
  const fullQuote = "Healing is not about moving on or 'getting over it,' it's about learning to make peace with our pain and finding meaning in our struggles.";

  useEffect(() => {
    const sequence = [
      { delay: 3000, phase: 1 }, 
      { delay: 5000, phase: 2 },  
      { delay: 500, phase: 3 }    
    ];

    const timers = sequence.map((step, i) => {
      return setTimeout(() => {
        setAnimationPhase(step.phase);
        if (step.phase === 2 && imageRef.current) {
          imageRef.current.classList.add('particle-effect');
        }
      }, sequence.slice(0, i+1).reduce((acc, curr) => acc + curr.delay, 0));
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (animationPhase >= 2) {
      const typingTimer = setTimeout(() => {
        if (currentIndex < fullQuote.length) {
          setTypedQuote(prev => prev + fullQuote[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }
      }, 30); 

      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, animationPhase, fullQuote]);

  useEffect(() => {
    if (animationPhase >= 2) {
      setTypedQuote('');
      setCurrentIndex(0);
    }
  }, [animationPhase]);

  return (
    <div className="quote-master-container patient-page-quote-background-circle">
      <div className="particle-background"></div>
      
      <div className="quote-card" 
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>
        
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        
        <div className={`quote-content ${animationPhase >= 2 ? 'visible' : ''}`}>
          <h3 className="quote-title">
            <span className="patient-title-underline">Daily Inspiration</span>

          </h3>
          <p className="quote-text" ref={quoteRef}>
            {typedQuote}
            <span className="cursor">|</span>
          </p>
        </div>
        
        <div className={`hello-container ${animationPhase === 0 ? 'active' : ''}`}>
          <div className="hello-text">HELLO</div>
          <div className="hello-ripple"></div>
        </div>
        
        <div className={`how-are-you-container ${animationPhase === 1 ? 'active' : ''}`}>
          <div className="how-are-you-text">Its a New Day<br/> How Are You?</div>
          <div className="how-are-you-ripple"></div>
        </div>
        
        <div className={`transition-effect ${animationPhase === 2 ? 'active' : ''}`}>
          <div className="transition-shards"></div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuote;