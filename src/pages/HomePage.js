// src/pages/HomePage.js
import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent';
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
    <div className="home-layout">
      <aside className="home-aside">
        <h2>
        <FontAwesomeIcon icon={faBus} className="icon-bus" /> {/* Ícone de ônibus */}
            - Transporte Público DF
        </h2>
        <div className="button-container">
          <button className="aside-button" onClick={handleShowGraph}>
            - Ver Gráfico
          </button>
          <Link to="/form" className="link-button">
            <button className="home-button">- Responder Avaliação</button>
          </Link>
        </div>

        
      </aside>
      
      <div className="home-content">
        <p className="motivational-text">
          🚍 **Ajude a transformar o transporte público da sua cidade!** 🚍<br />
          Sua opinião é fundamental e pode realmente fazer a diferença! Ao participar da nossa avaliação, você estará contribuindo para um sistema de transporte mais eficiente, acessível e de qualidade. 
          <br /><br />
          Imagine um transporte que atenda melhor às suas necessidades, com horários mais confiáveis, veículos mais confortáveis e rotas mais práticas. 
          Ao compartilhar suas experiências e sugestões, você se torna parte ativa dessa mudança! 
          <br /><br />
          **E o melhor:** não leva nem 5 minutos para responder! Basta clicar no botão e deixar sua avaliação. Sua voz importa e juntos podemos fazer um transporte público que funcione para todos. 
          <strong> Avalie agora e faça parte da mudança!</strong>
        </p>
        
        <div className="image-container">
          <img src={rodoviariaImage} alt="Transporte Público" className="motivational-image" />
          <p>Rodoviária do Plano Piloto, em Brasília, — Foto: TV Globo/Reprodução</p>
          <img src="link-para-sua-imagem2.jpg" alt="Avaliação" className="motivational-image" />
          <p>Rodoviária do Plano Piloto, em Brasília, — Foto: TV Globo/Reprodução</p>
        </div>

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
