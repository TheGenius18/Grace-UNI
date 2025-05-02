
import React, { useState } from "react";
import "./DMainCV.css";

function DMainCV() {
  const [text, setText] = useState("Target Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showCV, setShowCV] = useState(true);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const toggleCV = () => {
    setShowCV(!showCV);
  };

  return (
    <div className="container">
      {!showCV ? (
        <div className="profile-box">
          {/* {isEditing ? (
            <textarea
              value={text}
              onChange={handleTextChange}
              className="edit-textarea"
            />
          ) : (
            <p className="profile-text">{text}</p>
          )}
          <button onClick={toggleEdit} className="edit-button">
            {isEditing ? "Save" : "Edit"}
          </button> */}
        </div>
      ) : (
        <div className="cv-box">
          <h1>CV - Dr. Mohammed</h1>
          <div className="cv-section">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> Dr. Mohammed</p>
            <p><strong>Email:</strong> mohammed@example.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
          </div>
          <div className="cv-section">
            <h2>Education</h2>
            <p><strong>PhD in Computer Science</strong> - University of (2015-2020)</p>
            <p><strong>Master's in Software Engineering</strong> - Another University (2012-2014)</p>
          </div>
          <div className="cv-section">
            <h2>Experience</h2>
            <p><strong>Senior Developer</strong> - Company (2020-Present)</p>
            <p><strong>Research Assistant</strong> - University Lab (2015-2020)</p>
          </div>
        </div>
      )}

      {/* <div className="toggle-box" onClick={toggleCV}>
        {showCV ? "Show Target Profile" : "Show CV"}
      </div> */}
    </div>
  );
}

export default DMainCV;
