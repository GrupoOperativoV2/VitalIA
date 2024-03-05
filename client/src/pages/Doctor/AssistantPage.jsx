import React, { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import { Assistant } from "../../containers/IA/Assitant.jsx";

const PatientPageContainer = styled.div`
  display: flex;
  height: 100vh;
  .sidebar-container {
    transition: width 0.3s;
    width: ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')};
    position: fixed; /* Fixed sidebar (stay in place on scroll) */
    height: 100%; 
    z-index: 1000; 
  }
  .content-container {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')}; /* Add a margin to the left of the page content to make space for the expanded sidebar */
    transition: margin-left 0.3s;
    width: calc(100% - ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')}); /* Responsive width */
    padding: 20px; 
  }
`;

export function AssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <PatientPageContainer sidebarOpen={sidebarOpen}>
      <div className="sidebar-container">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="content-container">
        <Assistant/>
    
      </div>
    </PatientPageContainer>
  );
}

