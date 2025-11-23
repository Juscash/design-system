'use client';

import { Card, Space, Divider } from 'antd';
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
} from '@juscash/design-system';

export default function TypographyPage() {
  return (
    <div style={{ maxWidth: 1200 }}>
      <Heading1 style={{ marginBottom: 8 }}>Typography</Heading1>
      <Body1 style={{ marginBottom: 32, color: '#666' }}>
        Componente de tipografia com variantes de heading, body e caption baseado no Ant Design
      </Body1>

      <Card title="Variantes de Heading" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Heading 1</Caption>
            <Heading1>Heading 1 - Título Principal</Heading1>
          </div>
          <Divider />
          <div>
            <Caption>Heading 2</Caption>
            <Heading2>Heading 2 - Título Secundário</Heading2>
          </div>
          <Divider />
          <div>
            <Caption>Heading 3</Caption>
            <Heading3>Heading 3 - Subtítulo</Heading3>
          </div>
          <Divider />
          <div>
            <Caption>Heading 4</Caption>
            <Heading4>Heading 4 - Seção</Heading4>
          </div>
          <Divider />
          <div>
            <Caption>Heading 5</Caption>
            <Heading5>Heading 5 - Subseção</Heading5>
          </div>
          <Divider />
          <div>
            <Caption>Heading 6</Caption>
            <Heading6>Heading 6 - Menor Título</Heading6>
          </div>
        </Space>
      </Card>

      <Card title="Variantes de Body" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Body 1</Caption>
            <Body1>
              Body 1 - Texto padrão do corpo. Este é o tamanho padrão para textos longos e
              parágrafos. Use para conteúdo principal da aplicação.
            </Body1>
          </div>
          <Divider />
          <div>
            <Caption>Body 2</Caption>
            <Body2>
              Body 2 - Texto secundário. Use para informações complementares ou textos menores que
              precisam de menos destaque.
            </Body2>
          </div>
        </Space>
      </Card>

      <Card title="Caption" style={{ marginBottom: 24 }}>
        <div>
          <Caption>Caption - Texto de legenda ou informação auxiliar</Caption>
        </div>
      </Card>

      <Card title="Cores" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography variant="body1" color="primary">
            Cor Primary - Texto com cor primária
          </Typography>
          <Typography variant="body1" color="secondary">
            Cor Secondary - Texto com cor secundária
          </Typography>
          <Typography variant="body1" color="neutral">
            Cor Neutral - Texto com cor neutra
          </Typography>
          <Typography variant="body1" color="error">
            Cor Error - Texto com cor de erro
          </Typography>
          <Typography variant="body1" color="warning">
            Cor Warning - Texto com cor de aviso
          </Typography>
          <Typography variant="body1" color="success">
            Cor Success - Texto com cor de sucesso
          </Typography>
        </Space>
      </Card>

      <Card title="Props do Ant Design" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Copyable - Permite copiar o texto</Caption>
            <Body1 copyable>Texto que pode ser copiado</Body1>
          </div>
          <Divider />
          <div>
            <Caption>Ellipsis - Trunca texto longo</Caption>
            <Body1 ellipsis style={{ maxWidth: 300 }}>
              Texto muito longo que será truncado com ellipsis quando exceder o limite de largura
              definido
            </Body1>
          </div>
          <Divider />
          <div>
            <Caption>Editable - Permite editar o texto</Caption>
            <Body1 editable>Texto editável - clique para editar</Body1>
          </div>
        </Space>
      </Card>

      <Card title="Exemplo de Uso">
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 8,
            overflow: 'auto',
            fontSize: 13,
          }}
        >
          {`import { Heading1, Body1, Typography } from '@juscash/design-system';

// Usando componentes auxiliares
<Heading1 color="primary">Título Principal</Heading1>
<Body1>Texto do corpo</Body1>

// Usando componente principal com variant
<Typography variant="heading2" color="secondary">
  Título Secundário
</Typography>

// Com props do Ant Design
<Body1 copyable ellipsis>
  Texto copiável e truncado
</Body1>`}
        </pre>
      </Card>
    </div>
  );
}
