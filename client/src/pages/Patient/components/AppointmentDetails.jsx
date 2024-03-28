
import React from 'react';
import styled from 'styled-components';

const AppointmentContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
`;

const AppointmentTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const AppointmentInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const AppointmentDetails = () => {
  // Datos de ejemplo
  const appointment = {
    nombre: "Juan Pérez",
    fecha: "2024-04-01 10:00",
    consultorio: "Consultorio 5",
    telefono: "555-1234-567",
    email: "juan.perez@example.com",
    motivo: "Consulta general",
    historial: "Historial médico relevante"
  };

  return (
    <AppointmentContainer>
      <AppointmentTitle>{appointment.motivo}</AppointmentTitle>
      <AppointmentInfo>Nombre: {appointment.nombre}</AppointmentInfo>
      <AppointmentInfo>Fecha y Hora: {appointment.fecha}</AppointmentInfo>
      <AppointmentInfo>Consultorio: {appointment.consultorio}</AppointmentInfo>
      <AppointmentInfo>Teléfono: {appointment.telefono}</AppointmentInfo>
      <AppointmentInfo>Email: {appointment.email}</AppointmentInfo>
      <AppointmentInfo>Historial médico: {appointment.historial}</AppointmentInfo>
    </AppointmentContainer>
  );
};

export { AppointmentDetails };
