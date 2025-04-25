import React from "react";
import { Context } from '../../../../context/context';
import './DMainPatiens.css';
import { useContext } from "react";

const patients = [
  { id: 1, name: "MZR", lastSession: "2 days ago", status: "active" },
  { id: 2, name: "Taric Alahmar", lastSession: "1 week ago", status: "active" },
  { id: 3, name: "Rawan Al Zair", lastSession: "3 days ago", status: "active" },
  { id: 4, name: "Rahaf Al Zair", lastSession: "1 month ago", status: "inactive" },
  { id: 5, name: "Patient 5", lastSession: "2 weeks ago", status: "active" },
  { id: 6, name: "Patient 6", lastSession: "5 days ago", status: "active" },
  { id: 7, name: "Patient 7", lastSession: "3 weeks ago", status: "inactive" },
  { id: 8, name: "Patient 8", lastSession: "Yesterday", status: "active" },

];

const PatientAvatar = ({ initials }) => (
  <div className="patient-avatar">
    {initials.split(' ').map(word => word[0]).join('')}
  </div>
);

export default function DMainPatient() {
  const { setCurrentPatient } = useContext(Context);
  const { DMainChanger, setDMainChanger } = useContext(Context);
  
  return (
    <div className="patients-container">
      <div className="patients-list-wrapper">
        <div className="patients-list">
          {patients.map(patient => (
            <div 
              key={patient.id}
              className="patient-card"
              onClick={() => {setCurrentPatient(patient), setDMainChanger("patient")}}
            >
              <div className="card-content">
                <PatientAvatar initials={patient.name} />
                <div className="patient-status-indicator" data-status={patient.status} />
                <div className="patient-info">
                  <h3 className="patient-name">{patient.name}</h3>
                  <p className="patient-last-session">{patient.lastSession}</p>
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