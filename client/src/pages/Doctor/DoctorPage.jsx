import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import { PendingAppointments } from "./containers/PendingAppointments.jsx";
import { ContainerDoctor } from "./containers/ContainerDoctor.jsx";
import Chatbot from "../Patient/Chatbot.jsx";
import { useAuth } from "../../context/authContext";  
import {NoticeDoctor} from './containers/NoticeDoctor.jsx'

export function DoctorPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

 
  return (
    <DoctorPageContainer>

      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>

      <BodyContainer>
        <ContainerDoctor user={user}/>
          <NoticeDoctor/>
      </BodyContainer>


      <ContentSidebarContainer>
        <PendingAppointments user={user}/>
      </ContentSidebarContainer>


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
  width: ${({ isOpen }) => (isOpen ? "400px" : "80px")};
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

 const ContentSidebarContainer = styled.div`
    width: 500px;
    height: 100vh;
    background-color: #f5f5f5;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
  `;
