import React, { useState } from 'react';
import { db } from '../data/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../style/FormComponent.css'; // Importando o arquivo de estilo
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import CitySelect from './CitySelect'; // Importando o novo componente
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap

const FormComponent = () => {
  const navigate = useNavigate(); // Criando uma instância do useNavigate
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
  const [ratings, setRatings] = useState({
    Piracicabana: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
    Pioneira: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
    Marechal: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
    'Pioneira/BRT': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
    'São José/BsBus': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
    Urbi: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Você precisa aceitar os termos!');
      return;
    }

    try {
      await addDoc(collection(db, 'avaliacoes'), {
        email,
        age,
        city,
        ratings,
        timestamp: new Date(),
      });
      alert('Avaliação enviada com sucesso!');
      navigate('/'); // Redirecionar para a página inicial
      
      setEmail('');
      setAge('');
      setCity('');
      setAcceptedTerms(false);
      setShowForm(false); // Reseta a exibição do formulário
      setRatings({
        Piracicabana: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Pioneira: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Marechal: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        'Pioneira/BRT': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        'São José/BsBus': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Urbi: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
      });
    } catch (error) {
      console.error('Erro ao enviar a avaliação: ', error);
    }
  };

  const handleRatingChange = (empresa, categoria, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [empresa]: {
        ...prevRatings[empresa],
        [categoria]: value,
      },
    }));
  };

  const handleTermsAcceptance = () => {
    setAcceptedTerms(true);
    setShowForm(true); // Mostra o formulário após aceitar os termos
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {!showForm ? (
          <div className="terms-container">
            <h3 className="terms-title">Termo de Consentimento para o Tratamento de Dados Pessoais</h3>
            <div className="terms-scroll">
              <p className="terms-text">
                Ao fornecer seus dados, você consente que nós utilizemos as informações fornecidas para os seguintes fins:
                <ul>
                  <li>Melhorar a qualidade do transporte público.</li>
                  <li>Realizar pesquisas e estudos sobre os serviços.</li>
                  <li>Entrar em contato para feedback sobre as avaliações.</li>
                </ul>
                Você tem o direito de solicitar a exclusão de seus dados a qualquer momento. Ao marcar a opção abaixo, você aceita os termos de uso dos seus dados pessoais.
              </p>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={acceptedTerms}
                  onChange={handleTermsAcceptance}
                  required
                />
                Declaro ser maior de 18 anos e Sim, aceito os termos de consentimento.
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>E-mail:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Idade:</label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (isNaN(value)) {
                      value = '';  // Limpa o campo se não for um número
                    } else if (value < 18) {
                      value = 18;
                    } else if (value > 90) {
                      value = 90;
                    }
                    setAge(value);
                  }}
                  min="18"
                  max="90"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Cidade onde mora:</label>
                <CitySelect city={city} setCity={setCity} />
              </div>
            </div>

            <h3>Avalie as Empresas:</h3>
            <div className="row">
              {Object.keys(ratings).map((empresa, index) => (
                <div key={empresa} className="col-md-6 mb-4">
                  <h4>{empresa}</h4>
                  {Object.keys(ratings[empresa]).map(categoria => (
                    <div className="mb-2" key={categoria}>
                      <label className="form-label">
                        Avaliação de {categoria.charAt(0).toUpperCase() + categoria.slice(1)}:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={ratings[empresa][categoria]}
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            value = '';  // Limpa o campo se não for um número
                          } else if (value < 0) {
                            value = 0;
                          } else if (value > 10) {
                            value = 10;
                          }
                          handleRatingChange(empresa, categoria, value);
                        }}
                        min="0"
                        max="10"
                        required
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">Enviar Avaliação</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
