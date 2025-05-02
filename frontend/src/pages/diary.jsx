import React from "react";
import WeekSchedule from "../components/TrainingComponents/DiaryComponents/DiaryTasksTable/DiaryTasksTable";
import TasksInput from "../components/TrainingComponents/DiaryComponents/DiaryInputTask/DiaryInputTask";
import ChooseTasksList from "../components/TrainingComponents/DiaryComponents/DiaryTasksSugest/DiaryTasksSugest";
import DayTasksList from "../components/TrainingComponents/DiaryComponents/DiaryTasksList/DiaryTasksList";
// import { Context } from "../context/context";
import '../assets/css/Diary/diary.css';

export default function Diary() {
//   return (
//     <DiaryProvider>
//       <DiaryContent />
//     </DiaryProvider>
//   );
// }


  return (
    <div className="diary-container">
      <div className="container">
        <div className="left">
          <WeekSchedule />
        </div>
        
        <div className="right">
          <DayTasksList />
          <TasksInput />
        </div>
      </div>
      
      <ChooseTasksList />
    </div>
  );
}