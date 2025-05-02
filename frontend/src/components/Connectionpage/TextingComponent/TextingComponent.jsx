import React, { useState, useEffect } from "react";
import './TextingComponent.css';

export default function ChatSection() {
  const [activeTab, setActiveTab] = useState('person');
  const [messages, setMessages] = useState({
    person: [],
    ai: [
      { user: "Grace AI", text: "I'm here to support you. What's on your mind?", time: "10:00 AM" }
    ],
    memo: []
  });
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], 
          { 
            user: activeTab === 'ai' ? 'You' : 
                 activeTab === 'person' ? 'You' : 'Note',
            text: newMessage, 
            time: new Date().toLocaleTimeString() 
          }
        ]
      }));
      setNewMessage('');
    }
  };


  const getTabColor = () => {
    switch(activeTab) {
      case 'person': return 'rgba(53, 89, 98, 0.6)'; 
      case 'ai': return 'rgba(57, 82, 90, 0.4)';     
      case 'memo': return 'rgba(34, 51, 61, 0.3)';   
      default: return '#4a6fa5';
    }
  };

  return (
    <div 
      className="Connection-chat-section"
      style={{ '--active-color': getTabColor() }}
    >
      <div className="chat-tabs"
      style={{ backgroundColor: getTabColor() }}>
        <button
          className={`chat-tab ${activeTab === 'person' ? 'active' : ''}`}
          onClick={() => setActiveTab('person')}
          style={{ 
            backgroundColor: activeTab === 'person' ? getTabColor() : 'transparent',
            border: activeTab === 'person' ? 'none' : '1px solid var(--light-teal)'
          }}
        >
          Person<span className="Connection-online-dot"></span>
        </button>
        <button
          className={`chat-tab ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
          style={{ 
            backgroundColor: activeTab === 'ai' ? getTabColor() : 'transparent',
            border: activeTab === 'ai' ? 'none' : '1px solid var(--light-teal)'
          }}
        >
          HI Grace<span className="Connection-online-dot"></span>
        </button>
        <button
          className={`chat-tab ${activeTab === 'memo' ? 'active' : ''}`}
          onClick={() => setActiveTab('memo')}
          style={{ 
            backgroundColor: activeTab === 'memo' ? getTabColor() : 'transparent',
            border: activeTab === 'memo' ? 'none' : '1px solid var(--light-teal)'
          }}
        >
          Memo
        </button>
      </div>

      <div className="Connection-chat-messages"
      style={{ backgroundColor: getTabColor() }}>
        {messages[activeTab].map((msg, i) => (
          <div 
            key={i} 
            className={`message ${msg.user === 'You' ? 'sent' : 'received'} ${msg.user === 'Note' ? 'memo-note' : null}`}
          >
            <div className="Connection-message-content">
              <span className="Connection-message-user">{msg.user}</span>
              <p>{msg.text}</p>
              <span className="Connection-message-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="Connection-chat-input"
      style={{ backgroundColor: getTabColor() }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={
            activeTab === 'memo' ? 'Add a personal note...' : 'Type your message...'
          }
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          style={{ backgroundColor: getTabColor() }}
        >
          {activeTab === 'memo' ? 'Save' : 'Send'}
        </button>
      </div>
    </div>
  );
}