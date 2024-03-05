import React, { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import { DoctorRegister } from "../../containers/RegisterDoctor/DoctorRegister.jsx";

const PatientPageContainer = styled.div`
  display: flex;
  height: 100vh;
  .sidebar-container {
    transition: width 0.3s;
    width: ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')};
    position: fixed; /* Fixed sidebar (stay in place on scroll) */
    height: 100%; /* Full height */
    z-index: 1000; /* Stay on top of other elements */
  }
  .content-container {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')}; /* Add a margin to the left of the page content to make space for the expanded sidebar */
    transition: margin-left 0.3s;
    width: calc(100% - ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '90px')}); /* Responsive width */
    padding: 20px; /* Padding */
  }
`;

export function PersonalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PatientPageContainer sidebarOpen={sidebarOpen}>
      <div className="sidebar-container">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="content-container">
        <DoctorRegister />
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
    
      </div>
    </PatientPageContainer>
  );
}

