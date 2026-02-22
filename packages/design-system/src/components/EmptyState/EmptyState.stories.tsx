import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=YOUR-NODE-ID&m=dev";

type EmptyStateStoryProps = React.ComponentProps<typeof EmptyState>;

const meta: Meta<EmptyStateStoryProps> = {
  title: "Components/EmptyState",
  component: EmptyState,
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
Componente que exibe um estado vazio para indicar ausência de conteúdo ou resultados.

### Props:
- **variant**: Define a variante visual ('neutral' | 'error' | 'success' | 'info' | 'warning').
- **size**: Define o tamanho ('xs' | 's' | 'm').
- **icon**: Ícone customizado (opcional - usa padrão da variante se não fornecido).
- **title**: Texto principal do estado vazio.
- **description**: Texto descritivo adicional.
- **action**: Ação única a ser exibida.
- **primaryAction**: Ação principal a ser exibida.
- **secondaryAction**: Ação secundária a ser exibida.
- **fullScreen**: Exibe o componente em tela cheia.
- **centered**: Centraliza o conteúdo horizontalmente.

### Como usar:

\`\`\`tsx
import { EmptyState } from "@juscash/design-system";

function Example() {
  return (
    <EmptyState
      variant="neutral"
      title="Nenhum resultado encontrado"
      description="Tente ajustar os filtros para encontrar o que procura."
      primaryAction={<Button>Buscar novamente</Button>}
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
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "error", "success", "info", "warning"],
      description: "Variante visual do EmptyState",
    },
    size: {
      control: "select",
      options: ["xs", "s", "m"],
      description: "Tamanho do componente",
    },
    title: {
      control: "text",
      description: "Título principal",
    },
    description: {
      control: "text",
      description: "Descrição adicional",
    },
    fullScreen: {
      control: "boolean",
      description: "Exibir em tela cheia",
    },
    centered: {
      control: "boolean",
      description: "Centralizar conteúdo",
    },
  },
  args: {
    variant: "neutral",
    size: "m",
    fullScreen: false,
    centered: true,
  },
};

export default meta;
type Story = StoryObj<EmptyStateStoryProps>;

// ============== VARIANTS ==============

export const Neutral: Story = {
  args: {
    variant: "neutral",
    title: "Nenhum conteúdo",
    description: "Ainda não há itens para exibir aqui.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Concluído com sucesso",
    description: "Todas as operações foram finalizadas.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Erro ao carregar",
    description: "Não foi possível carregar os dados. Tente novamente.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Informação",
    description: "Aqui você encontrará as informações relevantes.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Atenção",
    description: "Verifique as informações antes de continuar.",
  },
};

// ============== SIZES ==============

export const SizeXS: Story = {
  args: {
    size: "xs",
    title: "Tamanho XS",
    description: "Versão compacta do componente.",
  },
};

export const SizeS: Story = {
  args: {
    size: "s",
    title: "Tamanho S",
    description: "Versão média do componente.",
  },
};

export const SizeM: Story = {
  args: {
    size: "m",
    title: "Tamanho M",
    description: "Versão completa do componente.",
  },
};

// ============== WITH ACTIONS ==============

export const WithAction: Story = {
  args: {
    title: "Nenhum item encontrado",
    description: "Adicione itens para começar.",
    action: <Button variant="primary">Adicionar Item</Button>,
  },
};

export const WithPrimaryAndSecondaryAction: Story = {
  args: {
    title: "Nenhum resultado",
    description: "Tente ajustar sua busca ou explore outras opções.",
    primaryAction: <Button variant="primary">Nova Busca</Button>,
    secondaryAction: <Button variant="outline">Limpar Filtros</Button>,
  },
};

export const WithAllActions: Story = {
  args: {
    variant: "info",
    title: "Explorar recursos",
    description: "Descubra todas as funcionalidades disponíveis.",
    action: <Button variant="primary">Começar Agora</Button>,
    primaryAction: <Button variant="primary">Criar Conta</Button>,
    secondaryAction: <Button variant="outline">Saiba Mais</Button>,
  },
};

// ============== FULLSCREEN ==============

export const FullScreen: Story = {
  args: {
    fullScreen: true,
    title: "Página em construção",
    description: "Estamos trabalhando para trazer novidades em breve.",
    primaryAction: <Button variant="primary">Voltar ao Início</Button>,
  },
  parameters: {
    docs: {
      storyDescription: "Exemplo em tela cheia (simulado no Storybook)",
    },
  },
};

// ============== COMPLEX EXAMPLES ==============

export const SearchNoResults: Story = {
  args: {
    variant: "neutral",
    title: "Nenhum resultado encontrado",
    description: "Não encontramos resultados para sua busca. Tente outros termos ou filtros.",
    primaryAction: <Button variant="primary">Limpar Busca</Button>,
    secondaryAction: <Button variant="outline">Filtros Avançados</Button>,
  },
};

export const LoadingError: Story = {
  args: {
    variant: "error",
    title: "Falha no carregamento",
    description: "Ocorreu um erro ao carregar os dados. Verifique sua conexão e tente novamente.",
    primaryAction: <Button variant="primary">Tentar Novamente</Button>,
  },
};

export const EmptyTable: Story = {
  args: {
    variant: "neutral",
    size: "s",
    title: "Sem dados",
    description: "Não há registros para exibir.",
    action: <Button size="s" variant="primary">Adicionar Registro</Button>,
  },
};

export const SuccessState: Story = {
  args: {
    variant: "success",
    title: "Operação concluída!",
    description: "Seus dados foram salvos com sucesso.",
    action: <Button variant="primary">Continuar</Button>,
  },
};
