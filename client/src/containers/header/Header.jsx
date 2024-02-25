import React, { useEffect, useRef } from 'react';
import ai from '../../assets/ai.png'; // Asegúrate de que la ruta sea correcta
import './header.css'; // Asegúrate de que la ruta sea correcta

// Definición de TextScramble (puedes ubicarla en otro archivo si prefieres)
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Componente funcional Header
const Header = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const fx = new TextScramble(textRef.current);

      
  const phrases = [
    "VitalIA está",
    "para cuidar de ti",
    "de forma inteligente",
  ];

      let counter = 0;
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 800);
        });
        counter = (counter + 1) % phrases.length;
      };

      next();
    }
  }, []);

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Con VitalIA, lleva el cuidado de la salud al siguiente nivel</h1>
        <p>En la búsqueda de bienestar, ninguna innovación es demasiado grande. No hay descanso en el avance de la tecnología. El progreso trae consigo una transformación jubilosa, rompiendo las barreras de la medicina tradicional. Unidos en nuestra misión, nos adelantamos a los años, respondiendo al llamado de cuidado y precisión.</p>
        <div className="gpt3__header-content__input">
          {/* Inputs o botones si necesitas */}
        </div>
        <div className="container">
          <div className="text" ref={textRef}></div>
        </div>
      </div>
      <div className="gpt3__header-image">
        <img src={ai} alt="AI" />
      </div>
    </div>
  );
};

export default Header;
