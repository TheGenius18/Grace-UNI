import React from "react";
import './HiGrace.css'
import { assets } from "../../../../assets/assets";


export default function HiGrace() {
    return(
        <div className="hi-grace-container">
            <div className="d-main-hi-grace-cards">
            <div className="d-main-hi-grace-card">
                <p>suggest beautiful place to see on an upcomin road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="d-main-hi-grace-card">
                <p>briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="d-main-hi-grace-card">
                <p>brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="d-main-hi-grace-card">
                <p>improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
            </div>
            </div>
            <div className="d-main-hi-grace-bottom">
            <div className="d-main-hi-grace-search-box">
                <input type="d-main-hi-grace-text" placeholder="enter a prompt here" />
                <div className="d-main-hi-grace-icons">
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className="d-main-hi-grace-bottom-info">
            Grace may display inaccurate info, including about people, so double-check its responses. your privacy
            </p>
            </div>
        </div>
   )
}