import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import { TeamOutlined, ExperimentOutlined, DeploymentUnitOutlined, CheckCircleOutlined} from '@ant-design/icons';
import './Demarche.css';

const { Title, Paragraph, Text } = Typography;

const etapes = [
  {
    id: 'mobilisation',
    titre: "Jalon 1 - Mobilisation",
    objectif: "Sensibiliser l'établissement scolaire et initier une dynamique collective autour de la démarche NIRD.",
    actions: [
      "Identification d'un enseignant volontaire qui devient contact NIRD de l'établissement.",
      "Organisation d'un temps d'information pour présenter les enjeux d'un numérique inclusif, responsable et durable.",
      "Mise en réseau avec d'autres établissements engagés via Tchap.",
      "Diffusion de supports pédagogiques et techniques.",
      "Sensibilisation de la direction de l'établissement.",
      "Information préliminaire de la collectivité de rattachement."
    ],
    resultat: "Une prise de conscience collective, un premier relais interne et une direction favorable au lancement.",
    icon: <TeamOutlined />
  },
  {
    id: 'experimentation',
    titre: "Jalon 2 - Expérimentation",
    objectif: "Tester des solutions concrètes et évaluer leur pertinence pour l'établissement et les usagers.",
    actions: [
      "Installation de postes de travail sous Linux (neufs ou reconditionnés).",
      "Création d'un club informatique pour le reconditionnement (collèges/lycées).",
      "Utilisation de PrimTux pour les écoles primaires.",
      "Formation des enseignants et des élèves.",
      "Mise en place d'un suivi des usages et des améliorations.",
      "Implication de la direction et de la collectivité."
    ],
    resultat: "Une expérience concrète documentée et analysée, avec une direction et une collectivité impliquées.",
    icon: <ExperimentOutlined />
  },
  {
    id: 'integration',
    titre: "Jalon 3 - Intégration",
    objectif: "Inscrire durablement la démarche NIRD dans l'établissement et lui donner une portée structurelle.",
    actions: [
      "Intégration des postes dans le parc informatique de l'établissement.",
      "Inscription de la démarche dans le projet d'établissement.",
      "Valorisation de l'expérience auprès de la communauté éducative.",
      "Désignation d'un référent NIRD reconnu.",
      "Pilotage par la direction avec communication aux familles.",
      "Coopération structurée avec la collectivité pour la pérennité."
    ],
    resultat: "Une intégration complète de la démarche, soutenue institutionnellement et connectée à la collectivité.",
    icon: <DeploymentUnitOutlined />
  }
];

const getEncouragement = (index: number) => {
  const encouragements = [
    { text: "Premier pas vers le changement ! 🚀", icon: <TeamOutlined /> },
    { text: "L'expérimentation est en cours ! 🔍", icon: <ExperimentOutlined /> },
    { text: "Vers une intégration réussie ! 🎯", icon: <DeploymentUnitOutlined /> },
    { text: "Mission accomplie ! 🎉", icon: <CheckCircleOutlined /> }
  ];
  return encouragements[Math.min(index, encouragements.length - 1)];
};

const Demarche: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateProgress = () => {
    if (!containerRef.current) return 0;
    
    const scrollPosition = window.scrollY + (window.innerHeight * 0.3); // Ajustement de la sensibilité
    let currentStep = 0;
    
    // Trouver l'étape la plus haute qui est en cours de défilement
    for (let i = 0; i < etapes.length; i++) {
      const element = document.getElementById(etapes[i].id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;
        
        // Si l'utilisateur a atteint cette étape
        if (scrollPosition > elementTop) {
          currentStep = i + 1;
        }
      }
    }
    
    // Retourne 33% pour la première étape, 66% pour la deuxième, et 100% pour la dernière
    return Math.min(100, currentStep * 34);
  };

  //const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      
      
      const elements = containerRef.current.querySelectorAll('.etape-container');
      const newVisibleElements: number[] = [];
      
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          newVisibleElements.push(index);
        }
      });
      
      setVisibleElements(newVisibleElements);
      //setScrollY(window.scrollY); // Mise à jour de la position de défilement
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Vérifie la visibilité au chargement initial
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progress = calculateProgress();

  const currentEncouragement = getEncouragement(Math.floor(progress / 33));

  return (
    <div className="demarche-container" ref={containerRef}>
      <div className="progress-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ height: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-avatar" style={{ bottom: `${100 - progress}%` }}>
          <div className="avatar-icon">
            {React.cloneElement(currentEncouragement.icon, { 
              style: { fontSize: '24px', color: '#1890ff' } 
            })}
          </div>
          <div className="progress-text">{progress}%</div>
          <div className="encouragement">{currentEncouragement.text}</div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="introduction">
          <Title level={2} className="titre-demarche">La démarche NIRD</Title>
          <Paragraph>
            La démarche NIRD (Numérique Inclusif, Responsable et Durable) propose aux établissements scolaires un cheminement progressif en trois jalons.
          </Paragraph>
          <Paragraph>
            Elle commence par une phase de <Text strong>mobilisation</Text>, où un enseignant volontaire initie la réflexion et sensibilise l'équipe éducative, avec le soutien de la direction et une mise en réseau avec d'autres établissements. Vient ensuite l'<Text strong>expérimentation</Text>, au cours de laquelle des postes Linux, neufs ou reconditionnés, sont installés et utilisés dans l'établissement. Enfin, l'<Text strong>intégration</Text> permet d'inscrire durablement la démarche dans le projet d'établissement et dans le parc informatique, avec une collaboration renforcée entre enseignants, direction et collectivité.
          </Paragraph>
        </div>
        
        <div className="etapes-wrapper">
          {etapes.map((etape, index) => (
            <React.Fragment key={etape.id}>
              <div 
                className={`etape-container ${visibleElements.includes(index) ? 'visible' : ''}`}
                id={etape.id}
              >
                <Card className="carte-etape">
                  <div className="gare-container">
                    <img 
                      src="/images/gare.webp" 
                      alt="Gare" 
                      className="gare-image"
                    />
                  </div>
                  <div className="contenu-etape">
                    <Title level={3} style={{ color: '#1890ff' }}>{etape.titre}</Title>
                    <Paragraph strong>Objectif :</Paragraph>
                    <Paragraph>{etape.objectif}</Paragraph>
                    
                    <Paragraph strong>Actions clés :</Paragraph>
                    <ul>
                      {etape.actions.map((action, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{action}</li>
                      ))}
                    </ul>
                    
                    <Paragraph strong>Résultat attendu :</Paragraph>
                    <Paragraph>{etape.resultat}</Paragraph>
                  </div>
                </Card>
              </div>
              
              {index < etapes.length - 1 && (
                <div className="chemin-container">
                  <div className="rail">
                    <div className="road"></div>
                    <div className="rail-connector top"></div>
                    <div className="rail-connector bottom"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demarche;