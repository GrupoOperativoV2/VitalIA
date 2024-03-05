import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, registerDoctorRequest } from "../api/auth";
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
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]); // Limpiar errores previos
        }
    } catch (error) {
        // Verifica si es un error 400 y maneja los mensajes de error específicamente
        if (error.response && error.response.status === 400) {
            // Asume que el backend envía mensajes de error en error.response.data.message
            const messages = error.response.data.message || ["There was a problem with your login details"];
            setErrors(messages);
        } else {
            // Manejo de otros errores no específicos
            setErrors(["An unexpected error occurred"]);
        }
    }
};


  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
