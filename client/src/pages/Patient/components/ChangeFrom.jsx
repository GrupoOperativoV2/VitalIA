import React, { useState, useEffect } from "react";
import styled from "styled-components";

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


export const ChangeFrom = ({ patientInfo }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (e.target.closest("fieldset").legend.textContent === "Estilo de Vida") {
      setFormData((prev) => ({
        ...prev,
        lifestyle: { ...prev.lifestyle, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    document.getElementById("patientPhotoUpload").click(); // Abre el cuadro de diálogo de archivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (validate()) {
    //   // Extraer patientPhoto de formData y preparar los demás datos para el envío
    //   const { patientPhoto, ...dataWithoutPhoto } = formData;
    //   const formattedData = {
    //     ...dataWithoutPhoto,
    //     lifestyle: dataWithoutPhoto.lifestyle, // Asumiendo que lifestyle ya es un objeto adecuado
    //   };

    //   try {
    //     await addMedicalHistory(formData.userId, formattedData);
    //     setFormSubmitted(true); // Esto ocultará el formulario
    //     toast.success("Historial médico llenado con éxito");

    //     // Si hay una foto para subir, hazlo después de enviar el formulario
    //     if (patientPhoto) {
    //       await uploadPatientPhoto(formData.userId, patientPhoto);
    //     }
    //   } catch (error) {
    //     console.error("Error al enviar el historial médico:", error);
    //     toast.error("Error al enviar el historial médico");
    //   }
    // }
  };

  const isoDateString = patientInfo?.birthdate;
  const dateParts = isoDateString ? new Date(isoDateString) : new Date();
  const day = dateParts.getDate();
  const month = dateParts.getMonth() + 1; // getMonth() devuelve un índice basado en 0, por eso se suma 1
  const year = dateParts.getFullYear();

  const [formData, setFormData] = useState({
    userId: patientInfo?.userId || "",
    name: patientInfo?.name || "",
    birthdate: {
      day: day,
      month: month,
      year: year,
    },
    gender: patientInfo?.gender || "",
    address: patientInfo?.address || "",
    contactNumber: patientInfo?.contactNumber || "",
    email: patientInfo?.email || "",
    weight: patientInfo?.weight || "", // Peso en kg o lbs
    height: patientInfo?.height || "", // Talla en cm o pulgadas
    bloodPressure: patientInfo?.bloodPressure || "", // Presión arterial en mmHg
    emergencyContactName: patientInfo?.emergencyContactName || "",
    emergencyContactRelation: patientInfo?.emergencyContactRelation || "",
    emergencyContactNumber: patientInfo?.emergencyContactNumber || "",
    bloodType: patientInfo?.bloodType || "",
    pastDiseases: patientInfo?.pastDiseases || "",
    surgeries: patientInfo?.surgeries || "",
    hospitalizations: patientInfo?.hospitalizations || "",
    allergies: patientInfo?.allergies || "",
    currentMedications: patientInfo?.currentMedications || "",
    familyHistory: patientInfo?.familyHistory || "",
    lifestyle: {
      diet: patientInfo?.lifestyle?.diet || "",
      exercise: patientInfo?.lifestyle?.exercise || "",
      alcohol: patientInfo?.lifestyle?.alcohol || "",
      smoking: patientInfo?.lifestyle?.smoking || "",
    },
    vaccinations: patientInfo?.vaccinations || "",
    labResults: patientInfo?.labResults || "",
    patientPhoto: patientInfo?.patientPhoto || null,
  });

  const handleChangeDate = (e, part) => {
    setFormData((prev) => ({
      ...prev,
      birthdate: {
        ...prev.birthdate,
        [part]: e.target.value,
      },
    }));
  };

  const [imagePreview, setImagePreview] = useState(
    patientInfo && patientInfo.patientPhoto
      ? `http://localhost:4000/${patientInfo.patientPhoto.replace(/\\+/g, "/")}`
      : "https://via.placeholder.com/150"
  );

  // Asegúrate de actualizar este estado si `patientInfo` cambia, lo cual puede ser necesario si `patientInfo` se carga asíncronamente
  useEffect(() => {
    if (patientInfo && patientInfo.patientPhoto) {
      setImagePreview(
        `http://localhost:4000/${patientInfo.patientPhoto.replace(/\\+/g, "/")}`
      );
    } else {
      setImagePreview("https://via.placeholder.com/150");
    }
  }, [patientInfo]);

  const [medications, setMedications] = useState([{ name: "", dose: "" }]);

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

  return (
    <Form onSubmit={handleSubmit}>
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
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información Personal</Legend>
        <Label>Nombre completo</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Ej: Juan Pérez"
          onChange={handleChange}
        />

        <Label>Fecha de nacimiento</Label>
        <DateSelectContainer>
          <Select
            name="birthdateDay"
            value={formData.birthdate.day}
            onChange={(e) => handleChangeDate(e, "day")}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>

          <Select
            name="birthdateMonth"
            value={formData.birthdate.month}
            onChange={(e) => handleChangeDate(e, "month")}
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
            value={formData.birthdate.year}
            onChange={(e) => handleChangeDate(e, "year")}
            placeholder="Año"
          />
        </DateSelectContainer>

        <Label>Género</Label>
        <Select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </Select>

        <Label>Dirección</Label>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Ej: Calle Ejemplo 123, Ciudad"
        />

        <Label>Número de contacto</Label>
        <Input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="+34 123 456 789"
        />

        <Label>Correo electrónico</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información Física</Legend>
        <Label>Peso (kg)</Label>
        <Input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Ej: 70"
        />

        <Label>Talla (cm)</Label>
        <Input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Ej: 175"
        />

        <Label>Presión Arterial (mmHg)</Label>
        <Input
          type="text"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          placeholder="Ej: 120/80"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Información de Emergencia</Legend>
        <Label>Contacto de emergencia (nombre)</Label>
        <Input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          placeholder="Ej: María López"
        />

        <Label>Relación</Label>
        <Input
          type="text"
          name="emergencyContactRelation"
          value={formData.emergencyContactRelation}
          onChange={handleChange}
          placeholder="Ej: Madre"
        />

        <Label>Número de teléfono</Label>
        <Input
          type="tel"
          name="emergencyContactNumber"
          value={formData.emergencyContactNumber}
          onChange={handleChange}
          placeholder="+34 987 654 321"
        />
      </Fieldset>

      <Fieldset>
        <Legend>Historial Médico</Legend>

        <Label>Tipo de sangre</Label>
        <Select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
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
            <CheckboxInput
              type="checkbox"
              name="diabetes"
              checked={formData.pastDiseases.diabetes}
              onChange={(e) =>
                handleChangeCheckbox(e, "pastDiseases", "diabetes")
              }
            />
            Diabetes
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="hypertension"
              checked={formData.pastDiseases.hypertension}
              onChange={(e) =>
                handleChangeCheckbox(e, "pastDiseases", "hypertension")
              }
            />
            Hipertensión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="obesity"
              checked={formData.pastDiseases.obesity}
              onChange={(e) =>
                handleChangeCheckbox(e, "pastDiseases", "obesity")
              }
            />
            Obesidad
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="asthma"
              checked={formData.pastDiseases.asthma}
              onChange={(e) =>
                handleChangeCheckbox(e, "pastDiseases", "asthma")
              }
            />
            Asma
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="cardiovascular"
              checked={formData.pastDiseases.cardiovascular}
              onChange={(e) =>
                handleChangeCheckbox(e, "pastDiseases", "cardiovascular")
              }
            />
            Enfermedades cardiovasculares
          </label>
        </CheckboxContainer>
        <Label>Otras enfermedades</Label>
        <OtherInput
          type="text"
          name="otherDiseases"
          value={formData.pastDiseases.other}
          onChange={(e) => handleChange(e)}
          placeholder="Otras enfermedades"
        />

        <Legend>Cirugías</Legend>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="appendectomy"
              checked={formData.surgeries.appendectomy}
              onChange={(e) =>
                handleChangeCheckbox(e, "surgeries", "appendectomy")
              }
            />
            Apendicectomía
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="cholecystectomy"
              checked={formData.surgeries.cholecystectomy}
              onChange={(e) =>
                handleChangeCheckbox(e, "surgeries", "cholecystectomy")
              }
            />
            Colecistectomía
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="herniaRepair"
              checked={formData.surgeries.herniaRepair}
              onChange={(e) =>
                handleChangeCheckbox(e, "surgeries", "herniaRepair")
              }
            />
            Reparación de hernia
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="hipReplacement"
              checked={formData.surgeries.hipReplacement}
              onChange={(e) =>
                handleChangeCheckbox(e, "surgeries", "hipReplacement")
              }
            />
            Reemplazo de cadera
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="kneeReplacement"
              checked={formData.surgeries.kneeReplacement}
              onChange={(e) =>
                handleChangeCheckbox(e, "surgeries", "kneeReplacement")
              }
            />
            Reemplazo de rodilla
          </label>
        </CheckboxContainer>
        <Label>Otras cirugías</Label>
        <OtherInput
          type="text"
          name="otherSurgeries"
          value={formData.surgeries.other}
          onChange={(e) => handleChange(e)}
          placeholder="Otras cirugías"
        />

        <Label>Hospitalizaciones</Label>
        <Input
          name="hospitalizations"
          value={formData.hospitalizations}
          onChange={handleChange}
          placeholder="Ej: Hospitalización por neumonía en 2015"
        />

        <Legend>Alergias</Legend>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pollen"
              checked={formData.allergies.pollen}
              onChange={(e) => handleChangeCheckbox(e, "allergies", "pollen")}
            />
            Polen
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="dust"
              checked={formData.allergies.dust}
              onChange={(e) => handleChangeCheckbox(e, "allergies", "dust")}
            />
            Polvo
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="nuts"
              checked={formData.allergies.nuts}
              onChange={(e) => handleChangeCheckbox(e, "allergies", "nuts")}
            />
            Frutos secos
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="latex"
              checked={formData.allergies.latex}
              onChange={(e) => handleChangeCheckbox(e, "allergies", "latex")}
            />
            Látex
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="animalDander"
              checked={formData.allergies.animalDander}
              onChange={(e) =>
                handleChangeCheckbox(e, "allergies", "animalDander")
              }
            />
            Caspa de animales
          </label>
        </CheckboxContainer>
        <Label>Otras alergias</Label>
        <OtherInput
          type="text"
          name="otherAllergies"
          value={formData.allergies.other}
          onChange={(e) => handleChange(e)}
          placeholder="Otras alergias"
        />

        <Legend>Medicamentos actuales</Legend>
        {medications.map((medication, index) => (
          <MedicationContainer key={index}>
            <MedicationInput
              type="text"
              name={`medicationName-${index}`}
              value={medication.name}
              onChange={(e) =>
                handleChangeMedication(index, "name", e.target.value)
              }
              placeholder="Nombre del medicamento"
            />
            <MedicationInput
              type="text"
              name={`medicationDose-${index}`}
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
            <CheckboxInput
              type="checkbox"
              name="familyDiabetes"
              checked={formData.familyHistory.diabetes}
              onChange={(e) =>
                handleChangeCheckbox(e, "familyHistory", "diabetes")
              }
            />
            Diabetes
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyHypertension"
              checked={formData.familyHistory.hypertension}
              onChange={(e) =>
                handleChangeCheckbox(e, "familyHistory", "hypertension")
              }
            />
            Hipertensión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyCardiacDiseases"
              checked={formData.familyHistory.cardiacDiseases}
              onChange={(e) =>
                handleChangeCheckbox(e, "familyHistory", "cardiacDiseases")
              }
            />
            Enfermedades cardíacas
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyCancer"
              checked={formData.familyHistory.cancer}
              onChange={(e) =>
                handleChangeCheckbox(e, "familyHistory", "cancer")
              }
            />
            Cáncer
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyAutoimmuneDiseases"
              checked={formData.familyHistory.autoimmuneDiseases}
              onChange={(e) =>
                handleChangeCheckbox(e, "familyHistory", "autoimmuneDiseases")
              }
            />
            Enfermedades autoinmunes
          </label>
        </CheckboxContainer>
        <Label>Otra</Label>
        <OtherInput
          type="text"
          name="otherFamilyDiseases"
          value={formData.familyHistory.other}
          onChange={(e) => handleChange(e)}
          placeholder="Otra"
        />
      </Fieldset>

<Fieldset>
<Legend>Estilo de Vida</Legend>

<Label>Hábitos de alimentación</Label>
<CheckboxContainer>
  <label>
    <CheckboxInput
      type="checkbox"
      name="vegetarian"
      checked={formData.lifestyle.diet.vegetarian}
      onChange={(e) => handleChangeCheckbox(e, 'lifestyle.diet', 'vegetarian')}
    />
    Vegetariana
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="glutenFree"
      checked={formData.lifestyle.diet.glutenFree}
      onChange={(e) => handleChangeCheckbox(e, 'lifestyle.diet', 'glutenFree')}
    />
    Sin gluten
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="vegan"
      checked={formData.lifestyle.diet.vegan}
      onChange={(e) => handleChangeCheckbox(e, 'lifestyle.diet', 'vegan')}
    />
    Vegana
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="keto"
      checked={formData.lifestyle.diet.keto}
      onChange={(e) => handleChangeCheckbox(e, 'lifestyle.diet', 'keto')}
    />
    Keto
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="paleo"
      checked={formData.lifestyle.diet.paleo}
      onChange={(e) => handleChangeCheckbox(e, 'lifestyle.diet', 'paleo')}
    />
    Paleo
  </label>
</CheckboxContainer>
<Label>Descripción de otros hábitos alimenticios</Label>
<OtherInput
  type="text"
  name="dietDescription"
  value={formData.lifestyle.dietDescription}
  onChange={(e) => handleChange(e)}
  placeholder="Describa otros hábitos alimenticios"
/>


<Label>Ejercicio</Label>
<Select
  name="exercise"
  value={formData.lifestyle.exercise}
  onChange={(e) => handleChange(e)}
>
<option value="none">Ninguno</option>
<option value="occasionally">Ocasionalmente</option>
  <option value="regularly">Regularmente</option>
  <option value="frequently">Frecuentemente</option>
</Select>

<Label>Consumo de alcohol</Label>
<Select
  name="alcohol"
  value={formData.lifestyle.alcohol}
  onChange={(e) => handleChange(e)}
>
  <option value="none">Ninguno</option>
  <option value="occasionally">Ocasionalmente</option>
  <option value="regularly">Regularmente</option>
  <option value="frequently">Frecuentemente</option>
</Select>

<Label>Tabaquismo</Label>
<Select
  name="smoking"
  value={formData.lifestyle.smoking}
  onChange={(e) => handleChange(e)}
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
      name="influenza"
      checked={formData.vaccinations.influenza}
      onChange={(e) => handleChangeCheckbox(e, 'vaccinations', 'influenza')}
    />
    Influenza
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="tetanus"
      checked={formData.vaccinations.tetanus}
      onChange={(e) => handleChangeCheckbox(e, 'vaccinations', 'tetanus')}
    />
    Tétanos
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="hepatitisB"
      checked={formData.vaccinations.hepatitisB}
      onChange={(e) => handleChangeCheckbox(e, 'vaccinations', 'hepatitisB')}
    />
    Hepatitis B
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="measles"
      checked={formData.vaccinations.measles}
      onChange={(e) => handleChangeCheckbox(e, 'vaccinations', 'measles')}
    />
    Sarampión
  </label>
  <label>
    <CheckboxInput
      type="checkbox"
      name="covid19"
      checked={formData.vaccinations.covid19}
      onChange={(e) => handleChangeCheckbox(e, 'vaccinations', 'covid19')}
    />
    COVID-19
  </label>
</CheckboxContainer>
<Label>Otras vacunas</Label>
<OtherInput
  type="text"
  name="otherVaccinations"
  value={formData.vaccinations.other}
  onChange={(e) => handleChange(e)}
  placeholder="Otras vacunas recibidas"
/>
</Fieldset>

      <Fieldset>
        <Legend>Exámenes de Laboratorio</Legend>
        <Label>Resultados de exámenes de laboratorio recientes</Label>
        <Input
          name="labResults"
          value={formData.labResults}
          onChange={handleChange}
          placeholder="Ej: Resultados normales, sin anomalías"
        />
      </Fieldset>

      <Button type="submit">Enviar Historial Médico</Button>
    </Form>
  );
};
