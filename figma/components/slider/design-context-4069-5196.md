# Figma — Slider (`4069:5196`) — get_design_context

```tsx
const imgEllipse = "../../assets/img-slider-marker-14.svg";
const imgValueH = "../../assets/img-slider-value-fill-122x6-2.svg";
const imgValueV = "../../assets/img-slider-value-fill-122x6.svg";
const imgValueRange = "../../assets/img-slider-value-fill-66x6.svg";

type MarkerProps = { className?: string; state?: "regular"; };
type SliderHorizontalProps = { className?: string; type?: "default"; };
type SliderVerticalProps = { className?: string; type?: "default" | "range"; };
```

**Marker (4069:5241):** 14x14 rounded-8, com Ellipse 12x12 centered.

**SliderHorizontal (4069:5221):** 240x16. Overall track bg neutral/300 inset-[31.25% 0] rounded-10. Value fill inset-[31.25% 49.3% 31.25% 0] (50%). Marker translate-x left-50% width-14.

**SliderVertical (4069:5231 default, 4069:5235 range):** 16x240, mesma estrutura mas vertical. Range variant tem 2 markers + value entre eles.

Doc-page (4069:5196): Page header icon/sliders-horizontal + "Slider" + "Componente que permite ao usuário selecionar um valor dentro de um intervalo arrastando o controle." Sections "Exemplos" + Tooltip support 8735:14526.

Styles: heading/02 49px, heading/06 20px, focus, heading/05 25px, body/01 16px, body/02 13px.
