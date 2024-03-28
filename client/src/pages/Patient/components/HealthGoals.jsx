import React from 'react';
import styled from 'styled-components';

const GoalsSection = styled.section`
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

const GoalList = styled.div`
  margin-bottom: 20px;
`;

const Goal = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-top: 0;
  }
`;

const ProgressBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;

  div {
    background-color: #007bff;
    width: ${props => props.progress}%; /* Progress is a prop */
    height: 10px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Badge = styled.div`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  margin: 5px;
  font-size: 0.85rem;
`;

// Imagine that each plan could have a title and a list of steps to follow
const Plan = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export function HealthGoals({ patientInfo }) {
  return (
    <GoalsSection>
      <SectionHeader>Logros y Objetivos de Salud</SectionHeader>

      <GoalList>
        {/* Loop through health goals */}
        {patientInfo.healthGoals.map((goal, index) => (
          <Goal key={index}>
            <h3>{goal.name}</h3>
            <p>{goal.description}</p>
            <ProgressBar progress={goal.progress}>
              <div />
            </ProgressBar>
          </Goal>
        ))}
      </GoalList>

      <SectionHeader>Logros</SectionHeader>
      <BadgeContainer>
        {/* Loop through achieved goals */}
        {patientInfo.achievements.map((achievement, index) => (
          <Badge key={index}>{achievement}</Badge>
        ))}
      </BadgeContainer>

      {/* Assuming patientInfo.actionPlan is an array of plans */}
      {patientInfo.actionPlan && patientInfo.actionPlan.length > 0 && (
        <>
          <SectionHeader>Plan de Acción</SectionHeader>
          {patientInfo.actionPlan.map((plan, index) => (
            <Plan key={index}>
              <h3>{plan.title}</h3>
              {/* Render plan steps or details */}
            </Plan>
          ))}
        </>
      )}

      {/* Possibly add components for reminders here */}
    </GoalsSection>
  );
}
