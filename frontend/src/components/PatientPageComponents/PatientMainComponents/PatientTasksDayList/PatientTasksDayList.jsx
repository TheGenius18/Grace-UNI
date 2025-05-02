import React, { useState } from 'react';
import './PatientTasksDayList.css';

const PatientTasksDayList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, icon: '🧘‍♂️', title: 'Morning Meditation', completed: false },
    { id: 2, icon: '📝', title: 'Journal Your Thoughts', completed: true },
    { id: 3, icon: '🚶‍♂️', title: '15 Minute Walk', completed: false },
    { id: 4, icon: '📞', title: 'Check-in with Support', completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="patient-page-tasks-container">
      <h3 className="patient-page-tasks-title">Today's Tasks</h3>
      <ul className="patient-page-tasks-list">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`patient-page-task-item ${task.completed ? 'patient-page-completed' : ''}`}
            onClick={() => !task.completed && toggleTaskCompletion(task.id)}
          >
            <span className="patient-page-task-icon">{task.icon}</span>
            <span className="patient-page-task-text">{task.title}</span>
            <span className="patient-page-task-status">
              {task.completed ? (
                <span className="patient-page-checkmark">✓</span>
              ) : (
                <button 
                  className="patient-page-task-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(task.id);
                  }}
                >
                  Complete
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientTasksDayList;