import axios from "./axios";

// Función existente para registro de usuario
export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

// Función existente para inicio de sesión
export const loginRequest = async (user) => 
  axios.post(`/auth/login`, user);

// Función existente para verificación de token
export const verifyTokenRequest = async () => 
  axios.get(`/auth/verify`);

// Nueva función para registro de doctores
export const registerDoctorRequest = async (user) =>
  axios.post(`/auth/registerDoctor`, user);


  export const addMedicalHistoryRequest = async (userId, medicalHistoryData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return axios.post(`/medicalHistory/user/${userId}/medicalHistory`, JSON.stringify(medicalHistoryData), config);
};

export const uploadPatientPhotoRequest = async (userId, file) => {
  const formData = new FormData();
  formData.append('patientPhoto', file);

  return axios.post(`/medicalHistory/user/${userId}/medicalHistory/photo`, formData);
};

export const getMedicalHistoryPhotoRequest = async (userId) => {
  try {
      const response = await axios.get(`/medicalHistory/user/${userId}/medicalHistory`);
      // Asumiendo que la foto se encuentra en la propiedad 'patientPhoto' de la respuesta
      return response.data.patientPhoto;
  } catch (error) {
      console.error('Error al obtener la foto del historial médico:', error);
      return null;
  }
};
