import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { myHomePage } from "../assets/js/homepage-nav";
export default function Home() {
  React.useEffect(() => {
    myHomePage();
  }, []);
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
  // useEffect(() => {
  //   const openNav = document.querySelector(".open-menu");
  //   const closeNav = document.querySelector(".close-menu");
  //   const navMenu = document.querySelector(".nav-links-container");
  //   const mediaSize = 992;
  //   openNav.addEventListener("click", toggleMenu);
  //   closeNav.addEventListener("click", toggleMenu);

  //   function toggleMenu() {
  //     navMenu.classList.toggle("open");
  //   }

  //   navMenu.addEventListener("click", (event) => {
  //     if (
  //       event.target.hasAttribute("data-tiggle") &&
  //       window.innerWidth <= mediaSize
  //     ) {
  //       event.preventDefault();
  //       const dropdownMenuBranch = event.target.parentElement;
  //       if (dropdownMenuBranch.classList.contains("active")) {
  //         collapseDropdownMenu();
  //       } else {
  //         if (navMenu.querySelector(".dropdown-menu-branch.active")) {
  //           collapseDropdownMenu();
  //         }
  //       }
  //       dropdownMenuBranch.classList.add("active");
  //       const dropdownMenu = dropdownMenuBranch.querySelector(".dropdown-menu");
  //       dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
  //     }
  //   });

  //   function collapseDropdownMenu() {
  //     navMenu
  //       .querySelector(".dropdown-menu-branch.active .dropdown-menu")
  //       .removeAttribute("style");
  //     navMenu
  //       .querySelector(".dropdown-menu-branch.active ")
  //       .classList.remove("active");
  //   }
  // }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <div className="nav-container">
        <div className="nav-logo">
          <img
            src="src\assets\images\5.png"
            alt="logo"
            style={{ cursor: "pointer" }}
          />
        </div>
        <i className="fa-solid fa-bars open-menu"></i>
        <div className="nav-links-container">
          <i className="fa solid fa-xmark close-menu"></i>
          <ul className="nav-links">
            <li className="nav-link-item">
              <a href="#" style={{ color: "#c0a9bd" }}>
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
                  <a href="#">Doctor Review</a>
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
          <a href="/login" id="button-of-main-content">
            Try it !
          </a>
        </div>
        <div className="main-container-right">
          <div className="main-container-image">
            <img
              src="src/assets/images/9.png"
              alt="Grace-PIC"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      <div className="services-container">
        <h2>Our Services</h2>
        <h1>Our Services & Features</h1>
        <div className="row">
          <div className="box">
            <img src="src/assets/images/3.png" alt="banner logo" />
            <h3>Diangnosis</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              sunt.
            </p>
            <button className="btn">See More</button>
          </div>
          <div className="box" id="special-box">
            <img src="src/assets/images/3.png" alt="banner logo" />
            <h3>Emotional discharge</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              sunt.
            </p>
            <button className="btn">See More</button>
          </div>
          <div className="box">
            <img src="src/assets/images/3.png" alt="banner logo" />
            <h3>Doctor Review</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              sunt.
            </p>
            <button className="btn">SEE MORE</button>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <div className="item">
          <div className="contact">
            <div className="first-text">Get in touch </div>
            <img src="src/assets/images/1.png" alt="image" className="image" />
            <div className="social-links">
              <span className="secnd-text">Connect with us:</span>
              <ul className="social-media">
                <li>
                  <a href="#">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="submit-form">
            <h4 className="third-text text">Contact Us</h4>
            <form action="#" className="form-contact ">
              <div className="input-box">
                <input type="text" className="input" required />
                <label htmlFor="">Name</label>
              </div>
              <div className="input-box">
                <input type="email" className="input" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-box">
                <input type="tel" className="input" />
                <label htmlFor="">Phone number</label>
              </div>
              <div className="input-box">
                <textarea
                  name=""
                  id="message"
                  cols={30}
                  rows={10}
                  className="input"
                  required
                ></textarea>
                <label htmlFor="">Message</label>
              </div>
              <input type="submit" value="Submit" className="contact-btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
