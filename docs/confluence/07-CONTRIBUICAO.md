# 07. GUIA DE CONTRIBUIÇÃO (CRIANDO COMPONENTES)

Este guia define o padrão oficial para criar, testar e documentar componentes no Design System. Seguir estas regras garante a manutenibilidade e qualidade da biblioteca.

---

## 7.1 Filosofia e Arquitetura

Nossos componentes não são apenas wrappers simples. Eles encapsulam **decisões de design** usando a Context API do Ant Design (`ConfigProvider`) para isolar estilos.

### Princípios Chave:

1.  **Isolamento via ConfigProvider**: Em vez de sobrescrever estilos CSS globais (que são frágeis), injetamos tokens específicos no escopo do componente. Isso garante que um `Button` "Destructive" tenha a cor vermelha correta sem afetar outros botões.
2.  **Imutabilidade Visual**: Nunca use cores hexadecimais (`#FFF`) diretamente no estilo. Use sempre os objetos de token (`designSystemColors`).
3.  **Tipagem Estendida**: Se o AntD não tem uma prop que precisamos (ex: `dsSize`), criamos uma tipagem que estende a original e sanitizamos as props antes de renderizar.

---

## 7.2 Arquitetura de Pastas

Cada componente deve residir em sua própria pasta dentro de `src/components`. A estrutura obrigatória é:

```text
src/components/NomeDoComponente/
├── index.ts                  # Re-export limpo
├── NomeDoComponente.tsx      # Lógica, Tokens e UI
├── NomeDoComponente.stories.tsx  # Documentação (Storybook)
└── NomeDoComponente.test.tsx     # Testes Unitários (Vitest)
```

---

## 7.3 Exemplo Real: Anatomia de um Componente Rico (`Button`)

Abaixo analisamos o componente `Button`, que demonstra como estender tipos e injetar temas dinamicamente.

### Passo 1: O Componente (`Button.tsx`)

Observe como definimos tokens em funções auxiliares e os injetamos via `ConfigProvider`.

```tsx
import React from "react";
import {
  Button as AntdButton,
  type ButtonProps as AntdButtonProps,
  ConfigProvider,
} from "antd";
import type { ButtonToken } from "antd/es/button/style/token";
import { designSystemColors, radius, spacing } from "../../theme";

// 1. Tipagem Estendida: Adicionamos tipos que não existem no AntD original
type ExtendedButtonType =
  | AntdButtonProps["type"]
  | "secondary"
  | "destructive"
  | "ghost"
  | "neutral"
  | "outlined";
type DsSize = "xs" | "s" | "m";

// 2. Omitimos props conflitantes para redefinir com nossos tipos
type CleanAntdProps = Omit<AntdButtonProps, "type" | "size">;

export type ButtonProps = CleanAntdProps & {
  type?: ExtendedButtonType;
  dsSize?: DsSize;
  size?: AntdButtonProps["size"]; // Mantém compatibilidade se necessário
};

// 3. Funções auxiliares de Token (Isolamento de Design)
function getDestructiveTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.feedback.red[500],
    colorPrimaryHover: designSystemColors.feedback.red[900],
    colorPrimaryActive: designSystemColors.feedback.red[900],
    colorTextLightSolid: designSystemColors.neutral[50],
  };
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, dsSize = "m", style, ...rest } = props;

  // 4. Injeção de Tema por Componente
  // Se o tipo for 'destructive', injetamos os tokens vermelhos APENAS neste botão.
  if (type === "destructive") {
    return (
      <ConfigProvider
        theme={{
          components: { Button: getDestructiveTokens() },
        }}
      >
        <AntdButton type="primary" style={style} {...rest} />
      </ConfigProvider>
    );
  }

  // ... (outros casos de type)

  return <AntdButton type="default" style={style} {...rest} />;
}

Button.displayName = "Button";
```

### Passo 2: O Teste Unitário (`Button.test.tsx`)

O teste valida se a variante customizada (`destructive`) está sendo renderizada corretamente e se as props funcionam.

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  // Testando nossa variante customizada
  it("renders destructive button", () => {
    render(<Button type="destructive">Destructive</Button>);
    // Verificamos se ele é reconhecido semanticamente como botão
    expect(
      screen.getByRole("button", { name: /destructive/i }),
    ).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });
});
```

### Passo 3: A Documentação (`Button.stories.tsx`)

Documentação rica com addons, controles e vínculo com o Figma.

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    // Integração com Figma
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  // Controles manuais para props customizadas
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "destructive", "ghost", "neutral"],
    },
    dsSize: {
      control: "select",
      options: ["xs", "s", "m"],
    },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Destructive: Story = {
  args: {
    type: "destructive",
    children: "Delete Item",
  },
};
```

---

## 7.4 Checklist de Merge (Revisão Qualitativa)

Antes de abrir o PR, pergunte-se:

1.  **Usei ConfigProvider?** Se estou alterando cores padrão, criei uma função de Tokens ou fiz um hack CSS? (Prefira Tokens).
2.  **Estendi a tipagem?** Se criei uma nova prop (`dsSize`), ela está bem tipada?
3.  **Storybook reflete a realidade?** As variantes novas (ex: `destructive`) têm Stories próprias?
4.  **Testes cobrem o básico?** Pelo menos um teste de renderização para cada variante nova.

---

[Anterior: Storybook](./06-STORYBOOK.md) | [Índice](./README.md) | [Próximo: Release e Deploy](./08-RELEASE-DEPLOY.md)
