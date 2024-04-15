import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from "../../context/authContext";

export const RecoverForm = () => {
  const [email, setEmail] = useState('');

  const { resetPassword } = useAuth();

  // Manejador del evento submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await resetPassword(email);
      alert('Si tu correo está registrado, recibirás instrucciones para restablecer tu contraseña.');
    } catch (error) {
      alert('Hubo un problema al intentar enviar la solicitud de restablecimiento de contraseña.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>¿Olvidaste tu contraseña?</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="Ingresa tu correo" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </Form>
    </FormContainer>
  );
};

  // Estilos para el contenedor del formulario
  const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
    margin-top: 50px;
  `;

  // Estilos para el título del formulario
  const FormTitle = styled.h1`
    color: #333;
    margin-bottom: 20px;
  `;

  // Estilos para el formulario
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  // Estilos para el input del formulario
  const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  `;

  // Estilos para el botón de envío
  const SubmitButton = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  `;