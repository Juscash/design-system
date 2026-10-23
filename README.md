# Juscash Design System

O **Juscash Design System** (`@juscash/design-system`) é a biblioteca de componentes React da Juscash — uma camada de identidade visual sobre o **Ant Design 6**, publicada no **GitHub Packages**. O repositório também contém o site de **documentação interativa** (Storybook), usado como showcase e playground.

## 🔗 Links úteis

- **Documentação interativa (Storybook)**: [https://Juscash.github.io/design-system/](https://Juscash.github.io/design-system/)
- **Guia de instalação e uso**: [docs/instalacao/README.md](./docs/instalacao/README.md)
- **Guia de criação de componentes**: [docs/criacao/README.md](./docs/criacao/README.md)
- **Documentação técnica** (arquitetura, fundamentos, release): [docs/confluence/](./docs/confluence/)

---

## 📦 Usar em outro projeto

A biblioteca é privada (GitHub Packages), então o projeto consumidor precisa se autenticar.

**1.** Crie um `.npmrc` na raiz do projeto consumidor:

```text
@juscash:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> `GITHUB_TOKEN` é um Personal Access Token com permissão `read:packages`, lido de uma variável de ambiente — **nunca** commitado.

**2.** Instale o pacote:

```bash
npm install @juscash/design-system
```

**3.** Envolva a aplicação no `JuscashProvider` e importe o CSS:

```tsx
import { JuscashProvider } from "@juscash/design-system";
import "@juscash/design-system/dist/index.css";
```

Passo a passo completo (Next.js, ícones, solução de problemas) no [guia de instalação](./docs/instalacao/README.md).

---

## 🏗️ Estrutura do repositório

- `src/` — código da biblioteca (componentes + tema); é o que vira `dist/` na publicação.
- `.storybook/` — configuração do Storybook (consome `src/` em dev e `dist/` no build).
- `docs/` — guias em pt-BR: instalação, criação de componentes e documentação técnica (`confluence/`).
- `scripts/` — utilitários de apoio ao desenvolvimento.
- `.changeset/` — anotações de versão (Changesets); é o que define a próxima versão da lib.
- `.github/workflows/` — CI: publicação do pacote e deploy da documentação.

---

## 🚀 Desenvolvimento

> **Requisito:** Node.js **20 ou superior**.

```bash
npm install              # instala as dependências (lib + Storybook)
npm run dev              # sobe o Storybook em http://localhost:6006
npm run build            # builda a biblioteca (tsup -> dist/)
npm run build:storybook  # builda o site de docs estático (storybook-static/)
npm run test:run         # roda os testes (Vitest)
npm run test:storybook   # roda só os testes de Storybook (navegador headless)
```

> Os testes de Storybook rodam num navegador real (Playwright). Na **primeira vez**, instale o browser: `npx playwright install`.

---

## 🚢 Publicação e Deploy

A publicação da nova versão é **automática**. Você **nunca** mexe no número da versão à mão, **nunca** cria tag e **nunca** roda `npm publish`. Quem faz tudo isso é o **GitHub Actions** (na nuvem), usando o **Changesets**.

A sua única tarefa nova é: **em todo PR que muda a lib, adicionar um "changeset"** dizendo o que mudou. O resto é automático.

### Como funciona (visão geral)

```
você cria feature/... a partir da main
        │  coda + roda `npm run changeset`
        ▼
   abre o PR  →  outro dev aprova e faz merge na main
        │
        ▼
[CI] abre um PR automático chamado "Version Packages"
     (ele sobe a versão no package.json + atualiza o CHANGELOG)
        │  um dev revisa e faz merge desse PR
        ▼
[CI] publica no GitHub Packages e cria a tag  ✅
```

> **Branches:** só existe a `main`, e ela é **protegida** — nada entra direto, só via **Pull Request (PR)**.

O que cada ação faz:

| O que você faz | Publica o pacote? | Atualiza o site de docs? |
| --- | --- | --- |
| `push` numa branch `feature/...` | ❌ não | ❌ não |
| merge do seu PR na `main` | ❌ ainda não — o CI abre o PR **"Version Packages"** | ✅ sim |
| merge do PR **"Version Packages"** | ✅ **sim** (automático) | ✅ sim |

### Passo a passo (publicar uma nova versão)

**1. Criar uma branch a partir da `main`:**

```bash
git checkout main
git pull
git checkout -b feature/minha-mudanca
```

**2. Fazer o seu trabalho** (código, correção, novo componente...) e commitar normalmente.

**3. Registrar o que mudou (o "changeset"):**

```bash
npm run changeset
```

O comando vai perguntar:

- **Qual o tipo da mudança?**
  - `patch` → correção de bug ou ajuste pequeno (ex.: `1.0.0` → `1.0.1`)
  - `minor` → nova funcionalidade que **não quebra** nada (ex.: `1.0.0` → `1.1.0`)
  - `major` → mudança que **quebra** compatibilidade (ex.: `1.0.0` → `2.0.0`)
- **Um resumo** do que mudou (vira uma linha no CHANGELOG).

Isso cria um arquivinho dentro de `.changeset/`. **Adicione e commite esse arquivo junto com o seu código:**

```bash
git add .
git commit -m "feat: minha mudança"
git push -u origin feature/minha-mudanca
```

> Mudou algo que afeta quem usa a lib? Precisa de changeset. Mexeu só em docs/CI (não afeta o pacote publicado)? Não precisa — pode pular o passo 3.

**4. Abrir o PR e pedir review.** Outro dev aprova e faz **merge na `main`**.

**5. Não faça mais nada.** Ao mergear, o CI abre **sozinho** um PR chamado **"Version Packages"** (na aba **Pull requests**). Ele já sobe a versão no `package.json` e atualiza o `CHANGELOG.md` — junta todos os changesets pendentes.

**6. Revisar e mergear o "Version Packages".** Quando esse PR for mergeado, o CI **publica o pacote no GitHub Packages e cria a tag** automaticamente. Acompanhe na aba **Actions** (workflow **"Release"**); quando ficar verde, está publicado. ✅

**Resumo:** você só **adiciona um changeset** no seu PR. Subir a versão, gerar CHANGELOG, criar a tag e publicar é tudo automático.

### Deploy da documentação (site)

O site de documentação (Storybook) é hospedado no **GitHub Pages** e faz deploy **automático** a cada `push`/`merge` na branch `main` (independente da publicação do pacote).

### ⚙️ Configuração necessária no repositório (uma vez só)

Para o CI conseguir abrir o PR **"Version Packages"**, um admin precisa habilitar, em
**Settings → Actions → General → Workflow permissions**:

1. **Read and write permissions**.
2. **Allow GitHub Actions to create and approve pull requests**.

Não é preciso criar token nem secret — o `GITHUB_TOKEN` padrão do Actions já basta.

---

## 🛠️ Stack

- **Base de UI**: Ant Design 6 (`antd`)
- **Ícones**: Lucide React (provedor único)
- **Linguagem**: TypeScript 5
- **React**: 18/19 (peer dependency)
- **Build da lib**: tsup (ESM + CJS + types + CSS)
- **Docs/playground**: Storybook 10 (`@storybook/nextjs-vite`)
- **Testes**: Vitest + Testing Library + Playwright
- **CI/CD**: GitHub Actions
- **Registro**: GitHub Packages (escopo `@juscash`)
