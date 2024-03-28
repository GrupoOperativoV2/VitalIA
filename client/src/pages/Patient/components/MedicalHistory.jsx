import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const HistoryHeader = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const RecordList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecordItem = styled.li`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RecordTitle = styled.h3`
  font-size: 1rem;
  color: #007bff;
  margin: 5px 0;
`;

const RecordText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
`;

export const MedicalHistory = ({ patientInfo }) => {
  return (
    <Section>
      <HistoryHeader>Historial Médico</HistoryHeader>
      <RecordList>
        {patientInfo.medicalHistory.map((record, index) => (
          <RecordItem key={index}>
            <RecordTitle>{record.title}</RecordTitle>
            <RecordText>{record.description}</RecordText>
          </RecordItem>
        ))}
      </RecordList>
    </Section>
  );
};
