import React from 'react';
import DailyQuote from './PatintDailyQuote/PatintDailyQuote';
import DayTasks from './PatientTasksDayList/PatientTasksDayList';
import SideButtons from './PatientSideButtons/PatientSideButtons';

const PatientDashboard = () => {
  return (
      <div className="patient-page-main-content">
        <DailyQuote />
        <div className="patient-page-tasks-section">
          <DayTasks />
          <SideButtons />
        </div>
      </div>
  );
};

export default PatientDashboard;