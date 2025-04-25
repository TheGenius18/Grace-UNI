import React, { useState ,useEffect} from "react";
import axios from "axios";
import '../assets/css/Diary/diary.css'

// import '../assets/js/Diary' // error in diary js 




export default function Diary() {
  // React.useEffect(() => {
  //     DiaryJs();
  // }, []);

  return (
  <>
    <meta charSet="utf-8" />
    <title>Activities Table</title>
    <link rel="stylesheet" href="style.css" />
    <div className="container">
      <div className="left">
        <div className="diary">
          <div className="title">
            <h1>your diary for week communecation</h1>
          </div>
          <div className="weekdays">
            <div className="img">
              <img src="images/Screenshot_٢٠٢٤١٠٠٥_١٠١٧٣٤_InShot.jpg" alt="" />
            </div>
            <div>sun</div>
            <div>mon</div>
            <div>tue</div>
            <div>wed</div>
            <div>thu</div>
            <div>fri</div>
            <div>sat</div>
          </div>
          <div className="times"></div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day" />
          <div className="week-number">week number : 1</div>
        </div>
        <div className="events"></div>
        <div className="add-event-wrapper">
          <div className="add-event-header">
            <div className="title">Add Task</div>
            <i className="fas fa-times close">x</i>
          </div>
          <div className="add-event-body">
            <div className="add-event-input">
              <div className="alert">the task name is required!</div>
              <input
                type="text"
                placeholder="Task Name"
                className="event-name in"
              />
              <div className="added-from-the-list">play</div>
              <div className="alert rate-alert">
                the task before rate is required!
              </div>
              <input
                type="text"
                placeholder="task rate between 0 => 9"
                className="event-time-from in"
              />
              <input
                type="text"
                placeholder="task description"
                className="event-time-to in"
              />
            </div>
          </div>
          <div className="add-event-footer">
            <button className="add-event-btn">add task</button>
            <button className="tasks-list-btn">tasks list</button>
          </div>
        </div>
        <div className="add-event- hide">
          <i className="plus">+</i>
        </div>
      </div>
    </div>
    <div className="tasks-list">
      <div className="tasks-list-header">
        <div className="title">activity list</div>
        <i className="fas fa-times close-list">x</i>
      </div>
      <div className="task-list-buttons"></div>
      <div className="task-list-bottom">
        <button className="add-the-choosen-task">add the task</button>
      </div>
    </div>
  </>
  )}