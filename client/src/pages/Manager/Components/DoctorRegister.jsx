import React, { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import styled from "styled-components";
import profile from "../../../assets/Profile.jpg";  

export function DoctorRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",
        phone: "",
        address: "",
        experience: "",
        password: "",
        photo: profile,
    });

    const { registerDoctor } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            photo: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos del médico a registrar:', formData);

        const doctorData = new FormData();
        Object.keys(formData).forEach(key => {
            doctorData.append(key, formData[key]);
        });

        try {
            await registerDoctor(doctorData);
        } catch (error) {
            console.error("Error al registrar al médico:", error);
        }
    };

    return (
      <DocContainer>
          <DocTitle>Registro de Doctores</DocTitle>
          <DocForm onSubmit={handleSubmit}>
              <DocLabel htmlFor="name">Nombre completo</DocLabel>
              <DocInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="email">Email</DocLabel>
              <DocInput 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="specialization">Especialización</DocLabel>
              <DocInput 
                  type="text" 
                  id="specialization" 
                  name="specialization" 
                  value={formData.specialization}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="phone">Teléfono</DocLabel>
              <DocInput 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="address">Dirección</DocLabel>
              <DocInput 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="experience">Años de experiencia</DocLabel>
              <DocInput 
                  type="number" 
                  id="experience" 
                  name="experience" 
                  value={formData.experience}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="password">Contraseña</DocLabel>
              <DocInput 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange} 
              />
  
              <DocLabel htmlFor="photo">Foto</DocLabel>
              <DocInput 
                  type="file" 
                  id="photo" 
                  name="photo" 
                  onChange={handleFileChange} 
              />
  
              <DocButton type="submit">Registrarse</DocButton>
          </DocForm>
      </DocContainer>
  );
  
}


const DocContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    max-width: 500px;
    margin: auto;
`;

const DocTitle = styled.h1`
    color: #333;
    margin-bottom: 20px;
`;

const DocForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const DocLabel = styled.label`
    margin-bottom: 5px;
    color: #666;
`;

const DocInput = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    &:focus {
        border-color: #a5a5a5;
    }
`;

const DocButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;
