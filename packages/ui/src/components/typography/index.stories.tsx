import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body1, Body2, Caption } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Texto padrão',
    variant: 'body1',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Heading1>Heading 1 - Título Principal</Heading1>
      <Heading2>Heading 2 - Título Secundário</Heading2>
      <Heading3>Heading 3 - Subtítulo</Heading3>
      <Heading4>Heading 4 - Seção</Heading4>
      <Heading5>Heading 5 - Subseção</Heading5>
      <Heading6>Heading 6 - Menor Título</Heading6>
      <Body1>Body 1 - Texto padrão do corpo</Body1>
      <Body2>Body 2 - Texto secundário</Body2>
      <Caption>Caption - Texto de legenda</Caption>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography variant="body1" color="primary">
        Cor Primary
      </Typography>
      <Typography variant="body1" color="secondary">
        Cor Secondary
      </Typography>
      <Typography variant="body1" color="neutral">
        Cor Neutral
      </Typography>
      <Typography variant="body1" color="error">
        Cor Error
      </Typography>
      <Typography variant="body1" color="warning">
        Cor Warning
      </Typography>
      <Typography variant="body1" color="success">
        Cor Success
      </Typography>
    </div>
  ),
};

export const WithAntdProps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography variant="heading1" copyable>
        Título com botão de copiar
      </Typography>
      <Typography variant="body1" ellipsis style={{ maxWidth: 200 }}>
        Texto muito longo que será truncado com ellipsis quando exceder o limite de largura
      </Typography>
      <Typography variant="body1" editable>
        Texto editável
      </Typography>
    </div>
  ),
};

