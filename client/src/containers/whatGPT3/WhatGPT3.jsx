import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="vitalIA">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="¿Qué es VitalIA?" text="Juntos, en este viaje de innovación, nos encontramos en la encrucijada de la tecnología y la compasión. Cada avance que hacemos es un paso hacia adelante, escuchando las necesidades aún no expresadas de la salud. Su visión no se ve empañada por limitaciones pasadas, pues cada solución que ofrecemos rompe las barreras de lo convencional. En la unión de mentes curiosas y corazones comprometidos, encontramos nuestro camino, abriendo puertas a un futuro donde la salud y la tecnología se encuentran en perfecta armonía." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Las posibilidades están más allá de tu imaginación.</h1>
      <p></p>
    </div>
    <div className="gpt3__whatgpt3-container">
    <Feature title="Monitoreo Continuo" text="Unidos en nuestra misión, transformamos el cuidado continuo de pacientes, ofreciendo un seguimiento detallado y proactivo, día y noche." />
    <Feature title="Gestión de Registros Médicos" text="Revolucionamos la administración de registros médicos, facilitando un acceso seguro y eficiente a la información vital, mejorando así la toma de decisiones clínicas." />
    <Feature title="Diagnóstico Asistido por IA" text="Nuestra avanzada inteligencia artificial apoya a los médicos en el diagnóstico y tratamiento, abriendo nuevas vías para la atención personalizada y precisa." />
    </div>
  </div>
);

export default WhatGPT3;
