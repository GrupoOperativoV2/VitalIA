import React, { createContext, useContext, useEffect, useState } from 'react';

// Creación del contexto del tema
const ThemeContext = createContext();

// Proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Estado inicial basado en la preferencia del sistema o en el almacenamiento local
  const [theme, setTheme] = useState(() => {
    const storedThemePreference = localStorage.getItem('themePreference');
    return storedThemePreference || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Efecto para aplicar y almacenar la preferencia del tema
  useEffect(() => {
    localStorage.setItem('themePreference', theme);
    document.body.className = theme; // Puedes usar esta clase para definir estilos específicos del tema en tu CSS
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);
