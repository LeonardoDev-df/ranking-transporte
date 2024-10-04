import React, { useState } from 'react';
import { db } from '../data/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../style/FormComponent.css'; // Importando o arquivo de estilo
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const FormComponent = () => {
  const navigate = useNavigate(); // Criando uma instância do useNavigate
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
  const [ratings, setRatings] = useState({
    Piracicabana: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
    Pioneira: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
    Marechal: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
    'Pioneira/BRT': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
    'São José/BsBus': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
    Urbi: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
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

       // Redirecionar para a página inicial
       navigate('/'); // Altere '/' para o caminho da sua página inicial, se necessário

      
      setEmail('');
      setAge('');
      setCity('');
      setAcceptedTerms(false);
      setShowForm(false); // Reseta a exibição do formulário
      setRatings({
        Piracicabana: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
        Pioneira: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
        Marechal: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
        'Pioneira/BRT': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
        'São José/BsBus': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
        Urbi: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '' },
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
    <form onSubmit={handleSubmit} className="form-container">
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
          <div className="terms-acceptance">
            <label>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={handleTermsAcceptance}
                required
              />
              Sim, aceito os termos de consentimento.
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className="form-fields">
            <div className="form-field">
              <label>E-mail:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Idade:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Cidade onde mora:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Selecione sua cidade</option>
                <option value="AGUAS CLARAS">AGUAS CLARAS</option>
                <option value="ARNIQUEIRAS">ARNIQUEIRAS</option>
                <option value="BRASILIA">BRASILIA</option>
                <option value="BRAZLANDIA">BRAZLANDIA</option>
                <option value="CANDANGOLANDIA">CANDANGOLANDIA</option>
                <option value="CEILANDIA">CEILANDIA</option>
                <option value="CRUZEIRO">CRUZEIRO</option>
                <option value="GAMA">GAMA</option>
                <option value="GUARA">GUARA</option>
                <option value="LAGO NORTE">LAGO NORTE</option>
                <option value="LAGO SUL">LAGO SUL</option>
                <option value="NUCLEO BANDEIRANTE">NUCLEO BANDEIRANTE</option>
                <option value="PARANOA">PARANOA</option>
                <option value="PLANALTINA">PLANALTINA</option>
                <option value="RECANTO DAS EMAS">RECANTO DAS EMAS</option>
                <option value="RIACHO FUNDO">RIACHO FUNDO</option>
                <option value="SAMAMBAIA">SAMAMBAIA</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>


          <h3>Avalie as Empresas:</h3>
          <div className="ratings-grid">
            {Object.keys(ratings).map((empresa, index) => (
              <div key={empresa} className={`empresa-rating ${index < 3 ? 'row1' : 'row2'}`}>
                <h4>{empresa}</h4>
                {Object.keys(ratings[empresa]).map(categoria => (
                  <div className="rating-item" key={categoria}>
                    <label className="rating-label">
                      Avaliação de {categoria.charAt(0).toUpperCase() + categoria.slice(1)}:
                    </label>
                    <input
                      type="number"
                      className="rating-input"
                      value={ratings[empresa][categoria]}
                      onChange={(e) => handleRatingChange(empresa, categoria, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">Enviar Avaliação</button>
        </div>
      )}
    </form>
  );
};

export default FormComponent;
