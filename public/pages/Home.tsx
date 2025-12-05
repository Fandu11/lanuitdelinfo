import React, { useState } from 'react';
import { Button, Card } from 'antd';
import './Home.css';

const Home: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const buttons = [
    { id: 1, text: 'Démarche' },
    { id: 2, text: 'Pourquoi' },
    { id: 3, text: 'Linux' }
  ];

  const getContent = () => {
    switch(activeButton) {
      case 1:
        return "Découvrez notre approche innovante et nos méthodes de travail pour vous offrir les meilleures solutions.";
      case 2:
        return "Expertise, professionnalisme et engagement sont les piliers de notre succès.";
      case 3:
        return "Nous croyons en la puissance des solutions open source et de l'écosystème Linux.";
      default:
        return "Sélectionnez une option pour en savoir plus.";
    }
  };

  return (
    <div className="home-container">
      <div className="button-circle">
        {buttons.map((button, index) => (
          <Button
            key={button.id}
            type={activeButton === button.id ? "primary" : "default"}
            className={`circle-button button-${index}`}
            onClick={() => setActiveButton(button.id)}
            style={{ '--rotation': `${index * 120}deg` } as React.CSSProperties}
          >
            {button.text}
          </Button>
        ))}
      </div>
      
      {activeButton !== null && (
        <Card className="content-card">
          <p>{getContent()}</p>
        </Card>
      )}
    </div>
  );
};

export default Home;