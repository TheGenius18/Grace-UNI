import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './DMainNotification.css';
import Dnotification from "../../../../assets/images/notifications_icon.png";
import { Context } from "../../../../context/context";
import PatientProfileModal from "./PatientProfileModal";
export default function DMainNotification() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setCurrentPatient, setDMainChanger, setRefreshPatients } = useContext(Context);
    const [viewedPatient, setViewedPatient] = useState(null);
    const fetchNotifications = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("Access token not found. Please log in.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/notifications/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setNotifications(response.data);
            setError(null);
        } catch (error) {
            console.log("Error fetching notifications", error.response?.data);
            setError("Failed to fetch notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleAccept = async (id) => {
        const token = localStorage.getItem("access_token");
        try {
            await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/accept/`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("✅ Patient accepted and treatment started.");

            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, is_read: true } : n)
            );

            // Refresh patient list
            setRefreshPatients(prev => !prev);

        } catch (error) {
            console.log("Error accepting notification", error.response?.data);
        }
    };

    const handleViewProfile = async (patientId) => {

        const token = localStorage.getItem("access_token");
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}/`, {
                headers: { Authorization: `Bearer ${token}` },

            });
            setViewedPatient(res.data);  
            console.log("Patient data:", res.data);
        } catch (error) {
            console.log("Failed to load patient profile", error.response?.data);
        }
    };

    if (isLoading) {
        return (
            <div className="d-main-notifications-list">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="d-main-notification loading-state">
                        <div className="d-main-notification-img-container">
                            <div className="loading-pulse"></div>
                        </div>
                        <div className="d-main-notification-text loading-line"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-main-notifications-list error-state">
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchNotifications}>Retry</button>
                </div>
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="d-main-notifications-list empty-state">
                <div className="empty-message">
                    <p>No notifications yet</p>
                    <small>You'll see new notifications here when they arrive</small>
                </div>
            </div>
        );
    }

    return (
        <div className="d-main-notifications-list">
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    className={`d-main-notification ${notification.is_read ? 'read' : ''} ${notification.is_emergency ? 'emergency' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="d-main-notification-img-container">
                        <img src={Dnotification} alt="notification" className="d-notes-img" />
                        {notification.is_emergency && <span className="emergency-indicator">!</span>}
                    </div>

                    <div className="notification-content">
                        <p className="d-main-notification-text">
                            {notification.message}
                            {notification.is_emergency && <span className="emergency-tag">Emergency</span>}
                        </p>
                        <p className="notification-time">
                            {new Date(notification.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>

                        <div className="notification-actions">
                            {!notification.is_read && (
                                <button className="accept-button" onClick={() => handleAccept(notification.id)}>
                                    Accept
                                </button>
                            )}
                            {notification.patient_id && (
                                <button className="view-button" onClick={() => handleViewProfile(notification.patient_id)}>
                                    View Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {!notification.is_read && <div className="notification-indicator"></div>}
                </div>
            ))}
            {viewedPatient && (
                <PatientProfileModal
                    patient={viewedPatient}
                    onClose={() => setViewedPatient(null)}
                />
            )}
        </div>
    );
}
