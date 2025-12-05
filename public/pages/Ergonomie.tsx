// public/pages/Ergonomie.tsx
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

export default function Ergonomie() {
  return (
    <Card>
      <Title level={2}>L'ergonomie : simplifier pour mieux vivre</Title>
      <Paragraph>
        Découvrez nos solutions pour une meilleure expérience utilisateur.
        Nous nous concentrons sur la simplicité et l'efficacité pour améliorer
        le quotidien de nos utilisateurs.
      </Paragraph>
    </Card>
  );
}