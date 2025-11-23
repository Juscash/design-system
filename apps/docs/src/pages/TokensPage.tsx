import { Typography, Card, Space, Row, Col, Tag, Divider } from 'antd';
import { designSystemColors, seedToken } from '@design-system/components';

const { Title, Paragraph, Text } = Typography;

function TokensPage() {
  return (
    <div>
      <Title level={2}>Design Tokens</Title>
      <Paragraph>
        Tokens de design disponíveis no sistema. Estes valores foram extraídos do Figma.
      </Paragraph>

      <Divider />

      {/* Cores do Design System */}
      <Card title="Cores do Design System" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" size="small">
              <Text strong>Primary</Text>
              {Object.entries(designSystemColors.primary).map(([key, value]) => (
                <div key={key}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: value,
                      borderRadius: 4,
                      border: '1px solid #d9d9d9',
                      display: 'inline-block',
                      marginRight: 8,
                    }}
                  />
                  <Text>
                    {key}: <Text code>{value}</Text>
                  </Text>
                </div>
              ))}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" size="small">
              <Text strong>Secondary</Text>
              {Object.entries(designSystemColors.secondary).map(([key, value]) => (
                <div key={key}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: value,
                      borderRadius: 4,
                      border: '1px solid #d9d9d9',
                      display: 'inline-block',
                      marginRight: 8,
                    }}
                  />
                  <Text>
                    {key}: <Text code>{value}</Text>
                  </Text>
                </div>
              ))}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" size="small">
              <Text strong>Neutral</Text>
              {Object.entries(designSystemColors.neutral).map(([key, value]) => (
                <div key={key}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: value,
                      borderRadius: 4,
                      border: '1px solid #d9d9d9',
                      display: 'inline-block',
                      marginRight: 8,
                    }}
                  />
                  <Text>
                    {key}: <Text code>{value}</Text>
                  </Text>
                </div>
              ))}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" size="small">
              <Text strong>Feedback</Text>
              {Object.entries(designSystemColors.feedback).map(([group, scale]) => (
                <div key={group}>
                  <Text strong style={{ textTransform: 'capitalize' }}>{group}</Text>
                  <div style={{ marginTop: 8 }}>
                    {Object.entries(scale).map(([key, value]) => (
                      <div key={`${group}-${key}`} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                        <div
                          style={{
                            width: 40,
                            height: 24,
                            backgroundColor: value,
                            borderRadius: 4,
                            border: '1px solid #d9d9d9',
                            display: 'inline-block',
                            marginRight: 8,
                          }}
                        />
                        <Text>
                          {key}: <Text code>{value}</Text>
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Seed Tokens */}
      <Card title="Seed Tokens (Valores Base)" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small">
              <Text strong>Cores Semânticas</Text>
              <div>
                <Tag color="primary">Primary: {seedToken.colorPrimary}</Tag>
              </div>
              <div>
                <Tag color="success">Success: {seedToken.colorSuccess}</Tag>
              </div>
              <div>
                <Tag color="warning">Warning: {seedToken.colorWarning}</Tag>
              </div>
              <div>
                <Tag color="error">Error: {seedToken.colorError}</Tag>
              </div>
              <div>
                <Tag color="info">Info: {seedToken.colorInfo}</Tag>
              </div>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small">
              <Text strong>Tipografia</Text>
              <div>
                <Text>Font Family: <Text code>{seedToken.fontFamily}</Text></Text>
              </div>
              <div>
                <Text>Font Size: <Text code>{seedToken.fontSize}px</Text></Text>
              </div>
              <div>
                <Text>Line Height: <Text code>{seedToken.lineHeight}</Text></Text>
              </div>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small">
              <Text strong>Espaçamento e Tamanhos</Text>
              <div>
                <Text>Size Unit: <Text code>{seedToken.sizeUnit}px</Text></Text>
              </div>
              <div>
                <Text>Size Step: <Text code>{seedToken.sizeStep}px</Text></Text>
              </div>
              <div>
                <Text>Border Radius: <Text code>{seedToken.borderRadius}px</Text></Text>
              </div>
              <div>
                <Text>Control Height: <Text code>{seedToken.controlHeight}px</Text></Text>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Exemplo de Uso */}
      <Card title="Exemplo de Uso" style={{ marginBottom: 24 }}>
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, overflow: 'auto' }}>
          <code>{`import { designSystemColors, seedToken } from '@design-system/components';

// Usar cores do design system
const primaryColor = designSystemColors.primary[500]; // #009c46
const secondaryColor = designSystemColors.secondary[700]; // #0d4897

// Usar seed tokens
const fontSize = seedToken.fontSize; // 16
const borderRadius = seedToken.borderRadius; // 4`}</code>
        </pre>
      </Card>
    </div>
  );
}

export default TokensPage;
