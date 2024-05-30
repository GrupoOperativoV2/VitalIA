import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const ManagerPages = () => {
  const tokenString = localStorage.getItem('token');

  if (!tokenString) {
    console.error("No token found in localStorage");
    return <Navigate to="/login" replace />;
  }

  try {
    const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
    const payload = JSON.parse(atob(payloadEncoded));
    const valorTipo = payload.tipo;
  
    if (valorTipo === "3") return <Navigate to="/pacient" replace />;  
    if (valorTipo === "2") return <Navigate to="/doctor" replace />;
    return <Outlet />;
  } catch (error) {
    console.error("Error parsing token:", error);
    return <Navigate to="/login" replace />;
  }
}

export const PatientPages = () => {
  const tokenString = localStorage.getItem('token');

  if (!tokenString) {
    console.error("No token found in localStorage");
    return <Navigate to="/login" replace />;
  }

  try {
    const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
    const payload = JSON.parse(atob(payloadEncoded));
    const valorTipo = payload.tipo;
  
    if (valorTipo === "1") return <Navigate to="/tasks" replace />;
    if (valorTipo === "2") return <Navigate to="/doctor" replace />;
    return <Outlet />;
  } catch (error) {
    console.error("Error parsing token:", error);
    return <Navigate to="/login" replace />;
  }
}

export const DoctorPages = () => {
  const tokenString = localStorage.getItem('token');

  if (!tokenString) {
    console.error("No token found in localStorage");
    return <Navigate to="/login" replace />;
  }

  try {
    const [headerEncoded, payloadEncoded, signature] = tokenString.split('.');
    const payload = JSON.parse(atob(payloadEncoded));
    const valorTipo = payload.tipo;
  
    if (valorTipo === "3") return <Navigate to="/pacient" replace />;
    if (valorTipo === "1") return <Navigate to="/tasks" replace />;
    return <Outlet />;
  } catch (error) {
    console.error("Error parsing token:", error);
    return <Navigate to="/login" replace />;
  }
}
