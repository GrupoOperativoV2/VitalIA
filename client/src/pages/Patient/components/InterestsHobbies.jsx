import React, { useState } from 'react';
import styled from 'styled-components';

const InterestsSection = styled.section`
  background-color: #f8f9fa;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const ListContainer = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExperienceLevel = styled.span`
  color: #555;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 4px;
  margin-right: 10px;
`;

const CommentSection = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export function InterestsHobbies({ patientInfo }) {
  // Puedes manejar estados para los campos de edición si es necesario
  const [notes, setNotes] = useState(patientInfo.hobbiesNotes || '');

  return (
    <InterestsSection>
      <SectionHeader>Intereses y Hobbies</SectionHeader>

      <ListContainer>
        {/* Renderiza una lista de intereses */}
        {patientInfo.interests.map((interest, index) => (
          <Item key={index}>
            <span>{interest.name}</span>
            <EditButton>Edit</EditButton>
          </Item>
        ))}
      </ListContainer>

      <ListContainer>
        {/* Renderiza una lista de hobbies con niveles de experiencia */}
        {patientInfo.hobbies.map((hobby, index) => (
          <Item key={index}>
            <span>{hobby.name}</span>
            <ExperienceLevel>{hobby.level}</ExperienceLevel>
            <EditButton>Edit</EditButton>
          </Item>
        ))}
      </ListContainer>

      <ImageContainer>
        {/* Renderiza imágenes subidas por el usuario */}
        {patientInfo.hobbyImages && patientInfo.hobbyImages.map((image, index) => (
          <Image key={index} src={image.url} alt={image.altText} />
        ))}
      </ImageContainer>

      <CommentSection
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notas adicionales sobre intereses y hobbies"
      />

      <EditButton onClick={() => {/* función para guardar notas */}}>
        Guardar Notas
      </EditButton>
    </InterestsSection>
  );
}
