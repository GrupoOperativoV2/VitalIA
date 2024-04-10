import React, { useState } from "react";
import styled from "styled-components";
import { DoctorRegister } from "../Components/DoctorRegister.jsx";
// Importa los otros formularios/componentes que necesitas mostrar

export function Personal() {
    const [activeTab, setActiveTab] = useState("doctors"); // Estado inicial

    return(
        <ProfileContainer>
            <NavContainer>
                <TabButton onClick={() => setActiveTab("doctors")}>Doctores</TabButton>
                <TabButton onClick={() => setActiveTab("patients")}>Pacientes</TabButton>
                <TabButton onClick={() => setActiveTab("nurses")}>Enfermeros</TabButton>
                <TabButton onClick={() => setActiveTab("nurses")}>Administrativo</TabButton>
            </NavContainer>
            <Content>
                {activeTab === "doctors" && <DoctorRegister />}
                {/* Renderizar los componentes para pacientes y enfermeros según activeTab */}
                </Content>
        </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambiar a columna
  padding: 20px;
`;



const Content = styled.div`
  flex-grow: 1;
  display: flex;
`;

const TabButton = styled.button`
  display: block;
  padding: 10px;
  width: 100%;
  border: none;
  background-color: #f0f0f0;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 70%; // Asegurar que ocupe todo el ancho disponible
`;
