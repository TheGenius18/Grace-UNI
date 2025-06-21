import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../../../context/context';
import axios from 'axios';
import './DMainAppointment.css';

const AppointmentComponent = () => {
    const { DMainChanger, setDMainChanger, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [groupedAppointments, setGroupedAppointments] = useState({});
    const [activeDay, setActiveDay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    return;
                }

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/appointments/manage/",
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const appointmentsData = response.data;
                setAppointments(appointmentsData);
                formatAppointmentsByDay(appointmentsData);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('access_token');
                } else {
                    setError(
                        err.response?.data?.message || 
                        "Failed to load appointments. Please try again later."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [statusFilter]);

    const formatAppointmentsByDay = (appointmentsData) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const grouped = {};
        
        daysOfWeek.forEach(day => {
            grouped[day] = [];
        });

        const filteredAppointments = statusFilter === 'all' 
            ? appointmentsData 
            : appointmentsData.filter(appt => appt.status === statusFilter);

        filteredAppointments.forEach(appointment => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
            const dayName = daysOfWeek[appointmentDate.getDay()];
            
            grouped[dayName].push({
                id: appointment.id,
                time: formatTime(appointment.time),
                patient: appointment.patient.user.full_name || 
                         `${appointment.patient.user.first_name} ${appointment.patient.user.last_name}`,
                status: appointment.status,
                date: appointment.date,
                created_at: appointment.created_at
            });
        });

        setGroupedAppointments(grouped);
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString([], { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const toggleDay = (day) => {
        setActiveDay(activeDay === day ? null : day);
    };

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                return;
            }

            await axios.patch(
                `http://127.0.0.1:8000/api/appointments/manage/`,
                {
                    appointment_id: appointmentId,
                    status: newStatus
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            
            setAppointments(prev => prev.map(appt => 
                appt.id === appointmentId ? { ...appt, status: newStatus } : appt
            ));
            
            formatAppointmentsByDay(appointments.map(appt => 
                appt.id === appointmentId ? { ...appt, status: newStatus } : appt
            ));
        } catch (err) {
            setError(
                err.response?.data?.message || 
                "Failed to update appointment. Please try again."
            );
        }
    };

    if (loading) {
        return (
            <div className="appointment-container loading">
                <div className="spinner"></div>
                <p>Loading appointments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="appointment-container error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="appointment-container">
            <div className="appointment-header">
                <h2>Your Appointments</h2>
                <div className="rescheduling-link">
                    <p>To change your availability, go to </p>
                    <button onClick={() => setDMainChanger("freetimes")}>Free Times</button>
                </div>
            </div>

            <div className="appointment-filters">
                <label>Filter by Status:</label>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Appointments</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="appointment-grid">
                {Object.entries(groupedAppointments).map(([day, slots]) => (
                    slots.length > 0 && (
                        <div key={day} className="day-container">
                            <div
                                className={`day-header ${activeDay === day ? 'active' : ''}`}
                                onClick={() => toggleDay(day)}
                            >
                                <h3>{day}</h3>
                                <span className="appointment-count">
                                    {slots.length} appointment{slots.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className={`day-slots ${activeDay === day ? 'expanded' : ''}`}>
                                {slots.map(slot => (
                                    <div key={slot.id} className={`appointment-slot ${slot.status}`}>
                                        <div className="slot-time">
                                            {slot.time}
                                        </div>
                                        <div className="slot-details">
                                            <div className="slot-patient">{slot.patient}</div>
                                            <div className="slot-date">{formatDate(slot.date)}</div>
                                        </div>
                                        <div className="slot-actions">
                                            <select
                                                value={slot.status}
                                                onChange={(e) => handleStatusChange(slot.id, e.target.value)}
                                                disabled={slot.status === 'completed'}
                                            >
                                                <option value="scheduled">Scheduled</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>

            {appointments.length === 0 && !loading && (
                <div className="no-appointments">
                    <p>No appointments found</p>
                    <button onClick={() => setDMainChanger("freetimes")}>
                        Set Your Availability
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentComponent;