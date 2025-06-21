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

  const handleBeginJourney = async () => {
    setIsStarting(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/treatment/begin/${therapistId}/`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setHasTherapist(true);
      navigate(`/treatment-confirmation/${therapistId}`, {
        state: { 
          therapist: response.data.therapist,
          treatmentPlan: response.data.treatment_plan
        }
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('access_token');
        navigate('/login', { state: { from: location.pathname } });
      } else {
        setError(err.response?.data?.error || 
                'Failed to begin treatment. Please try again.');
      }
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
      <button 
        className="back-button"
        onClick={() => navigate('/findmytherapist')}
      >
        ← Back to Therapists
      </button>

      <div className="therapist-profile">
        <div className="profile-header">
          <h2>{therapist.user.full_name}</h2>
          <p className="specialization">{therapist.specialization}</p>
          {hasTherapist && (
            <div className="treatment-status-badge">
              Treatment Journey Started
            </div>
          )}
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3>About</h3>
            <p><strong>Experience:</strong> {therapist.experience} years</p>
            <p><strong>Education:</strong> {therapist.education}</p>
            <p><strong>Region:</strong> {therapist.region?.name || 'N/A'}</p>
            <p><strong>Gender:</strong> {therapist.gender}</p>
          </div>

          {therapist.motto && (
            <div className="detail-section motto">
              <h3>Motto</h3>
              <p>"{therapist.motto}"</p>
            </div>
          )}

          <div className="detail-section contact">
            <h3>Contact</h3>
            <p><strong>Email:</strong> {therapist.user.email}</p>
            {therapist.user.phone && (
              <p><strong>Phone:</strong> {therapist.user.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="availability-section">
        <h3>Book an Appointment</h3>
        <p>Select an available time slot to begin your treatment journey</p>
        <TherapistAvailability therapistId={therapistId} />
      </div>

      {!hasTherapist && (
        <div className="begin-journey-section">
          <button 
            className="begin-journey-button"
            onClick={handleBeginJourney}
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