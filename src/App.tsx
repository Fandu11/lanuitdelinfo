// src/App.tsx
import { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../public/components/Sidebar/Sidebar';
// Import des composants de page
import Home from '../public/pages/Home';
import Ergonomie from '../public/pages/Ergonomie';
import CarteTalents from '../public/pages/CarteTalents';
import LigueExtensions from '../public/pages/LigueExtensions';
import Quiz from '../public/pages/Quiz';
import Demarche from '../public/pages/Demarche';
import LinuxPage from '../public/pages/Linux';
import Pourquoi from '../public/pages/Pourquoi';
import './App.css';
import Snake from '../public/pages/Snake';


function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar onCollapse={setSidebarCollapsed} />
        <Layout style={{ 
          marginLeft: sidebarCollapsed ? 80 : 250, 
          minHeight: '100vh',
          transition: 'margin-left 0.2s',
          width: 'auto',
          overflow: 'hidden'
        }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ergonomie" element={<Ergonomie />} />
              <Route path="/carte-talents" element={<CarteTalents />} />
              <Route path="/ligue-extensions" element={<LigueExtensions />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/sesame" element={<Snake />} />
              {/* Nouvelles routes pour les boutons du menu principal */}
              <Route path="/demarche" element={<Demarche />} />
              <Route path="/pourquoi" element={<Pourquoi />} />
              <Route path="/linux" element={<LinuxPage />} />
            </Routes>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;