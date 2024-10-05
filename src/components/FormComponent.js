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
               Declaro ser maior de 18 anos e Sim, aceito os termos de consentimento.
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className='fielde'>                   
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

              <div className="form-idade">
                <label>Idade:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (isNaN(value)) {
                      value = '';  // Limpa o campo se não for um número
                    } else if (value < 18) {
                      value = 18;  // Ajusta para 0 se o valor for menor que 0
                    } else if (value > 90) {
                      value = 90;  // Ajusta para 90 se o valor for maior que 90
                    }
                    setAge(value);
                  }}
                  min="18"
                  max="90"
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

              <div className="roles-container">
                <h2>Regras de Funcionamento</h2>
                <p>Por favor, forneça uma avaliação de 0 a 10 para cada item abaixo:</p>
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
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (isNaN(value)) {
                value = '';  // Limpa o campo se não for um número
              } else if (value < 0) {
                value = 0;  // Se o valor for menor que 0, define como 0
              } else if (value > 10) {
                value = 10;  // Se o valor for maior que 10, define como 10
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



          <div className="button-enviar">
            <button type="submit" className="submit-button">Enviar Avaliação</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormComponent;
