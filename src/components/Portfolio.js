import React from "react";
import dogImage from "../images/cachorro-adulto.jpg";
import crocImage from "../images/croco.jpg";
import Modal from "./Modal";
import '../style/styles.css'; 
const Portfolio = () => {
  return (
    <section className="page-section portfolio" id="about">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">História do RA Animals Sound</h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
          <div className="divider-custom-line"></div>
        </div>
        <p className="lead text-center">Este projeto foi criado para tornar o aprendizado mais envolvente e divertido, permitindo que as crianças associem sons de animais às suas imagens correspondentes.</p>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-5">
            <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
              <img className="img-fluid" src={dogImage} alt="Cachorro" />
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal2">
              <img className="img-fluid" src={crocImage} alt="Crocodilo" />
            </div>
          </div>
        </div>

        <Modal id="portfolioModal1" title="Conhecendo os Cachorros" image={dogImage} soundId="cachorro-sound" soundSrc="./sons/dog.mp3" />
        <Modal id="portfolioModal2" title="Conhecendo os Crocodilos" image={crocImage} soundId="crocodilo-sound" soundSrc="./sons/Kro.mp3" />
      </div>
    </section>
  );
};
export default Portfolio;
