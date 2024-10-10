import React, { useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { db } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Carousel } from 'react-bootstrap';
import '../style/GraphComponent.css';
import '../style/styles.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'avaliacoes'));

      const empresas = {
        Marechal: {  totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Pioneira: { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Piracicabana: { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        'Pioneira/BRT': { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        'São José/BsBus': { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Urbi: { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data().ratings;

        for (const [empresa, avaliacoes] of Object.entries(data)) {
          if (empresas[empresa]) {
            const totalEmpresa = Object.values(avaliacoes).reduce((acc, val) => acc + parseInt(val || 0), 0);
            empresas[empresa].totalPontos += totalEmpresa;
            empresas[empresa].totalAvaliacoes++;
            empresas[empresa].design += parseInt(avaliacoes.design || 0);
            empresas[empresa].ergonomia += parseInt(avaliacoes.ergonomia || 0);
            empresas[empresa].ventilacao += parseInt(avaliacoes.ventilacao || 0);
            empresas[empresa].assento += parseInt(avaliacoes.assento || 0);
            empresas[empresa].iluminacao += parseInt(avaliacoes.iluminacao || 0);
            empresas[empresa].pontualidade += parseInt(avaliacoes.pontualidade || 0);
            empresas[empresa].limpeza += parseInt(avaliacoes.limpeza || 0);
            empresas[empresa].conforto += parseInt(avaliacoes.conforto || 0);
            empresas[empresa].custo += parseInt(avaliacoes.custo || 0);
            empresas[empresa].atendimento += parseInt(avaliacoes.atendimento || 0);
            empresas[empresa].count++;
          }
        }
      });

      const empresasOrdenadas = Object.keys(empresas)
        .map((key) => ({
          empresa: key,
          media: empresas[key].totalAvaliacoes > 0 ? (empresas[key].totalPontos / empresas[key].totalAvaliacoes) : 0,
        }))
        .sort((a, b) => b.media - a.media);

        const chartData = {
          labels: empresasOrdenadas.map((e) => e.empresa),
          datasets: [
            {
              data: empresasOrdenadas.map((e) => parseFloat(e.media)),
              backgroundColor: [
                'rgba(0, 128, 0, 0.6)',     // Verde para Piracicabana               
                'rgba(255, 255, 0, 0.6)',   // Amarelo para Pioneira
                'rgba(144, 238, 144, 0.6)', // Verde Claro para São José/BsBus                               
                'rgba(0, 0, 255, 0.6)',     // Azul para Urbi
                'rgba(255, 255, 0, 0.6)',   // Amarelo para Pioneira/BRT
                'rgba(255, 165, 0, 0.6)',  // Laranja para Marechal
              ],
            },
          ],
        };

      const itemData = {
        labels: ['Design', 'Ergonomia', 'Ventilação', 'Assento', 'Iluminação', 'Pontualidade', 'Limpeza', 'Conforto', 'Custo', 'Atendimento'],
        datasets: [
          {
            label: 'Marechal',
            data: [
              empresas['Marechal'].design,
              empresas['Marechal'].ergonomia,
              empresas['Marechal'].ventilacao,
              empresas['Marechal'].assento,
              empresas['Marechal'].iluminacao,
              empresas['Marechal'].pontualidade,
              empresas['Marechal'].limpeza,
              empresas['Marechal'].conforto,
              empresas['Marechal'].custo,
              empresas['Marechal'].atendimento,
            ],
            backgroundColor: 'rgba(255, 165, 0, 0.6)', // Laranja para Marechal
          },
          {
            label: 'Pioneira',
            data: [
              empresas['Pioneira'].design,
              empresas['Pioneira'].ergonomia,
              empresas['Pioneira'].ventilacao,
              empresas['Pioneira'].assento,
              empresas['Pioneira'].iluminacao,
              empresas['Pioneira'].pontualidade,
              empresas['Pioneira'].limpeza,
              empresas['Pioneira'].conforto,
              empresas['Pioneira'].custo,
              empresas['Pioneira'].atendimento,
            ],
            backgroundColor: 'rgba(255, 255, 0, 0.6)', // Amarelo para Pioneira
          },
          {
            label: 'Pioneira/BRT',
            data: [
              empresas['Pioneira/BRT'].design,
              empresas['Pioneira/BRT'].ergonomia,
              empresas['Pioneira/BRT'].ventilacao,
              empresas['Pioneira/BRT'].assento,
              empresas['Pioneira/BRT'].iluminacao,
              empresas['Pioneira/BRT'].pontualidade,
              empresas['Pioneira/BRT'].limpeza,
              empresas['Pioneira/BRT'].conforto,
              empresas['Pioneira/BRT'].custo,
              empresas['Pioneira/BRT'].atendimento,
            ],
            backgroundColor: 'rgba(255, 255, 0, 0.6)', // Amarelo para Pioneira/BRT
          },
          {
            label: 'Piracicabana',
            data: [
              empresas['Piracicabana'].design,
              empresas['Piracicabana'].ergonomia,
              empresas['Piracicabana'].ventilacao,
              empresas['Piracicabana'].assento,
              empresas['Piracicabana'].iluminacao,
              empresas['Piracicabana'].pontualidade,
              empresas['Piracicabana'].limpeza,
              empresas['Piracicabana'].conforto,
              empresas['Piracicabana'].custo,
              empresas['Piracicabana'].atendimento,
            ],
            backgroundColor: 'rgba(0, 128, 0, 0.6)', // Verde para Piracicabana
          },
          {
            label: 'São José/BsBus',
            data: [
              empresas['São José/BsBus'].design,
              empresas['São José/BsBus'].ergonomia,
              empresas['São José/BsBus'].ventilacao,
              empresas['São José/BsBus'].assento,
              empresas['São José/BsBus'].iluminacao,
              empresas['São José/BsBus'].pontualidade,
              empresas['São José/BsBus'].limpeza,
              empresas['São José/BsBus'].conforto,
              empresas['São José/BsBus'].custo,
              empresas['São José/BsBus'].atendimento,
            ],
            backgroundColor: 'rgba(144, 238, 144, 0.6)', // Verde Claro para São José/BsBus
          },
          {
            label: 'Urbi',
            data: [
              empresas['Urbi'].design,
              empresas['Urbi'].ergonomia,
              empresas['Urbi'].ventilacao,
              empresas['Urbi'].assento,
              empresas['Urbi'].iluminacao,
              empresas['Urbi'].pontualidade,
              empresas['Urbi'].limpeza,
              empresas['Urbi'].conforto,
              empresas['Urbi'].custo,
              empresas['Urbi'].atendimento,
            ],
            backgroundColor: 'rgba(0, 0, 255, 0.6)', // Azul para Urbi
          },
        ],
      };

      setChartData(chartData);
      setItemData(itemData);
      setTotalAvaliacoes(querySnapshot.size);
    };

    fetchData();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 1,
          callback: (value) => value.toFixed(1),
        },
      },
    },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Ranking Geral de Empresas de Transporte' },
    },
  }), []);

  const itemOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 1,
          callback: (value) => value.toFixed(1),
        },
      },
    },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Avaliações por Critério' },
    },
  }), []);

  return (
    <section className="page-section portfolio" id="graph">
      <div className="container">

      <div className="graph-container">
       
        {chartData && <div className="chart-wrapper"><Bar data={chartData} options={chartOptions} /></div>}
        {itemData && (
          <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className="carousel-custom">
            {itemData.datasets.map((dataset, idx) => (
              <Carousel.Item key={idx}>
                <div className="carousel-inner">
                  <h3>{dataset.label}</h3>
                  <Bar data={{ labels: itemData.labels, datasets: [dataset] }} options={itemOptions} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>
    </section>
  );
};

export default GraphComponent;
