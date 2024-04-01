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
  const { isAuthenticated, logout, user, getMedicalHistoryPhoto } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    if (user) {
        getMedicalHistoryPhoto(user.id)
            .then(photo => setPhotoUrl(photo))
            .catch(error => console.error('Error al obtener la foto:', error));
    }
}, [user]);


  return (
    <PatientPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
      {photoUrl && (
      <img src={photoUrl} alt="Patient's Medical History Photo" />
    )}
      </BodyContainer>
      
      <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
        {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
    </PatientPageContainer>
  );
}
