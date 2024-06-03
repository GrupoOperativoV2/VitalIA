import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from 'react-router-dom';

export function ListPatient() {
  const { getMypacients, user, getMedicalHistoryID } = useAuth();
  const carouselRef = useRef();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientIDs = await getMypacients(user.id);
        console.log("IDs de los pacientes:", patientIDs); // Imprimir los IDs obtenidos

        const patientDataPromises = patientIDs.map(async (id) => {
          const patientData = await getMedicalHistoryID(id);
          return patientData;
        });

        const patientsData = await Promise.all(patientDataPromises);
        console.log("Datos completos de los pacientes:", patientsData); // Imprimir los datos obtenidos
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchPatients();
    }
  }, [getMypacients, getMedicalHistoryID, user]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      if (direction === "left") {
        current.scrollLeft -= current.offsetWidth;
      } else {
        current.scrollLeft += current.offsetWidth;
      }
    }
  };

  const handlePatientClick = (patientData) => {
    navigate(`/previewpatient`, { state: { patientData } });
  };

  return (
    <>
      <Container>
        <Title>Mis pacientes</Title>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <CarouselContainer>
            <Button className="left" onClick={() => scroll("left")}>
              <Icon>&lt;</Icon>
            </Button>
            <CarouselWrapper ref={carouselRef}>
              {patients && patients.length > 0 ? (
                patients.map((patient, index) => (
                  <PatientCard key={index} onClick={() => handlePatientClick(patient)}>
                    <PatientImage
                      src={
                        patient.patientPhoto
                          ? `http://localhost:4000/${patient.patientPhoto.replace(/\\+/g, "/")}`
                          : "https://via.placeholder.com/200x150"
                      }
                      alt={`Foto de ${patient.personalInformation.name}`}
                    />
                    <PatientName>{patient.personalInformation.name}</PatientName>
                  </PatientCard>
                ))
              ) : (
                <p>No hay pacientes disponibles</p>
              )}
            </CarouselWrapper>
            <Button className="right" onClick={() => scroll("right")}>
              <Icon>&gt;</Icon>
            </Button>
          </CarouselContainer>
        )}
      </Container>
    </>
  );
}

const CarouselContainer = styled.div`
  padding: 20px;
  display: flex;
  overflow: hidden;
  width: 95%;
  margin: 5px 50px;
  position: relative;
`;

const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

const PatientCard = styled.div`
  flex: none;
  height: 300px;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  scroll-snap-align: start;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
`;

const PatientImage = styled.img`
  width: 100%;
  height: 160px; /* Ajuste de altura para la imagen */
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const PatientName = styled.h3`
  margin: 15px 0;
  color: #333;
  font-size: 1.1em; /* Aumento del tamaño de fuente */
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  &.left {
    left: 0px;
    transform: translateY(-50%) translateX(-100%);
  }
  &.right {
    right: 0px;
    transform: translateY(-50%) translateX(100%);
  }
`;

const Icon = styled.span`
  font-size: 24px; /* Ajuste de tamaño de fuente para los iconos */
  color: #333;
  user-select: none;
`;

const Container = styled.div`
  width: 94%;
  position: relative;
  margin-left: 90px;
`;

const Title = styled.h2`
  font-size: 25px;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 10px;
`;
