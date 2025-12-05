import React, { useState, useEffect } from 'react';
import { Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Images pour le diaporama
const slides = [
  '../components/heros.png',
  '../components/pingouin.png',
  '../components/secret.png',
  '../components/urgence.png'
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
      {/* SECTION HAUTE : Le Cercle Animé */}
      <div className="button-circle">
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

      {/* SECTION BASSE : Le Texte Explicatif */}
      <div className="content-card">
        <h1 className="main-title">🔥 Révolution Numérique à l'École : Adoptez la Démarche NIRD !</h1>
        
        <p className="intro-text">
          Windows 10 tire sa révérence ? C'est le signal d'alarme : <strong>STOP à la dépendance technologique !</strong> Un collectif d'enseignants passionnés a dit "ça suffit" et lance la Démarche NIRD pour transformer l'école. Ce n'est pas juste un changement de logiciel, c'est une mission urgente pour un numérique : <strong>Inclusif, Responsable et Durable !</strong>
        </p>

        <div className="divider"></div>

        <h2 className="section-title">🎯 Notre Double Objectif</h2>
        <p>La Démarche NIRD est au carrefour de deux urgences : la transformation numérique et la transition écologique. Elle repose sur trois piliers fondamentaux :</p>

        <div className="pillars-grid">
          <div className="pillar-item p-blue">
            <h3>Inclusion</h3>
            <p>Assurer un accès équitable au numérique pour tous et réduire la fracture technologique.</p>
          </div>
          <div className="pillar-item p-purple">
            <h3>Responsabilité</h3>
            <p>Utiliser des technologies souveraines qui respectent les données personnelles et encouragent un usage raisonné.</p>
          </div>
          <div className="pillar-item p-yellow">
            <h3>Durabilité</h3>
            <p>Lutter contre l'obsolescence programmée en choisissant Linux pour l'équipement et maîtriser les coûts.</p>
          </div>
        </div>

        <div className="divider"></div>

        <h2 className="section-title">💡 Le Cœur de la Révolution : Linux !</h2>
        <p>Notre pari assumé ? L'adoption progressive du système d'exploitation libre <strong>Linux</strong>. C'est à la fois le socle et le premier levier de cette démarche.</p>
        
        <div className="linux-list">
          <p><strong>Pourquoi Linux ?</strong></p>
          <ul>
            <li><strong>Contre l'Obsolescence :</strong> Pour équiper les parcs informatiques durablement.</li>
            <li><strong>Projets Pratiques :</strong> Mener des projets de reconditionnement, si possible avec les élèves.</li>
            <li><strong>Mission Publique :</strong> Engager l'établissement vers un usage frugal et qualitatif.</li>
          </ul>
        </div>

        <div className="cta-box">
          <h2>🤝 Rejoignez le Mouvement !</h2>
          <p>
            C'est une initiative spontanée, née sur le terrain. Elle s'inspire du succès du projet NIRD au lycée Carnot.
            Pour l'instant, la démarche est co-construite en trois jalons : <em>Mobilisation, Expérimentation, Intégration</em>.
          </p>
          <p className="cta-highlight">
            👉 <strong>Vous êtes enseignant intéressé ?</strong> Rejoignez le <a href="https://www.tchap.gouv.fr/#/welcome" style={{ color: '#faad14', textDecoration: 'none' }}>forum Tchap</a> dédié pour échanger et faire de votre établissement un pilote !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;