import React, { useState, useRef, useContext } from 'react';
import questions from '../../../assets/js/questions';
import "./DiagnosisForm.css"
import {Context} from "../../../context/Context"

const TestForm = ({ onComplete }) => {
    const {score, setScore} = useContext(Context);
    const {showResult, setShowResult} = useContext(Context);
    


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const answerButtonsRef = useRef(null);
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;

    const handleAnswerSelect = (value, index) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: { value, index }
        }));
    };

    const handlePrevious = () => {
        if (!isFirstQuestion) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            const Score=Object.values(selectedAnswers).reduce(
                (sum, { value }) => sum + value, 0
            );
            setScore(Score);
            setShowResult(true)
        }
    };

    return (
        <div className="test-form-container">
        <div className="test-form">
            {/* <h1 className="app-title">GRACE-AI Depression Screening</h1> */}
            
            <div className="progress-indicator">
                Question {questionNo} of {questions.length}
                <div className="progress-bar">
                    <div 
                        className="form-progress-fill"
                        style={{ width: `${(questionNo / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <h2 className="question-text">
                {questionNo}. {currentQuestion.question}
            </h2>

            <div className="answer-options" ref={answerButtonsRef}>
                {currentQuestion.answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-btn ${
                            selectedAnswers[currentQuestionIndex]?.index === index ? 'selected' : ''
                        }`}
                        onClick={() => handleAnswerSelect(answer.value, index)}
                    >
                        {answer.text}
                    </button>
                ))}
            </div>

            <div className="navigation-buttons">
                <button
                    className={`nav-btn prev-btn ${isFirstQuestion ? 'disabled' : ''}`}
                    onClick={handlePrevious}
                    disabled={isFirstQuestion}
                >
                    Previous
                </button>
                
                <button
                    className={`nav-btn next-btn ${!isAnswerSelected ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!isAnswerSelected}
                >
                    {isLastQuestion ? 'Get Results' : 'Next'}
                </button>
            </div>
        </div>
        </div>
    );
};

export default TestForm;