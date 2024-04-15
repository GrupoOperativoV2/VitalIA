import React, { useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function Recover() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await updatePassword(userId, token, newPassword);
        navigate('/');
      } catch (error) {
        console.error("Error restableciendo contraseña:", error);
      }
    } else {
      console.log("Las contraseñas no coinciden");
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <Container>
      <Title>Restablecer Contraseña</Title>
      <Subtitle>
        Introduce tu nueva contraseña dos veces abajo para restablecerla.
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <Tittle>Nueva Contraseña</Tittle>
        <Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <ToggleShow onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </ToggleShow>
        </Label>
        <Tittle>Confirmar Nueva Contraseña</Tittle>
        <Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar Nueva Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ToggleShow onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </ToggleShow>
        </Label>
        <Button type="submit">Restablecer Contraseña</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

const Title = styled.h1`
  color: #007bff;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
`;

const ToggleShow = styled.span`
  color: #007bff;
  cursor: pointer;
  font-size: 20px;
  padding: 12px 12px;  // Asegúrate de que el padding vertical coincida con el de Input
  background-color: white;
  border: 1px solid #007bff;
  display: flex;
  justify-content: center;
`;

const Tittle = styled.h1`
font-size: 14px;
color: #333;
font-weight: bold;
margin-bottom: 20px;
display: flex;
align-items: center
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;  
`;


const Input = styled.input`
  flex-grow: 1;  // Ocupa todo el espacio disponible excepto el del ícono
  padding: 12px 20px;
  border: 1px solid #007bff;
  border-radius: 5px 0 0 5px;  // Redondear solo los bordes izquierdos
  font-size: 16px;
  border-right: none;  // Remover el borde derecho para fusionarlo con el ícono
`;


const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
