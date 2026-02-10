import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../Button";
import { Notification } from "./Notification";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4098-8063&m=dev";

type NotificationStoryProps = {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  className?: string;
};

const getPseudoClassName = (args: NotificationStoryProps) => {
  const pseudoClasses = [args.hover && "pseudo-hover", args.active && "pseudo-active", args.focus && "pseudo-focus-visible"]
    .filter(Boolean)
    .join(" ");

  return [args.className, pseudoClasses].filter(Boolean).join(" ");
};

const meta: Meta<NotificationStoryProps> = {
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
- **Duração Padrão**: 4.0s (configurado via hook).
- **Posicionamento**: Top (centralizado, 16px do topo).
- **Empilhamento**: Máximo 3 notificações (stack).
- **Tokens**: Cores e sombras do Design System via ConfigProvider local.

### Como usar:

\`\`\`tsx
import { Notification } from "@juscash/design-system";

const MyComponent = () => {
  const [api, contextHolder] = Notification.useNotification();

  const openNotification = () => {
    api.success({
      message: 'Notificação Enviada',
      description: 'Esta é uma notificação de sucesso padrão do sistema.',
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={openNotification}>Disparar</Button>
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
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🎨 Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
};

export default meta;

type Story = StoryObj<NotificationStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [api, contextHolder] = Notification.useNotification();
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ display: "flex", gap: 16, padding: 20 }}>
        {contextHolder}
        <Button
          onClick={() =>
            api.success({
              message: "Success Notification",
              description: "Operation completed successfully.",
            })
          }
        >
          Success
        </Button>
        <Button
          onClick={() =>
            api.error({
              message: "Error Notification",
              description: "Something went wrong.",
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            api.info({
              message: "Info Notification",
              description: "Here is some useful information.",
            })
          }
        >
          Info
        </Button>
        <Button
          onClick={() =>
            api.warning({
              message: "Warning Notification",
              description: "Please be careful with this action.",
            })
          }
        >
          Warning
        </Button>
      </div>
    );
  },
};

export const Stacking: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra o empilhamento de notificações (máximo 3).",
      },
    },
  },
  render: (args) => {
    const [api, contextHolder] = Notification.useNotification();
    const mergedClassName = getPseudoClassName(args);

    const triggerMultiple = () => {
      api.info({ message: "First Notification", description: "Order 1" });
      setTimeout(
        () =>
          api.success({
            message: "Second Notification",
            description: "Order 2",
          }),
        200,
      );
      setTimeout(
        () =>
          api.warning({
            message: "Third Notification",
            description: "Order 3",
          }),
        400,
      );
      setTimeout(
        () =>
          api.error({
            message: "Fourth Notification (Replaces first)",
            description: "Order 4",
          }),
        600,
      );
    };

    return (
      <div className={mergedClassName} style={{ padding: 20 }}>
        {contextHolder}
        <Button onClick={triggerMultiple}>Trigger Multiple (Stack Test)</Button>
      </div>
    );
  },
};

export const CustomIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Permite passar um ícone customizado via propriedade `icon`.",
      },
    },
  },
  render: (args) => {
    const [api, contextHolder] = Notification.useNotification();
    const mergedClassName = getPseudoClassName(args);

    const openCustom = () => {
      api.info({
        message: "Custom Icon",
        description: "This notification uses a custom icon.",
        icon: <span style={{ fontSize: 24 }}>⭐</span>,
      });
    };

    return (
      <div className={mergedClassName} style={{ padding: 20 }}>
        {contextHolder}
        <Button onClick={openCustom}>Trigger Custom Icon</Button>
      </div>
    );
  },
};
