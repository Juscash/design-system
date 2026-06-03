# Figma — Sombras (`4001:441`) — get_design_context

Frame raiz. Page header (4010:2034) Plus Jakarta Sans Bold 48px "Sombras" + icon/blend.

## Escala de drop-shadow

Cada item é um `color-tag` com box size-80 bg neutral/50 + shadow + tag JetBrains Mono Bold 13px:

| Token | CSS shadow | Node-id |
|---|---|---|
| shadow.xs | 0 1px 2px 0 rgba(0,0,0,0.05) | 4010:2052 |
| shadow.s | 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1) | 4010:2064 |
| shadow.m | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1) | 4010:2075 |
| shadow.l | 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1) | 4010:2086 |
| shadow.xl | 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) | 4010:2097 |
| focus | 0 0 0 3px var(--color/neutral/300,#d4d4d4) | 4010:2119 |
| focus.error | 0 0 0 3px rgba(210,25,11,0.4) | 4048:14189 |

Styles: heading/02 49px, shadow/xs/s/m/l/xl, focus, focus-error.
