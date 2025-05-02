import React, { useContext } from "react";
import { Context } from "../../../../context/context";
import './DiaryTasksTable.css'

export default function WeekSchedule() {
  const { dayTimes, activeDay, setActiveDay } = useContext(Context);

  const handleDayClick = (day) => {
    if (day.value !== "8") {
      setActiveDay(day);
    }
  };

  return (
    <div className="diary">
      <div className="title">
        <h1>your diary for week communecation</h1>
      </div>
      
      <div className="weekdays">
        <div className="img">
          <img src="images/gracecolor.jpg" alt="weekdays" />
        </div>
        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      
      <div className="times">
        {dayTimes.map((day, index) => (
          <div
            key={index}
            className={`time ${day.value === "8" ? "no" : ""} ${activeDay === day ? "active" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day.time}
          </div>
        ))}
      </div>
    </div>
  );
}