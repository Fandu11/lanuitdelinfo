// src/App.tsx
import { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../public/components/Sidebar/Sidebar';

import Ergonomie from '../public/pages/Ergonomie';
import Sesame from '../public/pages/Sesame';
import CarteTalents from '../public/pages/CarteTalents';
import LigueExtensions from '../public/pages/LigueExtensions';
import Quiz from '../public/pages/Quiz';

import './App.css';

const { Content } = Layout;

// Composant de page pour la page d'accueil
function Home() { return <div>Page d'accueil</div> }

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Sidebar onCollapse={setSidebarCollapsed} />
        <Layout style={{ 
          flex: 1,
          marginLeft: sidebarCollapsed ? 80 : 250, 
          minHeight: '100vh',
          transition: 'margin-left 0.2s ease',
          backgroundColor: '#f0f2f5',
          overflow: 'auto'
        }}>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
            minHeight: 'calc(100vh - 80px)'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ergonomie" element={<Ergonomie />} />
              <Route path="/sesame" element={<Sesame />} />
              <Route path="/carte-talents" element={<CarteTalents />} />
              <Route path="/ligue-extensions" element={<LigueExtensions />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;