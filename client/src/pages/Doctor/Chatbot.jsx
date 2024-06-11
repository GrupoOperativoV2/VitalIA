import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCompletion } from '../../IA/api.js';
import Cookies from "js-cookie";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 350px;
  height: 450px;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  border: 1px solid #00f2fe;
  border-radius: 10px 10px 0 0;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  z-index: 100;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &.open {
    transform: translateX(0);
  }

  .user-message, .bot-message {
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    animation: fadeIn 0.5s ease-in-out;
  }

  .user-message {
    color: #fff;
    background: #4caf50;
    align-self: flex-end;
  }
  
  .bot-message {
    color: #fff;
    background: #009688;
    align-self: flex-start;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #112;
    border-bottom: 1px solid #00f2fe;
    border-radius: 10px 10px 0 0;
    color: #00f2fe;

    h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #00f2fe;
    }
  }

  .chat-content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 300px;
    overflow-y: auto;
    background: #0d1b2a;
    color: #fff;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #112;
    border-top: 1px solid #00f2fe;
    border-radius: 0 0 10px 10px;

    input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 20px;
      margin-right: 10px;
      background: #1c2b3a;
      color: #00f2fe;
      font-size: 0.9rem;
    }

    input::placeholder {
      color: #00f2fe;
    }

    button {
      background: #00f2fe;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #112;
      padding: 10px;
      border-radius: 50%;
      transition: background 0.3s ease;

      &:hover {
        background: #00bcd4;
      }
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
