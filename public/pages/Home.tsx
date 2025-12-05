import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Images pour le diaporama
const slides = [
  'https://via.placeholder.com/300x200/1890ff/ffffff?text=Image+1',
  'https://via.placeholder.com/300x200/52c41a/ffffff?text=Image+2',
  'https://via.placeholder.com/300x200/faad14/ffffff?text=Image+3',
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Gestion du diaporama automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const buttons = [
    { id: 1, text: 'Démarche', path: '/demarche' },
    { id: 2, text: 'Pourquoi', path: '/pourquoi' },
    { id: 3, text: 'Linux', path: '/linux' }
  ];

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="button-circle">
        {/* Diaporama au centre */}
        <div className="slideshow-container">
          <Image
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            preview={false}
            className="slide"
          />
        </div>
        {buttons.map((button, index) => (
          <Button
            key={button.id}
            className={`circle-button button-${index}`}
            onClick={() => handleButtonClick(button.path)}
            style={{ '--rotation': `${index * 120}deg` } as React.CSSProperties}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;