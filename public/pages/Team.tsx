// src/pages/Team.jsx
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Team = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Notre Équipe</Title>
      <p>Contenu de la page équipe</p>
    </div>
  );
};

export default Team;