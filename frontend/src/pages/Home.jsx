// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { myHomenav } from "../assets/js/homepage-nav";


import Navbar from "../components/HomePageComponents/HomeNavbar/HomeNavbar"
import GraceWelcome from "../components/HomePageComponents/HomeGrace/HomeGrace"
import Services from "../components/HomePageComponents/HomeServices/HomeServices"
import ContactUs from "../components/HomePageComponents/HomeContactUs/HomeContactUs"




export default function Home() {

  return (
    <div>
      <Navbar/>
      <GraceWelcome/>
      <Services/>
      <ContactUs/>
    </div>
  );
}
