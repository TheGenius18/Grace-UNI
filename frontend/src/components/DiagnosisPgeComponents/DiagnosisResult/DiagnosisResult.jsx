import React, { useState, useContext } from 'react';
import resultNextSteps from '../../../assets/js/result';
import "./DiagnosisResult.css"
import {Context} from "../../../context/Context"

const TestResult = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    const {score, setScore} = useContext(Context);
    const {ShowResult, setShowResult} = useContext(Context);

    // const {onRestart, setOnRestart} = useContext(Context);
 

    const resultData = [
        { range: [0, 4], type: "Minimal Depression", color: "var(--minimal)" },
        { range: [5, 9], type: "Mild Depression", color: "var(--mild)" },
        { range: [10, 14], type: "Moderate Depression", color: "var(--moderate)" },
        { range: [15, 19], type: "Moderately Severe Depression", color: "var(--severe)" },
        { range: [20, 27], type: "Severe Depression", color: "var(--critical)" }
    ];

    const getResultType = () => {
        return resultData.find(item => 
            score >= item.range[0] && score <= item.range[1]
        ) || resultData[4]; 
    };

    const { type, color, range } = getResultType();
    const nextStepIndex = resultData.findIndex(item => item.type === type);
    const nextStepText = resultNextSteps[nextStepIndex]?.text || "";

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };
    // const handleReStart = ()=>{
    //     setShowResult(false);
    //     setScore(null);    
    // }

    return (
        <div className="test-result">
            <div className="result-header">
                <h1>Your Assessment Results</h1>
                <div className="score-display" style={{ borderColor: color }}>
                    <span>Your Score:</span>
                    <span className="score-value">{score}</span>
                    <span className="score-range">(Range: {range[0]}-{range[1]})</span>
                </div>
                <h2 className="result-type" style={{ color }}>
                    {type}
                </h2>
            </div>

            <div className="result-details">
                <div 
                    className={`detail-section ${expandedSection === 'about' ? 'expanded' : ''}`}
                    onClick={() => toggleSection('about')}
                >
                    <h3>About Your Results</h3>
                    {expandedSection === 'about' && (
                        <div className="section-content">
                            <p>
                                <strong>{type}</strong> indicates {type.includes('Minimal') ? 
                                "you're experiencing few depressive symptoms" : 
                                `you may be experiencing ${type.split(' ')[0].toLowerCase()} depressive symptoms`}.
                            </p>
                            <ul className="severity-levels">
                                <li><strong>Minimal (0-4):</strong> Mild symptoms that don't significantly impair daily functioning</li>
                                <li><strong>Mild (5-9):</strong> More noticeable symptoms that may affect daily activities</li>
                                <li><strong>Moderate (10-14):</strong> Significant impairment in social or occupational functioning</li>
                                <li><strong>Severe (15+):</strong> Debilitating symptoms that severely restrict daily life</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div 
                    className={`detail-section ${expandedSection === 'next' ? 'expanded' : ''}`}
                    onClick={() => toggleSection('next')}
                >
                    <h3>Recommended Next Steps</h3>
                    {expandedSection === 'next' && (
                        <div className="section-content">
                            <p>{nextStepText}</p>
                            <ul>
                                <li>Consider speaking with a mental health professional</li>
                                <li>Monitor your symptoms regularly</li>
                                <li>Practice self-care techniques</li>
                                <li>Reach out to trusted friends or family</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div 
                    className={`detail-section ${expandedSection === 'help' ? 'expanded' : ''}`}
                    onClick={() => toggleSection('help')}
                >
                    <h3>Support Resources</h3>
                    {expandedSection === 'help' && (
                        <div className="section-content">
                            <h4>Immediate Help:</h4>
                            <p>National Suicide Prevention Lifeline: <strong>1-800-273-TALK (8255)</strong></p>
                            
                            <h4>GRACE-AI Support:</h4>
                            <ol>
                                <li>Find therapists matched to your needs</li>
                                <li>Begin your therapeutic journey</li>
                                <li>Use our AI chat for emotional support</li>
                                <li>Daily mental health exercises</li>
                                <li>Personalized tips and SOS resources</li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>

            <div className="result-actions">
                <button className="action-btn retake-btn" onClick={()=>{setShowResult(false),setScore(null)}}>
                    Retake Test
                </button>
                <button className="action-btn register-btn">
                    Register for Full Features
                </button>
            </div>
        </div>
    );
};

export default TestResult;