# Radio — Parecer técnico

> Documento de referência da análise do componente `Radio` do Design
> System Juscash.

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Design-System-Juscash` › Componentes › Radio (`4062:4957`)](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-4957)
- **Arquivo no repo:** `src/components/Radio/index.tsx`
- **Tipos:** `src/types/components/Radio/index.ts`
- **CSS Module:** `src/components/Radio/index.module.css`
- **Stories:** `src/components/Radio/Radio.stories.tsx`
- **Testes:** `src/components/Radio/Radio.test.tsx`

---

## 1. Contexto e finalidade

O `Radio` é o controle de **seleção única e mutuamente exclusiva** de
uma lista de opções. Sempre vive dentro de um `Radio.Group` (mesmo
visualmente solto, o agrupamento ocorre pelo atributo `name`).

`Radio.Group` é o subcomponente principal — coordena o estado
selecionado. `Radio.Button` (re-export Antd) é a variação visual em
estilo "segmented" que **não é usada na JusCash** (use `Segmented`
para esse caso).

`RichRadio` (em `src/components/RichRadio`) é a variação card com
label + texto secundário — coberto em parecer próprio.

---

## 2. Anatomia (Figma)

O nó raiz `4062:4957` (790×1907) contém três component sets:

| Component set | Node id      | Conteúdo                              | Dimensões        |
| ------------- | ------------ | ------------------------------------- | ---------------- |
| `radio`       | `4062:5239`  | Círculo 16×16 — estados × checked     | 128×449 (matriz) |
| `radio group` | `4062:5031`  | Layout `inline` ou `list`             | 288×267          |
| `rich radio`  | `8175:10294` | Card clicável com label + texto extra | 576×368          |

### Matriz do `radio`

- **2 estados de `checked?`** — `false` · `true`
- **7 modos de `state`** — `default` · `hover` · `focus` · `error` · `error hover` · `error focus` · `disabled`

Total de **14 símbolos**.

### `radio group`

Dois layouts:

- **`inline`** (`4062:5287`, 58×24) — radios lado a lado.
- **`list`** (`4062:5035`, 240×147) — radios empilhados verticalmente.

### `rich radio`

8 símbolos (`checked × state` 2×4 = 8). Cobertura completa em parecer
próprio.

---

## 3. Tokens extraídos do Figma

### 3.1. Dimensões

| Token            | Valor                          |
| ---------------- | ------------------------------ |
| Tamanho da caixa | 16×16                          |
| Dot interno      | 8×8 (50% do diâmetro)          |
| Border radius    | `radius.full` (círculo)        |
| Gap label↔caixa  | 8px (`spacing/2`)              |
| Tipografia label | `body/02 - 13px` Inter Regular |
| Cor label        | `text/dark` (#262626)          |

### 3.2. Cores por estado × checked

| Estado / Checked    | BG container | Borda exterior               | Dot interior                                | Foco                                                  |
| ------------------- | ------------ | ---------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| default unchecked   | `neutral.50` | `border.regular` (#d4d4d4)   | —                                           | —                                                     |
| default checked     | `neutral.50` | `border.regular`             | `button.brand.default` (#008633)            | —                                                     |
| hover unchecked     | `neutral.50` | `border.regular`             | —                                           | —                                                     |
| hover checked       | `neutral.50` | `border.regular`             | `button.brand.default`                      | —                                                     |
| focus unchecked     | `neutral.50` | `border.regular`             | —                                           | `0 0 0 3px neutral.300` (`shadow.focus`)              |
| focus checked       | `neutral.50` | `border.regular`             | `button.brand.default`                      | `0 0 0 3px neutral.300`                               |
| error unchecked     | `neutral.50` | `feedback.red.500` `#d2190b` | —                                           | —                                                     |
| error checked       | `neutral.50` | `feedback.red.500`           | `feedback.red.500`                          | —                                                     |
| error focus checked | `neutral.50` | `feedback.red.500`           | `feedback.red.500`                          | `0 0 0 3px red.300` (`#fca5a5` ≈ `shadow.focusError`) |
| disabled unchecked  | —            | `border.disabled` (#e5e5e5)  | —                                           | —                                                     |
| disabled checked    | —            | `border.disabled`            | `button.{brand,neutral}.disabled` (#d4d4d4) | —                                                     |

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.brand.primary.[600]
                                    designSystemColors.neutral.[50, 100, 300, 400, 800]
                                    designSystemColors.feedback.red.[50, 500, 900]
                                    designSystemColors.border.{regular, disabled}
src/theme/foundations/spacing     → spacing[2] (8px)
src/theme/foundations/radius      → (radius.full — implícito no antd Radio)
src/theme/foundations/shadow      → shadow.focus, shadow.focusError
src/theme/foundations/typography  → Inter 13px (body/02)
```

---

## 5. Análise da implementação atual

### 5.1. O que está correto

- **`ConfigProvider` local** com tokens proprietários. ✅
- **Prop `error`** já implementada (token e classe). ✅
- **`displayName = "Radio"`**. ✅
- **Tipos em arquivo separado** (`src/types/components/Radio/index.ts`). ✅
- **`index.module.css` já existe** (variantes de erro). ✅

### 5.2. Gaps e divergências

| #   | Gap                                                                                                                                                                                   | Severidade | Onde                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------- |
| 1   | **`RADIO_SIZE = 15`** mas Figma define **16**. Off-by-one nas dimensões da caixa.                                                                                                     | warning    | `index.tsx:8`                     |
| 2   | **Classe `ds-neutral`** aplicada como padrão — nome ambíguo e diverge do padrão `ds-radio` usado para escopo CSS. Causa overrides em `global.css` não scoped.                         | error      | `index.tsx:71`                    |
| 3   | **6+ overrides Antd em `theme/global.css`** (`.ant-radio-wrapper`, `.ant-radio-checked`, `.ant-radio-label`, `--ant-radio-radio-bg-color` no `:root` etc.). Devem ir para module.css. | error      | `theme/global.css:20, 410-435`    |
| 4   | **`Radio.Group` re-exportado direto do Antd** — mesmo bug do `Checkbox.Group`: itens internos não recebem `.ds-radio`. Precisa wrapper que aplique `.ds-radio-group`.                 | error      | `index.tsx:89`                    |
| 5   | **`colorPrimaryHover: brand.primary.800`** (e `.900` em erro) — pode escurecer visualmente no hover, mas Figma indica que **hover não muda cor**. Usar mesma cor que default.         | warning    | `index.tsx:54-55, 45-46`          |
| 6   | **Token `controlOutline` montado como string CSS** (`"0 0 0 3px ${color}"`). Antd espera só a parte do shadow ou usa `controlOutlineWidth` + `controlOutlineColor`. Simplificar.      | info       | `index.tsx:47, 56`                |
| 7   | **Sem prop `truncate`** — Checkbox tem, Radio deveria seguir mesma API. Mesmo padrão com `width`.                                                                                     | warning    | `types/components/Radio/index.ts` |
| 8   | **Sem prop `width`** — idem item 7.                                                                                                                                                   | warning    | `types/components/Radio/index.ts` |
| 9   | **Cobertura de testes mínima** (2 testes): faltam disabled, checked, error, onChange, Group seleção, controlled.                                                                      | warning    | `Radio.test.tsx`                  |
| 10  | **`mergedClassName` usa `ds-neutral` quando não-error** — string "neutral" não comunica nada (nada a ver com paleta neutral). Renomear para `ds-radio` + opcional `ds-radio-error`.   | info       | `index.tsx:71`                    |

### 5.3. Aderência às regras

| Regra                                                     | Status                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `general.max_file_lines: 300`                             | 93 linhas — ✅                                                           |
| `general.max_function_lines: 50`                          | `Radio` (~20) — ✅                                                       |
| `general.comment_language: pt-BR`                         | parcial — ✅                                                             |
| `code_quality.no_magic_numbers`                           | `RADIO_SIZE`, `DOT_SIZE`, `FOCUS_OUTLINE_WIDTH` constantes nomeadas — ✅ |
| `typescript.disallow_any`                                 | sem `any` — ✅                                                           |
| `typescript.require_return_types`                         | `React.ReactElement` declarado — ✅                                      |
| `typescript.types_in_separate_file`                       | tipos em `src/types/components/Radio/` — ✅                              |
| `architecture.frontend.max_props: 8`                      | 1 prop proprietária — ✅                                                 |
| **CLAUDE.md** — "Use `module.css` em vez de `global.css`" | ❌ 6+ overrides em `global.css`                                          |

---

## 6. Responsividade

Tamanho fixo 16×16. `Radio.Group` aceita `optionType: "default" | "button"`:

- `default` — radios circulares lado a lado / coluna.
- `button` — radios em formato de botão (segmented-style). **Recomenda-se
  usar `Segmented` no lugar — o Radio.Button do Antd não foi adaptado ao
  visual JusCash.**

Touch target 16×16 abaixo de WCAG 2.5.5 AA (24×24). Mitigado pela área
clicável do label.

---

## 7. Props proprietárias (após refactor)

| Prop       | Tipo               | Default                          | Descrição                                                                        |
| ---------- | ------------------ | -------------------------------- | -------------------------------------------------------------------------------- |
| `error`    | `boolean`          | `false`                          | Aplica paleta vermelha (`feedback.red.500`) no border/dot + sombra `focusError`. |
| `truncate` | `boolean`          | `false`                          | Trunca o label com `...` quando o texto excede a largura disponível.             |
| `width`    | `number \| string` | `undefined` (240 com `truncate`) | Limita a largura máxima do wrapper. Number = pixels; string = CSS livre.         |

---

## 8. Acessibilidade

| Critério                 | Status | Notas                                                                                    |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | Texto `#262626` sobre `#fafafa` = 16.8:1. Border `#d4d4d4` baixo contraste (mitigado).   |
| 2.1.1 Keyboard           | ✅     | `Tab` foca; `Space`/`Setas` selecionam — comportamento padrão do `<input type="radio">`. |
| 2.4.7 Focus Visible      | ✅     | Outline 3px `neutral.300` (focus) ou `red.300` (error focus).                            |
| 2.5.5 Target Size        | ⚠️     | 16×16 abaixo do 24×24. Área clicável do label compensa.                                  |
| 4.1.2 Name, Role, Value  | ✅     | `<input type="radio">` nativo. `children` vira accessible name.                          |

---

## 9. Plano de correção aplicado

| Ação                                                                                                     | Arquivo                                                            |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Corrigir `RADIO_SIZE: 15 → 16`                                                                           | `src/components/Radio/index.tsx`                                   |
| Renomear classe `ds-neutral` → `ds-radio` (sempre aplicada); manter `ds-radio-error` quando `error=true` | `src/components/Radio/index.tsx`                                   |
| Criar wrapper `Radio.Group` com `.ds-radio-group` + `ConfigProvider`                                     | `src/components/Radio/index.tsx`                                   |
| Mover overrides `.ant-radio-*` de `theme/global.css` para `src/components/Radio/index.module.css` scoped | `index.module.css`, `theme/global.css`                             |
| Hover sem mudança visual: `colorPrimaryHover` = mesma cor que `colorPrimary`                             | `index.tsx`                                                        |
| Adicionar props `truncate` + `width` (padrão Checkbox)                                                   | `index.tsx`, `types/components/Radio/index.ts`, `index.module.css` |
| Expandir testes: disabled, checked, error, onChange, Group, truncate, width, controlled                  | `Radio.test.tsx`                                                   |
| Atualizar Storybook: matriz state × checked, Group inline/list, truncate                                 | `Radio.stories.tsx`                                                |
| Criar página `/radio` em `design-system-tests` com regra estrita                                         | `design-system-tests/src/pages/radio/`                             |
| Validar WCAG via Chrome MCP                                                                              | execução                                                           |

---

## 10. Validação WCAG (resultado)

Execução via Chrome MCP + axe-core 4.10.2.

### Stories isoladas auditadas

| Story                   | Violações | Regras passadas |
| ----------------------- | --------- | --------------- |
| `default`               | 0         | 4               |
| `checked`               | 0         | 4               |
| `error`                 | 0         | 4               |
| `error-checked`         | 0         | 4               |
| `disabled`              | 0         | 4               |
| `disabled-checked`      | 0         | 4               |
| `focus`                 | 0         | 4               |
| `error-focus`           | 0         | 4               |
| `group`                 | 0         | 8               |
| `group-inline`          | 0         | 8               |
| `group-list`            | 0         | 8               |
| `truncate`              | 0         | 5               |
| `truncate-width-custom` | 0         | 5               |

### Página `/radio` em design-system-tests

- 38 instâncias renderizadas, 3 groups com `.ds-radio-group`.
- Violações: **0**
- Regras passadas: **19**

### Validação dimensional (Figma → runtime)

| Token                      | Figma     | Computed             | Status |
| -------------------------- | --------- | -------------------- | ------ |
| Tamanho da caixa           | 16×16     | 16×16                | ✅     |
| BG container default       | `#fafafa` | `rgb(250, 250, 250)` | ✅     |
| Border default (unchecked) | `#d4d4d4` | `rgb(212, 212, 212)` | ✅     |
| Dot checked (::after)      | `#008633` | `rgb(0, 134, 51)`    | ✅     |
| Border error               | `#d2190b` | `rgb(210, 25, 11)`   | ✅     |
| Truncate max-width default | 240px     | 240px                | ✅     |
| Click toggle               | -         | works ✅             | ✅     |

---

## 11. Composição com outros componentes

- **`Form` + `Form.Item`** — radio em formulários com error de validação.
- **`Radio.Group`** — wrapper para seleção exclusiva.
- **`RichRadio`** — variação card com texto secundário.
- **`Segmented`** — substituto recomendado quando o caso é "radio button" (visual segmented).

---

## 12. Referências

- Card Jira: [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- Figma — frame Radio: `4062:4957`
- Antd Radio v6: https://ant.design/components/radio
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
