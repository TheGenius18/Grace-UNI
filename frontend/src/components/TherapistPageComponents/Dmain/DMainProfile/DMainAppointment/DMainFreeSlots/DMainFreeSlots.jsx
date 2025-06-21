import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./DMainFreeSlots.css";

const DAYS_OF_WEEK = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

const TherapistAvailability = () => {
    const [availability, setAvailability] = useState([]);
    const [newSlot, setNewSlot] = useState({
        day: '',
        date: '',
        startTime: '',
        endTime: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        setIsLoading(true);
        setError(null);
        console.log("Fetching availability from backend...");

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("Authorization token missing. Please login.");
                setIsLoading(false);
                return;
            }

            const response = await axios.get(
                "http://127.0.0.1:8000/api/free-times/",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            console.log("Raw availability data from backend:", response.data);

            const groupedByDay = DAYS_OF_WEEK.map(day => ({
                ...day,
                slots: response.data
                    .filter(slot => slot.day === day.value)
                    .map(slot => ({
                        id: slot.id,
                        start: formatTime(slot.start_time),
                        end: formatTime(slot.end_time),
                        is_available: slot.is_available
                    }))
                    .sort((a, b) => a.start.localeCompare(b.start))
            }));

            setAvailability(groupedByDay);
            console.log("Grouped availability state set:", groupedByDay);

        } catch (error) {
            handleApiError(error, "fetch availability");
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const time = new Date(timeString);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSlot(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addTimeSlot = async () => {
        if (!validateSlot()) return;

        setIsLoading(true);
        setError(null);
        console.log("Adding new time slot:", newSlot);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("Authorization token missing. Please login.");
                setIsLoading(false);
                return;
            }

            const startDateTime = new Date(`${newSlot.date}T${newSlot.startTime}`);
            const endDateTime = new Date(`${newSlot.date}T${newSlot.endTime}`);

            const response = await axios.post(
                "http://127.0.0.1:8000/api/free-times/",
                {
                    day: newSlot.day,
                    start_time: startDateTime.toISOString(),
                    end_time: endDateTime.toISOString(),
                    is_available: true
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Add time slot response:", response.data);
            setSuccessMessage("Time slot added successfully!");
            setNewSlot({ day: '', date: '', startTime: '', endTime: '' });
            await fetchAvailability();
        } catch (error) {
            handleApiError(error, "add time slot");
        } finally {
            setIsLoading(false);
        }
    };

    const validateSlot = () => {
        if (!newSlot.day || !newSlot.date || !newSlot.startTime || !newSlot.endTime) {
            setError("Please fill all fields");
            return false;
        }

        if (newSlot.startTime >= newSlot.endTime) {
            setError("End time must be after start time");
            return false;
        }

        const daySlots = availability.find(d => d.value === newSlot.day)?.slots || [];
        const newStart = new Date(`1970-01-01T${newSlot.startTime}`);
        const newEnd = new Date(`1970-01-01T${newSlot.endTime}`);

        for (const slot of daySlots) {
            const slotStart = new Date(`1970-01-01T${slot.start}`);
            const slotEnd = new Date(`1970-01-01T${slot.end}`);

            if ((newStart >= slotStart && newStart < slotEnd) ||
                (newEnd > slotStart && newEnd <= slotEnd) ||
                (newStart <= slotStart && newEnd >= slotEnd)) {
                setError("This slot overlaps with an existing time slot");
                return false;
            }
        }

        return true;
    };

    const removeTimeSlot = async (slotId) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("Authorization token missing. Please login.");
                setIsLoading(false);
                return;
            }

            await axios.delete(
                `http://127.0.0.1:8000/api/free-times/${slotId}/`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            setSuccessMessage("Time slot removed successfully!");
            await fetchAvailability();
        } catch (error) {
            handleApiError(error, "remove time slot");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAvailability = async (slotId, currentStatus) => {
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("Authorization token missing. Please login.");
                setIsLoading(false);
                return;
            }

            await axios.patch(
                `http://127.0.0.1:8000/api/free-times/${slotId}/availability/`,
                { is_available: !currentStatus },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setSuccessMessage("Availability updated successfully!");
            await fetchAvailability();
        } catch (error) {
            handleApiError(error, "update availability");
        } finally {
            setIsLoading(false);
        }
    };

    const handleApiError = (error, action) => {
        console.error(`Error ${action}:`, error);
        const errorMessage = error.response?.data?.detail ||
            error.response?.data?.message ||
            `Failed to ${action}. Please try again.`;
        setError(errorMessage);

        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
    };

    return (
        <div className="therapist-availability-container">
            <div className="availability-header">
                <h2>Manage Your Availability</h2>
                <p>Set your available time slots for appointments</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {successMessage && (
                <div className="alert alert-success" onAnimationEnd={() => setSuccessMessage(null)}>
                    {successMessage}
                </div>
            )}

            <div className="slot-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Day of Week</label>
                        <select
                            name="day"
                            value={newSlot.day}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        >
                            <option value="">Select day</option>
                            {DAYS_OF_WEEK.map((day) => (
                                <option key={day.value} value={day.value}>
                                    {day.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={newSlot.date}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={newSlot.startTime}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={newSlot.endTime}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </div>
                </div>

                <button
                    className="btn-primary"
                    onClick={addTimeSlot}
                    disabled={isLoading || !newSlot.day || !newSlot.date || !newSlot.startTime || !newSlot.endTime}
                >
                    {isLoading ? 'Adding...' : 'Add Availability Slot'}
                </button>
            </div>

            <div className="availability-list">
                <h3>Your Current Availability</h3>

                {isLoading && availability.every(day => day.slots.length === 0) ? (
                    <div className="loading-spinner">Loading availability...</div>
                ) : (
                    <div className="days-grid">
                        {availability.map((day) => (
                            <div key={day.value} className="day-card">
                                <h4>{day.label}</h4>
                                {day.slots.length > 0 ? (
                                    <ul className="time-slots">
                                        {day.slots.map((slot) => (
                                            <li key={slot.id} className={`slot-item ${slot.is_available ? 'available' : 'unavailable'}`}>
                                                <span>
                                                    {slot.start} - {slot.end}
                                                    <span className="availability-status">
                                                        {slot.is_available ? ' (Available)' : ' (Unavailable)'}
                                                    </span>
                                                </span>
                                                <div className="slot-actions">
                                                    <button
                                                        className="btn-toggle"
                                                        onClick={() => toggleAvailability(slot.id, slot.is_available)}
                                                        disabled={isLoading}
                                                    >
                                                        {slot.is_available ? 'Mark Unavailable' : 'Mark Available'}
                                                    </button>
                                                    <button
                                                        className="btn-remove"
                                                        onClick={() => removeTimeSlot(slot.id)}
                                                        disabled={isLoading}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-slots">No availability set</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TherapistAvailability;
