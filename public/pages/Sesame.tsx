// public/pages/Sesame.tsx
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

export default function Sesame() {
  return (
    <Card>
      <Title level={2}>Sésame ouvre-toi !</Title>
      <Paragraph>
        Une solution innovante pour la gestion des accès et des autorisations.
        Simplifiez la gestion des droits d'accès avec notre plateforme intuitive.
      </Paragraph>
    </Card>
  );
}