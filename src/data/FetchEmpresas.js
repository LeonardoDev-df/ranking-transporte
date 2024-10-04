// src/FetchEmpresas.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FetchEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const querySnapshot = await getDocs(collection(db, 'empresas'));
      const empresasList = [];
      querySnapshot.forEach((doc) => {
        empresasList.push({ id: doc.id, ...doc.data() });
      });
      setEmpresas(empresasList);
    };

    fetchEmpresas();
  }, []);

  return (
    <div>
      <h1>Empresas no Firestore:</h1>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            {empresa.id}: {empresa.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchEmpresas;
