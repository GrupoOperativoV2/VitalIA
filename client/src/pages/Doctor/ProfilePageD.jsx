import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import { Appointment } from "./containers/Appointment.jsx";
import { Profile } from "./containers/Profile.jsx";
import { useAuth } from "../../context/authContext";

export function ProfilePageD() {
  const { user, getAppointmentsDoctor } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const doctorId = user ? user.id : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (doctorId) {
          const appointmentsData = await getAppointmentsDoctor(doctorId);
          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorId, getAppointmentsDoctor]);

  if (!doctorId) {
    return <p>No se ha encontrado el ID del doctor.</p>;
  }

  return (
    <DoctorPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <ContentContainer>
          <AppointmentContainer>
            <Appointment appointments={appointments} />
          </AppointmentContainer>
          <ProfileContainer>
            <Profile doctorInfo={user} />
          </ProfileContainer>
        </ContentContainer>
      </BodyContainer>
    </DoctorPageContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const DoctorPageContainer = styled.div`
   display: flex;
  transition: all 0.3s;
  height: 100vh;
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 1s ease-out;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 100vh;
  animation: ${slideIn} 0.5s ease-out;
`;

const BodyContainer = styled.div`
  flex-grow: 1;
  background: ${({ theme }) => theme.bg};
  transition: all 0.3s;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 100px);
`;

const AppointmentContainer = styled.div`
  flex: 2;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  flex: 1;
  padding: 20px;
`;
