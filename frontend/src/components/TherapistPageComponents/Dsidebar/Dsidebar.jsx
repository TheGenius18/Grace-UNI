import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './Dsidebar.css'
import Sidemenu from "/src/assets/images/menu_icon.png";
import Dicon from "/src/assets/images/therapist_icon1.png";
import Dnotification from "/src/assets/images/notifications_icon.png";
import Dappointments from "/src/assets/images/appointments_icon2.png";
import Dpatients from "/src/assets/images/patients_list_icon.png";
import Dsetting from "/src/assets/images/setting_icon.png";
import Dgrace from "/src/assets/images/gracecolor.jpg";
import { Context } from "../../../context/context";


export default function Dsidebar() {
    const { DMainChanger, setDMainChanger } = useContext(Context);
    const [extended, setExtended] = useState(false);
    const [activeItem, setActiveItem] = useState("notification");

    const handleItemClick = (item) => {
        setActiveItem(item);
        setDMainChanger(item);
    };

    return (
        <div className={`d-sidebar ${extended ? 'extended' : ''}`}>
            <div className="d-sidebar-top">
                <img 
                    onClick={() => setExtended(prev => !prev)} 
                    className='d-menu' 
                    src={Sidemenu} 
                    alt="Menu" 
                />
                
                <div 
                    onClick={() => handleItemClick("profile")} 
                    className={`d-profile ${activeItem === "profile" ? "active" : ""}`}
                >
                    <div className="icon-container">
                        <img className="d-profile-img" src={Dicon} alt="Profile" />
                    </div>
                    {extended && <p className="d-profile-title">My Profile</p>}
                </div>
                
                <div 
                    onClick={() => handleItemClick("patients")} 
                    className={`d-patients ${activeItem === "patients" ? "active" : ""}`}
                >
                    <div className="icon-container">
                        <img className="d-patients-img" src={Dpatients} alt="Patients" />
                    </div>
                    {extended && <p className="d-patients-title">My Patients</p>}
                </div>
                
                <div 
                    onClick={() => handleItemClick("notification")} 
                    className={`d-notifications ${activeItem === "notification" ? "active" : ""}`}
                >
                    <div className="icon-container">
                        <img src={Dnotification} alt="Notifications" className="d-notes-img" />
                    </div>
                    {extended && <p className="d-notes-title">Notifications</p>}
                </div>
                
                <div 
                    onClick={() => handleItemClick("appointment")} 
                    className={`d-appointments ${activeItem === "appointment" ? "active" : ""}`}
                >
                    <div className="icon-container">
                        <img src={Dappointments} alt="Appointments" className="d-notes-img" />
                    </div>
                    {extended && <p className="d-appointments-title">Appointments</p>}
                </div>
            </div>
            
            <div className="d-sidebar-bottom">
                <div 
                    onClick={() => handleItemClick("setting")} 
                    className={`d-setting ${activeItem === "setting" ? "active" : ""}`}
                >
                    <div className="icon-container">
                        <img src={Dsetting} alt="Settings" className="d-setting-img" />
                    </div>
                    {extended && <p className="d-setting-title">Settings</p>}
                </div>
                
                <div 
                    onClick={() => handleItemClick("grace")} 
                    className={`d-grace ${activeItem === "grace" ? "active" : ""}`}
                >
                    <div className="icon-container grace-icon">
                        <img src={Dgrace} alt="Grace" className="d-grace-img" />
                    </div>
                    {extended && <p className="d-grace-title">Hi Grace</p>}
                </div>
            </div>
        </div>
    )
}