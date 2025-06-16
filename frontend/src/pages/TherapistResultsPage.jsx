// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/FindMyTherapist/FindMyTherapist.css";

const TherapistResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const [requestedTherapists, setRequestedTherapists] = useState(() => {
    const saved = localStorage.getItem("requestedTherapists");
    return saved ? JSON.parse(saved) : [];
  });
  const [matchedTherapists, setMatchedTherapists] = useState([]);
  const [otherTherapists, setOtherTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

  useEffect(() => {
    if (!formData) {
      navigate("/findmytherapist");
      return;
    }

    fetch("http://127.0.0.1:8000/api/therapists/")
      .then((res) => res.json())
      .then((allTherapists) => {
        const matched = [];
        const others = [];

        allTherapists.forEach((t) => {
          const matches =
            (formData.gender === "no-preference" ||
              t.gender === formData.gender) &&
            (formData.region === "" ||
              (t.region && t.region.name === formData.region)) &&
            (formData.specialization === "" ||
              t.specialization === formData.specialization);

          if (matches) matched.push(t);
          else others.push(t);
        });

        setMatchedTherapists(matched);
        setOtherTherapists(others);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching therapists:", err);
        setLoading(false);
      });
  }, [formData, navigate]);

  const handleRequest = async (therapistId) => {
    if (requestingId !== null) return;

    if (requestedTherapists.includes(therapistId)) {
      alert("You’ve already requested this therapist.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You must be logged in to request a therapist.");
      return;
    }

    setRequestingId(therapistId);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/request-therapist/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ therapist_id: therapistId }),
        }
      );

      if (response.ok) {
        alert("Request sent successfully!");
        const updatedList = [...requestedTherapists, therapistId];
        setRequestedTherapists(updatedList);
        localStorage.setItem(
          "requestedTherapists",
          JSON.stringify(updatedList)
        );
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Server error. Please try again.");
    } finally {
      setRequestingId(null);
    }
  };

  const renderCard = (t) => (
    <div key={t.therapist_id} className="therapist-card">
      <h4>{t.user.full_name}</h4>
      <p>
        <strong>Username:</strong> {t.user.username || t.user.email}
      </p>
      <p>
        <strong>Specialization:</strong> {t.specialization}
      </p>
      <p>
        <strong>Region:</strong> {t.region?.name || "N/A"}
      </p>
      <p>
        <strong>Gender:</strong> {t.gender}
      </p>
      <p>
        <strong>Experience:</strong> {t.experience} years
      </p>
      <p>
        <strong>Education:</strong> {t.education}
      </p>
      <p>
        <strong>Availability:</strong> {t.availability}
      </p>
      {t.motto && (
        <p>
          <strong>Motto:</strong> “{t.motto}”
        </p>
      )}

      <button
        className={`find-my-therapist-next-btn ${
          requestedTherapists.includes(t.therapist_id)
            ? "therapist-button-disabled"
            : ""
        }`}
        onClick={() => handleRequest(t.therapist_id)}
        disabled={
          requestingId === t.therapist_id ||
          requestedTherapists.includes(t.therapist_id)
        }
        style={{ marginTop: "10px" }}
      >
        {requestedTherapists.includes(t.therapist_id)
          ? "Request Sent"
          : requestingId === t.therapist_id
          ? "Requesting..."
          : "Request Therapist"}
      </button>
    </div>
  );

  return (
    <div className="page therapist-results">
      <button
        className="find-my-therapist-back-btn"
        style={{ alignSelf: "flex-start", marginBottom: "20px" }}
        onClick={() => navigate("/findmytherapist")}
      >
        ← Go Back
      </button>

      {loading ? (
        <p className="therapist-loading">Searching therapists...</p>
      ) : (
        <>
          <section className="therapist-section">
            <h3 className="therapist-section-title">🟢 Matched Therapists</h3>
            {matchedTherapists.length > 0 ? (
              matchedTherapists.map(renderCard)
            ) : (
              <p className="therapist-no-result">
                No therapists matched your preferences.
              </p>
            )}
          </section>

          <section className="therapist-section">
            <h3 className="therapist-section-title">
              🟡 Other Available Therapists
            </h3>
            {otherTherapists.length > 0 ? (
              otherTherapists.map(renderCard)
            ) : (
              <p className="therapist-no-result">
                No other therapists available.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default TherapistResultsPage;
