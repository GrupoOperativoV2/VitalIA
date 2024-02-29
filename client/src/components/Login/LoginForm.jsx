import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Asumiendo que deseas usar react-hook-form
import { useAuth } from '../../context/authContext';
import "./popup.css";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin } = useAuth(); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Estado para controlar la visibilidad del modal

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForgotPasswordModal = () => {
        setShowForgotPasswordModal(!showForgotPasswordModal);
    };

    const onSubmit = data => signin(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="formulario active">
                {errors.email && <div className="error-text"><p>{errors.email.message}</p></div>}
                <input type="text" placeholder="Correo electrónico" className="input-text" {...register("email", { required: "Este campo es requerido" })} autoComplete="off" />
                <a href="#" className="link" onClick={toggleForgotPasswordModal}>¿Olvidaste tu contraseña?</a>
                <button className="btn" type="submit">Iniciar Sesión</button>
            </form>
            {/* Ventana modal para "Olvidaste tu contraseña" */}
            {showForgotPasswordModal && (
                <div className="modal">
                    <div className="modal-contenido">
                        <span className="cerrar-modal" onClick={toggleForgotPasswordModal}>&times;</span>
                        <h2>¿Olvidaste tu contraseña?</h2>
                        <p>Por favor, introduce tu correo electrónico registrado para restablecer tu contraseña.</p>
                        <form className="formularioModal">
                            <input type="text" placeholder="Correo electrónico" className="input-text" />
                            <button className="btn" type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
