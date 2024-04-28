import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import Chatbot from "./Chatbot.jsx";
import { ProfilePatient } from "./containers/ProfilePatient.jsx";
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
  flex-grow: 1;
  background: ${({ theme }) => theme.bg};
  transition: all 0.3s;
  overflow: auto;
`;

export function ProfilePage() {
  const { getMedicalHistory, user } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null); // Nuevo estado para el historial médico
  const [history, setHistory] = useState(null);


  useEffect(() => {
    const initialize = async () => {
      const historyData = await getMedicalHistory(user?.id);
      setHistory(historyData); // Guarda el historial médico en el estado
    };

    initialize();
  }, [getMedicalHistory]);
  useEffect(() => {
    if (user) {
      getMedicalHistory(user.id)
        .then(history => {
          setPatientInfo(history); // Almacenar el historial médico en el estado
        })
        .catch(error => {
          console.error('Error al obtener el historial médico:', error);
        });
    }
  }, [user, getMedicalHistory]);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <PatientPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <ProfilePatient patientInfo={patientInfo} />
        {/* <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
        {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} history={history} />} */}
      </BodyContainer>
    </PatientPageContainer>
  );
}
