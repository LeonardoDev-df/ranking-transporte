import React, { useEffect } from "react";
import '../style/styles.css'; // Importando o arquivo de estilo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // Ícone de ônibus
import '../style/Navbar.css';

const Navbar = () => {

  useEffect(() => {
    // Função para encolher a navbar
    const navbarShrink = () => {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };
  
    // Encolher a navbar na carga inicial
    navbarShrink();
  
    // Adiciona evento de scroll para encolher a navbar
    document.addEventListener('scroll', navbarShrink);
  
    // Verifica se o ScrollSpy está disponível
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && window.bootstrap && window.bootstrap.ScrollSpy) {
      new window.bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -40%',
      });
    }
  
    // Fechar navbar ao clicar em item responsivo
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map((responsiveNavItem) => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  
    // Remove event listeners quando o componente desmonta
    return () => {
      document.removeEventListener('scroll', navbarShrink);
    };
  }, []);
  

  return (
    <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div className="container">
        <div className="navbar-brand-container">
          <FontAwesomeIcon icon={faBus} className="icon-bus" /> {/* Ícone de ônibus */}
          <a className="navbar-brand" href="#page-top">Ranking de Transporte Público - DF</a>
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
              <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#portfolio">Ver Gráfico</a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#about">Responder Avaliação</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
