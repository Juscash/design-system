# 02. ARQUITETURA E EXTENSÃO

## 2.1 Visão Geral

O pacote **`@Juscash/design-system`** não é apenas um "wrapper" simples do Ant Design. Ele atua como uma camada de abstração estratégica, garantindo que a aplicação final consuma componentes padronizados, seguros e alinhados visualmente com a marca Juscash, independentemente da implementação interna.

Utilizamos uma estrutura de **Monorepo** (gerenciada via NPM Workspaces) para separar claramente a biblioteca distribuível da documentação:

- **`packages/design-system`**: O "Core" da biblioteca. É este pacote que você instala via NPM.
- **`docs`**: O site do Storybook. Ele é apenas um consumidor do pacote design-system, servindo como ambiente de desenvolvimento e vitrine.

### Fluxo de Dependências

O diagrama abaixo ilustra como a aplicação solicita um componente e como o Design System resolve essa solicitação:

[diagrama-arquitetura]

Conforme ilustrado no fluxo acima:

1.  **A Aplicação Consumidora** importa tudo exclusivamente de `@Juscash/design-system`.
2.  **O Design System** decide a origem do componente:
    - Se for um componente que precisa de ajustes (ex: `Button`), ele entrega a nossa versão (Wrapper).
    - Se for um componente estrutural (ex: `Row`, `Col`), ele repassa o original do Ant Design (Pass-through).
    - Se for algo novo (ex: `PageHeader`), ele entrega nosso componente proprietário.

---

## 2.2 Estratégia de Extensão (Patterns)

Para manter a manutenção sustentável, utilizamos três padrões de extensão no nosso arquivo de entrada (`src/index.ts`). A seguir, detalhamos cada um com exemplos reais de código.

### Padrão A: Pass-through (Re-export Direto)

Utilizado para componentes que **não necessitam de customização lógica ou visual** (além do que o Theme Provider já faz). Nosso objetivo é não reescrever o que já funciona.

**Exemplo de código (`src/index.ts`):**

```typescript
// Nós apenas repassamos o componente do AntD para frente.
// O dev usa <Row> e <Col> transparentemente.
export { Row, Col, Grid, Layout, Space } from "antd";
```

### Padrão B: Wrapper (Customização/Override)

Utilizado quando precisamos alterar o comportamento padrão, simplificar a API ou injetar estilos específicos que o token global não cobre. O componente tem o **mesmo nome** do original, mas importamos uma versão local.

**Exemplo de código (`src/index.ts`):**

```typescript
// Note que NÃO exportamos 'Button' do 'antd' diretamente.
// Nós exportamos o NOSSO Button que está em src/components.
export * from "./components";
```

**Como é o nosso Wrapper (`src/components/Button/index.tsx`):**

```tsx
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

// Definimos nossa interface, que pode estender ou restringir a original
export interface ButtonProps extends AntButtonProps {
  customVariant?: "primary-bold" | "ghost-action"; // Propriedade extra nossa
}

export const Button = ({ customVariant, className, ...props }: ButtonProps) => {
  // Injetamos lógica ou classes CSS antes de renderizar o AntD
  const classes = `juscash-btn ${customVariant ? `btn-${customVariant}` : ""} ${className}`;

  return <AntButton className={classes} {...props} />;
};
```

### Padrão C: Componente Proprietário (Exclusivo)

Componentes que **não existem no Ant Design** e foram criados do zero para atender regras de negócio da Juscash.

**Exemplo de código (`src/components/PageHeader/index.tsx`):**

```tsx
export const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="juscash-page-header">
      <Breadcrumb items={breadcrumbs} />
      <h1>{title}</h1>
    </div>
  );
};
```

---

## 2.3 Estrutura de Pastas Estratégica

Entender a organização interna ajuda na hora de contribuir:

| Pasta                 | Descrição                                                                                                                                              |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`src/`**            | Raiz do código fonte TypeScript.                                                                                                                       |
| **`src/index.ts`**    | **Barrel File (Barril)**. Arquivo mais importante. Tudo que é acessível para fora DEVE ser exportado aqui.                                             |
| **`src/components/`** | Contém os **Wrappers** (Padrão B) e **Componentes Proprietários** (Padrão C). Cada componente tem sua pasta isolada.                                   |
| **`src/theme/`**      | Configurações do Ant Design. Aqui fica o `JuscashProvider` (que injeta o ConfigProvider do AntD) e o arquivo de `tokens.ts` com nossas cores e fontes. |

## 2.4 Benefícios desta Arquitetura

1.  **Blindagem (Encapsulamento)**: Se o Ant Design lançar uma versão nova que quebra (`Breaking Change`), a aplicação consumidora não quebra imediatamente, pois ela depende do `@Juscash/design-system`, que pode tratar a compatibilidade internamente nos Wrappers.
2.  **Controle Visual Unificado**: Ao forçar o uso dos componentes wrapper, garantimos que nenhum desenvolvedor use um botão "azul padrão do AntD" por engano. Todos os botões passarão pela nossa estilização.
3.  **Produtividade (DX)**: O desenvolvedor não precisa importar CSS ou configurar temas em cada micro-frontend. Basta envolver a aplicação no `JuscashProvider` e usar os componentes.
