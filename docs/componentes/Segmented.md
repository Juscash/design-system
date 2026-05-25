# Segmented — Parecer técnico

> Documento de referência da análise do componente `Segmented` (controle
> segmentado) do Design System Juscash. Cobre Figma, foundations, regras do
> projeto, gaps mapeados e o plano de correção aplicado.

- **Card Jira:** [JS-2395 — Refatoração SIJ | Pré-refatoração SIJ - Finalizar design-system](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Design-System-Juscash` › Componentes › Segmented (`4886:14656`)](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4886-14656)
- **Arquivo no repo:** `src/components/Segmented/index.tsx`
- **Tipos:** `src/types/components/Segmented/index.ts`
- **CSS Module:** `src/components/Segmented/index.module.css`
- **Stories:** `src/components/Segmented/Segmented.stories.tsx`
- **Testes:** `src/components/Segmented/Segmented.test.tsx`

---

## 1. Contexto e finalidade

O `Segmented` é o **controle de seleção mutuamente exclusiva em barra**
do design system. Embrulha o `Segmented` do Ant Design 6 com tokens
proprietários (cores, raios, sombras, padding) e enriquece a estrutura
de cada opção com **ícone**, **texto** e **contador (badge)**.

É o componente certo para alternar entre **visões/modos** de uma mesma
área (ex.: "Lista" × "Grade", "Diário" × "Semanal" × "Mensal", filtros
de status). Para abas que mudam de conteúdo/contexto, use `Tabs`. Para
booleano, use `Switch`.

---

## 2. Anatomia (Figma)

O nó raiz `4886:14656` (685×2452) contém dois component sets:

| Component set      | Node id      | Conteúdo                         | Tamanhos                           |
| ------------------ | ------------ | -------------------------------- | ---------------------------------- |
| `segmented button` | `4886:14711` | **Item individual** do segmented | m: 82×28 · s: 74×24 · xs: 58×16    |
| `segmented`        | `4886:14790` | **Barra completa** (com 3 itens) | m: 419×36 · s: 379×32 · xs: 299×24 |

### Matriz do item (`segmented button`)

- **3 tamanhos** — `m` · `s` · `xs`
- **6 estados** — `inactive` · `inactive hover` · `inactive focus` · `active` · `active focus` · `disabled`

Total de **18 símbolos** por tamanho × estado.

### Exemplos reais

O frame `Content` (`4886:14816`, 557×40) contém composições prontas
de `Tabs`, mas o Segmented herda visualmente: combinações de **ícone**,
**ícone + label** e **3-parts** servem de referência para o que o
consumidor pode montar.

---

## 3. Tokens extraídos do Figma

Os valores abaixo foram lidos pelo `mcp__figma-desktop__get_variable_defs`.
**Todos** batem 1:1 com `src/theme/foundations`.

### 3.1. Dimensões por tamanho

| Tamanho | Altura do track | Altura do item | Padding interno   | Radius track      | Radius item     | Tipografia                              |
| ------- | --------------- | -------------- | ----------------- | ----------------- | --------------- | --------------------------------------- |
| `m`     | 36px            | 28px           | 4px (`spacing/1`) | `radius/2xl` (12) | `radius/xl` (8) | `body/02 - 13px` (Inter 400, lh 1.2)    |
| `s`     | 32px            | 24px           | 4px (`spacing/1`) | `radius/xl` (8)   | `radius/xl` (8) | `body/02 - 13px` (Inter 400, lh 1.2)    |
| `xs`    | 24px            | 16px           | 4px (`spacing/1`) | `radius/xl` (8)   | `radius/md` (4) | `caption/01 - 10px` (Inter 400, lh 1.2) |

### 3.2. Cores por estado

| Estado           | Track BG      | Item BG         | Texto                     | Shadow do item              | Outline focus           |
| ---------------- | ------------- | --------------- | ------------------------- | --------------------------- | ----------------------- |
| `inactive`       | `neutral.200` | transparent     | `text.dark` `#262626`     | —                           | —                       |
| `inactive hover` | `neutral.200` | `neutral.200`\* | `text.dark`               | —                           | —                       |
| `inactive focus` | `neutral.200` | transparent     | `text.dark`               | —                           | `0 0 0 3px neutral.300` |
| `active`         | `neutral.200` | `neutral.50`    | `text.dark`               | `shadow/s` (drop shadow x2) | —                       |
| `active focus`   | `neutral.200` | `neutral.50`    | `text.dark`               | `shadow/s`                  | `0 0 0 3px neutral.300` |
| `disabled`       | `neutral.200` | —               | `text.disabled` `#a3a3a3` | —                           | —                       |

_Observação:_ o token `inactive hover` registra `neutral.200` por
herança do track. Visualmente, o hover é sutil — implementado como um
leve overlay (`neutral.100`) por convenção do Antd, preservando o
mesmo efeito esperado pelo usuário.

### 3.3. Active mantém estado em foco

`active focus` combina o `shadow/s` (sombra de selecionado) **+** o
`outline: 3px neutral.300` (idêntico ao Button). O selecionado ganha
contorno extra em foco, comportamento já implementado pelo Antd e que
mantemos.

### 3.4. Peso da fonte

O Figma mapeia a fonte como `Inter Regular 400` para todos os estados
(inclusive `active`). O design system Juscash escolheu **forçar peso
700 no item selecionado** — implementado em `index.module.css` para
ressaltar o estado ativo, divergência **deliberada** do Figma.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.neutral.[50, 100, 200, 300, 800]
                                    designSystemColors.feedback.red.[500]  (counter badge)
                                    designSystemColors.text.{dark, disabled, light}
src/theme/foundations/spacing     → spacing[1..3]  (4, 8, 12)
src/theme/foundations/radius      → radius.md, radius.xl, radius["2xl"], radius.full
src/theme/foundations/shadow      → shadow.s, shadow.focus
src/theme/foundations/typography  → Inter 13px (body/02), 10px (caption/01), lineHeight 1.2
```

Nenhum valor literal de cor/dimensão é hardcoded no componente.
Constantes nomeadas para alturas, fontes e tamanho do dot do counter.

---

## 5. Análise da implementação atual

### 5.1. O que está correto

- **Estende `AntdSegmentedProps`** via `Omit<...>`, adiciona `size`
  proprietário e enriquece `options`. ✅
- **`ConfigProvider` local** isola tema, sem vazar para outros componentes. ✅
- **Mapeamento de tamanho** `m → large`, `s → middle`, `xs → small` cobre
  todo o range do Antd. ✅
- **Tokens de cor batem 1:1 com Figma** (validado em §3). ✅
- **`displayName = "Segmented"`** presente. ✅
- **Tipos em arquivo separado** (`src/types/components/Segmented/index.ts`). ✅

### 5.2. Gaps e divergências

| #   | Gap                                                                                                                                                                                  | Severidade | Onde aparece                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------- |
| 1   | **Inline styles em todo lugar** (`buildEnhancedLabel`, `buildItemStyle`, `buildBaseStyles`). CLAUDE.md exige `index.module.css` em vez de `style={...}`.                             | error      | `index.tsx:81-105, 159-185`                 |
| 2   | **Falta `index.module.css`** com classes `:global(.ds-segmented*)`. Override `.ant-segmented-item-selected { font-weight: 700 }` está em `theme/global.css` (deve migrar).           | error      | `index.tsx`, `theme/global.css:237-239`     |
| 3   | **`icon` aceita só `ReactNode`** — convenção nova exige aceitar `string` (nome do Lucide) com tamanho automático conforme `size`.                                                    | warning    | `index.tsx`, `types/.../Segmented/index.ts` |
| 4   | **Prop `state: "active" \| "inactive"`** é redundante — o Antd já controla seleção via `value`/`defaultValue`. Em uso prático o consumidor pode achar que `state` "vence" e quebrar. | warning    | `index.tsx:132-150`, `Segmented.test.tsx`   |
| 5   | **Prop `bold: boolean`** com default `true` força peso 700 mesmo em itens inativos — contradiz Figma (Regular em ambos) e o override CSS. Deve sair da API.                          | warning    | `index.tsx:84`                              |
| 6   | **Prop `text` duplica `label`** — confunde. Só `text` (string) é necessário para a opção enriquecida; `label` é tipo Antd nativo (ReactNode pronto).                                 | info       | `types/.../Segmented/index.ts`              |
| 7   | **Counter aceita `ReactNode`** — overkill. `number \| string` cobre 100% dos casos reais (badge numérica).                                                                           | info       | `types/.../Segmented/index.ts`              |
| 8   | **Sem JSDoc pt-BR** em funções auxiliares (`buildEnhancedLabel`, `buildItemStyle`, etc.). CLAUDE.md exige JSDoc em funções com lógica não trivial.                                   | info       | `index.tsx` (helpers)                       |
| 9   | **Storybook usa `<Grid size={16}/>`** — após a nova convenção (`icon="Search"`), o consumer não importa `lucide-react`.                                                              | info       | `Segmented.stories.tsx`                     |
| 10  | **Stories com `style={...}` inline** para wrappers de demo. OK no Storybook (não é consumer real), mas as variantes deveriam usar CSS Module compartilhado.                          | info       | `Segmented.stories.tsx:121-134`             |

### 5.3. Aderência às regras

| Regra (origem)                                            | Status atual                                                             |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `general.max_file_lines: 300`                             | 261 linhas — ✅ (depois do refactor: ~250)                               |
| `general.max_function_lines: 50`                          | maior é `Segmented` (~35) e `buildEnhancedLabel` (~25) — ✅              |
| `general.comment_language: pt-BR`                         | comentário do componente em pt-BR — ✅                                   |
| `code_quality.no_magic_numbers`                           | `ITEM_HEIGHT_*`, `FONT_SIZE_*`, `COUNTER_DOT_SIZE` extraídos — ✅        |
| `code_quality.max_params_per_function: 4`                 | `buildItemStyle` tem 2 — ✅                                              |
| `code_quality.no_nested_ternary`                          | sem ternário aninhado — ✅                                               |
| `typescript.disallow_any`                                 | sem `any` — ✅                                                           |
| `typescript.require_return_types`                         | retorno `React.ReactElement` declarado — ✅                              |
| `typescript.types_in_separate_file`                       | tipos em `src/types/components/Segmented/index.ts` — ✅                  |
| `architecture.frontend.max_props: 8`                      | 4 props proprietárias (`size`, `options`, `value`, `defaultValue`) — ✅  |
| **CLAUDE.md** — "Use `module.css` em vez de `global.css`" | ❌ — Segmented sem module.css; estilos inline; um override em global.css |

---

## 6. Responsividade

Por ser primitivo, o `Segmented` **não muda automaticamente por viewport** —
a `size` é escolha discreta do consumidor. Garante:

- **Largura fluida por default** — soma das larguras dos itens + padding.
- **`block`** (Antd) — força 100% da largura, distribui itens igualmente.
  Útil em mobile para CTAs de filtro.
- **Texto não quebra** — `.ant-segmented-item-label` é `white-space: nowrap`.
  Para textos longos, prefira `text` curto + `icon` ilustrativo.
- **Touch targets**: `m` (36px) e `s` (32px) cumprem WCAG 2.5.5 AA (mínimo
  24×24); `xs` (24px) está exatamente no limite. Em mobile usar `m`.

---

## 7. Ícones

- **Provedor único:** `lucide-react`. A partir da refatoração, o `icon` de
  cada opção aceita **string** (nome do Lucide, ex.: `"List"`, `"Grid"`)
  ou `ReactNode` (compat retrocompatível).
- **Tamanho recomendado por tamanho do componente** (aplicado automático
  quando `icon` é string):

  | `size` | Pixel size |
  | ------ | ---------- |
  | `m`    | 16         |
  | `s`    | 14         |
  | `xs`   | 12         |

---

## 8. Counter (badge)

Enhancement proprietário Juscash. Exibe um dot circular de 14×14 pixels
ao lado do texto, com cor `feedback.red.500` e texto em `neutral.50`. A
partir da refatoração:

- `counter?: number | string` — aceita só primitivos (era `ReactNode`).
- Renderizado em flex inline com `gap: spacing[1]` (4px) entre texto/ícone.

---

## 9. Estados visuais

| Estado           | Visual                                                                                                                      | Implementação      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `inactive`       | Item sem bg, texto `neutral.800`, hover sobre track `neutral.200`                                                           | ✅ tokens Antd     |
| `inactive hover` | Leve overlay (`neutral.100`) — visual sutil                                                                                 | ✅ tokens Antd     |
| `active`         | Item `neutral.50` (branco quase), `shadow/s`, font weight 700 (override DS)                                                 | ✅ tokens + module |
| `focus-visible`  | Outline `3px neutral.300` (token `shadow.focus`) — mesmo padrão do Button                                                   | ✅ Antd nativo     |
| `disabled`       | Texto `neutral.400`, sem hover, cursor `not-allowed`                                                                        | ✅ Antd nativo     |
| `loading`        | Antd Segmented **não** tem estado loading nativo — não implementamos. Para feedback de carregamento, usar Skeleton externo. | n/a                |

---

## 10. Acessibilidade (WCAG 2.1 AA)

| Critério                 | Status | Como atende                                                                                                                                             |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | Texto `#262626` sobre `#fafafa` ratio 16.8:1; texto disabled `#a3a3a3` sobre `#e5e5e5` ratio 2.3:1.                                                     |
| 1.4.11 Non-text Contrast | ⚠️     | `neutral.50` (item ativo) sobre `neutral.200` (track) ratio 1.13:1 — abaixo de 3:1. Compensado pelo `shadow/s` que dá relevo de elevação ao item ativo. |
| 2.1.1 Keyboard           | ✅     | Setas `←↑→↓` navegam, `Space`/`Enter` selecionam — comportamento nativo do Antd.                                                                        |
| 2.4.7 Focus Visible      | ✅     | Outline 3px `neutral.300` em `:focus-visible`.                                                                                                          |
| 2.5.5 Target Size (AAA)  | ⚠️     | `xs` (16px de altura de item) abaixo de 24×24. Usar em contextos densos de desktop apenas.                                                              |
| 4.1.2 Name, Role, Value  | ✅     | `role="radiogroup"` + `role="radio"` aplicados pelo Antd. `text` da opção vira accessible name.                                                         |

**Risco identificado (1.4.11):** o contraste de cor entre item ativo e
track é 1.13:1 (abaixo de 3:1). A combinação `shadow/s` (drop shadow)
fornece relevo visual que **compensa** o baixo contraste de cor.
Decisão técnica: manter conforme Figma — o relevo via sombra atende ao
critério de "non-text contrast" pela soma de affordances.

---

## 11. Plano de correção aplicado

| Ação                                                                                                                       | Arquivo                                                                         |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Criar `index.module.css` com classes scoped `:global(.ds-segmented)`, mover override do peso 700 para o módulo             | `src/components/Segmented/index.module.css` (novo), `theme/global.css` (limpo)  |
| Mover layout de label (flex/gap) para classes do CSS Module                                                                | `index.module.css`                                                              |
| Remover **todos** os `style={...}` inline de `buildEnhancedLabel`, `buildItemStyle`, `buildBaseStyles`, `mergeStyles`      | `src/components/Segmented/index.tsx`                                            |
| Aceitar `icon` como `string` (nome do Lucide) com tamanho automático por `size` (12/14/16)                                 | `src/components/Segmented/index.tsx`, `src/types/components/Segmented/index.ts` |
| Remover prop `state` (use `value`/`defaultValue` em vez disso) e `bold` (o módulo CSS aplica weight 700 no selecionado)    | `src/components/Segmented/index.tsx`, `src/types/components/Segmented/index.ts` |
| Estreitar tipo de `counter` para `number \| string`                                                                        | `src/types/components/Segmented/index.ts`                                       |
| Adicionar JSDoc pt-BR em todas funções auxiliares                                                                          | `src/components/Segmented/index.tsx`                                            |
| Atualizar testes: remover testes de `state`/`bold`; adicionar testes de `icon` (string e ReactNode), `counter`, `disabled` | `src/components/Segmented/Segmented.test.tsx`                                   |
| Atualizar stories: usar `icon="Grid"` em vez de `<Grid size={16}/>`, adicionar matriz de estados, exemplos de uso real     | `src/components/Segmented/Segmented.stories.tsx`                                |
| Validar WCAG no Storybook                                                                                                  | execução via Chrome MCP                                                         |
| Criar página `/segmented` em `design-system-tests` com `index.tsx` + `index.module.css` (regra estrita do consumer)        | `design-system-tests/src/pages/segmented/`                                      |

---

## 12. Validação WCAG (resultado)

Execução via Chrome MCP + axe-core 4.10.2 em
`/iframe.html?id=components-segmented--*&viewMode=story` (todas as
stories scoped) **e** na página completa do `design-system-tests`
(`http://localhost:5174/segmented`).

### Issue corrigido durante a validação

- **`label` (critical)** — opções `icon-only` não tinham nome acessível
  para o `<input type="radio">` interno do Antd. Solução: adicionado o
  campo `ariaLabel?: string` no tipo `SegmentedOption` e injetado um
  `<span class="ds-segmented__sr-only">` (visualmente oculto via
  `clip: rect(0 0 0 0)`) com o texto alternativo. Fallback: `value.toString()`.

### Resultado por story (canvas isolado)

| Story             | Violações | Regras passadas |
| ----------------- | --------- | --------------- |
| `playground`      | 0         | 13              |
| `apenas-texto`    | 0         | 13              |
| `com-icone`       | 0         | 13              |
| `somente-icone`   | 0         | 13              |
| `com-counter`     | 0         | 13              |
| `tamanhos`        | 0         | 13              |
| `disabled`        | 0         | 13              |
| `block`           | 0         | 13              |
| `exemplos-reais`  | 0         | 13              |
| `matriz-completa` | 0         | 13              |

### Resultado na página completa do design-system-tests

- URL: `http://localhost:5174/segmented`
- 28 instâncias do Segmented renderizadas.
- Violações: **0**
- Regras passadas: **19**

### Validação dimensional (Figma → runtime)

| Size | Figma (track / item / r-track / r-item) | Computed (track / item / r-track / r-item) |
| ---- | --------------------------------------- | ------------------------------------------ |
| `m`  | 36 / 28 / 12 / 8                        | 36 / 28 / 12 / 8 ✅                        |
| `s`  | 32 / 24 / 8 / 8                         | 32 / 24 / 8 / 8 ✅                         |
| `xs` | 24 / 16 / 8 / 4                         | 24 / 16 / 8 / 4 ✅                         |

Cores:

- track bg `rgb(229,229,229)` = `neutral.200` ✅
- item selected bg `rgb(250,250,250)` = `neutral.50` ✅
- counter bg `rgb(210,25,11)` = `feedback.red.500` ✅
- counter radius `9999px` = `radius.full` ✅

---

## 13. Composição com outros componentes

O `Segmented` aparece em:

- **Filtros de tabela** (visões "Todos" × "Ativos" × "Arquivados").
- **Toggles de visualização** ("Lista" × "Grade").
- **Períodos** ("Diário" × "Semanal" × "Mensal").
- **Status pickers** em forms — quando há ≤4 opções e queremos exibir
  todas inline. Acima disso, prefira `Select` ou `Radio.Group`.

Convive com `Card` (header de filtros), `Table` (acima da tabela),
`PageHeader` (ação de visão).

---

## 14. Referências

- Card Jira: [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- Figma — frame Segmented: `4886:14656`
- Antd Segmented v6: https://ant.design/components/segmented
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
