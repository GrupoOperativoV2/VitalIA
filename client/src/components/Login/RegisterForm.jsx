import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cbx_terminos: false,
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthDate = `${formData.birthYear}-${String(formData.birthMonth).padStart(2, '0')}-${String(formData.birthDay).padStart(2, '0')}`;

    const dataToSubmit = {
        ...formData,
        birthDate,
        birthDay: undefined,
        birthMonth: undefined,
        birthYear: undefined    
    };

    console.log('Datos a enviar:', dataToSubmit);

    try {
        await signup(dataToSubmit);
    } catch (error) {
        console.error("Error al registrar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario active">
      <div className="error-text"></div>
      <input
        type="text"
        placeholder="Nombre de usuario"
        className="input-text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Correo electrónico"
        className="input-text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="off"
      />

      <div className="fecha-nacimiento-container">
        <div className="fecha-nacimiento-column">
          <label className="input-label" htmlFor="birthDay">
            Día
          </label>
          <select
            name="birthDay"
            id="birthDay"
            value={formData.birthDay}
            onChange={handleChange}
            className="input-text input-select"
          >
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="fecha-nacimiento-column">
          <label className="input-label" htmlFor="birthMonth">
            Mes
          </label>
          <select
            name="birthMonth"
            id="birthMonth"
            value={formData.birthMonth}
            onChange={handleChange}
            className="input-text input-select"
          >
            {[
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="fecha-nacimiento-column">
          <label className="input-label" htmlFor="birthYear">
            Año
          </label>
          <select
            name="birthYear"
            id="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            className="input-text input-select"
          >
            {[...Array(100).keys()].map((year) => (
              <option key={year} value={new Date().getFullYear() - year}>
                {new Date().getFullYear() - year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grupo-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-text clave"
        />
        <button
          type="button"
          className="icono fas fa-eye mostrarClave"
          onClick={togglePasswordVisibility}
        ></button>
      </div>
      <label className="contenedor-cbx animate">
        He leído y acepto los
        <a href="#" className="link">
          Términos, Condiciones y Política de privacidad de VitalIA
        </a>
    
        <input
          type="checkbox"
          name="cbx_terminos"
          checked={formData.cbx_terminos}
          onChange={handleChange}
        />
        <span className="cbx-marca"></span>
      </label>
      <button className="btn" type="submit">
        Crear Cuenta
      </button>
    </form>
  );
};

export default RegisterForm;
