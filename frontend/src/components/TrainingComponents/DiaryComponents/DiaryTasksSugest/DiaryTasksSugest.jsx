import React, { useContext, useState } from "react";
import { Context } from "../../../../context/context";
import './DiaryTasksSugest.css'



export default function ChooseTasksList() {
    const {
      tasks,
      showTasksList,
      setShowTasksList,
      selectedTask,       // Get selectedTask from context
      setSelectedTask,    // Get setSelectedTask from context
      setShowAddForm
    } = useContext(Context);
  
    // Removed the local state declaration since we're using context
  
    const handleTaskSelect = (task) => {
      const trimmedTask = task.trim();
      setSelectedTask(trimmedTask);  // Using the context setter
    };
  
    const handleAddSelected = () => {
      if (selectedTask) {  // Using the context selectedTask
        setShowAddForm(true);
        setShowTasksList(false);
      }
    };
  
    return (
      <div className={`tasks-list ${showTasksList ? "show-tasks-list" : ""}`}>
        <div className="tasks-list-header">
          <div className="title">activity list</div>
          <i 
            className="fas fa-times close-list" 
            onClick={() => setShowTasksList(false)}
          >
            x
          </i>
        </div>
        
        <div className="task-list-buttons">
          {tasks.map((task, index) => (
            <button
              key={index}
              className={`tasks-list-button ${selectedTask === task.trim() ? "active" : ""}`}
              onClick={() => handleTaskSelect(task)}
            >
              {task.trim()}
            </button>
          ))}
        </div>
        
        <div className="task-list-bottom">
          <button 
            className={`add-the-choosen-task ${selectedTask ? "active" : ""}`}
            onClick={handleAddSelected}
          >
            add the task
          </button>
        </div>
      </div>
    );
  }