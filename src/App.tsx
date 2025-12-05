// src/App.tsx
import { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../public/components/Sidebar/Sidebar';
import './App.css';

const { Content } = Layout;

// Composants de page (à créer plus tard)
function Home() { return <div>Page d'accueil</div> }
function Team() { return <div>Équipe</div> }
function Projects() { return <div>Projets</div> }
function Settings() { return <div>Paramètres</div> }

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
            margin: '24px 16px', 
            padding: 24, 
            background: '#fff',
            borderRadius: 8
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/equipe" element={<Team />} />
              <Route path="/projets" element={<Projects />} />
              <Route path="/parametres" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;