import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import Chatbot from "../Doctor/Chatbot.jsx";
import defaultImage from './Vitalia.png';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';

const DoctorPageContainer = styled.div`
  display: flex; // Cambiado a flex para un mejor control del layout
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 1000px;
`;

const BodyContainer = styled.div`
  flex-grow: 1; // Ocupa el espacio restante
  background: ${({ theme }) =>
    theme.bg}; // Asume que tienes un tema con color de fondo
  transition: all 0.3s;
  overflow: auto; // Para el desplazamiento del contenido si es necesario
`;

const PositionedButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const styles = {
  form: {
    textAlign: 'center',
    marginTop: '20px'
  },
  input: {
    margin: '10px 0',
    padding: '8px 15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  }, imagePreviewContainer: {
    textAlign: 'center', // Esto centrará la imagen dentro del div
  },
  imagePreview: {
    maxWidth: '30%',
    maxHeight: '25%',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    display: 'inline-block', // Esto permite que la imagen se centre correctamente
  },
  icon: {
    marginRight: '5px',
  },
  fileInput: {
    display: 'none'
  },
  label: {
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  }
};

export function AssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage); // Usamos la imagen importada aquí
  const [id, setId] = useState('');

  const buttonStyles = {
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    pointerEvents: image && id ? 'auto' : 'none',
    opacity: image && id ? 1 : 0.5,
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);

    // Here you would send formData to the server
    console.log('Sending the following data:', Object.fromEntries(formData));
  };
  return (
    <DoctorPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={handleIdChange}
              style={styles.input}
            />
            <div>
              <img src={imagePreview} alt="Upload Preview" style={styles.imagePreview} />
            </div>
            <label style={styles.label}>
              <FaUpload style={styles.icon} />
              <span>Upload</span>
              <input type="file" style={styles.fileInput} onChange={handleImageChange} />
            </label>
            <button type="submit" style={buttonStyles} disabled={!image || !id}>
              <FaPaperPlane style={{ marginRight: '5px' }} />
              Send
            </button>
          </form>
        </div>



        <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
        {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
      </BodyContainer>
    </DoctorPageContainer>
  );
}
