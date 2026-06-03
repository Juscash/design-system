# Figma — Tooltip (`4041:11954`) — get_design_context (frame raiz da página)

```tsx
const imgVectorStroke = "../../assets/info-soft.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";
const imgArrowLeft = "../../assets/img-tooltip-arrow-dark.svg";
const imgArrowRight = "../../assets/img-tooltip-arrow-dark-3.svg";

function IconTooltip({ className }: { className?: string }) {
  // 4160:12130: 16x16 com icon/info inset 4.17%
}

type TooltipProps = { className?: string; side?: "bottom" | "top" | "left" | "right" };

function Tooltip({ className, side = "bottom" }: TooltipProps) {
  // 4 placements:
  // bottom = 4041:9018, top = 4041:9021, left = 4041:9024, right = 4041:9027
  // Container: bg neutral/800, flex gap-8 items-center justify-center, max-w-200, px-8 py-6, rounded-8
  // Text: Inter Regular 13 text neutral/50 "Tooltip text"
  // Arrows: top/bottom = 11.5×5; left/right = 5×11.5 (rotated 90/-90)
}
```

Doc-page (4041:11954):
- Page header (4041:11955) icon/message-square + "Tooltip 󱍃" + "Exibe uma mensagem informativa quando o usuário passa o mouse ou foca em um elemento, oferecendo contexto extra."
- Section "Icon" (4160:12129) + IconTooltip 16x16
- Section "Exemplos" (4110:8659):
  - Stack 36x36 (4110:8660): tooltip "Editar" bottom + icon button outline 36px com icon/pencil
  - Stack 173x26 (4110:8663): badge outline 173x24 com icon/clock-9 12px + texto "Análise em andamento" + tooltip left "Estamos analisando seu processo, em breve entraremos em contato."
- Icon tooltip composto (4160:12139): icon/info 16 + tooltip left 200x44 "Estamos analisando seu processo, em breve entraremos em contato."

Styles: heading/02 49px (com fa-icon ``), heading/06 20px, body/02 13px, heading/05 25px.
