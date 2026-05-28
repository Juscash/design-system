# Tooltip — Critérios de Aceite

> Gerado a partir de `Tooltip.md` (parecer aprovado, loop A fechado).
> Cada AC tem referência à seção do parecer que o origina.
> Nenhum AC foi escrito sobre eixo/variante/estado não documentado no parecer.

---

## Variantes (`side`)

> Fonte: §2.1 — frame `4041:9017`, 4 variantes no eixo `side`.

- [ ] Tooltip com `placement="top"` renderiza a seta posicionada **acima** do container (topo, centralizada horizontalmente).
- [ ] Tooltip com `placement="bottom"` renderiza a seta posicionada **abaixo** do container (base, centralizada horizontalmente).
- [ ] Tooltip com `placement="left"` renderiza a seta posicionada à **esquerda** do container (centralizada verticalmente).
- [ ] Tooltip com `placement="right"` renderiza a seta posicionada à **direita** do container (centralizada verticalmente).
- [ ] Cada uma das 4 variantes renderiza o container com os mesmos tokens visuais (fundo, texto, radius, padding) — apenas a posição da seta muda.

---

## Subcomponentes

> Fonte: §2.2 — `Tooltip text` (nodes `4041:9019..9028`) e `Arrow` (nodes `4041:9020..9029`).

### Tooltip text

- [ ] O subcomponente de texto exibe o conteúdo passado em `title` (string ou ReactNode).
- [ ] Quando o conteúdo excede a largura do container, o texto **quebra em múltiplas linhas** (`word-break: break-word`), conforme instância `8735:14474` com 2 linhas a 44 px de altura.
- [ ] O texto ocupa largura flexível (`flex: 1`) dentro do container.

### Arrow

- [ ] A seta é renderizada com largura `11.5 px` e altura `5 px` para os placements verticais (`top` / `bottom`), conforme nodes `4041:9020` e `4041:9023`.
- [ ] A seta é renderizada com largura `5 px` e altura `11.5 px` para os placements horizontais (`left` / `right`), conforme rotação inferida de `-90deg` a partir da seta vertical.
- [ ] A cor de preenchimento da seta é igual ao fundo do container (`neutral[800]` / `#262626`), tornando-a visualmente integrada ao balão.
- [ ] A seta acompanha automaticamente o `placement` passado — não exige configuração manual além da prop `placement`.

---

## Tokens e Estilo

> Fonte: §3.1, §3.2, §3.3, §5.3 — valores extraídos via MCP dos nodes `4041:9017` e `8735:14474`.

### Container

- [ ] Background do container é `var(--color-neutral-800)` (`#262626` — `designSystemColors.neutral[800]`).
- [ ] `padding` do container é `6px 8px` (padding-block `6 px`, padding-inline `8 px`).
- [ ] `gap` entre texto e seta é `8 px` (`spacing[2]`).
- [ ] `border-radius` do container é `8 px` (`radius.xl`).
- [ ] `max-width` do container é `200 px`.
- [ ] Container **não** possui borda (`border: none`).
- [ ] Container **não** possui sombra (`box-shadow: none`).
- [ ] Container usa `display: flex`, `align-items: center`, `justify-content: center`.

### Texto

- [ ] Fonte do texto é `Inter` (Regular 400).
- [ ] Tamanho da fonte é `13 px` (`typography.scale.body2`).
- [ ] Line-height do texto é `1.2` (unitless — equivale a `15.6 px`).
- [ ] Cor do texto é `var(--color-neutral-50)` (`#fafafa` — `designSystemColors.neutral[50]`).
- [ ] Letter-spacing do texto é `0`.

---

## Comportamentos e Interações

> Fonte: §6 — defaults do Antd 6 mantidos sem sobrescrita.

- [ ] O trigger padrão é `hover` — tooltip abre quando o cursor entra no âncora e fecha quando sai.
- [ ] `mouseEnterDelay` padrão é `0.1 s` (default Antd, sem sobrescrita).
- [ ] `mouseLeaveDelay` padrão é `0.1 s` (default Antd, sem sobrescrita).
- [ ] O tooltip **não** abre por foco de teclado por padrão; para isso o consumidor deve passar `trigger={['hover', 'focus']}` explicitamente.
- [ ] O tooltip fecha ao mover o cursor para fora do âncora após `mouseLeaveDelay`.
- [ ] O tooltip é renderizado em portal (`document.body` por padrão, customizável via `getPopupContainer`).
- [ ] **Regra aninhada (proprietária Juscash, não documentada no Figma):** quando um Tooltip filho abre dentro de um Tooltip pai (mesma árvore React), o pai é **suprimido** visualmente via `TooltipParentControlContext` enquanto o filho está aberto.
- [ ] **Liberação de ancestral aninhado:** quando o filho fecha, o pai é **liberado** e volta a ser exibido automaticamente se o estado natural de hover do Antd ainda estiver `true` (cursor ainda sobre o âncora do pai). Funciona com tooltips uncontrolled e respeita `onOpenChange` quando controlled.

---

## Acessibilidade (WCAG 2.1 AA)

> Fonte: §8 — tabela de critérios WCAG.

- [ ] O contraste entre fundo `neutral/800` (`#262626`) e texto `neutral/50` (`#fafafa`) é de aproximadamente 16.6:1, acima do mínimo de 4.5:1 exigido pelo critério 1.4.3.
- [ ] O Antd renderiza o conteúdo do tooltip com `role="tooltip"` no nó do portal.
- [ ] O elemento âncora recebe `aria-describedby` apontando para o id do tooltip (padrão `rc-tooltip` do Antd), satisfazendo o critério 4.1.2.
- [ ] O tooltip **não** é elemento focalizável — `2.4.7 Focus Visible` não se aplica ao balão em si; o foco visível pertence ao âncora.
- [ ] Quando `trigger` inclui `'focus'`, o tooltip abre ao focar o âncora por teclado e fecha ao sair do foco.
- [ ] O tooltip satisfaz o critério 1.4.13 pelo padrão do Antd: é **pairável** (não desaparece ao mover o mouse para dentro do balão) e **persistente** (permanece aberto até o cursor/foco sair).

---

## Aderência às Regras do Design System

> Fonte: §9 — tabela de regras do `.code-review.json`.

- [ ] O arquivo `src/components/Tooltip/index.tsx` possui no máximo 300 linhas.
- [ ] Nenhuma função em `index.tsx` excede 50 linhas.
- [ ] Os tipos do componente estão em arquivo separado `src/types/components/Tooltip/index.ts` (não inline no `index.tsx`).
- [ ] Nenhum `any` é usado — todos os tipos são explícitos ou `unknown`.
- [ ] O componente exportado possui `Tooltip.displayName = "Tooltip"`.
- [ ] Os estilos proprietários estão em `index.module.css` com seletores `:global(.ds-tooltip)` (necessário porque o Antd renderiza o portal fora da árvore React).
- [ ] O CSS Module usa `var(--color-neutral-800)` e `var(--color-neutral-50)` em vez de literais hex.
- [ ] O padding `6px 8px` pode ser literal (não há token equivalente para `6 px` na escala `spacing` — `spacing[1]=4`, `spacing[2]=8`); nenhuma violação de "sem número mágico" é aberta por este valor.
- [ ] Comentários e JSDoc estão em pt-BR.
- [ ] Não há `console.log`, `debugger` nem código comentado no arquivo de implementação.
- [ ] O wrapper herda `TooltipProps` do Antd sem adicionar props proprietárias — nenhum contador de "máximo 8 props" é ultrapassado.
- [ ] O componente é re-exportado em `src/components/index.ts`.
