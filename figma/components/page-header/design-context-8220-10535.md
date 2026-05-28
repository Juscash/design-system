# Figma — Page header (`8220:10535`) — get_design_context

```tsx
const imgVectorStroke = "../../assets/img-icon-stroke-dark-12x3.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke1 = "../../assets/img-icon-stroke-light-30x23.svg";

type PageHeaderProps = {
  className?: string;
  showActions?: boolean;
  showButton?: boolean;
  showIconButton?: boolean;
  variant?: "default" | "responsive";
};
```

**Variants (variant × showActions × showButton × showIconButton):**
- default = 8220:11650 (h-px-2, p-24 row layout): Card content (title 20px Inter Bold + subtitle 16px Inter Regular text/dark) → actions à direita
- responsive = 8220:11924 (w-311 flex-col): actions topo → Card content abaixo

**Container:**
- bg background/white #fafafa
- border 1px regular #d4d4d4
- drop-shadow shadow/xs
- p-24 (var(--6,24px))
- rounded radius/xl 8
- gap-8 (var(--2,8))

**Card content (8220:11651 / 8220:11925):**
- flex-col gap-8
- Title: Inter Bold 20px text/dark (heading/06)
- Subtitle: Inter Regular 16px text/dark (body/01)

**Actions (8220:11938 default / 8220:11937 responsive):**
- gap-8 items-center
- Button primary (8220:11654): bg button/brand/default #008633, h-36, p-2-4-2-4, rounded radius/xl, texto Inter Regular 13 text neutral/50
- Icon button (8220:11658): bg rgba(255,255,255,0), border regular, h-36, square, icon/ellipsis 16

Doc-page (8220:10535):
- Page header (8220:10536) icon/heading-1 + "Page header" + "Cabeçalho de página composto por título, subtítulo opcional e área de ações à direita (botão primário e menu de opções)."
- Exemplos:
  - default 8220:11913: "Análise prospecção / Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados." + actions Label + ellipsis
  - responsive 8220:11947 (267px wide): mesma estrutura, actions no topo

Styles: heading/02 49px, heading/06 20px, body/01 16px, body/02 13px, shadow/xs, heading/05 25px.
