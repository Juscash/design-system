# Figma — Componentes internos (`4041:12783`) — get_design_context

> Página `↳ Componentes internos` (`4247:12021`). Frame raiz da página, contém os helpers usados nos próprios docs do Figma — **não fazem parte do design system público**.

Descrição (4115:9502): *"Esses componentes não fazem parte do design system. São utilizados apenas para organização e suporte interno nos arquivos do Figma."*

## Helpers internos catalogados

### `.slot` (4066:2838) — 43×48

Caixa border-dashed `#9747ff` rounded-8 p-8 com label "Slot" (Geist Medium 14 / 1.5 / 0.07px, cor `#c89dff`). Marca onde um Slot/children deve entrar nas anotações de design.

### `.component page header` (4001:213) — 1680×231

Cabeçalho padrão usado por **todas as páginas de Componentes**:
- bg `color/neutral/700` (#404040)
- rounded-tl/tr 32, padding 32, flex-col gap-48
- Background image (logo Juscash white em `imgEehd9Xsz19K1`, 113.863×20)
- icon/palette 40×40 + título Inter Bold 49 cor `color/neutral/50`
- description Inter Regular 20 cor `color/neutral/50`, pl-56
- prop `showDescription?: boolean`

### `.tag` (4001:2756) — 71×20

Tag pequena para refs hex/token (ver `figma/components/tag/`).

### `.quote` (4023:1663) — 88×45

Bloco para destacar literal/quote:
- bg `color/neutral/200` (#e5e5e5)
- rounded-8 p-8
- Texto JetBrains Mono Bold 24 cor `color/neutral/500`

### `.documentation table` (4004:1641) — 1680×308

4 variantes de linha de tabela usada em docs:
- `heading` (4004:1634): 288×56, JetBrains Mono Bold 16 text/soft
- `line color` (4004:1635): 288×84, círculo de cor 40px + tags (hex + token)
- `line text` (4004:1636): 1664×56, Inter Bold 16 text/soft
- `line text tag` (4180:12092): 1664×56, Inter Bold 16 + `.tag`

### `.note arrow handoff` (4247:12149) — 625×330

Setas com labels para anotação de handoff. 12 variantes (4 directions × 3 types):
- direction: `right`/`top`/`bottom`/`left`
- type: `group`/`primary`/`secondary`
- Each variant tem id 4247:12150..4247:12202

### `.notes handoff` (4247:12206) — 366×246

Cards de nota para handoff:
- `type=documentation` (4247:12207): bg brand/secondary/100 (#a1c6f7) + border brand/secondary/600 (#105abc) + avatar + nome/data
- `type=annotation` (4247:12214): bg neutral/200 + border regular
- Tipografia: JetBrains Mono / Roboto Mono Regular 16/1.4
- shadow/m, rounded radius/400 (16)

### `.px` (4252:11001) — 103×137

Tag indicadora de medida em pixels:
- `horizontal` (4252:10998): h-24, label JetBrains Mono Regular 16 ("24px")
- `vertical` (4252:11002): w-24 h-71, rotacionada
- bg `color/brand/secondary/50` (#c7ddfa)

### `arrow` (4334:12059) — 917×900

9 variantes de seta usada nos handoff notes:
- arrow=curved: types `start`/`bypass-1`/`middle`/`bypass-2`/`end`/`hook`/`corner` (4334:12060..4334:12101)
- arrow=linear: types `right`/`up` (4334:12124, 4334:12138)
- Usa SVGs `line*` e `pointer/circle` + `pointer/arrow`

## Páginas que usam estes helpers

Todas as páginas em `Componentes` (Button, Modal, Tabs, etc.) começam com `.component page header` (4001:213) como page header. Os outros helpers (`.tag`, `.notes handoff`, `arrow`, etc.) aparecem dentro de anotações dos próprios designs.

Styles: heading/02 49px, heading/06 20px, paragraph small/medium (Geist Medium 14/1.5/0.5), body/01 16px, `.Utilities/Component notes/Regular` (Roboto Mono Regular 16/1.4), shadow/m.
