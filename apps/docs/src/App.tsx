import { Layout, Menu, Typography } from 'antd';
import { useState } from 'react';
import ComponentsPage from './pages/ComponentsPage';
import TokensPage from './pages/TokensPage';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [selectedKey, setSelectedKey] = useState('components');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title level={3} style={{ color: '#fff', margin: '16px 0' }}>
          Design System
        </Title>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={({ key }) => setSelectedKey(key)}
            items={[
              {
                key: 'components',
                label: 'Componentes',
              },
              {
                key: 'tokens',
                label: 'Design Tokens',
              },
              {
                key: 'guidelines',
                label: 'Diretrizes',
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {selectedKey === 'components' && <ComponentsPage />}
            {selectedKey === 'tokens' && <TokensPage />}
            {selectedKey === 'guidelines' && (
              <div>
                <Title level={2}>Diretrizes</Title>
                <p>Página de diretrizes será implementada após receber as regras do Figma.</p>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;

