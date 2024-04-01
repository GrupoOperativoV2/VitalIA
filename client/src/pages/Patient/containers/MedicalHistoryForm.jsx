import React, { useState, useEffect } from 'react'; // Importa useEffect
import styled from 'styled-components';
import { useAuth } from '../../../context/authContext';

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

const MedicalHistoryForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    userId: userData?.id || '',  // Asegurarse de tener el userId en los datos del usuario
    name: userData?.name || '',
    birthdate: userData?.birthDate || '',
    gender: '',
    address: '',
    contactNumber: '',
    email: userData?.email || '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactNumber: '',
    pastDiseases: '',
    surgeries: '',
    hospitalizations: '',
    allergies: '',
    currentMedications: '',
    familyHistory: '',
    lifestyle: {
      diet: '',
      exercise: '',
      alcohol: '',
      smoking: ''
    },
    vaccinations: '',
    labResults: '',
    patientPhoto: null
  });

  const { addMedicalHistory, uploadPatientPhoto } = useAuth();

 useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthDate ? userData.birthDate.substring(0, 10) : ''
      }));
    }
  }, [userData]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && name === 'patientPhoto') {
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0]  // Asume que solo se sube 1 archivo
        }));
    } else if (name in formData.lifestyle) {
        setFormData(prevState => ({
            ...prevState,
            lifestyle: { ...prevState.lifestyle, [name]: value }
        }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Extraer patientPhoto de formData y preparar los demás datos para el envío
  const { patientPhoto, ...dataWithoutPhoto } = formData;
  const formattedData = {
      ...dataWithoutPhoto,
      lifestyle: dataWithoutPhoto.lifestyle // Asumiendo que lifestyle ya es un objeto adecuado
  };

  try {
      await addMedicalHistory(formData.userId, formattedData);
      alert('Historial médico enviado con éxito');

      // Si hay una foto para subir, hazlo después de enviar el formulario
      if (patientPhoto) {
          await uploadPatientPhoto(formData.userId, patientPhoto);
      }
  } catch (error) {
      console.error('Error al enviar el historial médico:', error);
      alert('Error al enviar el historial médico');
  }
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

