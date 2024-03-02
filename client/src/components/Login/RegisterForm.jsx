import React, { useState } from 'react';
import { useAuth } from "../../context/authContext";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cbx_terminos: false
    });

    const [showPassword, setShowPassword] = useState(false); 
    const { signup } = useAuth();

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData); // Llama a la función signup para registrar al usuario
            // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al registrar:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario active">
            <div className="error-text"></div>
            <input type="text" placeholder="Nombre de usuario" className="input-text" name="username" value={formData.username} onChange={handleChange} autoComplete="off" />
            <input type="text" placeholder="Correo electrónico" className="input-text" name="email" value={formData.email} onChange={handleChange} autoComplete="off" />
            <div className="grupo-input">
                <input type={showPassword ? "text" : "password"} placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} className="input-text clave" />
                <button type="button" className="icono fas fa-eye mostrarClave" onClick={togglePasswordVisibility}></button>
            </div>
            <label className="contenedor-cbx animate">
                He leído y acepto los
                <a href="#" className="link">Términos y Condiciones</a>
                <a href="#" className="link">y Política de privacidad de mi Tienda</a>
                <input type="checkbox" name="cbx_terminos" checked={formData.cbx_terminos} onChange={handleChange} />
                <span className="cbx-marca"></span>
            </label>
            <button className="btn" type="submit">Crear Cuenta</button>
        </form>
    );
};

export default RegisterForm;
