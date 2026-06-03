# Figma — Drawer / Bottom sheet (`4098:11176`) — get_design_context

> Nota: o frame é nomeado "Bottom sheet" no Figma mas o componente do código corresponde ao Drawer (Antd Drawer com placement bottom). O changelog v0.1.3 sinaliza: "Bottom Sheet — removido; substituído pelo Drawer com suporte a posicionamento em qualquer direção (direita, esquerda, topo, rodapé)".

```tsx
const imgVectorStroke = "../../assets/bell.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke1 = "../../assets/img-icon-stroke-light-33x33-4.svg";
const imgVectorStrokePanelRight = "../../assets/panel-right.svg";
const imgAvatar = "../../assets/img-bg-32x32-gray-200.svg";
const imgVectorStrokeChevron = "../../assets/chevron-up.svg";
```

**Drawer (4098:11496):**
- 390x300 (visualizado no doc-page), bg neutral/50
- rounded-tl 10 / rounded-tr 10
- shadow [0px_10px_15px_-3px_rgba(0,0,0,0.1), 0px_4px_6px_-4px_rgba(0,0,0,0.1)] = shadow/l
- gap-24 items-end justify-end overflow-clip
- Slot interno: h-276, p-8 pt-24, border dashed 9747ff, rounded-8
- Handle: 50x3 bg neutral/200, rounded-2, position top-8 -translate-x-1/2 left-1/2

**NotificationButton (4220:10471, 4220:10425):** 32x32, bg rgba(255,255,255,0), padding 4 12, rounded radius/xl, icon/bell 16px.

**Mobile example (4155:12097):** 430x932 mobile container com:
- navbar (4155:12100): h-px-2-py-4, icon button panel-right + NotificationButton + AvatarMenu (avatar 32 + chevron-up)
- conteúdo dimmed (4155:12098): bg opacities/dark/25% (rgba(23,23,23,0.25)), título "Content"
- drawer overlay (4155:12361): drawer 430x300 fixo no bottom

Doc-page (4098:11176):
- Page header (4098:11177) icon/panel-top-close + "Bottom sheet" + "Painel que desliza a partir da borda inferior da tela para exibir conteúdo complementar sem substituir a página atual."
- Description "Quando usar" (4154:12073): "O bottom sheet deve ser usado principalmente em dispositivos móveis, para mostrar menus, filtros ou informações complementares sem trocar de tela. Não deve substituir modais ou sheets em desktop."
- Exemplos: drawer puro 390x300 + Mobile Example 430x932

Styles: heading/02 49px, heading/06 20px, paragraph small/medium (Geist Medium 14 1.5 0.5), shadow/l, heading/05 25px, body/02 13px, shadow/xl.
