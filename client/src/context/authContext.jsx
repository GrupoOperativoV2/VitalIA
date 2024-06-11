  import { useEffect } from "react";
  import { createContext, useContext, useState } from "react";
  import {
    loginRequest,
    registerRequest,
    registerDoctorRequest,
    addMedicalHistoryRequest,
    uploadPatientPhotoRequest,
    getMedicalHistoryRequest,
    updateMedicalHistoryRequest,
    resetPasswordRequest,
    passwordRequest,
    verifyTokenRequest,
    photoUserRequest, 
    getMypacientsRequest,
    updateMedicalHistoryPhotoRequest, 
    getMedicalHistoryIDRequest,registerListDoctorRequest
  } from "../api/auth";
  import {AppointmentRequest,  getAppointmentsDoctorRequest,
  DoctorSearchRequest} from "../api/appointments";
  import { listPatientsRequest } from "../api/menssage";
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



  //Auth
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

    const registerDoctor = async (user) => {
      try {
        const res = await registerDoctorRequest(user);
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.message);
        } else {
          setErrors(error.message);
        }
      }
    };

    const logout = () => {
      Cookies.remove("token", { path: '/', domain: window.location.hostname });
      setUser(null);
      setIsAuthenticated(false);
    
      // Opcional: Remover cualquier otra información de autenticación en localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isFirstLogin');
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
    


    //User
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



    const getMedicalHistoryID = async (historyID) => {
      try {
          const history = await getMedicalHistoryIDRequest(historyID);
          return history;
      } catch (error) {
          console.error('Error fetching medical history:', error);
          throw error;
      }
    };

    const updateMedicalHistory = async (historyId, formDataToSend) => {
      try {
          const response = await updateMedicalHistoryRequest(historyId, formDataToSend);
      } catch (error) {
          throw error; 
      }
    };

    const updateMedicalHistoryPhoto = async (historyId, formData) => {
      console.log(formData)
      try {
          const response = await updateMedicalHistoryPhotoRequest(historyId, formData);
      } catch (error) {
          throw error; 
      }
    };

      const photoUser = async (userId) => {
    try {
      const photoPath = await photoUserRequest(userId); 
      return photoPath;
    } catch (error) {
      console.error('Error fetching user photo:', error);
      throw error;
    }
  };




  //Citas
  const Appointment = async (appointmentData) => {
    try {
      const response = await AppointmentRequest(appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  };


  const getAppointmentsDoctor = async (doctorId) => {
    try {
        const response = await getAppointmentsDoctorRequest(doctorId);
        return response.data;
    } catch (error) {
        console.error('Error fetching Appointments:', error);
        throw error;
    }
  };

   const getMypacients = async (doctorID) => {
    try {
      const response = await getMypacientsRequest(doctorID);
      return response;
    } catch (error) {
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

   const registerListDoctor = async (doctorID, historyID) => {

    try {
      const response = await registerListDoctorRequest(doctorID, historyID);
      return response.data;
    } catch (error) {
      console.error('Error register list:', error);
      throw error;
    }
  };
  




  //Mensajes 
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

  const listPatients = async (doctorId) => {
    try {
      const response = await listPatientsRequest(doctorId);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
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
        const res = await verifyTokenRequest(token);
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
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
          updateMedicalHistoryPhoto,
          uploadPatientPhoto,
          getMedicalHistory,
          DoctorSearch,
          Appointment,
          photoUser,
          registerListDoctor,
          resetPassword,
          updateMedicalHistory, updatePassword,
          listPatients, 
          getMedicalHistoryID,getAppointmentsDoctor, getMypacients
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;
