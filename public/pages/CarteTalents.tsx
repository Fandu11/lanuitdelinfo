// public/pages/CarteTalents.tsx
import { Typography, Card, List } from 'antd';
import { UserOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function CarteTalents() {
  const talents = [
    'Développement Frontend',
    'Design UI/UX',
    'Gestion de projet',
    'Développement Backend'
  ];

  return (
    <Card>
      <Title level={2}>La carte des talents</Title>
      <Paragraph>
        Découvrez les compétences de notre équipe et trouvez les experts dont vous avez besoin.
      </Paragraph>
      <List
        dataSource={talents}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<StarOutlined />}
              title={item}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}