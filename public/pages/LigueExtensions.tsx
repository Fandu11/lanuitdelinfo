// public/pages/LigueExtensions.tsx
import { Typography, Card, Row, Col, Statistic } from 'antd';
import { RiseOutlined, TeamOutlined, CodeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function LigueExtensions() {
  return (
    <Card>
      <Title level={2}>La ligue des extensions</Title>
      <Paragraph>
        Rejoignez notre communauté de développeurs et contribuez à l'écosystème.
      </Paragraph>
      
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Extensions actives"
              value={12}
              prefix={<CodeOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Contributeurs"
              value={24}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Croissance mensuelle"
              value={15.3}
              precision={1}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}