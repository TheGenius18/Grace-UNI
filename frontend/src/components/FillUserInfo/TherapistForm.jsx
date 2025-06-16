// src/components/forms/TherapistForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/context";
import "../FillUserInfo/FillUserInfo.css";

const TherapistForm = () => {
  const { setFillUserInfo } = useContext(Context);

  const [formData, setFormData] = useState({
    age: 30,
    gender: "male",
    region: "",
    marital_status: "single",
    education: "",
    experience: "",
    specialization: "",
    language: "",
    cv: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      cv: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("accessToken");
      const payload = new FormData();

      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await axios.post("http://127.0.0.1:8000/api/profile/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Profile updated successfully!");
      setFillUserInfo(true);

      setTimeout(() => {
        window.location.href = "/therapist";
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          JSON.stringify(error.response?.data || {}) ||
          "Network error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <form className="fill-info-form" onSubmit={handleSubmit}>
        <div className="fill-info-form-title">
          Fill your therapist information
        </div>
        <p className="fill-info-form-desc">
          Please provide your professional information to complete your profile.
        </p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}

        {[
          { name: "age", type: "number", label: "Age", min: 18, max: 90 },
          { name: "region", type: "text", label: "Region" },
          { name: "education", type: "text", label: "Education" },
          {
            name: "experience",
            type: "number",
            label: "Years of Experience",
            min: 0,
          },
          { name: "specialization", type: "text", label: "Specialization" },
          { name: "language", type: "text", label: "Languages Spoken" },
        ].map(({ name, label, ...rest }) => (
          <div className="fill-info-form-group" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              {...rest}
              required
            />
          </div>
        ))}

        <div className="fill-info-form-group">
          <label>Marital Status</label>
          <div className="fill-info-radio-group">
            {["single", "married", "divorced", "widowed"].map((status) => (
              <label key={status}>
                <input
                  type="radio"
                  name="marital_status"
                  value={status}
                  checked={formData.marital_status === status}
                  onChange={handleChange}
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
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
          </select>
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
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TherapistForm;
