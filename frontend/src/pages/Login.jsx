// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Login/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("Updated formData:", formData);
  };
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succesMessage, setSccessMessage] = useState(null);

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user/", {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    
    try {
      // Step 1: Login to get tokens
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Success!", response.data);
      setSccessMessage("Login Successful");
      
      // Store tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      const accessToken = response.data.tokens.access;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      
      // Step 2: Fetch user info to get user_type
      const userInfo = await fetchUserInfo(accessToken);
      console.log("User info:", userInfo);
      
      // Step 3: Redirect based on user_type
      if (userInfo.user_type === "therapist") {
        window.location.href = "/therapist";
      } else if (userInfo.user_type === "patient") {
        window.location.href = "/patient";
      } else {
        // Default redirect if user_type is not recognized
        window.location.href = "/";
      }
      
    } catch (error) {
      console.log("Error during Login", error.response?.data);
      if (error.response && error.response.data) {
        // Handle field-specific errors
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const firstErrorKey = Object.keys(errorData)[0];
          const firstErrorMessage = errorData[firstErrorKey];
          if (Array.isArray(firstErrorMessage)) {
            setError(firstErrorMessage[0]);
          } else {
            setError(firstErrorMessage);
          }
        } else {
          setError(errorData.toString());
        }
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-main">
        <form onSubmit={handleSubmit}>
          <div className="login-page-title">Login</div>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <p style={{ color: "green" }}>{succesMessage}</p>
          )}
          <div className="login-page-input-box login-page-underline">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="login-page-underline"></div>
          </div>
          <div className="login-page-input-box">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="login-page-underline"></div>
          </div>

          <div className="login-page-input-box login-page-button">
            <input 
              type="submit" 
              name="" 
              value={isLoading ? "LOGGING IN..." : "LOGIN"} 
              disabled={isLoading}
            />
          </div>
        </form>
        <div className="login-page-option">
          Don't have an account?{" "}
          <a className="login-page-option-now" href="/register" style={{ textDecoration: "none" }}>
            Register Now!
          </a>
        </div>
        <div className="login-page-social-login">
          <div className="login-page-twitter">
            <a href="#">
              <i className="fab fa-twitter"></i>Sign in With Twitter
            </a>
          </div>
          <div className="login-page-facebook">
            <a href="#">
              <i className="fab fa-facebook-f"></i>Sign in With Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}