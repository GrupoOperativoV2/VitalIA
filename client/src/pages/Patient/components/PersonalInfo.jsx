import React from "react";
import styled from "styled-components";

const PersonalInfo = ({ patientInfo }) => {

  const personal = patientInfo.personalInformation || {};
  const medical = patientInfo.medicalHistory || {};
  const familyHistory = medical.familyHistory || [];

  // Construcción de la URL de la imagen
  const imageUrl = patientInfo.patientPhoto
    ? `http://localhost:4000/${patientInfo.patientPhoto.replace(/\\+/g, "/")}`
    : "https://via.placeholder.com/100";

  const birthDate = personal.birthdate ? personal.birthdate.split("T")[0] : "";

  // Unir enfermedades y cirugías en una cadena, si están presentes
  const diseases = medical.diseases && medical.diseases.length > 0
    ? medical.diseases.join(', ')
    : "No especificado";

  // Unir el historial familiar en una cadena, si está presente
  const familyHistoryString = familyHistory.length > 0
    ? familyHistory.join(', ')
    : "No especificado";

    return (
      <ProfileCard>
        <ProfileHeader>
          <ProfilePicture src={imageUrl} alt="Foto de Perfil" />
          <FullName>{personal.name}</FullName>
        </ProfileHeader>
        <ProfileDetails>
          <DetailField>
            <Label>Fecha de Nacimiento</Label>
            <Value>{birthDate}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Género</Label>
            <Value>{personal.gender}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Dirección</Label>
            <Value>{personal.address}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Número de Teléfono</Label>
            <Value>{personal.contactNumber}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Correo Electrónico</Label>
            <Value>{personal.email}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Tipo de Sangre</Label>
            <Value>{medical.bloodType}</Value>
          </DetailField>
          <Divider />
          <DetailField>
            <Label>Alergias Conocidas</Label>
            <Value>{medical.allergies && medical.allergies.join(', ')}</Value>
          </DetailField>
          <DetailField>
          <Label>Condiciones Médicas Preexistentes</Label>
          <Value>{diseases}</Value>
        </DetailField>
        <Divider />
        <DetailField>
          <Label>Historial Familiar</Label>
          <Value>{familyHistoryString}</Value>
        </DetailField>
        </ProfileDetails>
      </ProfileCard>
    );
  };
  
export { PersonalInfo };


// Estilos generales para la tarjeta de perfil
const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: auto;
  max-width: 500px;
  text-align: center;
`;

// División superior para la imagen de perfil y el nombre
const ProfileHeader = styled.div`
  background-color: #e9eff1;
  padding: 20px;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid white;
  margin-top: -0px; // Para que se sobreponga a la división del encabezado
  background-color: white;
`;

const FullName = styled.h2`
  margin: 10px 0 5px;
  color: #333;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: 10px 20%;
  background-color: #e9eff1;
`;

// Estilos para la sección de detalles del perfil
const ProfileDetails = styled.div`
  padding: 20px;
`;

const DetailField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  color: #777;
  font-size: 0.85rem;
`;

const Value = styled.div`
  color: #333;
  font-size: 0.95rem;
`;