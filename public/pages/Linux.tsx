import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './Linux.css';

const { Title, Paragraph, Text } = Typography;

const LinuxPage: React.FC = () => {
  const distributions = [
    {
      name: 'PrimTux',
      description: 'Distribution éducative pour l\'école primaire',
      logo: '/images/primtux.png',
      features: [
        { name: 'Public cible', value: 'Élèves du primaire' },
        { name: 'Environnements', value: '4 environnements adaptés par niveau' },
        { name: 'Applications', value: 'Plus de 200 applications éducatives' },
        { name: 'Sécurité', value: 'Contrôle parental intégré' },
        { name: 'Ressources', value: 'Ressources pédagogiques incluses' },
      ],
      pros: [
        'Interface adaptée aux enfants',
        'Très léger',
        'Francophone',
        'Communauté active',
      ],
      cons: [
        'Limité au primaire',
        'Moins adapté pour un usage bureautique avancé',
      ]
    },
    {
      name: 'Linux NIRD',
      description: 'Distribution éducative pour le secondaire',
      logo: '/images/linux-nird.png',
      features: [
        { name: 'Public cible', value: 'Collégiens et lycéens' },
        { name: 'Environnements', value: 'Environnements adaptés aux programmes scolaires' },
        { name: 'Applications', value: 'Suite bureautique complète et outils avancés' },
        { name: 'Sécurité', value: 'Système de gestion des utilisateurs avancé' },
        { name: 'Ressources', value: 'Ressources pour l\'apprentissage des technologies' },
      ],
      pros: [
        'Adapté aux programmes du secondaire',
        'Outils bureautiques complets',
        'Environnement professionnel',
        'Bonne documentation',
      ],
      cons: [
        'Plus exigeant en ressources',
        'Moins adapté aux plus jeunes',
      ]
    }
  ];

  return (
    <div className="linux-page">
      <div className="hero-section">
        <Title level={1} className="title">Distributions Linux Éducatives</Title>
        <Paragraph className="subtitle">
          Comparez les solutions Linux adaptées à l'éducation
        </Paragraph>
      </div>

      <Divider>
        <Title level={2}>Comparaison des distributions</Title>
      </Divider>

      <Row gutter={[24, 24]} className="distribution-cards">
        {distributions.map((distro) => (
          <Col xs={24} md={12} key={distro.name}>
            <Card 
              title={
                <div className="distribution-header">
                  <img 
                    src={distro.logo} 
                    alt={`Logo ${distro.name}`} 
                    className="distribution-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div>
                    <Title level={3} style={{ margin: 0 }}>{distro.name}</Title>
                    <Text type="secondary">{distro.description}</Text>
                  </div>
                </div>
              }
              className="distribution-card"
            >
              <div className="features">
                {distro.features.map((feature, index) => (
                  <div key={index} className="feature">
                    <Text strong>{feature.name}: </Text>
                    <Text>{feature.value}</Text>
                  </div>
                ))}
              </div>
              
              <Divider>Points forts</Divider>
              <div className="pros-cons">
                {distro.pros.map((pro, index) => (
                  <div key={`pro-${index}`} className="pro">
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    {pro}
                  </div>
                ))}
              </div>

              <Divider>Limites</Divider>
              <div className="pros-cons">
                {distro.cons.map((con, index) => (
                  <div key={`con-${index}`} className="con">
                    <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                    {con}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider>Quelle distribution choisir ?</Divider>
      <Row justify="center" className="conclusion">
        <Col xs={24} md={18}>
          <Card>
            <Title level={3}>Notre recommandation</Title>
            <Paragraph>
              <ul>
                <li>
                  <Text strong>PrimTux</Text> est idéal pour les élèves du primaire grâce à son interface simplifiée 
                  et ses nombreuses applications éducatives adaptées aux plus jeunes.
                </li>
                <li>
                  <Text strong>Linux NIRD</Text> est plus adapté aux collégiens et lycéens avec des outils plus complets 
                  pour les programmes du secondaire et une approche plus professionnelle.
                </li>
              </ul>
            </Paragraph>
            <Paragraph>
              Les deux distributions sont d'excellents choix pour l'éducation, avec une communauté active et un support en français.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LinuxPage;