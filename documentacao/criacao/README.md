# Guia Completo de Criação e Documentação de Componentes

Este guia detalha o processo de ponta a ponta para adicionar um novo componente ao Design System da Juscash, garantindo que ele siga nossos padrões técnicos e seja corretamente documentado no aplicativo de exemplos.

---

## Sumário

1. [Filosofia de Desenvolvimento](#1-filosofia-de-desenvolvimento)
2. [Desenvolvimento do Componente (Package)](#2-desenvolvimento-do-componente-package)
3. [Exportação e Registro](#3-exportação-e-registro)
4. [Documentação no App de Docs (Showcase)](#4-documentação-no-app-de-docs-showcase)
   - [4.1 Estrutura de Pastas](#41-estrutura-de-pastas)
   - [4.2 Uso do DemoCard](#42-uso-do-democard)
   - [4.3 Exemplos Interativos (Playgrounds)](#43-exemplos-interativos-playgrounds)
   - [4.4 Foco em Props Proprietárias](#44-foco-em-props-proprietárias)
5. [Integração com a Navegação](#5-integração-com-a-navegação)
6. [Publicação e Deploy](#6-publicação-e-deploy)
7. [Checklist Final](#7-checklist-final)

---

## 1. Filosofia de Desenvolvimento

Nosso sistema é uma camada de design sobre o **Ant Design 6**. As regras de ouro são:

- **Não reinventar a roda**: Use o componente base do `antd` e aplique nossa identidade via `ConfigProvider`.
- **Extensibilidade**: Sempre exporte e estenda as interfaces de Props do Ant Design. Isso permite que o consumidor use todas as funcionalidades nativas (como `onClick`, `style`, `className`, etc.).
- **Isolamento de Estilo**: Use o `ConfigProvider` localmente no componente para que o tema Juscash não vaze para outros componentes ou dependa exclusivamente de um Provider global para funcionar (embora o tenhamos).
- **Client Side**: Adicione `` no topo de todos os arquivos de componentes interativos.

---

## 2. Desenvolvimento do Componente (Package)

Localização: `packages/design-system/src/components/[NomeDoComponente].tsx`

### Exemplo de Implementação Robusta

```tsx
;

import React from "react";
import { ConfigProvider, [NomeAntd] as Antd[Nome] } from "antd";
import type { [NomeAntd]Props as Antd[Nome]Props } from "antd";
import { designSystemColors, radius, spacing } from "../theme";

// Defina props proprietárias (ex: dsSize, variant)
export type [Nome]Props = Antd[Nome]Props & {
  dsVariant?: "primary" | "secondary";
  dsSize?: "xs" | "s" | "m";
};

export function [Nome](props: [Nome]Props): React.ReactElement {
  const { dsVariant = "primary", dsSize = "m", ...rest } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          [NomeAntd]: {
            // Customize os tokens do antd com nossos valores
            colorPrimary: designSystemColors.brand.primary[600],
            borderRadius: radius.xl,
            // ... outros tokens
          },
        },
      }}
    >
      <Antd[Nome] {...rest} />
    </ConfigProvider>
  );
}

[Nome].displayName = "[Nome]";
```

---

## 3. Exportação e Registro

1. **Local**: `packages/design-system/src/components/index.ts`
   ```ts
   export * from "./[Nome]";
   ```
2. **Global**: `packages/design-system/src/index.ts` (Onde o pacote expõe tudo para o NPM).

---

## 4. Documentação no App de Docs (Showcase)

A documentação deve ser visual, interativa e educativa.

### 4.1 Estrutura de Pastas

Crie em `apps/docs/src/sections/components/[nome-do-componente]/`:

- `index.tsx`: Onde a página do componente é montada.
- `[Nome]Playground.tsx`: (Opcional) Componente para edição de código em tempo real.

### 4.2 Uso do DemoCard

O `DemoCard` é o nosso padrão para exibir exemplos. Ele deve conter:

- **Título**: O que está sendo demonstrado (ex: "Variantes de Cores").
- **Descrição**: Texto curto explicando o comportamento ou as props.
- **Preview**: Renderização real do componente.
- **Code String**: O código fonte para que o usuário possa copiar.

### 4.3 Exemplos Interativos (Playgrounds)

Sempre que possível, adicione um **Playground** usando a biblioteca `react-live`. Isso permite que o desenvolvedor altere as props e veja o resultado na hora.

**Como implementar:**

1. Crie um arquivo de Playground baseado no `ButtonPlayground.tsx`.
2. No seu `index.tsx` da documentação, passe a string de código para o Playground.

```tsx
const codeExample = `import { [Nome] } from '@juscash/design-system';

export function Example() {
  return <[Nome] dsVariant="primary" />
}`;

// Dentro do seu Showcase
<DemoCard
  title="Playground"
  description="Experimente as propriedades do componente abaixo."
  code={codeExample}
  preview={<[Nome] dsVariant="primary" />}
/>
```

### 4.4 Foco em Props Proprietárias

A documentação deve dar destaque especial para o que **nós adicionamos** ao componente original.

- Se criamos uma prop `dsSize="xs"`, deve haver um `DemoCard` mostrando todos os tamanhos.
- Se alteramos o comportamento de um `type`, explique a diferença.

---

## 5. Integração com a Navegação

Para que sua página apareça no menu lateral:

1. **Tipos**: Adicione a chave do componente em `apps/docs/src/types/navigation.ts`.
2. **Sidebar**: Certifique-se de que a chave está no array `menuItems` em `Sidebar.tsx`.
3. **Seção**: No `ComponentsSection.tsx`, adicione o caso no `if/switch` para renderizar o seu novo componente e adicione um `Card` na lista de "Exploração" inicial.

---

## 6. Publicação e Deploy

Temos fluxos distintos para a publicação da biblioteca e para o deploy do site de documentação.

### 6.1 Publicando a Biblioteca (@juscash/design-system)

A publicação da biblioteca no GitHub Packages é disparada pela criação de uma **Tag Git** (ex: `v0.1.32`). Para facilitar, criamos scripts que automatizam esse processo.

#### Comando Automatizado:

Sempre que finalizar uma alteração e estiver pronto para publicar, execute na raiz do projeto:

```bash
# Para uma correção (patch): 0.0.1 -> 0.0.2
npm run version:publish

# Para uma nova funcionalidade (minor): 0.0.1 -> 0.1.0
npm run version:minor && npm run version:publish

# Para uma mudança incompatível (major): 0.0.1 -> 1.0.0
npm run version:major && npm run version:publish
```

**O que o script faz:**

1. Atualiza a versão no `package.json` da biblioteca.
2. Faz o `git add` e `git commit` da alteração de versão.
3. Cria uma tag local (ex: `v0.1.32`).
4. Faz o `git push` dos commits e das tags para o repositório.

Assim que o push das tags chega ao GitHub, o workflow **Publish Package** entra em ação, builda o projeto e publica no `@juscash` registry.

### 6.2 Deploy da Documentação (App de Docs)

O deploy do aplicativo de documentação (GitHub Pages) é **automático**.

- **Gatilho**: Qualquer `push` ou `merge` na branch **`main`**.
- **Processo**: O workflow **Deploy Docs** builda a biblioteca, builda o app de docs e faz o upload para o ambiente de produção.

> **Importante**: Se você alterou um componente e quer que ele apareça no site de documentação, basta dar push para a `main`. Se quer que essa alteração esteja disponível para outros projetos consumirem, você **precisa** seguir o passo 6.1 (Publicação da Biblioteca).

---

## 7. Checklist Final

- [ ] O componente estende as props do antd?
- [ ] O componente tem a diretiva ``?
- [ ] O componente está isolado via `ConfigProvider`?
- [ ] A documentação mostra exemplos de todas as **props proprietárias**?
- [ ] Existe um exemplo interativo (Playground) para o componente?
- [ ] O código de exemplo na documentação usa imports de `@juscash/design-system`?
- [ ] O componente foi registrado na navegação do app de docs?
