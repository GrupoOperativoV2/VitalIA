import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCompletion } from '../../IA/api.js';
import Cookies from "js-cookie";
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 500px;
  background: #ffffff;
  border: 1px solid #007BFF;
  border-radius: 10px 10px 0 0;
  animation: ${({ showChatbot }) => (showChatbot ? slideIn : slideOut)} 0.3s forwards;
  z-index: 100;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .user-message, .bot-message {
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    animation: fadeIn 0.5s ease-in-out;
  }

  .user-message {
    color: #ffffff;
    background: #007BFF;
    align-self: flex-end;
  }
  
  .bot-message {
    color: #ffffff;
    background: #0056b3;
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
    background: #007BFF;
    border-bottom: 1px solid #0056b3;
    border-radius: 10px 10px 0 0;
    color: #ffffff;

    h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #ffffff;
    }
  }

  .chat-content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 350px;
    overflow-y: auto;
    background: #e9f1fb;
    color: #333;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #007BFF;
    border-top: 1px solid #0056b3;
    border-radius: 0 0 10px 10px;

    input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 20px;
      margin-right: 10px;
      background: #ffffff;
      color: #007BFF;
      font-size: 0.9rem;
    }

    input::placeholder {
      color: #007BFF;
    }

    button {
      background: #0056b3;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #ffffff;
      padding: 10px;
      border-radius: 50%;
      transition: background 0.3s ease;

      &:hover {
        background: #003f7f;
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
      const initialBotMessage = `Hola ${nom}, soy Toast, tu chatbot personal, estoy aquí para responder todas tus preguntas sobre tu salud, puedes elegir sobre qué quieras que te responda, ¿Empezamos?`;
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
    <ChatbotContainer showChatbot={showChatbot} className={showChatbot ? 'open' : ''}>
      <div className="chat-header">
        <h3>Toast</h3>
        <button onClick={() => setShowChatbot(false)}><FaTimes /></button>
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
        <button id="send-button" onClick={processUserInput}><FaPaperPlane /></button>
      </div>
    </ChatbotContainer>
  );
};

export default Chatbot;
