import React, { useEffect, useState } from "react";
import '../style/styles.css'; // Importando o arquivo de estilo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // Ícone de ônibus
import '../style/Navbar.css';
import { Link } from 'react-router-dom';



const Navbar = () => {

  useEffect(() => {
    const navbarShrink = () => {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) return;
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    return () => {
      document.removeEventListener('scroll', navbarShrink);
    };
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <div className="navbar-brand-container">
            <FontAwesomeIcon icon={faBus} className="icon-bus" style={{ color: '#ffffff', marginRight: '10px' }} />
            <a className="navbar-brand" href="#page-top" onClick={scrollToTop}>
              Ranking de Transporte Público - DF
            </a>
          </div>

          <button
            className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                  href="#graph"             
                >
                  Ver Gráfico
                </a>
              </li>

              <li className="nav-item mx-0 mx-lg-1">
                <Link to="/form" className="nav-link py-3 px-0 px-lg-3 rounded">
                  Responder Avaliação
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    
    </>
  );
};

export default Navbar;
