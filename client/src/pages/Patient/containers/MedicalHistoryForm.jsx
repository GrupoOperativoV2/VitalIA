import React, { useState, useEffect } from "react"; // Importa useEffect
import styled from "styled-components";
import profile from "../../../assets/Profile.jpg";
import { useAuth } from "../../../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 20px auto;
  max-width: 800px;
`;

const Fieldset = styled.fieldset`
  grid-column: 1 / -1;
  border: 2px solid #007bff;
  padding: 20px;
  border-radius: 8px;
`;

const Legend = styled.legend`
  color: #007bff;
  font-weight: bold;
  margin-left: 20px;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreviewContainer = styled.div`
  text-align: center; // Centra el contenido de la imagen
  margin-bottom: 20px;
  display: flex; // Utiliza flexbox para centrar
  justify-content: center; // Centra el contenido horizontalmente
`;

const ImagePreview = styled.img`
  border-radius: 50%;
  width: 150px; // Ajusta según la necesidad
  height: 150px; // Ajusta según la necesidad
  object-fit: cover;
  border: 4px solid #007bff;
`;

const FileInputButton = styled.button`
  display: inline-block; // Hace que el botón sea de bloque pero en línea
  padding: 10px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
  margin-left: 39%; // Agreg
`;

const FileInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const CenteredMessage = styled.h1`
  text-align: center;
  margin-top: 20px; // Ajusta según sea necesario para tu diseño
`;

const MedicalHistoryForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    userId: userData?.id || "", // Asegurarse de tener el userId en los datos del usuario
    name: userData?.name || "",
    birthdate: userData?.birthDate || "",
    gender: "",
    address: "",
    contactNumber: "",
    email: userData?.email || "",
    weight: "", // Peso en kg o lbs
    height: "", // Talla en cm o pulgadas
    bloodPressure: "", // Presión arterial en mmHg
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
    pastDiseases: "",
    surgeries: "",
    hospitalizations: "",
    allergies: "",
    currentMedications: "",
    familyHistory: "",
    lifestyle: {
      diet: "",
      exercise: "",
      alcohol: "",
      smoking: "",
    },
    vaccinations: "",
    labResults: "",
    patientPhoto: null,
  });

  const [errors, setErrors] = useState({});

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [imagePreview, setImagePreview] = useState(profile);

  const { addMedicalHistory, uploadPatientPhoto } = useAuth();

  const validate = () => {
    let tempErrors = {};

    // Validación de nombre
    if (!formData.name) tempErrors.name = "Por favor, llena este campo";

    // Validación de fecha de nacimiento
    if (!formData.birthdate)
      tempErrors.birthdate = "Por favor, llena este campo";

    // Validación de género
    if (!formData.gender)
      tempErrors.gender = "Por favor, selecciona una opción";

    // Validación de dirección
    if (!formData.address) tempErrors.address = "Por favor, llena este campo";

    // Validación de número de contacto
    if (!formData.contactNumber)
      tempErrors.contactNumber = "Por favor, llena este campo";

    // Validación de correo electrónico
    if (!formData.email) tempErrors.email = "Por favor, llena este campo";

    // Validación de peso
    if (!formData.weight) tempErrors.weight = "Por favor, llena este campo";

    // Validación de altura
    if (!formData.height) tempErrors.height = "Por favor, llena este campo";

    // Validación de presión arterial
    if (!formData.bloodPressure)
      tempErrors.bloodPressure = "Por favor, llena este campo";

    // Validación de nombre de contacto de emergencia
    if (!formData.emergencyContactName)
      tempErrors.emergencyContactName = "Por favor, llena este campo";

    // Validación de relación de contacto de emergencia
    if (!formData.emergencyContactRelation)
      tempErrors.emergencyContactRelation = "Por favor, llena este campo";

    // Validación de número de contacto de emergencia
    if (!formData.emergencyContactNumber)
      tempErrors.emergencyContactNumber = "Por favor, llena este campo";

    // Validación de enfermedades previas
    if (!formData.pastDiseases)
      tempErrors.pastDiseases = "Por favor, llena este campo";

    // Validación de cirugías
    if (!formData.surgeries)
      tempErrors.surgeries = "Por favor, llena este campo";

    // Validación de hospitalizaciones
    if (!formData.hospitalizations)
      tempErrors.hospitalizations = "Por favor, llena este campo";

    // Validación de alergias
    if (!formData.allergies)
      tempErrors.allergies = "Por favor, llena este campo";

    // Validación de medicamentos actuales
    if (!formData.currentMedications)
      tempErrors.currentMedications = "Por favor, llena este campo";

    // Validación de historia familiar
    if (!formData.familyHistory)
      tempErrors.familyHistory = "Por favor, llena este campo";

    // Validaciones para campos de estilo de vida (ejemplo: dieta, ejercicio, alcohol, tabaquismo)
    if (!formData.lifestyle.diet)
      tempErrors.diet = "Por favor, llena este campo";
    if (!formData.lifestyle.exercise)
      tempErrors.exercise = "Por favor, llena este campo";
    if (!formData.lifestyle.alcohol)
      tempErrors.alcohol = "Por favor, llena este campo";
    if (!formData.lifestyle.smoking)
      tempErrors.smoking = "Por favor, llena este campo";

    // Validación de vacunas
    if (!formData.vaccinations)
      tempErrors.vaccinations = "Por favor, llena este campo";

    // Validación de resultados de laboratorio
    if (!formData.labResults)
      tempErrors.labResults = "Por favor, llena este campo";

    // Validación de nombre (solo letras)
    if (!formData.name || !/^[\p{L} \p{M}'-]+$/u.test(formData.name)) {
      tempErrors.name =
        "Por favor, introduce un nombre válido (letras, acentos y guiones permitidos)";
    }

    // Validación de correo electrónico (formato estándar de email)
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Por favor, introduce un correo electrónico válido";
    }

    if (!formData.bloodType) {
      tempErrors.bloodType = "Por favor, selecciona el tipo de sangre";
    }
    
    // Validación de número de contacto (números y caracteres especiales permitidos)
    if (
      !formData.contactNumber ||
      !/^\+?[0-9\- ]+$/.test(formData.contactNumber)
    ) {
      tempErrors.contactNumber =
        "Por favor, introduce un número de contacto válido";
    }

    // Validación de dirección (combinación de números y letras permitida)
    if (!formData.address) {
      tempErrors.address = "Por favor, llena este campo";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Retorna true si no hay errores
  };

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthDate
          ? userData.birthDate.substring(0, 10)
          : "",
      }));
    }
  }, [userData]);

  const handleFileButtonClick = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    document.getElementById("patientPhotoUpload").click(); // Abre el cuadro de diálogo de archivo
  };

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Validación al cambiar los campos
    let newErrors = { ...errors };
    if (!value && name !== "patientPhoto") {
      newErrors[name] = "Por favor, llena este campo";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    if (name === "patientPhoto" && files.length) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (["jpg", "jpeg", "png"].includes(fileExtension)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: file,
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Solo se permiten imágenes en formato JPG o PNG.");
      }
    } else if (name in formData.lifestyle) {
      setFormData((prevState) => ({
        ...prevState,
        lifestyle: { ...prevState.lifestyle, [name]: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // Extraer patientPhoto de formData y preparar los demás datos para el envío
      const { patientPhoto, ...dataWithoutPhoto } = formData;
      const formattedData = {
        ...dataWithoutPhoto,
        lifestyle: dataWithoutPhoto.lifestyle, // Asumiendo que lifestyle ya es un objeto adecuado
      };

      try {
        await addMedicalHistory(formData.userId, formattedData);
        setFormSubmitted(true); // Esto ocultará el formulario
        toast.success("Historial médico llenado con éxito");

        // Si hay una foto para subir, hazlo después de enviar el formulario
        if (patientPhoto) {
          await uploadPatientPhoto(formData.userId, patientPhoto);
        }
      } catch (error) {
        console.error("Error al enviar el historial médico:", error);
        toast.error("Error al enviar el historial médico");
      }
    }
  };

  if (formSubmitted) {
    return (
      <div>
        <CenteredMessage>
          Gracias por enviar su historial médico.
        </CenteredMessage>
        <br></br>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Label>Fecha de nacimiento</Label>
        <Input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          placeholder="AAAA-MM-DD"
        />
        {errors.birthdate && <ErrorMessage>{errors.birthdate}</ErrorMessage>}

        <Label>Género</Label>
        <Select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </Select>
        {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}

        <Label>Dirección</Label>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Ej: Calle Ejemplo 123, Ciudad"
        />
        {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}

        <Label>Número de contacto</Label>
        <Input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="+34 123 456 789"
        />
        {errors.contactNumber && (
          <ErrorMessage>{errors.contactNumber}</ErrorMessage>
        )}

        <Label>Correo electrónico</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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
        {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}

        <Label>Talla (cm)</Label>
        <Input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Ej: 175"
        />
        {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}

        <Label>Presión Arterial (mmHg)</Label>
        <Input
          type="text"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          placeholder="Ej: 120/80"
        />
        {errors.bloodPressure && (
          <ErrorMessage>{errors.bloodPressure}</ErrorMessage>
        )}
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
        {errors.emergencyContactName && (
          <ErrorMessage>{errors.emergencyContactName}</ErrorMessage>
        )}

        <Label>Relación</Label>
        <Input
          type="text"
          name="emergencyContactRelation"
          value={formData.emergencyContactRelation}
          onChange={handleChange}
          placeholder="Ej: Madre"
        />
        {errors.emergencyContactRelation && (
          <ErrorMessage>{errors.emergencyContactRelation}</ErrorMessage>
        )}

        <Label>Número de teléfono</Label>
        <Input
          type="tel"
          name="emergencyContactNumber"
          value={formData.emergencyContactNumber}
          onChange={handleChange}
          placeholder="+34 987 654 321"
        />
        {errors.emergencyContactNumber && (
          <ErrorMessage>{errors.emergencyContactNumber}</ErrorMessage>
        )}
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
        {errors.bloodType && <ErrorMessage>{errors.bloodType}</ErrorMessage>}

        <Label>Enfermedades previas</Label>
        <TextArea
          name="pastDiseases"
          value={formData.pastDiseases}
          onChange={handleChange}
          placeholder="Ej: Diabetes Tipo 2"
        />
        {errors.pastDiseases && (
          <ErrorMessage>{errors.pastDiseases}</ErrorMessage>
        )}

        <Label>Cirugías</Label>
        <TextArea
          name="surgeries"
          value={formData.surgeries}
          onChange={handleChange}
          placeholder="Ej: Apendicectomía en 2010"
        />
        {errors.surgeries && <ErrorMessage>{errors.surgeries}</ErrorMessage>}

        <Label>Hospitalizaciones</Label>
        <TextArea
          name="hospitalizations"
          value={formData.hospitalizations}
          onChange={handleChange}
          placeholder="Ej: Hospitalización por neumonía en 2015"
        />
        {errors.hospitalizations && (
          <ErrorMessage>{errors.hospitalizations}</ErrorMessage>
        )}

        <Label>Alergias</Label>
        <TextArea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Ej: Alergia al polen"
        />
        {errors.allergies && <ErrorMessage>{errors.allergies}</ErrorMessage>}

        <Label>Medicamentos actuales</Label>
        <TextArea
          name="currentMedications"
          value={formData.currentMedications}
          onChange={handleChange}
          placeholder="Ej: Metformina 500 mg diarios"
        />
        {errors.currentMedications && (
          <ErrorMessage>{errors.currentMedications}</ErrorMessage>
        )}
      </Fieldset>

      <Fieldset>
        <Legend>Historial Familiar</Legend>
        <Label>
          Enfermedades hereditarias o condiciones de salud en la familia
        </Label>
        <TextArea
          name="familyHistory"
          value={formData.familyHistory}
          onChange={handleChange}
          placeholder="Ej: Abuelo con enfermedad cardíaca"
        />
        {errors.familyHistory && (
          <ErrorMessage>{errors.familyHistory}</ErrorMessage>
        )}
      </Fieldset>

      <Fieldset>
        <Legend>Estilo de Vida</Legend>
        <Label>Hábitos de alimentación</Label>
        <Input
          type="text"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          placeholder="Ej: Vegetariana, sin gluten"
        />
        {errors.diet && <ErrorMessage>{errors.diet}</ErrorMessage>}

        <Label>Ejercicio</Label>
        <Input
          type="text"
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
          placeholder="Ej: Correr 30 min diarios"
        />
        {errors.exercise && <ErrorMessage>{errors.exercise}</ErrorMessage>}

        <Label>Consumo de alcohol</Label>
        <Input
          type="text"
          name="alcohol"
          value={formData.alcohol}
          onChange={handleChange}
          placeholder="Ej: Ocasionalmente, fines de semana"
        />
        {errors.alcohol && <ErrorMessage>{errors.alcohol}</ErrorMessage>}

        <Label>Tabaquismo</Label>
        <Input
          type="text"
          name="smoking"
          value={formData.smoking}
          onChange={handleChange}
          placeholder="Ej: No fumador"
        />
        {errors.smoking && <ErrorMessage>{errors.smoking}</ErrorMessage>}
      </Fieldset>

      <Fieldset>
        <Legend>Vacunas</Legend>
        <Label>Registro de vacunas recibidas</Label>
        <TextArea
          name="vaccinations"
          value={formData.vaccinations}
          onChange={handleChange}
          placeholder="Ej: Vacuna contra la gripe anual"
        />
        {errors.vaccinations && (
          <ErrorMessage>{errors.vaccinations}</ErrorMessage>
        )}
      </Fieldset>

      <Fieldset>
        <Legend>Exámenes de Laboratorio</Legend>
        <Label>Resultados de exámenes de laboratorio recientes</Label>
        <TextArea
          name="labResults"
          value={formData.labResults}
          onChange={handleChange}
          placeholder="Ej: Resultados normales, sin anomalías"
        />
        {errors.labResults && <ErrorMessage>{errors.labResults}</ErrorMessage>}
      </Fieldset>

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

      <Button type="submit">Enviar Historial Médico</Button>
    </Form>
  );
};

export { MedicalHistoryForm };
