import React, { useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { db } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../style/GraphComponent.css'; 
import '../style/styles.css'; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0); // Estado para armazenar o número total de avaliações
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'avaliacoes'));
      let totalAvaliacoesCount = querySnapshot.size; // Conta o número de documentos na coleção

      const empresas = {
        Marechal: { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Pioneira: { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Piracicabana: { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        'Pioneira/BRT': { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        'São José/BsBus': { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
        Urbi: { design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data().ratings; 

        for (const [empresa, avaliacoes] of Object.entries(data)) {
          if (empresas[empresa]) {
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

      const chartData = {
        labels: Object.keys(empresas),
         datasets: [
          {
            label: 'Média de Design',
            data: Object.values(empresas).map(e => e.design / (e.count || 1)),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Média de Ergonomia',
            data: Object.values(empresas).map(e => e.ergonomia / (e.count || 1)),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label: 'Média de Ventilação',
            data: Object.values(empresas).map(e => e.ventilacao / (e.count || 1)),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Média de Assento',
            data: Object.values(empresas).map(e => e.assento / (e.count || 1)),
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
          },
          {
            label: 'Média de Iluminação',
            data: Object.values(empresas).map(e => e.iluminacao / (e.count || 1)),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
          {
            label: 'Média de Pontualidade',
            data: Object.values(empresas).map(e => e.pontualidade / (e.count || 1)),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
          },
          {
            label: 'Média de Limpeza',
            data: Object.values(empresas).map(e => e.limpeza / (e.count || 1)),
            backgroundColor: 'rgba(199, 199, 199, 0.6)',
          },
          {
            label: 'Média de Conforto',
            data: Object.values(empresas).map(e => e.conforto / (e.count || 1)),
            backgroundColor: 'rgba(123, 159, 245, 0.6)',
          },
          {
            label: 'Média de Custo',
            data: Object.values(empresas).map(e => e.custo / (e.count || 1)),
            backgroundColor: 'rgba(100, 100, 100, 0.6)',
          },
          {
            label: 'Média de Atendimento',
            data: Object.values(empresas).map(e => e.atendimento / (e.count || 1)),
            backgroundColor: 'rgba(255, 99, 71, 0.6)',
          },
        ],
      };

      setChartData(chartData);
      setTotalAvaliacoes(totalAvaliacoesCount); // Define o total de avaliações
    };

    fetchData();

    // Verificar o redimensionamento da janela
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = useMemo(() => ({
    responsive: true,
    indexAxis: isMobile ? 'y' : 'x', // Troca para vertical em dispositivos móveis
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ranking das Empresas de Transporte - Brasília/DF',
      },
    },
    animation: false, 
    scales: {
      x: {
        type: isMobile ? 'linear' : 'category', // Ajusta o tipo de eixo baseado no layout
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  }), [isMobile]);

  return (
    <section className="page-section portfolio" id="graph">
      <div className="container">
      <span>Total de Avaliações: {totalAvaliacoes}</span> {/* Mostra o número total de avaliações */}
        <div className="graph-container">
        
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    
    </section>
  );
};

export default GraphComponent;
