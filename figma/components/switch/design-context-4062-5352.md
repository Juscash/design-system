# Figma — Switch (`4062:5352`) — get_design_context

```tsx
const imgToggle = "../../assets/img-switch-knob-16.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke = "../../assets/img-icon-stroke-light-37x23.svg";
const imgColumns = "../../assets/img-grid-columns-162x856.svg";
const imgBrackets = "../../assets/img-tabs-brackets-267.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type SwitchProps = { className?: string; checked?: boolean; state?: "default"; };
type SwitchGroupProps = { className?: string; layout?: "inline"; };
type RichSwitchGroupProps = { className?: string; checked?: boolean; };
```

**Switch:** 33x18, bg neutral/200 (#e5e5e5), rounded radius/2xl 12, toggle 14x14 inset[5.56% 48.48% 5.56% 3.03%] (4062:5488).

**SwitchGroup inline (4062:5416):** gap-8 h-24, Switch + label Inter Regular 13.

**RichSwitchGroup (checked × …):**
- not-checked = 4062:5435 (bg neutral/50)
- checked = 4062:5441 (bg neutral/100)
- border regular d4d4d4 px-12 py-8 radius-9 width-240

Doc-page (4062:5352):
- Page header icon/toggle-right + "Switch" + "Botão para ativar ou desativar uma opção."
- Section "Switch" — matriz 8 rows × 2 cols (Not Checked / Checked). States: Default, Hover, Focus, Disabled (×2), Error, Error hover, Error Focus, Disabled. Component 4062:5471 (259x555).
- Section "Checkbox group" (4062:5403, name diz Checkbox mas é Switch) — inline/list
- Section "Rich switch group" (4062:5426) — 2 rows Not checked/Checked
- Tooltip support 8735:13693

Styles: heading/02 49px, heading/06 20px, heading/05 25px, focus, body/02 13px, caption/01 10px.
