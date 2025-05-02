import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./HomeGrace.css"

export default function Home() {


   const [username, setUsername] = useState("");
   const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            "http://127.0.0.1:8000/api/user/",
            config
          );
          setLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setLoggedIn(false);
          setUsername("");
        }
      } catch {
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser();
  }, []); 

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      if (refreshToken && accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        console.log("Sending logout request with headers:", config.headers);
        await axios.post(
          "http://127.0.0.1:8000/api/logout/",
          { refresh: refreshToken },
          config
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.log("failed", error);
    }
  };

    return (
        <div className="main-container">
        <div className="main-container-left">
          {isLoggedIn ? (
            <>
              <h3>Hi, {username}.</h3>
            </>
          ) : (
            <h3></h3>
          )}
          <h3>Grace AI</h3>
          <h1>
            If you can Change the way <br />
            you look at things,
            <br /> The Things you look at Change .
          </h1>
          <h4>ALAHMER</h4>
        </div>
        <div className="main-container-right">
          <div className="main-container-image">
            <img
              src="src/assets/images/4.png"
              alt="Grace-PIC"
              style={{ width: "120%" }}
            />
          </div>
        </div>
      </div>
      );
    }