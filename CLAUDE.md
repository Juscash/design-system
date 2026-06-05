# CLAUDE.md

Este arquivo fornece orientações para o Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

O foco deste documento é manter o código **clean code** e em conformidade com as regras do agente de revisão. As regras estão materializadas neste arquivo. Quaisquer convenções legadas que conflitem com elas são consideradas obsoletas e devem ser migradas quando o arquivo for tocado.

## Primeiro passo obrigatório: carregar `.code-review.json`

**Antes de qualquer outra ação no projeto**, o Claude Code deve abrir o arquivo `.code-review.json` na raiz do repositório, ler todas as regras (severidades, limites, convenções, ignores, padrões de secret, etc.) e **manter essas regras em memória durante toda a sessão**. Esse arquivo é a fonte de verdade do agente de revisão automática (`.github/scripts/code-review-agent.js`) e tem precedência sobre qualquer interpretação livre deste `CLAUDE.md`.

Procedimento esperado em toda nova conversa, antes de propor ou aplicar mudanças:

1. `Read` em `.code-review.json` (raiz do repo).
2. Internalizar os campos chave: `general.*` (limites de arquivo/função, idioma de comentário), `rules.*` (severidades por categoria), `ignore.*` (caminhos não revisados).
3. Aplicar essas regras como **gates**: se uma alteração violar uma regra `error`, ela é bloqueante e precisa ser corrigida antes de finalizar; regras `warning`/`info` viram pendências a sinalizar para o usuário.
4. Sempre que este `CLAUDE.md` divergir do `.code-review.json`, **vence o `.code-review.json`** — sinalize a divergência para o usuário decidir se atualiza o `CLAUDE.md`.

Se o arquivo não existir, avisar o usuário antes de continuar — sem ele, o agente de revisão automática (workflow `code-review-agent.yml`) aborta com exit 0 e perdemos o controle de qualidade no PR.

## Objetivo do projeto

Monorepo do **Juscash Design System** — biblioteca de componentes React (`@juscash/design-system`) consumida pelos demais produtos da JusCash, mais o site de documentação interativa (Storybook) que serve de showcase e playground.

A biblioteca é uma **camada de identidade visual sobre o Ant Design 6**: cada componente embrulha o equivalente do `antd` aplicando tokens, variantes e comportamentos próprios via `ConfigProvider` local.

## Estrutura do projeto

```
design-system/
├── src/                      # @juscash/design-system — biblioteca publicada
│   ├── components/           # Componentes UI (wrappers do antd)
│   ├── theme/                # Provider, tokens, global.css
│   └── index.ts              # API pública do pacote
├── .storybook/               # Config do Storybook (preview, main, theme)
├── docs/                     # Guias internos pt-BR (criacao, instalacao, confluence)
├── scripts/                  # Utilitários de apoio ao desenvolvimento
├── .changeset/               # Versionamento (Changesets): config + changesets pendentes
├── tsup.config.ts            # Build (ESM + CJS + d.ts + css)
├── vitest.config.ts          # Testes (projects: unit + storybook)
├── tsconfig.json
├── package.json              # Único — deps da lib + devDeps de build/storybook
└── .github/workflows/        # release.yml, deploy-docs.yml, code-review-agent.yml
```

Pacote único. Storybook colocado na raiz consome `src/` em dev e `dist/` em build via aliases do Vite. Todo trabalho de componente acontece dentro de `src/`.

## Stack obrigatória

Use apenas as bibliotecas já previstas no projeto:

- **React** 18/19 (peer)
- **TypeScript** ^5.6
- **Ant Design 6** (`antd`) — base técnica de todo componente
- **`@ant-design/cssinjs`** e **`@ant-design/nextjs-registry`** — integração de estilos no SSR de consumidores Next.js
- **Lucide React** (`lucide-react`) — único provedor de ícones
- **dayjs** (+ locale `pt-br`) — datas/locale para componentes do antd
- **Tsup** — build da biblioteca (ESM + CJS + d.ts)
- **Storybook 10** (`@storybook/nextjs-vite`) + addons `addon-docs`, `addon-a11y`, `addon-designs`, `addon-vitest`, `storybook-addon-pseudo-states` — docs e playground
- **Vitest** + **Testing Library** + **jsdom** — testes unitários da biblioteca
- **Playwright** (via `@vitest/browser-playwright`) — testes em navegador disparados pelo addon-vitest do Storybook
- **react-slick** + **slick-carousel** — dependências do componente `Carousel`

Não adicione bibliotecas externas sem necessidade real e sem justificativa técnica clara. Se for indispensável, declare como `peerDependency` quando fizer sentido (a biblioteca já trata `react` e `react-dom` assim) para evitar duplicação no consumidor.

## Comandos de build e desenvolvimento

Executar na raiz:

```bash
npm install              # instala todas as deps (lib + storybook devDeps)
npm run dev              # libera porta 6006 e sobe Storybook em http://localhost:6006
npm run build            # tsup -> dist/ (ESM + CJS + d.ts + css)
npm run build:storybook  # storybook build -> storybook-static/
npm run test             # vitest watch
npm run test:run         # vitest run (uma rodada, ambos projects)
npm run test:storybook   # apenas testes do Storybook (Playwright headless)
npm run start            # serve o Storybook estático (após build:storybook)
npm run clean            # rimraf dist storybook-static
```

> O script `lint` é placeholder (`echo "no lint configured"`). Não há ESLint configurado ainda; a verificação de qualidade roda via `npm run build` (que aciona o `tsup` com `dts: true`, gerando types e falhando em erros de tipo) e via `npm run test:run`.

## Variáveis de ambiente

- **`GITHUB_TOKEN`** (ou PAT com `read:packages`) — necessário para `npm install` quando o pacote é consumido por outro projeto, pois `@juscash/design-system` é publicado no **GitHub Packages**. O `.npmrc` do consumidor deve apontar o escopo `@juscash` para `https://npm.pkg.github.com` e ler o token via env var. **Nunca comitar token em texto plano** — use variável de ambiente.
- **`NODE_AUTH_TOKEN`** — usado pelo workflow `release.yml` para autenticar na publicação (injetado automaticamente como `${{ secrets.GITHUB_TOKEN }}`).
- **`GITHUB_PAGES=true`** — flag usada apenas no workflow `deploy-docs.yml` durante o build do Storybook para gerar paths corretos para GitHub Pages.

Não comitar `.env` real (já no `.gitignore`). Se uma nova variável aparecer, espelhe em `.env.example` para o agente de revisão validar.

## Design System: padrão de componente

**Toda UI é construída embrulhando o componente equivalente do `antd` com tokens e props proprietárias.** O `antd` nunca é exposto cru: o consumidor importa de `@juscash/design-system`.

### Anatomia esperada

Para cada componente novo:

1. **Pasta** em `PascalCase` em `src/components/<Nome>/`.
2. **Implementação**: arquivo `index.tsx` dentro da pasta, exportando o componente.
3. **Re-export**: a pasta deve ter um `index.ts` quando o componente estiver em outro arquivo; quando a implementação já estiver em `index.tsx`, dispensa o re-export.
4. **Tipos**: declarados em arquivo separado conforme a seção _TypeScript_ abaixo.
5. **Stories**: arquivo `<Nome>.stories.tsx` colocado na pasta — convenção do Storybook exige nome único para localizar os stories via glob (`**/*.stories.@(js|jsx|mjs|ts|tsx)`).
6. **Testes**: arquivo `<Nome>.test.tsx` colocado na pasta — convenção do Vitest exige nome único.
7. **CSS scoped** (opcional): `index.module.css` na própria pasta — ver seção _Estilos_.
8. **Export público**: adicionar `export * from "./<Nome>"` em `src/components/index.ts`.

### Princípios de implementação

- **Estender props do antd, nunca reduzir.** O tipo de props deve combinar `Omit` dos campos que você customiza + suas próprias props proprietárias:

  ```tsx
  type CleanAntdProps = Omit<AntdButtonProps, "type" | "size">;
  export type ButtonProps = CleanAntdProps & {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "xs" | "s" | "m";
  };
  ```

- **Isolar identidade visual via `ConfigProvider` local.** Cada componente envolve o equivalente do `antd` em `<ConfigProvider theme={{ components: { Foo: tokens } }}>`. Isso permite que o consumidor use o componente sem precisar de um provider global e impede vazamento de tema.

- **Usar tokens, não literais.** Importe `designSystemColors`, `spacing`, `radius`, `shadow`, `breakpoints` de `../../theme` e passe-os aos tokens do antd. Sem hex hardcoded, sem pixels mágicos.

- **`displayName` em todo componente exportado**: `Button.displayName = "Button"`. Facilita debug no React DevTools e no Storybook autodocs.

- **`lucide-react` é o único provedor de ícones.** Não desenhe SVGs custom se houver equivalente no Lucide; não importe ícones de outras libs.

### Theme e tokens

A camada de tema vive em `src/theme/`:

- `JuscashProvider.tsx` — wrapper que junta `AntdRegistry` + `ConfigProvider` com `colorPrimary` e locale `pt_BR`. Exportado para o consumidor envolver a app.
- `foundations/` — fonte de verdade dos tokens em TS: `colors.ts`, `spacing.ts`, `radius.ts`, `shadow.ts`, `breakpoints.ts`. Cada um exporta o objeto `as const` + o tipo derivado (`typeof`).
- `global.css` — define as **CSS variables** (`--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*`) e os overrides obrigatoriamente globais de classes nativas do antd (`.ant-*`). Essas variáveis são lidas pelos `index.module.css` dos componentes.

> **Importante:** `theme/global.css` só existe para coisas que **precisam** ser globais — definição das CSS variables e overrides em seletores do antd que não podem ser escopados via CSS Modules. Estilos próprios da camada Juscash devem ir para `index.module.css` colocado junto do componente (ver seção _Estilos_).

## Convenções de nomenclatura

- **Padrão geral:** `camelCase` para variáveis, funções, parâmetros, hooks e utils.
- **Constantes globais:** `UPPER_SNAKE_CASE`.
- **Types, interfaces e componentes:** `PascalCase`.

### Estrutura de arquivos e pastas

**Todo arquivo TypeScript/TSX criado no projeto se chama `index.ts` ou `index.tsx`.** O casing das convenções de nomenclatura aplica-se ao **nome da pasta** que contém o `index`. A única exceção são arquivos cujo nome é exigido por ferramenta externa: `<Nome>.stories.tsx` (Storybook) e `<Nome>.test.tsx` (Vitest) podem coexistir na mesma pasta.

- **Componentes:** pasta em `PascalCase` → `src/components/Button/index.tsx`.
- **Hooks:** pasta em `camelCase` com prefixo `use` → `src/hooks/useFoo/index.ts`.
- **Utils:** pasta em `camelCase` → `src/utils/formatDateTime/index.ts`.
- **Constantes:** pasta em `camelCase` → `src/constants/foo/index.ts`.
- **Tipos:** estrutura espelhada em `src/types/{components,hooks,utils,theme}/<Name>/index.ts`.

Nunca crie arquivos como `Button.tsx`, `useFoo.ts`, `button.types.ts`. Use sempre uma pasta nomeada com o símbolo, contendo `index.ts(x)`. Stories e tests são a única exceção e ficam dentro da própria pasta do símbolo.

## TypeScript

- **Proibido `any`.** Use tipos explícitos, genéricos ou `unknown` quando o tipo for desconhecido.
- **Tipos de retorno explícitos** em funções e componentes exportados (ex.: `function Button(props: ButtonProps): React.ReactElement`).
- **Tipos em arquivo separado da implementação.** Toda tipagem vive em `src/types/{components,hooks,utils,theme}/<Name>/index.ts`. Não declare props/tipos dentro do `index.tsx` do componente. Não use arquivos sufixados com `*.types.ts`.
- **Sempre importe tipos com `import type`** — o build com `tsup --dts` é estrito quanto a isso e evita imports de runtime desnecessários.

Componentes importam suas props a partir de `src/types`:

```ts
import type { ButtonProps } from "../../types/components/Button";
```

O `tsconfig.base.json` força `strict: true`, `isolatedModules: true`, `forceConsistentCasingInFileNames: true` — ou seja, qualquer regressão de tipo aparece no `npm run build`.

## Imports

Dentro do pacote, prefira imports relativos **rasos** entre módulos vizinhos. O monorepo não tem alias `@/` configurado no `tsconfig.base.json`, e o build (`tsup`) é executado a partir de `src/` — manter os imports relativos curtos é o que mantém o pacote portável e o tree-shaking previsível.

```ts
// correto (dentro do pacote @juscash/design-system)
import { designSystemColors, spacing } from "../../theme";
import { Tooltip } from "../Tooltip";
import type { ButtonProps } from "../../types/components/Button";

// incorreto
import { designSystemColors } from "../../../../theme"; // cadeia profunda demais — recolocar o arquivo
import { Button } from "antd"; // não importe antd direto na app pública
```

Já no consumidor externo, o caminho é sempre `@juscash/design-system`:

```ts
import { Button, Card, JuscashProvider, designSystemColors } from "@juscash/design-system";
import "@juscash/design-system/dist/index.css";
```

**Nunca importe `antd` diretamente em código publicável** — quebra a aplicação da identidade visual. O `antd` é dependência transitiva exposta através do barrel `src/index.ts`.

## Componentes React

- **Um componente por pasta** (`index.tsx`).
- **Sem regra de negócio em componentes.** Componentes do design-system são primitivos visuais — não conhecem domínio, não falam com API, não tocam storage.
- **Hooks em arquivos separados** dos componentes. Se um componente precisa de hook próprio, vive em `<Componente>/hooks/use<Nome>/index.ts`.
- **Hooks têm prefixo `use`.**
- **Máximo 8 props por componente.** Se ultrapassar, divida em subcomponentes ou em padrões de composição (slots).

Adicionalmente:

- Componentes visuais preferem composição (`children`, slots) a props booleanas que ramificam comportamento.
- Sempre encerre com `Component.displayName = "Component"`.
- O componente deve aceitar pelo menos `className` e `style` quando o equivalente do antd aceita, para não cortar o consumidor.

## Hooks

- Pasta em `camelCase` começando com `use`, contendo `index.ts`: `useDebounce/index.ts`, `useControlledState/index.ts`.
- Retorno e parâmetros tipados (tipos em `src/types/hooks/<Nome>/index.ts` quando exportados publicamente).
- Responsabilidade única.
- **Específicos de um componente:** ficam junto, em `<Componente>/hooks/use<Nome>/index.ts`.
- **Reutilizados por múltiplos componentes:** sobem para `src/hooks/use<Nome>/index.ts`. Não promova preventivamente — só quando o reuso for real.

## Utils

Utils ficam em `src/utils/<nome>/index.ts`, com a pasta em `camelCase`. Apenas **funções puras e reutilizáveis**. Sem JSX, sem estado React, sem regra específica de componente. Útil para coisas como `clamp`, `mergeStyles`, `getContrastColor`, helpers de token, etc.

## Constantes

Constantes compartilhadas ficam em `src/constants/<grupo>/index.ts`. Use `UPPER_SNAKE_CASE` para constantes globais.

**Sem números mágicos.** Extraia valores literais para constantes nomeadas ou para tokens (`spacing`, `radius`, etc.). Exceções permitidas: `-1, 0, 1, 2, 100, 1000`. Tudo que vier do design (tamanhos, alturas, paddings) vai para `theme/foundations` — nunca hardcoded no componente.

## Comentários e docstrings

- **Idioma:** comentários e JSDoc em **pt-BR**.
- **JSDoc obrigatório** em funções exportadas e em funções com lógica não trivial (variantes, mapas de token, parsers).
- **`TODO` sem referência clara** (issue, ticket ou motivo) é sinalizado.
- **Código comentado** é sinalizado — não deixe trechos comentados no projeto.

Código, nomes de pastas, arquivos, variáveis, funções, classes e exports ficam em **inglês**. Apenas comentários e docstrings em pt-BR.

## Estilos (CSS)

- **Proibido CSS global novo.** Toda regra de estilo nova vive em um arquivo `index.module.css` colocado na pasta do componente que a consome. Use a importação default do CSS Module (`import styles from "./index.module.css"`) e acesse via `styles.<className>`.
- **`theme/global.css` é zona reservada.** Só entram lá: (1) definição das CSS variables (`--color-*`, `--spacing-*`, etc.) e (2) overrides de seletores nativos do antd (`.ant-*`, `.ant-picker-*`, etc.) que não podem ser escopados via CSS Module. Qualquer classe própria da camada Juscash (`.ds-*`, `.juscash-*`, `.rich-*`) deve migrar para o `index.module.css` do componente correspondente quando o componente for tocado.
- **Estilo reutilizado em mais de um lugar vira componente.** Se um padrão visual (botão custom, card, badge, layout, etc.) aparecer em dois ou mais arquivos, **não** duplique o CSS nem extraia para um CSS global — extraia um componente reutilizável em `src/components/<Nome>/index.tsx` com seu próprio `index.module.css`. Os consumidores passam a importar o componente, não o CSS.
- **Use os tokens** (`designSystemColors`, `spacing`, `radius`, `shadow`, `breakpoints`) ou as CSS variables (`var(--color-neutral-300)`, `var(--spacing-4)`, etc.) dentro do `index.module.css` em vez de valores literais.
- **Evite estilos inline extensos.** Estilos inline são aceitáveis apenas para valores dinâmicos calculados em runtime que não cabem em um seletor (ex.: `style={{ height: dynamicHeight }}`).
- **Sem CSS duplicado entre módulos.** Se aparecer, extraia componente (ver regra acima).

Estrutura típica de um componente:

```
src/components/Button/
  index.tsx
  index.module.css
  Button.stories.tsx
  Button.test.tsx
```

## Stories (Storybook)

Toda alteração visual ou nova variante deve estar refletida no Storybook. Padrões esperados:

> **Cobertura TOTAL é obrigatória.** **Todas** as variações possíveis de um componente devem estar demonstradas no Storybook — sem exceção:
>
> - **Props:** cada prop proprietária e cada valor relevante (ex.: `size` em `xs/s/m/l`, cada `variant`, cada `picker`, cada `headerVariant`).
> - **Funcionalidade:** cada modo/comportamento (ex.: editável, navegação, seleção, abrir/selecionar, callbacks) — via interação real.
> - **Estilização:** cada estado/variação visual (estados de célula, hover/focus reais, popups, tooltips, etc.).
>
> Não basta a variação existir no código: ela **tem que** estar visível e exercitável no Storybook. Se uma variação só aparece via interação (ex.: header dentro do popup), adicione **também** uma story de _showcase_ que a renderize de forma visível (sem forçar `open`/pseudo-state persistente — renderizando o subcomponente ou compondo o exemplo).

- **Localização:** `<Componente>/<Nome>.stories.tsx` (o glob do Storybook em `.storybook/main.mts` aponta para `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`).
- **`title`:** `"Components/<Nome>"` (ou outra categoria — veja `addon-docs/blocks` para subcategorias).
- **`tags: ["autodocs"]`** para gerar a aba _Docs_ automaticamente.
- **`parameters.design`** apontando para o node do Figma (`type: "figma"`, `url: "..."`). Isso ativa o `@storybook/addon-designs/blocks` no painel.
- **`parameters.docs.description.component`** com uma descrição em pt-BR contendo: link para a doc do antd correspondente, props proprietárias, exemplo de uso copiável.
- **Cobertura mínima:** uma story `Default`, uma story por variante proprietária (`type`/`variant`/`size`), e uma `Playground` controlada por args.
- **Pseudo-estados:** quando o componente tem hover/focus/active estilizados, use `storybook-addon-pseudo-states` para expor esses estados como controles (ex.: `pseudo-focus-visible`).

Antes de mergear, abra o Storybook (`npm run dev`) e valide a story na aba _Docs_ — controles devem refletir todas as variantes; estados de erro/disabled devem estar visíveis.

## Testes

Toda alteração de comportamento ou nova lógica deve estar coberta. Padrões esperados:

- **Localização:** `<Componente>/<Nome>.test.tsx` (Vitest acha pelo padrão `src/**/*.test.{ts,tsx}`).
- **Stack:** Vitest + `@testing-library/react` + `@testing-library/jest-dom` (matchers via `vitest.setup.ts`).
- **Cobertura mínima:** renderização da variante default, todas as variantes proprietárias, estados `disabled` / `error` / `loading` quando existirem, callbacks (`onClick`, `onChange`) e classNames/atributos que o componente promete.
- **Rodar local:** `npm run test:run -w @juscash/design-system` antes de commitar.
- **Testes do Storybook (Playwright):** `npm run test:docs` na raiz roda as stories em browser headless via `@storybook/addon-vitest`. Use para regressão visual e a11y; configurações em `docs/vitest.config.ts`.

## Limites duros

- **Arquivo:** máximo **300 linhas** (excluindo `<Nome>.stories.tsx` e `<Nome>.test.tsx`).
- **Função:** máximo **50 linhas**.
- **Parâmetros por função:** máximo **4**.
- **Props por componente:** máximo **8**.
- **Complexidade ciclomática por função:** máximo **10**.
- **Sem ternários aninhados.**

Componentes que ultrapassam o limite de linhas devem ser quebrados em subcomponentes ou ter mapas de tokens extraídos para `utils/` ou para `theme/foundations/`.

## Qualidade de código

- Sem `console.log` em código de produção.
- Sem `debugger`.
- Sem números mágicos (exceto `-1, 0, 1, 2, 100, 1000`).
- Sem ternários aninhados.
- Sem `any` desnecessário.
- Sem código comentado.
- Sem imports mortos.
- Sem duplicação óbvia.
- Sem regra de negócio em componentes.
- Componentes sempre encerram com `displayName`.

`tsconfig.json` do pacote força `strict`, e o `tsup` com `dts: true` gera os tipos no build — o build quebra com imports/parâmetros não usados ou erro de tipo.

## Verificação antes de finalizar

Antes de finalizar qualquer alteração:

```bash
npm run build:design-system                # tsup com dts: faz type-check e gera artefatos
npm run test:run -w @juscash/design-system # testes da biblioteca
npm run build:docs                         # garante que o Storybook compila com a alteração
```

Se mudou comportamento visual, suba o Storybook (`npm run dev`) e valide a story do componente alterado.

## Padrão esperado para novas entregas

1. Criar ou atualizar tipos em `src/types/.../<Name>/index.ts`.
2. Criar componente, hook ou util em pasta própria com `index.ts(x)` dentro.
3. Adicionar `index.module.css` colocado quando houver estilo próprio; usar tokens/CSS variables em vez de literais.
4. Adicionar/atualizar `<Nome>.stories.tsx` cobrindo Default + variantes proprietárias + Playground, com link do Figma em `parameters.design`.
5. Adicionar/atualizar `<Nome>.test.tsx` cobrindo render, variantes, estados e callbacks.
6. Re-exportar em `src/components/index.ts` (ou no barrel correspondente).
7. Manter funções ≤ 50 linhas, arquivos ≤ 300 linhas, props ≤ 8, parâmetros ≤ 4.
8. Sem `any`, sem `console.log`, sem `debugger`, sem código comentado.
9. JSDoc em pt-BR para funções exportadas.
10. Rodar `npm run build:design-system`, `npm run test:run -w @juscash/design-system` e `npm run build:docs`.

## Arquivos ignorados pelo agente de revisão

Os caminhos abaixo **não** são revisados:

- `*.test.ts`, `*.spec.ts`, `*.test.tsx`, `*.spec.tsx`
- `**/__tests__/**`
- `**/*.stories.tsx`, `**/*.stories.ts`
- `**/migrations/**`, `**/generated/**`
- `**/dist/**`, `**/build/**`, `**/.next/**`, `**/storybook-static/**`
- `**/node_modules/**`
- `package-lock.json`, `yarn.lock`, `*.lock`

Configuração do agente vive em `.github/workflows/code-review-agent.yml` e `.github/scripts/code-review-agent.js`.

## Arquitetura

### Composição global e provider

`src/theme/JuscashProvider.tsx` é o componente que o consumidor envolve em volta da app. Internamente:

1. **`AntdRegistry`** (`@ant-design/nextjs-registry`) — extrai o CSS-in-JS do antd no SSR (apps Next.js no App Router).
2. **`ConfigProvider`** (`antd`) — aplica o tema base (`colorPrimary` da brand primary 400, fontFamily `--font-primary`) e o locale `pt_BR` customizado (com overrides em `Table` para textos de ordenação).
3. **`dayjs.locale("pt-br")`** — chamado no módulo para garantir que os componentes de data renderizem em pt-BR.

O consumidor pode passar `themeOverride` para sobrescrever tokens pontuais, que são merged sobre o tema base.

### Camadas e fluxo

| Camada                    | Localização                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| Foundation tokens (TS)    | `src/theme/foundations/*.ts`                    |
| Theme provider            | `src/theme/JuscashProvider.tsx`                 |
| CSS variables + overrides | `src/theme/global.css`                          |
| Componentes UI            | `src/components/<Nome>/index.tsx`               |
| API pública (barrel)      | `src/index.ts`                                  |
| Showcase                  | `.storybook/` + stories colocadas em `src/**/*.stories.tsx` |
| Automação/scripts         | `scripts/`                                                             |

`src/index.ts` é a única fronteira pública. Tudo que precisa ser usado por consumidores externos passa por aqui — inclusive re-exports controlados do `antd` (componentes que a biblioteca aceita "passar adiante" como `Form`, `Modal`, `Drawer`, `Popover`, etc.) e o agregador `LucideIcons` (`export * as LucideIcons from "lucide-react"`).

### Build da biblioteca (tsup)

`tsup.config.ts` produz, a partir de `src/index.ts`:

- `dist/index.js` (CJS) e `dist/index.mjs` (ESM)
- `dist/index.d.ts` (types — `dts: true`)
- `dist/index.css` (cópia do `src/theme/global.css` via hook `onSuccess`)
- `dist/*.map` (sourcemaps)

`react`, `react-dom`, `antd` e `@ant-design/cssinjs` ficam como **external** — o consumidor é quem provê. `treeshake: true` + `splitting: false` mantém o bundle previsível.

O arquivo CSS é exposto pelo `package.json` em `"./dist/index.css": "./dist/index.css"` e deve ser importado pelo consumidor (ex.: `import "@juscash/design-system/dist/index.css"`). O `JuscashProvider` carrega `antd/dist/reset.css` internamente.

### Storybook

`.storybook/main.mts` configura o Storybook com `@storybook/nextjs-vite`. Em **DEVELOPMENT** os aliases apontam para `src/` (hot reload do código fonte); em **build** apontam para `dist/` (bundle real). `AntdRegistryMock` evita problemas do `nextjs-registry` fora de um app Next real.

`.storybook/preview.ts` envolve toda story em `<JuscashProvider>`, define o locale e configura viewports (mobile/tablet/desktop) e o addon `a11y` em modo `todo`.

### Publicação da biblioteca

Versionamento e publicação são **automáticos**, via **Changesets** (`.github/workflows/release.yml`, disparado em `push` na `main`). Não há bump manual de versão, nem criação de tag, nem `npm publish` manual. Fluxo:

1. **No PR**: o dev roda `npm run changeset` e commita o arquivo gerado em `.changeset/` descrevendo o tipo de mudança (`patch`/`minor`/`major`) e um resumo.
2. **Ao mergear o PR na `main`**: o `changesets/action` abre (ou atualiza) um PR automático **"Version Packages"** que sobe a versão no `package.json` e atualiza o `CHANGELOG.md` (consumindo os changesets pendentes via `npm run version:packages` = `changeset version`).
3. **Ao mergear o "Version Packages" PR**: a próxima execução do workflow roda `npm run release` (`changeset publish`), que builda (`prepublishOnly` → `tsup`), publica em **GitHub Packages** (`https://npm.pkg.github.com`, escopo `@juscash`, `NODE_AUTH_TOKEN` = `GITHUB_TOKEN` do Actions) e cria a tag git correspondente.

A config do Changesets vive em `.changeset/config.json` (`baseBranch: main`, changelog via `@changesets/changelog-github`). O bump entra por **PR**, nunca por push direto — compatível com a `main` protegida sem precisar de PAT. **Pré-requisito de repositório** (uma vez): em _Settings → Actions → General → Workflow permissions_, habilitar **Read and write permissions** e **Allow GitHub Actions to create and approve pull requests**.

Não publique manualmente. Se precisar reverter, libere uma nova versão (patch) acima da última — não despublique.

### Deploy do Storybook (GitHub Pages)

Workflow `.github/workflows/deploy-docs.yml`. Dispara automaticamente em `push` ou `merge` na branch `main`:

1. Builda a biblioteca (`npm run build`).
2. Builda o Storybook (`npm run build:storybook` com `GITHUB_PAGES=true`).
3. Faz upload de `storybook-static` para o ambiente do GitHub Pages.

Se alterou um componente e quer que apareça no site, é só dar push para `main`. Se quer que outros projetos consumam a alteração, **precisa publicar** (seção acima) — o site reflete o código de `main`, não a última versão publicada do pacote.
