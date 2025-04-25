import React from 'react';
import './PatientTasksDayList.css';

const PatientTasksDayList = () => {
  const tasks = [
    { id: 1, icon: '🧘‍♂️', title: 'Morning Meditation', completed: false },
    { id: 2, icon: '📝', title: 'Journal Your Thoughts', completed: true },
    { id: 3, icon: '🚶‍♂️', title: '15 Minute Walk', completed: false },
    { id: 4, icon: '📞', title: 'Check-in with Support', completed: false },
  ];

  return (
    <div className="day-tasks-container">
      <h3 className="day-tasks-tasks-title">Today's Tasks</h3>
      <ul className="day-tasks-tasks-list">
        {tasks.map(task => (
          <li key={task.id} className={`day-tasks-task-item ${task.completed ? 'completed' : ''}`}>
            <span className="day-tasks-task-icon">{task.icon}</span>
            <span className="day-tasks-task-text">{task.title}</span>
            {task.completed ? (
              <span className="day-tasks-task-status">✓</span>
            ) : (
              <button className="day-tasks-task-action">Mark Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientTasksDayList;