import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  registerDoctorRequest,
  addMedicalHistoryRequest,
  uploadPatientPhotoRequest,
  getMedicalHistoryRequest,
  updateMedicalHistoryRequest,
  resetPasswordRequest,
  passwordRequest,
  photoUserRequest,  
} from "../api/auth";
import {AppointmentRequest,  // Importamos la función de solicitud de citas
DoctorSearchRequest  } from "../api/appointments";
import Cookies from "js-cookie";  

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        localStorage.setItem("isFirstLogin", "true");
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const registerDoctor = async (user) => {
    console.log("Intentando registrar al doctor con datos:", user);
    try {
      const res = await registerDoctorRequest(user);
      console.log("Respuesta recibida:", res);
      if (res.status === 200) {
        console.log("Doctor registrado con éxito:", res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      if (error.response) {
        console.log("Datos de error:", error.response.data);
        setErrors(error.response.data.message);
      } else {
        console.log("Error sin respuesta del servidor:", error.message);
        setErrors(error.message);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const messages = error.response.data.message || [
          "There was a problem with your login details",
        ];
        setErrors(messages);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const addMedicalHistory = async (userId, dataToSend) => {
    try {
      const response = await addMedicalHistoryRequest(
        userId,
        dataToSend
      );
      console.log("Historial médico añadido:", response.data);
      // Aquí puedes realizar más acciones como actualizar el estado o redirigir al usuario
    } catch (error) {
      console.error("Error al añadir el historial médico:", error);
      throw error; // Lanzar el error para manejarlo en el formulario
    }
  };

  const uploadPatientPhoto = async (userId, file) => {
    try {
      const response = await uploadPatientPhotoRequest(userId, file);
      console.log("Foto subida con éxito:", response.data);
    } catch (error) {
      console.error("Error al subir la foto:", error);
    }
  };


  const getMedicalHistory = async (userId) => {
    try {
        const history = await getMedicalHistoryRequest(userId);
        return history;
    } catch (error) {
        console.error('Error fetching medical history:', error);
        throw error;
    }
  };

// Definimos el método `DoctorSearch` en tu AuthProvider
const DoctorSearch = async () => {
  try {
    const response = await DoctorSearchRequest();
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Definimos el método `Appointment` en tu AuthProvider
const Appointment = async (appointmentData) => {
  try {
    const response = await AppointmentRequest(appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// const getUserAppointments = useCallback(async (userId) => {
//   try {
//     setLoading(true);
//     const response = await getUserAppointmentsRequest(userId);
//     setAppointments(response.data); // Actualiza el estado con las citas obtenidas
//     setLoading(false);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     setErrors(prevErrors => [...prevErrors, error.message]);
//     setLoading(false);
//     throw error;
//   } 
// }, [getUserAppointmentsRequest]);

const photoUser = async (userId) => {
  try {
    const photoPath = await photoUserRequest(userId); // Llamamos a la función para obtener la ruta de la foto del usuario
    return photoPath;
  } catch (error) {
    console.error('Error fetching user photo:', error);
    throw error;
  }
};


const updateMedicalHistory = async (userId, updatedData) => {
  try {
      const response = await updateMedicalHistoryRequest(userId, updatedData);
      console.log("Historial médico actualizado con éxito:", response.data);
      // Aquí puedes realizar más acciones como actualizar el estado o redirigir al usuario
  } catch (error) {
      console.error("Error al actualizar el historial médico:", error);
      throw error; // Lanzar el error para manejarlo en el formulario
  }
};

const resetPassword = async (email) => {
  try {
    const response = await resetPasswordRequest(email);
    if (response.status === 200) {
      console.log("Solicitud de restablecimiento de contraseña enviada:", response.data);
      // Aquí podrías actualizar el estado para informar al usuario que el correo fue enviado
    }
  } catch (error) {
    console.error("Error al enviar la solicitud de restablecimiento de contraseña:", error);
    // Manejo de errores, por ejemplo, actualizar el estado de errores en el contexto
    setErrors([...errors, error.response ? error.response.data.message : "Un error ocurrió"]);
  }
};

const updatePassword = async (userId, token, newPassword) => {
  try {
    const response = await passwordRequest(userId, token, newPassword);
    console.log("Respuesta de restablecimiento de contraseña:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};





useEffect(() => {
  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        setUser(res.data);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };
  checkLogin();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        registerDoctor,
        signin,
        logout,
        isAuthenticated,
        errors,
        addMedicalHistory,
        loading,  
        uploadPatientPhoto,
        getMedicalHistory,
        DoctorSearch,
        Appointment,
        photoUser,
        resetPassword,
        updateMedicalHistory, updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
