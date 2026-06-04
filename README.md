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
- `scripts/` — scripts de versionamento e apoio à publicação.
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

### O que dispara a publicação? (leia primeiro)

Este é o ponto que mais confunde: **mergear na `main` NÃO publica o pacote.** A publicação é disparada **apenas quando você empurra uma tag** `vX.Y.Z`. E quem builda e publica é o **GitHub Actions** (na nuvem) — não o seu PC.

O que cada ação faz:

| O que você faz | Publica o pacote? | Atualiza o site de docs? |
| --- | --- | --- |
| `push` numa branch `feature/...` | ❌ não | ❌ não |
| merge na `develop` | ❌ não | ❌ não |
| merge na `main` | ❌ não | ✅ sim (deploy automático) |
| **`push` da tag `vX.Y.Z`** | ✅ **sim** | ❌ não |

Então são **dois passos independentes**:

1. **Levar o código e a nova versão até a `main`** (via PR): isso atualiza o **site de documentação**, mas **não publica** o pacote.
2. **Criar e empurrar a tag**: é isto que **publica** o pacote no GitHub Packages.

> **Fluxo do projeto:** `feature/...` → `develop` → `main`. As branches `develop` e `main` são **protegidas** — nelas só entra via **Pull Request (PR)**.
>
> ⚠️ **Não** use `npm run version:publish`: ele tenta dar `push` direto na branch protegida e é bloqueado.

### Publicar uma nova versão (passo a passo)

**1. Criar uma branch a partir da `develop`:**

```bash
git checkout develop
git pull
git checkout -b feature/bump-1.0.0
```

**2. Subir o número da versão** (só edita o `package.json`, não publica):

```bash
npm run version:patch    # correção:  0.1.43 -> 0.1.44
npm run version:minor    # feature:    0.1.43 -> 0.2.0
npm run version:major    # breaking:   0.1.43 -> 1.0.0
```

**3. Commitar e subir a branch:**

```bash
git add package.json
git commit -m "chore: bump para v1.0.0"
git push -u origin feature/bump-1.0.0
```

**4. Abrir os PRs e mergear:** primeiro `feature/bump-1.0.0` → `develop`, depois `develop` → `main`.

**5. Criar a tag na `main` (isso publica):**

```bash
git checkout main
git pull
git tag v1.0.0
git push origin v1.0.0
```

A tag dispara o workflow **"Publish Package"** (aba **Actions** no GitHub). Quando ficar verde, está publicado. ✅

**Resumo:** a versão entra por **PR** (`feature → develop → main`); a publicação dispara pela **tag** na `main`.

### Deploy da documentação (site)

O site de documentação (Storybook) é hospedado no **GitHub Pages** e faz deploy **automático** a cada `push`/`merge` na branch `main`.

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
