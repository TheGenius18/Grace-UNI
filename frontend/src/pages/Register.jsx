// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Register/register.css";
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordcheck: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("Updated formData:", formData);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [succesMessage, setSccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success!", response.data);
      setSccessMessage("Register Successfull");
      window.location.href = "/login";
    } catch (error) {
      console.log("Error during registrations", error.response?.data);
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
  // {error && <p style={{ color: "red" }}>{error}</p>}
  // {succesMessage && <p style={{ color: "green" }}>{succesMessage}</p>}
  return (
    <div className="register-container">
      <div className="container">
        <div className="title">Registration</div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <p style={{ color: "green" }}>{succesMessage}</p>
        )}
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  name="passwordcheck"
                  value={formData.passwordcheck}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
