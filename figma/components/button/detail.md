# Detalhes

> Auditoria do `Button` do design-system (`src/components/Button/index.tsx`) renderizado em `http://localhost:5173/button`, comparado contra `design-context-4035-4131-sparse-metadata.md` e `screenshot.png`.
>
> Documento de auditoria — não implemente correções sem autorização.

## O que foi feito a mais:

- A prop `icon` aceita **string** com o nome de um componente do `lucide-react` (ex.: `icon="Search"`) e é resolvida em runtime via `LucideIcons[name]`. O Figma só mostra os ícones desenhados, sem expor essa interface por nome de string.
- A prop `iconPosition` (suportada via antd) permite renderizar o ícone à direita. O Figma só desenha exemplos com ícone à esquerda; o caso de ícone à direita não aparece como variante separada no design (existe visualmente no exemplo `"Próximo"` com chevron à direita, mas não como prop documentada no design).
- Aceita `variant` **e** `type` como sinônimos (`variant` tem prioridade). O Figma só nomeia a propriedade como `variant`.
- Suporte direto às props herdadas do antd `block`, `href`, `htmlType`, `shape` — não documentadas no Figma. A seção do test page "Responsivo (block em mobile)" e "Props herdadas do Antd" cobre esses casos que não têm equivalente no design.
- O componente força `opacity: 1` no estado loading via CSS module (`.ds-button.ant-btn-loading { opacity: 1 !important; }`) — sobrescrevendo o default do antd. Não está descrito no Figma; é um ajuste técnico.
- `aria-label` é aceito (e exigido por convenção no JSDoc) quando o botão é icon-only. O Figma não detalha atributos ARIA, apenas a regra de produto na nota do Tooltip.

## O que faltou fazer:

- **Integração com Tooltip no modo icon-only.** A nota do Figma (`8733:12506`) diz literalmente: _"Botões com label podem ter tooltip opcionalmente. Botões de ícone sempre devem ter tooltip com o nome da ação, sem exceção."_. A implementação atual apenas aceita `aria-label`; não encapsula nem força a renderização de um `<Tooltip>` quando o botão está em modo icon-only.
- **Bloco visual de Tooltip nas stories/test page.** O Figma tem um bloco dedicado (`8733:13465`) demonstrando os dois pares button+tooltip (200×44 e 95×28). O test page `/button` não tem uma seção equivalente que demonstre esse pareamento.
- **Estados `hover & active` e `focus` na matriz estática.** A matriz "Matriz completa" do test page tem só 3 estados estáticos (`default`, `disabled`, `loading`). O design do Figma mostra 5 estados estáticos (default, hover & active, disabled, focus, loading). O test page assume que hover/focus/active são "interativos" — o que é razoável, mas perde a paridade visual com o Figma.

## O que está divergente do figma:

- **Anel de foco usa `outline` com `outline-offset: -1px`, em vez de `box-shadow` com spread 3.**
  - Figma: `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` — equivalente a `box-shadow: 0 0 0 3px #d4d4d4` (3 px **fora** do botão).
  - Implementação (`src/components/Button/index.module.css:32-35`): `outline: 3px solid var(--color-neutral-300); outline-offset: -1px` — o anel começa **1 px dentro** da borda do botão e estende-se 2 px para fora.
  - Visualmente o anel cobre 1 px do interior do botão, enquanto no Figma o anel fica totalmente externo.

- **Disabled de variantes saturadas (primary/secondary/neutral/destructive) tem borda `1 px solid #d9d9d9` indesejada.**
  - Figma: nas variantes saturadas o estado disabled referencia apenas `color/button/<variant>/disabled` (bg `#d4d4d4`) + `color/text/disabled` (texto `#a3a3a3`). **Nenhum token de borda.**
  - Implementação (medido no browser): `border-color: rgb(217, 217, 217) = #d9d9d9; border-width: 1px`. Aplicado a 13/13 botões disabled saturados na página (primary/secondary/neutral/destructive). É o default do antd para `:disabled` que não foi resetado nos tokens dessas variantes.
  - Outline disabled está correto (`#e5e5e5` = `color/border/disabled`) ✓ e ghost disabled está correto (border transparent) ✓.

- **Estado loading mantém o label visível ao lado do spinner; no Figma a largura do símbolo de loading encolhe (label não aparece).**
  - Figma: largura do símbolo `state=loading` é menor que a do `default` (ex.: primary m default 66×36 vs primary m loading 48×36 — diferença de 18 px = um label inteiro removido).
  - Implementação: passar `loading` + `children` (como o test page faz) renderiza `<spinner> <label>` lado a lado. O componente não esconde o label automaticamente quando `loading={true}`.

- **Cor do ícone em IconButton destructive disabled.**
  - Figma: `state=disabled` no icon button destructive (ex.: `4040:7637`) referencia `color/text/light` (`#fafafa`) — ícone branco sobre bg cinza `#d4d4d4`. É a única exceção a "icon = `color/text/disabled`" no design.
  - Implementação: `getDestructiveTokens()` define `colorTextDisabled: neutral[400]` (`#a3a3a3`), aplicado tanto a button textual quanto a icon-only. O icon-only destructive disabled fica com ícone `#a3a3a3`, não `#fafafa`.
  - Esta divergência não é visível no test page atual (a seção icon-only só renderiza estado default), mas existe no nível dos tokens.

- **Token de cor de texto em estado loading é `colorTextLightSolid` / `colorText` da variante, não o token específico `color/text/light` / `color/text/dark` do Figma.**
  - Figma: os símbolos `state=loading` referenciam explicitamente `color/text/light` (`#fafafa`) para variantes saturadas e `color/text/dark` (`#262626`) para neutral/outline/ghost.
  - Implementação: o spinner e o conteúdo herdam o `color` do botão (`colorTextLightSolid` do antd, que é `neutral[50]` = `#fafafa` para saturados e `neutral[800]` = `#262626` para neutros). O resultado de pixel é o mesmo, mas o **alias do token** é diferente — `color/text/light` ↔ `color/neutral/50` resolvem para o mesmo `#fafafa`, mas o Figma escolheu o alias `color/text/*` aqui.
  - Pixel-perfect: ✓ (mesma cor renderizada). Token semântico: divergente.
