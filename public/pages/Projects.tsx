// src/pages/Projects.jsx
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Projects = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Nos Projets</Title>
      <p>Contenu de la page projets</p>
    </div>
  );
};

export default Projects;