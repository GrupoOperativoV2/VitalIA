import React, { useState, useEffect } from "react"; // Importa useEffect
import styled from "styled-components";
import profile from "../../../assets/Profile.jpg";
import { useAuth } from "../../../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Form = styled.form`
  display: grid;
  grid-template-columns: 500px 500px; // La primera columna tiene un ancho fijo de 300px y la segunda toma el espacio restante
  grid-gap: 40px;
  margin: 20px auto;
  max-width: 1200px;
  margin-left: 60px;
`;

const Fieldset = styled.fieldset`
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

const MedicalHistoryForm = ({ userData, onClose }) => {
  const [phonePrefix, setPhonePrefix] = useState("+52");

  const handlePrefixChange = (e) => {
    setPhonePrefix(e.target.value);
  };
  const [formData, setFormData] = useState({
    userId: userData?.id || "",
    name: userData?.name || "",
    birthdateDay: userData?.birthDate
      ? new Date(userData.birthDate).getDate() + 1
      : "",
    birthdateMonth: userData?.birthDate
      ? new Date(userData.birthDate).getMonth() + 1
      : "",
    birthdateYear: userData?.birthDate
      ? new Date(userData.birthDate).getFullYear()
      : "",
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
    hospitalizations: "",
    familyHistory: "",
    bloodType: "",
    lifestyle: {
      vegetarian: false,
      glutenFree: false,
      vegan: false,
      keto: false,
      paleo: false,
      dietDescription: "",
      exercise: "none",
      alcohol: "none",
      smoking: "none",
    },
    pastDiseases: {
      diabetes: false,
      hypertension: false,
      obesity: false,
      asthma: false,
      cardiovascular: false,
      otherDiseases: "",
    },
    surgeries: {
      appendectomy: false,
      cholecystectomy: false,
      herniaRepair: false,
      hipReplacement: false,
      kneeReplacement: false,
      otherSurgeries: "",
    },
    allergies: {
      pollen: false,
      dust: false,
      nuts: false,
      latex: false,
      animalDander: false,
      otherAllergies: "",
    },
    familyHistory: {
      familyDiabetes: false,
      familyHypertension: false,
      familyCardiacDiseases: false,
      familyCancer: false,
      familyAutoimmuneDiseases: false,
      otherFamilyDiseases: "",
    },
    vaccinations: {
      influenza: false,
      tetanus: false,
      hepatitisB: false,
      measles: false,
      covid19: false,
      otherVaccinations: "",
    },
    labResults: "",
    patientPhoto: null,
  });

  const [errors, setErrors] = useState({});

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [imagePreview, setImagePreview] = useState(profile);

  const { addMedicalHistory, uploadPatientPhoto } = useAuth();

  const [medications, setMedications] = useState([]);

  const [systolic, setSystolic] = useState("");

  const [diastolic, setDiastolic] = useState("");

  const [showOtherDiseases, setShowOtherDiseases] = useState(false);
  const [showOtherSurgeries, setShowOtherSurgeries] = useState(false);
  const [showOtherAllergies, setShowOtherAllergies] = useState(false);
  const [showOtherFamilyHistory, setShowOtherFamilyHistory] = useState(false);
  const [showOtherVaccinations, setShowOtherVaccinations] = useState(false);
  const [hospitalizations, setHospitalizations] = useState([]);
  const [labTests, setLabTests] = useState([]);

  const handleAddLabTest = () => {
    const newTest = {
      date: '',
      diagnosis: '',
      doctor: '',
      aspect: '',
      results: ''
    };
    setLabTests([...labTests, newTest]);
  };
  
  const handleRemoveLabTest = (index) => {
    setLabTests(labTests.filter((_, i) => i !== index));
  };
  
  const handleChangeLabTest = (index, field, value) => {
    const updatedTests = labTests.map((test, i) => {
      if (i === index) {
        return { ...test, [field]: value };
      }
      return test;
    });
    setLabTests(updatedTests);
  };
  


  const handleAddHospitalization = () => {
    setHospitalizations([...hospitalizations, ""]); // Agrega un campo vacío
  };
  const toggleOtherVaccinations = () => {
    setShowOtherVaccinations(!showOtherVaccinations);
  };

  const handleRemoveHospitalization = (index) => {
    setHospitalizations(hospitalizations.filter((_, i) => i !== index));
  };

  const handleChangeHospitalization = (value, index) => {
    const updatedHospitalizations = hospitalizations.map((item, i) =>
      i === index ? value : item
    );
    setHospitalizations(updatedHospitalizations);
  };

  const toggleOtherFamilyHistory = () => {
    setShowOtherFamilyHistory(!showOtherFamilyHistory);
  };
  const handleToggleOtherDiseases = () =>
    setShowOtherDiseases(!showOtherDiseases);
  const handleToggleOtherSurgeries = () =>
    setShowOtherSurgeries(!showOtherSurgeries);
  const handleToggleOtherAllergies = () =>
    setShowOtherAllergies(!showOtherAllergies);

  // Esta función se debería llamar después de un registro exitoso
  const handleUserRegistration = () => {
    localStorage.setItem("isFirstLogin", "true");
    localStorage.setItem("isFormSubmitted", "false");
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
    const { name, value, type, files } = e.target;
    let fieldName = name.split("_")[1]; // Obtener el nombre real del campo, si aplica

    // Manejo de la carga de imágenes
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
    } else {
      // Actualizar el estado formData para campos regulares y anidados
      setFormData((prevState) => {
        // Si el campo pertenece a una subcategoría, como 'lifestyle' o 'familyHistory'
        if (name.includes("_")) {
          const category = name.split("_")[0];
          return {
            ...prevState,
            [category]: {
              ...prevState[category],
              [fieldName]: type === "checkbox" ? e.target.checked : value,
            },
          };
        } else {
          return {
            ...prevState,
            [name]: type === "checkbox" ? e.target.checked : value,
          };
        }
      });

      // Validar el campo actual y actualizar errores si es necesario
      let newErrors = { ...errors };
      if (!value && type !== "checkbox" && name !== "patientPhoto") {
        newErrors[name] = "Por favor, llena este campo";
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthdate = new Date(
      formData.birthdateYear,
      formData.birthdateMonth - 1,
      formData.birthdateDay
    );
    if (isNaN(birthdate.getTime())) {
      toast.error("Fecha de nacimiento inválida.");
      return;
    }

    const fullPhoneNumber = `${phonePrefix} ${formData.contactNumber}`;

    const selectedDiseases = Object.keys(formData.pastDiseases)
      .filter((key) => formData.pastDiseases[key])
      .concat(
        formData.pastDiseases.otherDiseases.trim()
          ? [formData.pastDiseases.otherDiseases.trim()]
          : []
      );

    const selectedSurgeries = Object.keys(formData.surgeries)
      .filter((key) => formData.surgeries[key])
      .concat(
        formData.surgeries.otherSurgeries.trim()
          ? [formData.surgeries.otherSurgeries.trim()]
          : []
      );

    const selectedAllergies = Object.keys(formData.allergies)
      .filter((key) => formData.allergies[key])
      .concat(
        formData.allergies.otherAllergies.trim()
          ? [formData.allergies.otherAllergies.trim()]
          : []
      );

    const selectedHospitalizations =
      formData.hospitalizations.trim() ||
      (!selectedDiseases.length &&
      !selectedSurgeries.length &&
      !selectedAllergies.length
        ? "Ninguna"
        : [formData.hospitalizations.trim()]);

    const selectedFamilyHistory = Object.keys(formData.familyHistory)
      .filter((key) => formData.familyHistory[key])
      .concat(
        formData.familyHistory.otherFamilyDiseases.trim()
          ? [formData.familyHistory.otherFamilyDiseases.trim()]
          : []
      );

    const medicalHistory = {
      diseases: selectedDiseases.length ? selectedDiseases : ["Ninguna"],
      surgeries: selectedSurgeries.length ? selectedSurgeries : ["Ninguna"],
      hospitalizations: selectedHospitalizations.length
        ? selectedHospitalizations
        : ["Ninguna"],
      allergies: selectedAllergies.length ? selectedAllergies : ["Ninguna"],
      familyHistory: selectedFamilyHistory.length
        ? selectedFamilyHistory
        : ["Ninguna"],
      medications: medications.map((med) => ({
        name: med.name,
        dose: med.dose,
      })),
      bloodType: formData.bloodType,
    };

    const fullAddress = `${formData.street}, ${formData.municipality}, ${formData.postalCode}, ${formData.state}`;
    const fullEmergencyPhoneNumber = `${emergencyPhonePrefix} ${formData.emergencyContactNumber}`;
    const { patientPhoto, ...rest } = formData;
    const bloodPressure = `${systolic}/${diastolic}`;

    const dataToSend = {
      userId: rest.userId,
      personalInformation: {
        name: rest.name,
        birthdate: birthdate,
        gender: rest.gender,
        address: fullAddress,
        contactNumber: fullPhoneNumber,
        email: rest.email,
      },
      physicalInformation: {
        weight: Number(rest.weight),
        height: Number(rest.height),
        bloodPressure: bloodPressure,
      },
      emergencyInformation: {
        contactName: rest.emergencyContactName,
        contactRelation: rest.emergencyContactRelation,
        contactNumber: fullEmergencyPhoneNumber,
      },
      medicalHistory,
      lifestyle: {
        diet: {
          vegetarian: rest.lifestyle.vegetarian,
          glutenFree: rest.lifestyle.glutenFree,
          vegan: rest.lifestyle.vegan,
          keto: rest.lifestyle.keto,
          paleo: rest.lifestyle.paleo,
          description: rest.lifestyle.dietDescription,
        },
        exercise: rest.lifestyle.exercise,
        alcoholConsumption: rest.lifestyle.alcohol,
        smokingHabits: rest.lifestyle.smoking,
      },
      vaccinations: {
        influenza: rest.vaccinations.influenza,
        tetanus: rest.vaccinations.tetanus,
        hepatitisB: rest.vaccinations.hepatitisB,
        measles: rest.vaccinations.measles,
        covid19: rest.vaccinations.covid19,
        otherVaccinations: rest.vaccinations.otherVaccinations,
      },
      labResults: labTests,
      patientPhoto: patientPhoto ? patientPhoto.name : null, // Asumiendo que se manejará la carga del archivo por separado
    };

    console.log(dataToSend);
    try {
      await addMedicalHistory(formData.userId, dataToSend);
      setFormSubmitted(true);
      toast.success("Historial médico enviado con éxito");
      handleUserRegistration();

      // Si hay una foto para subir, hazlo después de enviar el formulario
      if (patientPhoto) {
        await uploadPatientPhoto(formData.userId, patientPhoto);
      }
    } catch (error) {
      console.error("Error al enviar el historial médico:", error);
      toast.error("Error al enviar el historial médico");
    }
  };

  if (formSubmitted) {
    return (
      <div>
        <CenteredMessage>
          Gracias por enviar su historial médico.
        </CenteredMessage>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    );
  }

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dose: "" }]);
  };

  const handleRemoveMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleChangeMedication = (index, field, value) => {
    setMedications(
      medications.map((medication, i) => {
        if (i === index) {
          return { ...medication, [field]: value };
        }
        return medication;
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>Información Personal</Legend>
        <Label>Nombre completo</Label>
        <Input
          type="text"
          name="name"
          readOnly
          value={formData.name}
          placeholder="Ej: Juan Pérez"
          onChange={handleChange}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Label>Fecha de nacimiento</Label>

        <DateSelectContainer>
          <Select
            name="birthdateDayDisabled"
            value={formData.birthdateDay}
            disabled
            onChange={handleChange}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <input
            type="hidden"
            name="birthdateDay"
            value={formData.birthdateDay}
          />

          <Select
            name="birthdateMonthDisabled"
            value={formData.birthdateMonth}
            disabled
            onChange={handleChange}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <input
            type="hidden"
            name="birthdateMonth"
            value={formData.birthdateMonth}
          />

          <Input
            type="number"
            name="birthdateYear"
            value={formData.birthdateYear}
            readOnly
            onChange={handleChange}
            placeholder="Año"
          />
        </DateSelectContainer>

        <Label>Sexo</Label>
        <Select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </Select>
        {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}

        <Label>Dirección</Label>
        <br></br>
        <Label>Calle</Label>
        <Input
          type="text"
          name="street"
          value={formData.street}
          placeholder="Ej: Calle Reforma #123"
          onChange={handleChange}
        />

        <Label>Alcaldía o Municipio</Label>
        <Input
          type="text"
          name="municipality"
          value={formData.municipality}
          placeholder="Ej: Cuauhtémoc"
          onChange={handleChange}
        />

        <Label>Código Postal</Label>
        <Input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          placeholder="Ej: 55520"
          onChange={handleChange}
        />

        <Label>Estado</Label>
        <Select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Seleccione el Estado</option>
          <option value="Aguascalientes">Aguascalientes</option>
          <option value="Baja California">Baja California</option>
          <option value="Baja California Sur">Baja California Sur</option>
          <option value="Campeche">Campeche</option>
          <option value="Chiapas">Chiapas</option>
          <option value="Chihuahua">Chihuahua</option>
          <option value="Ciudad de México">Ciudad de México</option>
          <option value="Coahuila">Coahuila</option>
          <option value="Colima">Colima</option>
          <option value="Durango">Durango</option>
          <option value="Guanajuato">Guanajuato</option>
          <option value="Guerrero">Guerrero</option>
          <option value="Hidalgo">Hidalgo</option>
          <option value="Jalisco">Jalisco</option>
          <option value="Estado de México">Estado de México</option>
          <option value="Michoacán">Michoacán</option>
          <option value="Morelos">Morelos</option>
          <option value="Nayarit">Nayarit</option>
          <option value="Nuevo León">Nuevo León</option>
          <option value="Oaxaca">Oaxaca</option>
          <option value="Puebla">Puebla</option>
          <option value="Querétaro">Querétaro</option>
          <option value="Quintana Roo">Quintana Roo</option>
          <option value="San Luis Potosí">San Luis Potosí</option>
          <option value="Sinaloa">Sinaloa</option>
          <option value="Sonora">Sonora</option>
          <option value="Tabasco">Tabasco</option>
          <option value="Tamaulipas">Tamaulipas</option>
          <option value="Tlaxcala">Tlaxcala</option>
          <option value="Veracruz">Veracruz</option>
          <option value="Yucatán">Yucatán</option>
          <option value="Zacatecas">Zacatecas</option>
        </Select>

        <Label>Número de contacto</Label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            value={phonePrefix}
            onChange={handlePrefixChange}
            style={{ marginRight: "10px" }}
          >
            <option value="+52">+52</option>
          </Select>
          <Input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Ej: 123 456 7890"
          />
        </div>
        {errors.contactNumber && (
          <ErrorMessage>{errors.contactNumber}</ErrorMessage>
        )}

        <Label>Correo electrónico</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          readOnly
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

        <Label>Estatura (cm)</Label>
        <Input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Ej: 175"
        />
        {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}

        <Label>Presión Arterial (mmHg)</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Input
            type="text"
            name="systolic"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="Sistólica (Ej: 120)"
          />
          <Input
            type="text"
            name="diastolic"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="Diastólica (Ej: 80)"
          />
        </div>
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
          placeholder="Ej: María López Rodriguez"
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

        <Label>Número de teléfono de emergencia</Label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            value={phonePrefix}
            onChange={handlePrefixChange}
            style={{ marginRight: "10px" }}
          >
            <option value="+52">+52</option>
          </Select>
          <Input
            type="tel"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            placeholder="Ej: 987 654 321"
          />
        </div>
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

        <Label>Enfermedades previas</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pastDiseases_diabetes"
              checked={formData.pastDiseases.diabetes}
              onChange={handleChange}
            />
            Diabetes
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pastDiseases_hypertension"
              checked={formData.pastDiseases.hypertension}
              onChange={handleChange}
            />
            Hipertensión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pastDiseases_obesity"
              checked={formData.pastDiseases.obesity}
              onChange={handleChange}
            />
            Obesidad
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pastDiseases_asthma"
              checked={formData.pastDiseases.asthma}
              onChange={handleChange}
            />
            Asma
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="pastDiseases_cardiovascular"
              checked={formData.pastDiseases.cardiovascular}
              onChange={handleChange}
            />
            Enfermedades cardiovasculares
          </label>
        </CheckboxContainer>
        <Label>
          <button type="button" onClick={handleToggleOtherDiseases}>
            Agregar otras enfermedades
          </button>
        </Label>
        {showOtherDiseases && (
          <OtherInput
            type="text"
            name="pastDiseases_otherDiseases"
            value={formData.pastDiseases.otherDiseases}
            onChange={handleChange}
            placeholder="Otras enfermedades"
          />
        )}
        <br></br>
        <br></br>

        <Label>Cirugías previas</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="surgeries_appendectomy"
              checked={formData.surgeries.appendectomy}
              onChange={handleChange}
            />
            Apendicectomía
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="surgeries_cholecystectomy"
              checked={formData.surgeries.cholecystectomy}
              onChange={handleChange}
            />
            Colecistectomía
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="surgeries_herniaRepair"
              checked={formData.surgeries.herniaRepair}
              onChange={handleChange}
            />
            Reparación de hernia
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="surgeries_hipReplacement"
              checked={formData.surgeries.hipReplacement}
              onChange={handleChange}
            />
            Reemplazo de cadera
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="surgeries_kneeReplacement"
              checked={formData.surgeries.kneeReplacement}
              onChange={handleChange}
            />
            Reemplazo de rodilla
          </label>
        </CheckboxContainer>
        <Label>
          <button type="button" onClick={handleToggleOtherSurgeries}>
            Agregar otras cirugías
          </button>
        </Label>
        {showOtherSurgeries && (
          <OtherInput
            type="text"
            name="surgeries_otherSurgeries"
            value={formData.surgeries.otherSurgeries}
            onChange={handleChange}
            placeholder="Otras cirugías"
          />
        )}
        <br></br>
        <br></br>

        <Label>Alergias</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="allergies_pollen"
              checked={formData.allergies.pollen}
              onChange={handleChange}
            />
            Polen
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="allergies_dust"
              checked={formData.allergies.dust}
              onChange={handleChange}
            />
            Polvo
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="allergies_nuts"
              checked={formData.allergies.nuts}
              onChange={handleChange}
            />
            Frutos secos
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="allergies_latex"
              checked={formData.allergies.latex}
              onChange={handleChange}
            />
            Látex
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="allergies_animalDander"
              checked={formData.allergies.animalDander}
              onChange={handleChange}
            />
            Caspa de animales
          </label>
        </CheckboxContainer>

        <button type="button" onClick={handleToggleOtherAllergies}>
          Agregar otras alergias
        </button>
        {showOtherAllergies && (
          <OtherInput
            type="text"
            name="allergies_otherAllergies"
            value={formData.allergies.otherAllergies}
            onChange={handleChange}
            placeholder="Otras alergias"
          />
        )}
        <br></br>
        <br></br>

        <Label>Hospitalizaciones</Label>
        {hospitalizations.map((hospitalization, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Input
              type="text"
              value={hospitalization}
              onChange={(e) =>
                handleChangeHospitalization(e.target.value, index)
              }
              placeholder="Describa la hospitalización"
            />
            <button
              type="button"
              onClick={() => handleRemoveHospitalization(index)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddHospitalization}>
          Agregar Hospitalización
        </button>
        <br></br>
        <br></br>

        <Label>Medicamentos actuales</Label>
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
        <br></br>
        <br></br>
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
              name="familyHistory_familyDiabetes"
              checked={formData.familyHistory.familyDiabetes}
              onChange={handleChange}
            />
            Diabetes
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyHistory_familyHypertension"
              checked={formData.familyHistory.familyHypertension}
              onChange={handleChange}
            />
            Hipertensión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyHistory_familyCardiacDiseases"
              checked={formData.familyHistory.familyCardiacDiseases}
              onChange={handleChange}
            />
            Enfermedades cardíacas
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyHistory_familyCancer"
              checked={formData.familyHistory.familyCancer}
              onChange={handleChange}
            />
            Cáncer
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="familyHistory_familyAutoimmuneDiseases"
              checked={formData.familyHistory.familyAutoimmuneDiseases}
              onChange={handleChange}
            />
            Enfermedades autoinmunes
          </label>
        </CheckboxContainer>
        <Label>
          {" "}
          <button type="button" onClick={toggleOtherFamilyHistory}>
            Agregar otra condición
          </button>
        </Label>
        {showOtherFamilyHistory && (
          <OtherInput
            type="text"
            name="familyHistory_otherFamilyDiseases"
            value={formData.familyHistory.otherFamilyDiseases}
            onChange={handleChange}
            placeholder="Indique otras condiciones"
          />
        )}
      </Fieldset>
      <Fieldset>
        <Legend>Estilo de Vida</Legend>

        <Label>Hábitos de alimentación</Label>
        <CheckboxContainer>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle_vegetarian"
              checked={formData.lifestyle.vegetarian}
              onChange={handleChange}
            />
            Vegetariana
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle_glutenFree"
              checked={formData.lifestyle.glutenFree}
              onChange={handleChange}
            />
            Sin gluten
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle_vegan"
              checked={formData.lifestyle.vegan}
              onChange={handleChange}
            />
            Vegana
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle_keto"
              checked={formData.lifestyle.keto}
              onChange={handleChange}
            />
            Keto
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="lifestyle_paleo"
              checked={formData.lifestyle.paleo}
              onChange={handleChange}
            />
            Paleo
          </label>
        </CheckboxContainer>

        <Label>Descripción sus hábitos alimenticios</Label>
        <OtherInput
          type="text"
          name="lifestyle_dietDescription"
          value={formData.lifestyle.dietDescription}
          onChange={handleChange}
          placeholder="Describa otros hábitos alimenticios"
        />

        <Label>Ejercicio</Label>
        <Select
          name="lifestyle_exercise"
          value={formData.lifestyle.exercise}
          onChange={handleChange}
        >
          <option value="none">Ninguno</option>
          <option value="occasionally">Ocasionalmente</option>
          <option value="regularly">Regularmente</option>
          <option value="frequently">Frecuentemente</option>
        </Select>

        <Label>Consumo de alcohol</Label>
        <Select
          name="lifestyle_alcohol"
          value={formData.lifestyle.alcohol}
          onChange={handleChange}
        >
          <option value="none">Ninguno</option>
          <option value="occasionally">Ocasionalmente</option>
          <option value="regularly">Regularmente</option>
          <option value="frequently">Frecuentemente</option>
        </Select>

        <Label>Tabaquismo</Label>
        <Select
          name="lifestyle_smoking"
          value={formData.lifestyle.smoking}
          onChange={handleChange}
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
              name="vaccinations_influenza"
              checked={formData.vaccinations.influenza}
              onChange={handleChange}
            />
            Influenza
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations_tetanus"
              checked={formData.vaccinations.tetanus}
              onChange={handleChange}
            />
            Tétanos
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations_hepatitisB"
              checked={formData.vaccinations.hepatitisB}
              onChange={handleChange}
            />
            Hepatitis B
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations_measles"
              checked={formData.vaccinations.measles}
              onChange={handleChange}
            />
            Sarampión
          </label>
          <label>
            <CheckboxInput
              type="checkbox"
              name="vaccinations_covid19"
              checked={formData.vaccinations.covid19}
              onChange={handleChange}
            />
            COVID-19
          </label>
        </CheckboxContainer>
        <Label>
          <button type="button" onClick={toggleOtherVaccinations}>
            Agregar otras vacunas
          </button>
        </Label>
        {showOtherVaccinations && (
          <OtherInput
            type="text"
            name="vaccinations_otherVaccinations"
            value={formData.vaccinations.otherVaccinations}
            onChange={handleChange}
            placeholder="Otras vacunas recibidas"
          />
        )}
      </Fieldset>

      <Fieldset>
  <Legend>Exámenes de Laboratorio</Legend>
  {labTests.map((test, index) => (
    <div key={index}>
      <Label>Fecha del examen</Label>
      <Input
        type="date"
        value={test.date}
        onChange={(e) => handleChangeLabTest(index, 'date', e.target.value)}
      />

      <Label>Diagnóstico</Label>
      <Input
        type="text"
        value={test.diagnosis}
        onChange={(e) => handleChangeLabTest(index, 'diagnosis', e.target.value)}
      />

      <Label>Doctor encargado</Label>
      <Input
        type="text"
        value={test.doctor}
        onChange={(e) => handleChangeLabTest(index, 'doctor', e.target.value)}
      />

      <Label>Indicaciones</Label>
      <Input
        type="text"
        value={test.aspect}
        onChange={(e) => handleChangeLabTest(index, 'aspect', e.target.value)}
      />

      <Label>Resultados</Label>
      <Input
        type="text"
        value={test.results}
        onChange={(e) => handleChangeLabTest(index, 'results', e.target.value)}
      />

      <button type="button" onClick={() => handleRemoveLabTest(index)}>
        Eliminar Examen
      </button>
    </div>
  ))}
  <Label><button type="button" onClick={handleAddLabTest}>
    Agregar Examen de Laboratorio
  </button></Label>
  <br></br>
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

const CloseButton = styled.button`
  display: block;
  margin: auto;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
