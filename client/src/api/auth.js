  import axios from "./axios";

  // Función existente para registro de usuario
  export const registerListDoctorRequest = async (doctorID, historyID) => {
    return axios.post('auth/register/list', { doctorID, historyID });
  };
  

  export const  registerRequest = async (user) =>
    axios.post(`/auth/register`, user);


  // Función existente para inicio de sesión
  export const loginRequest = async (user) => 
    axios.post(`/auth/login`, user);

  // Función existente para verificación de token
  export const verifyTokenRequest = async (token) => {
    return axios.get('/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  };
    export const resetPasswordRequest = async (email) => {
      return axios.post('/auth/request-password-reset', {
        email: email  
      });
    };

    export const passwordRequest = async (userId, token, newPassword) => {
      return axios.post('/auth/password-reset', {
        userId,
        token,
        newPassword
      });
    };
    
    


  // Nueva función para registro de doctores
  export const registerDoctorRequest = async (user) =>
    axios.post(`/auth/registerDoctor`, user);


    export const photoUserRequest = async (userId) => {
      try {
        const response = await axios.get(`/auth/photoUser/${userId}`);
        return response.data.photoPath; // Devuelve la ruta de la foto del usuario desde la respuesta
      } catch (error) {
        console.error('Error al obtener la ruta de la foto del usuario:', error);
        throw new Error('Error al obtener la ruta de la foto del usuario');
      }
    };

    export const addMedicalHistoryRequest = async (userId, dataToSend) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return axios.post(`/medicalHistory/user/${userId}/medicalHistory`, JSON.stringify(dataToSend), config);
  };

  export const uploadPatientPhotoRequest = async (userId, file) => {
    const formData = new FormData();
    formData.append('patientPhoto', file);

    return axios.post(`/medicalHistory/user/${userId}/medicalHistory/photo`, formData);
  };

  export const getMedicalHistory = async (userId) => {
    try {
      const response = await axios.get(`/medicalHistory/user/${userId}/medicalHistory`);
      return response.data.patientPhoto;
    } catch (error) {
      console.error('Error al obtener la foto del historial médico:', error);
      return null;
    }
  };


  export const getMedicalHistoryRequest = async (userId) => {
    try {
      const response = await axios.get(`/medicalHistory/user/${userId}/medicalHistory`);
      return response.data; // Devuelve los datos recibidos
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al obtener el historial médico');
    }
  };



  export const getMedicalHistoryIDRequest = async (historyID) => {
    try {
      const response = await axios.get(`/medicalHistory/user/${historyID}`);
      return response.data; // Devuelve los datos recibidos
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al obtener el historial médico');
    }
  };

  export const getMypacientsRequest = async (doctorID) => {
    try {
      const response = await axios.get(`/auth/histories/${doctorID}`);
      return response.data; // Devuelve los datos recibidos
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Error al obtener pacientes');
    }
  };

  export const updateMedicalHistoryRequest = async (historyId, formDataToSend) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios.put(`/medicalHistory/update/medicalHistory/${historyId}`, JSON.stringify(formDataToSend), config);
  };


  export const updateMedicalHistoryPhotoRequest = async (historyId, formData) => {
    return axios.put(`/medicalHistory/update/photo/${historyId}`, formData);
  };