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

// Importando ícones do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // Ícone de ônibus

const HomePage = () => {
  const [showGraph, setShowGraph] = useState(false);

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  return (
    <>
      

      <div>
        {showGraph && (
          <>
            <GraphComponent />
          </>
        )}
      </div>

      <Navbar />
      <Masthead />
      <Portfolio />
      <Footer />

    </>
  );
};

export default HomePage;
