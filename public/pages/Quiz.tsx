// src/pages/Quiz.tsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, Button, Typography, Progress, Alert, Result, List, Avatar, Divider, Space , message} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, TrophyOutlined 
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import { quizQuestions } from '../data/question';
import './Quiz.css';
import NirdLogo from '../components/logo.png'; // Make sure this path is correct!

const { Title } = Typography;

// --- TYPES ---
interface ScoreEntry { name: string; score: number; date: string; }

// Interface pour la physique d'une touche
interface KeyPhysics {
  id: number | string;
  x: number;      // Position horizontale
  y: number;      // Position verticale
  vx: number;     // Vitesse horizontale
  vy: number;     // Vitesse verticale
  color: string;  // Sa couleur pastel
}

const FAKE_PLAYERS: ScoreEntry[] = [
  { name: "Expert NIRD", score: 8, date: "04/12/2025" },
  { name: "Linux Fan", score: 6, date: "04/12/2025" },
  { name: "Green IT", score: 4, date: "04/12/2025" },
];

// Palette de couleurs pastels
const PASTEL_COLORS = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', // Arc-en-ciel pastel
  '#FFC3A0', '#D5AAFF', '#B5EAD7', '#E2F0CB', '#FFDAC1',
  '#C7CEFF', '#F9F871'
];

// --- OUTILS ---
const shuffleArray = (array: string[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const generateRandomKeypad = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const shuffled = shuffleArray(alphabet);
  const mapping: Record<number, string[]> = {};
  let charIndex = 0;
  for (let key = 2; key <= 9; key++) {
    const count = (key === 7 || key === 9) ? 4 : 3;
    mapping[key] = shuffled.slice(charIndex, charIndex + count);
    charIndex += count;
  }
  mapping[1] = ['.', '-', '_', '@'];
  mapping[0] = [' '];
  return mapping;
};

// Liste des touches à afficher
const KEY_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'BACK', 0, 'ENTER'];
const KEY_SIZE = 85; // Doit correspondre au CSS

export default function Quiz() {

  const navigate = useNavigate();

  // --- États du Jeu ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // --- États du Classement ---
  const [userName, setUserName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);

  // --- États du Clavier Chaos ---
  const keyMapping = useMemo(() => generateRandomKeypad(), []);
  // État pour stocker la physique de chaque touche
  const [flyingKeys, setFlyingKeys] = useState<KeyPhysics[]>([]);
  
  // Refs pour le multi-tap
  const lastKeyRef = useRef<number | null>(null);
  const lastPressTimeRef = useRef<number>(0);
  const cycleIndexRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);
  // Ref pour la boucle d'animation
  const requestRef = useRef<number>();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  useEffect(() => {
    const savedScores = localStorage.getItem('nird_quiz_leaderboard');
    if (savedScores) setLeaderboard(JSON.parse(savedScores));
    else setLeaderboard(FAKE_PLAYERS);
  }, []);

  // --- BOUCLE D'ANIMATION PHYSIQUE ---
  const animateKeys = useCallback(() => {
    setFlyingKeys(prevKeys => {
      // On récupère les dimensions de l'écran à chaque frame au cas où ça change
      const maxWidth = window.innerWidth - KEY_SIZE;
      const maxHeight = window.innerHeight - KEY_SIZE;

      return prevKeys.map(key => {
        let { x, y, vx, vy } = key;

        // Mise à jour de la position
        x += vx;
        y += vy;

        // Gestion des rebonds sur les bords
        // Si on tape à gauche ou à droite
        if (x <= 0 || x >= maxWidth) {
          vx = -vx; // On inverse la vitesse horizontale
          x = Math.max(0, Math.min(x, maxWidth)); // On s'assure qu'il reste dedans
        }
        // Si on tape en haut ou en bas
        if (y <= 0 || y >= maxHeight) {
          vy = -vy; // On inverse la vitesse verticale
          y = Math.max(0, Math.min(y, maxHeight));
        }

        return { ...key, x, y, vx, vy };
      });
    });
    // On relance la boucle pour la prochaine frame
    requestRef.current = requestAnimationFrame(animateKeys);
  }, []);

  // Initialisation et lancement de l'animation quand on arrive sur l'écran de résultat
  useEffect(() => {
    if (showResult && !isScoreSaved) {
      const maxWidth = window.innerWidth - KEY_SIZE;
      const maxHeight = window.innerHeight - KEY_SIZE;

      // Création initiale des 12 touches avec positions/vitesses aléatoires
      const initialKeys: KeyPhysics[] = KEY_LIST.map((id, index) => ({
        id,
        x: Math.random() * maxWidth,
        y: Math.random() * maxHeight,
        // Vitesse aléatoire entre -3 et 3 pixels par frame
        vx: (Math.random() - 0.5) * 6, 
        vy: (Math.random() - 0.5) * 6,
        // Couleur pastel cyclique
        color: PASTEL_COLORS[index % PASTEL_COLORS.length]
      }));
      
      setFlyingKeys(initialKeys);
      // Démarrage de la boucle
      requestRef.current = requestAnimationFrame(animateKeys);
    }

    // Nettoyage quand on quitte l'écran (important !)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [showResult, isScoreSaved, animateKeys]);


  // --- LOGIQUE DU JEU (inchangée) ---
  const handleAnswerClick = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
    setIsAnswerChecked(true);
    if (index === currentQuestion.correctAnswerIndex) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    if (currentQuestionIndex + 1 < totalQuestions) setCurrentQuestionIndex(currentQuestionIndex + 1);
    else setShowResult(true);
  };

  // --- LOGIQUE CLAVIER (inchangée) ---
  const handleKeyPadClick = (key: number | string) => {
    const now = Date.now();
    if (key === 'BACK') { 
        setUserName(''); // On remplace tout par une chaîne vide !
        resetMultiTap(); 
        return; 
    }
    if (key === 'ENTER') { handleSaveScore(); return; }

    if (typeof key === 'number') {
        const chars = keyMapping[key];
        if (!chars) return;
        if (lastKeyRef.current === key && (now - lastPressTimeRef.current) < 1000) {
            cycleIndexRef.current = (cycleIndexRef.current + 1) % chars.length;
            const nextChar = chars[cycleIndexRef.current];
            setUserName(prev => prev.slice(0, -1) + nextChar);
            resetTimeout();
        } else {
            cycleIndexRef.current = 0;
            setUserName(prev => prev + chars[0]);
            resetTimeout();
        }
        lastKeyRef.current = key;
        lastPressTimeRef.current = now;
    }
  };

  const resetTimeout = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => { lastKeyRef.current = null; }, 1000);
  }

  const resetMultiTap = () => { lastKeyRef.current = null; cycleIndexRef.current = 0; }

  // --- SAUVEGARDE & RESET (inchangé) ---
  const handleSaveScore = () => {

    const cleanedName = userName.trim().toLowerCase();

    // --- EASTER EGG SNAKE ---
    if (cleanedName === 'snake') {
        message.loading('Initialisation du protocole Python... 🐍', 1.5)
          .then(() => {
            // Redirection vers la page sésame
            navigate('/sesame', { state: { autoStart: true } }); 
          });
        return; // On arrête la fonction ici, on n'enregistre pas le score
    }

    if (!userName.trim()) return;
    const newEntry: ScoreEntry = { name: userName, score: score, date: new Date().toLocaleDateString('fr-FR') };
    const newLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('nird_quiz_leaderboard', JSON.stringify(newLeaderboard));
    setIsScoreSaved(true);
    setFlyingKeys([]); // On supprime les touches volantes
  };

  const resetQuiz = () => {
    setScore(0); setCurrentQuestionIndex(0); setShowResult(false); setSelectedAnswer(null);
    setIsAnswerChecked(false); setIsScoreSaved(false); setUserName(''); resetMultiTap();
    setFlyingKeys([]);
  };

  if (!currentQuestion) return <div>Chargement...</div>;

  // --- RENDU ÉCRAN RÉSULTAT ---
  if (showResult) {
    return (
      <div className="quiz-page-container">
        {/* On z-index la carte pour qu'elle soit SOUS les touches volantes */}
        <Card className="quiz-card fade-in" style={{ textAlign: 'center', zIndex: 1 }}>
          
          <Result
            status={score > totalQuestions / 2 ? "success" : "info"}
            icon={
                <img 
                src={NirdLogo} 
                alt="Logo NIRD" 
                style={{ width: 180, marginBottom: 20 }} // Ajuste la taille si besoin
                />
            }
            title={isScoreSaved ? "Score enregistré !" : "Mission Terminée"}
            subTitle={`Score final : ${score} / ${totalQuestions}`}
          />

          {!isScoreSaved ? (
            <div className="fade-in">
              {/* Titre modifié comme demandé */}
              <Title level={4} style={{marginTop: 20}}>Entrez votre Prénom</Title>
              <p style={{ color: '#888', marginBottom: 10 }}>(Attrapez les touches si vous pouvez !)</p>
              
              <div className="retro-input-screen">
                  {userName}<span className="cursor-blink"></span>
              </div>

              {/* RENDU DES TOUCHES VOLANTES */}
              {flyingKeys.map((keyData) => {
                 let content;
                 // Logique d'affichage du contenu de la touche
                 if (keyData.id === 'BACK') {
                    content = <><span style={{fontSize: '1.5rem'}}>←</span><span className="key-letters-pastel">EFFACER</span></>;
                 } else if (keyData.id === 'ENTER') {
                    content = <><span style={{fontSize: '1.5rem'}}>✓</span><span className="key-letters-pastel">VALIDER</span></>;
                 } else if (typeof keyData.id === 'number') {
                    content = (
                        <>
                          <span className="key-number-pastel">{keyData.id}</span>
                          <span className="key-letters-pastel">{keyMapping[keyData.id].join('')}</span>
                        </>
                    );
                 }

                 return (
                    <div
                        key={keyData.id}
                        className="keypad-btn-chaos"
                        // C'est ici que la magie opère : on applique les positions et la couleur via le style en ligne
                        style={{
                            top: keyData.y,
                            left: keyData.x,
                            backgroundColor: keyData.color,
                        }}
                        onClick={() => handleKeyPadClick(keyData.id)}
                    >
                        {content}
                    </div>
                 );
              })}
              
              {/* Un div vide pour garder de la place en bas de la carte */}
              <div style={{height: 100}}></div>

            </div>
          ) : (
            /* LISTE DES SCORES (inchangé) */
             <div className="fade-in" style={{ maxWidth: 500, margin: '0 auto' }}>
             <Divider><TrophyOutlined /> Classement NIRD</Divider>
             <List
               itemLayout="horizontal"
               dataSource={leaderboard}
               renderItem={(item, index) => (
                 <List.Item style={{ backgroundColor: item.name === userName ? '#e6f7ff' : 'transparent', padding: '10px', borderRadius: 6 }}>
                   <List.Item.Meta
                     avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                     title={<span style={{ fontWeight: item.name === userName ? 'bold' : 'normal' }}>{item.name}</span>}
                     description={<small>{item.date}</small>}
                   />
                   <div style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#1890ff' }}>{item.score}/{totalQuestions}</div>
                 </List.Item>
               )}
             />
             <Divider />
             <Space>
               <Button size="large" onClick={resetQuiz} icon={<ReloadOutlined />}>Rejouer</Button>
               <Button type="primary" size="large" href="/sesame">Comprendre</Button>
             </Space>
           </div>
          )}
        </Card>
      </div>
    );
  }

  // --- RENDU JEU (inchangé) ---
  return (
    <div className="quiz-page-container">
      <Card 
        className="quiz-card"
        title={/* ... (inchangé) ... */
            <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, color: '#888' }}>
                <span>Progression</span>
                <span>Question {currentQuestionIndex + 1} / {totalQuestions}</span>
            </div>
            <Progress 
                percent={Math.round(((currentQuestionIndex) / totalQuestions) * 100)} 
                // Nouveau dégradé pastel (violet doux vers jaune doux)
                strokeColor={{ '0%': '#D5AAFF', '100%': '#F9F871' }}
                showInfo={false} 
                strokeWidth={10} // Un peu plus épaisse pour le style
            />
        </div>
        }
      >
       {/* ... (le reste du rendu du quiz est inchangé) ... */}
        <Title level={3} className="quiz-question-title fade-in">{currentQuestion.questionText}</Title>
        <div className="options-container fade-in">
          {currentQuestion.options.map((option, index) => {
            let btnClass = "option-button";
            let icon = null;
            if (isAnswerChecked) {
              if (index === currentQuestion.correctAnswerIndex) {
                btnClass += " option-correct";
                icon = <CheckCircleOutlined />;
              } else if (index === selectedAnswer) {
                btnClass += " option-wrong";
                icon = <CloseCircleOutlined />;
              }
            }
            return (
              <Button
                key={index}
                className={btnClass}
                icon={icon}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswerChecked && index !== currentQuestion.correctAnswerIndex && index !== selectedAnswer}
              >
                {option}
              </Button>
            );
          })}
        </div>
        {isAnswerChecked && (
          <div className="fade-in" style={{ marginTop: 24 }}>
            <Alert
              message={selectedAnswer === currentQuestion.correctAnswerIndex ? "Bien vu !" : "Dommage..."}
              description={currentQuestion.explanation}
              type={selectedAnswer === currentQuestion.correctAnswerIndex ? "success" : "info"}
              showIcon
            />
            <Button type="primary" size="large" block onClick={handleNextQuestion} style={{ marginTop: 16 }}>
              {currentQuestionIndex + 1 === totalQuestions ? "Voir mon score" : "Question Suivante →"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}