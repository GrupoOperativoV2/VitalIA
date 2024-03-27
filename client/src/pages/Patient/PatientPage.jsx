import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import { Dashboard } from "./containers/Dashboard.jsx";
import { MedicalDiscoveryTab } from "./containers/MedicalDiscoveryTab.jsx";
import { MedicalHistoryForm } from "./containers/MedicalHistoryForm.jsx";
import { useAuth } from "../../context/authContext";

// Contendores principales
const PatientPageContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BodyContainer = styled.div`
  flex-grow: 1;
  background: ${({ theme }) => theme.bg};
  overflow: auto;
`;

const ContentSidebarContainer = styled.div`
  width: 400px;
  height: 100vh;
  background-color: #f5f5f5;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Contenedores popup
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) =>
    width || "500px"}; // Ajuste el ancho según sea necesario
  max-height: 80vh; // Ajusta la altura máxima según sea necesario
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 20px;
  display: ${({ show }) => (show ? "block" : "none")};
  overflow-y: auto; // Habilita el desplazamiento vertical si el contenido excede la altura máxima
  transition: opacity 0.3s ease, transform 0.3s ease;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: ${({ show }) => (show ? "block" : "none")};
`;

// Estilos para el encabezado del Popup
const WelcomeHeader = styled.h1`
  font-size: 32px;
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Popup = ({ show, onClose, title, children, customStyle, width }) => (
  <>
    <Overlay show={show} />
    <PopupContainer show={show} customStyle={customStyle} width={width}>
      {title && <WelcomeHeader>{title}</WelcomeHeader>}
      {children}
      <CloseButton onClick={onClose}>Cerrar</CloseButton>
    </PopupContainer>
  </>
);
const CloseButton = styled.button`
  display: block;
  margin: auto;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export function PatientPage() {
  const { user, isAuthenticated    } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [historyPopupVisible, setHistoryPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const toggleHistoryPopup = () => {
    setHistoryPopupVisible(!historyPopupVisible);
  };

  useEffect(() => {
    // Verifica si el usuario está autenticado y si es la primera vez que accede después de registrarse
    const isFirstLogin = localStorage.getItem('isFirstLogin');

    if (isAuthenticated && isFirstLogin) {
      setPopupVisible(true);  
      // Elimina la bandera para no mostrar el popup después del primer inicio de sesión
      localStorage.removeItem('isFirstLogin');
    }
  }, [isAuthenticated]);

  return (
    <PatientPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        {/* <button onClick={togglePopup}>Mostrar popup</button> */}

        <MedicalDiscoveryTab />

        {/* Funcionamiento del popup */}

        {/* Popup de bienvenida */}
        {popupVisible && (
          <Popup
            show={popupVisible}
            onClose={togglePopup}
            title={
              user
                ? `Bienvenido, ${user.username}!`
                : "Bienvenido a nuestra aplicación!"
            }
          >
            <WelcomeMessage>
              Estamos encantados de tenerte aquí. Completa tu historial médico para comenzar.
            </WelcomeMessage>
            <ActionButton
              onClick={() => {
                togglePopup();
                toggleHistoryPopup();
              }}
            >
              Completar Historial Médico
            </ActionButton>
          </Popup>
        )}


        {/* Popup del historial médico */}
        <Popup
          show={historyPopupVisible}
          onClose={toggleHistoryPopup}
          title="Historial Médico"
          width="600px" // Puedes ajustar esto según el diseño que desees
          customStyle={`
    background-color: #f0f0f0; 
    border-radius: 20px; 
    padding: 30px;
  `}
        >
          <MedicalHistoryForm />
        </Popup>
      </BodyContainer>

      <ContentSidebarContainer>
        <Dashboard user={user} />
      </ContentSidebarContainer>
    </PatientPageContainer>
  );
}
