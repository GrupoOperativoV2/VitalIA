import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCompletion } from '../../IA/api.js';
import { FaTimes, FaPaperPlane } from 'react-icons/fa'; 
import { useAuth } from "../../context/authContext";

const Chatbot = ({ showChatbot, setShowChatbot, history }) => {
  const { updateMedicalHistory } = useAuth();
  
  var num = 0;
  useEffect(() => {
    firstMessage();
  }, []);

  const firstMessage = async () => {
    num++;
    if (history && num === 1) {
      const nom = history.personalInformation.name;
      const initialBotMessage = `Hola ${nom}, soy Toast, tu chatbot personal, estoy aquí para responder todas tus preguntas sobre tu salud. Puedes elegir sobre qué quieras que te responda. ¿Empezamos?`;
      sendMessage(initialBotMessage, 'bot');
    }
  };
  

  const [messages, setMessages] = useState([]);

  const sendMessage = (message, sender) => {
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

      // Verificar si el mensaje del usuario es un comando de actualización
      if (userMessage.startsWith('actualizar')) {
        const updateCommand = userMessage.replace('actualizar', '').trim();
        handleUpdateCommand(updateCommand);
      } else {
        // Preparar los datos del historial médico para ser enviados al modelo
        const datos = JSON.stringify(history);
        const fullPrompt = `Analiza los datos que forman parte del historial médico de este paciente. Maneja respuestas en relación a este o acerca de dudas del sector salud. Evita respuestas en inglés y con una extensión larga, si no corresponde a ninguna de tus delimitaciones  o pone "a", contesta con "Lo siento, formula bien tu petición o vuelve a intentarlo". Datos = ${datos} Petición = ${userMessage}`;

        const response = await getCompletion(fullPrompt);
        sendMessage(response, 'bot');
      }

      userInput.value = '';
    }
  };

  const handleUpdateCommand = async (command) => {
    try {
      // Parsear el comando de actualización
      const [field, value] = command.split(':').map(s => s.trim());
      let updatedHistory = { ...history };

      // Actualizar el campo correspondiente
      if (field.includes('.')) {
        const [section, key] = field.split('.');
        updatedHistory[section] = {
          ...updatedHistory[section],
          [key]: value
        };
      } else {
        updatedHistory[field] = value;
      }

      // alert("Hola")

      // console.log(updatedHistory._id)
      // console.log(updatedHistory)
      // Enviar la actualización al backend
      await updateMedicalHistory(updatedHistory._id, updatedHistory);

      // Actualizar el historial en la UI y notificar al usuario
      sendMessage(`El campo ${field} ha sido actualizado a ${value}.`, 'bot');
    } catch (error) {
      sendMessage(`Hubo un error al intentar actualizar el campo ${field}.`, 'bot');
      console.error("Error al actualizar el historial médico:", error);
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
        <input type="text" id="user-input" placeholder="Realiza tu consulta o actualización..." onKeyPress={(event) => {
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
  width: 450px;
  height: 550px;
  background: #f8f9fa;
  border: 1px solid #343a40;
  border-radius: 10px 10px 0 0;
  animation: ${({ showChatbot }) => (showChatbot ? slideIn : slideOut)} 0.3s forwards;
  z-index: 100;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .user-message, .bot-message {
    padding: 12px;
    border-radius: 20px;
    margin-bottom: 12px;
    font-size: 1.1rem;
    animation: fadeIn 0.5s ease-in-out;
  }

  .user-message {
    color: #ffffff;
    background: #343a40;
    align-self: flex-end;
  }
  
  .bot-message {
    color: #343a40;
    background: #e9ecef;
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
    padding: 12px;
    background: #343a40;
    border-bottom: 1px solid #e9ecef;
    border-radius: 10px 10px 0 0;
    color: #ffffff;

    h3 {
      margin: 0;
      font-size: 1.4rem;
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
    padding: 12px;
    height: 400px;
    overflow-y: auto;
    background: #ffffff;
    color: #333;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #343a40;
    border-top: 1px solid #e9ecef;
    border-radius: 0 0 10px 10px;

    input {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 20px;
      margin-right: 10px;
      background: #ffffff;
      color: #343a40;
      font-size: 1.1rem;
    }

    input::placeholder {
      color: #343a40;
    }

    button {
      background: #495057;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: #ffffff;
      padding: 12px;
      border-radius: 50%;
      transition: background 0.3s ease;

      &:hover {
        background: #212529;
      }
    }
  }
`;
