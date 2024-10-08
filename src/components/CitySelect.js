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
  );
};

export default CitySelect;
