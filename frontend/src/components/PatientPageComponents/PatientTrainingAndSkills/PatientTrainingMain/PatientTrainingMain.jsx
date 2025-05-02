import React ,{useContext,useState} from 'react';
import Tools from './PatientTrainingTools/PatientTrainingTools';
import Meditations from './PatientTrainingMesitations/PatientTrainingMesitations';
<<<<<<< HEAD
import RelaxingSounds from './PatientTrainingRelaxingSounds/PatientTrainingRelaxingSounds';

=======
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5

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
<<<<<<< HEAD
        {OnMenuChange=="sounds"?
            <div className="patient-relaxing-sounds">
                <RelaxingSounds/>
            </div>
        :null}
=======
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
    </div>
  );
};

export default PatientDashboard;