import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para el formulario
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
`;

const Fieldset = styled.fieldset`
  grid-column: 1 / -1;
  border: 1px solid #ccc;
  padding: 20px;
`;

const Legend = styled.legend`
  padding: 0 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  width: 200px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    address: '',
    contactNumber: '',
    email: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactNumber: '',
    pastDiseases: '',
    surgeries: '',
    hospitalizations: '',
    allergies: '',
    currentMedications: '',
    familyHistory: '',
    lifestyle: '',
    vaccinations: '',
    labResults: '',
    patientPhoto: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>Información Personal</Legend>
        <Label>Nombre completo</Label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} />

        <Label>Fecha de nacimiento</Label>
        <Input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

        <Label>Género</Label>
        <Input type="text" name="gender" value={formData.gender} onChange={handleChange} />

        <Label>Dirección</Label>
        <Input type="text" name="address" value={formData.address} onChange={handleChange} />

        <Label>Número de contacto</Label>
        <Input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />

        <Label>Correo electrónico</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Información de Emergencia</Legend>
        <Label>Contacto de emergencia (nombre)</Label>
        <Input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />

        <Label>Relación</Label>
        <Input type="text" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleChange} />

        <Label>Número de teléfono</Label>
        <Input type="tel" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Historial Médico</Legend>
        <Label>Enfermedades previas</Label>
        <TextArea name="pastDiseases" value={formData.pastDiseases} onChange={handleChange} />

        <Label>Cirugías</Label>
        <TextArea name="surgeries" value={formData.surgeries} onChange={handleChange} />

        <Label>Hospitalizaciones</Label>
        <TextArea name="hospitalizations" value={formData.hospitalizations} onChange={handleChange} />

        <Label>Alergias</Label>
        <TextArea name="allergies" value={formData.allergies} onChange={handleChange} />

        <Label>Medicamentos actuales</Label>
        <TextArea name="currentMedications" value={formData.currentMedications} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Historial Familiar</Legend>
        <Label>Enfermedades hereditarias o condiciones de salud en la familia</Label>
        <TextArea name="familyHistory" value={formData.familyHistory} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Estilo de Vida</Legend>
        <Label>Hábitos de alimentación</Label>
        <Input type="text" name="diet" value={formData.diet} onChange={handleChange} />

        <Label>Ejercicio</Label>
        <Input type="text" name="exercise" value={formData.exercise} onChange={handleChange} />

        <Label>Consumo de alcohol</Label>
        <Input type="text" name="alcohol" value={formData.alcohol} onChange={handleChange} />

        <Label>Tabaquismo</Label>
        <Input type="text" name="smoking" value={formData.smoking} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Vacunas</Legend>
        <Label>Registro de vacunas recibidas</Label>
        <TextArea name="vaccinations" value={formData.vaccinations} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Exámenes de Laboratorio</Legend>
        <Label>Resultados de exámenes de laboratorio recientes</Label>
        <TextArea name="labResults" value={formData.labResults} onChange={handleChange} />
      </Fieldset>

      <Fieldset>
        <Legend>Foto del Paciente</Legend>
        <Input type="file" name="patientPhoto" onChange={handleChange} />
      </Fieldset>

      <Button type="submit">Enviar Historial Médico</Button>
    </Form>
  );
};

export { MedicalHistoryForm };

