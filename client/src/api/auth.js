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
