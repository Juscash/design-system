# Figma — Textarea (`4059:2085`) — get_design_context

```tsx
const imgResizable = "../../assets/img-resize-handle.svg";
const imgResizable1 = "../../assets/img-resize-handle-2.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke = "../../assets/img-icon-stroke-light-33x23.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type TextareaProps = { className?: string; helperText?: boolean; showLabel?: boolean; state?: "empty" | "placeholder"; };
```

**Variants Textarea:**
- empty = 4062:4951 (label "Label" 16px text/dark, container h-76 com handle resize 7x7 imgResizable no canto)
- placeholder = 4062:4950 (label "Label", container com placeholder "Type your message here." 13px text/soft, handle imgResizable1)

**Container:**
- bg neutral/50 (#fafafa)
- border 1px regular #d4d4d4
- h-76 overflow-clip rounded radius/xl 8
- width 320
- padding p-2 (empty: items-end justify-end p-1 4px; placeholder: gap-8 items-start p-2 8px)

**Label (4062:4920):** Inter Regular 16px text/dark
**Helper text (4062:4921):** Inter Regular 13px text/soft

Doc-page (4059:2085):
- Page header (4059:2086) icon/text + "Textarea" + "Campo para inserir textos longos, com múltiplas linhas."
- Section "Component" 4059:2229 (457x958) — matriz 7 rows: Empty, Placeholder, Value, Focus, Error, Error Focus, Disabled
- Exemplo "Conteúdo*" 4125:11187 com placeholder "Type your message here."
- Tooltip support 8735:13743

Styles: heading/02 49px, heading/06 20px, body/01 16px, body/02 13px, focus, focus-error #D2190B66, heading/05 25px.
