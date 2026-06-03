# Assets

**156 arquivos** — nenhum mais com nome em hash. Todos batizados pelo papel real que cumprem no design system.

## Ícones Lucide React (renomeados pelo nome canônico do Lucide)

`bell`, `box`, `chevron-down`, `chevron-up`, `circle-dollar-sign`, `columns-3`, `ellipsis`, `eye-off`, `file-spreadsheet`, `folder-open`, `gift`, `grid-3x2`, `hash`, `headset`, `heart`, `house`, `info`, `laptop-minimal-check`, `layers-2`, `layout-panel-top`, `link`, `loader`, `lock-keyhole`, `log-out`, `message-square-warning`, `palette`, `panel-right`, `panel-top-open`, `panels-top-left`, `send`, `settings`, `text-cursor-input`, `trash-2`, `trending-down`, `trending-up`, `ungroup`, `user`, `user-round`, `x`.

Importáveis direto do pacote: `import { Heart, ChevronDown, … } from "lucide-react"`. Os SVGs aqui só existem como referência visual do Figma — a lib **não** deve servir esses arquivos em runtime.

### Variantes de cor (mesmo ícone, fills diferentes)

Quando o Figma exportou o mesmo ícone com cores distintas, o sufixo é o token de cor:

- `heart-red.svg` (#D2190B / feedback-red-500), `heart-blue.svg` (#105ABC / brand-secondary-700), `heart-green.svg` (#008633 / button-brand-default), `heart-dark.svg` (#262626), `heart-soft.svg` (#6D6D6E), `heart-gray-400.svg`. Tamanhos diferentes recebem sufixo `-<maxDim>` (`heart-soft-11.svg` ≈ 11×11).
- `send-dark.svg` / `send-light.svg`
- `x-soft.svg` / `x-soft-9.svg`
- `info-soft.svg` / `info-dark.svg`
- `loader-dark.svg` / `loader-light.svg`
- `link-soft.svg` / `link-soft-11.svg`
- `hash-soft.svg` / `hash-soft-10.svg`
- `folder-open-dark.svg` / `folder-open-dark-22.svg`

## Helpers não-ícone — prefixo `img-`

São camadas/decorações do Figma que **não** mapeiam para um ícone Lucide. Nome reflete uso real:

### Logos / fotos
- `img-logo-juscash-white.png` — logo branco usado nos page headers de docs
- `img-logo-juscash-color.png` — logo colorido (página Logotipo)
- `img-photo-aspect-ratio-demo.png` — foto demo (Aspect Ratio / Carousel)

### Tooltips e popovers
- `img-tooltip-arrow-dark.svg`, `img-tooltip-arrow-dark-2.svg`, `img-tooltip-arrow-dark-3.svg` — setas escuras (#262626)
- `img-tooltip-arrow-light.svg`, `img-tooltip-arrow-light-2.svg` — setas brancas

### Carousel
- `img-carousel-dot-active.svg`, `img-carousel-dot-inactive.svg`

### Slider / Progress
- `img-slider-marker-14.svg` — marker circular do slider
- `img-slider-value-fill-122x6.svg`, `img-slider-value-fill-122x6-2.svg`, `img-slider-value-fill-66x6.svg` — preenchimentos verdes
- `img-progress-fill-137.svg` — barra de progresso

### Switch
- `img-switch-knob-16.svg` — bolinha branca do switch

### Sidebar
- `img-sidebar-arrow-right.svg` — pequena seta `>` em itens com submenu

### Pagination
- `img-pagination-ellipsis-hack.svg` — composição "..." do botão ellipsis

### Radio
- `img-radio-dot-dark.svg` — bolinha selecionada
- `img-pixel-override-32.svg` — overlay 32×32

### Avatares (background sem stroke)
- `img-bg-40x40-gray-200.svg` — fundo do avatar 40px
- `img-bg-32x32-gray-200.svg` — fundo do avatar 32px

### Backgrounds genéricos (sem path)
- `img-bg-20x20-gray-200.svg`, `img-bg-32x32-gray-100.svg`, `img-bg-40x40-gray-100.svg`, `img-bg-48x48-gray-100.svg`, `img-bg-15x15-light.svg`

### Tabs / grids / colunas do Figma
- `img-tabs-brackets-1440.svg`, `img-tabs-brackets-267.svg` — colchetes "[" e "]" das tabs
- `img-grid-columns-NxM.svg`, `img-grid-line-v-N.svg`, `img-grid-cell-32x32.svg`, `img-divider-h-1920.svg` — guides/colunas dentro de docs (não são UI real)

### Helpers diversos
- `img-resize-handle.svg`, `img-resize-handle-2.svg` — alça redimensionável
- `img-dot-green-8.svg` — bolinha verde 8px

### Ícones que vivem fora de `data-name="icon/X"` (Lucide React, mas sem nome detectável)
Prefixo `img-icon-stroke-<cor>-<viewBox>.svg`. São SVGs com `id="Vector (Stroke)"` que claramente são ícones Lucide (KPI card, Pagination, Search bar pages, Sidebar), mas o Figma não os envolveu num `data-name="icon/<nome>"` que permitisse mapear automaticamente. Quando for implementar o componente correspondente, identifique o ícone Lucide visualmente (cores, viewBox, formato) e use o `lucide-react` equivalente.

### Camadas split do ícone X
- `img-x-stroke-half-95-95.svg` / `img-x-stroke-half-95-95-2.svg` — duas diagonais que compõem o X do botão close do Modal

## Mapping completo
- `../.icon-map.json` — hash original → nome Lucide identificado
- `../.icon-renames.json` — hash.svg → nome Lucide.svg (1ª onda)
- `../.helper-renames.json` — hash.svg → img-…svg (2ª onda)
