import React, { useState, useRef, useEffect } from 'react';
import './DiagnosisAI.css';
import logo from '../../../assets/images/4.png';
import { sendMessageToChatbot } from '../../../api/chatApi';
import axios from 'axios';

const AIChatComponent = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleStartClick = () => {
        setHasStarted(true);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Hello! I'm GRACE AI. I'm here to help you understand your mental health better. Would you like to start the test?",
                    isUser: false,
                    logo: true,
                },
            ]);
        }, 2000);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, isUser: true };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        const token = localStorage.getItem('access_token');

        if (!token) {
            alert('Please log in first.');
            setIsTyping(false);
            return;
        }

        try {
            const botResponses = await sendMessageToChatbot(inputValue, token);
            setIsTyping(false);

            const botMsgs = botResponses.map((res) => ({
                text: res.text || '🤖 No response from chatbot.',
                isUser: false,
                logo: true,
            }));

            setMessages((prev) => [...prev, ...botMsgs]);

            for (const res of botResponses) {
                if (res.text && res.text.toLowerCase().includes('final diagnosis:')) {
                    const diagnosisText = res.text.split('Final diagnosis:')[1].trim();
                    await saveDiagnosis(diagnosisText, token);
                }
            }
        } catch (err) {
            console.error('❌ Error sending message to chatbot:', err);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    text: '❌ Sorry, we couldn’t connect to GRACE AI. Please check your connection or try again later.',
                    isUser: false,
                    logo: true,
                },
            ]);
        }
    };

    const saveDiagnosis = async (diagnosis, token) => {
        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/chatbot/save-diagnosis/',
                { diagnosis },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('✅ Diagnosis saved:', diagnosis, res.status);
        } catch (err) {
            console.error('❌ Failed to save diagnosis:', err);
        }
    };

    return (
        <div className="diag-ai-app">
            <div className="diag-ai-background-layer"></div>
            <div className="diag-ai-container">
                {!hasStarted ? (
                    <div className="diag-ai-start-screen">
                        <div className="diag-ai-logo-container">
                            <img src={logo} alt="GRACE Logo" className="diag-ai-logo" />
                        </div>
                        <h1 className="diag-ai-welcome-title">GRACE AI diag.</h1>
                        <p className="diag-ai-welcome-subtitle">A safe space to explore your feelings</p>
                        <button onClick={handleStartClick} className="diag-ai-start-button">
                            <span>start taking the test</span>
                            <div className="diag-ai-button-hover-effect"></div>
                        </button>
                    </div>
                ) : (
                    <div className="diag-ai-interface">
                        <div className="diag-ai-header">
                            <h2>
                                <img src={logo} alt="Logo" className="diag-ai-header-logo" />
                                GRACE Companion
                            </h2>
                            <div className="diag-ai-status-indicator"></div>
                        </div>

                        <div className="diag-ai-messages-container">
                            {isLoading ? (
                                <div className="diag-ai-loading">
                                    <p className="diag-ai-loading-text">Preparing a safe space for our conversation...</p>
                                    <div className="diag-ai-raindrop-loader">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="diag-ai-raindrop"></div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`diag-ai-message ${msg.isUser ? 'diag-ai-user-message' : ''}`}
                                        >
                                            {msg.logo && (
                                                <img src={logo} alt="AI Logo" className="diag-ai-message-logo" />
                                            )}
                                            <div className="diag-ai-message-content">{msg.text}</div>
                                            <div className="diag-ai-message-tail"></div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="diag-ai-typing-indicator">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="diag-ai-typing-dot"></div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="diag-ai-input-form">
                            <div className="diag-ai-input-wrapper">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Share your thoughts..."
                                    className="diag-ai-chat-input"
                                    autoFocus
                                />
                                <button type="submit" className="diag-ai-send-button">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIChatComponent;
