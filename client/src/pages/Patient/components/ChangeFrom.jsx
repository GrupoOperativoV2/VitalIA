import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/authContext";

export const ChangeFrom = ({ patientInfo }) => {
  const [medications, setMedications] = useState([{ name: "", dose: "" }]);
  const [formData, setFormData] = useState({ ...patientInfo });

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("patientPhotoUpload").click();
  };

  const [imagePreview, setImagePreview] = useState(
    patientInfo && patientInfo.patientPhoto
      ? `http://localhost:4000/${patientInfo.patientPhoto.replace(/\\+/g, "/")}`
      : "https://via.placeholder.com/150"
  );

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dose: "" }]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleChangeMedication = (index, field, value) => {
    const newMedications = medications.map((medication, i) => {
      if (i === index) {
        return { ...medication, [field]: value };
      }
      return medication;
    });
    setMedications(newMedications);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const [parentKey, childKey] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: checked,
      },
    }));
  };

  useEffect(() => {
    if (patientInfo && patientInfo.patientPhoto) {
      setImagePreview(
        `http://localhost:4000/${patientInfo.patientPhoto.replace(/\\+/g, "/")}`
      );
    } else {
      setImagePreview("https://via.placeholder.com/150");
    }
  }, [patientInfo]);

  useEffect(() => {
    if (patientInfo) {
      setFormData({ ...patientInfo });
    }
  }, [patientInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Asumiendo que tienes una función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario
  };

  return (
    <Form>
      <Fieldset>
        <Legend>Foto del Paciente</Legend>
        <ImagePreviewContainer>
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Vista previa de la imagen" />
          )}
        </ImagePreviewContainer>
        <FileInputButton onClick={handleFileButtonClick}>
          Cargar Foto
        </FileInputButton>
        <FileInput
          id="patientPhotoUpload"
          type="file"
          name="patientPhoto"
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información Personal</Legend>

        <Label>Nombre completo</Label>
        <Input
          type="text"
          name="name"
          value={formData.personalInformation?.name || ""}
          onChange={handleInputChange}
          placeholder="Ej: Juan Pérez"
        />

        <Label>Fecha de nacimiento</Label>
        <DateSelectContainer>
          <Select
            name="birthdateDay"
            value={
              new Date(formData.personalInformation?.birthdate).getDate() || ""
            }
            onChange={(e) => handleDateChange(e, "day")}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>

          <Select
            name="birthdateMonth"
            value={
              new Date(formData.personalInformation?.birthdate).getMonth() +
                1 || ""
            }
            onChange={(e) => handleDateChange(e, "month")}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            name="birthdateYear"
            value={
              new Date(formData.personalInformation?.birthdate).getFullYear() ||
              ""
            }
            onChange={(e) => handleDateChange(e, "year")}
            placeholder="Año"
          />
        </DateSelectContainer>

        <Label>Género</Label>
        <Select
          name="gender"
          value={formData.personalInformation?.gender || ""}
          onChange={handleInputChange}
        >
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </Select>

        <Label>Dirección</Label>
        <Input
          type="text"
          name="address"
          value={formData.personalInformation?.address || ""}
          onChange={handleInputChange}
          placeholder="Ej: Calle Ejemplo 123, Ciudad"
        />

        <Label>Número de contacto</Label>
        <Input
          type="tel"
          name="contactNumber"
          value={formData.personalInformation?.contactNumber || ""}
          onChange={handleInputChange}
          placeholder="+34 123 456 789"
        />

        <Label>Correo electrónico</Label>
        <Input
          type="email"
          name="email"
          value={formData.personalInformation?.email || ""}
          onChange={handleInputChange}
          placeholder="ejemplo@correo.com"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información Física</Legend>

        <Label>Peso (kg)</Label>
        <Input
          type="number"
          name="physicalInformation.weight"
          value={formData.physicalInformation?.weight || ""}
          onChange={handleInputChange}
          placeholder="Ej: 70"
        />

        <Label>Talla (cm)</Label>
        <Input
          type="number"
          name="physicalInformation.height"
          value={formData.physicalInformation?.height || ""}
          onChange={handleInputChange}
          placeholder="Ej: 175"
        />

        <Label>Presión Arterial (mmHg)</Label>
        <Input
          type="text"
          name="physicalInformation.bloodPressure"
          value={formData.physicalInformation?.bloodPressure || ""}
          onChange={handleInputChange}
          placeholder="Ej: 120/80"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información de Emergencia</Legend>

        <Label>Contacto de emergencia (nombre)</Label>
        <Input
          type="text"
          name="emergencyInformation.contactName"
          value={formData.emergencyInformation?.contactName || ""}
          onChange={handleInputChange}
          placeholder="Ej: María López"
        />

        <Label>Relación</Label>
        <Input
          type="text"
          name="emergencyInformation.contactRelation"
          value={formData.emergencyInformation?.contactRelation || ""}
          onChange={handleInputChange}
          placeholder="Ej: Madre"
        />

        <Label>Número de teléfono</Label>
        <Input
          type="tel"
          name="emergencyInformation.contactNumber"
          value={formData.emergencyInformation?.contactNumber || ""}
          onChange={handleInputChange}
          placeholder="+34 987 654 321"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Historial Médico</Legend>

        <Label>Tipo de sangre</Label>
        <Select
          name="medicalHistory.bloodType"
          value={formData.medicalHistory?.bloodType || ""}
          onChange={handleInputChange}
        >
          <option value="">Seleccione el tipo de sangre</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </Select>

        <Legend>Enfermedades previas</Legend>
        <CheckboxContainer>
          <label>
            <CheckboxInput type="checkbox" name="diabetes" />
            Diabetes
          </label>
          <label>
            <CheckboxInput type="checkbox" name="hypertension" />
            Hipertensión
          </label>
          <label>
            <CheckboxInput type="checkbox" name="obesity" />
            Obesidad
          </label>
          <label>
            <CheckboxInput type="checkbox" name="asthma" />
            Asma
          </label>
          <label>
            <CheckboxInput type="checkbox" name="cardiovascular" />
            Enfermedades cardiovasculares
          </label>
        </CheckboxContainer>
        <Label>Otras enfermedades</Label>
        <OtherInput type="text" name="otherDiseases" />

        <Legend>Cirugías</Legend>
        <CheckboxContainer>
          <label>
            <CheckboxInput type="checkbox" name="appendectomy" />
            Apendicectomía
          </label>
          <label>
            <CheckboxInput type="checkbox" name="cholecystectomy" />
            Colecistectomía
          </label>
          <label>
            <CheckboxInput type="checkbox" name="herniaRepair" />
            Reparación de hernia
          </label>
          <label>
            <CheckboxInput type="checkbox" name="hipReplacement" />
            Reemplazo de cadera
          </label>
          <label>
            <CheckboxInput type="checkbox" name="kneeReplacement" />
            Reemplazo de rodilla
          </label>
        </CheckboxContainer>
        <Label>Otras cirugías</Label>
        <OtherInput type="text" name="otherSurgeries" />

        <Label>Hospitalizaciones</Label>
        <Input
          name="hospitalizations"
          value={formData.medicalHistory?.hospitalizations || ""}
        />

        <Legend>Alergias</Legend>
        <CheckboxContainer>
          <label>
            <CheckboxInput type="checkbox" name="pollen" />
            Polen
          </label>
          <label>
            <CheckboxInput type="checkbox" name="dust" />
            Polvo
          </label>
          <label>
            <CheckboxInput type="checkbox" name="nuts" />
            Frutos secos
          </label>
          <label>
            <CheckboxInput type="checkbox" name="latex" />
            Látex
          </label>
          <label>
            <CheckboxInput type="checkbox" name="animalDander" />
            Caspa de animales
          </label>
        </CheckboxContainer>
        <Label>Otras alergias</Label>
        <OtherInput
          type="text"
          name="otherAllergies"
          placeholder="Otras alergias"
        />

        <Legend>Medicamentos actuales</Legend>
        {formData.medicalHistory?.medications.map((medication, index) => (
          <MedicationContainer key={index}>
            <MedicationInput
              type="text"
              name={`medications-${index}-name`}
              value={medication.name}
              onChange={(e) =>
                handleChangeMedication(index, "name", e.target.value)
              }
              placeholder="Nombre del medicamento"
            />
            <MedicationInput
              type="text"
              name={`medications-${index}-dose`}
              value={medication.dose}
              onChange={(e) =>
                handleChangeMedication(index, "dose", e.target.value)
              }
              placeholder="Dosis"
            />
            <button type="button" onClick={() => handleRemoveMedication(index)}>
              Eliminar
            </button>
          </MedicationContainer>
        ))}
        <button type="button" onClick={handleAddMedication}>
          Agregar medicamento
        </button>
      </Fieldset>

      <Fieldset>
        <Legend>Historial Familiar</Legend>
        <Label>
          Enfermedades hereditarias o condiciones de salud en la familia
        </Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput type="checkbox" name="familyDiabetes" />
            Diabetes
          </label>
          <label>
            <CheckboxInput type="checkbox" name="familyHypertension" />
            Hipertensión
          </label>
          <label>
            <CheckboxInput type="checkbox" name="familyCardiacDiseases" />
            Enfermedades cardíacas
          </label>
          <label>
            <CheckboxInput type="checkbox" name="familyCancer" />
            Cáncer
          </label>
          <label>
            <CheckboxInput type="checkbox" name="familyAutoimmuneDiseases" />
            Enfermedades autoinmunes
          </label>
        </CheckboxContainer>
        <Label>Otra</Label>
        <OtherInput type="text" name="otherFamilyDiseases" placeholder="Otra" />
      </Fieldset>

      <Fieldset>
        <Legend>Estilo de Vida</Legend>

        <Label>Hábitos de alimentación</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle.vegetarian"
              checked={formData.lifestyle?.vegetarian || false}
              onChange={handleCheckboxChange}
            />
            Vegetariana
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle.glutenFree"
              checked={formData.lifestyle?.glutenFree || false}
              onChange={handleCheckboxChange}
            />
            Sin gluten
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle.vegan"
              checked={formData.lifestyle?.vegan || false}
              onChange={handleCheckboxChange}
            />
            Vegana
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle.keto"
              checked={formData.lifestyle?.keto || false}
              onChange={handleCheckboxChange}
            />
            Keto
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle.paleo"
              checked={formData.lifestyle?.paleo || false}
              onChange={handleCheckboxChange}
            />
            Paleo
          </label>
        </CheckboxContainer>

        <Label>Descripción de otros hábitos alimenticios</Label>
        <OtherInput
          type="text"
          name="lifestyle.dietDescription"
          value={formData.lifestyle?.description || ""}
          onChange={handleInputChange}
        />

        <Label>Ejercicio</Label>
        <Select
          name="lifestyle.exercise"
          value={formData.lifestyle?.exercise || "none"}
          onChange={handleInputChange}
        >
          <option value="none">Ninguno</option>
          <option value="occasionally">Ocasionalmente</option>
          <option value="regularly">Regularmente</option>
          <option value="frequently">Frecuentemente</option>
        </Select>

        <Label>Consumo de alcohol</Label>
        <Select
          name="lifestyle.alcoholConsumption"
          value={formData.lifestyle?.alcoholConsumption || "none"}
          onChange={handleInputChange}
        >
          <option value="none">Ninguno</option>
          <option value="occasionally">Ocasionalmente</option>
          <option value="regularly">Regularmente</option>
          <option value="frequently">Frecuentemente</option>
        </Select>

        <Label>Tabaquismo</Label>
        <Select
          name="lifestyle.smokingHabits"
          value={formData.lifestyle?.smokingHabits || "none"}
          onChange={handleInputChange}
        >
          <option value="none">Ninguno</option>
          <option value="occasionally">Ocasionalmente</option>
          <option value="regularly">Regularmente</option>
          <option value="frequently">Frecuentemente</option>
        </Select>
      </Fieldset>

      <Fieldset>
        <Legend>Vacunas</Legend>
        <Label>Registro de vacunas recibidas</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations.influenza"
              checked={formData.vaccinations?.influenza || false}
              onChange={handleCheckboxChange}
            />
            Influenza
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations.tetanus"
              checked={formData.vaccinations?.tetanus || false}
              onChange={handleCheckboxChange}
            />
            Tétanos
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations.hepatitisB"
              checked={formData.vaccinations?.hepatitisB || false}
              onChange={handleCheckboxChange}
            />
            Hepatitis B
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations.measles"
              checked={formData.vaccinations?.measles || false}
              onChange={handleCheckboxChange}
            />
            Sarampión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations.covid19"
              checked={formData.vaccinations?.covid19 || false}
              onChange={handleCheckboxChange}
            />
            COVID-19
          </label>
        </CheckboxContainer>

        <Label>Otras vacunas</Label>
        <OtherInput
          type="text"
          name="vaccinations.otherVaccinations"
          value={formData.vaccinations?.otherVaccinations || ""}
          onChange={handleInputChange}
          placeholder="Otras vacunas recibidas"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Exámenes de Laboratorio</Legend>
        <Label>Resultados de exámenes de laboratorio recientes</Label>
        <Input
          type="text"
          name="labResults"
          value={formData.labResults || ""}
          onChange={handleInputChange}
          placeholder="Ej: Resultados normales, sin anomalías"
        />
      </Fieldset>

      <Button type="submit">Enviar Historial Médico</Button>
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 20px auto;
  max-width: 900px;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
`;

const Fieldset = styled.fieldset`
  grid-column: span 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
`;

const Legend = styled.legend`
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
`;

const ImagePreviewContainer = styled.div`
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  border-radius: 8px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 2px solid #ccc;
`;

const FileInputButton = styled.button`
  padding: 8px;
  background-color: #e7e7e7;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin-top: 10px;
  &:hover {
    background-color: #d4d4d4;
  }
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const DateSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 10px;
  > label {
    display: block;
    margin-bottom: 5px;
    cursor: pointer;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const OtherInput = styled(Input)`
  margin-top: 5px;
`;

const MedicationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > * {
    margin-right: 10px;
  }

  & > button {
    padding: 5px 10px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;

const MedicationInput = styled(Input)`
  flex: 1;
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