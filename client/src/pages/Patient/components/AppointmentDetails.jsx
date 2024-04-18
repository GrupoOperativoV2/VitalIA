import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppointments } from "../../../context/appointmentContext";

const AppointmentDetails = ({ userID }) => {
  const { appointments, loadUserAppointments, loading, error } = useAppointments();

  useEffect(() => {
    if (userID) {
      loadUserAppointments(userID);
    }
  }, [userID, loadUserAppointments]);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error loading appointments: {error}</p>;
  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
      <AppointmentsContainer>
      {appointments.map((appointment, index) => (
        <AppointmentContainer key={index}>
          <AppointmentTitle>Cita {index + 1}</AppointmentTitle>
          <AppointmentTitle>Motivo {appointment.details}</AppointmentTitle>
          <AppointmentInfo>Fecha y Hora: {new Date(appointment.date).toLocaleDateString()} {appointment.time}</AppointmentInfo>
          <AppointmentInfo>Estado {appointment.status}</AppointmentInfo>
          {/* <AppointmentInfo>ID del Paciente: {appointment.patientId}</AppointmentInfo>
          Si tienes más detalles específicos que mostrar, añádelos aquí */} 
        </AppointmentContainer>
      ))}
    </AppointmentsContainer>
  );
};

export { AppointmentDetails };

const AppointmentsContainer = styled.div`
  max-height: 400px;  // Ajusta esto según tus necesidades
  overflow-y: auto;  // Habilita el desplazamiento vertical
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

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