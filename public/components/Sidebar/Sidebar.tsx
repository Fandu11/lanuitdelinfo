// src/components/Sidebar/Sidebar.tsx
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  ProjectOutlined, 
  RocketOutlined, // J'ai ajouté Rocket et Bulb pour correspondre aux items
  BulbOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const { Sider } = Layout;

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void; // J'ai mis optionnel au cas où
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Logique pour garder le bouton allumé correctement
  const pathToKey: { [key: string]: string } = {
    '/': '1',
    '/sesame': '2',
    '/carte-talents': '3',
    '/ligue-extensions': '4',
    '/quiz': '5',
  };
  const currentKey = pathToKey[location.pathname] || '1';

  return (
    <Sider
      collapsible
      onCollapse={onCollapse}
      width={200}
      className="sidebar-glass" /* <--- La classe magique */
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'transparent', /* <--- CRUCIAL : Transparent, pas blanc ! */
        borderRight: 'none'
      }}
      trigger={null} /* On cache le trigger par défaut pour le design épuré */
    >
      {/* Logo avec effet brillant */}
      <div className="logo-container">
        <h2 className="brand-text">
          Team Baobab
        </h2>
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[currentKey]}
        className="custom-menu"
        style={{ background: 'transparent', borderRight: 0 }}
        onClick={({ key }) => {
          const routes: { [key: string]: string } = {
            '1': '/',
            '2': '/sesame',
            '3': '/carte-talents',
            '4': '/ligue-extensions',
            '5': '/quiz',
          };
          navigate(routes[key] || '/');
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Accueil
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          Sesame
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          Carte Talents
        </Menu.Item>
        <Menu.Item key="4" icon={<RocketOutlined />}>
          Ligue Extensions
        </Menu.Item>
        <Menu.Item key="5" icon={<BulbOutlined />}>
          Quiz
        </Menu.Item>
      </Menu>
    </Sider>
  );
}