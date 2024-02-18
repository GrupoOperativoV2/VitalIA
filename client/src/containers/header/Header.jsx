import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Con VitalIA, lleva el cuidado de la salud al siguiente nivel </h1>
      <p>En la búsqueda de bienestar, ninguna innovación es demasiado grande. No hay descanso en el avance de la tecnología. El progreso trae consigo una transformación jubilosa, rompiendo las barreras de la medicina tradicional. Unidos en nuestra misión, nos adelantamos a los años, respondiendo al llamado de cuidado y precisión.</p>
      <div className="gpt3__header-content__input">
   
      </div>

      <div className="gpt3__header-content__people">
        <img src={people} />
        <p>¡únete a nuestra comunidad!</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
