import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from "../../../api/menssage";
import { ChatContainer } from "../components/ChatContainer";
import { Contacts } from "../components/Contacts";
import { Welcome } from "../components/Welcome";
import { useAuth } from "../../../context/authContext";

export function Chat() {
  const { DoctorSearch, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("Usuario actual:", user);
      socket.current = io(host);

      socket.current.on("connect", () => {
        console.log("Conectado al servidor de Socket.IO");
        socket.current.emit("add-user", user.id);

        socket.current.on("user-added", (response) => {
          if (response.status === "success") {
            console.log(`Usuario ${response.userId} agregado exitosamente.`);
          } else {
            console.log("No se pudo agregar al usuario.");
          }
        });
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);
  useEffect(() => {
    DoctorSearch()
      .then((doctorsList) => {
        setDoctors(doctorsList); // Actualiza el estado con la lista de doctores
        console.log("Doctores:", doctorsList);
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
      });
  }, [DoctorSearch]);

  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };

  return (
    <>
       <Container>
        <div className="container">
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} user={user} />
          )}
          <Contacts contacts={doctors} changeChat={handleChatChange} /> {/* Esto se mueve a la derecha */}
        </div>
      </Container>  
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ffffff;
  .container {
    display: grid;
    grid-template-columns: 75% 25%; /* Invertir el orden aquí */
    height: 85vh; 
    width: 85vw;
    background-color: #ffffff;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 65% 35%; /* También invertir el orden para la media query */
    }
  }
  }
`;
