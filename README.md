# Juscash Design System

Bem-vindo ao repositório do **Juscash Design System**. Este projeto é a biblioteca de componentes proprietária da Juscash junto com seu site de documentação interativa.

## 🔗 Links Úteis

- **Documentação Interativa**: [https://Juscash.github.io/design-system/](https://Juscash.github.io/design-system/)
- **Guia de Instalação**: [docs/instalacao/README.md](./docs/instalacao/README.md)
- **Guia de Criação de Componentes**: [docs/criacao/README.md](./docs/criacao/README.md)

---

## 🏗️ Estrutura do Projeto

Pacote único `@juscash/design-system` no escopo Juscash, com Storybook colocado para showcase:

- `src/` — fonte da biblioteca (componentes + tema).
- `.storybook/` — config do Storybook que consome `src/` em dev e `dist/` em build.
- `docs/` — guias internos em pt-BR (criação, instalação, confluence).
- `scripts/` — versão e publicação.

### Principais Dependências da Biblioteca

- **React 18/19**
- **Ant Design 6** (base técnica)
- **Lucide React** (biblioteca única de ícones)

---

## 🚀 Como Desenvolver

### 1. Instalação

Na raiz do projeto:

```bash
npm install
```

### 2. Rodando o Storybook Localmente

Para visualizar alterações em tempo real:

```bash
npm run dev
```

Storybook sobe em `http://localhost:6006`.

### 3. Build Completo

```bash
npm run build            # builda a biblioteca (tsup -> dist/)
npm run build:storybook  # builda o showcase estático (storybook-static/)
```

### 4. Testes

```bash
npm run test:run                       # unit tests da lib (vitest + jsdom)
npm run test:storybook                 # testes do Storybook (Playwright headless)
```

---

## 🚢 Fluxo de Deploy e Publicação

### Publicação da Biblioteca (@juscash/design-system)

A biblioteca é publicada no **GitHub Packages**. O deploy é acionado via tags:

1. Finalize suas alterações.
2. Execute um dos scripts de versão:
   - `npm run version:patch` (correções)
   - `npm run version:minor` (novas features)
   - `npm run version:major` (breaking changes)
3. Execute `npm run version:publish` para subir a tag e disparar o workflow de publicação automática.

### Deploy do Front-end (Documentação)

O site de documentação é hospedado no **GitHub Pages**.

- O deploy é **automático** em todo `push`/`merge` na branch `main`.

---

## 🛠️ Tecnologias Utilizadas

- **Build da Lib**: Tsup
- **Docs/Playground**: Storybook 10 (`@storybook/nextjs-vite`)
- **Testes**: Vitest + Testing Library + Playwright
- **CI/CD**: GitHub Actions
- **Ícones**: Lucide React
- **Registry**: GitHub Packages (escopo `@juscash`)
