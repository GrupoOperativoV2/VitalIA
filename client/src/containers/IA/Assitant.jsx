import React, { useState } from 'react';

export function Assistant() {
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState(null); 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div>
      <label>
        Ingresa algo:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <p>Salida: {inputValue}</p>
      
      <label>
        Sube una foto:
        <input type="file" onChange={handleFileChange} accept="image/*" /> {/* Añadido accept para restringir a imágenes */}
      </label>
      {imagePreview && (
        <div>
          <p>Previsualización de la imagen:</p>
          <img src={imagePreview} alt="Vista previa" style={{ width: '100%', maxWidth: '400px' }} />
        </div>
      )}
    </div>
  );
}
