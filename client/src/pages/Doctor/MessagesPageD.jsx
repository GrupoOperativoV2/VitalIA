import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const DoctorPageContainer = styled.div`
    display: flex;
  transition: all 0.3s;
  height: 100vh;
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 1s ease-out;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 1000px;
   animation: ${slideIn} 0.5s ease-out;
`;

const BodyContainer = styled.div`
  flex-grow: 1; // Ocupa el espacio restante
  background: ${({ theme }) =>
    theme.bg}; // Asume que tienes un tema con color de fondo
  transition: all 0.3s;
  overflow: auto; // Para el desplazamiento del contenido si es necesario
`;
