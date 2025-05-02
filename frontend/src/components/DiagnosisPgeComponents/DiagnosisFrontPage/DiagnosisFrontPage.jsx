import React, { useContext } from 'react';
import { Context } from '../../../context/Context';
import "./DiagFontPage.css"
import Navbar from "../../HomePageComponents/HomeNavbar/HomeNavbar"
import AIchat from "../../DiagnosisPgeComponents/DiagnosisAIPage/DiagnosisAI"
import Form from "../../DiagnosisPgeComponents/DiagnosisForm/DiagnosisForm"
import Result from "../../DiagnosisPgeComponents/DiagnosisResult/DiagnosisResult"

const IntroductionPage = () => {
    const { 
        TypeOfDiag,
        setTypeOfDiag,
        isLoading, 
        hasStarted, 
        startConversation,
        patient,
        showResult
    } = useContext(Context);

    const handleStartAI = () => {
        setTypeOfDiag('AI');
        // startConversation();
    };

    const handleStartForm = () => {
        setTypeOfDiag('form');
        // startConversation();
    };

    return (
        <div className="diagnosis-fron-page-container">
            <Navbar/>
            
            {showResult ? (
                <Result />
            ) : TypeOfDiag === "front" ? (
                <div className="diagnosis-ai-container">
                    <div className="header-row">
                        <h1>Hello {patient.name}, I'm GRACE AI</h1>
                        <p>
                            I'm here to have a confidential conversation with you to assess 
                            your mental well-being. This screening can help identify 
                            symptoms of depression and suggest next steps.
                        </p>
                    </div>

                    <div className="content-row">
                        <div className="what-to-expect">
                            <h2>What to Expect</h2>
                            <ul>
                                <li>Completely confidential assessment</li>
                                <li>10-15 questions about your recent experiences</li>
                                <li>Takes about 5-10 minutes</li>
                                <li>Results you can discuss with your therapist</li>
                            </ul>
                        </div>

                        <div className="buttons-section">
                            <div className="diagnosis-buttons">
                                <button 
                                    className="diag-button ai-button" 
                                    onClick={handleStartAI}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Diagnosis with AI'}
                                </button>
                                <p className="button-explanation">
                                    Interactive conversation that adapts to your responses
                                </p>

                                <button 
                                    className="diag-button form-button" 
                                    onClick={handleStartForm}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Traditional Form'}
                                </button>
                                <p className="button-explanation">
                                    Standard questionnaire with fixed questions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : TypeOfDiag === "AI" ? (
                <AIchat />
            ) : TypeOfDiag === "form" ? (
                <Form />
            ) : null}
        </div>
    );
};

export default IntroductionPage;