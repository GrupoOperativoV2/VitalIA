import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../context/authContext';
import { getCompletion } from "../../../containers/IA/api";

export function AppointmentFrom ({ doctors }) {
    const { Appointment, user } = useAuth();
    
    const [appointments, setAppointments] = useState([{
        date: '',
        time: '',
        status: 'scheduled',
        doctorId: '',
        details: '',
        reason: '', 
        patientId: user?.id || '',
    }]);

    const [specializations, setSpecializations] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectsDisabled, setSelectsDisabled] = useState(true); 

    useEffect(() => {
        const uniqueSpecializations = Array.from(new Set(doctors.map(doc => doc.specialization)));
        setSpecializations(uniqueSpecializations);
        if (uniqueSpecializations.length > 0) {
            handleSpecializationChange({ target: { value: uniqueSpecializations[0] } }, 0);
        }
    }, [doctors])

    const updateAppointment = (index, field, value) => {
        const updatedAppointments = appointments.map((appointment, i) => 
            i === index ? { ...appointment, [field]: value } : appointment
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

    const handleInputChange = (e, index, field) => {
        const value = e.target.value;
        const updatedAppointments = appointments.map((appointment, idx) => 
            idx === index ? { ...appointment, [field]: value } : appointment
        );
        setAppointments(updatedAppointments);
    };
    
    

    async function deduceReasonFromSymptoms(symptoms) {
        const prompt = `Basado en los siguientes síntomas, genera una respuesta que consista en una especialidad médica seguida de una coma y luego un motivo corto de la cita médica en una frase de una a cinco palabras. Escoge una especialidad de la siguiente lista: Medicina Interna, Cirugía General, Pediatría, Obstetricia y Ginecología, Cardiología, Neurología, Ortopedia, Oncología, Anestesiología, Urgencias. Si no esta en la lista ponlos en Medicina Interna Síntomas: ${symptoms}`;
    
        try {
            const response = await getCompletion(prompt);
            const [specialization, reason] = response.split(',', 2).map(s => s.trim());
            console.log(specialization)
            return { specialization, reason }; // Retorna un objeto con ambos valores como strings
        } catch (error) {
            console.error('Error deducing reason from symptoms:', error);
            return { specialization: 'Indefinido', reason: 'No se pudo determinar el motivo debido a un error.' };
        }
    }
    


    const handleAddAppointment = () => {
        setAppointments([...appointments, {
            date: '',
            time: '',
            status: 'scheduled',
            doctorId: '',
            details: '',
            reason: '', 
            patientId: user?.id || '',
        }]);
    };

    const handleRemoveAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data for each appointment according to the backend schema
        const formattedAppointments = appointments.map(appointment => ({
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            symptoms: appointment.details,  // Assuming 'details' are the symptoms
            reason: appointment.reason,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status
        }));
    
        console.log('Datos finales de las citas listos para enviar:', formattedAppointments);
    
        try {
            const results = await Promise.all(formattedAppointments.map(appointment => 
                Appointment(appointment)  // Call the existing Appointment function with formatted data
            ));
            console.log('Citas creadas con éxito:', results);
        } catch (error) {
            console.error('Error creando citas:', error);
        }
    };
    
    const analyzeSymptoms = async (index) => {
        const symptoms = appointments[index].details;
        if (!symptoms) {
            alert("Por favor ingrese síntomas antes de analizar.");
            return;
        }
        const { specialization, reason } = await deduceReasonFromSymptoms(symptoms);
        if (specialization) {
            const docs = doctors.filter(doc => doc.specialization === specialization);
            const updatedAppointments = appointments.map((appointment, i) =>
                i === index ? {
                    ...appointment,
                    reason: reason,
                    specialization: specialization,
                    doctorId: docs.length > 0 ? docs[0]._id : ''
                } : appointment
            );
            setAppointments(updatedAppointments);
            setSpecializations([specialization]);
            setFilteredDoctors(docs);
            setSelectsDisabled(false);
        }
        
    };

    
    
    return (
        <NewAppointmentForm onSubmit={handleSubmit}>
            {appointments.map((appointment, index) => (
                <div key={index}>
                    <Label>Describe tus síntomas</Label>
                    <Input
                        type="text"
                        name="details"
                        value={appointment.details}
                        onChange={(e) => handleInputChange(e, index, 'details')}
                        placeholder="¿cómo te sientes?"
                    />
                    <Button onClick={() => analyzeSymptoms(index)}>Analizar síntomas</Button>
                    <br></br> <br></br>
                    <Label>Motivo</Label>
                    <Input
                        type="text"
                        name="reason"
                        value={appointment.reason}
                        placeholder="El motivo de tu cita es.."
                        readOnly
                    />
                    
                    <Row>
                    <SelectContainer>
                            <Label>Especialidad:</Label>
                            <Select
                                name="specialization"
                                value={appointment.specialization}
                                onChange={(e) => handleInputChange(e, index, 'specialization')}
                                disabled={selectsDisabled}
                            >
                                <option>Selecciona uno</option>
                                {specializations.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </Select>
                        </SelectContainer>
                        <SelectContainer>
                            <Label>Médico:</Label>
                            <Select
                                name="doctorId"
                                value={appointment.doctorId}
                                onChange={(e) => handleInputChange(e, index, 'doctorId')}
                                disabled={selectsDisabled}
                            >
                                <option>Selecciona uno</option>
                                {filteredDoctors.map((doctor) => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </Select>
                        </SelectContainer>
                    </Row>
                    <Label>Fecha:</Label>
                    <Input
                        type="date"
                        name="date"
                        value={appointment.date}
                        onChange={(e) => handleInputChange(e, index, 'date')}
                    />
                    <Label>Hora:</Label>
                    <Input
                        type="time"
                        name="time"
                        value={appointment.time}
                        onChange={(e) => handleInputChange(e, index, 'time')}
                    />
                    <Button onClick={() => handleRemoveAppointment(index)}>Eliminar Cita</Button>
                </div>
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

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  flex: 1;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

