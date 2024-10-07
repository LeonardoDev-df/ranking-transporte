import React from "react";
import '../style/styles.css'; // Importando o arquivo de estilo
const Modal = ({ id, title, image, soundId, soundSrc }) => {
  return (
    <div className="portfolio-modal modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center pb-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">{title}</h2>
                  <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                  </div>
                  <img className="img-fluid rounded mb-5" src={image} alt={title} />
                  <button className="btn btn-primary" id="animal-button" data-sound={soundId}>
                    Som do {title}
                  </button>
                  <audio id={soundId}>
                    <source src={soundSrc} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
