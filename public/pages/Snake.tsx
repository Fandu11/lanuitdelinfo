import { useState } from 'react';
import { Typography, Card, Input, message } from 'antd';
import { QuestionCircleOutlined, BulbOutlined } from '@ant-design/icons';

// Import du jeu (chemin à adapter si besoin)
import HiddenSnake from '../../src/components/HiddenSnake';

const { Title, Paragraph } = Typography;

export default function Sesame() {
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Fonction appelée à chaque lettre tapée
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().trim();
    setInputValue(value);

    // Les réponses acceptées
    if (value === 'python') {
      // 1. On lance le jeu
      setIsSnakeOpen(true);
      // 2. On vide le champ
      setInputValue('');
      // 3. Petit message de succès
      message.success('Accès autorisé : Protocole lancé ! 🐍');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Carte de l'Énigme */}
      <Card 
        title={<><QuestionCircleOutlined /> Énigme</>} 
        style={{ marginTop: 40, borderColor: '#1890ff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <div style={{ fontSize: '1.1em', marginBottom: '20px', fontStyle: 'italic', color: '#555' }}>
          I have no legs, yet I make computers run. I have no venom, but I am famous for swallowing 'mice' and catching 'bugs'. <br/>
          I can squeeze you tight in the jungle, or help you build a website at home.<br/>
          <br/>
          <strong>What am I ?</strong>"
        </div>

        <Input 
          size="large"
          placeholder="Tape la réponse ici..."
          value={inputValue}
          onChange={handleInputChange}
          style={{ 
            maxWidth: '300px', 
            textAlign: 'center',
            fontSize: '1.2em',
            borderRadius: '8px'
          }}
          // Petit effet visuel : bordure verte si on approche de la réponse (optionnel)
          status={inputValue.length > 2 ? 'warning' : ''}
        />
      </Card>

      {/* Le Jeu Caché */}
      <HiddenSnake 
        visible={isSnakeOpen} 
        onClose={() => setIsSnakeOpen(false)} 
      />
    </div>
  );
}