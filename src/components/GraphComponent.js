import React, { useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { db } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Carousel } from 'react-bootstrap'; // Importando o carrossel do react-bootstrap
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

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [index, setIndex] = useState(0); // Estado para controlar o carrossel

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
            // Calcula o total de pontos acumulados para cada critério
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

      // Calcula a média de pontos por empresa
      const empresasOrdenadas = Object.keys(empresas)
        .map((key) => ({
          empresa: key,
          media: empresas[key].totalAvaliacoes > 0 ? (empresas[key].totalPontos / empresas[key].totalAvaliacoes) : 0,
        }))
        .sort((a, b) => b.media - a.media); // Ordena da maior média para a menor

      const chartData = {
        labels: empresasOrdenadas.map((e) => e.empresa),
        datasets: [
          {
            label: `Número de Avaliações ` + totalAvaliacoes,
            data: empresasOrdenadas.map((e) => e.media.toFixed(2)), // Formata para 2 casas decimais
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };



      const itemData = {
        labels: ['Design', 'Ergonomia', 'Ventilação', 'Assento', 'Iluminação', 'Pontualidade', 'Limpeza', 'Conforto', 'Custo', 'Atendimento'],
        datasets: Object.keys(empresas).map((key, idx) => ({
          label: key,
          data: [
            empresas[key].design,
            empresas[key].ergonomia,
            empresas[key].ventilacao,
            empresas[key].assento,
            empresas[key].iluminacao,
            empresas[key].pontualidade,
            empresas[key].limpeza,
            empresas[key].conforto,
            empresas[key].custo,
            empresas[key].atendimento,
            // Aqui você pode ajustar para outras métricas se desejar
          ],
          backgroundColor: `rgba(${75 + idx * 30}, ${192 - idx * 10}, ${192 - idx * 20}, 0.6)`,
        })),
      };

      setChartData(chartData);
      setItemData(itemData);
      setTotalAvaliacoes(querySnapshot.size);
    };

    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = useMemo(
    () => ({
      responsive: true,
      indexAxis: isMobile ? 'y' : 'x',
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Ranking das Empresas de Transporte - Brasília/DF',
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    }),
    [isMobile]
  );

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="page-section portfolio" id="graph">
      <div className="container">
        <Carousel activeIndex={index} onSelect={handleSelect} controls indicators interval={null} >
          <Carousel.Item>
            <div className="graph-container">
              {chartData ? <Bar data={chartData} options={options} /> : <p>Carregando dados...</p>}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="graph-container">
              {itemData ? <Bar data={itemData} options={options} /> : <p>Carregando dados...</p>}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
};

export default GraphComponent;
