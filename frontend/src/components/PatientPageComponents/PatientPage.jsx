import React ,{useContext,useState} from 'react';
import Navbar from './PatientNavbar/PatientNavbar';
import Main from './PatientMainComponents/PatientMain';
import TrainingMenu from './PatientTrainingAndSkills/PatientTrainingMenu/PatientTrainingMenu';
import TrainingMain from './PatientTrainingAndSkills/PatientTrainingMain/PatientTrainingMain';
<<<<<<< HEAD
import Treatment from './PatientMainTreatment/patientMainTreatment';

=======
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5


import './PatientPage.css';
import { Context } from "../../context/context";

const PatientDashboard = () => {
    const {PMainChanger,setPMainChanger} = useContext(Context)


  return (
    <div className="patient-page-dashboard ">
      <Navbar />
      {PMainChanger=="main"?
            <div className="patient-main">
                <Main/>
            </div>
        :null}
        {PMainChanger=="training"?
            <div className="patient-training">
                <TrainingMenu/>
                <TrainingMain/>
            </div>
        :null}
<<<<<<< HEAD
        {PMainChanger=="treatment"?
            <div className="patient-treatment">
                <Treatment/>
            </div>
        :null}
=======
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
        
    </div>
  );
};

export default PatientDashboard;