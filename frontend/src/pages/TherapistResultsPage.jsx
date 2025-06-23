import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/TherapistResultsPage/TherapistResultsPage.css";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const TherapistResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;
    const [matchedTherapists, setMatchedTherapists] = useState([]);
    const [otherTherapists, setOtherTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!formData) {
            navigate("/findmytherapist");
            return;
        }

        const fetchTherapists = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get("/therapists/");
                const allTherapists = response.data;

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
            } catch (err) {
                if (err.response) {
                    setError(`Server error: ${err.response.status}`);
                } else if (err.request) {
                    setError("Network error. Please check your connection.");
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTherapists();
    }, [formData, navigate]);

    const handleRequest = (therapist) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You must be logged in to request a therapist.");
            navigate("/login");
            return;
        }

        navigate(`/treatment/${therapist.therapist_id}`, {
            state: { therapist },
        });
    };

    const renderCard = (t) => (
        <div key={t.therapist_id} className="therapist-card">
            <div className="therapist-card-header">
                <h4>{t.user?.full_name}</h4>
                <span className="therapist-badge">
                    {matchedTherapists.includes(t) ? "🟢 Matched" : "🟡 Available"}
                </span>
            </div>

            <div className="therapist-card-body">
                <p><span className="label">Username:</span> {t.user?.username || t.user?.email}</p>
                <p><span className="label">Specialization:</span> {t.specialization || "N/A"}</p>
                <p><span className="label">Region:</span> {t.region?.name || "N/A"}</p>
                <p><span className="label">Gender:</span> {t.gender || "N/A"}</p>
                <p><span className="label">Experience:</span> {t.experience || "N/A"} years</p>

                {/* Education */}
                <div>
                    <p><span className="label">Education:</span></p>
                    {Array.isArray(t.education) && t.education.length > 0 ? (
                        <ul>
                            {t.education.map((edu, index) => (
                                <li key={index}>
                                    {edu.degree} in {edu.field} from {edu.institution} ({edu.year})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No education info</p>
                    )}
                </div>

                {/* Availability */}
                <div>
                    <p><span className="label">Availability:</span></p>
                    {Array.isArray(t.availability) && t.availability.length > 0 ? (
                        <ul>
                            {t.availability.map((slot, index) => (
                                <li key={index}>{slot}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No availability data</p>
                    )}
                </div>

                {t.motto && (
                    <p className="therapist-motto">
                        <span className="label">Motto:</span> "{t.motto}"
                    </p>
                )}
            </div>

            <button className="request-btn" onClick={() => handleRequest(t)}>
                Request Therapist
            </button>
        </div>
    );

    return (
        <div className="therapist-results-container">
            <button
                className="back-button"
                onClick={() => navigate("/findmytherapist")}
            >
                ← Go Back
            </button>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Searching therapists...</p>
                </div>
            ) : (
                <>
                    <section className="therapists-section">
                        <h3 className="section-title">Matched Therapists</h3>
                        {matchedTherapists.length > 0 ? (
                            <div className="therapists-grid">
                                {matchedTherapists.map(renderCard)}
                            </div>
                        ) : (
                            <p className="no-results">No therapists matched your preferences.</p>
                        )}
                    </section>

                    <section className="therapists-section">
                        <h3 className="section-title">Other Available Therapists</h3>
                        {otherTherapists.length > 0 ? (
                            <div className="therapists-grid">
                                {otherTherapists.map(renderCard)}
                            </div>
                        ) : (
                            <p className="no-results">No other therapists available.</p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default TherapistResultsPage;
