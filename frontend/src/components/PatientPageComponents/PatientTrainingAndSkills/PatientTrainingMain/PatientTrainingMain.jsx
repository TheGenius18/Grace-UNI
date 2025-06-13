import React ,{useContext,useState} from 'react';
import Tools from './PatientTrainingTools/PatientTrainingTools';
import Meditations from './PatientTrainingMesitations/PatientTrainingMesitations';
import RelaxingSounds from './PatientTrainingRelaxingSounds/PatientTrainingRelaxingSounds';


import "./PatientTrainingMain.css"

import { Context } from "../../../../context/context";

const PatientDashboard = () => {
    const { OnMenuChange, setOnMenuChange } = useContext(Context);


  return (
    <div className="patient-page-training">
        {OnMenuChange=="therapy-training"?
            <div className="patient-training">
                <Tools/>
            </div>
        :null}
        {OnMenuChange=="meditations"?
            <div className="patient-meditations">
                <Meditations/>
            </div>
        :null}
        {OnMenuChange=="sounds"?
            <div className="patient-relaxing-sounds">
                <RelaxingSounds/>
            </div>
        :null}
    </div>
  );
};

export default PatientDashboard;