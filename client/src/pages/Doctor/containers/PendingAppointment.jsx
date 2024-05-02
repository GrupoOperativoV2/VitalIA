import React from "react";
import styled from "styled-components";

const appointmentData = [
  {
    patientName: "Juan",
    symptoms: "Mi corazón late muy rápido",
    reason: "palpitaciones frecuentes y rápidas",
    date: "2024-04-30",
    time: "16:56",
    status: "scheduled",
  },
  {
    patientName: "Ana",
    symptoms: "Dolor constante en la espalda",
    reason: "dolor crónico debido a la postura",
    date: "2024-05-01",
    time: "10:30",
    status: "scheduled",
  },
  {
    patientName: "Ana",
    symptoms: "Dolor constante en la espalda",
    reason: "dolor crónico debido a la postura",
    date: "2024-05-01",
    time: "10:30",
    status: "scheduled",
  }
  // Puedes añadir más citas aquí
];

export function PendingAppointment() {
  return (
    <AppointmentContainer>
      <Title>Citas pendientes</Title>
      {appointmentData.map((appointment) => (
        <DataField key={appointment.id}>
          <Label>Paciente:</Label> {appointment.patientName}
          <DataField>
            <Label>Síntomas:</Label> {appointment.symptoms}
          </DataField>
          <DataField>
            <Label>Motivo de la cita:</Label> {appointment.reason}
          </DataField>
          <DataField>
            <Label>Fecha:</Label> {appointment.date}
          </DataField>
          <DataField>
            <Label>Hora:</Label> {appointment.time}
          </DataField>
          <DataField>
            <Label>Estado:</Label> {appointment.status}
          </DataField>
          <DataField>
            <Label>Creada el:</Label> {appointment.createdAt}
          </DataField>
          <DataField>
            <Label>Actualizada el:</Label> {appointment.updatedAt}
          </DataField>
        </DataField>
      ))}
    </AppointmentContainer>
  );
}

const AppointmentContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DataField = styled.div`
  margin: 10px 0;
  color: #333;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #34495e;
  text-align: center;
  margin-top: 20px;
  background-color: #f0f4f8;
  border-radius: 5px;
  padding: 10px 0;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
`;
