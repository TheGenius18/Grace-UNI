<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react';
import './DMainAppointment.css';
import { Context } from '../../../../../context/context';
import axios from 'axios';

const AppointmentComponent = () => {
  const { DMainChanger, setDMainChanger, user } = useContext(Context);
  const [appointments, setAppointments] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/appointments/manage/",
          {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Assuming you use token auth
              "Content-Type": "application/json",
            },
          }
        );
        
        // Transform the backend data into the format your component expects
        const backendAppointments = response.data;
        const formattedAppointments = formatAppointmentsByDay(backendAppointments);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchAppointments();
    }
  }, [user]);

  // Helper function to transform backend data to frontend format
  const formatAppointmentsByDay = (backendAppointments) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formatted = {};
    
    // Initialize empty arrays for each day
    daysOfWeek.forEach(day => formatted[day] = []);
    
    // Group appointments by day
    backendAppointments.forEach(appointment => {
      const date = new Date(appointment.date);
      const dayIndex = date.getDay(); // 0=Sunday, 1=Monday, etc.
      const dayName = daysOfWeek[(dayIndex + 6) % 7]; // Adjust to start with Monday
      
      formatted[dayName].push({
        id: appointment.id,
        time: formatTime(appointment.time),
        patient: appointment.patient.user.first_name + ' ' + appointment.patient.user.last_name,
        type: appointment.notes || 'Therapy Session',
        status: appointment.status
      });
    });
    
    return formatted;
  };

  // Helper to format time
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
=======
import React, { useState } from 'react';
import './DMainAppointment.css';

const AppointmentComponent = () => {
  const [appointments, setAppointments] = useState({
    Monday: [
      { id: 1, time: '9:00 AM', patient: 'John Doe', type: 'Initial Consultation' },
      { id: 2, time: '2:00 PM', patient: 'Jane Smith', type: 'Follow-up' }
    ],
    Tuesday: [
      { id: 3, time: '10:30 AM', patient: 'Robert Johnson', type: 'Cognitive Therapy' }
    ],
    Wednesday: [],
    Thursday: [
      { id: 4, time: '11:00 AM', patient: 'Emily Davis', type: 'Group Therapy' },
      { id: 5, time: '3:30 PM', patient: 'Michael Brown', type: 'Follow-up' },
      { id: 5, time: '3:30 PM', patient: 'Michael Brown', type: 'Follow-up' },
      { id: 5, time: '3:30 PM', patient: 'Michael Brown', type: 'Follow-up' },
      { id: 5, time: '3:30 PM', patient: 'Michael Brown', type: 'Follow-up' },
      { id: 5, time: '3:30 PM', patient: 'Michael Brown', type: 'Follow-up' }
    ],
    Friday: [
      { id: 6, time: '1:00 PM', patient: 'Sarah Wilson', type: 'Initial Consultation' }
    ],
    Saturday: [],
    Sunday: []
  });

  const [activeDay, setActiveDay] = useState(null);

  const addAppointment = (day, newAppointment) => {
    setAppointments(prev => ({
      ...prev,
      [day]: [...prev[day], newAppointment]
    }));
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
  };

  const toggleDay = (day) => {
    setActiveDay(activeDay === day ? null : day);
  };

<<<<<<< HEAD
  if (loading) {
    return <div className="appointment-container">Loading appointments...</div>;
  }

  if (error) {
    return <div className="appointment-container error">{error}</div>;
  }

  return (
    <div className="appointment-container">
      <p className='reschaduling'>
        To change your schedule for the time you're available go to 
        <button onClick={() => { setDMainChanger("freetimes") }}>free times</button>
      </p>
      
      <div className="appointment-grid">
=======
  return (
    <div className="appointment-container">
      <p className='reschaduling'>to change your schadule for the time you'r avilable go to setting</p>
      {/* <h2 className="appointment-header">Weekly Therapy Schedule</h2> */}
      
      <div className="appointment-grid">
        {/* Header row */}
        {/* <div className="grid-header grid-day">Day</div>
        <div className="grid-header grid-slots">Appointments</div> */}
        
        {/* Days rows */}
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
        {Object.entries(appointments).map(([day, slots]) => (
          <React.Fragment key={day}>
            <div 
              className={`grid-day ${activeDay === day ? 'active' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
<<<<<<< HEAD
              <span className="day-indicator">
                {slots.length} appt{slots.length !== 1 ? 's' : ''}
              </span>
=======
              <span className="day-indicator">{slots.length} appt{slots.length !== 1 ? 's' : ''}</span>
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
            </div>
            <div className={`grid-slots ${activeDay === day ? 'expanded' : ''}`}>
              {slots.length > 0 ? (
                slots.map(slot => (
                  <div key={slot.id} className="appointment-slot">
                    <div className="slot-time">{slot.time}</div>
                    <div className="slot-patient">{slot.patient}</div>
<<<<<<< HEAD
                    <div className={`slot-status ${slot.status}`}>{slot.status}</div>
=======
                    {/* <div className="slot-type">{slot.type}</div> */}
                    {/* <div className="slot-actions">
                      <button className="slot-cancel">Cancel</button>
                      <button className="slot-details">Details</button>
                    </div> */}
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
                  </div>
                ))
              ) : (
                <div className="no-appointments">No appointments scheduled</div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AppointmentComponent;