import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Sidebar } from "./Sidebar.jsx";
import Chatbot from "../Doctor/Chatbot.jsx";
import defaultImage from '../../assets/toast.png';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';
import { cardio } from 'ldrs';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/authContext";

// Registrar el componente cardio
cardio.register();

export function AssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [id, setId] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfActive, setPdfActive] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const { getMedicalHistoryID } = useAuth();

  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [allergies, setAllergies] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [hospitalizations, setHospitalizations] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');

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


    try {
      e.preventDefault();
      setPdfActive(false); 
      const formData = new FormData();
      const history = await getMedicalHistoryID(id);
      setMedicalHistory(history);
      console.log(history);
      if (history) {
        // Extraer y asignar los valores a las variables correspondientes
        const userName = history.personalInformation.name;
        const gender = history.personalInformation.gender;
    
        // Convertir las alergias en una sola cadena
        const allergiesString = Object.entries(history.medicalHistory.allergies)
            .filter(([_, hasAllergy]) => hasAllergy)
            .map(([allergy, _]) => allergy)
            .join(', ');
    
        const bloodType = history.medicalHistory.bloodType;
    
        // Convertir las hospitalizaciones en una sola cadena
        const hospitalizationsString = history.medicalHistory.hospitalizations
            .map(hospitalization => Object.values(hospitalization).join(' '))
            .join(', ');
    
        // Convertir el historial familiar en una sola cadena
        const familyHistoryString = Object.entries(history.medicalHistory.familyHistory)
            .filter(([_, hasCondition]) => hasCondition)
            .map(([condition, _]) => condition)
            .join(', ');
    
        const date = history.personalInformation.birthdate;
    
        // Comprobar los valores antes de añadir a formData
        console.log('userName:', userName);
        console.log('gender:', gender);
        console.log('allergies:', allergiesString);
        console.log('bloodType:', bloodType);
        console.log('hospitalizations:', hospitalizationsString);
        console.log('familyHistory:', familyHistoryString);
        console.log('date:', date);
    
        // Crear una instancia de FormData
        const formData = new FormData();
    
        formData.append('image', image);
        formData.append('id', id);
        formData.append('notes', notes);
        formData.append('name', userName);
        formData.append('gender', gender);
        formData.append('allergies', allergiesString);
        formData.append('bloodType', bloodType);
        formData.append('hospitalizations', hospitalizationsString);
        formData.append('familyHistory', familyHistoryString);
        formData.append('date', date);
    
        // Verificar los datos en formData antes de enviar
        console.log('Sending the following data:', Object.fromEntries(formData.entries()));
    
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        var result = await response.text();
        console.log('Response from server:', result);
        console.log(result.charAt(0));
        if (result.charAt(0) == "0") {
          const resultado = "Toast: Inválido. " + result.substring(1);
          toast.error(resultado);
          setPdfActive(false); 
        } else {
          toast.success('Historial médico encontrado.');
          setPdfActive(true); // Activar el PDF al recibir respuesta
          toast.success("Reporte generado!");
        }
      }


    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error al generar el reporte");
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
          <FormTitle>Subir Información Médica</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="id">ID del Paciente</Label>
              <InputField
                type="text"
                id="id"
                placeholder="Ingresa el ID del paciente"
                value={id}
                onChange={handleIdChange}
              />
            </FormGroup>
            <RowContainer>
              <ImagePreviewContainer>
                <ImagePreview src={imagePreview} alt="Vista previa de la imagen" />
              </ImagePreviewContainer>
              <FormGroup>
                <Label htmlFor="notes">Notas</Label>
                <TextArea
                  id="notes"
                  placeholder="Ingresa las notas"
                  value={notes}
                  onChange={handleNotesChange}
                />
              </FormGroup>
            </RowContainer>
            <ButtonGroup>
              <FileInputLabel>
                <FaUpload style={{ marginRight: '5px' }} />
                <span>Subir Imagen</span>
                <HiddenFileInput type="file" onChange={handleImageChange} accept="image/*" />
              </FileInputLabel>
              <SubmitButton type="submit" disabled={!image || !id}>
                <FaPaperPlane style={{ marginRight: '5px' }} />
                Enviar
              </SubmitButton>
            </ButtonGroup>
          </Form>
          <ChatButton onClick={() => setShowChatbot(true)}>💬</ChatButton>
          {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
          {isLoading && (
            <CenteredLoaderContainer>
              <l-cardio size="170" speed="2.5" color="rgb(232, 22, 19)"></l-cardio>
            </CenteredLoaderContainer>
          )}
        </LeftContainer>
        <PDFContainer isActive={pdfActive}>
          {pdfActive ? <iframe src="./plantilla_filled.pdf" width="100%" height="100%" /> : "PDF will be displayed here after form submission"}
        </PDFContainer>
      </BodyContainer>
      {isLoading && <LoadingOverlay />}
    </DoctorPageContainer>
  );
  
}
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const DoctorPageContainer = styled.div`
  display: flex;
  transition: all 0.3s;
  height: 100vh;
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 1s ease-out;
  background-color: #f8f9fa;
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
  height: 100vh;
  animation: ${slideIn} 0.5s ease-out;
  background-color: #343a40;
  color: white;
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
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
`;

const FormTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #34495e;
  text-align: center;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
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
  margin-top: 20px;
  gap: 20px;
`;

const ImagePreviewContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f1f1f1;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  flex: 1;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin: 0 10px 0 0;
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
  margin: 0 0 0 10px;
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

const ChatButton = styled.button`
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