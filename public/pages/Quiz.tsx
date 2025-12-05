// src/pages/Quiz.tsx
import { useState } from 'react';
import { Card, Button, Typography, Progress, Space, Alert, Result } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { quizQuestions } from '../data/question'; // Import des questions

const { Title, Paragraph, Text } = Typography;

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  // Gère le clic sur une réponse
  const handleAnswerClick = (index: number) => {
    if (isAnswerChecked) return; // Empêche de changer après avoir validé
    setSelectedAnswer(index);
    setIsAnswerChecked(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  // Passe à la question suivante
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // Recommencer le quiz
  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  // Affichage du résultat final
  if (showResult) {
    return (
      <Card style={{ maxWidth: 600, margin: '24px auto', textAlign: 'center' }}>
        <Result
          status={score > totalQuestions / 2 ? "success" : "warning"}
          title={`Quiz terminé !`}
          subTitle={`Vous avez obtenu ${score} sur ${totalQuestions} bonnes réponses.`}
          extra={[
            <Button type="primary" key="console" onClick={resetQuiz} icon={<ReloadOutlined />}>
              Recommencer
            </Button>,
            // Idée Ergonomie : Bouton pour aller vers la partie "Comprendre"
            <Button key="learn" href="/sesame">
              Comprendre pourquoi
            </Button>,
          ]}
        />
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 800, margin: '24px auto' }} title={`Question ${currentQuestionIndex + 1}/${totalQuestions}`}>
      
      {/* Barre de progression */}
      <Progress percent={Math.round(((currentQuestionIndex) / totalQuestions) * 100)} showInfo={false} style={{ marginBottom: 20 }} />

      <Title level={4}>{currentQuestion.questionText}</Title>

      <Space direction="vertical" style={{ width: '100%' }}>
        {currentQuestion.options.map((option, index) => {
          // Logique de couleur des boutons
          let buttonType: "default" | "primary" | "dashed" = "default";
          let danger = false;
          let icon = null;
          let style: React.CSSProperties = { textAlign: 'left', height: 'auto', whiteSpace: 'normal' };

          if (isAnswerChecked) {
            if (index === currentQuestion.correctAnswerIndex) {
              // C'est la bonne réponse (toujours verte)
              buttonType = "primary";
              style = { ...style, backgroundColor: '#52c41a', borderColor: '#52c41a', color: 'white' };
              icon = <CheckCircleOutlined />;
            } else if (index === selectedAnswer) {
              // Mauvaise réponse sélectionnée (rouge)
              danger = true;
              buttonType = "primary";
              icon = <CloseCircleOutlined />;
            }
          } else if (index === selectedAnswer) {
              buttonType = "primary";
          }

          return (
            <Button
              key={index}
              block
              size="large"
              type={buttonType}
              danger={danger}
              icon={icon}
              onClick={() => handleAnswerClick(index)}
              style={style}
              disabled={isAnswerChecked && index !== currentQuestion.correctAnswerIndex && index !== selectedAnswer}
            >
              {option}
            </Button>
          );
        })}
      </Space>

      {/* Zone d'explication et bouton suivant */}
      {isAnswerChecked && (
        <div style={{ marginTop: 24, animation: 'fadeIn 0.5s' }}>
          <Alert
            message={selectedAnswer === currentQuestion.correctAnswerIndex ? "Correct !" : "Oups !"}
            description={currentQuestion.explanation}
            type={selectedAnswer === currentQuestion.correctAnswerIndex ? "success" : "error"}
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Button type="primary" size="large" onClick={handleNextQuestion} style={{ float: 'right' }}>
            {currentQuestionIndex + 1 === totalQuestions ? "Voir les résultats" : "Question suivante"}
          </Button>
        </div>
      )}
    </Card>
  );
}