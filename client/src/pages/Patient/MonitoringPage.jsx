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
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [history, setHistory] = useState(null);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    const initialize = async () => {
      const historyData = await getMedicalHistory(user?.id);
      setHistory(historyData);
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
    </PatientPageContainer>
  );
}

const PatientsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin: 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const PatientItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6f0ff;
  }
`;

const PatientAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const PatientName = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

const ChatbotContainer = styled.div`
  width: 100%; // Toma todo el ancho disponible
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center; /* Centra los elementos verticalmente */
  align-items: center; 
  flex-direction: column;
`;
