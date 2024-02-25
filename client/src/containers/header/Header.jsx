import React, { useEffect, useRef } from 'react';
import ai from '../../assets/ai.png'; 
import './header.css'; 

// Definición de TextScramble
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
    this.frameRequest = null; // Agregado para manejar la cancelación del frame
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
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
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
  const neonRef = useRef(null);

  useEffect(() => {
    let fx; // Declaración de fx dentro del useEffect

    // Inicialización de TextScramble
    if (textRef.current) {
      fx = new TextScramble(textRef.current);
      const phrases = ["VitalIA existe", "para cuidar de ti", "de forma inteligente", "Un proyecto de GoDev"];
      let counter = 0;
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 800);
        });
        counter = (counter + 1) % phrases.length;
      };
      next();
    }

    // Carga dinámica de neonCursor
    if (neonRef.current) {
      import("https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js")
        .then(({ neonCursor }) => {
          neonCursor({
            el: neonRef.current,
            shaderPoints: 16,
            curvePoints: 80,
            curveLerp: 0.5,
            radius1: 5,
            radius2: 30,
            velocityTreshold: 10,
            sleepRadiusX: 100,
            sleepRadiusY: 100,
            sleepTimeCoefX: 0.0025,
            sleepTimeCoefY: 0.0025
          });
        })
        .catch(error => console.error("Error al cargar threejs-toys:", error));
    }

    // Limpieza: Cancelar el requestAnimationFrame cuando el componente se desmonte
    return () => {
      if (fx && fx.frameRequest) {
        cancelAnimationFrame(fx.frameRequest);
      }
    };
  }, []);

  return (
    <div className="gpt3__header section__padding" ref={neonRef} id="neon">
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
