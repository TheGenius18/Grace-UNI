import React from 'react';
import './PatintDailyQuote.css';

const DailyQuote = () => {
  const quote = "Healing is not about moving on or 'getting over it,' it's about learning to make peace with our pain and finding meaning in our struggles.";

  return (
    <div className="daily-quote-container">
      <div className="quote-box">
        <h3 className="quote-title">Daily Inspiration</h3>
        <p className="quote-text">{quote}</p>
        <div className="neon-light"></div>
      </div>
      <div className="inspiration-image">
        <img 
          src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Inspirational" 
          className="circle-image"
        />
      </div>
    </div>
  );
};

export default DailyQuote;