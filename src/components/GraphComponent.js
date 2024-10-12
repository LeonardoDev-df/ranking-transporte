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
  const [totalAvaliacoes, setTotalAvaliacoes] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [index, setIndex] = useState(0);
  const [empresasOrdenadas, setEmpresasOrdenadas] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'avaliacoes'));
      let totalAvaliacoesCount = querySnapshot.size;
      const empresas = {
        Marechal: { totalPontos: 0, totalAvaliacoes: 0, design: 0, ergonomia: 0, ventilacao: 0, assento: 0, iluminacao: 0, pontualidade: 0, limpeza: 0, conforto: 0, custo: 0, atendimento: 0, count: 0 },
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
          media:
            empresas[key].totalAvaliacoes > 0
              ? parseFloat((empresas[key].totalPontos / empresas[key].totalAvaliacoes).toFixed(1))
              : 0,
        }))
        .sort((a, b) => b.media - a.media);

      const empresaTop = empresasOrdenadas.reduce(
        (prev, current) => (prev.media > current.media ? prev : current),
        empresasOrdenadas[0]
      );

      var lote = empresas.Marechal.totalAvaliacoes;

      lote = parseInt(lote); // Transforma lote em inteiro
      console.log(lote);

      setEmpresasOrdenadas(empresasOrdenadas);
     

      const chartData = {
        labels: empresasOrdenadas.map((e) => e.empresa),
        datasets: [
          {
            label: `Top Empresa: ${empresaTop.empresa}`,
            data: empresasOrdenadas.map((e) => (e.media / lote ).toFixed(1)), 
            backgroundColor: empresasOrdenadas.map((e) => {
              switch (e.empresa) {
                case 'Piracicabana':
                  return 'rgba(0, 128, 0, 0.6)';
                case 'Pioneira':
                  return 'rgba(255, 255, 0, 0.6)';
                case 'São José/BsBus':
                  return 'rgba(144, 238, 144, 0.6)';
                case 'Urbi':
                  return 'rgba(0, 0, 255, 0.6)';
                case 'Pioneira/BRT':
                  return 'rgba(255, 255, 0, 0.6)';
                case 'Marechal':
                  return 'rgba(255, 165, 0, 0.6)';
                default:
                  return 'rgba(128, 128, 128, 0.6)';
              }
            }),
          },
        ],
      };


    


      const itemData = {
        labels: [
          'Design',
          'Ergonomia',
          'Ventilação',
          'Assento',
          'Iluminação',
          'Pontualidade',
          'Limpeza',
          'Conforto',
          'Custo',
          'Atendimento',
        ],
        datasets: Object.keys(empresas).map((empresa) => ({
          label: empresa,
          data: [
            lote > 0 ? (empresas[empresa].design / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].ergonomia / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].ventilacao / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].assento / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].iluminacao / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].pontualidade / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].limpeza / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].conforto / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].custo / lote).toFixed(1) : 0,
            lote > 0 ? (empresas[empresa].atendimento / lote).toFixed(1) : 0,
          ],
          backgroundColor:
            empresa === 'Marechal'
              ? 'rgba(255, 165, 0, 0.6)'
              : empresa === 'Pioneira'
              ? 'rgba(255, 255, 0, 0.6)'
              : empresa === 'Piracicabana'
              ? 'rgba(0, 128, 0, 0.6)'
              : empresa === 'Pioneira/BRT'
              ? 'rgba(255, 255, 0, 0.6)'
              : empresa === 'São José/BsBus'
              ? 'rgba(144, 238, 144, 0.6)'
              : 'rgba(0, 0, 255, 0.6)', // Azul para Urbi
        })),
      };
      
      // Atualizando o estado com os dados do gráfico
      setChartData(chartData);
      setItemData(itemData);
      setTotalAvaliacoes(querySnapshot.size);
      setTotalAvaliacoes(totalAvaliacoesCount); // Define o total de avaliações
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
        max: 10,
        ticks: {
          stepSize: 1,
          callback: (value) => value.toFixed(1),
        },
      },
    },
    plugins: {
      legend: {
        display: true,  // Exibe a legenda, se necessário
      },
      title: {
        display: true,
        text: `Ranking Geral de Empresas de Transporte (Total Avaliações: ${totalAvaliacoes} )`,
      },
    },
  }), [totalAvaliacoes]);
  

  const itemOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
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
