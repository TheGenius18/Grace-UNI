import React, { useState ,useEffect, useContext} from "react";
import axios from "axios";
import './Dmain.css'


import GraceLogo from "/src/assets/images/7.png";

import MainMemo from "./DMainProfile/DMainMemo/DMainMemo"
import MainCV from "./DMainProfile/DMainCV/DMainCV"
import MainPatient from "./DMainProfile/DMainPatient/DMainPatient"
import MainAppointment from "./DMainProfile/DMainAppointment/DMainAppointment"
import MainArticles from "./DMainProfile/DMainArticles/DMainArticles"
import HiGrace from "./HiGrace/HiGrace"
import Noteifications from "./DMainNotification/DMainNotification"
import Pateints from "./DMainPatiens/DMainPatiens"
import Profile from "./DMainProfile/DMainProfile"
import Patient from "./DMainPatiens/DMainPatientView/DMainPatientView"


import { Context } from "../../../context/context";


export default function Dmain() {
    const {DMainChanger,setDMainChanger} = useContext(Context)

   

    return (

        <div className="d-main">
        {DMainChanger=="notification"?
        <div className="d-main-notifications">
            <h2 className="d-main-notification-header">notifications</h2>
            <Noteifications/>
        </div> 
        :null}
        {DMainChanger=="patients"?
        <div className="d-main-patients">
            <h2 className="d-main-notification-header">my patients</h2>
            <Pateints/>
        </div>:null}

        {DMainChanger=="profile"?
            <div className="d-main-profile">
                <h2 className="d-main-notification-header">my profile</h2>
                <Profile/>
            </div>
        :null}

        {DMainChanger=="cv"?
            <div className="d-main-cv">
                <h2 className="d-main-memo-header">my CV</h2>
                <MainCV/>
            </div>
        :null}

        {DMainChanger=="memo"?
            <div className="d-main-memo">
                <h2 className="d-main-memo-header">my memo</h2>
                <MainMemo/>
            </div>
        :null}

        {DMainChanger=="patient"?
            <div className="d-main-patien">
                <Patient/>
            </div>
        :null}

        {DMainChanger=="articles"?
            <div className="d-main-memo">
                <h2 className="d-main-memo-header">my articles</h2>
            </div>
        :null}


        {DMainChanger=="appointment"?
            <div className="d-main-appointments">
                <h2 className="d-main-notification-header">my appointments</h2>
                <MainAppointment/>
            </div>
        :null}

        {DMainChanger=="setting"?
            <div className="d-main-settings">
                <h2 className="d-main-notification-header">settings</h2>
            </div>
        :null}

        {DMainChanger=="grace"?
            <div className="d-main-hi-grace">
                <h2 className="d-main-notification-header">hi grace</h2>
                <HiGrace/>
            </div>
        :null}
        </div>
    )
}
