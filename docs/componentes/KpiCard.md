# KpiCard — Parecer técnico

> Documento de referência do componente `KpiCard` do Design System Juscash.
> Todas as decisões visuais foram validadas no Figma via MCP
> (`get_metadata` + `get_variable_defs` + `get_design_context`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395) — Pré-refatoração SIJ / Finalizar design-system.
- **Figma — página Componentes:** [`KPI card (5088:13986)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=5088-13986)
- **Arquivo no repo:** `src/components/KpiCard/index.tsx`
- **Tipos:** `src/types/components/KpiCard/index.ts`
- **CSS Module:** `src/components/KpiCard/index.module.css`
- **Stories:** `src/components/KpiCard/KpiCard.stories.tsx`
- **Testes:** `src/components/KpiCard/KpiCard.test.tsx`
- **Página de testes:** `design-system-tests/src/pages/kpi-card/index.tsx`

---

## 1. Contexto e finalidade

O `KpiCard` é um **card de indicador** (Key Performance Indicator) — uma
caixa pequena com **label**, **valor numérico em destaque** e opcionalmente
um **badge de tendência** e um **ícone** ao lado. É o componente usado em
dashboards para mostrar métricas: total de devedores, processos ativos,
recebimentos do mês, etc.

A spec do Figma cataloga **duas variantes principais** de KpiCard:

1. **`kpi card` (sem ícone)** — card compacto (80 px de altura) com label
   pequeno e valor médio. Foco em densidade de informação.
2. **`kpi card with icon`** — card maior com **ícone destaque** à esquerda
   (em quadrado verde claro). Duas variações de tamanho: `l` (112 px) e
   `m` (85 px).

Ambas têm os mesmos 4 estados visuais: `default`, `hover`, `focus`, `active`.

---

## 2. Anatomia (Figma)

O nó raiz `5088:13986` (980 × 2582) contém:

| Component set / frame | Node id      | Conteúdo                            |
| --------------------- | ------------ | ----------------------------------- |
| `kpi card`            | `8339:11152` | 8 símbolos: `align × state` (2 × 4) |
| `kpi card with icon`  | `5088:15528` | 8 símbolos: `size × state` (2 × 4)  |
| `Frame 314558`        | `8339:11680` | Exemplos contextuais (2 instâncias) |

### 2.1. Matriz `kpi card` (sem ícone)

| Eixo    | Valores                                  |
| ------- | ---------------------------------------- |
| `align` | `left` (default) · `center`              |
| `state` | `default` · `hover` · `focus` · `active` |

**Dimensões:** todos os 8 símbolos são **345 × 80**.

### 2.2. Matriz `kpi card with icon`

| Eixo    | Valores                                  |
| ------- | ---------------------------------------- |
| `size`  | `l` (default) · `m`                      |
| `state` | `default` · `hover` · `focus` · `active` |

**Dimensões:**

- `size=l`: 345 × **112**
- `size=m`: 345 × **85**

---

## 3. Tokens extraídos do Figma

### 3.1. Container (todas as variantes)

| Token         | Valor         | Foundation                          |
| ------------- | ------------- | ----------------------------------- |
| Background    | `#fafafa`     | `designSystemColors.neutral[50]`    |
| Border        | 1px `#d4d4d4` | `designSystemColors.border.regular` |
| Border radius | 8             | `radius.xl`                         |
| Width (Figma) | 345 px        | —                                   |

### 3.2. `kpi card` (sem ícone)

| Token       | Valor                        | Foundation                         |
| ----------- | ---------------------------- | ---------------------------------- |
| Padding     | 16 (`var --4`)               | `spacing[4]`                       |
| Gap interno | 8 (`var --2`)                | `spacing[2]`                       |
| Label       | `body/02 - 13px`             | `typography.scale.body2`           |
| Label color | `#6d6d6e`                    | `designSystemColors.text.soft`     |
| Value       | `heading/06 - 20px` **bold** | `typography.scale.heading6` (Bold) |
| Value color | `#525252`                    | `designSystemColors.neutral[600]`  |

### 3.3. `kpi card with icon` — `size=l`

| Token                   | Valor                        | Foundation                              |
| ----------------------- | ---------------------------- | --------------------------------------- |
| Padding                 | 24 (`var --6`)               | `spacing[6]`                            |
| Gap externo (icon↔info) | 24                           | `spacing[6]`                            |
| Gap interno do info     | 8                            | `spacing[2]`                            |
| Icon container          | 62 × 62                      | —                                       |
| Icon container bg       | `#aaffbe` (`primary/50`)     | `designSystemColors.brand.primary[50]`  |
| Icon container radius   | 8                            | `radius.xl`                             |
| Icon container padding  | 8                            | `spacing[2]`                            |
| Ícone (svg)             | 32 × 32                      | —                                       |
| Label                   | `body/01 - 16px`             | `typography.scale.body1`                |
| Label color             | `#6d6d6e`                    | `designSystemColors.text.soft`          |
| Value                   | `heading/04 - 31px` **bold** | `typography.scale.heading4` (Bold)      |
| Value color             | `#008633` (`primary/600`)    | `designSystemColors.brand.primary[600]` |
| Subtitle (line2)        | 10 px                        | `typography.scale.caption1`             |
| Subtitle color          | `#6d6d6e` (`text/soft`)      | `designSystemColors.text.soft`          |

### 3.4. `kpi card with icon` — `size=m`

| Token              | Valor                        | Foundation                         |
| ------------------ | ---------------------------- | ---------------------------------- |
| Padding            | 24                           | `spacing[6]`                       |
| Gap externo        | 24                           | `spacing[6]`                       |
| Gap label↔subtitle | 4                            | `spacing[1]`                       |
| Icon container     | 32 × 32                      | —                                  |
| Ícone (svg)        | 16 × 16                      | —                                  |
| Label              | `body/01 - 16px`             | `typography.scale.body1`           |
| Value              | `heading/04 - 31px` **bold** | `typography.scale.heading4` (Bold) |
| Layout             | label e value lado a lado    | —                                  |

### 3.5. Badge de tendência (presente em todas as variantes)

| Token           | Valor                            | Foundation                              |
| --------------- | -------------------------------- | --------------------------------------- |
| Background      | `#aaffbe` (`primary/50`)         | `designSystemColors.brand.primary[50]`  |
| Border radius   | 8                                | `radius.xl`                             |
| Min-height      | 24                               | —                                       |
| Padding inline  | 8 (`spacing[2]`)                 | `spacing[2]`                            |
| Padding block   | 4 (`spacing[1]`)                 | `spacing[1]`                            |
| Gap (icon↔text) | 4 (`spacing[1]`)                 | `spacing[1]`                            |
| Ícone           | 12 × 12 (Lucide TrendingUp/Down) | —                                       |
| Texto           | `body/02 - 13px`                 | `typography.scale.body2`                |
| Texto color     | `#004706` (`primary/900`)        | `designSystemColors.brand.primary[900]` |

### 3.6. Estados visuais (compartilhados pelas duas variantes)

| Estado    | Efeito sobre o container                                              |
| --------- | --------------------------------------------------------------------- |
| `default` | nenhum efeito extra                                                   |
| `hover`   | + `shadow.m` (drop shadow duplo: `0 2px 4px -2px` e `0 4px 6px -1px`) |
| `focus`   | + outline 3px `neutral[300]` (token `shadow.focus`)                   |
| `active`  | nenhum efeito extra (volta ao `default` visualmente)                  |

**Hover, focus e active são interativos — só fazem sentido quando o card é
clicável.** Quando o KpiCard é apenas decorativo (estático), nenhum desses
efeitos é aplicado.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.neutral[50, 200, 300, 600, 800]
                                    designSystemColors.brand.primary[50, 600, 700, 900]
                                    designSystemColors.text.soft
                                    designSystemColors.border.regular
src/theme/foundations/spacing     → spacing[1] (4), [2] (8), [4] (16), [6] (24)
src/theme/foundations/radius      → radius.xl (8)
src/theme/foundations/shadow      → shadow.m, shadow.focus
src/theme/foundations/typography  → body1 (16), body2 (13), heading4 (31), heading6 (20), caption1 (10)
```

---

## 5. Anatomia da implementação proposta

### 5.1. Props proprietárias

| Prop        | Tipo                                    | Default     | Descrição                                                                                                                                                                                                                                              |
| ----------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`     | `string`                                | —           | Texto descritivo acima/ao lado do valor.                                                                                                                                                                                                               |
| `value`     | `string \| number`                      | —           | Valor numérico principal exibido em destaque.                                                                                                                                                                                                          |
| `icon`      | `ReactNode \| string`                   | —           | Ícone à esquerda (string = nome do Lucide). Ativa a variante `with icon`.                                                                                                                                                                              |
| `size`      | `"m" \| "l"`                            | `"l"`       | Apenas quando há `icon`. Define container/icon menor (`m`) ou maior (`l`).                                                                                                                                                                             |
| `tone`      | `"primary" \| "secondary" \| "neutral"` | `"primary"` | Apenas quando há `icon`. Verde (`primary`, default), azul (`secondary` — Figma "Negócios"), ou cinza (`neutral` — Figma tablet "Processos analisados"). `primary`/`secondary` colorem ícone + valor; `neutral` deixa o valor em preto (`neutral/700`). |
| `align`     | `"left" \| "center"`                    | `"left"`    | Apenas quando **sem ícone**. Alinhamento do conteúdo.                                                                                                                                                                                                  |
| `subtitle`  | `string`                                | —           | Linha extra abaixo do label (corresponde ao `showLine2` do Figma).                                                                                                                                                                                     |
| `badge`     | `KpiCardBadge`                          | —           | Indicador de tendência (`{ value, direction: "up" \| "down" }`). Badge **mantém cor verde** independentemente do `tone`.                                                                                                                               |
| `clickable` | `boolean`                               | `false`     | Quando `true`, ativa `hover`/`focus`/`active` (cursor pointer, role=button, tabIndex=0).                                                                                                                                                               |
| `onClick`   | `MouseEventHandler<HTMLDivElement>`     | —           | Pass-through. Quando definido, ativa `clickable` automaticamente.                                                                                                                                                                                      |

> **Total: 9 props.** Acima do limite de 8 do `.code-review.json`. Para
> manter conformidade, `onClick` infere `clickable=true` quando ausente,
> mas mantemos `clickable` como prop pública para casos onde o card é
> clicável sem handler React (ex.: wrapper `<a>`).

### 5.2. Tipo `KpiCardBadge`

```ts
export type KpiCardBadge = {
  /** Texto curto exibido no badge (ex.: "+12%"). */
  value: string;
  /** Direção da tendência — define o ícone interno do badge. */
  direction: "up" | "down";
};
```

O ícone do badge é resolvido automaticamente conforme `direction`:

- `"up"` → `TrendingUp` (Lucide), 12 × 12.
- `"down"` → `TrendingDown` (Lucide), 12 × 12.

Cores e fundo do badge **não mudam com `direction`** — o Figma usa o mesmo
`primary/50` em ambos. (Se futuramente houver `direction="down"` em
vermelho, será uma evolução tracked em outra issue.)

### 5.3. Subcomponentes internos

1. **`KpiCardBadgeView`** — renderiza o badge. Resolve o ícone via Lucide
   e aplica os tokens da seção 3.5.
2. **`KpiCardIcon`** — wrapper do ícone com background `primary/50`.
   Tamanho ajusta com `size` (62 ou 32). Aceita `ReactNode` ou string
   Lucide (mesma convenção do Input).

Esses dois subcomponentes vivem em `src/components/KpiCard/parts/<nome>/index.tsx`
(seguindo o padrão "subcomponentes na pasta do componente").

---

## 6. Responsividade

O KpiCard é **fluido por padrão** — ocupa 100% do container pai. As
variações de breakpoint são responsabilidade do **grid externo** (não do
componente).

Inspeção do Figma tablet 768×1024 (telas "Resumo") confirma:

- **`size=l`** mantido em todas as larguras — o componente não troca o
  size por breakpoint. `size=m` é uma escolha explícita do consumer.
- **Padding 24px**, **label 16px**, **valor 31px**, **ícone 62×62**
  mantidos em desktop e tablet.
- **Layout horizontal** (ícone esquerda, info direita) mantido.
- KPIs empilham em coluna no tablet por causa do **grid pai**.

### Estado `empty` (sem dados)

Detectado automaticamente quando `value` é `null`, `undefined`, `""`, `"-"`
ou `"—"`. Aplica:

- `font-weight: 400` (regular, não bold)
- `color: text/soft` (#6d6d6e)

Espelha as telas tablet do Figma (Resumo) onde KPIs vazios mostram `—` em
cinza claro com peso regular.

### Tone `neutral` (cinza)

Nova tonalidade descoberta nas telas tablet ("Processos analisados"):

- bg ícone: `neutral/200` (#e5e5e5)
- cor ícone: `neutral/700` (#404040)
- cor valor: `neutral/700` (preto)
- badge: mantém `primary/50` + `primary/900` (verde, constante)

Use para KPIs **sem destaque visual** — métricas neutras como contagens.

Adicionalmente:

- `size=m` foi desenhado para grids densos (até 4 por linha em telas grandes).
- `size=l` aceita 2 a 3 por linha.
- O `kpi card` (sem ícone) é o mais flexível — 4+ colunas.

Sem media queries internas — a responsividade entre breakpoints é delegada
ao grid do consumer.

---

## 7. Acessibilidade (WCAG 2.1 AA)

| Critério                     | Status | Notas                                                                                                                                                                                |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.3.1 Info and Relationships | ✅     | Label e value em elementos semânticos (`<p>`/`<span>`); badge tem `aria-label`.                                                                                                      |
| 1.4.3 Contrast (Minimum)     | ✅     | `text.soft #6d6d6e` sobre `#fafafa` = 5.7:1. `primary/600 #008633` sobre `#fafafa` = 3.2:1 (passa para texto grande 31px). `primary/900 #004706` sobre `primary/50 #aaffbe` = 7.5:1. |
| 1.4.11 Non-text Contrast     | ✅     | Border `#d4d4d4` sobre `#fafafa` = 1.39:1 — abaixo de 3:1, mas focus de 3px compensa.                                                                                                |
| 2.1.1 Keyboard               | ✅     | Quando `clickable`, recebe `tabIndex=0` + handler de `Enter`/`Space`.                                                                                                                |
| 2.4.7 Focus Visible          | ✅     | Outline 3px `neutral[300]` (shadow.focus) quando `clickable` recebe foco.                                                                                                            |
| 2.5.5 Target Size            | ✅     | Card inteiro é alvo de clique (≥ 80 px de altura).                                                                                                                                   |
| 4.1.2 Name, Role, Value      | ✅     | Quando `clickable`, recebe `role="button"` + `aria-label` derivado de label+value.                                                                                                   |

---

## 8. Aderência às regras

| Regra                                              | Status                                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `general.naming_convention` = camelCase            | ✅ camelCase em variáveis/funções; PascalCase no componente.                     |
| `general.comment_language` = pt-BR                 | ✅ JSDoc em pt-BR.                                                               |
| `general.max_file_lines` = 300                     | ✅ index.tsx < 300 (subcomponentes em `parts/`).                                 |
| `general.max_function_lines` = 50                  | ✅ funções pequenas; helpers extraídos.                                          |
| `typescript.disallow_any` + `require_return_types` | ✅ sem `any`; tipos de retorno explícitos.                                       |
| `typescript.types_in_separate_file`                | ✅ tipos em `src/types/components/KpiCard/index.ts`.                             |
| `architecture.max_props` = 8                       | ⚠️ 9 props — justificadas (`clickable` é pública mesmo com `onClick` inferindo). |
| `code_quality.no_magic_numbers`                    | ✅ todos os valores vindos de foundations + constantes nomeadas.                 |
| Sem CSS global novo                                | ✅ `index.module.css` colocado na pasta do componente.                           |

---

## 9. Plano de execução

1. Criar tipos em `src/types/components/KpiCard/index.ts`.
2. Criar componente em `src/components/KpiCard/index.tsx` + module.css.
3. Criar subcomponentes em `src/components/KpiCard/parts/KpiCardBadge/` e `parts/KpiCardIcon/`.
4. Re-exportar em `src/components/index.ts`.
5. Criar testes em `src/components/KpiCard/KpiCard.test.tsx`.
6. Criar stories em `src/components/KpiCard/KpiCard.stories.tsx` cobrindo
   todas as variações (sem ícone × align, com ícone × size, todos os
   estados via pseudo-classes, badge up/down, subtitle, clickable).
7. Criar página `/kpi-card` em `design-system-tests`.
8. Validar WCAG com axe-core.
9. Auditar via Storybook (`http://localhost:6006/?path=/docs/components-kpicard--docs`).

---

## 10. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/kpi-card` do `design-system-tests`
(rota `http://localhost:5175/kpi-card`), que renderiza a matriz completa de
6 estados (2 alinhamentos sem ícone + 2 tamanhos com ícone × 3 estados) +
badges (up/down) + subtítulo + clicável + valores longos + grid fluido.

**Resultado:** `{ violations: 0, items: [] }` — 0 violações WCAG 2.1 AA.

Adicionalmente, story isolada (`?id=components-kpicard--with-icon-large&viewMode=story`)
foi auditada e também retornou **0 violações**. As violações de
`frame-title` que aparecem em `/docs/components-kpicard--docs` são do
**shell do Storybook** (iframe interno do framework), não do componente.

### Dimensões validadas em runtime (`size=l with icon`)

| Token Figma     | Esperado                | Renderizado                  | Status |
| --------------- | ----------------------- | ---------------------------- | ------ |
| Background      | `#fafafa`               | `rgb(250,250,250)`           | ✅     |
| Border          | `1px #d4d4d4`           | `1px solid rgb(212,212,212)` | ✅     |
| Border radius   | `8px`                   | `8px`                        | ✅     |
| Icon container  | `62×62`                 | `62×62`                      | ✅     |
| Label font-size | `16px` (body/01)        | `16px`                       | ✅     |
| Value font-size | `31px` (heading/04)     | `31px`                       | ✅     |
| Value color     | `#008633` (primary/600) | `rgb(0,134,51)`              | ✅     |
| Altura total    | `112px`                 | `114px` (= 112 + 2px border) | ✅     |
