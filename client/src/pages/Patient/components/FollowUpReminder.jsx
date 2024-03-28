// Importaciones necesarias
import React from 'react';
import styled from 'styled-components';

// Definición de estilos
const Section = styled.div`
  background-color: #fff0f6;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

// Definición del componente
const FollowUpReminder = () => (
  <Section>
    <Title>Recordatorios de Seguimientos</Title>
    <p><strong>Tipo de seguimiento:</strong> Consulta de rutina</p>
    <p><strong>Fecha y hora:</strong> 2024-04-15 10:00</p>
    <p><strong>Notas:</strong> Llevar resultados de exámenes previos</p>
  </Section>
);

// Exportación del componente
export { FollowUpReminder };
