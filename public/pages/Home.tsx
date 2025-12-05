// src/pages/Home.tsx
import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div>
      <Title level={2}>Bienvenue sur Team Baobab</Title>
      <p>Contenu de la page d'accueil</p>
    </div>
  );
}