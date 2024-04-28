import React, { useRef } from 'react';
import styled from 'styled-components';


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
  font-size: 1.5em; 
  color: #34495e;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3); 
  user-select: none;
  font-weight: bold; 
  letter-spacing: 1px; 
`;


export function ListPatient() {
  const carouselRef = useRef();

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      if (direction === 'left') {
        current.scrollLeft -= current.offsetWidth;
      } else {
        current.scrollLeft += current.offsetWidth;
      }
    }
  };

  return (
    <>
      <Container>
        <Title>Mis pacientes</Title>
        <CarouselContainer>
          <Button className="left" onClick={() => scroll('left')}>
            <Icon>&lt;</Icon>
          </Button>
          <CarouselWrapper ref={carouselRef}>
            {patientsData.map((patient, index) => (
              <PatientCard key={index}>
                <PatientImage src={patient.imageUrl} alt={`Foto de ${patient.name}`} />
                <PatientName>{patient.name}</PatientName>
              </PatientCard>
            ))}
          </CarouselWrapper>
          <Button className="right" onClick={() => scroll('right')}>
            <Icon>&gt;</Icon>
          </Button>
        </CarouselContainer>


      
      </Container>
    </>
  );
}



const patientsData = [
    { name: 'Luis', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'María', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Juan', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Ana', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'David', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Sara', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Roberto', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Elena', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Carlos', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Patricia', imageUrl: 'https://via.placeholder.com/200x150' },
  ];