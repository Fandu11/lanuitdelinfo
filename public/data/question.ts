// src/data/questions.ts

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
    questionText: "Quel est l'impact principal du numérique sur l'environnement ?",
    options: [
      "La consommation d'eau",
      "La fabrication des terminaux",
      "L'envoi d'emails",
      "Le streaming vidéo"
    ],
    correctAnswerIndex: 1,
    explanation: "C'est la fabrication (extraction de minerais, énergie) qui pèse le plus lourd (environ 70-80% de l'empreinte)."
  },
  {
    id: 2,
    questionText: "Que signifie l'acronyme NIRD (dans notre contexte fictif) ?",
    options: [
      "Numérique Intelligent Rapide Durable",
      "Nuit de l'Info Recherche Data",
      "Nouvelle Initiative pour la Résilience Durable",
      "Nous Ignorons Rien Demain"
    ],
    correctAnswerIndex: 2,
    explanation: "C'est une initiative visant à promouvoir des actions concrètes pour la planète."
  },
  // Ajoutez vos autres questions ici...
];