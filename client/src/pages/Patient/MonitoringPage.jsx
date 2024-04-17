import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import Chatbot from "./Chatbot.jsx";
import { useAuth } from "../../context/authContext";


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

const PatientPageContainer = styled.div`
  display: flex; 
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



export function MonitoringPage() {
  const { getMedicalHistory } = useAuth();
  const { isAuthenticated, logout, user } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [history, setHistory] = useState(null);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    const initialize = async () => {
      const historyData = await getMedicalHistory(user?.id);
      setHistory(historyData); // Guarda el historial médico en el estado
    };

    initialize();
  }, [getMedicalHistory]);


  return (
    <PatientPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
      
      </BodyContainer>
      
      <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
        {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} history={history} />}
    </PatientPageContainer>
  );
}
