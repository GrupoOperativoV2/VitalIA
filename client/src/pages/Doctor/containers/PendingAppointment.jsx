import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/authContext";

export function PendingAppointment() {
  const { getAppointmentsDoctor, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const doctorId = user ? user.id : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (doctorId) {
          const appointmentsData = await getAppointmentsDoctor(doctorId);
          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorId, getAppointmentsDoctor]);

  if (!doctorId) {
    return <p>No se ha encontrado el ID del doctor.</p>;
  }

  return (
    <AppointmentsContainer>
      <Title>Citas pendientes</Title>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <AppointmentContainer key={index}>
            <AppointmentTitle>Número de historial: {appointment.patientId}</AppointmentTitle>
            <AppointmentInfo>Síntomas: {appointment.symptoms}</AppointmentInfo>
            <AppointmentInfo>Motivo de la cita: {appointment.reason}</AppointmentInfo>
            <AppointmentInfo>Fecha: {new Date(appointment.date).toLocaleDateString()}</AppointmentInfo>
            <AppointmentInfo>Hora: {appointment.time}</AppointmentInfo>
            <AppointmentInfo>Estado: {appointment.status}</AppointmentInfo>
          </AppointmentContainer>
        ))
      ) : (
        <p>No hay citas pendientes.</p>
      )}
    </AppointmentsContainer>
  );
}

const AppointmentsContainer = styled.div`
  height: 100vh; // Se extiende a todo lo largo de la pantalla
  overflow-y: auto;  // Habilita el desplazamiento vertical
  padding: 20px;  // Aumenta el padding
  background-color: #f4f4f4;
  border-radius: 12px;  // Incrementa el borde redondeado
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);  // Aumenta la sombra

  /* Estilo de la barra de desplazamiento */
  &::-webkit-scrollbar {
    width: 16px;  // Ancho de la barra de desplazamiento
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;  // Color de fondo de la pista de la barra de desplazamiento
  }

  &::-webkit-scrollbar-thumb {
    background: #888;  // Color del pulgar de la barra de desplazamiento
    border-radius: 8px;  // Redondea las esquinas del pulgar
    border: 4px solid #f4f4f4;  // Espacio alrededor del pulgar para darle un efecto de separación
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;  // Color del pulgar al pasar el ratón por encima
  }
`;

const AppointmentContainer = styled.div`
  background-color: #fff;
  padding: 20px;  // Aumenta el padding
  margin-bottom: 15px;  // Aumenta el margen inferior
  border-radius: 10px;  // Incrementa el borde redondeado
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);  // Aumenta la sombra
  transition: transform 0.2s;  // Añade una transición para un efecto de hover

  &:hover {
    transform: scale(1.02);  // Agranda ligeramente el contenedor al pasar el ratón por encima
  }
`;

const AppointmentTitle = styled.h3`
  margin: 0 0 10px 0;  // Añade un margen inferior
  color: #2c3e50;  // Cambia el color a un tono más oscuro
  font-size: 18px;  // Aumenta el tamaño de la fuente
  font-weight: bold;  // Hace el texto en negrita
`;

const AppointmentInfo = styled.p`
  margin: 8px 0;  // Aumenta el margen superior e inferior
  font-size: 16px;  // Aumenta el tamaño de la fuente
  color: #34495e;  // Cambia el color a un tono más oscuro
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text || '#333'};
  margin-bottom: 20px;  // Aumenta el margen inferior
  text-align: center;
`;
