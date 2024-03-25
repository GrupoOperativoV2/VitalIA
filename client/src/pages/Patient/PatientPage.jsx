import React, { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";

const PatientPageContainer = styled.div`
  display: flex; // Cambiado a flex para un mejor control del layout
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 100vh;
`;

const BodyContainer = styled.div`
  flex-grow: 1; // Ocupa el espacio restante
  background: ${({ theme }) =>
    theme.bg}; // Asume que tienes un tema con color de fondo
  transition: all 0.3s;
  overflow: auto; // Para el desplazamiento del contenido si es necesario
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: white;
  border: 2px solid #000;
  z-index: 100;
  padding: 20px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const Popup = ({ show, onClose, children }) => (
  <PopupContainer show={show}>
    {children}
    <button onClick={onClose}>Cerrar</button>
  </PopupContainer>
);

export function PatientPage() {
  const { isAuthenticated, logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <PatientPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <h1>Ponganse a chambear 1</h1>

        <h1>Ponganse a chambear 1</h1>
        <h1>Ponganse a chambear 1</h1>
        <h1>Ponganse a chambear 1</h1>
        <h1>Ponganse a chambear 1</h1>

        <button onClick={togglePopup}>Mostrar popup</button>

        <Popup show={popupVisible} onClose={togglePopup}>
          <div>
            {user ? (
              <h1>Bienvenido, {user.username}!</h1>
            ) : (
              <h1>Bienvenido a nuestra aplicación!</h1>
            )}
          </div>
        </Popup>
      </BodyContainer>
    </PatientPageContainer>
  );
}
