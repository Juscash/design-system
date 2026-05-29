# Figma — Tipografia (`4002:5004`) — get_design_context

Frame canônico da página Fundamentos, largura 1680px. Page header (4002:5005, Plus Jakarta Sans Bold 48px "Tipografia"). Section "Família tipográfica" (Inter Bold 49 #6d6d6e) + sample "Inter" (Inter Bold 31 + alfabeto Inter Regular 16). Section "Escala" + tabela `4002:5012`.

## Tabela Escala (4002:5012)

| Variante / token | Sample (Inter Regular text-black) | px | rem | line height (col) | description |
|---|---|---|---|---|---|
| **heading.1** (4002:5019) | "Heading 1" 61px | 61 | 3.813rem | 0px | Títulos em destaques como heros. |
| **heading.2** (4002:5025) | "Heading 2" 49px | 49 | 3.063rem | 0px | . |
| **heading.3** (4002:5031) | "Heading 3" 39px | 39 | 2.438rem | 0px | . |
| **heading.4** (4002:5037) | "Heading 4" 31px | 31 | 1.938rem | 0px | . |
| **heading.5** (4002:5043) | "Heading 5" 25px | 25 | 1.563rem | 0px | . |
| **heading.6** (4002:5049) | "Heading 6" 20px | 20 | 1.25rem | 0px | Títulos em cards, telas. |
| **body.1** (4002:5055) | "Body 1" 16px | 16 | 1rem | 0px | Textos longos em telas com mais espaço |
| **body.2** (4002:5061) | "Body 2" 13px | 13 | 0.813rem | 0px | Textos longos em telas com menos espaço, tabelas |
| **caption.1** (4002:5073) | "Caption" 10px | 10 | 0.625rem | 0px | Descrições complementares |

**Cabeçalhos da tabela (4010:1876, 4010:1881, 4010:1885, 4010:1891, 4010:1895):** Inter Bold 16px text/text/soft. Coluna "line height" reporta `0px` para todas as linhas (provável bug de label — é letter-spacing, não line-height; line-height real é `1.2` unitless de cada Text Style).

**Cores das células:** texto sample = `text-black` (literal `#000000`), demais células = `color/text/soft` (`#6d6d6e`). Tags `.tag` (4180:12098): bg `color/background/grey` (#f5f5f5), padding 2/4, rounded-4, com icon/link 12px + token name em JetBrains Mono Bold 13.

Page header (4002:5005) usa `Plus_Jakarta_Sans:Bold` 48px com cor `color/neutral/50`, bg `color/neutral/700`.

Styles: heading/01..06 (61/49/39/31/25/20px), body/01 (16px), body/02 (13px), caption/01 (10px) — todos Inter Regular 400, line-height 1.2 unitless, letter-spacing 0.
