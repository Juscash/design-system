# Figma — Checkbox (`4052:2075`) — get_design_context

Sumário: 3 componentes — Checkbox (16x16, rounded radius/md), CheckboxGroup (inline), RichCheckbox.

**Variants Checkbox (checked × state):**
- "false" / default = 4051:2167 (bg neutral/50 + border regular)
- "true" / default = 4051:2169 (bg button/brand/default #008633 + icon/check)
- "false" / disabled = 4051:2187 (bg button/brand/disabled #d4d4d4 + border disabled)
- "true" / disabled = 4051:2189 (bg button/brand/disabled + icon/check)

**Variants CheckboxGroup:** layout="inline" (4051:2220) — gap-8 h-24

**Variants RichCheckbox (8):** mesma estrutura da RichRadio
- not-checked/default 4051:2243, checked/default 4051:2249
- not-checked/hover 8175:10101, checked/hover 8175:10124
- not-checked/focus 8175:10108, checked/focus 8175:10115
- not-checked/disabled 8175:10164, checked/disabled 8175:10170

```tsx
const imgVectorStroke = "../../assets/img-icon-stroke-light-10x8.svg"; // icon/check
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStrokeSquareCheck = "../../assets/img-icon-stroke-light-33x33-3.svg";
const imgColumns = "../../assets/img-grid-columns-192x448.svg";
const imgBrackets = "../../assets/img-tabs-brackets-267.svg";
const imgColumn = "../../assets/img-grid-cell-32x32-4.svg";
const imgColumn1 = "../../assets/img-grid-line-v-368.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type CheckboxProps = { className?: string; checked?: "false" | "true"; state?: "default" | "disabled"; };
```

Doc-page (4052:2075):
- Page header (4052:2076) icon/square-check + título "Checkbox" + "Componente que permite selecionar uma ou mais opções em um formulário."
- Section "Checkbox" matriz 7 rows × 3 cols (Not Checked / Checked / Indeterminate) — 4051:2141. States: Default/Hover/Focus/Error/Error hover/Error Focus/Disabled
- Section "Checkbox group" (4051:2200) — layout inline/list
- Section "Rich checkbox" (4051:2234) — matriz 4 rows × 2 cols Default/Hover/Focus/Disabled
- Tooltip support 8735:13620.

Component description (Figma): "Icon / minus (4048:12153): subtract, remove, decrease, decrement, reduce, negative, calculate, line, divider, separator, horizontal rule, hr, html, markup, markdown, toolbar, operator, code, coding, minimum, downgrade"

Styles: heading/02 49px, heading/06 20px, heading/05 25px, focus, focus-error #D2190B66, body/02 13px, caption/01 10px.
