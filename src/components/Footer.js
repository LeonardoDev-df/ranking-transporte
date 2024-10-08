import React from "react";
import PoliticaFooter from "../images/Politica.webp";
import '../style/styles.css'; // Importando o arquivo de estilo
const Footer = () => {
  return (
    <>
      <footer className="footer text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <img className="img-fluid mb-4" src={PoliticaFooter} alt="Imagem de cartões" />
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Informações de Contato</h4>
              <a className="btn btn-outline-light btn-social mx-1" href="mailto:leonardolopesborges@hotmail.com">
                <i className="fas fa-envelope fa-2x"></i>
              </a>

             
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          <small>© Leonardo Lopes Borges 2024</small>
        </div>
      </div>
    </>
  );
};

export default Footer;
