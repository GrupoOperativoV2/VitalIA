import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import Chatbot from "./Chatbot.jsx";
const PatientPageContainer = styled.div`
  display: grid;
  grid-template-columns: 90px auto; // 90px para el sidebar, ajusta según tu diseño
  background: ${({ theme }) => theme.bgtotal}; // Asegúrate de que el tema está definido o elimina esta referencia
  transition: all 0.3s;
  justify-items: normal;
  &.active {
    grid-template-columns: 300px auto; // Aumenta el ancho del sidebar si es necesario
  }
  color: ${({ theme }) => theme.text}; // Asegúrate de que el tema está definido o elimina esta referencia
  height: 100vh;
`;

const PositionedButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

export function DoctorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <PatientPageContainer className={sidebarOpen ? "active" : ""}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div> {/* Contenido principal aquí, ajusta según sea necesario */}
        <h1>Bienvenido Doctor</h1>
        <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
        {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
      </div>
    </PatientPageContainer>
  );
}
