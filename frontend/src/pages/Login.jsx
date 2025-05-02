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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
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
      setSccessMessage("Login Successfull");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("access_token", response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      window.location.href = "/patient";
    } catch (error) {
      console.log("Error during Login", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
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
            <a href="home">
              <input type="submit" name="" value="LOGIN" />
            </a>
          </div>
        </form>
        <div className="login-page-option">
          dont have an account ?{" "}
          <a className="login-page-option-now" href="/register" style={{ textDecoration: "none" }}>
            Register Now !
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