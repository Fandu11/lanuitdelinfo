// src/data/question.ts

export type Question = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // 0, 1, 2, ou 3
  explanation: string; // Petit texte pédagogique après la réponse
};

export const quizQuestions: Question[] = [
  {
    id: 1,
    questionText: "Que signifie l'acronyme NIRD dans le contexte de ce projet ?",
    options: [
      "Numérique Interactif, Rapide et Disponible",
      "Nouvelle Informatique pour la Réussite de Demain",
      "Numérique Inclusif, Responsable et Durable",
      "Norme Internationale de Réparation Durable"
    ],
    correctAnswerIndex: 2, // Réponse C
    explanation: "C'est la définition officielle de la démarche qui vise à promouvoir ces trois valeurs (Inclusif, Responsable, Durable) dans les établissements scolaires."
  },
  {
    id: 2,
    questionText: "Quels sont les trois jalons progressifs de la démarche NIRD ?",
    options: [
      "Achat, Installation, Formation",
      "Mobilisation, Expérimentation, Intégration",
      "Découverte, Maîtrise, Expertise",
      "Planification, Exécution, Clôture"
    ],
    correctAnswerIndex: 1, // Réponse B
    explanation: "La démarche commence par une phase de mobilisation, suivie de l'expérimentation, pour finir par l'intégration durable dans le projet d'établissement."
  },
  {
    id: 3,
    questionText: "Qui est généralement l'acteur principal pour lancer la phase de \"Mobilisation\" (Jalon 1) ?",
    options: [
      "Le Ministère de l'Éducation nationale",
      "Une entreprise de services numériques",
      "Un enseignant volontaire",
      "Les parents d'élèves"
    ],
    correctAnswerIndex: 2, // Réponse C
    explanation: "La démarche débute par l'identification, par auto-désignation, d'un enseignant volontaire qui devient le contact NIRD de l'établissement."
  },
  {
    id: 4,
    questionText: "Quelle distribution Linux est spécifiquement recommandée pour les écoles primaires ?",
    options: [
      "Ubuntu",
      "Linux Mint",
      "PrimTux",
      "Debian Éducation"
    ],
    correctAnswerIndex: 2, // Réponse C
    explanation: "PrimTux est la distribution conçue par et pour des enseignants, adaptée aux usages pédagogiques du premier degré (cycles 1, 2, 3)."
  },
  {
    id: 5,
    questionText: "Quel événement majeur d'octobre 2025 rend urgent le passage à Linux ?",
    options: [
      "L'augmentation du prix des licences",
      "La fin du support de Windows 10",
      "La pénurie de composants électroniques",
      "Une nouvelle loi européenne"
    ],
    correctAnswerIndex: 1, // Réponse B
    explanation: "La fin brutale du support de Windows 10 rendra obsolètes des milliers de machines du secteur public, créant une urgence écologique."
  },
  {
    id: 6,
    questionText: "Comment les élèves (collège/lycée) peuvent-ils participer activement à la démarche ?",
    options: [
      "En finançant l'achat des ordinateurs",
      "En rejoignant un club informatique pour reconditionner des PC",
      "En rédigeant les programmes scolaires",
      "En assurant la sécurité électrique du bâtiment"
    ],
    correctAnswerIndex: 1, // Réponse B
    explanation: "Les élèves peuvent s'impliquer directement à travers un club informatique consacré au reconditionnement d'ordinateurs sous Linux."
  },
  {
    id: 7,
    questionText: "Pourquoi le choix de Linux est-il considéré comme \"Durable\" ?",
    options: [
      "Car le logo est un pingouin (animal protégé)",
      "Car il permet de prolonger la vie des ordinateurs anciens (+ de 10 ans)",
      "Car les serveurs Linux ne consomment pas d'électricité",
      "Car c'est une marque française"
    ],
    correctAnswerIndex: 1, // Réponse B
    explanation: "Linux est moins gourmand en ressources, ce qui permet d'optimiser le matériel existant ; même des ordinateurs de plus de dix ans retrouvent une seconde vie."
  },
  {
    id: 8,
    questionText: "À quoi sert la plateforme Tchap mentionnée dans la démarche ?",
    options: [
      "À télécharger des jeux vidéo",
      "À surveiller les élèves à distance",
      "À mettre en réseau les établissements pour s'entraider",
      "À commander du matériel neuf"
    ],
    correctAnswerIndex: 2, // Réponse C
    explanation: "Tchap permet la mise en réseau avec d'autres établissements engagés afin de partager pratiques, ressources et retours d'expérience."
  }
];