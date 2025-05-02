import React, { useState, useContext } from "react";
import axios from "axios";
import {Context} from "../context/context"
import "../assets/css/Register/register.css";
import FilLInfoForm from "../components/FillUserInfo/FillUserInfo"

export default function Register() {
  const {FilLUserInfo, setFillUserInfo, ItsHisFirstTime, setItsHisFirstTime } = useContext(Context)



  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordcheck: "",
    user_type: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [succesMessage, setSccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("Updated formData:", formData);
  };

  const handleUserTypeSelect = (type) => {
    setFormData({
      ...formData,
      user_type: type
    });
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

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
      setItsHisFirstTime(true);
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

  return (
    <div className="register-page-container">
      {/* {!FilLUserInfo? */}
      <div className="register-page-main">
        <div className="register-page-title">Registration</div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <p style={{ color: "green" }}>{succesMessage}</p>
        )}
        
        {currentStep === 1 ? (
          <div className="register-step">
            <h2 className="step-title">what type of user you want to be on GRACE?</h2>
            <div className="user-type-options">
              <div 
                className={`user-type-option ${formData.user_type === 'patient' ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect('patient')}
              >
                <div className="option-icon"></div>
                <h3>Patient</h3>
                <p>I'm looking for mental health support</p>
              </div>
              <div 
                className={`user-type-option ${formData.user_type === 'therapist' ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect('therapist')}
              >
                <div className="option-icon"></div>
                <h3>Therapist</h3>
                <p>I provide mental health services</p>
              </div>
            </div>
            <button 
              className="next-button" 
              onClick={nextStep}
              disabled={!formData.user_type}
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="register-page-content">
            <button className="back-button" onClick={prevStep}>
              ← Back
            </button>
            <form onSubmit={handleSubmit}>
              <div className="register-page-user-details">
                <div className="register-page-input-box">
                  <span className="register-page-details">Username</span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-page-input-box">
                  <span className="register-page-details">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="register-page-input-box">
                  <span className="register-page-details">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-page-input-box">
                  <span className="register-page-details">Confirm Password</span>
                  <input
                    type="password"
                    name="passwordcheck"
                    value={formData.passwordcheck}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-page-button">
                <input type="submit" value="Register" />
              </div>
            </form>
          </div>
        )}
      </div>
      {/* {FilLUserInfo?<FilLInfoForm/>:null} */}
    </div>
  );
}