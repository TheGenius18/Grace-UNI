import React, { useState, createContext } from "react";
import "../assets/css/TherapistPage/TherapistPage.css";
import Navbar from ".././components/TherapistPageComponents/Dnav/Dnav";
import Sidebar from ".././components/TherapistPageComponents/Dsidebar/Dsidebar";
import Main from ".././components/TherapistPageComponents/Dmain/Dmain";

export const PageContext = createContext();

const TherapistPage = () => {
  const [DMainChanger, setDMainChanger] = useState("profile");
  return (
    <>
      {/* <Navbar/> */}
      <PageContext.Provider value={DMainChanger}>
        <div className="d-main-content">
          <Sidebar />
          <Main />
        </div>
      </PageContext.Provider>
    </>
  );
};
export default TherapistPage;
