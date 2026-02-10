# 00. Índice da Documentação Técnica

Este documento serve como índice central para a documentação técnica do Design System no Confluence.

## Sumário

1.  **[01-INTRODUCAO.md](./01-INTRODUCAO.md): Introdução**
    - Visão Geral e Tech Stack (React, AntD 6, Vite).
    - **Storybook**: Fonte da verdade para visualização dos componentes.

2.  **[02-ARQUITETURA.md](./02-ARQUITETURA.md): Arquitetura e Configuração**
    - **Estrutura do Pacote**: Como o `index.ts` centraliza as exportações.
    - **Ant Design estendido**: Explicação sobre como re-exportamos o AntD (originais e customizados).
    - **Componentes Proprietários**: Como os componentes internos (`src/components`) são expostos.

3.  **[03-GETTING-STARTED.md](./03-GETTING-STARTED.md): Começando (Getting Started)**
    - Instalação (`@Juscash/design-system`)
    - Configuração do Provider
    - Uso Básico

4.  **[04-FUNDAMENTOS.md](./04-FUNDAMENTOS.md): Fundamentos (Design Tokens & Figma)**
    - **Referência Visual**: [Biblioteca no Figma](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash)
    - Tokens de Estilo (Cores, Tipografia, Espaçamentos).

5.  **[05-COMPONENTES.md](./05-COMPONENTES.md): Biblioteca de Componentes**
    - _Nota_: A lista completa e atualizada de componentes deve ser consultada no **Storybook**.
    - Visão geral das categorias (Ações, Navegação, Inputs, etc.) sem listar todos individualmente.

6.  **[06-STORYBOOK.md](./06-STORYBOOK.md): Storybook: Guia de Uso**
    - Rodando localmente (`npm run dev`) para desenvolvimento.
    - Acessando o ambiente de Produção (GitHub Pages).

7.  **[07-CONTRIBUICAO.md](./07-CONTRIBUICAO.md): Guia de Contribuição (Criando Componentes)**
    - **Fluxo**: Componente -> Teste -> Story.
    - **Arquitetura**: Padrão de pastas e convenções.
    - **Testes**: Guia rápido de Vitest.

8.  **[08-RELEASE-DEPLOY.md](./08-RELEASE-DEPLOY.md): Release e Deploy**
    - Versionamento (SemVer) e pipeline de publicação.

---

> **Status**: Planejamento. Os arquivos listados acima serão criados nas próximas etapas.
