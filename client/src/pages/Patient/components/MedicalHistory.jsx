import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChangeFrom } from "./ChangeFrom";
import { useAuth } from "../../../context/authContext";

const Section = styled.section`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const HistoryHeader = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const EditFrom = styled.h2`
  color: #333;
  margin-bottom: 65px;
`;

const RecordList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecordItem = styled.li`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RecordTitle = styled.h3`
  font-size: 1rem;
  color: #007bff;
  margin: 5px 0;
`;

const RecordText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
`;

const NewAppointmentForm = styled.form`
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
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

const Button = styled.button`
  background-color: #007bff;
  color: white;
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  margin-right: 10px; // Espacio entre el select y la etiqueta de especialidad
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SpecializationLabel = styled.span`
  flex: 1;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DateSelect = styled.select`
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TimeInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StatusSelect = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TimeStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const MedicalHistory = ({ info }) => {
  const { getMedicalHistory, Appointment, DoctorSearch, user  } = useAuth();
  const [patientInfo, setPatientInfo] = useState(null);
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [appointmentData, setAppointmentData] = useState({
    date: new Date().toISOString().split("T")[0], // Fecha actual como valor por defecto
    time: "09:00", // Hora por defecto
    status: "scheduled", // Estado por defecto
    doctorId: "",
    details: "",
  });

  

  useEffect(() => {
    if (user) {
      getMedicalHistory(user.id)
        .then((history) => {
          console.log("Historial Médico:", history);
          setPatientInfo(history); // Actualiza el estado con los datos obtenidos
          setAppointmentData((prev) => ({ ...prev, patientId: user.id }));
        })
        .catch((error) => {
          console.error("Error al obtener el historial médico:", error);
        });
    }
    DoctorSearch()
      .then((doctorsList) => {
        setDoctors(doctorsList);
        if (doctorsList.length > 0) {
          setSelectedDoctor(doctorsList[0]);
          setAppointmentData((prev) => ({
            ...prev,
            doctorId: doctorsList[0]._id,
          }));
        }
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
      });
  }, [user, getMedicalHistory, DoctorSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado
    console.log("Formulario enviado:", appointmentData); // Depuración
    alert("Formulario enviado, revisa la consola para los detalles.");

    try {
      const result = await Appointment(appointmentData);
      console.log("Cita creada con éxito:", result);
      setShowNewAppointmentForm(false); // Ocultar formulario tras el éxito
    } catch (error) {
      console.error("Error creando cita:", error);
    }
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find((doc) => doc._id === doctorId);
    setSelectedDoctor(doctor);
    setAppointmentData((prev) => ({ ...prev, doctorId }));
  };
  // // Maneja el caso en que los datos aún no estén cargados
  if (!patientInfo) {
    return <div>Cargando información del paciente...</div>;
  }

  const toggleNewAppointmentForm = () => {
    setShowNewAppointmentForm(!showNewAppointmentForm);
  };

  return (
    <Section>
      <HistoryHeader>Historial Médico</HistoryHeader>
      <RecordList>
        {info.medicalHistory.map((record, index) => (
          <RecordItem key={index}>
            <RecordTitle>{record.title}</RecordTitle>
            <RecordText>{record.description}</RecordText>
          </RecordItem>
        ))}
      </RecordList>

      <Button onClick={() => setShowNewAppointmentForm(true)}>
        Registrar Nueva Cita
      </Button>

      {showNewAppointmentForm && (
        <NewAppointmentForm onSubmit={handleSubmit}>
          <Label>Fecha:</Label>
          <Input
            type="date"
            name="date"
            value={appointmentData.date}
            onChange={handleInputChange}
          />

          <Label>Hora:</Label>
          <Input
            type="time"
            name="time"
            value={appointmentData.time}
            onChange={handleInputChange}
          />

          <Label>Estado:</Label>
          <Select
            name="status"
            value={appointmentData.status}
            onChange={handleInputChange}
          >
            <option value="scheduled">Programada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </Select>

          <Label>Médico:</Label>
          <Select
            name="doctorId"
            value={appointmentData.doctorId}
            onChange={handleDoctorChange}
          >
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </Select>
          <SpecializationLabel>
            Especialidad: {selectedDoctor.specialization}
          </SpecializationLabel>

          <Label>Detalles:</Label>
          <Input
            type="text"
            name="details"
            value={appointmentData.details}
            onChange={handleInputChange}
            placeholder="Detalles de la cita"
          />

          <Button type="submit">Guardar Cita</Button>
        </NewAppointmentForm>
      )}

      <EditFrom>
        <ChangeFrom patientInfo={patientInfo} />
      </EditFrom>
    </Section>
  );
};
