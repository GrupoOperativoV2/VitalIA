import React from 'react';
import styled, { keyframes } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { ListPatient } from '../components/ListPatient';

export function ContainerDoctor({ user }) {
    return (
        <>
            <GlobalStyle />
            <WelcomeContainer>
                <WelcomeHeader>¡Bienvenido, Dr. {user.name}!</WelcomeHeader>
                <WelcomeText>
                    Estamos encantados de tenerle aquí. Su dedicación y compromiso son esenciales para nosotros.
                </WelcomeText>
                <WelcomeFooter>
                    Si necesita algo, no dude en contactarnos.
                </WelcomeFooter>
            </WelcomeContainer>

            <PatientContainer>
            <ListPatient/>
            </PatientContainer>
        </>
    );
}


const PatientContainer = styled.div`
    width: 90%;
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

// Animación para el contenedor
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Contenedor principal con animación flotante y diseño expansivo
const WelcomeContainer = styled.div`
    background-color: #FFFFFF; // Fondo blanco
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 255, 0.2); // Sombra suave en azul
    text-align: center;
    width: 90%;
    margin: 20px auto;
    animation: ${float} 4s ease-in-out infinite;
`;

// Estilos del encabezado con detalle en azul y en negritas
const WelcomeHeader = styled.h1`
    color: #34495e; // Texto negro
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 255, 0.3); // Sombra en azul
    font-size: 2.2em;
    font-weight: 700; // Negritas para el título
`;

// Estilo de texto con fuente moderna y color principal
const WelcomeText = styled.p`
    color: #000000; // Texto negro
    font-size: 18px;
    margin-bottom: 25px;
    line-height: 1.6;
`;

// Estilo para el pie de página con un toque sutil y cursivo
const WelcomeFooter = styled.div`
    font-style: italic;
    color: #000000; // Texto negro
    font-size: 16px;
`;