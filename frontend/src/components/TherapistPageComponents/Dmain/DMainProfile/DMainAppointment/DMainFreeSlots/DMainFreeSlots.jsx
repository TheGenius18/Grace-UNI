import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./DMainFreeSlots.css";

const TherapistAvailability = () => {
  const [days, setDays] = useState([
    { day: 'monday', displayName: 'Monday', slots: [] },
    { day: 'tuesday', displayName: 'Tuesday', slots: [] },
    { day: 'wednesday', displayName: 'Wednesday', slots: [] },
    { day: 'thursday', displayName: 'Thursday', slots: [] },
    { day: 'friday', displayName: 'Friday', slots: [] },
    { day: 'saturday', displayName: 'Saturday', slots: [] },
    { day: 'sunday', displayName: 'Sunday', slots: [] },
  ]);

  const [newSlot, setNewSlot] = useState({
    day: '',
    startTime: '',
    endTime: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchFreeTimes();
  }, []);

  const fetchFreeTimes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/therapists/free-times/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
        }
      });
      
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
      console.error('Error fetching free times:', error);
      setError("Failed to load availability. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.split(':').slice(0, 2).join(':');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimeSlot = async () => {
    if (isLoading) return;
    
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
      setError("Please fill all fields");
      return;
    }

    if (newSlot.startTime >= newSlot.endTime) {
      setError("End time must be after start time");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/free-times/",
        {
          day: newSlot.day.toLowerCase(),
          start_time: newSlot.startTime,
          end_time: newSlot.endTime,
          is_available: true
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json",
          }
        }
      );

      setSuccessMessage("Time slot added successfully!");
      fetchFreeTimes();
      setNewSlot({ day: '', startTime: '', endTime: '' });
    } catch (error) {
      console.error('Error adding time slot:', error);
      if (error.response?.data) {
        const errors = Object.values(error.response.data).flat();
        setError(errors.join(', ') || "Failed to add time slot");
      } else {
        setError("Failed to add time slot. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeTimeSlot = async (day, index, slotId) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/free-times/${slotId}/`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json",
          }
        }
      );

      setSuccessMessage("Time slot removed successfully!");
      
      setDays(prevDays =>
        prevDays.map(dayObj =>
          dayObj.day === day
            ? {
                ...dayObj,
                slots: dayObj.slots.filter((_, i) => i !== index)
              }
            : dayObj
        )
      );
    } catch (error) {
      console.error('Error removing time slot:', error);
      setError("Failed to remove time slot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="therapist-availability-container fade-in">
      <div className="availability-header">
        <h2>Set Your Availability</h2>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <div className="slot-form">
        <div className="form-group">
          <label>Day:</label>
          <select 
            name="day" 
            value={newSlot.day} 
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select a day</option>
            {days.map((dayObj, index) => (
              <option key={index} value={dayObj.day}>{dayObj.displayName}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={newSlot.startTime}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={newSlot.endTime}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <button 
          className="add-slot-btn" 
          onClick={addTimeSlot}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Time Slot'}
        </button>
      </div>
      
      <div className="availability-display">
        <h3>Your Current Availability</h3>
        {isLoading && days.every(day => day.slots.length === 0) ? (
          <p>Loading availability...</p>
        ) : (
          days.map((dayObj, dayIndex) => (
            <div key={dayIndex} className="day-container">
              <div className="day-header">
                <h4>{dayObj.displayName}</h4>
              </div>
              {dayObj.slots.length > 0 ? (
                <div className="slots-list">
                  {dayObj.slots.map((slot, slotIndex) => (
                    <div key={slot.id} className="slot-item">
                      <span className="slot-time">{slot.start} - {slot.end}</span>
                      <button 
                        className="remove-slot-btn"
                        onClick={() => removeTimeSlot(dayObj.day, slotIndex, slot.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? '...' : '×'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-slots">No time slots added</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TherapistAvailability;