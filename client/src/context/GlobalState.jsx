// src/context/GlobalState.js
import React, { createContext, useState } from 'react';
import defaultImage from '../assets/asisstant.png';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({
    image: null,
    imagePreview: defaultImage,
    id: '',
    notes: '',
    pdfActive: false,
    medicalHistory: null,
    userName: '',
    gender: '',
    date: '',
    allergies: '',
    bloodType: '',
    hospitalizations: '',
    familyHistory: ''
  });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
