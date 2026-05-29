import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Bell, PanelRight, Search, Menu } from "lucide-react";
import { Navbar } from ".";
import { Button } from "../Button";
import { AvatarMenu } from "../AvatarMenu";
import { Input } from "../Input";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4146-12875&m=dev";

const BRAND_LOGO_HEIGHT = 18;
const BRAND_LOGO_WIDTH = 124;
const ICON_SIZE = 16;
const SEARCH_WIDTH = 280;

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Barra superior horizontal do design system. Renderiza um \`<header role="banner">\`
com fundo \`neutral/50\` (#fafafa), borda inferior \`border/regular\` (#d4d4d4) e
padding \`16\` (token \`spacing[4]\`), conforme dump
\`figma/components/navbar/variables-4146-12875.md\`.

## Slots

- \`brand\`: logotipo da marca (canto esquerdo).
- \`leftSlot\`: conteúdo extra à esquerda — tipicamente o botão hamburger ou
  breadcrumbs intermediários.
- \`rightSlot\`: ações à direita — botões de notificação, menu de avatar etc.
- \`children\`: alternativa quando o consumidor quer montar o layout interno
  manualmente (sem os slots padrão).

## Como usar

\`\`\`tsx
import { Navbar, Button, AvatarMenu } from "@juscash/design-system";
import { Bell, PanelRight } from "lucide-react";

<Navbar
  brand={<img src="/logo.svg" alt="Juscash" />}
  leftSlot={<Button type="ghost" icon={<PanelRight size={16} />} aria-label="Abrir menu" />}
  rightSlot={(
    <>
      <Button type="ghost" icon={<Bell size={16} />} aria-label="Notificações" />
      <AvatarMenu>CN</AvatarMenu>
    </>
  )}
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
    "aria-label": {
      control: "text",
      description: "Rótulo acessível do <header role='banner'>.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

/**
 * Renderiza um placeholder de logotipo do tamanho do `Logo` descrito no
 * dump (`h-[18.653px] w-[124px]`).
 */
function LogoPlaceholder(): React.ReactElement {
  return (
    <div
      aria-label="Juscash"
      style={{
        height: BRAND_LOGO_HEIGHT,
        width: BRAND_LOGO_WIDTH,
        background: "var(--color-text-dark)",
        borderRadius: 2,
      }}
    />
  );
}

/** Variante padrão: brand à esquerda + actions (notificação + avatar) à direita. */
export const Default: Story = {
  args: {
    "aria-label": "Barra de navegação",
    brand: <LogoPlaceholder />,
    leftSlot: (
      <Button type="ghost" size="s" icon={<PanelRight size={ICON_SIZE} />} aria-label="Abrir menu lateral" />
    ),
    rightSlot: (
      <>
        <Button type="ghost" size="s" icon={<Bell size={ICON_SIZE} />} aria-label="Notificações" />
        <AvatarMenu>CN</AvatarMenu>
      </>
    ),
  },
};

/** Navbar com campo de busca inline ocupando o slot esquerdo. */
export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: "Lado esquerdo recebe o logo + um campo de busca; lado direito mantém as ações.",
      },
    },
  },
  args: {
    "aria-label": "Barra de navegação com busca",
    brand: <LogoPlaceholder />,
    leftSlot: (
      <div style={{ width: SEARCH_WIDTH }}>
        <Input prefix={<Search size={ICON_SIZE} />} placeholder="Buscar..." size="s" />
      </div>
    ),
    rightSlot: (
      <>
        <Button type="ghost" size="s" icon={<Bell size={ICON_SIZE} />} aria-label="Notificações" />
        <AvatarMenu>CN</AvatarMenu>
      </>
    ),
  },
};

/** Navbar em modo mobile: hamburger visível no slot esquerdo, sem campo central. */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        story: "Variante mobile do dump (`responsive='mobile'`): hamburger + ações compactas.",
      },
    },
  },
  args: {
    "aria-label": "Barra de navegação móvel",
    leftSlot: (
      <Button type="ghost" size="s" icon={<Menu size={ICON_SIZE} />} aria-label="Abrir menu" />
    ),
    rightSlot: (
      <>
        <Button type="ghost" size="s" icon={<Bell size={ICON_SIZE} />} aria-label="Notificações" />
        <AvatarMenu>CN</AvatarMenu>
      </>
    ),
  },
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    "aria-label": "Barra de navegação",
    brand: <LogoPlaceholder />,
    leftSlot: (
      <Button type="ghost" size="s" icon={<PanelRight size={ICON_SIZE} />} aria-label="Abrir menu lateral" />
    ),
    rightSlot: (
      <>
        <Button type="ghost" size="s" icon={<Bell size={ICON_SIZE} />} aria-label="Notificações" />
        <AvatarMenu>CN</AvatarMenu>
      </>
    ),
  },
};
