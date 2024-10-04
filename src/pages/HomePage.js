// src/pages/HomePage.js
import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent';
import { Link } from 'react-router-dom';
import '../style/HomePage.css'; // Importando o arquivo de estilo

// Importando ícones do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // Ícone de ônibus

const HomePage = () => {
  const [showGraph, setShowGraph] = useState(false);

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  return (
    <div className="home-layout">
      <aside className="home-aside">
        <h2>
        <FontAwesomeIcon icon={faBus} className="icon-bus" /> {/* Ícone de ônibus */}
            - Transporte Público DF
        </h2>
        <button className="aside-button" onClick={handleShowGraph}>
         - Ver Gráfico
        </button>
        <Link to="/form" className="link-button">
              <button className="home-button">- Responder Avaliação</button>
        </Link>
      </aside>
      
      <div className="home-content">
     
        {showGraph && (
          <>
            <GraphComponent />
            
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
