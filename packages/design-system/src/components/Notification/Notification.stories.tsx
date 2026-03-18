import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Heart, AlertCircle, Loader } from "lucide-react";
import { Button } from "../Button";
import { Notification } from "./Notification";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4098-8063&m=dev";

const meta: Meta = {
  title: "Components/Notification",
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente baseado no [Ant Design Notification](https://ant.design/components/notification).

### Features Juscash:
- **Padding**: 16px em todas as direcoes
- **Border**: 1px solid neutral[300]
- **Radius**: 8px (radius.xl)
- **Shadow**: shadow.m
- **Titulo**: 16px / neutral[800] / weight 400
- **Descricao**: 13px / neutral[500]
- **Icone**: 20px alinhado ao titulo
- **Stack**: max 3, placement top, duracao 4s
- **Error**: background red[50], icone red[500]

### Como usar:

\`\`\`tsx
import { Notification } from "@juscash/design-system";

const MyComponent = () => {
  const [api, contextHolder] = Notification.useNotification();

  return (
    <>
      {contextHolder}
      <Button onClick={() => api.success({
        title: 'Sucesso',
        description: 'Operacao realizada.',
      })}>
        Disparar
      </Button>
    </>
  );
};
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

// --- Figma: Neutral (com icone + botao + close) ---

export const Default: Story = {
  name: "Neutral com icone e botao (Figma)",
  render: () => {
    const [api, contextHolder] = Notification.useNotification();
    return (
      <div style={{ display: "flex", gap: 16, padding: 20 }}>
        {contextHolder}
        <Button
          onClick={() =>
            api.success({
              title: "Line 1",
              description: "Line 2",
              icon: <Heart size={20} />,
              actions: (
                <Button type="neutral" size="xs" onClick={() => api.destroy()}>
                  Label
                </Button>
              ),
            })
          }
        >
          Neutral + botao
        </Button>
        <Button
          onClick={() =>
            api.success({
              title: "Line 1",
              description: "Line 2",
              icon: <Heart size={20} />,
            })
          }
        >
          Neutral sem botao
        </Button>
      </div>
    );
  },
};

// --- Figma: Error (com icone + botao + close) ---

export const Error: Story = {
  name: "Error com icone e botao (Figma)",
  render: () => {
    const [api, contextHolder] = Notification.useNotification();
    return (
      <div style={{ display: "flex", gap: 16, padding: 20 }}>
        {contextHolder}
        <Button
          type="destructive"
          onClick={() =>
            api.error({
              title: "Line 1",
              description: "Line 2",
              icon: <AlertCircle size={20} />,
              actions: (
                <Button type="neutral" size="xs" onClick={() => api.destroy()}>
                  Label
                </Button>
              ),
            })
          }
        >
          Error + botao
        </Button>
        <Button
          type="destructive"
          onClick={() =>
            api.error({
              title: "Line 1",
              description: "Line 2",
              icon: <AlertCircle size={20} />,
            })
          }
        >
          Error sem botao
        </Button>
      </div>
    );
  },
};

// --- Figma: Loading ---

export const Loading: Story = {
  name: "Loading (Figma)",
  render: () => {
    const [api, contextHolder] = Notification.useNotification();
    return (
      <div style={{ padding: 20 }}>
        {contextHolder}
        <Button
          onClick={() =>
            api.open({
              title: "Carregando...",
              icon: <Loader size={20} style={{ animation: "spin 1s linear infinite" }} />,
              duration: 0,
              closeIcon: false,
            })
          }
        >
          Loading
        </Button>
      </div>
    );
  },
};

// --- Figma: Stacking (empilhamento) ---

export const Stacking: Story = {
  name: "Empilhamento — stack (Figma)",
  render: () => {
    const [api, contextHolder] = Notification.useNotification();

    const triggerMultiple = () => {
      api.info({ title: "Notification 1", description: "Primeira", icon: <Heart size={20} /> });
      setTimeout(() => api.success({ title: "Notification 2", description: "Segunda", icon: <Heart size={20} /> }), 200);
      setTimeout(() => api.warning({ title: "Notification 3", description: "Terceira", icon: <Heart size={20} /> }), 400);
    };

    return (
      <div style={{ padding: 20 }}>
        {contextHolder}
        <Button onClick={triggerMultiple}>Disparar 3 (stack max 3)</Button>
      </div>
    );
  },
};

// --- Todos os tipos ---

export const AllTypes: Story = {
  name: "Todos os tipos",
  render: () => {
    const [api, contextHolder] = Notification.useNotification();
    return (
      <div style={{ display: "flex", gap: 16, padding: 20 }}>
        {contextHolder}
        <Button onClick={() => api.success({ title: "Success", description: "Operacao realizada com sucesso.", icon: <Heart size={20} /> })}>
          Success
        </Button>
        <Button onClick={() => api.error({ title: "Error", description: "Algo deu errado.", icon: <AlertCircle size={20} /> })}>
          Error
        </Button>
        <Button onClick={() => api.info({ title: "Info", description: "Informacao importante.", icon: <Heart size={20} /> })}>
          Info
        </Button>
        <Button onClick={() => api.warning({ title: "Warning", description: "Atencao com esta acao.", icon: <AlertCircle size={20} /> })}>
          Warning
        </Button>
      </div>
    );
  },
};
