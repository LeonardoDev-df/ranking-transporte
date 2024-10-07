// src/pages/HomePage.js
import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent';
import Navbar from "../components/Navbar";
import Masthead from "../components/Masthead";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import '../style/HomePage.css'; // Importando o arquivo de estilo
import rodoviariaImage from '../images/rodoviaria.jpg';

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