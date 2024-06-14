import React from "react";
import styled from "styled-components";
import { FaEnvelope, FaBirthdayCake, FaUserTag, FaPhone, FaUserMd } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Profile({ doctorInfo }) {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("ID copiado al portapapeles");
    }, () => {
      toast.error("Error al copiar el ID");
    });
  };

  return (
    <ProfileCard>
      <ToastContainer />
      <ProfileHeader>
        <ProfileImageContainer>
          <ProfileImage
            src={`http://159.223.161.190:4000${doctorInfo.doctorPhoto}`}
            alt={`Foto de ${doctorInfo.name}`}
          />
        </ProfileImageContainer>
        <FullName>{doctorInfo.name}</FullName>
        <IdContainer onClick={() => copyToClipboard(doctorInfo.id)}>
          ID: {doctorInfo.id}
        </IdContainer>
      </ProfileHeader>
      <ProfileDetails>
        <DetailField>
          <FaEnvelope /> <Label>Email:</Label> <Value>{doctorInfo.email}</Value>
        </DetailField>
        <Divider />
        <DetailField>
          <FaPhone /> <Label>Teléfono:</Label> <Value>{doctorInfo.phone}</Value>
        </DetailField>
        <Divider />
        <DetailField>
          <FaBirthdayCake /> <Label>Fecha de Nacimiento:</Label> <Value>{new Date(doctorInfo.birthDate).toLocaleDateString()}</Value>
        </DetailField>
        <Divider />
        <DetailField>
          <FaUserTag /> <Label>Especialidad:</Label> <Value>{doctorInfo.specialization}</Value>
        </DetailField>
        <Divider />
        <DetailField>
          <FaUserMd /> <Label>Experiencia:</Label> <Value>{doctorInfo.experience}</Value>
        </DetailField>
      </ProfileDetails>
    </ProfileCard>
  );
}

const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: auto;
  width: 500px;
  height: 700px;
  text-align: center;
  position: relative;
`;

const ProfileHeader = styled.div`
  background-color: #e9eff1;
  padding: 40px 20px 20px;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 15%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid white;
  background-color: white;
`;

const FullName = styled.h2`
  margin-top: 80px; /* Ajuste del margen superior para compensar la imagen */
  margin-bottom: 5px;
  color: #333;
`;

const IdContainer = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: blue;
`;

const ProfileDetails = styled.div`
  padding: 20px;
`;

const DetailField = styled.div`
  margin-bottom: 20px; /* Aumentar el margen para mejor separación */
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar los elementos */
  text-align: left;
`;

const Label = styled.label`
  display: inline-block;
  color: #777;
  font-size: 0.95rem; /* Incrementar el tamaño de la fuente */
  margin-right: 10px;
`;

const Value = styled.div`
  color: #333;
  font-size: 0.95rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: 10px 20%;
  background-color: #e9eff1;
`;
