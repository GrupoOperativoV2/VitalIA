import React, { useState, useEffect } from 'react';
import doctor from '../../assets/doc.png';
import hospital from '../../assets/hospital.png'; // Importa la nueva imagen

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        { id: 0, text: '¡Bienvenido a VitalIA! Inicia sesión y comienza tu viaje hacia una atención médica más inteligente.', image: doctor },
        { id: 1, text: 'Entra a VitalIA: tu puerta al futuro del cuidado de la salud. ¡Inicia sesión ahora!', image: hospital },
        ];

    // Función para pasar al siguiente slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Función para pasar al slide anterior
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Función para ir a un slide específico
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Efecto para cambiar automáticamente el slide cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="contenedor-slider">
            <div className="slider">
                {slides.map((slide, index) => (
                    <div className={`slide-fade ${currentIndex === index ? 'active' : ''}`} key={slide.id}>
                       <img className="slider__image" src={slide.image} alt="" />
                        <div className="contenido-slider">
                            <p className="slider-texto">{slide.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <a href="#" className="prev" onClick={prevSlide}><i className="fas fa-chevron-left"></i></a>
            <a href="#" className="next" onClick={nextSlide}><i className="fas fa-chevron-right"></i></a>
            <div className="dots">
                {slides.map((slide, index) => (
                    <span key={slide.id} className={`dot ${currentIndex === index ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;
