import React from 'react';
import gpt3Logo from '../../trace.svg';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding" id="contacto">

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>GoDev, by Grupo Operativo, <br /> </p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Enlaces</h4>
        <p>Sobre Nosotros</p>
        <p>Redes Sociales</p>
        <p>Contacto</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Empresa</h4>
        <p>Términos y Condiciones</p>
        <p>Política de Privacidad</p>
        <p>Contacto</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Ponte en Contacto</h4>
        <p>Mar Mediterráneo 227, Popotla, 11400 Ciudad de México, CDMX</p>
        <p>085-132567</p>
        <p>grupo.operativo.84@gmail.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 Grupo Operativo. </p>
    </div>
  </div>
);

export default Footer;
