import React, { useState } from 'react';
import styled from 'styled-components';

const BlogSection = styled.section`
  background-color: #f8f9fa;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const PostList = styled.div`
  margin-bottom: 20px;
`;

const PostItem = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h3`
  margin-top: 0;
`;

const PostContent = styled.p`
  color: #555;
`;

const NewPostButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export function PersonalBlog({ patientInfo }) {
  const [blogPosts, setBlogPosts] = useState(patientInfo.blogPosts || []);

  // Función para agregar un nuevo post (esto es solo un esquema, se debe implementar)
  const addNewPost = () => {
    // Aquí se debería implementar la lógica para agregar una nueva entrada al blog
  };

  return (
    <BlogSection>
      <SectionHeader>Blog o Diario Personal</SectionHeader>
      <NewPostButton onClick={addNewPost}>Añadir Nueva Entrada</NewPostButton>
      <PostList>
        {blogPosts.map((post, index) => (
          <PostItem key={index}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
          </PostItem>
        ))}
      </PostList>
    </BlogSection>
  );
}
