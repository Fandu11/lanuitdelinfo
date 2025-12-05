import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'antd';

interface HiddenSnakeProps {
  visible: boolean;
  onClose: () => void;
}

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

// 🎨 PALETTE "PASTEL DREAM"
const LEVEL_COLORS = [
  '#FF9AA2', '#b3bde7ff', '#90d8beff', '#f3c2a2ff', '#d6f0acff', '#FFB7B2',
];

const THEME = {
  canvasBg: '#FFF0F5',
  gridLine: '#FFD1DC',
  apple: '#FF6F91',
  snakeHead: '#8854d0',
  modalBg: '#ffffff',
  text: '#6D214F',
};

// Durée de l'animation d'explosion en "ticks" de jeu
const EXPLOSION_DURATION = 6; 

export default function HiddenSnake({ visible, onClose }: HiddenSnakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // États d'affichage
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  
  // Refs logique du jeu
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  // Pour suivre l'état de l'explosion du cœur
  // x, y : position de l'explosion
  // tick : compte à rebours de l'animation (commence à EXPLOSION_DURATION et descend à 0)
  const explosionRef = useRef<{x: number, y: number, tick: number} | null>(null);

  const dirRef = useRef({ x: 0, y: 0 });
  const gameLoopRef = useRef<number | null>(null);
  const speedRef = useRef(150);
  
  const scoreRef = useRef(0); 
  const levelRef = useRef(1);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setGameOver(false);
    
    scoreRef.current = 0;
    levelRef.current = 1;
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    speedRef.current = 150;
    explosionRef.current = null; // Reset explosion
    
    spawnFood();
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(runGameStep, speedRef.current);
  };

  const spawnFood = () => {
    let newFood: { x: any; y: any; };
    // Empêcher la pomme d'apparaître sur le serpent
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    foodRef.current = newFood;
  };

  const runGameStep = () => {
    // GESTION DU TIMER D'EXPLOSION
    if (explosionRef.current) {
        explosionRef.current.tick--;
        // Si l'animation est finie :
        if (explosionRef.current.tick <= 0) {
            explosionRef.current = null; // On nettoie l'état
            spawnFood(); // ET SEULEMENT MAINTENANT on fait apparaître le nouveau cœur
        }
    }

    const snake = snakeRef.current;
    const head = { ...snake[0] };
    const dir = dirRef.current;

    head.x += dir.x;
    head.y += dir.y;

    // Traversée des murs
    if (head.x < 0) head.x = GRID_SIZE - 1;
    if (head.x >= GRID_SIZE) head.x = 0;
    if (head.y < 0) head.y = GRID_SIZE - 1;
    if (head.y >= GRID_SIZE) head.y = 0;

    // Collision snake
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    snake.unshift(head);

    // Manger la pomme (Gestion modifiée pour l'explosion)
    // On vérifie aussi qu'une explosion n'est pas DÉJÀ en cours (pour éviter les double triggers)
    if (head.x === foodRef.current.x && head.y === foodRef.current.y && !explosionRef.current) {
      const points = 10;
      scoreRef.current += points;
      setScore(scoreRef.current);

      // DÉCLENCHER L'EXPLOSION ICI
      explosionRef.current = {
          x: foodRef.current.x,
          y: foodRef.current.y,
          tick: EXPLOSION_DURATION // On initialise le compte à rebours
      };
      
      // NOTE IMPORTANTE : On NE TIRE PAS spawnFood() ici. 
      // On attend la fin de l'animation (voir début de la fonction runGameStep).
      // On déplace temporairement la "vraie" food hors de l'écran pour ne pas la voir pendant l'anim
      foodRef.current = { x: -10, y: -10 };

      // Logique de niveau
      const newLevel = Math.floor(scoreRef.current / 50) + 1;
      if (newLevel > levelRef.current) {
        levelRef.current = newLevel;
        setLevel(newLevel);
        if (speedRef.current > 40) {
            speedRef.current -= 15;
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            gameLoopRef.current = setInterval(runGameStep, speedRef.current);
        }
      }
      // spawnFood() a été retiré d'ici
    } else {
      snake.pop();
    }
    
    draw();
  };

  // Fonction utilitaire pour dessiner une moitié de cœur (complexe !)
  const drawHeartHalf = (ctx: CanvasRenderingContext2D, side: 'left' | 'right') => {
      ctx.beginPath();
      if (side === 'left') {
          // Dessin du côté gauche, arrêt au milieu
          ctx.moveTo(0, -5);
          ctx.bezierCurveTo(-7, -15, -15, -5, -15, 5);
          ctx.bezierCurveTo(-15, 15, -5, 20, 0, 30);
          // Ligne de brisure au milieu (zigzag)
          ctx.lineTo(0, 15); ctx.lineTo(-2, 10); ctx.lineTo(0, 5); ctx.lineTo(0, -5);
      } else {
          // Dessin du côté droit, arrêt au milieu
          ctx.moveTo(0, -5);
          ctx.bezierCurveTo(7, -15, 15, -5, 15, 5);
          ctx.bezierCurveTo(15, 15, 5, 20, 0, 30);
          // Ligne de brisure au milieu (zigzag inverse)
          ctx.lineTo(0, 15); ctx.lineTo(2, 10); ctx.lineTo(0, 5); ctx.lineTo(0, -5);
      }
      ctx.fill();
  };


  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentColor = LEVEL_COLORS[(levelRef.current - 1) % LEVEL_COLORS.length];

    // 1. Fond
    ctx.fillStyle = THEME.canvasBg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 2. Grille
    ctx.strokeStyle = THEME.gridLine;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]); 
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL_SIZE, 0); ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL_SIZE); ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE); ctx.stroke();
    }
    ctx.setLineDash([]);

    // 3. DESSIN DU CŒUR : Logique conditionnelle
    if (explosionRef.current) {
        // === ANIMATION CŒUR BRISÉ ===
        const { x, y, tick } = explosionRef.current;
        
        // Calcul de la progression de l'anim (de 0.0 à 1.0)
        // 1.0 au début (tick élevé), 0.0 à la fin (tick faible)
        const progress = tick / EXPLOSION_DURATION; 
        // L'inverse : 0.0 au début, 1.0 à la fin. Utile pour l'écartement.
        const inverseProgress = 1 - progress;

        const heartCenterX = x * CELL_SIZE + CELL_SIZE / 2;
        const heartCenterY = y * CELL_SIZE + CELL_SIZE / 2 - 1;
        const scale = CELL_SIZE / 35;

        ctx.save();
        ctx.translate(heartCenterX, heartCenterY);
        ctx.scale(scale, scale);

        // L'opacité diminue avec le temps
        ctx.globalAlpha = progress; 
        ctx.fillStyle = THEME.apple; // On garde la couleur rose
        ctx.shadowBlur = 20 * progress; // Le glow diminue aussi
        ctx.shadowColor = THEME.apple;

        // Moitié GAUCHE qui part vers la gauche
        ctx.save();
        // Plus l'anim avance (inverseProgress augmente), plus on décale à gauche (-15 pixels max)
        ctx.translate(-15 * inverseProgress, 0); 
        // Légère rotation pour le dramatique (-0.2 rad max)
        ctx.rotate(-0.2 * inverseProgress); 
        drawHeartHalf(ctx, 'left');
        ctx.restore();

        // Moitié DROITE qui part vers la droite
        ctx.save();
        ctx.translate(15 * inverseProgress, 0);
        ctx.rotate(0.2 * inverseProgress);
        drawHeartHalf(ctx, 'right');
        ctx.restore();
        
        ctx.restore(); // Restaure tout (y compris l'opacité globale)

    } else {
        // === DESSIN CŒUR NORMAL (Si pas d'explosion) ===
        // (C'est le code que tu avais avant)
        ctx.shadowBlur = 15; 
        ctx.shadowColor = THEME.apple;
        ctx.fillStyle = THEME.apple;

        const heartCenterX = foodRef.current.x * CELL_SIZE + CELL_SIZE / 2;
        const heartCenterY = foodRef.current.y * CELL_SIZE + CELL_SIZE / 2 - 1;
        const scale = CELL_SIZE / 40;

        ctx.save(); 
        ctx.translate(heartCenterX, heartCenterY); 
        ctx.scale(scale, scale); 

        ctx.beginPath();
        // Cœur complet standard
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(-7, -15, -15, -5, -15, 5);
        ctx.bezierCurveTo(-15, 15, -5, 20, 0, 30); 
        ctx.bezierCurveTo(5, 20, 15, 15, 15, 5);   
        ctx.bezierCurveTo(15, -5, 7, -15, 0, -5);  

        ctx.fill();
        ctx.restore(); 
    }

    // 4. Serpent
    ctx.shadowBlur = 0; 
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? THEME.snakeHead : currentColor; 
      const radius = 4;
      ctx.beginPath();
      ctx.roundRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2, radius); 
      ctx.fill();
    });
  };

  // Contrôles
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!visible) return;
      const key = e.key;
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(key)) e.preventDefault();

      switch(key) {
        case 'ArrowUp': if (dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 }; break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible]);

  useEffect(() => {
    if (visible) startGame();
    else if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  }, [visible]);

  return (
    <Modal
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
          <span style={{ color: THEME.snakeHead, fontWeight: 'bold', fontSize: '1.2em' }}>
            SNAKE GAME
          </span>
          <span style={{ backgroundColor: LEVEL_COLORS[(level - 1) % LEVEL_COLORS.length], padding: '2px 10px', borderRadius: '15px', color: '#fff', fontSize: '0.9em' }}>
            LEVEL {level}
          </span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={450}
      zIndex={10000}
      bodyStyle={{ background: THEME.modalBg, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '0 0 10px 10px' }}
      modalRender={(modal) => (
        <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(255, 105, 180, 0.3)' }}>{modal}</div>
      )}
      centered
    >
      <canvas 
        ref={canvasRef} 
        width={CANVAS_SIZE} 
        height={CANVAS_SIZE}
        style={{ border: `4px solid ${LEVEL_COLORS[(level - 1) % LEVEL_COLORS.length]}`, borderRadius: '10px', backgroundColor: THEME.canvasBg, boxShadow: 'inset 0 0 20px rgba(255,192,203, 0.4)' }}
      />
      <div style={{ marginTop: 20, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: THEME.text, fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
        <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}> SCORE: {score}</span>
        {gameOver && (
          <Button type="primary" size="large" onClick={startGame} style={{ backgroundColor: THEME.apple, borderColor: THEME.apple, borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(255, 111, 145, 0.4)' }}>
            RETRY
          </Button>
        )}
      </div>
    </Modal>
  );
}