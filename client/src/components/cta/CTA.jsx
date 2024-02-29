import React from "react";
import "./cta.css";
import { Link } from "react-router-dom";

const CTA = () => (
  <div className="gpt3__cta">
    <div className="gpt3__cta-content">
      <p>Solicita tu acceso para Comenzar</p>
      <h3>
        Regístrate Ahora y Comienza a Descubrir un Mundo de Posibilidades
        Infinitas.
      </h3>
    </div>
    <div className="gpt3__cta-btn">
      <button type="button">
        {" "}
        <Link to="/register">Inicia ahora</Link>
      </button>
    </div>
  </div>
);

export default CTA;
