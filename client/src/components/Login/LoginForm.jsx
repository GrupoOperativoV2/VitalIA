import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import "../../styles/popup.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: authErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setShowForgotPasswordModal(false);
    }
  };

  const onSubmit = (data) => signin(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario active">
        {errors.email && (
          <div className="error-text">
            <p>{errors.email.message}</p>
          </div>
        )}
        <input
          type="text"
          placeholder="Correo electrónico"
          className="input-text"
          {...register("email", { required: "Este campo es requerido" })}
          autoComplete="off"
        />
        <div className="grupo-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="input-text clave"
            {...register("password", { required: "Este campo es requerido" })}
          />
          <button
            type="button"
            className="icono fas fa-eye mostrarClave"
            onClick={togglePasswordVisibility}
          ></button>
        </div>

        {authErrors.length > 0 && (
          <div className="error-text">
            {authErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

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
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>
              Por favor, introduce tu correo electrónico registrado para
              restablecer tu contraseña.
            </p>
            <form className="formularioModal">
              <input
                type="text"
                placeholder="Correo electrónico"
                className="input-text"
              />
              <button className="btn" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
