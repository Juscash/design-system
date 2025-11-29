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
  const usage = `import { Heading1, Body1, Typography } from '@juscash/design-system';

// Usando componentes auxiliares
<Heading1 color="primary">Título Principal</Heading1>
<Body1>Texto do corpo</Body1>
<Caption>Legenda</Caption>

// Usando componente principal com variant
<Typography variant="heading2" color="secondary">
  Título Secundário
</Typography>
<Typography variant="body2">Texto secundário</Typography>

// Com props do Ant Design
<Body1 copyable ellipsis>
  Texto copiável e truncado
</Body1>`;

  return (
    <div style={{ maxWidth: 1200 }}>
      <Heading1 style={{ marginBottom: 8 }}>Typography</Heading1>
      <Body1 style={{ marginBottom: 32, color: '#666' }}>
        Componente de tipografia com variantes de heading, body e caption baseado no Ant Design.
        Fonte Inter com tamanhos em rem conforme design system.
      </Body1>

      <Card title="Todos os variants" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Heading1>Heading 1 - Título Principal (61px / 3.813rem)</Heading1>
          <Heading2>Heading 2 - Título Secundário (49px / 3.063rem)</Heading2>
          <Heading3>Heading 3 - Subtítulo (39px / 2.438rem)</Heading3>
          <Heading4>Heading 4 - Seção (31px / 1.938rem)</Heading4>
          <Heading5>Heading 5 - Subseção (25px / 1.563rem)</Heading5>
          <Heading6>Heading 6 - Menor Título (20px / 1.25rem)</Heading6>
          <Body1>
            Body 1 - Texto padrão do corpo (16px / 1rem). Este é o tamanho padrão para textos longos
            e parágrafos. Use para conteúdo principal da aplicação.
          </Body1>
          <Body2>
            Body 2 - Texto secundário (13px / 0.813rem). Use para informações complementares ou
            textos menores que precisam de menos destaque.
          </Body2>
          <Caption>Caption - Texto de legenda ou informação auxiliar (10px / 0.625rem)</Caption>
        </Space>
      </Card>

      <Card title="Heading 1" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading1>Heading 1 - Título Principal</Heading1>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading1 color="primary">Heading 1 Primary</Heading1>
                <Heading1 color="secondary">Heading 1 Secondary</Heading1>
                <Heading1 color="error">Heading 1 Error</Heading1>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Heading 2" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading2>Heading 2 - Título Secundário</Heading2>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading2 color="primary">Heading 2 Primary</Heading2>
                <Heading2 color="secondary">Heading 2 Secondary</Heading2>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Heading 3" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading3>Heading 3 - Subtítulo</Heading3>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading3 color="primary">Heading 3 Primary</Heading3>
                <Heading3 color="neutral">Heading 3 Neutral</Heading3>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Heading 4" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading4>Heading 4 - Seção</Heading4>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading4 color="primary">Heading 4 Primary</Heading4>
                <Heading4 color="secondary">Heading 4 Secondary</Heading4>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Heading 5" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading5>Heading 5 - Subseção</Heading5>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading5 color="primary">Heading 5 Primary</Heading5>
                <Heading5 color="neutral">Heading 5 Neutral</Heading5>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Heading 6" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Heading6>Heading 6 - Menor Título</Heading6>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Heading6 color="primary">Heading 6 Primary</Heading6>
                <Heading6 color="secondary">Heading 6 Secondary</Heading6>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Body 1" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Body1>
                Body 1 - Texto padrão do corpo. Este é o tamanho padrão para textos longos e
                parágrafos. Use para conteúdo principal da aplicação.
              </Body1>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Body1 color="primary">Body 1 Primary - Texto com cor primária</Body1>
                <Body1 color="secondary">Body 1 Secondary - Texto com cor secundária</Body1>
                <Body1 color="error">Body 1 Error - Texto com cor de erro</Body1>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Body 2" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Body2>
                Body 2 - Texto secundário. Use para informações complementares ou textos menores que
                precisam de menos destaque.
              </Body2>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Body2 color="primary">Body 2 Primary - Texto com cor primária</Body2>
                <Body2 color="neutral">Body 2 Neutral - Texto com cor neutra</Body2>
                <Body2 color="warning">Body 2 Warning - Texto com cor de aviso</Body2>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Caption" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Normal</Caption>
            <div style={{ marginTop: 8 }}>
              <Caption>Caption - Texto de legenda ou informação auxiliar</Caption>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Caption color="primary">Caption Primary - Texto com cor primária</Caption>
                <Caption color="secondary">Caption Secondary - Texto com cor secundária</Caption>
                <Caption color="success">Caption Success - Texto com cor de sucesso</Caption>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Tamanhos" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Especificações dos tamanhos conforme Figma</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Body2>Heading 1: 61px (3.813rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Heading 2: 49px (3.063rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Heading 3: 39px (2.438rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Heading 4: 31px (1.938rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Heading 5: 25px (1.563rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Heading 6: 20px (1.25rem) - Line height: 1.2</Body2>
                </div>
                <div>
                  <Body2>Body 1: 16px (1rem) - Line height: 1.5</Body2>
                </div>
                <div>
                  <Body2>Body 2: 13px (0.813rem) - Line height: 1.4</Body2>
                </div>
                <div>
                  <Body2>Caption: 10px (0.625rem) - Line height: 1.3</Body2>
                </div>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Cores" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Body 1 com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography variant="body1" color="primary">
                  Primary - Texto com cor primária
                </Typography>
                <Typography variant="body1" color="secondary">
                  Secondary - Texto com cor secundária
                </Typography>
                <Typography variant="body1" color="neutral">
                  Neutral - Texto com cor neutra
                </Typography>
                <Typography variant="body1" color="error">
                  Error - Texto com cor de erro
                </Typography>
                <Typography variant="body1" color="warning">
                  Warning - Texto com cor de aviso
                </Typography>
                <Typography variant="body1" color="success">
                  Success - Texto com cor de sucesso
                </Typography>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Headings com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Heading2 color="primary">Heading 2 Primary</Heading2>
                <Heading3 color="secondary">Heading 3 Secondary</Heading3>
                <Heading4 color="error">Heading 4 Error</Heading4>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Body 2 e Caption com cores</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Body2 color="primary">Body 2 Primary</Body2>
                <Caption color="secondary">Caption Secondary</Caption>
                <Caption color="warning">Caption Warning</Caption>
              </Space>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Props do Ant Design" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Caption>Copyable - Permite copiar o texto</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Body1 copyable>Texto que pode ser copiado - Body 1</Body1>
                <Body2 copyable>Texto que pode ser copiado - Body 2</Body2>
                <Heading3 copyable>Texto que pode ser copiado - Heading 3</Heading3>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Ellipsis - Trunca texto longo</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Body1 ellipsis style={{ maxWidth: 300 }}>
                  Texto muito longo que será truncado com ellipsis quando exceder o limite de
                  largura definido
                </Body1>
                <Body2 ellipsis style={{ maxWidth: 250 }}>
                  Body 2 com ellipsis - Texto muito longo que será truncado
                </Body2>
                <Heading4 ellipsis style={{ maxWidth: 200 }}>
                  Heading 4 com ellipsis - Texto muito longo
                </Heading4>
              </Space>
            </div>
          </div>
          <Divider />
          <div>
            <Caption>Editable - Permite editar o texto</Caption>
            <div style={{ marginTop: 8 }}>
              <Space direction="vertical" size="small">
                <Body1 editable>Texto editável - Body 1 - clique para editar</Body1>
                <Body2 editable>Texto editável - Body 2 - clique para editar</Body2>
                <Heading5 editable>Texto editável - Heading 5 - clique para editar</Heading5>
              </Space>
            </div>
          </div>
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
