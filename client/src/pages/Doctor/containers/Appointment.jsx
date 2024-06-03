import React from "react";
import styled from "styled-components";

export function Appointment({ appointments }) {
  const handleFinishAppointment = (appointmentId) => {
    // Aquí puedes manejar la lógica para finalizar la cita, por ejemplo, hacer una llamada a una API
    console.log(`Finalizar cita con ID: ${appointmentId}`);
  };

  return (
    <AppointmentList>
      {appointments.length === 0 ? (
        <p>No hay citas disponibles.</p>
      ) : (
        appointments.map((appointment) => (
          <AppointmentItem key={appointment._id}>
            <AppointmentDetails>
              <p><strong>ID de Paciente:</strong> {appointment.patientId}</p>
              <p><strong>Síntomas:</strong> {appointment.symptoms}</p>
              <p><strong>Razón:</strong> {appointment.reason}</p>
              <p><strong>Fecha:</strong> {new Date(appointment.date).toLocaleString()}</p>
            </AppointmentDetails>
            <FinishButton onClick={() => handleFinishAppointment(appointment._id)}>
              Finalizar
            </FinishButton>
          </AppointmentItem>
        ))
      )}
    </AppointmentList>
  );
}

const AppointmentList = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AppointmentItem = styled.div`
  background-color: #fff;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  p {
    margin: 5px 0;
  }

  strong {
    color: #333;
  }
`;

const AppointmentDetails = styled.div`
  flex: 1;
`;

const FinishButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;
