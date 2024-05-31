import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import { DoctorChat } from "./containers/DoctorChat.jsx";

export function MessagesPageD() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <DoctorPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <DoctorChat />
      </BodyContainer>
    </DoctorPageContainer>
  );
}

const DoctorPageContainer = styled.div`
  display: flex; // Cambiado a flex para un mejor control del layout
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 1000px;
`;

const BodyContainer = styled.div`
  flex-grow: 1; // Ocupa el espacio restante
  background: ${({ theme }) =>
    theme.bg}; // Asume que tienes un tema con color de fondo
  transition: all 0.3s;
  overflow: auto; // Para el desplazamiento del contenido si es necesario
`;
