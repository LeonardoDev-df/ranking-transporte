// src/pages/FormPage.js
import React from 'react';
import FormComponent from '../components/FormComponent';
import '../style/FormStyles.css'; // Importando o arquivo de estilo

const FormPage = () => {
  return (
    <div className="evaluation-form-container">
      <div className="form-header">
        <h1>Formulário de Avaliação</h1>
        <p>Por favor, preencha as informações abaixo para avaliar as empresas de transporte público.</p>
      </div>
      <div className="form-body">
        <FormComponent />
      </div>
    </div>
  );
};

export default FormPage;
