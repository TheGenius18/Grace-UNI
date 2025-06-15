import React, { useState, useEffect, useRef } from 'react';
import './Breathing.css';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const animationRef = useRef(null);
  const [breathProgress, setBreathProgress] = useState(0);
  const canvasRef = useRef(null);

  // 4-7-8 breathing timings (in seconds)
  const phases = {
    ready: { duration: 3, next: 'inhale', text: 'Get Ready', color: '#e0e0e0' },
    inhale: { duration: 4, next: 'hold', text: 'Breathe In', color: '#00bcd4' },
    hold: { duration: 7, next: 'exhale', text: 'Hold', color: '#0097a7' },
    exhale: { duration: 8, next: 'inhale', text: 'Breathe Out', color: '#e0e0e0' }
  };

  // Start/stop the breathing exercise
  const toggleExercise = () => {
    if (isActive) {
      resetExercise();
    } else {
      setIsActive(true);
      setShowInstructions(false);
      setCurrentPhase('ready');
      setTimeLeft(phases['ready'].duration);
      setCycleCount(0);
      setBreathProgress(0);
    }
  };

  // Reset all states
  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('ready');
    setTimeLeft(0);
    setBreathProgress(0);
    cancelAnimationFrame(animationRef.current);
  };

  // Handle the breathing animation and timing
  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    const endTime = startTime + timeLeft * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, (endTime - now) / 1000);
      setTimeLeft(Math.ceil(remaining));

      // Calculate animation progress (0 to 1)
      const progress = 1 - (remaining / phases[currentPhase].duration);
      setBreathProgress(progress);

      if (now >= endTime) {
        const nextPhase = phases[currentPhase].next;
        if (nextPhase === 'inhale' && currentPhase === 'exhale') {
          setCycleCount(prev => prev + 1);
        }
        setCurrentPhase(nextPhase);
        setTimeLeft(phases[nextPhase].duration);
        setBreathProgress(0);
      } else {
        animationRef.current = requestAnimationFrame(updateTimer);
      }
    };

    animationRef.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive, currentPhase, timeLeft]);

  // Canvas animation for wave effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 300;
    const height = canvas.height = 300;
    const center = { x: width / 2, y: height / 2 };

    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Base circle
      ctx.beginPath();
      ctx.arc(center.x, center.y, 100, 0, Math.PI * 2);
      ctx.fillStyle = phases[currentPhase].color;
      ctx.fill();
      
      // Wave effect
      const waveHeight = currentPhase === 'inhale' ? 
        breathProgress * 30 : 
        (currentPhase === 'exhale' ? 30 - (breathProgress * 30) : 30);
      
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const radius = 100 + Math.sin(angle * 10 + breathProgress * 20) * waveHeight;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = phases[currentPhase].color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Inner circle
      ctx.beginPath();
      const innerRadius = currentPhase === 'inhale' ? 
        30 + breathProgress * 70 : 
        (currentPhase === 'exhale' ? 100 - breathProgress * 70 : 100);
      ctx.arc(center.x, center.y, innerRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      
      // Abdominal guide
      ctx.beginPath();
      ctx.arc(center.x, center.y, innerRadius * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 188, 212, 0.5)';
      ctx.setLineDash([5, 3]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (isActive) {
        requestAnimationFrame(drawWave);
      }
    };

    drawWave();
  }, [breathProgress, currentPhase, isActive]);

  return (
    <div className="breathing-container">
      <h1>4-7-8 Breathing Exercise</h1>
      <p className="subtitle">Abdominal Breathing Technique</p>
      
      {showInstructions && (
        <div className="instructions">
          <h3>How to practice 4-7-8 breathing:</h3>
          <ol>
            <li>Sit comfortably with your back straight</li>
            <li>Place one hand on your chest and the other on your abdomen</li>
            <li>Inhale quietly through your nose for 4 seconds (abdomen should rise)</li>
            <li>Hold your breath for 7 seconds</li>
            <li>Exhale completely through your mouth for 8 seconds (abdomen should fall)</li>
            <li>Repeat for 4-5 cycles</li>
          </ol>
          <p>This technique helps reduce anxiety and improve sleep.</p>
        </div>
      )}

      <div className="animation-container">
        <canvas 
          ref={canvasRef} 
          className="breathing-canvas"
          width="300" 
          height="300"
        />
        
        {isActive && (
          <div className="phase-display">
            <h2>{phases[currentPhase].text}</h2>
            <div className="timer">{timeLeft}s</div>
            <div className="cycle-counter">Cycle: {cycleCount}</div>
          </div>
        )}
      </div>

      <button 
        className={`control-button ${isActive ? 'active' : ''}`}
        onClick={toggleExercise}
      >
        {isActive ? 'Stop Exercise' : 'Start Breathing'}
      </button>

      <div className="phase-indicators">
        <div className={`phase ${currentPhase === 'inhale' ? 'active' : ''}`}>
          <span>Inhale</span>
          <span>4s</span>
        </div>
        <div className={`phase ${currentPhase === 'hold' ? 'active' : ''}`}>
          <span>Hold</span>
          <span>7s</span>
        </div>
        <div className={`phase ${currentPhase === 'exhale' ? 'active' : ''}`}>
          <span>Exhale</span>
          <span>8s</span>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;