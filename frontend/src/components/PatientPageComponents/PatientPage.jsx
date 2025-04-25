import React from 'react';
import Navbar from './PatientNavbar/PatientNavbar';
import MainButtons from './PatientMenu/PatientMenu';
import DailyQuote from './PatintDailyQuote/PatintDailyQuote';
import DayTasks from './PatientTasksDayList/PatientTasksDayList';
import SideButtons from './PatientSideButtons/PatientSideButtons';
import Footer from './PatientPageFooter/PatientPageFooter';

import './PatientPage.css';

const PatientDashboard = () => {
  return (
    <div className="patient-dashboard-container">
      <Navbar />
      <div className="patient-main-content">
        <div className="patient-menu-patient-dashboard">
        <MainButtons />
        </div>
        <DailyQuote />
        <div className="day-tasks-section">
        <DayTasks />
        <SideButtons />
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default PatientDashboard;