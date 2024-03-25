import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cbx_terminos: false,
    birthDay: "1", 
    birthMonth: "1",  
    birthYear: "2000",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPoliciesPopupVisible, setIsPoliciesPopupVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const { signup, errors, setErrors } = useAuth();

  useEffect(() => {
    // Limpia los errores después de 5 segundos
    const timer = setTimeout(() => {
      setErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors, setErrors]);


  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!formData.name.trim()) {
      formIsValid = false;
      errors["name"] = "Por favor, ingresa tu nombre.";
    } 
    if (!formData.username.trim()) {
      formIsValid = false;
      errors["username"] = "Por favor, ingresa un nombre de usuario.";
    }
    if (!formData.email.trim()) {
      formIsValid = false;
      errors["email"] = "Por favor, ingresa un correo electrónico.";
    }
    if (!formData.password) {
      formIsValid = false;
      errors["password"] = "Por favor, ingresa una contraseña.";
    }
    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      formIsValid = false;
      errors["birthDate"] =
        "Por favor, selecciona tu fecha de nacimiento completa.";
    }
    if (!formData.cbx_terminos) {
      formIsValid = false;
      errors["cbx_terminos"] =
        "Debes aceptar los términos y condiciones para continuar.";
    }
    setErrorMessages(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const birthDate = `${formData.birthYear}-${String(
      formData.birthMonth
    ).padStart(2, "0")}-${String(formData.birthDay).padStart(2, "0")}`;
    const dataToSubmit = {
      ...formData,
      birthDate,
      birthDay: undefined,
      birthMonth: undefined,
      birthYear: undefined,
    };
    try {
      await signup(dataToSubmit);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const PoliciesPopup = ({ onClose }) => (
    <div className="popup-background">
      <div className="popup-container">
        <h2>Policies</h2>
        <p>
          Aquí puedes incluir todos los términos, condiciones y políticas de
          privacidad de tu servicio. Asegúrate de proporcionar información clara
          y precisa a tus usuarios.
        </p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="formulario active">
      <input
    type="text"
    placeholder="Nombre completo" // Placeholder actualizado para reflejar el nuevo campo
    className="input-text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    autoComplete="off"
  />
  <div className="error-text">{errorMessages["name"]}</div>

      <input
        type="text"
        placeholder="Nombre de usuario"
        className="input-text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        autoComplete="off"
      />
      {errors.includes("The username is already in use") && <div className="error-text">El nombre de usuario ya está en uso.</div>}
      <div className="error-text">{errorMessages["username"]}</div>
      <input
        type="text"
        placeholder="Correo electrónico"
        className="input-text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="off"
      />
      {errors.includes("The email is already in use") && <div className="error-text">El correo electrónico ya está en uso.</div>}
      <div className="error-text">{errorMessages["email"]}</div>
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
      <div className="error-text">{errorMessages["birthDate"]}</div>
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
      <div className="error-text">{errorMessages["password"]}</div>
      <label className="contenedor-cbx animate">
        He leído y acepto los
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsPoliciesPopupVisible(true);
          }}
          className="link"
        >
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
      <div className="error-text">{errorMessages["cbx_terminos"]}</div>
      <button className="btn" type="submit">
        Crear Cuenta
      </button>
      {isPoliciesPopupVisible && (
        <PoliciesPopup onClose={() => setIsPoliciesPopupVisible(false)} />
      )}
    </form>
  );
};

export default RegisterForm;
