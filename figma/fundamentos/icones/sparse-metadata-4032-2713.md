# Figma — Ícones (`4032:2713`) — sparse metadata

> Resposta original chegou a ~143KB de TSX (truncada — `design-context-4032-2713.json` copia o arquivo completo).

Frame raiz da seção Ícones em Fundamentos. Page header Plus Jakarta Sans Bold 48px "Ícones" + icon/star. Lista todos os tokens `icon/*` do design system, organizados por categoria (action, file, navigation, status, social, etc.).

Cada ícone é um símbolo Lucide-style desenhado em SVG, 16x16 por padrão (com viewBox 24 e inset 8.33% padronizado em todos os ícones). O DS usa `lucide-react` como provedor único — qualquer `icon/<nome>` no Figma é o equivalente Lucide React do mesmo nome (camelCase no import).

Padrão de uso:
- Tamanhos: `size-12`, `size-16`, `size-20`, `size-24`, `size-40`. Tamanho default = 16.
- Cor: herda `currentColor` ou usa `color/text/dark` / `color/text/soft` / cores semânticas.
- Trace: stroke padrão Lucide (1.5px no viewBox 24, ajustado pelo browser).

Lista expandida e renderização canônica vivem no JSON `design-context-4032-2713.json` colocado em `./figma/fundamentos/icones/`.

Styles: heading/02 49px.
