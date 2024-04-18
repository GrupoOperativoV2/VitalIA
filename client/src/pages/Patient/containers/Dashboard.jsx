// Dashboard.jsx

import React from 'react';
import styled from 'styled-components';
import { AppointmentDetails } from '../components/AppointmentDetails';

import { MedicationReminder } from '../components/MedicationReminder';
import { SampleReminder } from '../components/SampleReminder';
import { FollowUpReminder } from '../components/FollowUpReminder';

const DashboardContainer = styled.div`
  background-color: ${({ theme }) => theme.bgSecondary || '#f4f4f4'};
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text || '#333'};
  margin-bottom: 10px;
`;

const Dashboard = ({ userID }) => {
  return (
    <DashboardContainer>
      <Section>
        <Title>Próximas Citas</Title>
        <AppointmentDetails userID={userID}/>
      </Section>

      <Section>
        <Title>Recordatorios</Title>
        <MedicationReminder />

      <SampleReminder />

      <FollowUpReminder />
      </Section>
    </DashboardContainer>
  );
};

// Exportando el componente de forma nombrada
export { Dashboard };
