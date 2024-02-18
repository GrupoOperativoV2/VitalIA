import React from 'react';
import possibilityImage from '../../assets/vitalia.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">Las posibilidades <br /> están más allá de tu imaginación</h1>
      <p>Transformando el sector salud con innovación y tecnología, VitalIA abre nuevas puertas para el cuidado del paciente. Desde diagnósticos precisos hasta tratamientos personalizados, nuestra plataforma eleva la experiencia tanto de profesionales médicos como de pacientes.</p>
    </div>
  </div>
);

export default Possibility;
