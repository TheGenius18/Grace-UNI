
import React from "react";
import "./PatientProfileModal.css";

export default function PatientProfileModal({ patient, onClose }) {
    if (!patient) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Patient Profile</h2>
                <p><strong>Name:</strong> {patient.user.username}</p>
                <p><strong>Email:</strong> {patient.user.email}</p>
                <p><strong>Age:</strong> {patient.age || "N/A"}</p>
                <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
                <p><strong>Marital Status:</strong> {patient.marital_status || "N/A"}</p>
                <p><strong>Sibling Order:</strong> {patient.sibling_order || "N/A"}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
