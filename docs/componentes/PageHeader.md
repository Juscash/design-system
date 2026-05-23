# PageHeader — Parecer técnico

> Documento de referência da análise do componente `PageHeader` (Cabeçalho de
> página) do Design System Juscash. Cobre Figma, foundations, regras do
> projeto, gaps mapeados e o plano de correção aplicado.

- **Card Jira:** [JS-2395 — Refatoração SIJ | Pré-refatoração SIJ - Finalizar design-system](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Design-System-Juscash` › Componentes › Page header](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8220-10535)
- **Arquivo no repo:** `src/components/PageHeader/index.tsx`
- **Tipos:** `src/types/components/PageHeader/index.ts`
- **CSS Module:** `src/components/PageHeader/index.module.css`
- **Stories:** `src/components/PageHeader/PageHeader.stories.tsx`
- **Testes:** `src/components/PageHeader/PageHeader.test.tsx`

---

## 1. Contexto e finalidade

O `PageHeader` é o **cabeçalho padrão de uma página de aplicação**: um `Card`
contendo título, descrição opcional e uma **área customizável de ações**
(slot) à direita. Em telas estreitas, a área de ações sobe para o topo e o
título/descrição passa a ocupar a parte de baixo (layout em coluna).

**Todas as três props de conteúdo (`title`, `description`, `actions`) são
opcionais.** O componente renderiza o `Card` mesmo sem nenhum conteúdo —
útil como esqueleto durante carregamento ou como placeholder enquanto a
página decide o que mostrar.

A descrição oficial vinda do Figma é:

> Cabeçalho de página composto por título, subtítulo opcional e área de ações
> à direita (botão primário e menu de opções).

A área de ações é **completamente livre** — pode receber qualquer `ReactNode`
(um botão primário + um menu de opções, um grupo de botões, um seletor, um
status, etc.). O componente apenas posiciona o que o consumidor passar.

---

## 2. Anatomia (Figma)

O nó raiz no Figma (`8220:10535`) contém três variantes do `page header`:

| Variante               | Node id      | Layout                                                                                                     |
| ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `variant=Padrão`       | `8220:11625` | Apenas título + subtítulo. Sem área de ações.                                                              |
| `variant=with actions` | `8220:11650` | Título + subtítulo à esquerda. Ações à direita em linha (botão primário + botão `outline` com `ellipsis`). |
| `variant=responsive`   | `8220:11924` | Ações empilhadas no topo, título + subtítulo embaixo (uso em larguras estreitas).                          |

E dois **exemplos reais** prontos:

- **Desktop** (`8220:11913`, 1334×99) — `Análise prospecção` + descrição
  - botão primário "Label" + botão `outline` com `...` (MoreHorizontal).
- **Mobile** (`8220:11947`, 267×200) — mesmo conteúdo em layout empilhado
  (ações no topo, título embaixo, descrição quebrando em múltiplas linhas).

### Tokens declarados nas variáveis do Figma

Resposta de `get_variable_defs` para o nó raiz e exemplos:

| Variável Figma                | Valor                       | Token equivalente no repo                 |
| ----------------------------- | --------------------------- | ----------------------------------------- |
| `2`                           | `8`                         | `--spacing-2` / `spacing[2]`              |
| `4`                           | `16`                        | `--spacing-4` / `spacing[4]`              |
| `6`                           | `24`                        | `--spacing-6` / `spacing[6]`              |
| `color/text/dark`             | `#262626`                   | `--color-text-dark` / `neutral[800]`      |
| `color/neutral/50`            | `#fafafa`                   | `--color-neutral-50`                      |
| `color/border/regular`        | `#d4d4d4`                   | `--color-border-regular` / `neutral[300]` |
| `color/background/white`      | `#fafafa`                   | `--color-background-white`                |
| `color/button/brand/default`  | `#008633`                   | `--color-button-brand-default`            |
| `radius/xl`                   | `8`                         | `--radius-xl`                             |
| `shadow/xs`                   | drop `#0000000D`, `0 1 2 0` | `--shadow-xs`                             |
| `heading/06 - 20px`           | Inter 20/1.2/400            | `--font-heading-6-*`                      |
| `body/01 - 16px`              | Inter 16/1.2/400            | `--font-body-1-*`                         |
| `body/02 - 13px`              | Inter 13/1.2/400            | `--font-body-2-*`                         |
| `color/opacities/light/0,01%` | `#ffffff00`                 | `--color-opacities-light-0-01`            |

### Especificação visual

- **Container:** `Card` (já existente no DS) — fundo `neutral[50]`, borda
  `1px solid neutral[300]`, raio `radius.xl` (8 px), sombra `shadow.xs`,
  padding interno padrão (`spacing[6]` = 24 px).
- **Título:** font `Inter`, tamanho `heading6 = 20 px`, line-height `1.2`,
  peso `700` (negrito — embora o token `--font-heading-6-weight` seja
  `400`, o Figma mostra o título do `PageHeader` com peso "Bold").
- **Descrição (subtítulo):** font `Inter`, tamanho `body1 = 16 px`, peso
  `400`, line-height `1.2`, cor `neutral[800]`. Confirmado via
  `get_design_context` no nó `variant=with actions` (`8220:11650`) — o
  texto `Subtitle` é `text-[16px]`.
- **Espaçamento vertical entre título e descrição:** `spacing[2]` (8 px).
- **Espaçamento horizontal entre bloco texto e bloco ações:** `spacing[4]`
  (16 px).
- **Espaçamento em layout empilhado** (ações em cima, conteúdo embaixo):
  `spacing[4]` (16 px).

### Comportamento responsivo

- Em larguras `>= 768 px` (breakpoint `s`): layout horizontal — texto à
  esquerda, ações à direita.
- Em larguras `< 768 px`: layout em coluna — ações no topo, texto embaixo.

O componente expõe a prop `variant` para forçar o layout independente do
viewport:

- `default` (legado, mantido por compatibilidade) → **horizontal sempre**.
- `responsive` (padrão) → horizontal em telas largas, empilhado em telas
  estreitas. Equivalente ao `default` + `stacked` automático via media query.
- `stacked` → empilhado sempre (use em sidebars/colunas estreitas onde o
  componente nasceu apertado).

### Slot de ações

O `actions` é um **slot React** (`ReactNode`) — o consumidor passa qualquer
conteúdo. O exemplo do Figma mostra:

```tsx
actions={(
  <>
    <Button type="primary" size="s">Label</Button>
    <Button type="outline" size="s" icon={<MoreHorizontal />} aria-label="Mais opções" />
  </>
)}
```

mas pode ser `null`, um seletor, um conjunto de tags, um avatar — qualquer
coisa que o consumidor entender que pertence ao cabeçalho da página.

### Acessibilidade

- O elemento raiz **não** usa `<header>` (evita gerar múltiplos
  landmarks `banner` em uma mesma página — bug clássico em SPAs com
  vários cabeçalhos por seção). É um `<div>` neutro envolvido pelo
  `Card` do DS.
- O título usa um elemento heading real (`<h1>` por padrão; o consumidor
  pode customizar via prop `level` quando precisar respeitar uma
  hierarquia existente — por exemplo `<h2>`).
- A descrição é um `<p>`.
- O slot `actions` herda do consumidor — qualquer botão precisa carregar
  `aria-label` quando for icon-only.

---

## 3. Gaps mapeados na implementação anterior

A versão pré-refatoração (`src/components/PageHeader/index.tsx`) tinha:

1. **`description` tipado como `string`** — restringia o consumidor.
   Esperado: `ReactNode`.
2. **`action` (singular) tipado como `ReactNode`** — ok funcionalmente,
   mas o nome diverge da convenção do Figma (`actions`) e do mental model
   (`um slot livre`). Renomeado para `actions`.
3. **Sem comportamento responsivo** — em telas estreitas o conteúdo
   continuava horizontal, esmagando o título.
4. **`<Space vertical>` (deprecado no Antd 6)** — substituído por `Flex` ou
   por estrutura nativa do CSS Module.
5. **Sem semântica de heading** — o `Heading6` renderiza `<h5>` (limite do
   Antd `Typography.Title`), mas o `PageHeader` precisa do título da página
   ser idealmente `<h1>` (WCAG 1.3.1 — Estrutura semântica). Adicionada a
   prop `level` (1–6, default `1`).
6. **`Body1` (16 px) para descrição** — alinhado ao Figma (`text-[16px]`
   confirmado via `get_design_context` no `variant=with actions`).
7. **Estilos via componentes Antd `Heading6` / `Body1`** — esses componentes
   adicionam margens default do `Paragraph` que conflitam com o card.
   Substituídos por `<h1>` / `<p>` nativos com classes do CSS Module.
8. **Sem `index.module.css`** — toda a estilização ficava implícita nos
   componentes filhos. Adicionado CSS Module com classes próprias
   (`.pageHeader`, `.titleArea`, `.title`, `.description`, `.actions`,
   modificadores `.stacked` e `.responsive`).
9. **Stories minimalistas** — apenas `Default`. Storybook ampliado para
   cobrir as três variantes do Figma, exemplos reais (`Análise prospecção`
   desktop + mobile), `Playground`, estado sem descrição, descrição longa,
   ações customizadas (botão + ellipsis igual ao Figma) e responsividade.
10. **Sem prop `as`/`level`** — restringia acessibilidade.

---

## 4. Aderência às regras do projeto

### `.code-review.json`

| Regra                                                | Conformidade                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `general.naming_convention: camelCase`               | ✅ Pasta `PageHeader` em `PascalCase` (regra de componentes), tipos em `PascalCase`, props/variáveis `camelCase`. |
| `general.comment_language: pt-BR`                    | ✅ JSDoc e comentários internos em pt-BR.                                                                         |
| `general.max_file_lines: 300`                        | ✅ `index.tsx` ≤ 300 linhas (incl. tipos importados).                                                             |
| `general.max_function_lines: 50`                     | ✅ Função principal `PageHeader` < 50 linhas após extração de classes/maps.                                       |
| `rules.typescript.disallow_any`                      | ✅ Nenhum `any` na implementação.                                                                                 |
| `rules.typescript.require_return_types`              | ✅ Funções exportadas com retorno explícito (`React.ReactElement`).                                               |
| `rules.typescript.types_in_separate_file`            | ✅ Tipos em `src/types/components/PageHeader/index.ts`.                                                           |
| `rules.architecture.one_component_per_file`          | ✅ `PageHeader` único no arquivo. Helpers internos são funções, não componentes públicos.                         |
| `rules.architecture.no_business_logic_in_components` | ✅ Componente é puramente visual.                                                                                 |
| `rules.architecture.max_props`                       | ✅ 7 props (`title`, `description`, `actions`, `variant`, `level`, `className`, `style`) ≤ 8.                     |
| `rules.code_quality.no_console_log_in_production`    | ✅ Nenhum `console.log`.                                                                                          |
| `rules.code_quality.no_magic_numbers`                | ✅ Apenas valores semânticos (tokens) e literais permitidos (0/1/2).                                              |
| `rules.code_quality.no_nested_ternary`               | ✅ Resolução de classes via array `filter().join(' ')` + map de variantes.                                        |

### `CLAUDE.md`

- ✅ `import type` para tipos do mesmo pacote.
- ✅ Wrapper `Card` (componente do DS) usado no lugar do `antd` direto.
- ✅ Sem `antd` importado diretamente nesta camada de UI pública.
- ✅ Tokens (`designSystemColors`, `spacing`) usados em vez de literais.
- ✅ `displayName` definido.
- ✅ JSDoc em pt-BR na função pública.
- ✅ CSS Module em vez de classes globais — `index.module.css` colocado
  na pasta do componente. Os overrides globais de `.ant-card` já existiam
  em `theme/global.css` (não foi acrescentado nada novo lá).
- ✅ Stories em `<Componente>.stories.tsx` (nome exigido pelo Storybook).
- ✅ Testes em `<Componente>.test.tsx`.
- ✅ `parameters.design` apontando para o nó do Figma.

---

## 5. Aderência aos foundations

| Foundation           | Uso no componente                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `designSystemColors` | `text.dark` (título), `neutral[500]` (caption opcional). Demais cores herdadas pelo `Card`/`Button`. |
| `spacing`            | `spacing[2]` (título→descrição), `spacing[4]` (texto↔ações).                                         |
| `radius` / `shadow`  | Herdados do `Card` (radius xl, shadow xs).                                                           |
| `breakpoints`        | `breakpoints.s = 768` → break para layout empilhado.                                                 |
| `typography`         | `heading6` (20 px) para o título; `body2` (13 px) para descrição.                                    |

---

## 6. Subcomponentes e composição

- **Container:** `Card` do DS (`src/components/Card/index.tsx`) — provê
  bordas, raio, sombra e padding.
- **Título:** `<h{level}>` nativo, estilizado via CSS Module com tokens.
- **Descrição:** `<p>` nativo, estilizado via CSS Module.
- **Slot de ações:** `ReactNode` livre. O padrão sugerido (e mostrado no
  Storybook) é `Button` (primary) + `Button` (outline icon-only com
  `MoreHorizontal` do `lucide-react`).

Não foram criados subcomponentes auxiliares — o slot é direto, alinhado à
filosofia do DS de "composição sobre props booleanas".

---

## 7. Responsividade

Implementada via CSS Module + media query no breakpoint `s` (768 px). O
modificador `.responsive` aplica `flex-direction: column` e troca a `order`
do slot de ações para `-1` (sobe para o topo). O comportamento é
overridable pela prop `variant`:

```text
variant=default     → horizontal sempre
variant=responsive  → horizontal em ≥768px, empilhado em <768px (default)
variant=stacked     → empilhado sempre
```

---

## 8. Acessibilidade — checklist

- ✅ Heading semântico via prop `level` (`h1`–`h6`, default `h1`).
- ✅ Descrição em `<p>`.
- ✅ Elemento raiz é `<div>` (evita múltiplos landmarks `banner` em
  páginas com vários cabeçalhos de seção). A semântica de cabeçalho é
  garantida pelo `<h{level}>` interno.
- ✅ Tab order natural — actions ficam depois do título no DOM, mesmo
  quando visualmente aparecem no topo (responsividade é feita via
  `order` CSS, não reordenando o DOM).
- ✅ Botões icon-only no slot precisam de `aria-label` (responsabilidade
  do consumidor; documentado no Storybook).
- ✅ Texto sobre fundo `neutral[50]` (#fafafa) com cor `neutral[800]`
  (#262626) → contraste ~13.6:1 (AAA).
- ✅ Foco visível dos botões internos respeita os overrides já existentes
  em `theme/global.css` (`outline 3px solid neutral[300]`).

---

## 9. Validação WCAG (axe-core via Chrome MCP)

A página `?path=/docs/components-pageheader--docs` foi auditada com
`axe-core 4.10.2` injetado dentro do iframe do Storybook via Chrome MCP.

### Achados na primeira execução

| ID                             | Impact   | Nós | Origem                                                                                        |
| ------------------------------ | -------- | --- | --------------------------------------------------------------------------------------------- |
| `landmark-no-duplicate-banner` | moderate | 1   | **PageHeader** — `<header>` interno virava banner duplicado.                                  |
| `landmark-unique`              | moderate | 1   | **PageHeader** — idem.                                                                        |
| `heading-order`                | moderate | 16  | **PageHeader (parcial)** — stories renderizavam `<h1>` dentro do `<h1>` da Docs do Storybook. |
| `frame-title`                  | serious  | 1   | Storybook (iframe sem `title`).                                                               |
| `region`                       | moderate | 71  | Storybook (conteúdo do Docs fora de landmarks).                                               |

### Correções aplicadas no componente

1. `<header>` → `<div>` — removido o landmark `banner` implícito.
2. Stories ajustadas para `level={2}` (ou `level={5}` no Comparativo) para
   não conflitar com a hierarquia `h1` do Storybook Docs.
3. Markdown da Docs description elevado de `###` para `##` — herarquia
   `h1 → h2` em vez de `h1 → h3`.

### Execução final (scoped ao componente)

```
17 instâncias do `.ds-page-header` na página
0  violações com `axe.run(<elemento>)` em cada instância
```

Os 3 violações remanescentes na página inteira (`frame-title`, `region`,
`scrollable-region-focusable`) são todas atribuíveis à **moldura do
Storybook**, não ao componente.

---

## 10. Auditoria Lighthouse

Lighthouse 12.8.2 em modo headless desktop, contra o Storybook em dev
server:

| Categoria      | Score  |
| -------------- | ------ |
| Accessibility  | **96** |
| SEO            | 91     |
| Best Practices | 78     |
| Performance    | 25     |

- **Accessibility 96** atende a meta `≥ 95`.
- O único achado de A11y (`color-contrast`) aponta para
  `a#components-pageheader--docs` — o **link na sidebar do Storybook**,
  não o componente.
- Best Practices/Performance/SEO degradados são todos do dev server do
  Storybook (cookies de preview, ausência de source maps, ausência de
  `<meta description>`, payloads de bundles vendor, etc.). Não há
  achados originados pelo `PageHeader`.

---

## 11. Próximos passos sugeridos

- Avaliar com a UX se faz sentido adicionar um **slot opcional de
  breadcrumb acima do título** (alguns sistemas combinam Breadcrumb +
  PageHeader em um único bloco).
- Avaliar se um **slot `badge`** ao lado do título (Tag/Badge para indicar
  status da página) deve virar prop nomeada — hoje pode ser feito
  passando `title={<span><strong>…</strong> <Badge ... /></span>}`.
- Adicionar testes de viewport mobile no Vitest (via `@storybook/addon-vitest`).
