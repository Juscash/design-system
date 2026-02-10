# Juscash Design System

Bem-vindo ao repositório do **Juscash Design System**. Este projeto é um monorepo que contém a biblioteca de componentes proprietária da Juscash e seu respectivo site de documentação.

## 🔗 Links Úteis

- **Documentação Interativa**: [https://Juscash.github.io/design-system/](https://Juscash.github.io/design-system/)
- **Guia de Instalação**: [documentacao/instalacao/README.md](./documentacao/instalacao/README.md)
- **Guia de Criação de Componentes**: [documentacao/criacao/README.md](./documentacao/criacao/README.md)

---

## 🏗️ Estrutura do Projeto

O projeto utiliza **NPM Workspaces** para gerenciar os pacotes:

- `packages/design-system`: O núcleo da biblioteca. Construído sobre o **Ant Design 6** e estilizado com tokens proprietários da Juscash.
- `docs`: Aplicativo Vite que serve como vitrine (Showcase) e playground para os componentes.

### Principais Dependências da Biblioteca

- **React 18/19**
- **Ant Design 6** (Base técnica)
- **Lucide React** (Biblioteca única de ícones)

---

## 🚀 Como Desenvolver

### 1. Instalação

Na raiz do projeto, instale todas as dependências:

```bash
npm install
```

### 2. Rodando a Documentação Localmente

Para visualizar as alterações nos componentes em tempo real:

```bash
npm run dev
```

### 3. Build Completo

Para gerar o build da biblioteca e do site simultaneamente:

```bash
npm run build
```

---

## 🚢 Fluxo de Deploy e Publicação

### Publicação da Biblioteca (@juscash/design-system)

A biblioteca é publicada no **GitHub Packages**. O deploy é acionado via tags:

1. Finalize suas alterações.
2. Execute um dos scripts de versão:
   - `npm run version:patch` (Correções)
   - `npm run version:minor` (Novas features)
   - `npm run version:major` (Breaking changes)
3. Execute `npm run version:publish` para subir a tag e disparar o workflow de publicação automática.

### Deploy do Front-end (Documentação)

O site de documentação é hospedado no **GitHub Pages**.

- O deploy é **automático** sempre que houver um push ou merge na branch `main`.

---

## 🛠️ Tecnologias Utilizadas

- **Monorepo**: NPM Workspaces
- **Build Tool**: Tsup (biblioteca) e Vite (docs)
- **CI/CD**: GitHub Actions
- **Icons**: Lucide React
- **Autenticação de Pacotes**: GitHub Packages (@juscash scope)

---
