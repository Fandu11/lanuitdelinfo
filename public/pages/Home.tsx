// public/pages/Home.tsx
import { Typography, Card, Row, Col, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Ergonomie',
      description: 'Simplifiez pour mieux vivre',
      path: '/ergonomie'
    },
    {
      title: 'Sésame',
      description: 'La solution tout-en-un',
      path: '/sesame'
    },
    {
      title: 'Talents',
      description: 'Découvrez nos experts',
      path: '/carte-talents'
    },
    {
      title: 'Extensions',
      description: 'Écosystème en croissance',
      path: '/ligue-extensions'
    }
  ];

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <Title level={2}>Bienvenue sur Team Baobab</Title>
        <Paragraph>
          Découvrez nos solutions innovantes pour améliorer votre productivité
          et simplifier votre quotidien.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              onClick={() => navigate(feature.path)}
              style={{ height: '100%' }}
            >
              <Card.Meta
                avatar={<RocketOutlined style={{ fontSize: '24px' }} />}
                title={feature.title}
                description={feature.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}