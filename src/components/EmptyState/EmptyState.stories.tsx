import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Card } from "../Card";
import { EmptyState } from ".";
import { Button } from "../Button";
import { Badge } from "../Badge";
import {
  Bell,
  FolderOpen,
  PanelRight,
  ChevronDown,
  Newspaper,
  House,
  CircleDollarSign,
  Gift,
  Sparkles,
  GraduationCap,
  UserRound,
  Settings,
  UserCog,
  Headphones,
  Send,
} from "lucide-react";
import { designSystemColors, radius, shadow, spacing } from "../../theme/foundations";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4237-10769&m=dev";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente para estados vazios em pÃ¡ginas, cards e Ã¡reas de conteÃºdo.

### Props:
- \`title\`: tÃ­tulo principal do estado vazio
- \`description\`: texto complementar
- \`actionLabel\`: label do CTA opcional
- \`icon\`: Ã­cone customizado opcional

### Como usar:

\`\`\`tsx
import { EmptyState } from "@juscash/design-system";

function Example() {
  return (
    <EmptyState
      title="Title"
      description="Description"
      actionLabel="Label"
    />
  );
}
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: 700 }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="450px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    title: "Title",
    description: "Description",
    actionLabel: "Label",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actionLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const storyCardStyle: React.CSSProperties = {
  background: designSystemColors.neutral[50],
  border: `1px solid ${designSystemColors.neutral[300]}`,
  borderRadius: radius.xl,
  boxShadow: shadow.xs,
};

export const Default: Story = {};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export const WithoutButton: Story = {
  args: {
    actionLabel: undefined,
  },
};

export const FigmaIcon: Story = {
  name: "Figma â€” Icon",
  parameters: {
    layout: "centered",
  },
  render: () => (
    <div
      style={{
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing[1],
        borderRadius: radius["2xl"],
        background: designSystemColors.neutral[200],
      }}
    >
      <EmptyIcon />
    </div>
  ),
};

export const FigmaExamples: Story = {
  name: "Figma â€” Examples",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        padding: 48,
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <EmptyState title="Title" description="Description" actionLabel="Label" />
      </div>

      <CardExample />
      <DesktopExample />
      <MobileExample />
    </div>
  ),
};

function CardExample(): React.ReactElement {
  return (
    <Card style={{ width: 374 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[4] }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2] }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: spacing[2] }}>
            <div style={{ display: "flex", alignItems: "center", gap: spacing[2], minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  lineHeight: "1.2",
                  fontWeight: 700,
                  color: designSystemColors.neutral[800],
                }}
              >
                AtualizaÃ§Ãµes DiÃ¡rio Oficial
              </div>
              <Badge style={{ flexShrink: 0 }} variant="counter" count={1} />
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                lineHeight: "1.2",
                fontWeight: 400,
                color: designSystemColors.neutral[800],
                textDecoration: "underline",
                whiteSpace: "nowrap",
              }}
            >
              Ver tudo
            </div>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              lineHeight: "1.2",
              fontWeight: 400,
              color: "#6d6d6e",
            }}
          >
            Acompanhe o DiÃ¡rio Oficial sem complicaÃ§Ãµes. Filtramos sÃ³ o que Ã© relevante para vocÃª.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <EmptyState
            title="Ainda nÃ£o hÃ¡ atualizaÃ§Ãµes disponÃ­veis."
            icon={<FolderOpen size={24} strokeWidth={1.75} />}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </Card>
  );
}

function EmptyIcon(): React.ReactElement {
  return <FolderOpen size={24} strokeWidth={1.75} color={designSystemColors.neutral[800]} style={{ opacity: 0.8 }} />;
}

function DesktopExample(): React.ReactElement {
  return (
    <div
      style={{
        ...storyCardStyle,
        width: 1024,
        overflow: "hidden",
        boxShadow: shadow.xl,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          minHeight: 720,
          background: designSystemColors.neutral[50],
        }}
      >
        <div
          style={{
            width: 240,
            borderRight: `1px solid ${designSystemColors.neutral[300]}`,
            background: designSystemColors.neutral[50],
            padding: `${spacing[2]}px ${spacing[4]}px`,
          }}
        >
          <SidebarMenu />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <TopBar mobile={false} />
          <div style={{ padding: 24 }}>
            <div
              style={{
                minHeight: 632,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: designSystemColors.neutral[100],
                borderRadius: radius.xl,
              }}
            >
              <EmptyState title="Title" description="Description" actionLabel="Label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileExample(): React.ReactElement {
  return (
    <div
      style={{
        ...storyCardStyle,
        width: 430,
        overflow: "hidden",
        boxShadow: shadow.xl,
        background: designSystemColors.neutral[50],
      }}
    >
      <TopBar mobile />
      <div style={{ padding: 16 }}>
        <div
          style={{
            minHeight: 836,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: designSystemColors.neutral[100],
            borderRadius: radius.xl,
          }}
        >
          <EmptyState title="Title" description="Description" actionLabel="Label" />
        </div>
      </div>
    </div>
  );
}

function TopBar(props: { mobile: boolean }): React.ReactElement {
  const { mobile } = props;

  return (
    <div
      style={{
        height: mobile ? 80 : 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: mobile ? `16px 8px` : "16px",
        borderBottom: `1px solid ${designSystemColors.neutral[300]}`,
        background: designSystemColors.neutral[50],
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
        <Button type="ghost" size="s" icon={<PanelRight size={16} />} aria-label="Menu" />
        {!mobile ? (
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#0e2f63" }}>
            JusCash
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
        {!mobile ? (
          <Button type="primary" size="s" icon={<Send size={12} />}>
            Enviar processo
          </Button>
        ) : null}
        <Button type="ghost" size="s" icon={<Bell size={16} />} aria-label="NotificaÃ§Ãµes" />
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9999,
            background: designSystemColors.neutral[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            lineHeight: "1.2",
            fontWeight: 700,
            color: designSystemColors.neutral[800],
          }}
        >
          CN
        </div>
        <ChevronDown size={16} color={designSystemColors.neutral[800]} />
      </div>
    </div>
  );
}

function SidebarMenu(): React.ReactElement {
  const itemStyle: React.CSSProperties = {
    minHeight: 32,
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    padding: "4px 12px",
    borderRadius: 5,
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    lineHeight: "1.2",
    color: designSystemColors.neutral[800],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ ...itemStyle, background: designSystemColors.neutral[100] }}>
        <House size={16} />
        Dashboard
      </div>
      <div style={itemStyle}>
        <Send size={16} />
        Enviar processo
      </div>
      <div style={itemStyle}>
        <CircleDollarSign size={16} />
        Cashback
      </div>
      <div style={{ ...itemStyle, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
          <Gift size={16} />
          BenefÃ­cios
        </div>
        <ChevronDown size={16} />
      </div>
      <SecondLevelItem icon={<Sparkles size={16} />} label="Which IA" />
      <SecondLevelItem icon={<GraduationCap size={16} />} label="JusConhecimento" />
      <SecondLevelItem icon={<Newspaper size={16} />} label="DiÃ¡rio oficial" />
      <div style={itemStyle}>
        <UserRound size={16} />
        Meu perfil
      </div>
      <div style={{ ...itemStyle, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
          <Settings size={16} />
          GestÃ£o
        </div>
        <ChevronDown size={16} />
      </div>
      <SecondLevelItem icon={<UserCog size={16} />} label="Gerenciar usuÃ¡rios" />
      <SecondLevelItem icon={<Bell size={16} />} label="Central de notificaÃ§Ãµes" />
      <div style={itemStyle}>
        <Headphones size={16} />
        Suporte
      </div>
    </div>
  );
}

function SecondLevelItem(props: { icon: React.ReactNode; label: string }): React.ReactElement {
  return (
    <div style={{ display: "flex", alignItems: "center", minHeight: 32 }}>
      <div
        style={{
          width: 20,
          height: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: 1, height: 32, background: designSystemColors.neutral[300] }} />
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 32,
          display: "flex",
          alignItems: "center",
          gap: spacing[2],
          padding: 4,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          lineHeight: "1.2",
          color: designSystemColors.neutral[800],
        }}
      >
        {props.icon}
        {props.label}
      </div>
    </div>
  );
}
