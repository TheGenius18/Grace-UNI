import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeNavbar.css";

export default function Home() {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
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
                    setUserType(response.data.user_type);
                } else {
                    setLoggedIn(false);
                    setUsername("");
                    setUserType(null);
                }
            } catch (error) {
                console.error("Error checking user:", error);
                setLoggedIn(false);
                setUsername("");
                setUserType(null);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            } finally {
                setLoading(false);
            }
        };
        checkLoggedInUser();
    }, []);

    useEffect(() => {
        const openMenuBtn = document.querySelector(".open-menu");
        const closeMenuBtn = document.querySelector(".close-menu");
        const navLinksContainer = document.querySelector(".nav-links-container");

        if (openMenuBtn && closeMenuBtn && navLinksContainer) {
            const toggleMenu = () => setMenuOpen(!menuOpen);
            
            openMenuBtn.addEventListener("click", toggleMenu);
            closeMenuBtn.addEventListener("click", toggleMenu);

            return () => {
                openMenuBtn.removeEventListener("click", toggleMenu);
                closeMenuBtn.removeEventListener("click", toggleMenu);
            };
        }
    }, [menuOpen]);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token") || localStorage.getItem("refreshToken");
            const accessToken = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
            
            if (refreshToken && accessToken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                };
                await axios.post(
                    "http://127.0.0.1:8000/api/logout/",
                    { refresh: refreshToken },
                    config
                );
            }
            
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            
            setLoggedIn(false);
            setUsername("");
            setUserType(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const getMyPageUrl = () => {
        if (!isLoggedIn) return "/login";
        
        switch(userType) {
            case "patient":
                return "/patient";
            case "therapist":
                return "/therapist";
            default:
                return "/notfound";
        }
    };

    if (loading) {
        return <div className="nav-container">Loading...</div>;
    }

    return (
        <div className="nav-container">
            <div className="nav-logo">
                <img
                    src="/src/assets/images/2.png"
                    alt="logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.href = "/"}
                />
            </div>
            <i className="fa-solid fa-bars open-menu"></i>
            <div className={`nav-links-container ${menuOpen ? "active" : ""}`}>
                <i className="fa solid fa-xmark close-menu"></i>
                <ul className="nav-links">
                    <li className="nav-link-item">
                        <a href={getMyPageUrl()}>
                            My Page
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
                                <a href="/Terapists">Treatment Tools</a>
                            </li>
                            <li className="dropdown-menu-item">
                                <a href="/findmytherapist">Treatment With Therapist</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-link-item">
                        <a href="/articles">Articles</a>
                    </li>
                    <li className="nav-link-item">
                        <a href="/Emergency">Emergency</a>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-link-item">
                                <a href="#" id="signin" onClick={handleLogout}>
                                    Sign Out
                                </a>
                            </li>
                            {/* <li className="nav-link-item">
                                <span className="welcome-message">Welcome, {username}</span>
                            </li> */}
                        </>
                    ) : (
                        <li className="nav-link-item">
                            <a href="/login" id="signin">
                                Login/Signup
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}