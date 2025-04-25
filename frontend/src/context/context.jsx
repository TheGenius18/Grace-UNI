import {createContext, useState, useRef} from "react"
import React from "react";



export const Context = createContext();

const ContextProvider=(props)=>{
    
    const [DMainChanger,setDMainChanger]=useState("notification")
    const [DMainMmemotext, setDMainMmemoText] = useState("Target Profile"); 
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
        setCurrentPatient
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider