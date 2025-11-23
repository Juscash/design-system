import { Card, Space, Typography as AntdTypography, Divider } from 'antd';
import { Typography as DSTypography, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body1, Body2, Caption } from '@design-system/components';

const { Title, Paragraph, Text } = AntdTypography;

function TypographyPage() {
  return (
    <div>
      <Title level={2}>Typography</Title>
      <Paragraph>
        O componente de tipografia estende o Ant Design para expor variantes alinhadas ao Design System.
      </Paragraph>

      <Card title="Headings" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Heading1>Heading 1</Heading1>
          <Heading2>Heading 2</Heading2>
          <Heading3>Heading 3</Heading3>
          <Heading4>Heading 4</Heading4>
          <Heading5>Heading 5</Heading5>
          <Heading6>Heading 6</Heading6>
        </Space>
      </Card>

      <Card title="Body" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Body1>
            Body 1 — texto padrão com 16px e line-height 1.5. Ideal para parágrafos.
          </Body1>
          <Body2>
            Body 2 — texto com 13px e line-height 1.4. Ideal para descrições e subtítulos.
          </Body2>
        </Space>
      </Card>

      <Card title="Caption" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Caption>Caption — 10px e line-height 1.3</Caption>
        </Space>
      </Card>

      <Card title="Cores" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <DSTypography variant="body1" color="primary">Texto primário</DSTypography>
          <DSTypography variant="body1" color="secondary">Texto secundário</DSTypography>
          <DSTypography variant="body1" color="neutral">Texto neutro</DSTypography>
          <DSTypography variant="body1" color="success">Sucesso</DSTypography>
          <DSTypography variant="body1" color="warning">Aviso</DSTypography>
          <DSTypography variant="body1" color="error">Erro</DSTypography>
        </Space>
      </Card>

      <Card title="Exemplo de Código" style={{ marginTop: 24 }}>
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, overflow: 'auto' }}>
{`import { Typography } from '@design-system/components';

<Typography variant="heading1">Heading 1</Typography>
<Typography variant="body1" color="primary">Texto primário</Typography>`}
        </pre>
      </Card>
    </div>
  );
}

export default TypographyPage;


