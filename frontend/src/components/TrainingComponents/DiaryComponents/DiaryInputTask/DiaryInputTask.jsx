import React, { useContext, useState } from "react";
import { Context } from "../../../../context/Context";
import './DiaryInputTask.css'

export default function TasksInput() {
  const {
    selectedTask,
    showAddForm,
    setShowAddForm,
    setShowTasksList,
    addNewEvent
  } = useContext(Context);

  const [eventName, setEventName] = useState("");
  const [eventRate, setEventRate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showRateAlert, setShowRateAlert] = useState(false);

  const handleAddEvent = () => {
    if (!eventName && !selectedTask) {
      setShowAlert(true);
      return;
    }
    if (!eventRate) {
      setShowRateAlert(true);
      return;
    }

    addNewEvent({
      title: selectedTask || eventName,
      rate: eventRate,
      description: eventDescription
    });

    // Reset form
    setEventName("");
    setEventRate("");
    setEventDescription("");
    setShowAddForm(false);
  };

  const handleRateChange = (e) => {
    const value = e.target.value.replace(/[^0-9:]/g, "").slice(0, 1);
    setEventRate(value);
  };

  return (
    <>
      <div className={`add-event-wrapper ${showAddForm ? "active" : ""}`}>
        {/* ... add the code please ... */}
      </div>
      
      <div 
        className={`add-event- ${showAddForm ? "hide" : ""}`} 
        onClick={() => setShowAddForm(true)}
      >
        <i className="plus">+</i>
      </div>
    </>
  );
}