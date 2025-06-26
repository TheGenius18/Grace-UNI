import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./TherapistAvilability.css";

const TherapistAvailability = ({ therapistId, onSlotSelect }) => {
    const [days, setDays] = useState([
        { day: 'monday', displayName: 'Monday', slots: [] },
        { day: 'tuesday', displayName: 'Tuesday', slots: [] },
        { day: 'wednesday', displayName: 'Wednesday', slots: [] },
        { day: 'thursday', displayName: 'Thursday', slots: [] },
        { day: 'friday', displayName: 'Friday', slots: [] },
        { day: 'saturday', displayName: 'Saturday', slots: [] },
        { day: 'sunday', displayName: 'Sunday', slots: [] },
    ]);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailability = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/free-times/by-therapist/${therapistId}/`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                            "Content-Type": "application/json",
                        }
                    }
                );

                const updatedDays = days.map(dayObj => {
                    const daySlots = response.data
                        .filter(slot => slot.day.toLowerCase() === dayObj.day.toLowerCase())
                        .map(slot => ({
                            id: slot.id,
                            start: formatTime(slot.start_time),
                            end: formatTime(slot.end_time),
                            is_available: slot.is_available
                        }));

                    return {
                        ...dayObj,
                        slots: daySlots
                    };
                });

                setDays(updatedDays);
            } catch (error) {
                console.error('Error fetching availability:', error);
                setError("Failed to load availability. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailability();
    }, [therapistId]);

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.split(':').slice(0, 2).join(':');
    };

    const handleSlotSelection = (day, slot) => {
        setSelectedSlot({ ...slot, day });
        setError(null);
        onSlotSelect?.(slot.id); 
    };

    return (
        <div className="therapist-availability-container">
            {error && <div className="alert alert-error">{error}</div>}

            <div className="availability-display">
                {isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner-circle"></div>
                        <p>Loading availability...</p>
                    </div>
                ) : (
                    <div className="days-grid">
                        {days.map((dayObj, dayIndex) => (
                            <div key={dayIndex} className="day-container">
                                <div className="day-header">
                                    <h4>{dayObj.displayName}</h4>
                                </div>
                                {dayObj.slots.length > 0 ? (
                                    <div className="slots-list">
                                        {dayObj.slots.map((slot) => (
                                            <button
                                                key={slot.id}
                                                className={`slot-item ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                                                onClick={() => handleSlotSelection(dayObj, slot)}
                                                disabled={!slot.is_available}
                                            >
                                                <span className="slot-time">{slot.start} - {slot.end}</span>
                                                {slot.is_available ? (
                                                    <span className="availability-dot available"></span>
                                                ) : (
                                                    <span className="availability-dot unavailable"></span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-slots">No available slots</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedSlot && (
                <div className="selection-summary">
                    <h4>Selected Time Slot</h4>
                    <p>
                        <strong>Day:</strong> {selectedSlot.day.displayName}<br />
                        <strong>Time:</strong> {selectedSlot.start} - {selectedSlot.end}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TherapistAvailability;
