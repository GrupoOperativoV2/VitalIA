import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const NewsLink = styled.a`
  color: #1a0dab;  // Un color típico de enlace
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NewsText = styled.p`
  margin: 5px 0;
`;

// Componente MedicalDiscoveryTab
const MedicalDiscoveryTab = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchMedicalNews = async () => {
      const apiKey = '21ca2e9bdb9e4571ba261935c08ce793'; // Reemplaza 'your_api_key' con tu clave API real
      const url = `https://newsapi.org/v2/everything?q=medicina+biotecnología&language=es&apiKey=${apiKey}`; //Pendejos, acá se le mueve a las noticias
      try {
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching medical news:', error);
      }
    };

    fetchMedicalNews();
  }, []);

  return (
    <DiscoveryTab>
      <WelcomeMessage>
        <h1>Bienvenido al Centro de Descubrimientos Médicos</h1>
        <p>Explora los últimos avances y descubrimientos en el mundo de la medicina.</p>
      </WelcomeMessage>
      <h2>Últimas Noticias</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <NewsSection key={index}>
            <NewsImage src={article.urlToImage || 'https://via.placeholder.com/120'} alt="Noticia" />
            <NewsContent>
              <NewsTitle>
                <NewsLink href={article.url} target="_blank">{article.title}</NewsLink>
              </NewsTitle>
              <NewsText>{article.description || 'No hay descripción disponible.'}</NewsText>
            </NewsContent>
          </NewsSection>
        ))
      ) : (
        <p>No se encontraron noticias médicas recientes.</p>
      )}
    </DiscoveryTab>
  );
};

export { MedicalDiscoveryTab };
