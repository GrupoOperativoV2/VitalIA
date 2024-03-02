import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.css";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
        <Link to="/"><p class="logo">VitalIA</p></Link> 
        </div>
        <div className="gpt3__navbar-links_container">
          <p>
            <a href="#home">Inicio</a>
          </p>
          <p>
            <a href="#vitalIA">¿Qué es VitalIA?</a>
          </p>
          <p>
            <a href="#info">Enfoque</a>
          </p>
          <p>
            <a href="#contacto">Contacto</a>
          </p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
      <Link to="/login" className="gpt3__navbar-sign_button">Inicia sesión</Link>
        <button type="button">
          <Link to="/register">Regístrate</Link>
        </button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p>
                <a href="#home">Inicio</a>
              </p>
              <p>
                <a href="#vitalIA">¿Qué es VitalIA?</a>
              </p>
              <p>
                <a href="#info">Metodología</a>
              </p>
              <p>
                <a href="#features">Enfoque</a>
              </p>
              <p>
                <a href="#blog">Contacto</a>
              </p>
            </div>
            <div className="gpt3__navbar-sign">
            <Link to="/login" className="white-link">Login</Link>
              <button type="button">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
