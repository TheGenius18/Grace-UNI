import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TreatmentConfirmation.css';

const TreatmentConfirmation = () => {
    const { therapistId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { therapist, treatmentPlan } = location.state || {};

    if (!therapist || !treatmentPlan) {
        navigate(`/treatment/${therapistId}`);
        return null;
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-header">
                    <h1>Treatment Journey Started!</h1>
                    <div className="confirmation-icon">🎉</div>
                </div>

                <div className="confirmation-content">
                    <div className="confirmation-section">
                        <h2>Your Therapist</h2>
                        <div className="therapist-info">
                            <div className="therapist-avatar">
                                {therapist.user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="therapist-details">
                                <h3>{therapist.user.username}</h3>
                                <p className="specialization">{therapist.specialization}</p>
                                <p className="experience">{therapist.experience} years experience</p>
                            </div>
                        </div>
                    </div>

                    <div className="confirmation-section">
                        <h2>Initial Treatment Plan</h2>
                        <div className="plan-details">
                            <p><strong>Type:</strong> {treatmentPlan.type_of_therapy}</p>
                            <p><strong>Sessions:</strong> {treatmentPlan.number_of_sessions}</p>
                            <p><strong>Status:</strong> Active</p>
                        </div>
                    </div>

                    <div className="confirmation-section next-steps">
                        <h2>Next Steps</h2>
                        <ol className="steps-list">
                            <li>Schedule your first appointment</li>
                            <li>Complete any initial assessments</li>
                            <li>Review treatment goals with your therapist</li>
                            <li>Begin your therapy sessions</li>
                        </ol>
                    </div>
                </div>

                <div className="confirmation-actions">

                    <button
                        className="secondary-button"
                        onClick={() => navigate('/patient')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TreatmentConfirmation;
