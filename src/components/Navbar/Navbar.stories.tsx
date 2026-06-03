import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Send } from "lucide-react";
import { Navbar } from ".";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { AvatarMenu } from "../AvatarMenu";
import { Drawer } from "../Drawer";
import { designSystemColors } from "../../theme";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4146-12875&m=dev";

const LOGO_HEIGHT = 18.653;
const LOGO_WIDTH = 124;

/** Placeholder do logotipo (124×18.653, conforme o `Logo` do Figma). */
function LogoPlaceholder(): React.ReactElement {
  return <div aria-label="Juscash" style={{ height: LOGO_HEIGHT, width: LOGO_WIDTH, background: "var(--color-text-dark)", borderRadius: 2 }} />;
}

/** Pill "SIJ" do logo na variante sij (bg secondary/900, texto branco). */
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

/** Botão de notificação: Button ghost (Bell) com Badge counter sobreposto. */
function NotificationButton({ count }: { count?: number }): React.ReactElement {
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <Button type="ghost" size="s" icon="Bell" tooltip="Notificações" aria-label="Notificações" />
      {count !== undefined ? (
        <span style={{ position: "absolute", top: -2, right: -2 }}>
          <Badge variant="counter" count={count} />
        </span>
      ) : null}
    </span>
  );
}

/** Itens que somem do navbar no mobile e ficam acessíveis no Drawer. */
function DrawerMenu({ withPrimary }: { withPrimary?: boolean }): React.ReactElement {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {withPrimary ? (
        <Button type="primary" icon={<Send size={14} />} block>
          Enviar processo
        </Button>
      ) : null}
      <Button type="ghost" block style={{ justifyContent: "flex-start" }}>
        Início
      </Button>
      <Button type="ghost" block style={{ justifyContent: "flex-start" }}>
        Processos
      </Button>
      <Button type="ghost" block style={{ justifyContent: "flex-start" }}>
        Configurações
      </Button>
    </nav>
  );
}

/**
 * Navbar responsivo (Figma + regra do produto): hamburger só no mobile
 * (`ds-navbar-hide-desktop`) abre um Drawer com os itens ocultados; logo
 * centralizado no mobile (`ds-navbar-center-mobile`); ação primária inline no
 * desktop e dentro do Drawer no mobile. Corte no breakpoint `m` (1024px).
 */
function ResponsiveNavbar({ brand, withPrimary }: { brand: React.ReactNode; withPrimary?: boolean }): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Navbar
        aria-label="Barra de navegação"
        left={
          <>
            <span className="ds-navbar-hide-desktop">
              <Button type="ghost" size="s" icon="PanelRight" tooltip="Abrir menu" aria-label="Abrir menu" onClick={() => setOpen(true)} />
            </span>
            <span className="ds-navbar-center-mobile">{brand}</span>
          </>
        }
        right={
          <>
            {withPrimary ? (
              <span className="ds-navbar-hide-mobile">
                <Button type="primary" size="s" icon={<Send size={12} />}>
                  Enviar processo
                </Button>
              </span>
            ) : null}
            <NotificationButton count={1} />
            <AvatarMenu>CN</AvatarMenu>
          </>
        }
      />
      <Drawer open={open} onClose={() => setOpen(false)} placement="left" title="Menu">
        <DrawerMenu withPrimary={withPrimary} />
      </Drawer>
    </>
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
Barra superior do design system (Figma \`4146:12875\`). Renderiza um \`<header role="banner">\` com fundo \`neutral/50\`, borda inferior \`border/regular\` e padding \`16\`, em \`flex / justify-between\`.

Duas regiões compostas pelo consumidor:
- \`left\`: logo + botão de menu (\`flex gap-8 items-center\`).
- \`right\`: ações — botão primário, notificação, avatar menu (\`flex gap-8 items-center\`).

No mobile (< 768px) o padding horizontal cai para \`8\` e itens com a classe \`ds-navbar-hide-mobile\` são ocultados (variante mobile do Figma).
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
 * Juscash (responsivo): no desktop, logo à esquerda + Enviar/notificação/avatar
 * à direita. No mobile (< 1024px): hamburger à esquerda (abre o Drawer com os
 * itens ocultados), logo centralizado, notificação + avatar à direita.
 */
export const WebJuscash: Story = {
  name: "Juscash (responsivo)",
  render: () => <ResponsiveNavbar brand={<LogoPlaceholder />} withPrimary />,
};

/** SIJ (responsivo): logo + pill "SIJ"; sem botão primário (navegação no Drawer). */
export const WebSij: Story = {
  name: "SIJ (responsivo)",
  render: () => (
    <ResponsiveNavbar
      brand={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <LogoPlaceholder />
          <SijPill />
        </span>
      }
    />
  ),
};

/**
 * Mobile (viewport mobile do Storybook < 1024px): hamburger visível, logo
 * centralizado, Enviar oculto. Clique no hamburger para abrir o Drawer.
 */
export const Mobile: Story = {
  name: "Mobile (viewport)",
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <ResponsiveNavbar brand={<LogoPlaceholder />} withPrimary />,
};
