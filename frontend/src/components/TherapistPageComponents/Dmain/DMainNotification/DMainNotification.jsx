import React, { useState, useEffect } from "react";
import axios from "axios";
import './DMainNotification.css';
import Dnotification from "../../../../assets/images/notifications_icon.png";

export default function DMainNotification() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/notifications/",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setNotifications(response.data);
            setError(null);
        } catch (error) {
            console.log("Error fetching notifications", error.response?.data);
            if (error.response && error.response.data) {
                setError(error.response.data.error || "Failed to fetch notifications");
            } else {
                setError("Network error. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationClick = async (id) => {
        try {
            // Optimistic UI update
            setNotifications(prev => prev.map(n => 
                n.id === id ? {...n, is_read: true} : n
            ));
            
            await axios.post(
                `http://127.0.0.1:8000/api/notifications/${id}/accept/`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            // Revert if error
            setNotifications(prev => prev.map(n => 
                n.id === id ? {...n, is_read: false} : n
            ));
            console.log("Error marking notification as read", error.response?.data);
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
                    className={`d-main-notification ${notification.is_read ? 'read' : ''} ${
                        notification.is_emergency ? 'emergency' : ''
                    }`}
                    onClick={() => !notification.is_read && handleNotificationClick(notification.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="d-main-notification-img-container">
                        <img src={Dnotification} alt="" className="d-notes-img" />
                        {notification.is_emergency && (
                            <span className="emergency-indicator">!</span>
                        )}
                    </div>
                    <div className="notification-content">
                        <p className="d-main-notification-text">
                            {notification.message}
                            {notification.is_emergency && (
                                <span className="emergency-tag">Emergency</span>
                            )}
                        </p>
                        <p className="notification-time">
                            {new Date(notification.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    {!notification.is_read && (
                        <div className="notification-indicator"></div>
                    )}
                </div>
            ))}
        </div>
    );
}