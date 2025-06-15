import React, { useContext } from 'react';
import { Context } from "../../../../../../context/context";
import Breathing from "../Breathing/Breathing";
import Diary from "../Diary/Diary";
import FunPerfection from "../FunPerfection/FunPerfection";
import PMR from "../PMR/PMR";
import RolePlaying from "../RolePlaying/RolePlaying";
import Mindfulness from "../Mindfulness/Mindfulness";
import SelfDialog from "../SelfDialogue/SelfDialogue";
import ProblemSolving from "../ProblemSolving/ProblemSolving";
import DecisionMaking from "../DecisionMaking/DecisionMaking";
import RegulatingEmotions from "../RegulatingEmotions/RegulatingEmotions";
import GoBackButton from '../GoBack/GoBack';

const PatientDashboard = () => {
    const { IsItTraining } = useContext(Context);
    
    const trainingComponents = {
        'breathing': <Breathing />,
        'diary': <Diary />,
        'fun & perfection': <FunPerfection />,
        'progressive muscle relaxation': <PMR />,
        'role playing': <RolePlaying />,
        'mindfulness': <Mindfulness />,
        'self-dialog': <SelfDialog />,
        'problem solving': <ProblemSolving />,
        'decision making': <DecisionMaking />,
        'regulating emotions': <RegulatingEmotions />
    };

    return (
        <div className="changer"style={{
          background: '#f5f7fa'
        }}>
            {trainingComponents[IsItTraining.toLowerCase()] || null}
            <GoBackButton/>
        </div>
    );
};

export default PatientDashboard;