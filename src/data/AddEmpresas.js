// src/AddEmpresas.js
import React, { useEffect } from 'react';
import { db } from './firebaseConfig';  // Importando a configuração do Firebase
import { collection, setDoc, doc } from 'firebase/firestore';  // Métodos Firestore

const AddEmpresas = () => {
  // Função que cria as empresas no Firestore
  const addEmpresas = async () => {
    const empresas = [
      { id: 'piracicabana', nome: 'Piracicabana' },
      { id: 'pioneira', nome: 'Pioneira' },
      { id: 'marechal', nome: 'Marechal' },
      { id: 'pioneiraBRT', nome: 'Pioneira/BRT' },
      { id: 'saoJoseBsBus', nome: 'São José/BsBus' },
      { id: 'urbi', nome: 'Urbi' },
    ];

    try {
      // Para cada empresa, adiciona ao Firestore
      empresas.forEach(async (empresa) => {
        await setDoc(doc(db, 'empresas', empresa.id), { nome: empresa.nome });
      });
      console.log("Empresas adicionadas com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar empresas: ", e);
    }
  };

  // Executa a função ao carregar o componente
  useEffect(() => {
    addEmpresas();  // Executa a função ao carregar o componente
  }, []);

  return (
    <div>
      <h1>Adicionando Empresas ao Firestore...</h1>
    </div>
  );
};

export default AddEmpresas;
