import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DiscoveryTab = styled.div`
  background-color: #f0f4f8;
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
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
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
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const NewsImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const NewsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ArticleTitle = styled.h4`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const NewsText = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const MedicalDiscoveryTab = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchMedicalNews = async () => {
      const apiKey = 'pub_452895b742ee037d704d38a63bbc2e564ef97';  
      const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&category=health&language=en`; //no le muevan tanto babosos
      try {
        const response = await axios.get(url);
        const uniqueArticles = response.data.results.reduce((acc, article) => {
          if (!acc.some(item => item.article_id === article.article_id)) {
            acc.push(article);
          }
          return acc;
        }, []);
        setArticles(uniqueArticles);
      } catch (error) {
        console.error('Error fetching medical news:', error);
      }
    };

    fetchMedicalNews();
  }, []);

  return (
    <DiscoveryTab>
      <WelcomeMessage>
        <WelcomeTitle>Bienvenido al Centro de Descubrimientos Médicos</WelcomeTitle>
        <WelcomeText>Explora los últimos avances y descubrimientos en el mundo de la medicina.</WelcomeText>
      </WelcomeMessage>
      <SectionTitle>Últimas Noticias</SectionTitle>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <NewsSection key={index} onClick={() => window.open(article.link, '_blank')}>
            <NewsImage src={article.image_url || 'https://via.placeholder.com/120'} alt="Noticia" />
            <NewsContent>
              <ArticleTitle>{article.title}</ArticleTitle>
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
