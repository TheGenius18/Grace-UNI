// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FindMyTherapist.css";

const FullFind = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    matchedTherapists = [],
    otherTherapists = [],
    accessToken = localStorage.getItem("access_token") || "",
  } = location.state || {};

  const [requested, setRequested] = useState({});

  const handleRequest = async (therapistId) => {
    if (!accessToken) {
      alert("You must be logged in to make a request.");
      return;
    }

    setRequested((prev) => ({ ...prev, [therapistId]: true }));

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/request-therapist/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ therapist_id: therapistId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Request sent successfully!");
      } else {
        alert(data.error || "Failed to send request.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    } finally {
      setRequested((prev) => ({ ...prev, [therapistId]: false }));
    }
  };

  const renderTherapistCard = (therapist) => (
    <div className="therapist-card" key={therapist.therapist_id}>
      <h3>{therapist.user.full_name || "Therapist"}</h3>
      <p>
        <strong>Username:</strong> {therapist.user.username}
      </p>
      <p>
        <strong>Gender:</strong> {therapist.gender}
      </p>
      <p>
        <strong>Region:</strong> {therapist.region?.name || "N/A"}
      </p>
      <p>
        <strong>Specialization:</strong> {therapist.specialization}
      </p>
      <button
        className="request-btn"
        disabled={requested[therapist.therapist_id]}
        onClick={() => handleRequest(therapist.therapist_id)}
      >
        {requested[therapist.therapist_id] ? "Requesting..." : "Request"}
      </button>
    </div>
  );

  return (
    <div className="therapist-results-section">
      <button
        className="find-my-therapist-back-btn"
        onClick={() => navigate("/find-my-therapist")}
      >
        ← Go Back
      </button>

      <section>
        <h2>🟢 Matched Therapists</h2>
        {matchedTherapists.length > 0 ? (
          <div className="therapist-cards">
            {matchedTherapists.map(renderTherapistCard)}
          </div>
        ) : (
          <p>No therapists match your preferences.</p>
        )}
      </section>

      <hr style={{ margin: "40px 0" }} />

      <section>
        <h2>🟡 Other Available Therapists</h2>
        {otherTherapists.length > 0 ? (
          <div className="therapist-cards">
            {otherTherapists.map(renderTherapistCard)}
          </div>
        ) : (
          <p>No other therapists available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default FullFind;
