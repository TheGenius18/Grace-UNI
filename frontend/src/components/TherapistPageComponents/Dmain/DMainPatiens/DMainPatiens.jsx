import React, { useContext, useEffect, useState } from "react";
import { Context } from '../../../../context/context';
import './DMainPatiens.css';
import axios from "axios";

const PatientAvatar = ({ name }) => (
    <div className="patient-avatar">
        {name.split(' ').map(word => word[0]).join('')}
    </div>
);

export default function DMainPatient() {
    const { setCurrentPatient, DMainChanger, setDMainChanger, refreshPatients } = useContext(Context);
    const [patients, setPatients] = useState([]);

    const fetchPatients = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.get(`http://localhost:8000/api/therapist/mypatients/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPatients(res.data);
        } catch (error) {
            console.error("Failed to fetch patients", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [refreshPatients]); 

    return (
        <div className="patients-container">
            <div className="patients-list-wrapper">
                <div className="patients-list">
                    {patients.map((patient, index) => (
                        <div
                            key={index}
                            className="patient-card"
                            onClick={() => {
                                setCurrentPatient(patient);
                                setDMainChanger("patient");
                            }}
                        >
                            <div className="card-content">
                                <PatientAvatar name={patient.user.first_name || patient.user.username} />
                                <div className="patient-status-indicator" data-status="active" />
                                <div className="patient-info">
                                    <h3 className="patient-name">{patient.user.first_name || patient.user.username}</h3>
                                    <p className="patient-last-session">No session yet</p>
                                </div>
                                <div className="card-hover-effect" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
