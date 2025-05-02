import React, { useState, useContext, useEffect } from 'react';
import "./FillUserInfo.css"
import axios from "axios";
import {Context} from "../../context/context"

const PatientInfoForm = () => {

  const [UserType, setUserType] = useState("");
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
          setUserType(response.data.user_type);
          console.log(response.data.user_type);
          } else {
          setLoggedIn(false);
          setUserType("");
          }
      } catch {
          setLoggedIn(false);
          setUserType("");
      }
      };
      checkLoggedInUser();
  }, []); 

  
  const [TerapistformData, setTherapistFormData] = useState({
      age: 30,
      gender: 'male',
      region: '',
      marital_status: 'single',
      education: '',
      experience: '',
      specialization: '',
      language: '',
      cv: null
  });

  const { setFillUserInfo } = useContext(Context);
    
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male',
    sibling_order: 'youngest',
    marital_status: 'single',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if(UserType == "patient"){window.location.href = '/patient';}
    if(UserType == "therapist"){window.location.href = '/therapist';}
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(UserType=="therapist"){formData==TerapistformData}
    console.log(formData);
    if (isLoading) return;
    console.log(formData);
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    console.log(localStorage.getItem('accessToken'));
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Success!", response.data);
      setSuccessMessage("Profile updated successfully!");
      setFillUserInfo(true);
      
      
      setTimeout(() => {
        window.location.href = '/'+UserType;
        setFillUserInfo(true);
        setFillUserInfo(false);
      }, 1500);
      
    } catch (error) {
        console.error("Full error:", error);
        
        if (error.response) {
          // Server responded with error status
          if (error.response.data) {
            // Show the actual error message from backend
            setError(error.response.data.error || 
                    JSON.stringify(error.response.data));
          } else {
            setError(`Server error: ${error.response.status}`);
          }
        } else {
          setError("Network error - could not connect to server");
        }
      }
    finally {
      setIsLoading(false);
    //   setFillUserInfo(true);
    //   setFillUserInfo(false);
    //   window.location.href = "/login";
    }
  };


  const handleFileChange = (e) => {
    setTherapistFormData(prev => ({
        ...prev,
        cv: e.target.files[0]
    }));
};

  if (UserType === "therapist") {
    return (
        <form className="fill-info-form" onSubmit={handleSubmit}>
            <div className="fill-info-form-title">Fill your therapist information</div>
            <div>
                <p className="fill-info-form-desc">
                    Please provide your professional information to complete your profile
                </p>
            </div>
            
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <div className="fill-info-form-group">
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={TerapistformData.age}
                    onChange={handleChange}
                    min="18"
                    max="90"
                    required
                />
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={TerapistformData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="region">Region</label>
                <input
                    type="text"
                    id="region"
                    name="region"
                    value={TerapistformData.region}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fill-info-form-group">
                <label>Marital Status</label>
                <div className="fill-info-radio-group">
                    <label>
                        <input
                            type="radio"
                            name="marital_status"
                            value="single"
                            checked={TerapistformData.marital_status === 'single'}
                            onChange={handleChange}
                            required
                        />
                        Single
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="marital_status"
                            value="married"
                            checked={TerapistformData.marital_status === 'married'}
                            onChange={handleChange}
                        />
                        Married
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="marital_status"
                            value="divorced"
                            checked={TerapistformData.marital_status === 'divorced'}
                            onChange={handleChange}
                        />
                        Divorced
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="marital_status"
                            value="widowed"
                            checked={TerapistformData.marital_status === 'widowed'}
                            onChange={handleChange}
                        />
                        Widowed
                    </label>
                </div>
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="education">Education</label>
                <input
                    type="text"
                    id="education"
                    name="education"
                    value={TerapistformData.education}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={TerapistformData.experience}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="specialization">Specialization</label>
                <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={TerapistformData.specialization}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="language">Languages Spoken</label>
                <input
                    type="text"
                    id="language"
                    name="language"
                    value={TerapistformData.language}
                    onChange={handleChange}
                    required
                    placeholder="Separate languages with commas"
                />
            </div>

            <div className="fill-info-form-group">
                <label htmlFor="cv">Upload CV</label>
                <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                />
            </div>

            <button 
                type="submit" 
                className="fill-info-submit-btn"
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}

  return (
    <form className="fill-info-form" onSubmit={handleSubmit}>
      <div className="fill-info-form-title">Fill your information</div>
      <div>
        <p className="fill-info-form-desc">
          One step before you continue, fill your information for better performance
        </p>
      </div>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="fill-info-form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="18"
          max="90"
          required
        />
      </div>

      <div className="fill-info-form-group">
        <label>Marital Status</label>
        <div className="fill-info-radio-group">
          <label>
            <input
              type="radio"
              name="marital_status"
              value="single"
              checked={formData.marital_status === 'single'}
              onChange={handleChange}
              required
            />
            Single
          </label>
          <label>
            <input
              type="radio"
              name="marital_status"
              value="married"
              checked={formData.marital_status === 'married'}
              onChange={handleChange}
            />
            Married
          </label>
          <label>
            <input
              type="radio"
              name="marital_status"
              value="divorced"
              checked={formData.marital_status === 'divorced'}
              onChange={handleChange}
            />
            Divorced
          </label>
          <label>
            <input
              type="radio"
              name="marital_status"
              value="widowed"
              checked={formData.marital_status === 'widowed'}
              onChange={handleChange}
            />
            Widowed
          </label>
        </div>
      </div>

      <div className="fill-info-form-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* <option value="other">Other</option> */}
          {/* <option value="prefer-not-to-say">Prefer not to say</option> */}
        </select>
      </div>

      <div className="fill-info-form-group">
        <label htmlFor="sibling_order">Order Among Siblings</label>
        <select
          id="sibling_order"
          name="sibling_order"
          value={formData.sibling_order}
          onChange={handleChange}
          required
        >
          <option value="">Select Position</option>
          <option value="only">Only child</option>
          <option value="oldest">Oldest</option>
          <option value="middle">Middle</option>
          <option value="youngest">Youngest</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="fill-info-submit-btn"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default PatientInfoForm;