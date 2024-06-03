import React from 'react';
import possibilityImage from '../../assets/toast.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">Conoce a Toast <br /> el nuevo asistente personal para tu salud</h1>
      <p>Toast te brindará recomendaciones u observaciones personalizadas con el fin de <strong>procurar tu bienestar</strong>, además de poder responder preguntas sobre salud en general.
      Sumérgete en una <strong>vida más saludable e inteligente con Toast </strong></p>
    </div>
  </div>
);

export default Possibility;
