import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientProfile.css";

const PatientProfile = () => {
  const [profileData, setProfileData] = useState({
    user: null,
    patient: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

    const fetchProfileData = async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            setError("No authentication token found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const profileResponse = await axios.get("http://127.0.0.1:8000/api/profile/view/", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const profile = profileResponse.data.profile;  // ✅ هنا التصحيح

            setProfileData({
                user: {
                    username: profile.user.username,
                    email: profile.user.email,
                    is_profile_complete: profile.user.is_profile_complete,
                },
                patient: {
                    age: profile.age,
                    gender: profile.gender,
                    sibling_order: profile.sibling_order,
                    marital_status: profile.marital_status,
                    diagnosis: profile.diagnosis,
                    therapist: profile.therapist,
                },
            });

            setSuccessMessage("Profile loaded successfully");

        } catch (error) {
            console.error("Error fetching profile:", error);

            if (error.response?.status === 404) {
                const userResponse = await axios.get("http://127.0.0.1:8000/api/user/", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                setProfileData({
                    user: userResponse.data,
                    patient: null
                });

                setError("Profile not found. Please complete your profile information.");
            } else {
                setError(
                    error.response?.data?.error ||
                    error.message ||
                    "Failed to load profile"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="patient-profile-container">
        <div className="patient-profile-loading">
          <div className="patient-profile-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-profile-container">
        <div className="patient-profile-error">
          <p className="patient-profile-error-message">{error}</p>
          <button 
            className="patient-profile-retry-btn"
            onClick={fetchProfileData}
          >
            Try Again
          </button>
          {(!profileData.patient) && (
            <button 
              className="patient-profile-complete-btn"
              onClick={() => window.location.href = "/fillyourinfo"}
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="patient-profile-container">
      {successMessage && (
        <div className="patient-profile-success">
          {successMessage}
        </div>
      )}

      <div className="patient-profile-header">
        <h2>Patient Profile</h2>
        {profileData.user && (
          <>
            <p>Welcome back, {profileData.user.username}</p>
            {profileData.user.is_profile_complete === false && (
              <div className="profile-incomplete-warning">
                ⚠️ Please complete your profile information
              </div>
            )}
          </>
        )}
      </div>

      <div className="patient-profile-content">
        {/* Account Information */}
        {profileData.user && (
          <div className="patient-profile-glow-card">
            <h3>Account Information</h3>
            <div className="patient-profile-info-grid">
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Username:</span>
                <span className="patient-profile-info-value">
                  {profileData.user.username}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Email:</span>
                <span className="patient-profile-info-value">
                  {profileData.user.email}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Account Status:</span>
                <span className={`patient-profile-info-value ${
                  profileData.user.is_profile_complete ? 'complete' : 'incomplete'
                }`}>
                  {profileData.user.is_profile_complete ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Personal Details */}
        {profileData.patient && (
          <div className="patient-profile-glow-card">
            <h3>Personal Details</h3>
            <div className="patient-profile-info-grid">
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Age:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.age}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Gender:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.gender}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Marital Status:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.marital_status}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Sibling Order:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.sibling_order}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Medical Information */}
        {profileData.patient && (
          <div className="patient-profile-glow-card">
            <h3>Medical Information</h3>
            <div className="patient-profile-info-grid">
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Diagnosis:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.diagnosis || 'Not specified'}
                </span>
              </div>
              <div className="patient-profile-info-item">
                <span className="patient-profile-info-label">Therapist:</span>
                <span className="patient-profile-info-value">
                  {profileData.patient.therapist || 'Not assigned'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="patient-profile-actions">
          <button 
            className="patient-profile-edit-btn"
            onClick={() => window.location.href = "/fillyourinfo"}
          >
            {profileData.user?.is_profile_complete ? 'Update Profile' : 'Complete Profile'}
          </button>
          <button 
            className="patient-profile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;