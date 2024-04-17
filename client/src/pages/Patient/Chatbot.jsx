import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCompletion } from '../../containers/IA/api';
import Cookies from "js-cookie";

const Chatbot = ({ showChatbot, setShowChatbot, history}) => {
  var num = 0;
  useEffect(() => {
    firstMessage();
    console.log("holaa");
    console.log(history)
  }, []);

  const firstMessage = async () => {
    num++;
    const tokenString = Cookies.get("token");
    if (tokenString && num === 1) {
      const [headerEncoded, payloadEncoded, signature] = tokenString.split(".");
      const payload = JSON.parse(atob(payloadEncoded));
      const nom = payload.username;
      const initialBotMessage = `Hola ${nom}, soy Stella, tu chatbot personal, estoy aquí para responder todas tus preguntas sobre tu salud, puedes elegir sobre qué quieras que te responda, ¿Empezamos?`;
      sendMessage(initialBotMessage, "bot");
    }
  };

  const [messages, setMessages] = useState([]);
  const sendMessage = async (message, sender) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleQuery = (query) => {
    query = query.toLowerCase();
    if (query.includes("cuál es mi peso") || query.includes("peso")) {
      const weight = history.physicalInformation.weight;
      sendMessage(`Tu peso es ${weight} kg.`, "bot");
    } else if (query.includes("cuál es mi altura") || query.includes("altura")) {
      const height = history.physicalInformation.height;
      sendMessage(`Tu altura es ${height} cm.`, "bot");
    } else if (query.includes("tipo de sangre")) {
      const bloodType = history.medicalHistory.bloodType;
      sendMessage(`Tu tipo de sangre es ${bloodType}.`, "bot");
    } 
  };

  
const processUserInput = async () => {
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
    sendMessage(userMessage, "user");

    const response = handleQuery(userMessage) || await getCompletion(`(Responde muy brevemente a la siguiente petición en base a los siguientes datos si se trata de cuestiones de salud, si no se trata de cuestiones de salud decir: No puedo responder eso). petición= ${userMessage}`);
    sendMessage(response, "bot");

    userInput.value = "";
  }
};

  return (
    <ChatbotContainer className={showChatbot ? "open" : ""}>
      <div className="chat-header">
        <h3>Chatbot</h3>
        <button className="close-button"
          onClick={() => {
            setShowChatbot(false);
            start();
          }}
        >
           <span className="icon icon-close"></span>
        </button>
      </div>
      <div id="chat-messages" className="chat-content">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p>{message.text}</p>
          </div>
        ))} 
      </div>
      <div className="chat-input">
        <input
          type="text"
          id="user-input"
          placeholder="Realiza tu consulta..."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              processUserInput();
              event.target.value = "";
            }
          }}
        />
        <button className="send-button" id="send-button" onClick={processUserInput}>
          {" "}
          <span className="icon icon-send"></span>
        </button>
      </div>
    </ChatbotContainer>
  );
};

export default Chatbot;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 320px;
  height: 430px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  z-index: 100;

  &.open {
    transform: translateX(0);
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #007bff;
    color: white;
  }

  .close-button, .send-button {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }

  .chat-content {
    padding: 10px;
    height: 300px;
    overflow-y: auto;
    background-color: #fff;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;

    input {
      flex: 1;
      padding: 10px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button.send-button {
      color: #007bff;
      font-size: 2rem;
    }
  }

  .user-message {
    background-color: #e9e9ff;
    color: #333;
    padding: 10px;
    border-radius: 10px;
    margin: 5px 0;
    text-align: left;
  }

  .bot-message {
    background-color: #d9d9d9;
    color: #333;
    padding: 10px;
    border-radius: 10px;
    margin: 5px 0;
    text-align: left;
  }

  /* Icono personalizado con clases CSS */
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: cover;
  }

  .icon-close {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23ffffff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>');
  }

  .icon-send {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23007bff" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/></svg>');
  }
`;