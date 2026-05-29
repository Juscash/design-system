# Figma — Charts (`4098:12198`) — get_design_context

Page header icon/chart-pie + "Charts". Page contém 8 sub-componentes de visualização.

## .Line Chart (4098:12045) — 371.5×214

Grid 5 linhas horizontais (color neutral/100 #f5f5f5) + 6 labels eixo X (Jan/Feb/Mar/Apr/May/Jun, Inter Regular 13 text/soft). 2 line paths SVG sobrepostos.

## .Vertical Bar Chart (4098:12061) — 370×214

Grid 5 linhas + 6 colunas com pares de barras (Inter Regular 13 text/soft). Cores das barras: `#f54a00` (chart-1) e `#009689` (chart-2). Barras com `rounded-4`. Valores das barras visíveis na arte (heights variam: Jan 147/68, Feb 98/71, Mar 136/84, Apr 43/105, May 48/122, Jun 115/160).

## .Horizontal Bar Chart (4098:12099) — 390×206

5 linhas (Chrome/Safari/Firefox/Edge/Other) com labels Inter Regular 13 text/soft à esquerda + barras horizontais coloridas com `rounded-4`:
- Chrome: #f54a00 (chart-1)
- Safari: #009689 (chart-2)
- Firefox: #104e64 (chart-3)
- Edge: #ffb900 (chart-4)
- Other: #fe9a00 (chart-5)

## .Pie Chart (4098:12112) — 187×187

5 fatias SVG composando o pie (mesmas 5 cores).

## .Donut Chart (4098:12120) — 187×187

Mesma estrutura do Pie Chart mas com furo central.

## .Area Chart (4098:12271) — 359.5×227

Grid 5 linhas, 6 labels (Jan..Jun), 2 área-paths sobrepostas.

## .Radar Chart (4098:12286) — 250×224

6 categorias hexagonais (June/January/February/March/April/May), 3 star-lines + 4 hexagonal levels, polígono de dados com `mix-blend-multiply`.

## .Chart Tooltips (4098:12162)

Container bg neutral/50 + border regular + rounded-8, px-12 py-8. 3 variantes:

**Variant 1 (4098:12164)** — w-128 flex-col:
- Title Inter Bold 13 text/dark "February"
- 2 stacks com Indicator 3×11 (vertical bar SVG) + label Inter Regular 10 "Visitors" + value Inter Bold 10

**Variant 2 (4098:12180)** — w-128 flex-row gap-8 items-center:
- Indicator square 10×10 bg `#f54a00` rounded-2
- Label "Visitors" + value "275"

**Variant 3 (4098:12184)** — w-124 flex-row gap-12 items-center:
- Divider vertical 3×32 (SVG) à esquerda
- Stack: title "March" 13 bold + linha "Desktop" 10 + value "200" 10 bold

## Cores da paleta (chart 1..5)

- chart-1: `#f54a00` (orange)
- chart-2: `#009689` (teal)
- chart-3: `#104e64` (dark teal)
- chart-4: `#ffb900` (yellow)
- chart-5: `#fe9a00` (orange-darker)

Styles: heading/02 49px, heading/05 25px, body/02 13px, caption/01 10px.
