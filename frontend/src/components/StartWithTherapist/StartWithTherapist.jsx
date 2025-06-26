import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TherapistAvailability from './TherapistAvailavility/TherapistAvilability';
import './StartWithTherapist.css';
import axios from 'axios';

const TreatmentWithTherapist = () => {
    const { therapistId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(location.state?.therapist || null);
    const [loading, setLoading] = useState(!location.state?.therapist);
    const [error, setError] = useState(null);
    const [isStarting, setIsStarting] = useState(false);
    const [hasTherapist, setHasTherapist] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null); // ✅ NEW

    useEffect(() => {
        if (!therapist) {
            fetchTherapistData();
        }
        checkPatientTherapist();
    }, [therapistId]);

    const fetchTherapistData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/therapists/${therapistId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setTherapist(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkPatientTherapist = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/profile/view/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (response.data.patient?.therapist) {
                setHasTherapist(true);
            }
        } catch (err) {
            console.error("Error checking patient therapist:", err);
        }
    };

    const handleStartJourney = async () => {
        if (!selectedSlotId) {
            alert("Please select a time slot first.");
            return;
        }

        try {
            setIsStarting(true);
            await axios.post(
                `http://127.0.0.1:8000/api/treatment/begin/${therapist.user.id}/`,
                { slot_id: selectedSlotId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            alert("Treatment journey started!");
            navigate(`/treatment-confirmation/${therapist.user.id}`);

        } catch (error) {
            console.error("Error starting treatment", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to start treatment journey");
        } finally {
            setIsStarting(false);
        }
    };

    if (loading) {
        return (
            <div className="treatment-loading">
                <div className="spinner"></div>
                <p>Loading therapist information...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="treatment-error">
                <h3>Error</h3>
                <p>{error}</p>
                <button onClick={() => navigate('/findmytherapist')}>
                    Back to Therapists List
                </button>
            </div>
        );
    }

    return (
        <div className="treatment-container">
            <button className="back-button" onClick={() => navigate('/findmytherapist')}>
                ← Back to Therapists
            </button>

            <div className="therapist-profile">
                <div className="profile-header">
                    <h2>{therapist.user.full_name}</h2>
                    <p className="specialization">{therapist.specialization}</p>
                    {hasTherapist && (
                        <div className="treatment-status-badge">Treatment Journey Started</div>
                    )}
                </div>

                {/* Profile details... */}
            </div>

            <div className="availability-section">
                <h3>Book an Appointment</h3>
                <p>Select an available time slot to begin your treatment journey</p>

                {/* ✅ Pass selected slot ID */}
                <TherapistAvailability
                    therapistId={therapistId}
                    onSlotSelect={(slotId) => setSelectedSlotId(slotId)}
                />
            </div>

            {!hasTherapist && (
                <div className="begin-journey-section">
                    <button
                        className="begin-journey-button"
                        onClick={handleStartJourney}
                        disabled={isStarting}
                    >
                        {isStarting ? 'Starting...' : 'Begin My Treatment Journey'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default TreatmentWithTherapist;
