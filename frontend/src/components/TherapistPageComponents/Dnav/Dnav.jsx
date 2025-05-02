import React, { useState ,useEffect} from "react";
import axios from "axios";
import './Dnav.css'
import GraceLogo from "/src/assets/images/7.png";




export default function Dnav() {
    return (
        <div className="d-nav">
            <div className="d-grace-logo">
                <a href="/Home">
                    <img src={GraceLogo} alt="" />
                </a>
            </div>
            <div className="therapist-account">
                
                <img src="" alt="" />
            </div>
        </div>
    )
}
