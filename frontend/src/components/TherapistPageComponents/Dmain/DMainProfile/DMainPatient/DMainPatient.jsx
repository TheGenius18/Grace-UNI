import React, { useState ,useEffect, useContext} from "react";
import axios from "axios";
import './DMainPatient.css'

import { Context } from "../../../../../context/context";




function DMainPatient() {

    const {message,setMessage,patient} = useContext(Context)

    const handleSendMessage = () => {

    };

    return (
        <div className="d-main-patient">
            <h1 className="d-main-patient-header">patient</h1>
            <div className="d-main-patient-info">
                <h2>{patient.name}</h2>
                <p><strong>age</strong> {patient.age} year</p>
                <p><strong>the treatment history</strong> {patient.medicalHistory}</p>
                <p><strong>the treatment info</strong> {patient.treatmentProgress}</p>
            </div>
            <div className="d-main-patient-message-section">
                <h3>sens a massage</h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="..."
                />
                <button onClick={handleSendMessage}>send</button>
            </div>
            <button className="d-main-patient-delete-button" onClick={() => onDelete(patient.id)}>delete the patient (it well be recoverd later)</button>
        </div>
    );
};

export default DMainPatient;