// Importaciones necesarias
import React from 'react';
import styled from 'styled-components';

// Definición de estilos
const Section = styled.div`
  background-color: #eef1f6;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

// Definición del componente
const MedicationReminder = () => (
  <Section>
    <Title>Recordatorios de Medicamentos</Title>
    <p><strong>Medicamento:</strong> Paracetamol</p>
    <p><strong>Dosis:</strong> 500mg</p>
    <p><strong>Frecuencia:</strong> Cada 8 horas</p>
    <p><strong>Horario:</strong> 08:00, 16:00, 00:00</p>
    <p><strong>Duración:</strong> 5 días</p>
  </Section>
);

export { MedicationReminder };
