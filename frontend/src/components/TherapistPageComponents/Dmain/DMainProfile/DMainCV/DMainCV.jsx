import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DMainCV.css";

function DMainCV() {
  const navigate = useNavigate();

  const [therapistData, setTherapistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    async function fetchAll() {
      try {
        const token = localStorage.getItem("access_token");
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/profile/view/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("API RESPONSE:", data);

        if (!data?.profile) {
          throw new Error("Profile data is missing in API response.");
        }
        const prof = data.profile;
        setTherapistData(prof);
        if (prof.cv) {
          setCvUrl(`http://127.0.0.1:8000${prof.cv}`);
        }

        
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <div className="container loading">Loading profile...</div>;
  if (error) return <div className="container error">Error: {error}</div>;
  if (!therapistData) return <div className="container">No profile data available</div>;

  const {
    user = {},
    education = {},
    experiences = {},
    previous_positions = [],
    specializations = {},
    other_specializations = [],
    languages = {},
    other_languages = [],
    additional_degrees = [],
    rank,
    availability,
    motto,
    phone,
  } = therapistData;

  const mainExperience = experiences.main_experience || {};
  const mainSpecialization = specializations.main_specialization || {};
  const mainLanguage = languages.main_language || {};

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "";

  const getDegreeName = (degree) =>
    ({
      bachelors: "Bachelor's",
      masters: "Master's",
      phd: "PhD",
      md: "MD",
      other: "Other",
    }[degree] || degree);

  return (
    <div className="container">
      <div className="cv-box">
        <div className="profile-header">
          <h1>{user.first_name || user.username || "Therapist"}'s Profile</h1>
          <button onClick={() => navigate("/fillyourinfo")} className="edit-profile-button">
            Edit My Profile
          </button>
        </div>

        {/* Personal Info */}
        <div className="cv-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div>
              <p><strong>Email:</strong> {user.email || "—"}</p>
              <p><strong>Phone:</strong> {phone || "—"}</p>
              <p><strong>Age:</strong> {therapistData.age ?? "—"}</p>
            </div>
            <div>
              <p><strong>Gender:</strong> {therapistData.gender ? therapistData.gender[0].toUpperCase() + therapistData.gender.slice(1) : "—"}</p>
              <p><strong>Marital:</strong> {therapistData.marital_status ? therapistData.marital_status[0].toUpperCase() + therapistData.marital_status.slice(1) : "—"}</p> 
            </div>
          </div>
          {motto && <div className="motto"><p><strong>Motto:</strong> "{motto}"</p></div>}
        </div>

        {/* Professional Details */}
        <div className="cv-section">
          <h2>Professional Details</h2>
          <div className="info-grid">
            <div>
              <p><strong>Rank:</strong> {rank}/10</p>
              <p><strong>Availability:</strong> {availability?.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") || "—"}</p>
            </div>
            <div>
              <p><strong>Experience:</strong> {mainExperience.years ?? therapistData.experience_years ?? 0} years</p>
              <p><strong>Status:</strong> {user.visotype ? user.visotype[0].toUpperCase() + user.visotype.slice(1) : "—"}</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="cv-section">
          <h2>Education</h2>
          {education.degree && (
            <div className="education-item">
              <p>
                <strong>{getDegreeName(education.degree)} in {education.field || "—"}</strong> 
                <span className="institution"> - {education.institution || "—"} ({education.year || "—"})</span>
                {education.verified && <span className="verified-badge">Verified</span>}
              </p>
            </div>
          )}
          {additional_degrees.map((deg, i) => (
            <div key={i} className="education-item">
              <p>
                <strong>{getDegreeName(deg.degree)} in {deg.field_of_study || "—"}</strong>
                <span className="institution"> - {deg.institution || "—"} ({deg.year_completed || "—"})</span>
                {deg.is_verified && <span className="verified-badge">Verified</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="cv-section">
          <h2>Experience</h2>
          {mainExperience.position && (
            <div className="experience-item">
              <p><strong>{mainExperience.position}</strong> - {mainExperience.organization || "—"} <span className="duration">({formatDate(mainExperience.start_date)}{mainExperience.current ? " - Present" : mainExperience.end_date ? ` - ${formatDate(mainExperience.end_date)}` : ""})</span></p>
              {mainExperience.description && <p className="description">{mainExperience.description}</p>}
            </div>
          )}
          {previous_positions.map((exp, i) => (
            <div key={i} className="experience-item">
              <p><strong>{exp.position || "—"}</strong> - {exp.organization || "—"} <span className="duration">({formatDate(exp.start_date)}{exp.current ? " - Present" : exp.end_date ? ` - ${formatDate(exp.end_date)}` : ""})</span></p>
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div className="cv-section">
          <h2>Specializations</h2>
          {mainSpecialization.name && <div className="specialization-item"><p><strong>{mainSpecialization.name}</strong>{mainSpecialization.description && ` - ${mainSpecialization.description}`}</p></div>}
          {other_specializations.map((sp, i) => <div key={i} className="specialization-item"><p><strong>{sp.name || "—"}</strong>{sp.description && ` - ${sp.description}`}</p></div>)}
        </div>

        {/* Languages */}
        <div className="cv-section">
          <h2>Languages</h2>
          <div className="languages-grid">
            {mainLanguage.name && <div className="language-item"><p><strong>{mainLanguage.name}</strong> ({mainLanguage.proficiency || "—"})</p></div>}
            {other_languages.map((lg, i) => <div key={i} className="language-item"><p><strong>{lg.name || "—"}</strong> ({lg.proficiency || "—"})</p></div>)}
          </div>
        </div>

        {/* CV */}
        <div className="cv-section">
          <h2>Professional Documents</h2>
          {cvUrl ? <button onClick={() => window.open(cvUrl, "_blank")} className="download-cv-button">Download CV</button> : <p>No CV uploaded</p>}
        </div>
      </div>
    </div>
  );
}

export default DMainCV;
