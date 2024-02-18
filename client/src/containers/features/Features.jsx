import React from "react";
import Feature from "../../components/feature/Feature";
import "./features.css";

const featuresData = [
  {
    title: 'Optimización del Cuidado del Paciente',
    text: 'Mediante la integración de tecnología avanzada, VitalIA mejora continuamente la atención al paciente, permitiendo tratamientos personalizados y seguimientos precisos.',
  },
  {
    title: 'Integración de la IA en la Salud',
    text: 'VitalIA lidera la transformación digital en el sector salud, empleando la inteligencia artificial para anticiparse a las necesidades de los pacientes y optimizar la gestión hospitalaria.',
  },
  {
    title: 'Acceso Instantáneo a Información Vital',
    text: 'La plataforma de VitalIA asegura que los profesionales médicos tengan acceso inmediato a registros médicos completos, facilitando decisiones rápidas y basadas en datos.',
  },
  {
    title: 'Innovación en Diagnóstico y Tratamiento',
    text: 'Con VitalIA, el futuro del diagnóstico y tratamiento médico es ahora. Utilizando análisis predictivo, mejora significativamente las estrategias de prevención y cura.',
  },
];


const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">
        El Futuro de la Salud Comienza Hoy. Únete a la Revolución de VitalIA.
      </h1>
      <p>
        Solicita tu Acceso Anticipado y Transforma el Cuidado de la Salud Ahora.
      </p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
