// src/components/Sidebar/Sidebar.tsx
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  ProjectOutlined, 
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    onCollapse(collapsed);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29,35,41,0.05)'
      }}
      width={250}
      collapsedWidth={80}
    >
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '16px',
        padding: '0 16px',
        position: 'relative'
      }}>
        {!collapsed && (
          <h2 style={{ 
            color: '#1890ff',
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Team Baobab
          </h2>
        )}
        <div 
          style={{
            position: 'absolute',
            right: 16,
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ borderRight: 0 }}
        onClick={({ key }) => {
          const routes: {[key: string]: string} = {
            '1': '/',
            '2': '/equipe',
            '3': '/projets',
            '4': '/parametres'
          };
          navigate(routes[key] || '/');
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Accueil
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          Équipe
        </Menu.Item>
        <Menu.Item key="3" icon={<ProjectOutlined />}>
          Projets
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Paramètres
        </Menu.Item>
      </Menu>
    </Sider>
  );
}