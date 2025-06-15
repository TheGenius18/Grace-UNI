import React, { useContext } from 'react';
import { Context } from "../../../../../context/context";
import "./PatientTrainingTools.css"

const TrainingCards = () => {
  const { setIsItTraining } = useContext(Context);
  
  const trainings = [
    {
      title: 'Diary',
      description: 'Track your thoughts and feelings through daily writing exercises to gain self-awareness and identify patterns.'
    },
    {
      title: 'Fun & Perfection',
      description: 'Engage in enjoyable activities while learning to balance striving for excellence with self-acceptance.'
    },
    {
      title: 'Breathing',
      description: 'Learn controlled breathing techniques to manage stress, anxiety, and improve emotional regulation.'
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and relax muscle groups to reduce physical tension and promote relaxation.'
    },
    {
      title: 'Role Playing',
      description: 'Practice social interactions and challenging situations in a safe environment to build confidence.'
    },
    {
      title: 'Mindfulness',
      description: 'Develop present-moment awareness through meditation and focused attention exercises.'
    },
    {
      title: 'Self-Dialog',
      description: 'Identify and modify negative self-talk patterns to cultivate more compassionate inner dialogue.'
    },
    {
      title: 'Problem Solving',
      description: 'Learn structured approaches to break down challenges and develop effective solutions.'
    },
    {
      title: 'Decision Making',
      description: 'Improve your ability to make confident choices by weighing options and considering consequences.'
    },
    {
      title: 'Regulating Emotions',
      description: 'Develop skills to recognize, understand, and manage emotional responses in healthy ways.'
    }
  ];

  const handleCardClick = (trainingTitle) => {
    setIsItTraining(trainingTitle);
  };

  return (
    <div className="training-tools-cards-container">
      {trainings.map((training, index) => (
        <div 
          key={index} 
          className="training-tools-card"
          onClick={() => handleCardClick(training.title)}
        >
          <div className="card-logo">
            <img src="src/assets/images/3.png" alt="GRACE" />
          </div>
          <h3 className="training-tools-title">{training.title}</h3>
          <p className="training-tools-description">{training.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrainingCards;