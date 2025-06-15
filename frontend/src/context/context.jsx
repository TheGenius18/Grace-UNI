import {createContext, useState, useRef} from "react"
import React from "react";



export const Context = createContext();

const ContextProvider=(props)=>{

  const [ItsHisFirstTime, setItsHisFirstTime ] = useState(false);
  const [IsItTraining, setIsItTraining ] = useState("main");

  const [TypeOfDiag, setTypeOfDiag] = useState('front');

    const [FilLUserInfo, setFillUserInfo ] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(null);



    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const startConversation = () => {
      // sendMessage('start diagnosis');
      // setHasStarted(true);
      console.log("hi")
  };

  const resetConversation = () => {
      setConversation([]);
      setDiagnosisResult(null);
      setHasStarted(false);
  };



    
    const [DMainChanger,setDMainChanger]=useState("notification")
    const [PMainChanger,setPMainChanger]=useState("main")
    const [DMainMmemotext, setDMainMmemoText] = useState("Target Profile"); 
    const [OnMenuChange, setOnMenuChange] = useState("therapy-training"); 
    const [DMainMmemoisEditing, setDMainMmemoIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const patient = {
        id: 1,
        name: '...',
        age: 30,
        medicalHistory: '...',
        treatmentProgress: '...'
    };
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const localStreamRef = useRef(null);
    const pcRef = useRef(null);
    const socketRef = useRef(null);
    const [currentPatient, setCurrentPatient] = useState(null);



    const dayTimesData = [
        // { time: "Morning", value: "8", listOfEvents: [] },
        // // ... rest of dayTimes data
      ];
    
      const tasksData = [
        "write in a journal",
          "go out for  coffee",
          "  watch a  movie  ",
          "   go  swimming   ",
          "watch the  sunrise",
          " watch the sunset ",
          "  go  stargazing  ",
          " go rock climbing ",
          " go to the  beach ",
          "   do a  puzzle   ",
          "  drow or  paint  ",
          "   play a sport   ",
          "play an instrument",
          "   coock a meal   ",
          "go to the library ",
          "  work in garden  ",
          "   go to a play   ",
          " visit neighbors  ",
          "listen to a podcast",
          " go to a  concert ",
          "  call a  friend  ",
          "  bake a dessert  ",
          "  visit a friend  ",
          "     volunteer    ",
          "  go for a  walk  ",
          "   start a blog   ",
          " talk to Grace-AI ",
          " go to bike ride  ",
          "   visit a park   ",
          "     do yoga      ",
          "   write a poem   ",
          "  care for a pet  ",
          "     exercise     ",
          "   try new food   ",
          "    play cards    ",
          "   read a  book   ",
      ];
    
      const [activeDay, setActiveDay] = useState(null);
      const [selectedTask, setSelectedTask] = useState("");
      const [events, setEvents] = useState(dayTimesData);
      const [showTasksList, setShowTasksList] = useState(false);
      const [showAddForm, setShowAddForm] = useState(false);
    
      const addNewEvent = (newEvent) => {
        const updatedEvents = events.map(day => {
          if (day === activeDay) {
            return { ...day, listOfEvents: [...day.listOfEvents, newEvent] };
          }
          return day;
        });
        setEvents(updatedEvents);
      };
    
    
    const contextValue={
        DMainChanger,
        setDMainChanger,
        DMainMmemotext,
        setDMainMmemoText,
        DMainMmemoisEditing,
        setDMainMmemoIsEditing,
        message,
        setMessage,
        patient,
        isMuted,
        setIsMuted,
        isCameraOff,
        setIsCameraOff,
        isSharingScreen,
        setIsSharingScreen,
        localStreamRef,
        pcRef,
        socketRef,
        currentPatient,
        setCurrentPatient,

        dayTimes: events,
        tasks: tasksData,
        activeDay,
        setActiveDay,
        selectedTask,
        setSelectedTask,
        showTasksList,
        setShowTasksList,
        showAddForm,
        setShowAddForm,
        addNewEvent,
        

        PMainChanger,
        setPMainChanger,
        OnMenuChange,
        setOnMenuChange,



        conversation,
        // sendMessage,
        isLoading,
        diagnosisResult,
        hasStarted,
        startConversation,
        resetConversation,

        setTypeOfDiag,
        TypeOfDiag,


        showResult,
        setShowResult,
        score,
        setScore,
        // onRestart,
        // setOnRestart

        FilLUserInfo,
        setFillUserInfo,

        ItsHisFirstTime,
        setItsHisFirstTime,

        IsItTraining,
        setIsItTraining

    
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider