import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "../Sidebar.jsx";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PreviewProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { patientData } = location.state || {};

  const { registerListDoctor, user } = useAuth();

  const handleAddClick = async () => {
    try {
      const response = await registerListDoctor(user.id, patientData._id);
      toast.success("Paciente registrado con éxito");
    } catch (error) {
      toast.error(`Error al registrar el paciente: ${error.response.data.message}`);
    }
  };

  const handleDeleteClick = () => {
    // Lógica para eliminar
  };


    return (
      <DoctorPageContainer>
        <SidebarContainer isOpen={sidebarOpen}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </SidebarContainer>
        <BodyContainer>
          {patientData ? (
            <ProfileContainer>
              <ProfileHeader>
                <ProfileImage src={`http://159.223.161.190:4000/${patientData.patientPhoto.replace(/\\+/g, "/")}`} alt="Patient Photo" />
                <h1>{patientData.personalInformation.name}</h1>
                <p><strong>Email:</strong> {patientData.personalInformation.email}</p>
                <p><strong>Teléfono:</strong> {patientData.personalInformation.contactNumber}</p>
              </ProfileHeader>
              <ProfileDetails>
                <Section>
                  <h2>Información Personal</h2>
                  <p><strong>Fecha de nacimiento:</strong> {patientData.personalInformation.birthdate}</p>
                  <p><strong>Género:</strong> {patientData.personalInformation.gender}</p>
                  <p><strong>Dirección:</strong> {patientData.personalInformation.address}</p>
                </Section>
                <Section>
                  <h2>Información Física</h2>
                  <p><strong>Peso:</strong> {patientData.physicalInformation.weight} kg</p>
                  <p><strong>Altura:</strong> {patientData.physicalInformation.height} cm</p>
                  <p><strong>Presión Arterial:</strong> {patientData.physicalInformation.bloodPressure}</p>
                </Section>
                <Section>
                  <h2>Información de Emergencia</h2>
                  <p><strong>Contacto:</strong> {patientData.emergencyInformation.contactName}</p>
                  <p><strong>Relación:</strong> {patientData.emergencyInformation.contactRelation}</p>
                  <p><strong>Teléfono:</strong> {patientData.emergencyInformation.contactNumber}</p>
                </Section>
                <Section>
                  <h2>Historial Médico</h2>
                  <p><strong>Tipo de sangre:</strong> {patientData.medicalHistory.bloodType}</p>
                  <h3>Enfermedades</h3>
                  <ul>
                    {Object.entries(patientData.medicalHistory.diseases).map(([key, value]) => value && <li key={key}>{key}</li>)}
                  </ul>
                  <h3>Cirugías</h3>
                  <ul>
                    {Object.entries(patientData.medicalHistory.surgeries).map(([key, value]) => value && <li key={key}>{key}</li>)}
                  </ul>
                  <h3>Alergias</h3>
                  <ul>
                    {Object.entries(patientData.medicalHistory.allergies).map(([key, value]) => value && <li key={key}>{key}</li>)}
                  </ul>
                  <h3>Hospitalizaciones</h3>
                  <ul>
                    {patientData.medicalHistory.hospitalizations.map((item, index) => (
                      <li key={index}>{item.description} - {item.date}</li>
                    ))}
                  </ul>
                </Section>
                <Section>
                  <h2>Estilo de Vida</h2>
                  <p><strong>Ejercicio:</strong> {patientData.lifestyle.exercise}</p>
                  <p><strong>Consumo de alcohol:</strong> {patientData.lifestyle.alcoholConsumption}</p>
                  <p><strong>Tabaquismo:</strong> {patientData.lifestyle.smokingHabits}</p>
                </Section>
                <Section>
                  <h2>Vacunas</h2>
                  <ul>
                    {Object.entries(patientData.vaccinations).map(([key, value]) => value && <li key={key}>{key}</li>)}
                  </ul>
                </Section>
                <Section>
                  <h2>Resultados de Laboratorio</h2>
                  <ul>
                    {patientData.labResults.map((item, index) => (
                      <li key={index}>
                        <p><strong>Fecha:</strong> {item.date}</p>
                        <p><strong>Diagnóstico:</strong> {item.diagnosis}</p>
                        <p><strong>Doctor:</strong> {item.doctor}</p>
                        <p><strong>Aspecto:</strong> {item.aspect}</p>
                        <p><strong>Resultados:</strong> {item.results}</p>
                      </li>
                    ))}
                  </ul>
                </Section>
                
              </ProfileDetails>

              <ButtonContainer>
                <ActionButton onClick={handleAddClick}>Dar seguimiento</ActionButton>
                <ActionButton onClick={handleDeleteClick}>Eliminar seguimiento</ActionButton>
              </ButtonContainer>
            </ProfileContainer>
          ) : (
            <h1>No se ha seleccionado ningún paciente</h1>
          )}
        </BodyContainer>
        <ToastContainer />
      </DoctorPageContainer>
    );
  }

  const DoctorPageContainer = styled.div`
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
    padding: 20px;
  `;

  const ProfileContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ProfileHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;

    h1 {
      font-size: 2.5em;
      color: #34495e;
    }

    p {
      font-size: 1.2em;
      color: #555;
    }
  `;

  const ProfileImage = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-bottom: 20px;
    margin-left: 30px;
    border: 4px solid #34495e;
  `;

  const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  `;

  const Section = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;

    h2 {
      margin-bottom: 10px;
      color: #34495e;
      font-size: 1.5em;
    }

    h3 {
      margin-top: 10px;
      margin-bottom: 5px;
      color: #333;
      font-size: 1.2em;
    }

    p, ul, li {
      margin: 5px 0;
      color: #555;
      font-size: 1em;
    }

    ul {
      padding-left: 20px;
    }

    li {
      list-style-type: disc;
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
  `;

  const ActionButton = styled.button`
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #34495e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #34495e;
    }
  `;