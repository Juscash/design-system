import { Typography, Card, Space, Divider } from 'antd';
import { Button } from '@design-system/components';
import { SaveOutlined, DeleteOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function ButtonPage() {
  return (
    <div>
      <Title level={2}>Button</Title>
      <Paragraph>
        O componente Button é uma extensão do Ant Design Button com tipos customizados do design system.
      </Paragraph>

      {/* Tipos de Botões */}
      <Card title="Tipos de Botões" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Tipos Padrão do Ant Design:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary">Primary</Button>
              <Button type="default">Default</Button>
              <Button type="link">Link</Button>
              <Button type="text">Text</Button>
            </Space>
          </div>

          <Divider />

          <div>
            <Text strong>Tipos Customizados do Design System:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="secondary">Secondary</Button>
              <Button type="neutral">Neutral</Button>
              <Button type="outline">Outline</Button>
              <Button type="ghost">Ghost</Button>
              <Button type="destructive">Destructive</Button>
            </Space>
          </div>
        </Space>
      </Card>

      {/* Tamanhos */}
      <Card title="Tamanhos" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Primary:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary" size="large">
                Large
              </Button>
              <Button type="primary" size="middle">
                Middle
              </Button>
              <Button type="primary" size="small">
                Small
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Secondary:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="secondary" size="large">
                Large
              </Button>
              <Button type="secondary" size="middle">
                Middle
              </Button>
              <Button type="secondary" size="small">
                Small
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Neutral:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="neutral" size="large">
                Large
              </Button>
              <Button type="neutral" size="middle">
                Middle
              </Button>
              <Button type="neutral" size="small">
                Small
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      {/* Estados */}
      <Card title="Estados" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Default:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary">Default</Button>
              <Button type="secondary">Default</Button>
              <Button type="neutral">Default</Button>
            </Space>
          </div>

          <div>
            <Text strong>Loading:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary" loading>
                Loading
              </Button>
              <Button type="secondary" loading>
                Loading
              </Button>
              <Button type="neutral" loading>
                Loading
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Disabled:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary" disabled>
                Disabled
              </Button>
              <Button type="secondary" disabled>
                Disabled
              </Button>
              <Button type="neutral" disabled>
                Disabled
              </Button>
              <Button type="outline" disabled>
                Disabled
              </Button>
              <Button type="ghost" disabled>
                Disabled
              </Button>
              <Button type="destructive" disabled>
                Disabled
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      {/* Botões com Ícones */}
      <Card title="Botões com Ícones" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Com Ícone:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary" icon={<SaveOutlined />}>
                Salvar
              </Button>
              <Button type="secondary" icon={<DownloadOutlined />}>
                Download
              </Button>
              <Button type="destructive" icon={<DeleteOutlined />}>
                Excluir
              </Button>
              <Button type="neutral" icon={<SearchOutlined />}>
                Buscar
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Apenas Ícone:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary" icon={<SaveOutlined />} />
              <Button type="secondary" icon={<DownloadOutlined />} />
              <Button type="destructive" icon={<DeleteOutlined />} />
              <Button type="neutral" icon={<SearchOutlined />} />
            </Space>
          </div>
        </Space>
      </Card>

      {/* Todos os Tipos em Grid */}
      <Card title="Todos os Tipos" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Primary:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="primary">Primary</Button>
              <Button type="primary" loading>
                Loading
              </Button>
              <Button type="primary" disabled>
                Disabled
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Secondary:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="secondary">Secondary</Button>
              <Button type="secondary" loading>
                Loading
              </Button>
              <Button type="secondary" disabled>
                Disabled
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Neutral:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="neutral">Neutral</Button>
              <Button type="neutral" loading>
                Loading
              </Button>
              <Button type="neutral" disabled>
                Disabled
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Outline:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="outline">Outline</Button>
              <Button type="outline" loading>
                Loading
              </Button>
              <Button type="outline" disabled>
                Disabled
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Ghost:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="ghost">Ghost</Button>
              <Button type="ghost" loading>
                Loading
              </Button>
              <Button type="ghost" disabled>
                Disabled
              </Button>
            </Space>
          </div>

          <div>
            <Text strong>Destructive:</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Button type="destructive">Destructive</Button>
              <Button type="destructive" loading>
                Loading
              </Button>
              <Button type="destructive" disabled>
                Disabled
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      {/* Código de Exemplo */}
      <Card title="Exemplo de Código" style={{ marginTop: 24 }}>
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, overflow: 'auto' }}>
          <code>{`import { Button } from '@design-system/components';

// Tipos padrão
<Button type="primary">Primary</Button>
<Button type="default">Default</Button>

// Tipos customizados
<Button type="secondary">Secondary</Button>
<Button type="neutral">Neutral</Button>
<Button type="outline">Outline</Button>
<Button type="ghost">Ghost</Button>
<Button type="destructive">Destructive</Button>

// Com ícones
<Button type="primary" icon={<SaveOutlined />}>
  Salvar
</Button>

// Estados
<Button type="primary" loading>Loading</Button>
<Button type="primary" disabled>Disabled</Button>

// Tamanhos
<Button type="primary" size="large">Large</Button>
<Button type="primary" size="middle">Middle</Button>
<Button type="primary" size="small">Small</Button>`}</code>
        </pre>
      </Card>
    </div>
  );
}

export default ButtonPage;

