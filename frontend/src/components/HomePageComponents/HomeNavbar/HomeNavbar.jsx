import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { myHomenav } from "../../../assets/js/homepage-nav";

import "./HomeNavbar.css"

export default function Home() {
    React.useEffect(() => {
        myHomenav();
    }, []);


   const [username, setUsername] = useState("");
   const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
<<<<<<< HEAD
        const token = localStorage.getItem("accessToken");
=======
        const token = localStorage.getItem("access_token");
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
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
    checkLoggedInUser(); // Call the function here
  }, []); // Add an empty dependency array to run only once

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
<div className="nav-container">
        <div className="nav-logo">
          <img
            src="src\assets\images\2.png"
            alt="logo"
            style={{ cursor: "pointer" }}
          />
        </div>
        <i className="fa-solid fa-bars open-menu"></i>
        <div className="nav-links-container">
          <i className="fa solid fa-xmark close-menu"></i>
          <ul className="nav-links">
            <li className="nav-link-item">
              <a href="#">
                Home
              </a>
            </li>
            <li className="nav-link-item dropdown-menu-branch">
              <a href="#" data-toggle="dropdown-menu">
                Services
                <i className="fa-solid fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-menu-item">
                  <a href="/Diagnosis">Diagnosis</a>
                </li>
                <li className="dropdown-menu-item">
                  <a href="/therapist">Doctor</a>
                </li>
                <li className="dropdown-menu-item">
                  <a href="#">Emotional discharge</a>
                </li>
              </ul>
            </li>

            <li className="nav-link-item">
              <a href="#">Contact</a>
            </li>
            <li className="nav-link-item">
              <a href="/Emergency">Emergency</a>
            </li>
            {isLoggedIn ? (
              <>
                {/* <h2>Hi, {username}. Thanks for logging in!</h2> */}
                <li className="nav-link-item">
                  <a href="#" id="signin" onClick={handleLogout}>
                    SignOUT
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-link-item">
                <a href="/login" id="signin">
                  login/signup
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      );
    }