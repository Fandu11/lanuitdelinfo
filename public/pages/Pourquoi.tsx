import React from 'react';
import { Card, Typography, List, Divider, Space, Button } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, EnvironmentOutlined, TeamOutlined, RocketOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Pourquoi.css';

const { Title, Paragraph, Text } = Typography;

// Composant d'animation de section
interface SectionProps {
  children: React.ReactNode;
  delay?: number;
}

interface AnimatedCardProps {
  title: string;
  icon: React.ReactElement;
  description: string;
  delay: number;
}

const Section: React.FC<SectionProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

// Composant de carte animée
const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, icon, description, delay }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
  >
    <Card className="avantage-card" hoverable>
      <div className="avantage-icon">
        {React.cloneElement(icon, { style: { fontSize: '32px' } })}
      </div>
      <Title level={4} className="avantage-title">{title}</Title>
      <Paragraph className="avantage-description">{description}</Paragraph>
      <div className="avantage-arrow">
        <ArrowRightOutlined />
      </div>
    </Card>
  </motion.div>
);

const Pourquoi: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const avantages = [
    {
      title: 'Écologique',
      icon: <EnvironmentOutlined />,
      description: 'Prolongement de la durée de vie du matériel informatique et réduction des déchets électroniques.'
    },
    {
      title: 'Économique',
      icon: <CheckCircleOutlined />,
      description: 'Économies substantielles sur les coûts de licence et d\'équipement.'
    },
    {
      title: 'Pédagogique',
      icon: <TeamOutlined />,
      description: 'Apprentissage du numérique libre et responsable dès le plus jeune âge.'
    },
    {
      title: 'Souveraineté',
      icon: <RocketOutlined />,
      description: 'Indépendance technologique et maîtrise de nos outils numériques.'
    }
  ];

  const references = [
    {
      source: 'Ministère de l\'Éducation Nationale',
      citation: 'Les services d\'infrastructures numériques choisis pour les écoles et établissements permettent d\'intégrer des machines utilisant les différents systèmes d\'exploitation.',
      annee: '2025'
    },
    {
      source: 'ADEME',
      citation: 'Les logiciels open source ont de nombreuses vertus notamment en raison du contrôle que peuvent avoir les utilisateurs sur le logiciel.',
      annee: '2025'
    },
    {
      source: 'Commission Européenne',
      citation: 'Promouvoir l\'utilisation de solutions open source, à contenu ouvert ou à données ouvertes.',
      annee: '2023'
    }
  ];

  return (
    <div className="pourquoi-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Title level={1} className="hero-title">
              Pourquoi choisir la démarche NIRD ?
            </Title>
            <Paragraph className="hero-subtitle">
              Parce que c'est le bon moment. Ou pour le dire de manière plus alarmiste :<br />
              <span className="highlight-text">parce que c'est maintenant ou jamais !</span>
            </Paragraph>
          </motion.div>
          <motion.div 
            className="hero-illustration"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="tech-circle" />
            <div className="tech-grid" />
          </motion.div>
        </div>
      </motion.div>

      <div className="content-wrapper">
        <Section>
          <div className="section">
            <Title level={2} className="section-title">
              <span className="section-number">01</span>
              Une conjoncture (enfin) favorable
            </Title>
            <Paragraph className="section-intro">
              Plusieurs facteurs rendent la démarche NIRD particulièrement pertinente aujourd'hui :
            </Paragraph>
            
            <List
              className="advantages-list"
              itemLayout="horizontal"
              dataSource={[
                "La fin du support de Windows 10 rendant artificiellement obsolètes des milliers de machines du secteur public.",
                "La souveraineté numérique est plus que jamais dans l'agenda politique.",
                "La convergence entre les objectifs de transformation numérique et de transition écologique.",
                "De plus en plus de collectivités s'orientent vers les logiciels libres et les communs numériques.",
                "Linux a beaucoup progressé en qualité et ergonomie ces dernières années."
              ]}
              renderItem={(item, index) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <List.Item className="list-item">
                    <div className="list-marker">
                      <CheckCircleOutlined />
                    </div>
                    <Text>{item}</Text>
                  </List.Item>
                </motion.div>
              )}
            />
          </div>
        </Section>

        <Divider className="custom-divider" />

        <Section delay={0.2}>
          <div className="section">
            <Title level={2} className="section-title">
              <span className="section-number">02</span>
              Les avantages de la démarche NIRD
            </Title>
            <div className="avantages-grid">
              {avantages.map((avantage, index) => (
                <AnimatedCard
                  key={index}
                  title={avantage.title}
                  icon={avantage.icon}
                  description={avantage.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section delay={0.4}>
          <div className="section temoignage">
            <Title level={2} className="section-title">
              <span className="section-number">03</span>
              Ils nous font confiance
            </Title>
            <motion.div 
              className="references"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { 
                  transition: { 
                    staggerChildren: 0.1 
                  } 
                }
              }}
            >
              {references.map((ref, index) => (
                <motion.div
                  key={index}
                  className="reference-card"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: { duration: 0.5 }
                    }
                  }}
                >
                  <blockquote>
                    <Paragraph className="citation">"{ref.citation}"</Paragraph>
                    <footer>
                      <Text strong>{ref.source}</Text> - {ref.annee}
                    </footer>
                  </blockquote>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        <Section delay={0.6}>
          <div className="cta-section">
            <div className="cta-content">
              <Title level={3} className="cta-title">
                Prêt à rejoindre la <span className="highlight">démarche NIRD</span> ?
              </Title>
              <Paragraph className="cta-subtitle">
                Rejoignez les établissements qui ont déjà fait le choix d'un numérique plus inclusif, responsable et durable.
              </Paragraph>
            </div>
            <div className="cta-illustration">
              <div className="tech-dots" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Pourquoi;