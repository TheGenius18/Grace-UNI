import React, { useState ,useEffect, useContext} from "react";
import axios from "axios";
import Navbar from './ConnectionNavbar/ConnectionNavbar';
import VideoSection from './Videocall/Videocall';
import ChatSection from './TextingComponent/TextingComponent';
import './Connection.css';

export default function Connection() {
  return (
    <div className="connection-container">
      <Navbar />
      <div className="connection-main-content">
        <VideoSection />
        <ChatSection />
      </div>
    </div>
  );
}