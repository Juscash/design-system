# Figma — Loading (`4163:13165`) — get_design_context

Page header icon/rotate-cw + "Loading".

## Dots (4163:13318..4163:13333)

3 círculos `size-13` (preto `imgEllipse6` + variante `imgEllipse7` para o ativo). Container `w-45`.
4 animations cycle:
- animation=1: linha reta superior, todos no top
- animation=2: dot1 desce
- animation=3: dot2 desce
- animation=4: dot3 desce
Cada frame muda quem é o "destacado" (imgEllipse7) — anima a cada 1ms (descrição do componente).

## Spinner (4163:13339..4163:13346)

Spinner 40x40 PNG (imgAnimation1 / Ellipse3..5). 4 animations: rotações 0/90/180/-90 graus (via rotate-90, rotate-180, -rotate-90).

## Texto descritivo

- "Dots" → link "Clique aqui para ver o interativo" → figma proto node 4163:13357
- "Spinner" → link "Clique aqui para ver o interativo" → figma proto node 4163:13482
- Animação: "Realizar as animações a cada 1ms."

Styles: heading/02 49px, heading/05 25px, heading/06 20px.
