import { useEffect, useState } from 'react';

// Le code : Haut Haut Bas Bas Gauche Droite Gauche Droite b a
const KONAMI_CODE = [
  'a'
];

export const useKonamiCode = (action: () => void) => {
  const [input, setInput] = useState<string[]>([]);
  console.log('Séquence actuelle :', input); // Utilisation de la variable input

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // On convertit tout en minuscule pour éviter les erreurs de majuscules
      const key = e.key.toLowerCase();
      
      setInput((prev) => {
        const updated = [...prev, key];
        
        // On garde seulement la longueur nécessaire
        if (updated.length > KONAMI_CODE.length) {
          updated.shift();
        }
        
        // Vérification
        if (JSON.stringify(updated) === JSON.stringify(KONAMI_CODE)) {
          console.log("🐍 KONAMI CODE ACTIVÉ !");
          action();
          return []; // Reset
        }
        
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [action]);
};