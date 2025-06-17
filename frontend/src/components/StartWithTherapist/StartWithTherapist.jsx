import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TherapistAvailability from './TherapistAvailavility/TherapistAvilability';
import './StartWithTherapist.css';

const TreatmentWithTherapist = () => {
  const { therapistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(location.state?.therapist || null);
  const [loading, setLoading] = useState(!location.state?.therapist);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!therapist) {
      fetchTherapistData();
    }
  }, [therapistId]);

  const fetchTherapistData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/therapists/${therapistId}/`);
      if (!response.ok) {
        throw new Error('Therapist not found');
      }
      const data = await response.json();
      setTherapist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    </div>
  );
};

export default TreatmentWithTherapist;