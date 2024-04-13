import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import { useAuth } from "../context/authContext";
import "./../styles/Login.css";
import ai from '../assets/loginPage.png'; 

export function SesionPage() {
  const location = useLocation(); 
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isLoginPath = location.pathname === "/login";
  const [isLoginView, setIsLoginView] = useState(isLoginPath); 

  
  const slogans = [
    "VitalIA: Revolucionando la atención médica con cada clic. Gestiona, analiza y mejora, todo en un solo lugar.",
    "Transforma la gestión hospitalaria con VitalIA. Más tiempo para cuidar, menos tiempo en papeleo.",
    "Con VitalIA, el seguimiento de pacientes crónicos es más preciso y eficiente. Tecnología al servicio de la vida.",
  ];

  const [sloganIndex, setSloganIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  

  

  useEffect(() => {
    const animateSlogan = () => {
      setAnimationClass('typing');
      
      setTimeout(() => {
        setAnimationClass('');

        setTimeout(() => {
          setAnimationClass('exit');

          setTimeout(() => {
            setSloganIndex((current) => (current + 1) % slogans.length);
            setAnimationClass('');
            setTimeout(animateSlogan, 500); // Tiempo para que se "limpie" la animación de salida
          }, 500); // Duración de la animación de salida
        }, 2000); // Tiempo que el eslogan está completamente visible
      }, 3500); // Duración de la animación de escribir
    };

    animateSlogan();

    return () => {
      setAnimationClass('');
    };
  }, [slogans.length]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/gestor");
    }
  }, [isAuthenticated, navigate]);  

  useEffect(() => {
    setIsLoginView(location.pathname === "/login"); 
  }, [location]);

  
  return (
    <div className="contenedor-login">
       <div className="contenedor-imagen">
       <div className={`slogan ${animationClass}`}>{slogans[sloganIndex]}</div>
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
