import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
// import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmergencyPage from "./components/EmergencyPage/EmergencyPage";
import Diagnosis from "./components/DiagnosisPgeComponents/DiagnosisFrontPage/DiagnosisFrontPage";
import Therapist from "./pages/TherapistPage";
import Connection from "./pages/ConnectionPage";
import ArticlesPage from "./pages/ArticlesPage";
import FindMyTherapist from "./components/FindMyTherapist/FindMyTherapist";
import Patient from "./components/PatientPageComponents/PatientPage";
import FillUserInfo from "./components/FillUserInfo/FillUserInfo";
import TherapistResultsPage from "./pages/TherapistResultsPage";
import StartWithTherapist from "./components/StartWithTherapist/StartWithTherapist"



import Diary from "./pages/diary";
import DepressionInfo from "./components/PatientPageComponents/DepressionInfo/DepressionInfo";
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
        <Route path="diary" element={<Diary />} />
        <Route path="fillyourinfo" element={<FillUserInfo />} />
        <Route path="psychoeducate" element={<DepressionInfo/>}/>
        <Route path="/therapist-results" element={<TherapistResultsPage />} />
        <Route path="/treatment/:therapistId" element={<StartWithTherapist />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
