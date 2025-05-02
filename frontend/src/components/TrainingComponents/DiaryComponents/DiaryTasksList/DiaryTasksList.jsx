import React, { useContext } from "react";
import { Context } from "../../../../context/context";
import './DiaryTasksList.css'

export default function DayTasksList() {
  const { activeDay, dayTimes } = useContext(Context);

  if (!activeDay) return null;

  const currentDayEvents = dayTimes.find(day => day === activeDay)?.listOfEvents || [];

  return (
    <>
      <div className="today-date">
        <div className="event-day">{activeDay.value}</div>
        <div className="week-number">week number : 1</div>
      </div>
      
      <div className="events">
        {currentDayEvents.map((event, index) => (
          <div key={index} className="event">
            <div className="title">
              <i className="point">{">"}</i>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-rate">Task Rate : {event.rate}</div>
            </div>
            <div className="event-time">
              {getTimeRange(activeDay.time)}
            </div>
            {event.description && (
              <div className="task-description">
                About : {event.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function getTimeRange(time) {
  switch(time) {
    case 'm': return "12:00AM - 12:00PM";
    case 'an': return "12:00PM - 06:00PM";
    case 'n': return "06:00PM - 12:00PM";
    default: return "";
  }
}