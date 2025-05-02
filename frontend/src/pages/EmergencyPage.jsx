// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../assets/css/Emergency/Emergency.css";
import sendBtn from "../assets/images/send.svg";
import userIc from "../assets/images/user-icon.png";
import gptImgLogo from "/src/assets/images/4.png";
function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header className="emer-header">
        <div className="logo">
          <a href="/Home">
            <img src="src\assets\images\5.png" alt="logo" />
          </a>
        </div>
        <nav>
          <div className="name">Emergency</div>
        </nav>
        <div className="btn">
          <a href="/Login">
            <button>Create Account</button>
          </a>
        </div>
      </header>
      <hr />
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="top">
          <div className="logo2"></div>
          <i className="bx bx-menu" id="btn1" onClick={toggleSidebar}></i>
          <i className="bx bx-arrow-back" id="btn2" style={{ opacity: 0 }}></i>
        </div>
        <div className="user"></div>
        <ul>
          <hr />
          <li>
            <a href="/Home">
              <i className="bx bxs-home"></i>
              <span className="nav-item">Home</span>
            </a>
            <span className="tooltip">Home</span>
          </li>
          <hr />
          <div id="other-s" style={{ fontSize: "12px" }}>
            Other Services
          </div>
          <li>
            <a href="/Diagnosis">
              <i className="bx bxs-face"></i>
              <span className="nav-item">Diagnosis</span>
            </a>
            <span className="tooltip">Diagnosis</span>
          </li>
          <li>
            <a href="/#">
              <i className="bx bxs-band-aid"></i>
              <span className="nav-item">Emotional</span>
            </a>
            <span className="tooltip">Emotional</span>
          </li>
          <li>
            <a href="/#">
              <i className="bx bxs-tired"></i>
              <span className="nav-item">Training</span>
            </a>
            <span className="tooltip">Training</span>
          </li>
          <li>
            <a href="/#">
              <i className="bx bxs-briefcase-alt-2"></i>
              <span className="nav-item">Doctor</span>
            </a>
            <span className="tooltip">Doctor</span>
          </li>

          <div id="other-s" style={{ fontSize: "12px" }}>
            FOR HELP
          </div>

          <li>
            <hr />
            <a href="/#">
              <i className="bx bxs-contact"></i>
              <span className="nav-item">contact us</span>
            </a>
            <span className="tooltip">contact us</span>
          </li>
          <li>
            <a href="/#">
              <i className="bx bxs-help-circle"></i>
              <span className="nav-item">help</span>
            </a>
            <span className="tooltip">help</span>
          </li>

          <hr />
        </ul>
      </div>
      <div className="main-content">
        <div className="all-chats">
          <div className="chat">
            <img className="chatimg" src={userIc} alt="" />
            <p className="txt">Hello, Can you help me please ?</p>
          </div>
          <div className="chat bot">
            <img className="chatimg-grace" src={gptImgLogo} alt="" />
            <p className="txt">
              Hello, its Grace-Emergency, How can i help you ?
            </p>
          </div>
        </div>
        <div className="chat-talk">
          <div className="input-emer">
            <input type="text" placeholder="Send a Message" />{" "}
            <button className="send">
              <img src={sendBtn} alt="Send"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
