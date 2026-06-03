# Figma — Badge (`4080:6201`) — get_design_context

```tsx
const imgVectorStroke = "../../assets/img-icon-stroke-light-11x10.svg";
const imgVectorStroke1 = "../../assets/img-icon-stroke-green-dark-2-11x10.svg";
const imgVectorStroke2 = "../../assets/img-icon-stroke-dark-11x10.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke3 = "../../assets/img-icon-stroke-light-37x37-2.svg";
const imgColumn = "../../assets/img-grid-cell-32x32.svg";
const imgColumn1 = "../../assets/img-grid-line-v-141-3.svg";
const imgColumn2 = "../../assets/img-grid-line-v-141.svg";
const imgColumn3 = "../../assets/img-grid-line-v-141-2.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type BadgeProps = {
  className?: string;
  leftIcon?: React.ReactNode | null;
  rightIcon?: React.ReactNode | null;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  state?: "default" | "focus";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "counter" | "tertiary";
};

/*
  Variantes (eixo: variant × state) extraídas do frame 4080:6201:
  - Eixos: variant ∈ {primary, secondary, tertiary, outline, ghost, destructive, counter}
  - state ∈ {default, focus}
  - Node-ids por combinação (primary/default=4071:9545, secondary/default=4071:9553, tertiary/default=4740:11456, outline/default=4071:9561, ghost/default=4071:9569, destructive/default=4071:9577, counter/default=4080:7344)
  - state=focus aplica shadow [0px_0px_0px_3px_var(--color/neutral/300,#d4d4d4)]
  - Background por variant:
    primary -> var(--color/button/brand/default,#008633)
    secondary -> var(--color/neutral/200,#e5e5e5)
    tertiary -> var(--color/brand/primary/50,#aaffbe)
    outline -> rgba(255,255,255,0) + border var(--color/border/regular,#d4d4d4)
    ghost -> rgba(255,255,255,0)
    destructive -> var(--color/feedback/red/500,#d2190b)
    counter -> var(--color/feedback/red/500,#d2190b) + rounded-full (16x16)
  - min-h: 24px (counter 16x16); padding 4 8; gap 4; rounded radius/xl (counter rounded-full)
  - Texto: Inter Regular 13px, line-height 1.2 (counter 10px text-center)
  - Cores de texto:
    primary/destructive/counter -> text/light (#fafafa)
    secondary/outline/ghost -> text/dark (#262626)
    tertiary -> brand/primary/900 (#004706)

  Doc page também documenta paleta de "Cor da badge secundária":
  - brand/primary/50 (#aaffbe) + brand/primary/900 text
  - feedback/red/50 (#fef2ec) + feedback/red/900 text
  - feedback/orange/50 (#ffe9d2) + feedback/orange/900 text
  - feedback/yellow/50 (#fffbe0) + feedback/yellow/900 text
  - feedback/blue/50 (#ecf5fe) + feedback/blue/900 text

  Exemplos doc-page (4080:7294):
  - "Novidade!" (primary)
  - "Processando" (secondary)
  - "20+" (outline)
  - "Badge" (ghost com icon/heart 12px)
  - "Erro" (destructive 4146:11851)
  - Counter "1" (4080:7358) e Counter "112" (8789:11859)

  Sub-seção "Tooltip" (8735:14469, 8735:14470, 8735:14471): "Suporta tooltip opcionalmente."
  Row 8735:14472 mostra Badge primary "Novidade!" + tooltip 8735:14474 (200x44, bg neutral/800, texto Inter Regular 13/neutral/50, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", arrow 11.5x5).
*/

export default function Badge1() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4080:6201" data-name="Badge">
      {/* Page header (4080:6202): "Badge — Indicador usado para mostrar status, contagem ou destaque em elementos." */}
      {/* Matriz componente (4071:9524): rows = state[default,focus]; cols = variant[primary, secondary, tertiary, outline, ghost, destructive, counter] */}
      {/* Exemplos + paleta secundária + tooltip (descritos no comentário acima) */}
    </div>
  );
}
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `body/02 - 13px`, `focus`, `caption/01 - 10px`, `heading/05 - 25px`
