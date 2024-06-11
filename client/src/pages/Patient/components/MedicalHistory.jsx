import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChangeFrom } from "./ChangeFrom";
import { AppointmentFrom } from "./AppointmentFrom";
import { useAuth } from "../../../context/authContext";

export const MedicalHistory = ({ patientInfo }) => {
  const { DoctorSearch } = useAuth();
  const [activeTab, setActiveTab] = useState("cita"); 
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    DoctorSearch()
      .then((doctorsList) => {
        setDoctors(doctorsList);
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
      });
  }, [DoctorSearch]);


  return (
    <Section>
      <NavContainer>
        <TabButton
          onClick={() => setActiveTab("cita")}
          className={activeTab === "cita" ? "active" : ""}
        >
          Cita
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("cambios")}
          className={activeTab === "cambios" ? "active" : ""}
        >
          Cambios
        </TabButton>
      </NavContainer>

      {activeTab === "cita" && (
        <div>
         <AppointmentFrom doctors={doctors} historyId = {patientInfo._id}/>
        </div>
      )}

      {activeTab === "cambios" && <ChangeFrom patientInfo={patientInfo}/>}
    </Section>
  );
};

const TabButton = styled.button`
  display: block;
  padding: 10px;
  width: 100%;
  border: none;
  background-color: #f0f0f0;
  color: #333; // Color del texto
  font-weight: bold; 
  text-transform: uppercase; // Texto en mayúsculas para un look más moderno
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007bff; // Color de fondo al pasar el ratón
    color: white; // Color de texto al pasar el ratón
  }

  &.active {
    // Estilo para el botón de la pestaña activa
    background-color: #0056b3;
    color: white;
    border-bottom: 3px solid #ffdd57; // Agrega un borde inferior para destacar la pestaña activa
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 100%; // Utiliza todo el ancho disponible para la barra de pestañas
`;

const Section = styled.section`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;


