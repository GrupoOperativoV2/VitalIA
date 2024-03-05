import React, { useState } from 'react';
import './DoctorRegister.css';
import { useAuth } from '../../context/authContext';

export function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    password: "",
  });

  const { registerDoctor } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del médico a registrar:', formData);

    try {
        await registerDoctor(formData);
    } catch (error) {
        console.error("Error al registrar al médico:", error);
    }
  };

  return (
    <div className="DocContainer">
      <h1 className="DocTitle">Registro de Doctores</h1>
      <form className="DocForm" onSubmit={handleSubmit}>
        
        <label htmlFor="name" className="DocLabel">Nombre completo</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="DocInput" 
          value={formData.name}
          onChange={handleChange} 
        />

        <label htmlFor="email" className="DocLabel">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="DocInput" 
          value={formData.email}
          onChange={handleChange} 
        />

        <label htmlFor="specialization" className="DocLabel">Especialización</label>
        <input 
          type="text" 
          id="specialization" 
          name="specialization" 
          className="DocInput" 
          value={formData.specialization}
          onChange={handleChange} 
        />

        <label htmlFor="password" className="DocLabel">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          className="DocInput" 
          value={formData.password}
          onChange={handleChange} 
        />

        <button type="submit" className="DocButton">Registrarse</button>
      </form>
    </div>
  );
}
