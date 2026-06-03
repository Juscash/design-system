import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Bell, PanelRight, Send } from "lucide-react";
import { Navbar } from ".";
import { Button } from "../Button";
import { AvatarMenu } from "../AvatarMenu";
import { designSystemColors } from "../../theme";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4146-12875&m=dev";

const LOGO_HEIGHT = 18.653;
const LOGO_WIDTH = 124;
const ICON_SIZE = 16;
const SEND_ICON_SIZE = 12;

/** Botão de menu lateral (`panel-right`) — composto com o `Button` ghost. */
function MenuButton(): React.ReactElement {
  return (
    <Button type="ghost" size="s" icon={<PanelRight size={ICON_SIZE} />} aria-label="Abrir menu lateral" tooltip="Menu lateral" />
  );
}

/** Botão de notificação (sino) — `Button` ghost com ícone `Bell`. O badge de contagem fica a cargo do consumidor. */
function BellButton(): React.ReactElement {
  return <Button type="ghost" size="s" icon={<Bell size={ICON_SIZE} />} aria-label="Notificações" tooltip="Notificações" />;
}

/** Placeholder do logotipo JusCash (124×18.653). O logo real é um asset do consumidor. */
function LogoPlaceholder(): React.ReactElement {
  return (
    <div role="img" aria-label="JusCash" style={{ height: LOGO_HEIGHT, width: LOGO_WIDTH, background: "var(--color-text-dark)", borderRadius: 2 }} />
  );
}

/** Pill "SIJ" (exemplo de conteúdo do consumidor): bg secondary/900, texto branco bold. */
function SijPill(): React.ReactElement {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: designSystemColors.brand.secondary[900],
        color: designSystemColors.neutral[50],
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 1.2,
        padding: "4px 8px",
        borderRadius: 8,
      }}
    >
      SIJ
    </span>
  );
}

/** Ação primária "Enviar processo" — composta com o `Button` primary. */
function SendButton(): React.ReactElement {
  return (
    <Button type="primary" size="s" icon={<Send size={SEND_ICON_SIZE} />}>
      Enviar processo
    </Button>
  );
}

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Barra superior do design system (Figma \`4146:12875\`). É um **shell de layout totalmente composável**: a barra (fundo \`neutral/50\`, borda inferior \`border/regular\`, padding \`16\` que cai para \`8\` na horizontal no mobile) é a única coisa fixa. O layout é um grid de 3 colunas (\`1fr auto 1fr\`): \`left\` à esquerda, \`center\` no centro exato da barra e \`right\` à direita. Sem \`center\`, comporta-se como \`justify-between\`.

Os itens do Figma (botão de menu, logo, pill "SIJ", "Enviar processo", notificação, avatar) são apenas **exemplos** — nenhum é fixo. Componha-os com os primitivos do DS (\`Button\`, \`AvatarMenu\`) ou troque por qualquer outro conteúdo.

**Props proprietárias:** \`left\`, \`center\`, \`right\`.

\`\`\`tsx
import { Navbar, Button, AvatarMenu } from "@juscash/design-system";
import { Bell, PanelRight, Send } from "lucide-react";

<Navbar
  left={
    <>
      <Button type="ghost" size="s" icon={<PanelRight size={16} />} aria-label="Menu" tooltip="Menu" />
      <img src="/logo.svg" alt="JusCash" height={18.653} />
    </>
  }
  right={
    <>
      <Button type="primary" size="s" icon={<Send size={12} />}>Enviar processo</Button>
      <Button type="ghost" size="s" icon={<Bell size={16} />} aria-label="Notificações" tooltip="Notificações" />
      <AvatarMenu>CN</AvatarMenu>
    </>
  }
/>
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="500px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    "aria-label": { control: "text", description: "Rótulo acessível do <header role='banner'>." },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/**
 * Exemplo "Juscash": menu + logo à esquerda; "Enviar processo", notificação e
 * avatar à direita. Tudo composto via slots — nenhum item é fixo.
 */
export const Juscash: Story = {
  render: () => (
    <Navbar
      left={
        <>
          <MenuButton />
          <LogoPlaceholder />
        </>
      }
      right={
        <>
          <SendButton />
          <BellButton />
          <AvatarMenu>CN</AvatarMenu>
        </>
      }
    />
  ),
};

/**
 * Exemplo "SIJ": menu + logo + pill "SIJ" à esquerda; notificação e avatar à
 * direita (sem "Enviar processo").
 */
export const Sij: Story = {
  render: () => (
    <Navbar
      left={
        <>
          <MenuButton />
          <LogoPlaceholder />
          <SijPill />
        </>
      }
      right={
        <>
          <BellButton />
          <AvatarMenu>CN</AvatarMenu>
        </>
      }
    />
  ),
};

/**
 * Exemplo mobile: o consumidor compõe só o essencial (menu + notificação +
 * avatar). Em viewport < 1024px o padding horizontal da barra cai para 8px.
 */
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Navbar
      left={<MenuButton />}
      right={
        <>
          <BellButton />
          <AvatarMenu>CN</AvatarMenu>
        </>
      }
    />
  ),
};

/**
 * Customização livre: qualquer conteúdo nos slots. Aqui a direita traz só o
 * avatar (sem notificação nem ação primária) e a esquerda apenas o logo —
 * demonstrando que nada é fixo.
 */
export const Customizado: Story = {
  render: () => (
    <Navbar
      left={<LogoPlaceholder />}
      right={<AvatarMenu>MR</AvatarMenu>}
    />
  ),
};

/**
 * Logo centralizado via slot `center` (grid `1fr auto 1fr`): menu à esquerda,
 * logo no centro exato e ações à direita — independente das larguras dos lados.
 */
export const LogoCentralizado: Story = {
  name: "Logo centralizado (center)",
  render: () => (
    <Navbar
      left={<MenuButton />}
      center={<LogoPlaceholder />}
      right={
        <>
          <BellButton />
          <AvatarMenu>CN</AvatarMenu>
        </>
      }
    />
  ),
};
