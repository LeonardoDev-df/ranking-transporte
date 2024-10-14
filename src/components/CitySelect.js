// CitySelect.js
import React from 'react';

const CitySelect = ({ city, setCity }) => {
  return (
    <div className="form-field">
      <label>Cidade onde mora:</label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      >
        <option value="">Selecione sua cidade</option>
        <option value="AGUA QUENTE">AGUA QUENTE</option>
        <option value="ARAPOANGA">ARAPOANGA</option>
        <option value="AGUAS CLARAS">AGUAS CLARAS</option>
        <option value="ARNIQUEIRAS">ARNIQUEIRAS</option>
        <option value="BRAZLANDIA">BRAZLANDIA</option>
        <option value="CANDANGOLANDIA">CANDANGOLANDIA</option>
        <option value="CEILANDIA">CEILANDIA</option>
        <option value="CRUZEIRO">CRUZEIRO</option>
        <option value="FERCAL">FERCAL</option>
        <option value="GAMA">GAMA</option>
        <option value="GUARA">GUARA</option>
        <option value="ITAPOA">ITAPOA</option>
        <option value="JARDIM BOTANICO">JARDIM BOTANICO</option>
        <option value="LAGO NORTE">LAGO NORTE</option>
        <option value="LAGO SUL">LAGO SUL</option>
        <option value="NUCLEO BANDEIRANTE">NUCLEO BANDEIRANTE</option>
        <option value="PARANOA">PARANOA</option>
        <option value="PARK WAY">PARK WAY</option>
        <option value="PLANALTINA">PLANALTINA</option>
        <option value="PLANO PILOTO">PLANO PILOTO</option>
        <option value="RECANTO DAS EMAS">RECANTO DAS EMAS</option>
        <option value="RIACHO FUNDO">RIACHO FUNDO</option>
        <option value="SAMAMBAIA">SAMAMBAIA</option>
        <option value="SANTA MARIA">SANTA MARIA</option>
        <option value="SAO SEBASTIAO">SAO SEBASTIAO</option>
        <option value="SCIA/ESTRUTURAL">SCIA/ESTRUTURAL</option>
        <option value="SOBRADINHO">SOBRADINHO</option>
        <option value="SON NASCENTE E POR DO SOL">SON NASCENTE E POR DO SOL</option>
        <option value="TAGUATINGA">TAGUATINGA</option>
        <option value="VARJAO">VARJAO</option>
        <option value="VICENTE PIRES">VICENTE PIRES</option>
        <option value="Outros">Outros</option>
      </select>
    </div>
  );
};

export default CitySelect;
