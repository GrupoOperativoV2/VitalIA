import React from 'react';
import { useForm } from 'react-hook-form'; // Asumiendo que deseas usar react-hook-form
import { useAuth } from '../../context/authContext';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin } = useAuth(); // Asume una función signin en tu contexto de autenticación

    const onSubmit = data => signin(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="formulario active">
            {errors.email && <div className="error-text"><p>{errors.email.message}</p></div>}
            <input type="text" placeholder="Correo electrónico" className="input-text" {...register("email", { required: "Este campo es requerido" })} autoComplete="off" />
            <div className="grupo-input">
                <input type="password" placeholder="Contraseña" className="input-text clave" {...register("password", { required: "Este campo es requerido" })} />
                <button type="button" className="icono fas fa-eye mostrarClave"></button>
            </div>
            <a href="#" className="link">¿Olvidaste tu contraseña?</a>
            <button className="btn" type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
