import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
// import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmergencyPage from "./pages/EmergencyPage";
import Diagnosis from "./pages/Diagnosis";
import Therapist from "./pages/TherapistPage";
import Connection from "./pages/ConnectionPage";
import ArticlesPage from "./pages/ArticlesPage";
import FindMyTherapist from "./components/FindMyTherapist/FindMyTherapist";
import Patient from "./components/PatientPageComponents/PatientPage";


// import Diary from "./pages/diary";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route path="Emergency" element={<EmergencyPage />} />}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="diagnosis" element={<Diagnosis />} />
        <Route path="therapist" element={<Therapist />} /> 
        <Route path="connection" element={<Connection />} />
        <Route path="articles" element={<ArticlesPage />} />  
        <Route path="findmytherapist" element={<FindMyTherapist />} />
        <Route path="patient" element={<Patient />} />

        {/* <Route path="diary" element={<Diary />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
