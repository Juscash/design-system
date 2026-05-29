import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Search, DollarSign, Bell, Plus, Mail, Pencil, Trash, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from ".";

import { Title, Subtitle, Description, Primary as PrimaryBlock, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4035-4131&m=dev";

type ButtonStoryProps = React.ComponentProps<typeof Button> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const VARIANTS = ["primary", "secondary", "neutral", "outline", "ghost", "destructive"] as const;
const SIZES = ["xs", "s", "m"] as const;

const meta: Meta<ButtonStoryProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Botão atômico do design system Juscash. Embrulha o [Ant Design Button](https://ant.design/components/button) aplicando tokens
proprietários via \`ConfigProvider\` local — o consumidor nunca importa \`antd\` diretamente.

## Props proprietárias
- **\`type\` ou \`variant\`** — \`primary\` · \`secondary\` · \`neutral\` · \`outline\` · \`ghost\` · \`destructive\` (alias \`variant\` tem prioridade).
- **\`size\`** — \`xs\` (24px) · \`s\` (32px) · \`m\` (36px). Default \`m\`.
- **\`icon\`** — \`ReactNode\` da Lucide. Sem \`children\`, vira **icon-only** (quadrado).

## Props herdadas do Antd Button
\`block\`, \`disabled\`, \`loading\`, \`href\`, \`htmlType\`, \`iconPosition\`, \`shape\`, \`onClick\`, \`aria-label\`, \`className\`, \`style\` etc.

## Acessibilidade
- Botões **icon-only obrigatoriamente** recebem \`aria-label\`.
- Foco visível garantido via \`outline: 3px solid #d4d4d4\` (token \`shadow.focus\`).
- Tamanho \`xs\` (24px) abaixo de WCAG 2.5.5 AAA — usar só em contextos densos de desktop.

## Como usar
\`\`\`tsx
import { Button } from "@juscash/design-system";
import { Plus } from "lucide-react";

<Button variant="primary" icon={<Plus size={16} />} onClick={() => {}}>
  Adicionar
</Button>
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <PrimaryBlock />
          <Controls />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [...VARIANTS],
      description: "Alias para `type`. Se definido, tem prioridade.",
    },
    size: { control: "select", options: [...SIZES] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    block: { control: "boolean", description: "Ocupa 100% da largura do container." },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
      description: "Posição do ícone em relação ao texto.",
    },
    hover: { control: "boolean", description: "Força hover (pseudo-state)", table: { category: "Pseudo States" } },
    active: { control: "boolean", description: "Força active (pseudo-state)", table: { category: "Pseudo States" } },
    focus: { control: "boolean", description: "Força focus-visible (pseudo-state)", table: { category: "Pseudo States" } },
  },
  args: { hover: false, active: false, focus: false },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    return <Button {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<ButtonStoryProps>;

/** Botão padrão (`variant=primary`, `size=m`). Use os controls para explorar props. */
export const Playground: Story = {
  args: { variant: "primary", children: "Primary Button" },
};

/** Cada variante exibida lado a lado em tamanho `m` e estado default. */
export const Variantes: Story = {
  parameters: { docs: { description: { story: "Todas as variantes proprietárias em tamanho `m`." } } },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

/** Os três tamanhos disponíveis lado a lado para comparação. */
export const Tamanhos: Story = {
  parameters: { docs: { description: { story: "Tamanhos `xs` (24px), `s` (32px) e `m` (36px)." } } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {SIZES.map((s) => (
        <Button key={s} variant="primary" size={s}>
          Tamanho {s}
        </Button>
      ))}
    </div>
  ),
};

/** Botão com ícone à esquerda (default `iconPosition="start"`). */
export const ComIcone: Story = {
  args: { variant: "primary", icon: <Search size={16} />, children: "Buscar" },
};

/** Botão com ícone à direita (`iconPosition="end"`). */
export const IconePosicaoDireita: Story = {
  args: { variant: "neutral", icon: <ChevronRight size={16} />, iconPosition: "end", children: "Próximo" },
};

/** Botão **icon-only** — `icon` sem `children`. Exige `aria-label`. */
export const IconButton: Story = {
  args: { "variant": "primary", "icon": <Plus size={16} />, "aria-label": "Adicionar" },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    return <Button {...props} className={pseudoClasses} />;
  },
};

/** Estado `disabled` lado a lado com o default, para cada variante. */
export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Comparação default × disabled. O estado disabled remove a interatividade e aplica fundo `neutral.300` + texto `neutral.400`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {VARIANTS.map((v) => (
          <Button key={`d-${v}`} variant={v}>
            {v}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {VARIANTS.map((v) => (
          <Button key={`x-${v}`} variant={v} disabled>
            {v} (disabled)
          </Button>
        ))}
      </div>
    </div>
  ),
};

/** Estado `loading` para cada variante. Spinner mantém a mesma cor de texto. */
export const Loading: Story = {
  parameters: { docs: { description: { story: "Estado `loading` para todas as variantes em tamanho `m`." } } },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} loading>
          {v}
        </Button>
      ))}
    </div>
  ),
};

/** `block` ocupa 100% da largura do container — comum em formulários mobile. */
export const Block: Story = {
  args: { variant: "primary", block: true, children: "Botão de largura total" },
  parameters: { docs: { description: { story: "`block` é a prop do Antd que aplica `width: 100%`." } } },
};

/** Quando `href` é passado, o Antd renderiza um `<a>` em vez de `<button>`. */
export const ComoLink: Story = {
  args: { variant: "outline", href: "https://juscash.github.io/design-system", children: "Abrir storybook" },
};

/** `htmlType="submit"` torna o botão o submit padrão de um `<form>`. */
export const SubmitDeFormulario: Story = {
  args: { variant: "primary", htmlType: "submit", children: "Enviar" },
};

/** Matriz completa — variant × size × state — visualizada de uma só vez. */
export const MatrizCompleta: Story = {
  name: "Matriz: variante × tamanho × estado",
  parameters: {
    docs: {
      description: {
        story: "Espelha a página Componentes do Figma. Cada coluna é uma variante; cada linha é um tamanho com 5 estados.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {SIZES.map((size) => (
        <section key={size}>
          <h4 style={{ marginBottom: 12, fontSize: 14, color: "#525252" }}>Tamanho {size}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "120px repeat(6, 1fr)", gap: 8, alignItems: "center" }}>
            <span />
            {VARIANTS.map((v) => (
              <span key={v} style={{ fontSize: 12, color: "#737373" }}>
                {v}
              </span>
            ))}
            {(["default", "hover", "active", "focus", "disabled", "loading"] as const).map((state) => (
              <React.Fragment key={state}>
                <span style={{ fontSize: 12, color: "#737373" }}>{state}</span>
                {VARIANTS.map((v) => (
                  <Button
                    key={`${v}-${size}-${state}`}
                    variant={v}
                    size={size}
                    disabled={state === "disabled"}
                    loading={state === "loading"}
                    className={
                      state === "hover" ? "pseudo-hover"
                      : state === "active" ?
                        "pseudo-active"
                      : state === "focus" ?
                        "pseudo-focus-visible"
                      : undefined
                    }
                  >
                    Label
                  </Button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

/** Matriz de **icon button** — variant × size. */
export const IconButtonMatrix: Story = {
  name: "Matriz Icon Button",
  parameters: {
    docs: { description: { story: "Botões icon-only para todas variantes e tamanhos. Use `aria-label` em produção." } },
  },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", gap: 8, alignItems: "center" }}>
      <span />
      {VARIANTS.map((v) => (
        <span key={v} style={{ fontSize: 12, color: "#737373" }}>
          {v}
        </span>
      ))}
      {SIZES.map((size) => (
        <React.Fragment key={size}>
          <span style={{ fontSize: 12, color: "#737373" }}>size={size}</span>
          {VARIANTS.map((v) => (
            <Button
              key={`${v}-${size}`}
              variant={v}
              size={size}
              icon={
                <Plus
                  size={
                    size === "xs" ? 12
                    : size === "s" ?
                      14
                    : 16
                  }
                />
              }
              aria-label={`Adicionar ${v} ${size}`}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};

/** Composições reais usadas em telas, conforme frame `Content` do Figma. */
export const ExemplosFigma: Story = {
  name: "Exemplos do Figma",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <Button variant="primary" size="m" icon={<Mail size={16} />}>
          Entrar com o e-mail
        </Button>
        <Button variant="primary" size="m" icon={<Send size={16} />}>
          Enviar processo
        </Button>
        <Button variant="secondary" size="m" icon={<Plus size={16} />}>
          Adicionar cliente
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <Button variant="outline" icon={<Pencil size={16} />}>
          Editar
        </Button>
        <Button variant="destructive" icon={<Trash size={16} />}>
          Excluir
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <Button variant="neutral" icon={<ChevronLeft size={16} />}>
          Anterior
        </Button>
        <Button variant="neutral" icon={<ChevronRight size={16} />} iconPosition="end">
          Próximo
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <Button variant="outline" size="m" icon={<DollarSign size={16} />} aria-label="Valores" />
        <Button variant="ghost" size="m" icon={<Bell size={16} />} aria-label="Notificações" />
      </div>
    </div>
  ),
};

/** Demonstração de responsividade — `block` em container estreito. */
export const Responsivo: Story = {
  name: "Responsivo (block)",
  parameters: {
    docs: { description: { story: "Em mobile, prefira `block` em CTAs primárias para alinhar a área de toque." } },
  },
  render: () => (
    <div style={{ maxWidth: 320, display: "flex", flexDirection: "column", gap: 8 }}>
      <Button variant="primary" block>
        Confirmar
      </Button>
      <Button variant="outline" block>
        Cancelar
      </Button>
    </div>
  ),
};
