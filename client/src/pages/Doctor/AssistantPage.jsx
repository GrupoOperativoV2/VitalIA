import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import Chatbot from "../Doctor/Chatbot.jsx";
import defaultImage from './Vitalia.png';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';
import { cardio } from 'ldrs';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Registrar el componente cardio
cardio.register();

const DoctorPageContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const CenteredLoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 1000px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  gap: 40px; /* Espacio entre los contenedores */
`;

const ImagePreviewContainer = styled.div`
  width: 55%; /* Más ancho */
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
`;

const TextArea = styled.textarea`
  width: 40%;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  resize: none;
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin: 20px 10px 0 0;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin: 20px 0 0 10px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  z-index: 999;
`;

const PDFContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
  padding: 20px;
  background: ${({ isActive }) => (isActive ? "#fff" : "#f0f0f0")};
  pointer-events: ${({ isActive }) => (isActive ? "auto" : "none")};
`;

export function AssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [id, setId] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfActive, setPdfActive] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    formData.append('notes', notes);
    console.log('Sending the following data:', Object.fromEntries(formData.entries()));

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();
      console.log('Response from server:', result);
      console.log(result.charAt(0));
      if (result.charAt(0) == "0") {
        const resultado = "Invalido: " + result;
        toast.error(resultado);
      } else {
        setPdfActive(true); // Activar el PDF al recibir respuesta
        toast.success("Form submitted successfully!");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting form");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <DoctorPageContainer>
      <ToastContainer />
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <LeftContainer>
        <form onSubmit={handleSubmit}>
          <FormContainer onSubmit={handleSubmit}>
            
            
            <InputField
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={handleIdChange}
            />
            <RowContainer>
              <ImagePreviewContainer>
                <ImagePreview src={imagePreview} alt="Upload Preview" />
              </ImagePreviewContainer>
              <TextArea
                placeholder="Notas"
                value={notes}
                onChange={handleNotesChange}
              />
            </RowContainer>
            <div>
              <FileInputLabel>
                <FaUpload style={{ marginRight: '5px' }} />
                <span>Upload</span>
                <HiddenFileInput type="file" onChange={handleImageChange} accept="image/*" />
              </FileInputLabel>
              <SubmitButton type="submit" disabled={!image || !id}>
                <FaPaperPlane style={{ marginRight: '5px' }} />
                Send
              </SubmitButton>
            </div>
          </FormContainer></form>
          <PositionedButton onClick={() => setShowChatbot(true)}>💬</PositionedButton>
          {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
          {isLoading && (
            <CenteredLoaderContainer>
              <l-cardio size="170" speed="2.5" color="rgb(232, 22, 19)"></l-cardio>
            </CenteredLoaderContainer>
          )}
        </LeftContainer>
        <PDFContainer isActive={pdfActive}>
          {pdfActive ? <iframe src="./plantilla_filled.pdf#toolbar=0" width="100%" height="100%" /> : "PDF will be displayed here after form submission"}
        </PDFContainer>
      </BodyContainer>
      {isLoading && <LoadingOverlay />}
    </DoctorPageContainer>
  );
}