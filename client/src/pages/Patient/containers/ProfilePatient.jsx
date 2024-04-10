import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PersonalInfo } from "../components/PersonalInfo";
import { MedicalHistory } from "../components/MedicalHistory";
import { HealthGoals } from "../components/HealthGoals";
import { InterestsHobbies } from "../components/InterestsHobbies";
import { PersonalBlog } from "../components/PersonalBlog";

export function ProfilePatient({ patientInfo }) {
  const [activeTab, setActiveTab] = useState("medicalHistory");

  if (!patientInfo) {
    return <div>Cargando información del paciente...</div>;
  }

  const info = {
    blogPosts: [
      {
        title: "Mi Viaje con la Salud",
        content: "Hoy quiero compartir mi experiencia ...",
      },
      {
        title: "Aprendiendo a Cocinar Saludable",
        content: "Recientemente he empezado a explorar ...",
      },
      // ...otros posts
    ],

    interests: [
      { name: "Literatura" },
      { name: "Música Clásica" },
      // ...otros intereses
    ],
    hobbies: [
      { name: "Ajedrez", level: "Intermedio" },
      { name: "Ciclismo", level: "Avanzado" },
      { name: "Pintura", level: "Principiante" },
      // ...otros hobbies
    ],
    hobbyImages: [
      {
        url: "https://example.com/path/to/hobby-image1.jpg",
        altText: "Imagen de Ajedrez",
      },
      {
        url: "https://example.com/path/to/hobby-image2.jpg",
        altText: "Imagen de Ciclismo",
      },
      // ...otras imágenes de hobbies
    ],
    hobbiesNotes:
      "He estado practicando ajedrez los fines de semana y participando en competiciones locales. El ciclismo me ayuda a mantenerme en forma y disfruto explorando rutas escénicas. Recientemente, comencé a aprender pintura para explorar mi lado creativo.",

    healthGoals: [
      { name: "Perder Peso", description: "Perder 5 kg", progress: 60 },
      {
        name: "Ejercicio Regular",
        description: "Correr 3 veces a la semana",
        progress: 75,
      },
      {
        name: "Dieta Saludable",
        description: "Comer 5 porciones de fruta y verdura al día",
        progress: 80,
      },
      // ...otros objetivos
    ],
    achievements: [
      "5 km de carrera completada",
      "Primer mes sin tabaco",
      "Participó en una maratón local",
      // ...otros logros
    ],
    actionPlan: [
      {
        title: "Plan para Perder Peso",
        steps: [
          "Consultar con un nutricionista",
          "Crear un plan de comidas semanal",
          "Hacer ejercicio cardiovascular 30 minutos al día",
          // ...otros pasos
        ],
      },
      // ...otros planes de acción
    ],
    reminders: [
      { title: "Tomar medicación", time: "08:00 AM", frequency: "Diario" },
      {
        title: "Hora de correr",
        time: "07:00 PM",
        frequency: "Lunes, Miércoles y Viernes",
      },
      // ...otros recordatorios
    ],
    medicalHistory: [
      {
        title: "Consulta Médica - 12/03/2024",
        description: "Nombre del Médico: Dr. Smith\nDiagnóstico: ...",
      },
      // Más registros pueden ser añadidos aquí siguiendo el mismo formato
    ],

    // ... cualquier otro dato relevante del paciente
  };

  return (
    <ProfileContainer>
      <NavContainer>
        <TabButton onClick={() => setActiveTab("medicalHistory")}>
          Historial Médico
        </TabButton>
        <TabButton onClick={() => setActiveTab("blog")}>Blog</TabButton>
        <TabButton onClick={() => setActiveTab("healthGoals")}>
          Logros y Objetivos de Salud
        </TabButton>
        <TabButton onClick={() => setActiveTab("interestsHobbies")}>
          Intereses y Hobbies
        </TabButton>
      </NavContainer>
      <Content>
        <div style={{ flex: 1 }}>
          {activeTab === "medicalHistory" && (
            <MedicalHistory patientInfo={patientInfo} info={info} />
          )}
          {activeTab === "blog" && <PersonalBlog patientInfo={info} />}
          {activeTab === "healthGoals" && <HealthGoals patientInfo={info} />}
          {activeTab === "interestsHobbies" && (
            <InterestsHobbies patientInfo={info} />
          )}
        </div>
        <Sidebar>
          <PersonalInfo patientInfo={patientInfo} />
        </Sidebar>
      </Content>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambiar a columna
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 500px; // Ajusta esto según sea necesario
  margin-left: 20px;
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
