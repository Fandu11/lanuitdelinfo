import React from 'react';
import { Card, Row, Col, Typography, Avatar, Space } from 'antd';
import { UserOutlined, StarFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Données de démonstration pour les talents
const talents = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Développeur Full Stack',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    experience: '5 ans',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Marie Martin',
    role: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'UX Research'],
    experience: '3 ans',
    email: 'marie.martin@example.com',
    phone: '06 23 45 67 89',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Thomas Leroy',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    experience: '4 ans',
    email: 'thomas.leroy@example.com',
    phone: '06 34 56 78 90',
    rating: 4.7,
  },
];

const CarteTalents: React.FC = () => {
  return (
    <div className="carte-talents">
      <Title level={2} style={{ marginBottom: 24 }}>Carte des Talents</Title>
      
      <Row gutter={[16, 16]}>
        {talents.map((talent) => (
          <Col xs={24} sm={12} lg={8} key={talent.id}>
            <Card 
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title={talent.name}
                description={
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Text strong>{talent.role}</Text>
                    <div>
                      <Text type="secondary">Expérience: </Text>
                      <Text>{talent.experience}</Text>
                    </div>
                    <div>
                      <Text type="secondary">Compétences: </Text>
                      <div style={{ marginTop: 8 }}>
                        {talent.skills.map((skill, index) => (
                          <span key={index} style={{
                            display: 'inline-block',
                            backgroundColor: '#f0f2f5',
                            borderRadius: 4,
                            padding: '2px 8px',
                            margin: '0 4px 4px 0',
                            fontSize: 12,
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Space>
                        <StarFilled style={{ color: '#faad14' }} />
                        <Text>{talent.rating}/5</Text>
                      </Space>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Space direction="vertical" size="small">
                        <div>
                          <MailOutlined style={{ marginRight: 8 }} />
                          <Text type="secondary">{talent.email}</Text>
                        </div>
                        <div>
                          <PhoneOutlined style={{ marginRight: 8 }} />
                          <Text type="secondary">{talent.phone}</Text>
                        </div>
                      </Space>
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CarteTalents;