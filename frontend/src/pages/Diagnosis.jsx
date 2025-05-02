import React, { useState, useContext } from 'react';
import TestForm from '../components/DiagnosisPgeComponents/DiagnosisForm/DiagnosisForm';
import TestResult from '../components/DiagnosisPgeComponents/DiagnosisResult/DiagnosisResult';
import '../assets/css/Diagnosis/Diagnosis.css';
import {Context} from"../context/context"

const Diagnosis = () => {
    const {showResult, setShowResult} = useContext(Context);
    const {score, setScore} = useContext(Context);
    // const {onRestart, setOnRestart} = useContext(Context);


    const handleTestComplete = (finalScore) => {
        setScore(finalScore);
        setShowResult(true);
    };
    // if (onRestart){
    //     setShowResult(false);
    //     setScore(null);
    //     // setOnRestart(false);
    // }

    return (
        <div className="diagnostic-app-container">
            <div className={`diagnostic-app ${showResult ? 'results-view' : ''}`}>
                {!showResult ? (
                    <TestForm onComplete={handleTestComplete} />
                ) : (
                    <TestResult score={score} />
                )}
            </div>
        </div>
    );
};

export default Diagnosis;