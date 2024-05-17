import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
import { useAuth } from "../../../context/authContext";

export function Welcome() {
    const { user } = useAuth();

    return (
      <Container>
        <img src={Robot} alt="" />
        <h1>
         Bienvenido, <span>{user ? user.username : 'Invitado'}!</span>
        </h1>
        <h3>¿Qué vida salvaremos hoy?, manda mensaje a tu paciente</h3>
      </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
