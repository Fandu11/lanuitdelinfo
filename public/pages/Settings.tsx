// src/pages/Settings.jsx
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Settings = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Paramètres</Title>
      <p>Contenu de la page paramètres</p>
    </div>
  );
};

export default Settings;