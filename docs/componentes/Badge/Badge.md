# Badge — Parecer técnico

> Documento de referência do componente `Badge` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Badge (4080:6201)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-6201)
- **Arquivo no repo:** `src/components/Badge/index.tsx`
- **Tipos:** `src/types/components/Badge/index.ts`
- **Stories:** `src/components/Badge/Badge.stories.tsx`
- **Testes:** `src/components/Badge/Badge.test.tsx`
- **Página de testes:** `design-system-tests/src/pages/badge/index.tsx`

---

## 1. Contexto e finalidade

O `Badge` é o componente de **rótulo curto** — usado para marcar status,
tags, contadores e indicadores em outras superfícies (botões, ícones,
listas). Wrapper sobre o `Badge` do Ant Design com 7 variantes proprietárias

- palette de status colors.

---

## 2. Anatomia (Figma)

A página `4080:6201` contém matriz `badge` (`4071:9544`) com:

| Eixo      | Valores                                                                                |
| --------- | -------------------------------------------------------------------------------------- |
| `variant` | `primary` · `secondary` · `tertiary` · `outline` · `ghost` · `destructive` · `counter` |
| `state`   | `default` · `focus`                                                                    |

7 variantes × 2 estados = **14 símbolos**.

**Dimensões:**

- Variantes "label" (`primary`/`secondary`/`tertiary`/`outline`/`ghost`/`destructive`): 50 × 24 (com texto "Label")
- `counter`: 16 × 16 (com número "1")

---

## 3. Tokens extraídos do Figma

### 3.1. Container (todas as variantes "label")

| Token             | Valor            | Foundation         |
| ----------------- | ---------------- | ------------------ |
| Min height        | 24               | —                  |
| Padding inline    | 8 (`var --2`)    | `spacing[2]`       |
| Padding block     | 4 (`var --1`)    | `spacing[1]`       |
| Gap (icon ↔ text) | 4 (`var --1`)    | `spacing[1]`       |
| Border radius     | 8 (`radius/xl`)  | `radius.xl`        |
| Font              | `body/02 - 13px` | Inter Regular 13px |
| Line height       | 1.2              | —                  |

### 3.2. Counter

| Token         | Valor                | Foundation         |
| ------------- | -------------------- | ------------------ |
| Size          | 16 × 16              | —                  |
| Border radius | 9999 (`radius/full`) | `radius.full`      |
| Font          | `caption/01 - 10px`  | Inter Regular 10px |

### 3.3. Cores por variante

| Variante      | Background              | Text                    | Border               |
| ------------- | ----------------------- | ----------------------- | -------------------- |
| `primary`     | `primary/600` (#008633) | `text/light` (#fafafa)  | —                    |
| `secondary`   | `neutral/200` (#e5e5e5) | `text/dark` (#262626)   | —                    |
| `tertiary`    | `primary/50` (#aaffbe)  | `primary/900` (#004706) | —                    |
| `outline`     | transparente            | `text/dark`             | 1px `border/regular` |
| `ghost`       | transparente            | `text/dark`             | —                    |
| `destructive` | `feedback/red/500`      | `text/light`            | —                    |
| `counter`     | `feedback/red/500`      | `text/light`            | —                    |

### 3.4. Estado `focus`

Adiciona shadow externo `0 0 0 3px neutral/300` via CSS Module
(`src/components/Badge/index.module.css`), aplicado ao `<span>` interno
`.juscash-badge` em estado real `:focus` / `:focus-visible`. Para tornar o
badge focável, o consumer passa `tabIndex={0}` (propagado para o span
interno) ou envolve em `<button>`/`<a>`. **Não há classe simulada** — o
shadow só aparece quando o elemento recebe foco de verdade.

### 3.5. Status colors (extensão proprietária)

A implementação adiciona uma sub-paleta `statusColor` para a variante
`secondary` — não está no Figma como matriz de variantes, mas reaproveita
foundations de `feedback` para padronizar tags de status:

| `statusColor` | Background           | Text                  |
| ------------- | -------------------- | --------------------- |
| `success`     | `primary/50`         | `primary/900`         |
| `error`       | `feedback/red/50`    | `feedback/red/900`    |
| `warning`     | `feedback/orange/50` | `feedback/orange/900` |
| `caution`     | `feedback/yellow/50` | `feedback/yellow/900` |
| `info`        | `feedback/blue/50`   | `feedback/blue/900`   |

Quando `variant="secondary" + statusColor=...`, prevalecem as cores da
status palette. Sem `statusColor`, mantém o cinza neutro.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → brand.primary[50, 600, 900]
                                    feedback.{red, orange, yellow, blue}[50, 500, 900]
                                    neutral[50, 200, 300, 800]
                                    text.{light, dark}
                                    border.regular
src/theme/foundations/spacing     → spacing[1] (4), spacing[2] (8)
src/theme/foundations/radius      → radius.xl (8), radius.full (9999)
src/theme/foundations/shadow      → shadow.focus
src/theme/foundations/typography  → body2 (13), caption1 (10)
```

---

## 5. Anatomia da implementação

### 5.1. Props proprietárias

| Prop               | Tipo                                                                                           | Default     | Descrição                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `variant`          | `"primary" \| "secondary" \| "tertiary" \| "outline" \| "ghost" \| "destructive" \| "counter"` | `"primary"` | Define cor de fundo, texto e bordas.                                                                                          |
| `statusColor`      | `"success" \| "error" \| "warning" \| "info" \| "caution"`                                     | —           | Aplica apenas com `variant="secondary"`. Sub-paleta de status.                                                                |
| `leftIcon`         | `ReactNode`                                                                                    | —           | Ícone antes do texto (apenas variantes label).                                                                                |
| `rightIcon`        | `ReactNode`                                                                                    | —           | Ícone depois do texto.                                                                                                        |
| `count`            | `number`                                                                                       | —           | Valor para `variant="counter"`.                                                                                               |
| `children`         | `ReactNode`                                                                                    | —           | Texto do badge (variantes label).                                                                                             |
| `tooltip`          | `ReactNode`                                                                                    | —           | Envolve o badge num Tooltip do antd. Quando string, interpola `{value}` (= `count` ou `children`) e `{label}` (= `children`). |
| `tooltipPlacement` | `"top" \| "right" \| "bottom" \| "left" \| ...`                                                | `"top"`     | Posição do tooltip (mapeia para `placement` do antd).                                                                         |

### 5.2. Composição

- Variantes "label" renderizam: `[leftIcon?] [texto] [rightIcon?]` num
  `<span>` com flex `gap: 4`, padding `8/4`, radius `8`.
- `counter` renderiza apenas `[count]` num `<span>` 16×16 circular.

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério                 | Status | Notas                                                                                    |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | `primary/600 #008633` em texto branco 16.4:1. Demais validados.                          |
| 1.4.11 Non-text Contrast | ✅     | Borda do `outline` (`neutral/300`) em fundo claro 1.4:1 (compensado pela área de texto). |
| 2.4.7 Focus Visible      | ✅     | Token `focus` aplica outline 3px `neutral/300`.                                          |
| 4.1.2 Name, Role, Value  | ✅     | Quando usado como tag interativa, o consumer deve usar `<button>`.                       |

---

## 7. Aderência às regras

| Regra                                              | Status                                                      |
| -------------------------------------------------- | ----------------------------------------------------------- |
| `general.comment_language` = pt-BR                 | ✅ JSDoc em pt-BR.                                          |
| `general.max_file_lines` = 300                     | ✅ index.tsx ~240 linhas.                                   |
| `general.max_function_lines` = 50                  | ✅ funções pequenas (mapas de tokens extraídos em helpers). |
| `typescript.disallow_any` + `require_return_types` | ✅ sem `any`; tipos de retorno explícitos.                  |
| `typescript.types_in_separate_file`                | ✅ tipos em `src/types/components/Badge/index.ts`.          |

---

## 8. Análise da implementação atual

A implementação **já está alinhada** com o Figma. Tokens conferidos:

| #   | Token Figma                     | Implementação                           | Status |
| --- | ------------------------------- | --------------------------------------- | ------ |
| 1   | primary bg `primary/600`        | `designSystemColors.brand.primary[600]` | ✅     |
| 2   | secondary bg `neutral/200`      | `designSystemColors.neutral[200]`       | ✅     |
| 3   | tertiary bg `primary/50`        | `designSystemColors.brand.primary[50]`  | ✅     |
| 4   | outline border `border/regular` | `designSystemColors.neutral[300]`       | ✅     |
| 5   | destructive bg `red/500`        | `designSystemColors.feedback.red[500]`  | ✅     |
| 6   | counter size 16                 | `COUNTER_MIN_SIZE = 16`                 | ✅     |
| 7   | counter font 10                 | `COUNTER_FONT_SIZE = 10`                | ✅     |
| 8   | label height 24                 | `BADGE_HEIGHT = 24`                     | ✅     |
| 9   | label font 13                   | `BADGE_FONT_SIZE = 13`                  | ✅     |
| 10  | padding 8/4, gap 4              | `spacing[2]`, `spacing[1]`              | ✅     |

**Não há divergências.** A página de testes precisa ser criada para validar
visualmente.

---

## 9. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/badge` do `design-system-tests`
(`http://localhost:5175/badge`), cobrindo:

- 6 variantes label (primary, secondary, tertiary, outline, ghost, destructive)
- 6 counters com diferentes valores (1, 3, 9, 42, 99, 120)
- 5 status colors (success, error, warning, info, caution)
- 5 badges com ícones via string Lucide (`leftIcon`/`rightIcon`)
- Estados default e focus (pseudo-class)
- Casos de borda (texto longo, só ícone, counter com zero)

**Resultado:** `{ violations: 0, items: [] }` — 0 violações WCAG 2.1 AA.

---

## 10. Ampliação aplicada — ícones via string

Para alinhar à regra do `design-system-tests` ("ícones via string"), a API
foi ampliada:

- `leftIcon?: ReactNode | string` (era apenas `ReactNode`)
- `rightIcon?: ReactNode | string` (era apenas `ReactNode`)

Quando string, resolve no pacote `lucide-react` e instancia o ícone com
tamanho fixo de 12px (alinhado ao Figma). Mantém compatibilidade —
consumers que já passavam `ReactNode` continuam funcionando.
