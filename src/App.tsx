// src/App.tsx
import { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../public/components/Sidebar/Sidebar';
// Import des composants de page
import Home from '../public/pages/Home';
import Ergonomie from '../public/pages/Ergonomie';
import Sesame from '../public/pages/Sesame';
import CarteTalents from '../public/pages/CarteTalents';
import LigueExtensions from '../public/pages/LigueExtensions';
import './App.css';

const { Content } = Layout;

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar onCollapse={setSidebarCollapsed} />
        <Layout style={{ 
          marginLeft: sidebarCollapsed ? 80 : 250, 
          minHeight: '100vh',
          transition: 'margin-left 0.2s'
        }}>
          <Content style={{ 
          margin: '0', 
          padding: '24px', 
          background: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ergonomie" element={<Ergonomie />} />
              <Route path="/sesame" element={<Sesame />} />
              <Route path="/carte-talents" element={<CarteTalents />} />
              <Route path="/ligue-extensions" element={<LigueExtensions />} />
              {/* Nouvelles routes pour les boutons du menu principal */}
              <Route path="/demarche" element={<div>Page Démarche</div>} />
              <Route path="/pourquoi" element={<div>Page Pourquoi</div>} />
              <Route path="/linux" element={<div>Page Linux</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;