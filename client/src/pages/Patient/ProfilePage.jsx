import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import { ProfilePatient } from "./containers/ProfilePatient.jsx";
import { useAuth } from "../../context/authContext";

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



export function ProfilePage() {
  const { getMedicalHistory , user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);


  useEffect(() => {
    if (user) {
        getMedicalHistory(user.id)
            .then(history => {
                // console.log('Historial Médico:', history);
                // Procesa los datos del historial médico como sea necesario
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
        <ProfilePatient/>
      </BodyContainer>
    </PatientPageContainer>
  );
}
