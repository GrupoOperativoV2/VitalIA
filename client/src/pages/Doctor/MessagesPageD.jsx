import React, { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";

const PatientPageContainer = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  justify-items: normal;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
  height:100vh;
`;

export function MessagesPageD() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PatientPageContainer className={sidebarOpen ? "sidebarState active" : ""}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <h1>Ponganse a chambear Doctores 4</h1>
    </PatientPageContainer>
  );
}

