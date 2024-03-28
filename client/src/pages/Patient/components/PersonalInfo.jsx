import React from "react";
import styled from "styled-components";

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
  margin-top: -60px; // Para que se sobreponga a la división del encabezado
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

const PersonalInfo = ({ patientInfo }) => (
  <ProfileCard>
    <ProfileHeader>
      <ProfilePicture
        src={patientInfo.profilePictureUrl}
        alt="Foto de Perfil"
      />
      <FullName>{patientInfo.fullName}</FullName>
    </ProfileHeader>
    <ProfileDetails>
      <DetailField>
        <Label>Fecha de Nacimiento</Label>
        <Value>{patientInfo.birthDate}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Género</Label>
        <Value>{patientInfo.gender}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Dirección</Label>
        <Value>{patientInfo.address}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Número de Teléfono</Label>
        <Value>{patientInfo.phone}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Correo Electrónico</Label>
        <Value>{patientInfo.email}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Tipo de Sangre</Label>
        <Value>{patientInfo.bloodType}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Alergias Conocidas</Label>
        <Value>{patientInfo.allergies}</Value>
      </DetailField>
      <Divider />
      <DetailField>
        <Label>Condiciones Médicas Preexistentes</Label>
        <Value>{patientInfo.medicalConditions}</Value>
      </DetailField>
    </ProfileDetails>
  </ProfileCard>
);

export { PersonalInfo };
