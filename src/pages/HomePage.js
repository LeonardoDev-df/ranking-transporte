// src/pages/HomePage.js
import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent';
import Navbar from "../components/Navbar";
import Masthead from "../components/Masthead";
import Footer from "../components/Footer";


const HomePage = () => {

  return (
    <>
      <Navbar />
      <Masthead />
      <GraphComponent />
     
      <Footer />

    </>
  );
};

export default HomePage;
