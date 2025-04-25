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
  };

  const toggleDay = (day) => {
    setActiveDay(activeDay === day ? null : day);
  };

  return (
    <div className="appointment-container">
      <p className='reschaduling'>to change your schadule for the time you'r avilable go to setting</p>
      {/* <h2 className="appointment-header">Weekly Therapy Schedule</h2> */}
      
      <div className="appointment-grid">
        {/* Header row */}
        {/* <div className="grid-header grid-day">Day</div>
        <div className="grid-header grid-slots">Appointments</div> */}
        
        {/* Days rows */}
        {Object.entries(appointments).map(([day, slots]) => (
          <React.Fragment key={day}>
            <div 
              className={`grid-day ${activeDay === day ? 'active' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
              <span className="day-indicator">{slots.length} appt{slots.length !== 1 ? 's' : ''}</span>
            </div>
            <div className={`grid-slots ${activeDay === day ? 'expanded' : ''}`}>
              {slots.length > 0 ? (
                slots.map(slot => (
                  <div key={slot.id} className="appointment-slot">
                    <div className="slot-time">{slot.time}</div>
                    <div className="slot-patient">{slot.patient}</div>
                    {/* <div className="slot-type">{slot.type}</div> */}
                    {/* <div className="slot-actions">
                      <button className="slot-cancel">Cancel</button>
                      <button className="slot-details">Details</button>
                    </div> */}
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