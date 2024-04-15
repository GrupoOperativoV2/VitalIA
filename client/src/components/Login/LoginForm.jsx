import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { RecoverForm } from  "./RecoverForm"
import "../../styles/popup.css"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Función para establecer errores manualmente
  } = useForm({
    mode: "onBlur",
  });
  const { signin, errors: authErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  useEffect(() => {
    authErrors.forEach(error => {
      if (error.includes("email does not exist")) {
        setError("email", {
          type: "manual",
          message: "El correo electrónico no existe.",
        });
      } else if (error.includes("password is incorrect")) {
        setError("password", {
          type: "manual",
          message: "La contraseña es incorrecta.",
        });
      }
    });
  }, [authErrors, setError]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleForgotPasswordModal = () => setShowForgotPasswordModal(!showForgotPasswordModal);
  const closeModal = (e) => e.target.classList.contains("modal") && setShowForgotPasswordModal(false);
  const onSubmit = (data) => signin(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario active">
        <input
          type="text"
          placeholder="Correo electrónico"
          className={`input-text ${errors.email ? 'is-invalid' : ''}`}
          {...register("email", {
            required: "El correo electrónico es obligatorio.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "El formato del correo electrónico no es válido.",
            },
          })}
          autoComplete="off"
        />
        {errors.email && <div className="error-text">{errors.email.message}</div>}
        
        <div className="grupo-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className={`input-text clave ${errors.password ? 'is-invalid' : ''}`}
            {...register("password", {
              required: "La contraseña es obligatoria.",
            })}
          />
          <button
            type="button"
            className="icono fas fa-eye mostrarClave"
            onClick={togglePasswordVisibility}
          ></button>
        </div>
        {errors.password && <div className="error-text">{errors.password.message}</div>}

        <a href="#" className="link" onClick={toggleForgotPasswordModal}>
          ¿Olvidaste tu contraseña?
        </a>
        <button className="btn" type="submit">
          Iniciar Sesión
        </button>
      </form>

      {showForgotPasswordModal && (
  <div className="modal" onClick={closeModal}>
    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
      <RecoverForm onClose={() => setShowForgotPasswordModal(false)}/>
    </div>
  </div>
)}

    </div>
  );
};

export default LoginForm;
