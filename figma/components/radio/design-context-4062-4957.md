# Figma — Radio (`4062:4957`) — get_design_context

Sumário: 3 componentes — Radio (16x16), RadioGroup (inline, label), RichRadio (240x_, com borda + label + secondary text).

**Variants Radio:** checked ∈ {false, true} × state="default"
- not-checked: 4062:5240 (background imgBackground 15x15)
- checked: 4062:5242 (background + dot imgDot 8x8 centered)

**Variants RadioGroup:** layout="inline" (4062:5287, h-24, gap-8) — Radio 16x16 + label Inter Regular 13 text-dark

**Variants RichRadio (8 = checked × state):**
- not-checked / default = 8175:10295 — bg neutral/50 + border regular
- checked / default = 8175:10301 — bg neutral/100 + border regular
- not-checked / hover = 8175:10307 — bg background/grey
- checked / hover = 8175:10313 — bg neutral/200
- not-checked / focus = 8175:10319 — bg neutral/50 + border + shadow focus
- checked / focus = 8175:10325 — bg neutral/100 + border + shadow focus
- not-checked / disabled = 8175:10331 — bg neutral/50 + border disabled
- checked / disabled = 8175:10337 — bg neutral/100 + border disabled

Padding RichRadio: px-12 py-8 rounded-radius/xl width 240. Label 13px text/dark (disabled vira text/disabled #a3a3a3). Secondary text 10px text/soft (disabled vira text/disabled).

```tsx
const imgBackground = "../../assets/img-bg-15x15-light.svg";
const imgDot = "../../assets/img-dot-green-8.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStrokeCircleDot = "../../assets/img-icon-stroke-light-37x37.svg";
const imgColumns = "../../assets/img-grid-columns-128x506.svg";
const imgBrackets = "../../assets/img-tabs-brackets-267.svg";
const imgColumn = "../../assets/img-grid-cell-32x32-4.svg";
const imgColumn1 = "../../assets/img-grid-line-v-368.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type RadioProps = { className?: string; checked?: boolean; state?: "default"; };
type RadioGroupProps = { className?: string; layout?: "inline"; };
type RichRadioProps = { className?: string; checked?: boolean; state?: "default" | "hover" | "focus" | "disabled"; };
```

Doc-page (4062:4957) inclui:
- Page header (4062:4958) icon/circle-dot + título "Radio" + "Componente que permite selecionar uma opção em um formulário."
- Section "Radio" — matriz 7 rows (Default, Hover, Focus, Error, Error hover, Error Focus, Disabled) × 2 cols (Not Checked, Checked). Total 14 variants — node-ids 4062:5219 (component), 4062:5222–8175:10075 (rows).
- Section "Radio group" (4062:5019) — variantes layout inline/list (4062:5029/5030)
- Section "Rich radio" (8175:10279) — matriz 4 rows × 2 cols (Not Checked × Checked) com states Default/Hover/Focus/Disabled.
- Tooltip support 8735:13676 — radio + tooltip 200x44.

Styles: heading/02 49px, heading/06 20px, heading/05 25px, focus, focus-error (red/300), body/02 13px, body/01 16px, caption/01 10px.
