# Figma — Collapse (`4069:5252`) — get_design_context

```tsx
const imgVectorStroke = "../../assets/img-icon-stroke-dark-9x5-2.svg";
const imgVectorStroke1 = "../../assets/img-icon-stroke-dark-9x5.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke2 = "../../assets/img-icon-stroke-light-23x13.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type CollapseProps = {
  className?: string;
  state?: "closed" | "open" | "levels" | "slot";
};

/*
  Variantes do Collapse (4069:5252):
  - open (4069:5311): header com label + chevron-up icon; body com texto Inter Regular 16px text/dark
  - closed (4069:5314): label + chevron-down icon na mesma linha (flex inline)
  - levels (4892:13345): collapse nested com 2 collapse fechados internos
  - slot (5067:12661): collapse open com slot vazio (.slot 4066:2838)

  Comportamentos por state na matriz da doc page (4069:5300):
  - Open: header + body (165px)
  - Closed: 104px (default/hover/focus/active)
  - Levels: 221px nested
  - Slot: 221px

  Estilo do container (constantes):
  - bg: var(--color/background/white,#fafafa)
  - border: 1px solid var(--color/border/regular,#d4d4d4)
  - padding: var(--4, 16px)
  - rounded: var(--radius/xl, 8px)
  - width: 480px (matriz); responsive na implementação
  - gap interno: var(--3, 12px)
  - overflow-clip

  Header:
  - flex items-center justify-between
  - label Inter Regular 16px text/dark (#262626)
  - icon Accordion (chevron-up quando open, chevron-down quando closed) 16x16, inset 33.33% 20.83%

  Body (visible no open/closed-flat):
  - Inter Regular 16px text/dark
  - Exemplo: "O cashback será disponibilizado na plataforma após a comprovação da protocolização do contrato nos autos. Confira as regras em nossa política."

  Exemplos doc-page (4069:5327): "Qual é o valor do cashback?", "Como funciona o resgate de cashback?", "O que é o Which?" (todos closed) + "Quanto tempo leva para o cashback ser aprovado?" (open com texto explicativo)

  Tooltip support: 8735:14543 — collapse 480px + tooltip 200x44 "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
*/

export default function Collapse1() {
  return <div data-node-id="4069:5252" />;
}
```

## Styles
- `heading/02 - 49px`, `heading/06 - 20px`, `body/01 - 16px`, `focus`, `paragraph small/medium` (Geist Medium 14/1.5/0.5), `heading/05 - 25px`, `body/02 - 13px`
