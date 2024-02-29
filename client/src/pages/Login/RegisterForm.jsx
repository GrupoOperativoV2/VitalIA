import React from 'react';

const RegisterForm = () => {
    return (
        <form action="" method="POST" id="formRegistro" className="formulario active">
            <div className="error-text"></div>
            <input type="text" placeholder="Nombre y Apellidos" className="input-text" name="nombre" autoComplete="off" />
            <input type="text" placeholder="Correo electrónico" className="input-text" name="correo" autoComplete="off" />
            <div className="grupo-input">
                <input type="password" placeholder="Contraseña" name="password" className="input-text clave" />
                <button type="button" className="icono fas fa-eye mostrarClave"></button>
            </div>
            <label className="contenedor-cbx animate">
                He leído y acepto los
                <a href="#" className="link">Términos y Condiciones</a>
                <a href="#" className="link">y Política de privacidad de mi Tienda</a>
                <input type="checkbox" name="cbx_terminos" />
                <span className="cbx-marca"></span>
            </label>
            <button className="btn" id="btnRegistro" type="button">Crear Cuenta</button>
        </form>
    );
};

export default RegisterForm;
