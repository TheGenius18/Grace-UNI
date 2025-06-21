import React ,{useContext,useState} from 'react';
import Navbar from './PatientNavbar/PatientNavbar';
import Main from './PatientMainComponents/PatientMain';
import TrainingMenu from './PatientTrainingAndSkills/PatientTrainingMenu/PatientTrainingMenu';
import TrainingMain from './PatientTrainingAndSkills/PatientTrainingMain/PatientTrainingMain';
import Treatment from './PatientMainTreatment/patientMainTreatment';
import TrainingChanger from './PatientTrainingAndSkills/PatientTrainingMain/PatientTrainingTools/PatientTrainingChanger/PatientTrainingChanger';
import Profile from "./PatientProfile/PatientProfile"


import './PatientPage.css';
import { Context } from "../../context/context";

const PatientDashboard = () => {
    const {PMainChanger,setPMainChanger} = useContext(Context)
    const {IsItTraining,setIsItTraining} = useContext(Context)


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
                {IsItTraining==="main"?
                <div>
                    <TrainingMenu/>
                    <TrainingMain/>
                </div>
                :<TrainingChanger/>}
            </div>
        :null}
        {PMainChanger=="treatment"?
            <div className="patient-treatment">
                <Treatment/>
            </div>
        :null}
        {PMainChanger=="profile"?
            <div className="patient-treatment">
                <Profile/>
            </div>
        :null}
        
    </div>
  );
};

export default PatientDashboard;