import React, { useState, useEffect } from "react";
import "./FindMyTherapist.css";
import { useNavigate } from "react-router-dom";

const TherapistForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: "",
    ageRange: "",
    region: "",
    maritalStatus: "",
    specialization: "",
    languages: [],
    therapyType: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLogoActive, setIsLogoActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLogoActive(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      setIsLogoActive(true);
      const timer = setTimeout(() => setIsLogoActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.gender)
        newErrors.gender = "Please select gender preference";
      if (!formData.ageRange)
        newErrors.ageRange = "Please select age preference";
    }
    if (step === 2) {
      if (!formData.region) newErrors.region = "Please select a region";
      if (!formData.specialization)
        newErrors.specialization = "Please select a specialization";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      const currentValues = prev[name] || [];
      return {
        ...prev,
        [name]: checked
          ? [...currentValues, value]
          : currentValues.filter((item) => item !== value),
      };
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/therapist-results", { state: { formData } });
        setIsSubmitting(false);
      }, 1000); 
    }
  };

  const syrianCities = [
    "Damascus",
    "Aleppo",
    "Homs",
    "Latakia",
    "Hama",
    "Tartus",
    "Deir ez-Zor",
    "Al-Hasakah",
    "Raqqa",
    "Daraa",
    "Idlib",
    "Al-Qamishli",
    "Al-Suwayda",
  ];

  return (
    <div className="page">
      <div className="find-my-therapist-container">
        <div className="find-my-therapist-header">
          <h2 className="find-my-therapist-title">Find Your Therapist</h2>
          <p className="find-my-therapist-subtitle">
            {currentStep === 1 && "Tell us about your preferences"}
            {currentStep === 2 && "Therapist specialization details"}
            {currentStep === 3 && "Final preferences"}
          </p>

          <div className="find-my-therapist-progress-bar">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`find-my-therapist-progress-step 
                  ${currentStep >= step ? "find-my-therapist-active" : ""} 
                  ${currentStep === step ? "find-my-therapist-current" : ""}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="find-my-therapist-form">
          {currentStep === 1 && (
            <div className="find-my-therapist-form-step find-my-therapist-fade-in">
              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">
                  Therapist Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`find-my-therapist-input ${
                    errors.gender ? "find-my-therapist-input-error" : ""
                  }`}
                >
                  <option value="">Select preferred gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="no-preference">No preference</option>
                </select>
                {errors.gender && (
                  <span className="find-my-therapist-error-message">
                    {errors.gender}
                  </span>
                )}
              </div>

              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">
                  Therapist Age Range
                </label>
                <select
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  className={`find-my-therapist-input ${
                    errors.ageRange ? "find-my-therapist-input-error" : ""
                  }`}
                >
                  <option value="">Select preferred age range</option>
                  <option value="25-35">Young (25-35 years)</option>
                  <option value="36-50">Middle-aged (36-50 years)</option>
                  <option value="51+">Experienced (51+ years)</option>
                  <option value="no-preference">No preference</option>
                </select>
                {errors.ageRange && (
                  <span className="find-my-therapist-error-message">
                    {errors.ageRange}
                  </span>
                )}
              </div>

              <div className="find-my-therapist-form-actions">
                <button
                  type="button"
                  onClick={handleNext}
                  className="find-my-therapist-next-btn"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="find-my-therapist-form-step find-my-therapist-fade-in">
              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={`find-my-therapist-input ${
                    errors.region ? "find-my-therapist-input-error" : ""
                  }`}
                >
                  <option value="">Select your region</option>
                  {syrianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className="find-my-therapist-error-message">
                    {errors.region}
                  </span>
                )}
              </div>

              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`find-my-therapist-input ${
                    errors.specialization ? "find-my-therapist-input-error" : ""
                  }`}
                >
                  <option value="">Select specialization</option>
                  <option value="family">Family Therapy</option>
                  <option value="women">Women Issues</option>
                  <option value="child">Child & Adolescent</option>
                  <option value="anxiety">Depression</option>
                </select>
                {errors.specialization && (
                  <span className="find-my-therapist-error-message">
                    {errors.specialization}
                  </span>
                )}
              </div>

              <div className="find-my-therapist-form-actions">
                <button
                  type="button"
                  onClick={handleBack}
                  className="find-my-therapist-back-btn"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="find-my-therapist-next-btn"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="find-my-therapist-form-step find-my-therapist-fade-in">
              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">
                  Marital Status Preference
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="find-my-therapist-input"
                >
                  <option value="">Select preferred marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="no-preference">No preference</option>
                </select>
              </div>

              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">Languages</label>
                <div className="find-my-therapist-checkbox-group">
                  {["Arabic", "English"].map((lang) => (
                    <label
                      key={lang}
                      className="find-my-therapist-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        name="languages"
                        value={lang.toLowerCase()}
                        checked={formData.languages.includes(
                          lang.toLowerCase()
                        )}
                        onChange={handleCheckboxChange}
                        className="find-my-therapist-checkbox"
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>

              <div className="find-my-therapist-form-group">
                <label className="find-my-therapist-label">Therapy Type</label>
                <select
                  name="therapyType"
                  value={formData.therapyType}
                  onChange={handleChange}
                  className="find-my-therapist-input"
                >
                  <option value="">Select preferred therapy type</option>
                  <option value="cbt">
                    Cognitive Behavioral Therapy (CBT)
                  </option>
                  <option value="psychodynamic">Psychodynamic Therapy</option>
                  <option value="no-preference">No preference</option>
                </select>
              </div>

              <div className="find-my-therapist-form-actions">
                <button
                  type="button"
                  onClick={handleBack}
                  className="find-my-therapist-back-btn"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="find-my-therapist-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Finding Therapists...</>
                  ) : (
                    "Find My Therapist"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TherapistForm;
