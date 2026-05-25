# Checkbox — Parecer técnico

> Documento de referência da análise do componente `Checkbox` do Design
> System Juscash. Cobre Figma, foundations, regras do projeto, gaps
> mapeados e o plano de correção aplicado.

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Design-System-Juscash` › Componentes › Checkbox (`4052:2075`)](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2075)
- **Arquivo no repo:** `src/components/Checkbox/index.tsx`
- **Tipos:** `src/types/components/Checkbox/index.ts`
- **CSS Module:** `src/components/Checkbox/index.module.css`
- **Stories:** `src/components/Checkbox/Checkbox.stories.tsx`
- **Testes:** `src/components/Checkbox/Checkbox.test.tsx`

---

## 1. Contexto e finalidade

O `Checkbox` é o controle binário (marcado/não marcado) com suporte ao
estado **indeterminate** (intermediário) usado em árvores e seleções
parciais. Embrulha o `Checkbox` do Ant Design 6 com tokens proprietários
e adiciona a prop `error` para representar validação inválida.

`Checkbox.Group` é exposto como sub-componente (re-export direto do
Antd, mantendo a inferência de tipo genérico do consumidor).

O **`RichCheckbox`** (em `src/components/RichCheckbox`) é uma variação
estendida — card clicável com label + texto secundário — coberto em
parecer próprio.

---

## 2. Anatomia (Figma)

O nó raiz `4052:2075` (790×1968) contém três component sets:

| Component set    | Node id     | Conteúdo                              | Dimensões        |
| ---------------- | ----------- | ------------------------------------- | ---------------- |
| `checkbox`       | `4051:2163` | Caixa 16×16 — estados × checked       | 192×448 (matriz) |
| `checkbox group` | `4051:2219` | Layout `inline` ou `list`             | 288×264          |
| `rich checkbox`  | `4051:2242` | Card clicável com label + texto extra | 576×368          |

### Matriz do `checkbox`

- **3 estados de `checked?`** — `false` · `true` · `indeterminate`
- **7 modos de `state`** — `default` · `hover` · `focus` · `error` · `error hover` · `error focus` · `disabled`

Total de **19 símbolos** mapeados (combinações úteis — disabled não tem
focus, error hover é mesma cor que error etc.).

### `checkbox group`

Dois layouts:

- **`inline`** (`4051:2220`, 58×24) — checkboxes lado a lado.
- **`list`** (`4051:2226`, 240×144) — checkboxes empilhados verticalmente.

### `rich checkbox`

8 símbolos (`checked × state` 2×4 = 8). Cobertura completa em parecer
próprio.

---

## 3. Tokens extraídos do Figma

Os valores abaixo foram lidos pelo `mcp__figma-desktop__get_variable_defs`.

### 3.1. Dimensões

| Token            | Valor                          |
| ---------------- | ------------------------------ |
| Tamanho da caixa | 16×16                          |
| Border radius    | `radius/md` (4px)              |
| Ícone interno    | 12×12 (em indeterminate)       |
| Gap label↔caixa  | 8px (`spacing/2`)              |
| Tipografia label | `body/02 - 13px` Inter Regular |
| Cor label        | `text/dark` (#262626)          |

### 3.2. Cores por estado × checked

| Estado / Checked    | BG da caixa                                         | Borda                                         | Ícone (✓ ou —)                       |
| ------------------- | --------------------------------------------------- | --------------------------------------------- | ------------------------------------ |
| default unchecked   | `neutral.50` `#fafafa`                              | `border.regular` `#d4d4d4`                    | —                                    |
| default checked     | `button.brand.default` `#008633`                    | — (sem borda)                                 | `neutral.50` `#fafafa`               |
| default indeterm.   | `button.brand.default` `#008633`                    | —                                             | `neutral.50` `#fafafa` (traço)       |
| hover unchecked     | `neutral.50`                                        | `border.regular`                              | —                                    |
| hover checked       | (same)                                              | —                                             | (same)                               |
| focus unchecked     | `neutral.50`                                        | `border.regular`                              | + `focus` shadow `#d4d4d4 spread 3`  |
| focus checked       | `button.brand.default`                              | —                                             | + `focus` shadow                     |
| error unchecked     | `neutral.50`                                        | `feedback.red.500` `#d2190b`                  | —                                    |
| error checked       | `feedback.red.500` `#d2190b`                        | —                                             | `neutral.50`                         |
| error focus uncheck | `neutral.50`                                        | `feedback.red.500`                            | + `focus-error` `#D2190B66 spread 3` |
| error focus checked | `feedback.red.500`                                  | —                                             | + `focus-error`                      |
| disabled unchecked  | —                                                   | `border.disabled` `#e5e5e5` (= `neutral.200`) | —                                    |
| disabled checked    | `button.brand.disabled` `#d4d4d4` (= `neutral.300`) | —                                             | `neutral.50`                         |
| disabled indeterm.  | `button.brand.disabled`                             | —                                             | `neutral.50`                         |

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.brand.primary.[600]
                                    designSystemColors.neutral.[50, 100, 200, 300, 800]
                                    designSystemColors.feedback.red.[500, 900]
                                    designSystemColors.border.{regular, disabled}
src/theme/foundations/spacing     → spacing[2] (8px)
src/theme/foundations/radius      → radius.md (4px)
src/theme/foundations/shadow      → shadow.focus, shadow.focusError
src/theme/foundations/typography  → Inter 13px (body/02)
```

---

## 5. Análise da implementação atual

### 5.1. O que está correto

- **Estende `AntdCheckboxProps`** via interseção e adiciona `error`. ✅
- **`ConfigProvider` local** com tokens proprietários quando há erro. ✅
- **`Checkbox.Group`** re-exportado direto do Antd preservando inferência. ✅
- **`controlInteractiveSize: 16`** — bate com Figma. ✅
- **`borderRadiusSM: radius.md`** (4px) — bate. ✅
- **JSDoc no componente** (parcial). ✅
- **`index.module.css` já existe** — só para variantes de erro. ✅
- **`displayName = "Checkbox"`**. ✅

### 5.2. Gaps e divergências

| #   | Gap                                                                                                                                                                                          | Severidade | Onde                                 |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| 1   | **15+ overrides Antd em `theme/global.css`** (`.ant-checkbox-*`, `.pseudo-focus-visible .ant-checkbox-inner` etc.). CLAUDE.md exige que **vão para o module.css** scoped via `.ds-checkbox`. | error      | `theme/global.css:508-574`           |
| 2   | **`colorBorderDisabled: neutral.300`** no token, mas Figma define `border.disabled = neutral.200` (`#e5e5e5`).                                                                               | warning    | `index.tsx:17`                       |
| 3   | **Cobertura de testes mínima** (3 testes): faltam indeterminate, error visual, error+focus, onClick, controlled vs uncontrolled, Group selection.                                            | warning    | `Checkbox.test.tsx`                  |
| 4   | **Sem `BASE_CLASS = "ds-checkbox"` aplicada ao wrapper** — sem isso o scoping via `.ds-checkbox .ant-*` no module.css não atinge as instâncias do nosso DS.                                  | warning    | `index.tsx`                          |
| 5   | **JSDoc faltando** em `errorTokens` e mensagens internas. CLAUDE.md exige pt-BR em funções com lógica não trivial.                                                                           | info       | `index.tsx`                          |
| 6   | **Stories com inline `style={...}`** em `GroupInline`/`GroupList`/`RichCheckboxGroup`. OK em demos mas pode migrar para CSS dedicado (`group.module.css` ou abordagem por componente).       | info       | `Checkbox.stories.tsx:242, 260, 304` |
| 7   | **`pseudo-focus-visible` global** (sem prefixo `.ds-checkbox`) — quando movido para module.css, deve continuar funcionando em qualquer instância do DS.                                      | info       | `theme/global.css:542`               |
| 8   | **Type `CheckboxComponent`** declara `Group: typeof AntdCheckbox.Group` — funcional, mas a inferência genérica do consumidor passa por `AntdCheckbox.Group`. Comentário já está OK.          | n/a        | `types/components/Checkbox/index.ts` |

### 5.3. Aderência às regras

| Regra                                                     | Status                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------- |
| `general.max_file_lines: 300`                             | 65 linhas — ✅                                                            |
| `general.max_function_lines: 50`                          | `CheckboxInner` (15) — ✅                                                 |
| `general.comment_language: pt-BR`                         | parcial — ✅                                                              |
| `code_quality.no_magic_numbers`                           | 1 ocorrência (`controlInteractiveSize: 16`) — OK, é tamanho fixo do Figma |
| `typescript.disallow_any`                                 | sem `any` — ✅                                                            |
| `typescript.require_return_types`                         | `React.ReactElement` declarado — ✅                                       |
| `typescript.types_in_separate_file`                       | tipos em `src/types/components/Checkbox/` — ✅                            |
| `architecture.frontend.max_props: 8`                      | 1 prop proprietária + spread Antd — ✅                                    |
| **CLAUDE.md** — "Use `module.css` em vez de `global.css`" | ❌ 15+ overrides do checkbox no global.css                                |

---

## 6. Responsividade

O Checkbox é tamanho **fixo 16×16** — sem `size` discreta. O wrapper
`.ant-checkbox-wrapper` é `inline-flex` e respeita o fluxo do
container pai. No `Checkbox.Group`:

- **Inline:** itens lado a lado, quebram quando o container é estreito.
- **List:** itens em coluna (espacing 8px entre rows por default Antd).

Touch target: 16×16 está abaixo do WCAG 2.5.5 (24×24 mínimo AA, 44×44
AAA). Isso é **um problema conhecido de checkboxes pequenos** em todo
o ecossistema. Mitigado por:

1. Label ampla clicável (texto + caixa = área única em `<label>`).
2. Espaçamento adequado entre checkboxes adjacentes em listas.

---

## 7. Props proprietárias

| Prop       | Tipo      | Default | Descrição                                                                    |
| ---------- | --------- | ------- | ---------------------------------------------------------------------------- |
| `error`    | `boolean` | `false` | Aplica a paleta vermelha (`feedback.red.500`) na borda/fundo/sombra de foco. |
| `truncate` | `boolean` | `false` | Trunca o label com `...` quando o texto excede a largura do container.       |

### 7.1. Estados e prop `error`

A prop proprietária `error: boolean` aplica a paleta vermelha
(`feedback.red.500`) à borda, ao fundo da caixa quando checada e à
sombra de foco (`shadow.focusError`).

| Caso                          | Visual                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| `error` + unchecked           | borda vermelha, fundo branco                                  |
| `error` + checked             | fundo vermelho, ícone branco                                  |
| `error` + focus               | borda/fundo vermelho + sombra `0 0 0 3px rgba(210,25,11,0.4)` |
| `error` + disabled (inválido) | — não suportado pelo Figma; comportamento indefinido          |

---

## 8. Acessibilidade (WCAG 2.1 AA)

| Critério                   | Status | Notas                                                                                                                         |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum)   | ✅     | Texto `#262626` sobre `#fafafa` = 16.8:1 ✓. Border `#d4d4d4` sobre `#fafafa` = 1.39:1 — abaixo de 3:1 para non-text contrast. |
| 1.4.11 Non-text Contrast   | ⚠️     | Borda padrão tem baixo contraste. Compensado por hover/focus visíveis e label de alto contraste.                              |
| 2.1.1 Keyboard             | ✅     | `Tab` para focar, `Space` para alternar — nativo do `<input type="checkbox">`.                                                |
| 2.4.7 Focus Visible        | ✅     | Outline 3px `neutral.300` (focus) ou `focus-error` em erro.                                                                   |
| 2.5.5 Target Size          | ⚠️     | 16×16 abaixo do mínimo AA 24×24. Mitigado pela label clicável (área total maior).                                             |
| 4.1.2 Name, Role, Value    | ✅     | `<input type="checkbox">` nativo via Antd. `children` vira accessible name.                                                   |
| 3.3.1 Error Identification | ✅     | Borda/fundo vermelho via prop `error`. Recomenda-se acompanhar com mensagem textual.                                          |

---

## 9. Plano de correção aplicado

| Ação                                                                                                                                       | Arquivo                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Aplicar classe `ds-checkbox` ao `<label class="ant-checkbox-wrapper">` (via `className` prop)                                              | `src/components/Checkbox/index.tsx`       |
| Mover todos os overrides `.ant-checkbox-*` de `theme/global.css` para `src/components/Checkbox/index.module.css` scoped via `.ds-checkbox` | `index.module.css`, `theme/global.css`    |
| Manter scoping de `.pseudo-focus-visible` e `.pseudo-active` para funcionarem em qualquer Checkbox do DS (storybook addon)                 | `index.module.css`                        |
| Corrigir `colorBorderDisabled: neutral.200` (era 300) para alinhar com Figma `border/disabled`                                             | `index.tsx`                               |
| Adicionar JSDoc pt-BR em `errorTokens` e parágrafo sobre Group                                                                             | `index.tsx`                               |
| Expandir testes para cobrir: indeterminate, error (visual e classe), onClick, controlled/uncontrolled, Group seleção, Group disabled       | `Checkbox.test.tsx`                       |
| Atualizar Storybook removendo inline `style={...}` em demos quando possível (extrair para fragment-friendly demos)                         | `Checkbox.stories.tsx`                    |
| Criar página `/checkbox` em `design-system-tests` com `index.tsx` + `index.module.css`                                                     | `design-system-tests/src/pages/checkbox/` |
| Validar WCAG via Chrome MCP (axe-core 4.10.2)                                                                                              | execução                                  |

---

## 10. Validação WCAG (resultado)

Execução via Chrome MCP + axe-core 4.10.2.

### Stories isoladas

| Story                    | Violações | Regras passadas |
| ------------------------ | --------- | --------------- |
| `default`                | 0         | 4               |
| `checked`                | 0         | 4               |
| `indeterminate`          | 0         | 4               |
| `focused`                | 0         | 4               |
| `error`                  | 0         | 4               |
| `error-focused`          | 0         | 4               |
| `disabled`               | 0         | 4               |
| `disabled-checked`       | 0         | 4               |
| `disabled-indeterminate` | 0         | 4               |
| `group`                  | 0         | 4               |
| `group-inline`           | 0         | 4               |
| `group-list`             | 0         | 4               |

### Página `/checkbox` em design-system-tests

- 40 instâncias renderizadas (33 com `.ds-checkbox`, 7 do Group nativo)
- Violações: **0**
- Regras passadas: **19**

### Validação dimensional (Figma → runtime)

| Token                      | Figma     | Computed             | Status |
| -------------------------- | --------- | -------------------- | ------ |
| Tamanho da caixa           | 16×16     | 16×16                | ✅     |
| Border radius              | 4px       | 4px                  | ✅     |
| Border default (unchecked) | `#d4d4d4` | `rgb(212, 212, 212)` | ✅     |
| BG checked                 | `#008633` | `rgb(0, 134, 51)`    | ✅     |
| Border disabled            | `#d4d4d4` | `rgb(212, 212, 212)` | ✅     |
| BG indeterminate           | `#008633` | `rgb(0, 134, 51)`    | ✅     |
| Border error               | `#d2190b` | `rgb(210, 25, 11)`   | ✅     |

---

## 11. Composição com outros componentes

- **`Form` + `Form.Item`** — campo de checkbox em formulários (com `error` derivado do estado de validação).
- **`Table`** — coluna de seleção (uma checkbox no header para "select all", uma por linha — indeterminate quando há seleção parcial).
- **`Checkbox.Group`** — escolhas múltiplas com `value`/`onChange`.
- **`RichCheckbox`** — variação com label + texto secundário em card.

---

## 12. Referências

- Card Jira: [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- Figma — frame Checkbox: `4052:2075`
- Antd Checkbox v6: https://ant.design/components/checkbox
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
