import React from 'react';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header
        title="Bienvenido a AI MedRecords"
        description="Revolutionizing medical records management with artificial intelligence."
      />
      <ActionButton
        text="Descubre Más"
        onClick={() => alert("Navegando a más información...")}
      />
    </div>
  );
};

export default HomePage;
