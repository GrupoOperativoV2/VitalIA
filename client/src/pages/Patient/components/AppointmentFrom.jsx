import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../context/authContext';
import { AppointmentEntry } from './AppointmentEntry';

export function AppointmentFrom({ doctors }) {
    const { Appointment, user } = useAuth();
    
    const [appointments, setAppointments] = useState([{
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        status: 'scheduled',
        doctorId: '',
        details: '',
        patientId: user?.id || '',
        officeDetails: {
            specialty: '',
            floor: '',
            number: '',
        }
    }]);

    const [specializations, setSpecializations] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const uniqueSpecializations = Array.from(new Set(doctors.map(doc => doc.specialization)));
        setSpecializations(uniqueSpecializations);
        if (uniqueSpecializations.length > 0) {
            handleSpecializationChange({ target: { value: uniqueSpecializations[0] } }, 0);
        }
    }, [doctors]);

    const updateAppointment = (index, updatedAppointmentData) => {
        const updatedAppointments = appointments.map((appointment, i) => 
            i === index ? updatedAppointmentData : appointment
        );
        setAppointments(updatedAppointments);
    };
    

    const handleSpecializationChange = (e, index) => {
        const specialization = e.target.value;
        const docs = doctors.filter(doc => doc.specialization === specialization);
        setFilteredDoctors(docs);
        updateAppointment(index, 'specialization', specialization);
        updateAppointment(index, 'doctorId', docs.length > 0 ? docs[0]._id : '');
    };

    const handleInputChange = (e, index, field, subField) => {
        const { value } = e.target;
        const updatedAppointment = { ...appointments[index] };
        
        if (subField) {
            updatedAppointment[field] = {
                ...updatedAppointment[field],
                [subField]: value
            };
        } else {
            updatedAppointment[field] = value;
        }
    
        updateAppointment(index, updatedAppointment);
    };
    

    const handleAddAppointment = () => {
        setAppointments([...appointments, {
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            status: 'scheduled',
            doctorId: '',
            details: '',
            patientId: user?.id || '',
            specialization: '',
            officeDetails: {
                specialty: '',
                floor: '',
                number: '',
            }
        }]);
    };

    const handleRemoveAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
    };

    const formatOfficeDetailsForSubmission = (appointmentData) => {
        const { specialty, floor, number } = appointmentData.officeDetails;
        if (!specialty || !floor || !number) {
            console.error('Faltan datos del consultorio:', appointmentData.officeDetails);
            return 'Datos incompletos';  // O maneja el error como sea apropiado
        }
        return `${specialty}-${floor}-${number}`;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedAppointments = appointments.map(appointment => ({
            ...appointment,
            officeDetails: formatOfficeDetailsForSubmission(appointment)
        }));
    
        // Verificar si algún dato está incompleto
        if (formattedAppointments.some(app => app.officeDetails === 'Datos incompletos')) {
            console.error('No se pueden enviar los datos debido a la falta de información.');
            return;
        }
    
        console.log('Datos finales de las citas listos para enviar:', formattedAppointments);
        try {
            
            const results = await Promise.all(formattedAppointments.map(appointment => Appointment(appointment)));
            console.log('Citas creadas con éxito:', results);
        } catch (error) {
            console.error('Error creando citas:', error);
        }
    };

    return (
        <NewAppointmentForm onSubmit={handleSubmit}>
            {appointments.map((appointment, index) => (
                <AppointmentEntry key={index} appointment={appointment} index={index} handleInputChange={handleInputChange} 
                                  handleSpecializationChange={handleSpecializationChange} handleDoctorChange={updateAppointment}
                                  specializations={specializations} filteredDoctors={filteredDoctors} handleRemoveAppointment={() => handleRemoveAppointment(index)} />
            ))}
            <Button onClick={handleAddAppointment}>Agregar Cita</Button>
            <Button type="submit">Guardar Citas</Button>
        </NewAppointmentForm>
    );
}


const NewAppointmentForm = styled.form`
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #4a90e2; // Un azul más suave
  color: white;
  margin-top: 15px;
  margin-right: 10px; // Espacio a la derecha de cada botón
  padding: 10px 15px;
  border: none;
  border-radius: 8px; // Bordes más redondeados
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; // Suavizado de la transición
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Sombra ligera para profundidad

  &:hover {
    background-color: #357abd; // Un azul más oscuro para hover
    transform: translateY(-2px); // Levanta el botón para dar efecto de presionado
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); // Sombra más pronunciada en hover
  }

  &:active {
    background-color: #285a8c; // Azul aún más oscuro al hacer clic
    transform: translateY(1px); // Presiona hacia abajo al hacer clic
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); // Sombra más sutil cuando está activo
  }

  &:last-child {
    margin-right: 0; // Asegura que el último botón no tenga margen a la derecha
  }
`;


