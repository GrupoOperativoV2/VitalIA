// Importaciones necesarias
import React from 'react';
import styled from 'styled-components';

// Definición de estilos
const Section = styled.div`
  background-color: #f0f8ff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

// Definición del componente
const SampleReminder = () => (
  <Section>
    <Title>Recordatorios de Tomas de Muestra</Title>
    <p><strong>Tipo de muestra:</strong> Sangre</p>
    <p><strong>Fecha y hora:</strong> 2024-04-03 07:30</p>
    <p><strong>Instrucciones:</strong> Ayuno total de 8 horas previas</p>
    <p><strong>Ubicación:</strong> Laboratorio Central</p>
  </Section>
);

// Exportación del componente
export { SampleReminder };
