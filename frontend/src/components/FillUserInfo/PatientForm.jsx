// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/context";
import "../FillUserInfo/FillUserInfo.css";

const PatientForm = () => {
  const { setFillUserInfo } = useContext(Context);

  const [formData, setFormData] = useState({
    age: 30,
    gender: "male",
    sibling_order: "youngest",
    marital_status: "single",
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
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/view/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      setFillUserInfo(true);

      setTimeout(() => {
        window.location.href = "/patient";
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
        <div className="fill-info-form-title">Fill your information</div>
        <p className="fill-info-form-desc">
          One step before you continue, fill your information for better
          performance.
        </p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
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
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
