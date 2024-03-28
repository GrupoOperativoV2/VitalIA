import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCompletion } from './api';
import Cookies from "js-cookie";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 410px;
  background-color: #fff;
  border-left: 1px solid #ddd;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  z-index: 100;

  &.open {
    transform: translateX(0);
  }

  .user-message {
    color: blue;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
  }
  
  .bot-message {
    color: green;
    background-color: #e0e0e0;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;

    h3 {
      margin: 0;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #6c757d;
    }
  }

  .chat-content {
    padding: 10px;
    height: 300px;
    overflow-y: auto;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;

    input {
      flex: 1;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #6c757d;
      margin-left: 10px;
    }
  }
`;

const Chatbot = ({ showChatbot, setShowChatbot }) => {
  var num = 0;
  useEffect(() => {
    firstMessage();
    console.log("holaa");
  }, []);

  const firstMessage = async () => {
    num++;
    const tokenString = Cookies.get("token");
    if (tokenString && num === 1) {
      const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
      const payload = JSON.parse(atob(payloadEncoded));
      const nom = payload.username;
      const initialBotMessage = `Hola ${nom}, soy Stella, tu chatbot personal, estoy aquí para responder todas tus preguntas sobre tu salud, puedes elegir sobre qué quieras que te responda, ¿Empezamos?`;
      sendMessage(initialBotMessage, 'bot');
    }
  };

  const [messages, setMessages] = useState([]);
  const sendMessage = async (message, sender) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const processUserInput = async () => {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage !== '') {
      sendMessage(userMessage, 'user');
      var datos = "Altura:1.80, Peso:60kg"; 
      const fullPrompt =  "(Responde muy brevemente a la siguiente petición en base a los siguientes datos si se trata de cuestiones de salud, si no se trata de cuestiones de salud decir: No puedo responder eso). datos = " + datos + " petición= " + userMessage;
      const response = await getCompletion(fullPrompt);
      sendMessage(response, 'bot');

      userInput.value = '';
    }
  };

  return (
    <ChatbotContainer className={showChatbot ? 'open' : ''}>
      <div className="chat-header">
        <h3>Chatbot</h3>
        <button onClick={() => setShowChatbot(false)}>❌</button>
      </div>
      <div id="chat-messages" className="chat-content">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" id="user-input" placeholder="Realiza tu consulta..." onKeyPress={(event) => {
          if (event.key === "Enter") {
            processUserInput();
            event.target.value = "";
          }
        }} />
        <button id="send-button" onClick={processUserInput}>▶️</button>
      </div>
    </ChatbotContainer>
  );
};

export default Chatbot;
