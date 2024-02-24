import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Cookies from "js-cookie";
import React, { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

/*Las constantes inferiores se utilizan para validar "tipos" y redireccionar en caso de 
encontrarse en algún lugar que no le pertenezca a su flujo de usuario*/

export const ManagerPages = () => {
  const tokenString = Cookies.get("token");
  const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
  const payload = JSON.parse(atob(payloadEncoded));
  const valorTipo = payload.tipo;
  /*En caso de cambiar la página a la que deba ser redirigido cada usuario 
  se remplazará el valor de cada Navigate to en cada caso*/
  if (valorTipo == "3") return <Navigate to="/pacient" replace />;
  if (valorTipo == "2") return <Navigate to="/doctor" replace />;
  return <Outlet />;
}
export const PatientPages = () => {
  const tokenString = Cookies.get("token");
  const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
  const payload = JSON.parse(atob(payloadEncoded));
  const valorTipo = payload.tipo;
  if (valorTipo == "1") return <Navigate to="/tasks" replace />;
  if (valorTipo == "2") return <Navigate to="/doctor" replace />;
  return <Outlet />;
}
export const DoctorPages = () => {
  const tokenString = Cookies.get("token");
  const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
  const payload = JSON.parse(atob(payloadEncoded));
  const valorTipo = payload.tipo;
  if (valorTipo == "3") return <Navigate to="/pacient" replace />;
  if (valorTipo == "1") return <Navigate to="/tasks" replace />;
  return <Outlet />;
}