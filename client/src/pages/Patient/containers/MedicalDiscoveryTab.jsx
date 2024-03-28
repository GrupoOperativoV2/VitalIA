// MedicalDiscoveryTab.jsx

import React from 'react';
import styled from 'styled-components';

const DiscoveryTab = styled.div`
  background-color: #e8f4f8;
  margin: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessage = styled.div`
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const NewsSection = styled.div`
  background-color: #ffffff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NewsImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const NewsContent = styled.div`
  flex: 1;
`;

const NewsTitle = styled.h4`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const NewsText = styled.p`
  margin: 5px 0;
`;

const MedicalDiscoveryTab = () => (
  <DiscoveryTab>
    <WelcomeMessage>
      <h1>Bienvenido al Centro de Descubrimientos Médicos</h1>
      <p>Explora los últimos avances y descubrimientos en el mundo de la medicina.</p>
    </WelcomeMessage>
    <h2>Últimas Noticias</h2>
    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>  
    
    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>

    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>


    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>


    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>


    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>


    <NewsSection>
      <NewsImage src="https://via.placeholder.com/120" alt="Noticia" />
      <NewsContent>
        <NewsTitle>Avance significativo en la cura de la diabetes tipo 1</NewsTitle>
        <NewsText>
          Investigadores han identificado un nuevo tratamiento que promete una mejor calidad de vida para los pacientes con diabetes tipo 1.
        </NewsText>
      </NewsContent>
    </NewsSection>
    {/* Aquí se puede agregar más contenido como artículos, enlaces, etc. */}
  </DiscoveryTab>
);

export { MedicalDiscoveryTab };
