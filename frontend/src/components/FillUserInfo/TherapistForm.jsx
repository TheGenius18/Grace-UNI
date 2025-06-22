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
    education_degree: "",
    education_institution: "",
    education_field: "",
    education_year: new Date().getFullYear(),
    experience_years: 1,
    experience_position: "",
    experience_organization: "",
    experience_start_date: "",
    experience_end_date: "",
    experience_current: false,
    experience_description: "",
    specialization_name: "",
    specialization_description: "",
    language_name: "",
    language_proficiency: "intermediate",
    rank: 5,
    availability: "flexible",
    motto: "",
    cv: null
  });

  const [additionalDegrees, setAdditionalDegrees] = useState([]);
  const [previousPositions, setPreviousPositions] = useState([]);
  const [otherSpecializations, setOtherSpecializations] = useState([]);
  const [otherLanguages, setOtherLanguages] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cv: e.target.files[0]
    }));
  };

  const handleAddDegree = () => {
    if (formData.education_degree && formData.education_institution) {
      const newDegree = {
        degree: formData.education_degree,
        institution: formData.education_institution,
        field: formData.education_field,
        year: formData.education_year,
        is_verified: false
      };
      setAdditionalDegrees([...additionalDegrees, newDegree]);
      setFormData(prev => ({
        ...prev,
        education_degree: "",
        education_institution: "",
        education_field: "",
        education_year: new Date().getFullYear()
      }));
    }
  };

  const handleAddPosition = () => {
    if (formData.experience_position && formData.experience_organization) {
      const newPosition = {
        position: formData.experience_position,
        organization: formData.experience_organization,
        start_date: formData.experience_start_date,
        end_date: formData.experience_end_date,
        current: formData.experience_current,
        description: formData.experience_description
      };
      setPreviousPositions([...previousPositions, newPosition]);
      setFormData(prev => ({
        ...prev,
        experience_position: "",
        experience_organization: "",
        experience_start_date: "",
        experience_end_date: "",
        experience_current: false,
        experience_description: ""
      }));
    }
  };

  const handleAddSpecialization = () => {
    if (formData.specialization_name) {
      const newSpecialization = {
        name: formData.specialization_name,
        description: formData.specialization_description
      };
      setOtherSpecializations([...otherSpecializations, newSpecialization]);
      setFormData(prev => ({
        ...prev,
        specialization_name: "",
        specialization_description: ""
      }));
    }
  };

  const handleAddLanguage = () => {
    if (formData.language_name) {
      const newLanguage = {
        name: formData.language_name,
        proficiency: formData.language_proficiency
      };
      setOtherLanguages([...otherLanguages, newLanguage]);
      setFormData(prev => ({
        ...prev,
        language_name: "",
        language_proficiency: "intermediate"
      }));
    }
  };

  const handleRemoveItem = (type, index) => {
    switch (type) {
      case 'degree':
        setAdditionalDegrees(additionalDegrees.filter((_, i) => i !== index));
        break;
      case 'position':
        setPreviousPositions(previousPositions.filter((_, i) => i !== index));
        break;
      case 'specialization':
        setOtherSpecializations(otherSpecializations.filter((_, i) => i !== index));
        break;
      case 'language':
        setOtherLanguages(otherLanguages.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const formPayload = new FormData();

      // Append all simple fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'cv' && value instanceof File) {
            formPayload.append(key, value, value.name);
          } else if (typeof value === 'boolean') {
            formPayload.append(key, value ? 'true' : 'false');
          } else {
            formPayload.append(key, value);
          }
        }
      });

      // Append array fields as JSON strings
      formPayload.append('additional_degrees', JSON.stringify(additionalDegrees));
      formPayload.append('previous_positions', JSON.stringify(previousPositions));
      formPayload.append('other_specializations', JSON.stringify(otherSpecializations));
      formPayload.append('other_languages', JSON.stringify(otherLanguages));

      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/view/",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      localStorage.setItem("therapistProfile",formPayload)
      setSuccessMessage("Profile saved successfully!");
      setFillUserInfo(true);
      
      setTimeout(() => {
        window.location.href = "/therapist";
      }, 1500);
    } catch (error) {
      console.error("Error saving profile:", error);
      
      let errorMessage = "Failed to save profile";
      if (error.response) {
        if (error.response.data) {
          // Handle Django validation errors
          if (typeof error.response.data === 'object') {
            errorMessage = Object.entries(error.response.data)
              .map(([field, errors]) => {
                if (Array.isArray(errors)) {
                  return `${field}: ${errors.join(', ')}`;
                }
                return `${field}: ${errors}`;
              })
              .join('\n');
          } else {
            errorMessage = error.response.data.toString();
          }
        } else {
          errorMessage = error.response.statusText;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <form className="fill-info-form" onSubmit={handleSubmit}>
        <div className="fill-info-form-title">
          Complete Your Therapist Profile
        </div>
        <p className="fill-info-form-desc">
          Please provide your professional information to complete your profile.
        </p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && (
          <div className="error-message">
            {typeof error === 'string' ? error : 'An error occurred'}
          </div>
        )}

        {/* Basic Information Section */}
        <fieldset className="form-section">
          <legend>Basic Information</legend>
          <div className="fill-info-form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min="18"
              max="90"
              value={formData.age}
              onChange={handleChange}
              required
            />
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
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <label htmlFor="region">Region</label>
            <input
              id="region"
              name="region"
              type="text"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="motto">Professional Motto</label>
            <input
              id="motto"
              name="motto"
              type="text"
              value={formData.motto}
              onChange={handleChange}
              placeholder="Your professional philosophy"
            />
          </div>
        </fieldset>

        {/* Education Section */}
        <fieldset className="form-section">
          <legend>Education</legend>
          <div className="fill-info-form-group">
            <label htmlFor="education_degree">Degree</label>
            <select
              id="education_degree"
              name="education_degree"
              value={formData.education_degree}
              onChange={handleChange}
              required
            >
              <option value="">Select Degree</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD</option>
              <option value="md">MD</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="education_institution">Institution</label>
            <input
              id="education_institution"
              name="education_institution"
              type="text"
              value={formData.education_institution}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="education_field">Field of Study</label>
            <input
              id="education_field"
              name="education_field"
              type="text"
              value={formData.education_field}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="education_year">Year Completed</label>
            <input
              id="education_year"
              name="education_year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.education_year}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="button" 
            className="add-item-btn"
            onClick={handleAddDegree}
          >
            Add Another Degree
          </button>

          {additionalDegrees.length > 0 && (
            <div className="items-list">
              <h4>Additional Degrees:</h4>
              <ul>
                {additionalDegrees.map((degree, index) => (
                  <li key={index}>
                    {degree.degree} - {degree.institution} ({degree.year})
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('degree', index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        {/* Experience Section */}
        <fieldset className="form-section">
          <legend>Professional Experience</legend>
          <div className="fill-info-form-group">
            <label htmlFor="experience_years">Total Years of Experience</label>
            <input
              id="experience_years"
              name="experience_years"
              type="number"
              min="0"
              value={formData.experience_years}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="experience_position">Current Position</label>
            <input
              id="experience_position"
              name="experience_position"
              type="text"
              value={formData.experience_position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="experience_organization">Organization</label>
            <input
              id="experience_organization"
              name="experience_organization"
              type="text"
              value={formData.experience_organization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="experience_start_date">Start Date</label>
            <input
              id="experience_start_date"
              name="experience_start_date"
              type="date"
              value={formData.experience_start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="experience_end_date">End Date (if not current)</label>
            <input
              id="experience_end_date"
              name="experience_end_date"
              type="date"
              value={formData.experience_end_date}
              onChange={handleChange}
              disabled={formData.experience_current}
            />
          </div>

          <div className="fill-info-form-group">
            <label>
              <input
                type="checkbox"
                name="experience_current"
                checked={formData.experience_current}
                onChange={handleChange}
              />
              Current Position
            </label>
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="experience_description">Description</label>
            <textarea
              id="experience_description"
              name="experience_description"
              value={formData.experience_description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button 
            type="button" 
            className="add-item-btn"
            onClick={handleAddPosition}
          >
            Add Previous Position
          </button>

          {previousPositions.length > 0 && (
            <div className="items-list">
              <h4>Previous Positions:</h4>
              <ul>
                {previousPositions.map((position, index) => (
                  <li key={index}>
                    {position.position} at {position.organization}
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('position', index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        {/* Specialization Section */}
        <fieldset className="form-section">
          <legend>Specializations</legend>
          <div className="fill-info-form-group">
            <label htmlFor="specialization_name">Primary Specialization</label>
            <input
              id="specialization_name"
              name="specialization_name"
              type="text"
              value={formData.specialization_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="specialization_description">Description</label>
            <textarea
              id="specialization_description"
              name="specialization_description"
              value={formData.specialization_description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button 
            type="button" 
            className="add-item-btn"
            onClick={handleAddSpecialization}
          >
            Add Another Specialization
          </button>

          {otherSpecializations.length > 0 && (
            <div className="items-list">
              <h4>Additional Specializations:</h4>
              <ul>
                {otherSpecializations.map((spec, index) => (
                  <li key={index}>
                    {spec.name}
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('specialization', index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        {/* Languages Section */}
        <fieldset className="form-section">
          <legend>Languages</legend>
          <div className="fill-info-form-group">
            <label htmlFor="language_name">Primary Language</label>
            <input
              id="language_name"
              name="language_name"
              type="text"
              value={formData.language_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="language_proficiency">Proficiency</label>
            <select
              id="language_proficiency"
              name="language_proficiency"
              value={formData.language_proficiency}
              onChange={handleChange}
              required
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="native">Native</option>
              <option value="fluent">Fluent</option>
            </select>
          </div>

          <button 
            type="button" 
            className="add-item-btn"
            onClick={handleAddLanguage}
          >
            Add Another Language
          </button>

          {otherLanguages.length > 0 && (
            <div className="items-list">
              <h4>Additional Languages:</h4>
              <ul>
                {otherLanguages.map((lang, index) => (
                  <li key={index}>
                    {lang.name} ({lang.proficiency})
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('language', index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        {/* Professional Details */}
        <fieldset className="form-section">
          <legend>Professional Details</legend>
          <div className="fill-info-form-group">
            <label htmlFor="rank">Professional Rank (1-10)</label>
            <input
              id="rank"
              name="rank"
              type="range"
              min="1"
              max="10"
              value={formData.rank}
              onChange={handleChange}
            />
            <span className="rank-value">{formData.rank}/10</span>
          </div>

          <div className="fill-info-form-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="flexible">Flexible</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
              <option value="weekends">Weekends Only</option>
              <option value="evenings">Evenings Only</option>
            </select>
          </div>
        </fieldset>

        {/* CV Upload */}
        <fieldset className="form-section">
          <legend>Professional Documents</legend>
          <div className="fill-info-form-group">
            <label htmlFor="cv">Upload CV (PDF or DOC)</label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="fill-info-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default TherapistForm;