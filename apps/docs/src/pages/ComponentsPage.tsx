import { Typography, Card, Menu } from 'antd';
import { useState } from 'react';
import ButtonPage from './ButtonPage';
import TypographyPage from './TypographyPage';

const { Title, Paragraph } = Typography;

function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState('button');

  const components = [
    {
      key: 'button',
      label: 'Button',
    },
    {
      key: 'typography',
      label: 'Typography',
    },
  ];

  return (
    <div>
      <Title level={2}>Componentes</Title>
      <Paragraph>
        Esta página lista todos os componentes disponíveis na biblioteca. Quando novos componentes
        forem criados, eles aparecerão automaticamente aqui.
      </Paragraph>

      <div style={{ marginTop: 24, display: 'flex', gap: 24 }}>
        <div style={{ width: 200 }}>
          <Card title="Componentes" style={{ position: 'sticky', top: 24 }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedComponent]}
              style={{ border: 'none' }}
              items={components}
              onSelect={({ key }) => setSelectedComponent(key)}
            />
          </Card>
        </div>

        <div style={{ flex: 1 }}>
          {selectedComponent === 'button' && <ButtonPage />}
          {selectedComponent === 'typography' && <TypographyPage />}
        </div>
      </div>
    </div>
  );
}

export default ComponentsPage;

