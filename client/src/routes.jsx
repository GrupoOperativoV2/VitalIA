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

const parseToken = (tokenString) => {
  if (!tokenString) {
    console.error("Token not found");
    return null;
  }

  try {
    const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
    if (!headerEncoded || !payloadEncoded || !signature) {
      throw new Error("Invalid token structure");
    }
    const payload = JSON.parse(atob(payloadEncoded));
    return payload;
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};

export const ManagerPages = () => {
  const tokenString = Cookies.get("token");
  console.log("Token from cookies in ManagerPages:", tokenString); // Añade este log para verificar el token
  const payload = parseToken(tokenString);
  if (!payload) return <Navigate to="/login" replace />;

  const { tipo } = payload;
  if (tipo === "3") return <Navigate to="/pacient" replace />;
  if (tipo === "2") return <Navigate to="/doctor" replace />;
  return <Outlet />;
};

// Aplica el mismo patrón de verificación en PatientPages y DoctorPages
export const PatientPages = () => {
  const tokenString = Cookies.get("token");
  console.log("Token from cookies in PatientPages:", tokenString); // Añade este log para verificar el token
  const payload = parseToken(tokenString);
  if (!payload) return <Navigate to="/login" replace />;

  const { tipo } = payload;
  if (tipo === "1") return <Navigate to="/tasks" replace />;
  if (tipo === "2") return <Navigate to="/doctor" replace />;
  return <Outlet />;
};

export const DoctorPages = () => {
  const tokenString = Cookies.get("token");
  console.log("Token from cookies in DoctorPages:", tokenString); // Añade este log para verificar el token
  const payload = parseToken(tokenString);
  if (!payload) return <Navigate to="/login" replace />;

  const { tipo } = payload;
  if (tipo === "3") return <Navigate to="/pacient" replace />;
  if (tipo === "1") return <Navigate to="/tasks" replace />;
  return <Outlet />;
};
