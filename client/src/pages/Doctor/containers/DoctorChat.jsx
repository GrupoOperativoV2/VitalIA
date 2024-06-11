import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from "../../../api/menssage";
import { Contacts } from "../components/Contacts";
import { Welcome } from "../components/Welcome";
import { useAuth } from "../../../context/authContext";
import { ChatContainer } from "../components/ChatContainer";

export function DoctorChat() {
  const { listPatients, user } = useAuth();
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

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
    if (user) {
      listPatients(user.id)
        .then((patientsList) => {
          setContacts(patientsList); // Actualiza el estado con la lista de pacientes
          console.log("Pacientes:", patientsList);
        })
        .catch((error) => {
          console.error("Error al obtener los pacientes:", error);
        });
    }
  }, [user, listPatients]);
  
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
          <Contacts contacts={contacts} changeChat={handleChatChange} />
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
