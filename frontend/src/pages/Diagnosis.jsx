import React, { useState ,useEffect} from "react";
import axios from "axios";
import '../assets/css/Diagnosis/Diagnosis.css'

import { myDiag } from "../assets/js/Diagnosis";


export default function Diagnosis() {
    React.useEffect(() => {
        myDiag();
    }, []);

    return (
    <>
    
    <div className="diag">

    
        <div className="test-section">
            <div className="main">
                <h1 className="h1-main">GRACE-AI</h1>
                {/* <h2 className="note">over the last 2 weeks, how often have you been bothered by any of the following problems</h2> */}
                <div className="app">
                    <div className="test">
                        <h2 id="question">question goes here</h2>
                        <div id="answer-buttons">
                            <button className="btn-diag">answer1</button>
                            <button className="btn-diag">answer2</button>
                            <button className="btn-diag">answer3</button>
                            <button className="btn-diag">answer4</button>
                        </div>
                        <div className="test-footer">
                            <button id="next-btn">Next</button>
                            <button id="pre-btn">pre</button>
                            <span className="question-total">1 of 10 Questions</span>
                        </div>
                    </div>

                </div>
        </div>
        <div className="result-box">
            <h2>Test Result!</h2>
            <span className="result-type">Your results suggest that you may be suffering from <span className="type-interpretation">...</span></span>
            <div className="what-now" tabIndex="0">
                <p className="info">Informations About Depression... <br/>
                    <span className="info-details">▎ Severity Levels <br/>
                        - Minimal Depression: Mild symptoms that do not significantly impair daily functioning. Individuals may experience occasional low moods but can generally cope with their responsibilities. <br/>
                        - Mild Depression: Symptoms are more noticeable and may affect daily activities, but the individual can still manage most responsibilities. <br/>
                        - Moderate Depression: Symptoms are more intense and persistent, leading to significant impairment in social, occupational, or other important areas of functioning. <br/>
                        - Severe Depression: Marked by debilitating symptoms that severely restrict the individual's ability to function in daily life. This level may include suicidal ideation or self-harm.
                    </span>
                </p>
                <p className="next-steps">Next Steps... <br/>
                <span className="next-step-details">...</span>
                </p>
                <p className="help">How Can We Help You!...<br/>
                    <span className="help-details">1. Find the best therapist for you!<br/>2. Began your therapeutic trip with your therapist<br/>3. Emotional discharge by chating with AI to improve your mental health!<br/>4. Daily exercises using mental health tools to improve your mental health<br/>5. Tips, Improve your mental health, SOS, And more!<br/></span>
                </p>
            </div>
            <div className="result-botton">
                <button className="exit">Exit</button>
                <button className="regester">Regester Now</button>
            </div>
        </div>
        </div>
        </div>
        
    </>
    )
}