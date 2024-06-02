import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('/api/blogPosts');
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const addNewPost = async () => {
    try {
      const newPost = {
        title: "Nuevo Título",
        content: "Contenido del nuevo post",
        author: "Autor",
        status: "draft",
      };
      const response = await axios.post('/api/blogPosts', newPost);
      setBlogPosts([...blogPosts, response.data]);
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/blogPosts/${id}`);
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <BlogSection>
      <SectionHeader>Blog o Diario Personal</SectionHeader>
      <NewPostButton onClick={addNewPost}>Añadir Nueva Entrada</NewPostButton>
      <PostList>
        {blogPosts.map((post, index) => (
          <PostItem key={post._id}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <button onClick={() => deletePost(post._id)}>Eliminar</button>
          </PostItem>
        ))}
      </PostList>
    </BlogSection>
  );
}
