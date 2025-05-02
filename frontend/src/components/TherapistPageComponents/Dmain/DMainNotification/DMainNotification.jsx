import React, { useState, useEffect } from "react";
import axios from "axios";
import './DMainNotification.css'
import Dnotification from "../../../../assets/images/notifications_icon.png";

export default function DMainNotification() {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "You have a new patient", read: false },
        { id: 2, message: "Appointment reminder: John Doe at 3:00 PM", read: false },
        { id: 3, message: "New test results available", read: false },
        { id: 4, message: "You have a new message", read: false }
    ]);

    const handleNotificationClick = (id) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? {...notification, read: true} : notification
        ));
    };

    return (
        <div className="d-main-notifications-list">
            {notifications.map((notification) => (
                <div 
                    key={notification.id}
                    className={`d-main-notification ${notification.read ? 'read' : ''}`}
                    onClick={() => handleNotificationClick(notification.id)}
                >
                    <div className="d-main-notification-img-container">
                        <img src={Dnotification} alt="" className="d-notes-img" />
                    </div>
                    <p className="d-main-notification-text">{notification.message}</p>
                    <div className="notification-indicator"></div>
                </div>
            ))}
        </div>
    )
}