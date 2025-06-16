// eslint-disable-next-line no-unused-vars
import React from "react";
import TherapistForm from "../components/FindMyTherapist/FindMyTherapist";
import { useNavigate } from "react-router-dom";

const TherapistFormPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    navigate("/findmytherapist/results", { state: { formData } });
  };

  return (
    <div className="page">
      <div className="find-my-therapist-container">
        <TherapistForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default TherapistFormPage;
