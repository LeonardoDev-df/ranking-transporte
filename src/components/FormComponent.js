import React, { useState } from 'react';
import { db } from '../data/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../style/FormComponent.css'; // Importando o arquivo de estilo
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import CitySelect from './CitySelect'; // Importando o novo componente
import Swal from 'sweetalert2'; // Importando SweetAlert2

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
      Swal.fire({
        title: 'Termos não aceitos',
        text: 'Você precisa aceitar os termos para enviar a avaliação.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
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

      // Alerta de sucesso com SweetAlert2
      Swal.fire({
        title: 'Avaliação enviada com sucesso!',
        text: 'Obrigado por responder ao formulário. Usaremos estas informações para melhorar o transporte público da sua região.',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6',
        background: '#f7f7f7',
      }).then(() => {
        // Redirecionar após o alerta ser fechado
        navigate('/');
      });

      // Resetar o formulário após o envio
      setEmail('');
      setAge('');
      setCity('');
      setAcceptedTerms(false);
      setShowForm(false);
      setRatings({
        Piracicabana: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Pioneira: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Marechal: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        'Pioneira/BRT': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        'São José/BsBus': { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
        Urbi: { design: '', ergonomia: '', ventilacao: '', assento: '', iluminacao: '', pontualidade: '', limpeza: '', conforto: '', custo: '', atendimento: '' },
      });

    } catch (error) {
      Swal.fire({
        title: 'Erro',
        text: 'Houve um problema ao enviar a avaliação. Por favor, tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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
                  <li>Melhorar a qualidade do transporte público, identificando problemas e oportunidades de aprimoramento nos serviços prestados.</li>
                  <li>Realizar pesquisas e estudos sobre os serviços de transporte, com o objetivo de gerar relatórios e análises que possam influenciar melhorias.</li>
                  <li>Entrar em contato para coletar feedback sobre as avaliações e oferecer suporte em relação à sua experiência com o transporte público.</li>
                  <li>Utilizar seus dados de forma anônima para análises estatísticas e geração de relatórios que não identifiquem diretamente nenhum indivíduo.</li>
                  <li>Compartilhar as informações, de maneira anonimizada, com órgãos reguladores e parceiros envolvidos na melhoria dos serviços de transporte.</li>
                </ul>
                <br />
                <strong>Seus Direitos:</strong>
                <ul>
                  <li>Você tem o direito de acessar, corrigir ou atualizar os seus dados pessoais a qualquer momento.</li>
                  <li>Você pode solicitar a exclusão dos seus dados do nosso sistema a qualquer momento, sem justificativa, entrando em contato através do nosso canal de atendimento.</li>
                  <li>Você tem o direito de retirar seu consentimento para o tratamento dos dados a qualquer momento, o que não afetará a legalidade do processamento baseado no consentimento antes de sua retirada.</li>
                  <li>Você pode solicitar informações detalhadas sobre como seus dados estão sendo tratados, com quem eles são compartilhados e as finalidades específicas do uso.</li>
                </ul>
                <br />
                <strong>Segurança dos Dados:</strong>
                <ul>
                  <li>Seus dados serão tratados de forma confidencial e armazenados em servidores seguros com acesso restrito.</li>
                  <li>Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, perda acidental, destruição ou dano.</li>
                </ul>
                <br />
                Ao marcar a opção abaixo, você concorda com o uso dos seus dados pessoais para os fins acima descritos. Caso tenha dúvidas sobre este termo ou sobre o tratamento dos seus dados, você pode entrar em contato através do nosso canal de atendimento.
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
                  className="form-controli"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5">
                <label>Idade:</label>
                <input
                  type="number"
                  className="form-controle"
                  value={age}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Permite apenas até dois dígitos
                    if (value.length > 2) {
                      value = value.slice(0, 2);
                    }

                    // Converte para número
                    value = parseInt(value);

                

                    // Atualiza o estado
                    setAge(value);
                  }}
                  min="18"
                 
                  required
                />
              </div>

            </div>

            <div className="row mb-3">
              <div className="col-md-5">
                
                <CitySelect city={city} setCity={setCity} />
              </div>
              <div className="col-md-6">              
                <div className="roles-container">
                  <h2>Regras de Funcionamento</h2>
                  <p>Por favor, forneça uma avaliação de 0 a 10 para cada item abaixo:</p>
                </div>
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
