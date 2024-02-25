import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from '../containers';
import { CTA, Brand, Navbar } from '../components';
import React, { useEffect, useRef } from 'react';



function HomePage() {
  /*
  const neonRef = useRef(null); 
  useEffect(() => {
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
  }, []);
  */
  return (
    
    <div className="neon"id="neon">
      <div className="App" style={{ background: '#040C18', color: 'white' }} >
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <WhatGPT3 />
        <Features />
        <Possibility />
        <CTA />
        <Footer />
      </div>
    </div>


  );
}

export default HomePage;

