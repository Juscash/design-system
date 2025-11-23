'use client';

import { Card, Space, Divider } from 'antd';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@juscash/design-system';
import { Heading1, Body1, Caption } from '@juscash/design-system';

export default function ButtonPage() {
  const usage = `import { Button } from '@juscash/design-system';

// Tipos básicos (Ant Design)
<Button type="primary">Primary</Button>
<Button type="default">Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="link">Link</Button>
<Button type="text">Text</Button>

// Variantes do Design System
<Button type="secondary">Secondary</Button>
<Button type="ghost">Ghost</Button>
<Button type="destructive">Destructive</Button>
<Button type="outlined">Outlined</Button>

// Tamanhos do Design System (xs, s, m)
<Button type="primary" dsSize="xs">XS</Button>
<Button type="primary" dsSize="s">S</Button>
<Button type="primary" dsSize="m">M</Button>

// Estados
<Button loading type="primary">Carregando</Button>
<Button type="secondary" disabled>Secondary disabled</Button>
<Button type="destructive" disabled>Destructive disabled</Button>`;

  return (
    <div style={{ maxWidth: 1200 }}>
      <Heading1 style={{ marginBottom: 8 }}>Button</Heading1>
      <Body1 style={{ marginBottom: 32, color: '#666' }}>
        Botões baseados no Ant Design, incluindo a variante secundária do Design System.
      </Body1>

      <Card title="Todos os tipos" style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="neutral">Neutral</Button>
          <Button type="outlined">Outlined</Button>
          <Button type="ghost">Ghost</Button>
          <Button type="destructive">Destructive</Button>
          <Button type="default">Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="link">Link</Button>
          <Button type="text">Text</Button>
        </Space>
      </Card>

      <Card title="Destructive" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="destructive" dsSize="m">
                  Destructive
                </Button>
                <Button type="destructive" dsSize="m" disabled>
                  Destructive disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="destructive" dsSize="xs">
                  XS
                </Button>
                <Button type="destructive" dsSize="s">
                  S
                </Button>
                <Button type="destructive" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Primary" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="primary" dsSize="m">
                  Primary
                </Button>
                <Button type="primary" dsSize="m" disabled>
                  Primary disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="primary" dsSize="xs">
                  XS
                </Button>
                <Button type="primary" dsSize="s">
                  S
                </Button>
                <Button type="primary" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Ghost" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="ghost">Ghost</Button>
                <Button type="ghost" disabled>
                  Ghost disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="ghost" dsSize="xs">
                  XS
                </Button>
                <Button type="ghost" dsSize="s">
                  S
                </Button>
                <Button type="ghost" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Com ícones e largura" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Ícone à esquerda</Caption>
            <div style={{ marginTop: 8 }}>
              <Space wrap>
                <Button type="primary" icon={<Plus size={16} />}>
                  Adicionar
                </Button>
                <Button type="secondary" icon={<Pencil size={16} />}>
                  Editar
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Ícone somente</Caption>
            <div style={{ marginTop: 8 }}>
              <Space wrap>
                <Button type="primary" shape="circle" icon={<Plus size={16} />} />
                <Button type="secondary" shape="circle" icon={<Pencil size={16} />} />
                <Button type="ghost" shape="circle" icon={<Plus size={16} />} />
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Bloco (full width)</Caption>
            <div style={{ marginTop: 8 }}>
              <Button type="primary" block>
                Continuar
              </Button>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Tipos básicos" style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Button type="primary">Primary</Button>
          <Button type="neutral">Neutral</Button>
          <Button type="outlined">Outlined</Button>
          <Button type="default">Default</Button>
          <Button>Default (implícito)</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="link">Link</Button>
          <Button type="text">Text</Button>
        </Space>
      </Card>

      <Card title="Outlined" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="outlined" dsSize="m">
                  Outlined
                </Button>
                <Button type="outlined" dsSize="m" disabled>
                  Outlined disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="outlined" dsSize="xs">
                  XS
                </Button>
                <Button type="outlined" dsSize="s">
                  S
                </Button>
                <Button type="outlined" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Neutral" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="neutral" dsSize="m">
                  Neutral
                </Button>
                <Button type="neutral" dsSize="m" disabled>
                  Neutral disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="neutral" dsSize="xs">
                  XS
                </Button>
                <Button type="neutral" dsSize="s">
                  S
                </Button>
                <Button type="neutral" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Secondary" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="secondary" dsSize="m">
                  Secondary
                </Button>
                <Button type="secondary" dsSize="m" disabled>
                  Secondary disabled
                </Button>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Tamanhos</Caption>
            <div style={{ marginTop: 8 }}>
              <Space>
                <Button type="secondary" dsSize="xs">
                  XS
                </Button>
                <Button type="secondary" dsSize="s">
                  S
                </Button>
                <Button type="secondary" dsSize="m">
                  M
                </Button>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Estados">
        <Space wrap size="middle">
          <Button loading type="primary">
            Carregando
          </Button>
          <Button type="destructive">Danger</Button>
          <Button type="destructive" dsSize="m">
            Danger Default
          </Button>
          <Button type="ghost">Ghost</Button>
        </Space>
      </Card>

      <Card title="Exemplo de Uso" style={{ marginBottom: 24 }}>
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 8,
            overflow: 'auto',
            fontSize: 13,
          }}
        >
          {usage}
        </pre>
      </Card>
    </div>
  );
}
