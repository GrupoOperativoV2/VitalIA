import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import "../../styles/popup.css"

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
        <h2>Políticas de Privacidad</h2>
        <p>
        Bienvenido a VitalIA. Nuestra misión es mejorar la gestión y la atención en el sector salud mediante herramientas digitales avanzadas. Este documento detalla cómo recopilamos, utilizamos y protegemos la información personal en nuestras aplicaciones web y móviles.<br /><br />
        Información que recopilamos<br />
        Datos de registro: Incluyen ID de usuario, nombre, fecha de nacimiento, género, correo electrónico y contraseña.<br />
        Información médica: Historial clínico, enfermedades crónicas, diagnósticos, tratamientos y otros detalles médicos pertinentes.<br />
        Datos de uso: Información sobre cómo interactúa con nuestra aplicación, incluyendo fechas y horas de acceso.<br /><br />
        Uso de la información<br />
        Utilizamos la información recopilada para:<br />
        - Facilitar la gestión hospitalaria y la automatización de registros médicos.<br />
        - Apoyar diagnósticos y tratamientos mediante inteligencia artificial.<br />
        - Mejorar y personalizar la experiencia del usuario.<br />
        - Cumplir con obligaciones legales y regulaciones aplicables.<br /><br />
        Compartir información con terceros<br />
        No vendemos ni alquilamos información personal a terceros. La información puede ser compartida solo en los siguientes casos:<br />
        - Con proveedores de servicios que nos ayudan a operar la aplicación, siempre bajo acuerdos que protegen su privacidad.<br />
        - Por requerimientos legales o para proteger derechos y seguridad.<br /><br />
        Seguridad de la información<br />
        Aplicamos medidas de seguridad técnicas y organizativas para proteger su información, incluyendo encriptación de datos y sistemas de autenticación segura. Aunque tomamos precauciones significativas, ninguna medida de seguridad es completamente infalible.<br /><br />
        Derechos del usuario<br />
        Los usuarios pueden acceder, corregir o eliminar su información personal. Además, tienen derecho a limitar el uso y divulgación de sus datos. Para ejercer estos derechos, pueden contactarnos a través de los detalles proporcionados al final de este documento.<br /><br />
        Uso de cookies y tecnologías similares<br />
        Utilizamos cookies para mejorar la funcionalidad de nuestras aplicaciones. Los usuarios pueden configurar su navegador para rechazar cookies si lo prefieren.<br /><br />
        Enlaces a otros sitios<br />
        Nuestra aplicación puede contener enlaces a sitios web externos que no operamos. No somos responsables de las prácticas de privacidad de estos sitios.<br /><br />
        Cambios a la política de privacidad<br />
        Podemos actualizar nuestras políticas de privacidad ocasionalmente. Los cambios serán notificados a través de nuestra aplicación o por correo electrónico.<br /><br />
        Contacto<br />
        Para preguntas o preocupaciones sobre nuestra política de privacidad, por favor contacte a nuestro equipo de soporte a través de grupo.operativo.84@gmail.com.
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
