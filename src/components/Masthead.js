import React from "react";
import dogImage from "../images/cachorro-adulto.jpg"; // Ajuste o caminho da imagem
import '../style/styles.css'; // Importando o arquivo de estilo
const Masthead = () => {
  return (
    <header className="masthead bg-primary text-white text-center">
      <div className="container d-flex align-items-center flex-column">
        <img className="masthead-avatar mb-5" src={dogImage} alt="dog" />
        <h1 className="masthead-heading">TransporteTop DF</h1>
        <div className="divider-custom divider-light">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon">
          🚍
          </div>
          <div className="divider-custom-line"></div>
        </div>
        <p className="masthead-subheading font-weight-light mb-0">
         **Ajude a transformar o transporte público da sua cidade!** <br />
          Sua opinião é fundamental e pode realmente fazer a diferença! Ao participar da nossa avaliação, você estará contribuindo para um sistema de transporte mais eficiente, acessível e de qualidade. 
          <br /><br />
          Imagine um transporte que atenda melhor às suas necessidades, com horários mais confiáveis, veículos mais confortáveis e rotas mais práticas. 
          Ao compartilhar suas experiências e sugestões, você se torna parte ativa dessa mudança! 
          <br /><br />
          **E o melhor:** não leva nem 5 minutos para responder! Basta clicar no botão e deixar sua avaliação. Sua voz importa e juntos podemos fazer um transporte público que funcione para todos. 
          <strong> Avalie agora e faça parte da mudança!</strong>
        </p>
        <p className="masthead-subheading font-weight-light mb-0">
          Explore animais em 3D: acesse o sistema, clique em “Iniciar realidade aumentada”, aponte a câmera para os marcadores e descubra mais sobre essas criaturas fascinantes.
        </p>
      </div>
    </header>
  );
};

export default Masthead;
