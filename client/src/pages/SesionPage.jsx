import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import { useAuth } from "../context/authContext";
import "./../styles/Login.css";
import ai from '../assets/ai.png'; 


export function SesionPage() {
  const [isLoginView, setIsLoginView] = useState(true); 
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/gestor");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="contenedor-login">
      <div className="contenedor-imagen">
        <img src={ai} alt="Contenido Visual" />
      </div>
      <div className="contenedor-texto">
        <div className="contenedor-form">
          <h1 className="titulo">¡Bienvenido a VitalIA!</h1>
          <p className="descripcion">
            Ingresa a tu cuenta y descubre los beneficios especiales que VitalIA tiene para ti.
          </p>

          <ul className="tabs-links">
            <li
              className={`tab-link ${isLoginView ? "active" : ""}`}
              onClick={() => setIsLoginView(true)}
            >
              Iniciar Sesión
            </li>
            <li
              className={`tab-link ${!isLoginView ? "active" : ""}`}
              onClick={() => setIsLoginView(false)}
            >
              Registrarse
            </li>
          </ul>
          {isLoginView ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>

    
  );
}
