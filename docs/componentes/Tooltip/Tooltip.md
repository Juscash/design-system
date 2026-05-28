# Tooltip — Parecer técnico

> Documento de referência do componente `Tooltip` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`). Todos os valores listados aqui
> têm node-id correspondente no Figma; valores não verificados estão
> explicitamente marcados como incerteza na seção 11.

- **Figma — frame `tooltip` (matriz `side`):**
  [`tooltip (4041:9017)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4041-9017)
- **Figma — instância de exemplo na página `Badge`:**
  [`tooltip (8735:14474)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8735-14474)
- **Arquivo no repo:** `src/components/Tooltip/index.tsx`
- **Tipos:** `src/types/components/Tooltip/index.ts`
- **Stories:** `src/components/Tooltip/Tooltip.stories.tsx`
- **Testes:** `src/components/Tooltip/Tooltip.test.tsx`
- **CSS Module:** `src/components/Tooltip/index.module.css`
- **Página de testes:** `design-system-tests/src/pages/tooltip/index.tsx`

> **Observação metodológica.** Em
> `src/components/Tooltip/index.tsx` e `Tooltip.stories.tsx` há referência ao
> node `4041:11954` como "frame raiz" do componente. **Nesta sessão MCP esse
> node não pôde ser inspecionado** (rate-limit do servidor MCP da Figma após
> bater nos child nodes), portanto qualquer atributo desse frame específico
> não está documentado abaixo — só estão documentados os valores extraídos
> dos nodes que efetivamente respondi via MCP nesta sessão: `4041:9017`
> (frame `tooltip` com matriz `side`), seus filhos `4041:9018`..`4041:9029` e
> a instância `8735:14474`. Ver §11.

---

## 1. Contexto e finalidade

O `Tooltip` é o componente de **mensagem flutuante curta** — exibe um texto
auxiliar sobre um elemento âncora (botão, ícone, badge, link) acionado por
hover (padrão) e, opcionalmente, por foco ou clique quando configurado via
`trigger`. O tooltip é fechado quando o cursor/foco sai. Tooltips servem
para esclarecer rótulos truncados, descrever ações de ícones e oferecer
contexto secundário sem ocupar área permanente da UI.

Wrapper sobre o `Tooltip` do Ant Design 6 (`antd/lib/tooltip`). A camada do
design system aplica:

1. **Identidade visual** (fundo escuro `neutral/800`, texto claro
   `neutral/50`, radius `8`, tipografia Inter 13 px) via `ConfigProvider`
   local + overrides em `index.module.css`.
2. **Largura máxima** de 200 px (extraída do exemplo de uso na página
   `Badge`, node `8735:14474`).
3. **Direção da seta** alinhada à variante `side` do Figma — sai
   automaticamente do `placement` repassado ao Antd.

---

## 2. Anatomia (Figma)

### 2.1. Frame `tooltip` (matriz `side`) — `4041:9017`

Frame `464 × 76 px` na página `Componentes`. Contém **4 variantes** num
único eixo, todas com a mesma largura/altura interna `86 × 28 px`:

| Variant   | Node ID     | Posição (x, y) | Tamanho | Confirmado em                                            |
| --------- | ----------- | -------------- | ------- | -------------------------------------------------------- |
| `bottom`  | `4041:9018` | (24, 24)       | 86 × 28 | `get_metadata 4041:9018` + `get_design_context 4041:9017` |
| `top`     | `4041:9021` | (134, 24)      | 86 × 28 | `get_metadata 4041:9021`                                  |
| `left`    | `4041:9024` | (244, 24)      | 86 × 28 | `get_metadata 4041:9024`                                  |
| `right`   | `4041:9027` | (354, 24)      | 86 × 28 | `get_metadata 4041:9027`                                  |

**Estrutura interna de cada variante** (`get_design_context 4041:9017`):

```
<container flex row center, bg neutral/800, gap 8, px 8, py 6, radius 8>
  <p text="Tooltip text" font=Inter Regular 13 lh=1.2 color=neutral/50 word-break=break-word flex-1 />
  <Arrow 11.5×5 position=fora absoluto (side dependente) />
</container>
```

Cada variante difere apenas pela **posição absoluta da seta**:

| Side     | Posição da seta (relativa ao container)            | Rotação                              |
| -------- | -------------------------------------------------- | ------------------------------------ |
| `bottom` | `bottom: -5px; left: calc(50% - 0.25px)`            | sem rotação                           |
| `top`    | `top: -5px; left: calc(50% - 0.25px)`               | `-scale-y-100` (espelha verticalmente) |
| `left`   | `left: -5px; top: 50% (centralizada vertical)`      | `-rotate-90` + `-scale-y-100`         |
| `right`  | `right: -5px; top: 50% (centralizada vertical)`    | `-rotate-90`                          |

### 2.2. Subcomponentes do frame

- **`Tooltip text`** (`4041:9019` para variante `bottom`, `4041:9022` para
  `top`, `4041:9025` para `left`, `4041:9028` para `right`): elemento
  textual `70 × 16 px` com o sample "Tooltip text".
- **`Arrow`** (`4041:9020` para `bottom`, `4041:9023` para `top`, `4041:9026`
  para `left`, `4041:9029` para `right`): vector `11.5 × 5 px` — confirmado
  em `get_metadata 4041:9020` (`width="11.5" height="5"`) e
  `get_metadata 4041:9023`. Renderizado como asset SVG no Figma.

### 2.3. Instância usada em exemplo do Badge — `8735:14474`

Instância encontrada via `get_metadata 4080:6201` (frame `Badge`, página
`Componentes`) na seção de exemplos "Tooltip examples". Dimensões
`200 × 44 px`, texto `"Lorem ipsum dolor sit amet, consectetur adipiscing
elit."`. Confirmado em `get_design_context 8735:14474`:

- `max-width` implícito: 200 px (largura do frame).
- A instância renderiza apenas o lado `bottom` da matriz (`side=bottom` é
  a variante default na tipagem retornada pelo `get_design_context
  4041:9017`).
- O texto **quebra em múltiplas linhas** quando excede a largura — o frame
  resultante tem 44 px de altura para acomodar 2 linhas (`word-break:
  break-word` + `flex-1` no `<p>`).

---

## 3. Tokens extraídos do Figma

Todos os valores abaixo vieram de `get_design_context 4041:9017`,
`get_design_context 8735:14474` e `get_variable_defs 8735:14474`.

### 3.1. Container

| Atributo              | Valor Figma                              | Foundation                       | Node-id origem        |
| --------------------- | ---------------------------------------- | -------------------------------- | --------------------- |
| Background            | `var(--color/neutral/800)` (`#262626`)   | `designSystemColors.neutral[800]` | `4041:9017`, `8735:14474` |
| Padding inline (X)    | `8px`                                    | `spacing[2]`                     | `4041:9017`           |
| Padding block (Y)     | `6px`                                    | _(intermediário entre `spacing[1]=4` e `spacing[2]=8`; **não há token exato**)_ | `4041:9017` |
| Gap (text ↔ arrow)    | `8px`                                    | `spacing[2]`                     | `4041:9017`           |
| Border radius         | `8px`                                    | `radius.xl`                      | `4041:9017`, `8735:14474` |
| Max width             | `200px`                                  | _(constante proprietária — sample do Figma)_ | `8735:14474` |
| Alignment             | `flex`, `items-center`, `justify-center` | —                                | `4041:9017`           |
| Shadow                | _(nenhum no frame)_                      | —                                | `4041:9017`           |
| Border                | _(nenhum)_                               | —                                | `4041:9017`           |

> **Padding Y = 6 px é o único valor que não casa com nenhum token de
> `spacing`** (que oferece `1=4` e `2=8`, sem 6). Trata-se de número
> proprietário do componente — extraído fiel do Figma. Não há indício no
> Figma de que deva ser substituído por `4` ou `8`; mantém-se `6` literal.

### 3.2. Texto

| Atributo       | Valor Figma                          | Foundation                   | Node-id origem |
| -------------- | ------------------------------------ | ---------------------------- | -------------- |
| Família        | `Inter`                              | `typography.fontFamily`      | `4041:9019`, `8735:14474` |
| Peso           | `400` (Regular)                      | `typography.fontWeight`      | `4041:9019`    |
| Tamanho        | `13px`                               | `typography.scale.body2.px`  | `4041:9019`    |
| Line height    | `1.2` (multiplicador unitless)        | `body/02 - 13px`             | `4041:9019`, `8735:14474` |
| Letter spacing | `0`                                  | `typography.letterSpacing`   | `4041:9019`    |
| Cor            | `var(--color/neutral/50)` (`#fafafa`) | `designSystemColors.neutral[50]` | `4041:9019`, `8735:14474` |
| Quebra de linha | `word-break: break-word`            | —                            | `4041:9017`, `8735:14474` |
| Layout interno | `flex: 1 0 0; min-width: 1px`        | —                            | `4041:9017`    |
| Sample default | `"Tooltip text"`                     | —                            | `4041:9019`    |
| Sample longo   | `"Lorem ipsum dolor sit amet, consectetur adipiscing elit."` | — | `8735:14474` |

> Esse texto é equivalente à variante tipográfica `body/02` da escala do
> design system (`typography.scale.body2`). O Figma reporta o line-height
> como `1.2` unitless via `body/02 - 13px`; equivale a `15.6px` em pixels
> absolutos (`13 × 1.2`).

### 3.3. Seta (Arrow)

| Atributo            | Valor Figma | Implementação atual (Antd) | Node-id origem |
| ------------------- | ----------- | -------------------------- | -------------- |
| Largura (top/bottom) | `11.5px`   | `11.5px` (via `sizePopupArrow`) | `4041:9020`, `4041:9023` |
| Altura (top/bottom)  | `5px`      | **`~8.13px`** (= `11.5 / √2`, computado pelo Antd) | `4041:9020`    |
| Largura (left/right) | `5px`      | **`~8.13px`** (= mesma fórmula com eixo transposto) | inferido por rotação |
| Altura (left/right)  | `11.5px`   | `11.5px` | inferido por rotação |
| Cor                  | `#262626` (mesmo do container) | `neutral[800]` | `4041:9017` |
| Asset                | SVG (`e55bb64bc340bda2b9d5f2b24efa614f5b2c4431.svg` em localhost MCP) | clip-path nativo do Antd | `4041:9017` |

> **Desvio conhecido em relação ao Figma:** a altura da seta no design é
> `5px` (Figma), mas a implementação delega geometria/translação ao Antd via
> `sizePopupArrow: 11.5` para garantir que o posicionamento por `placement`
> (top/bottom/left/right) funcione consistentemente. O Antd força aspecto
> `1 / √2`, resultando em altura `~8px` em vez de `5px`. **Tentativas de
> override por CSS (`width`/`height` no wrapper + `clip-path` ou `scale` no
> `::before`)** causaram gap visível entre a seta e o container quando o
> wrapper era rotacionado em `left`/`right`, porque a translation matrix
> do Antd é calibrada para a geometria padrão do token. O trade-off aceito:
> altura levemente maior em troca de seta renderizando em todos os 4
> placements sem buraco. Reavaliar quando o Antd expor `sizePopupArrowHeight`
> como token independente, ou quando o Figma confirmar novo valor.

A seta é um **triângulo escaleno** (não isósceles) no Figma: inset CSS
retornado pelo `get_design_context` é `inset[0_0_6.51%_0]` na vertical — ou
seja, a seta ocupa toda a largura mas deixa 6.51% de margem inferior,
sugerindo ponta levemente "achatada" na base.

### 3.4. Estados

A matriz `4041:9017` **não publica eixo `state`** — apenas o eixo `side`.
Por isso o parecer não documenta variações hover/focus/active **no
container do tooltip em si**: o tooltip é portal, não é elemento
interativo. Os estados interativos pertencem ao **âncora** (botão, ícone,
badge) e cobrem-se nos seus próprios pareceres.

> Caso o Figma exponha mais tarde estados (ex.: `state=focus` no tooltip
> para indicar foco com teclado), o parecer precisará ser atualizado a
> partir do MCP — não documentar nada que não esteja no frame.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → neutral[50], neutral[800]
src/theme/foundations/spacing     → spacing[2] (8) — padding X + gap
src/theme/foundations/radius      → radius.xl (8)
src/theme/foundations/typography  → body2 (13 / lh 1.2 / Inter / 400)
```

Não consome `shadow` (nenhum no frame), nem `breakpoints` (tooltip não
publica versão responsiva no Figma — ver §10).

---

## 5. Anatomia da implementação

### 5.1. Props proprietárias

O wrapper atual **não adiciona props proprietárias além das do Antd** — só
herda `TooltipProps` via `export type TooltipProps = AntdTooltipProps`.
A customização visual é injetada por `ConfigProvider` e CSS Module global
(seletor `.ds-tooltip` aplicado em `classNames.root`).

| Prop herdada do Antd | Tipo                       | Observação no contexto do design system |
| -------------------- | -------------------------- | --------------------------------------- |
| `title`              | `ReactNode`                | Conteúdo do tooltip. Aceita string ou JSX. |
| `placement`          | `TooltipPlacement` (Antd)  | `top \| topLeft \| topRight \| bottom \| bottomLeft \| bottomRight \| left \| leftTop \| leftBottom \| right \| rightTop \| rightBottom`. Os 4 eixos canônicos `top/bottom/left/right` casam com a matriz `side` do Figma. |
| `trigger`            | `"hover" \| "focus" \| "click" \| "contextMenu" \| Array<...>` | Default Antd: `"hover"`. Mantido. |
| `open` / `defaultOpen` | `boolean`                | Controle externo da visibilidade. |
| `mouseEnterDelay`    | `number` (segundos)        | Default Antd: `0.1`. Mantido. |
| `mouseLeaveDelay`    | `number` (segundos)        | Default Antd: `0.1`. Mantido. |
| `arrow`              | `boolean \| { pointAtCenter: boolean }` | Default Antd: `true`. A seta extraída do Figma (`4041:9020`) é renderizada via override do `::before` em `index.module.css`. |
| `color`              | `string`                   | **Override de cor do fundo** — a camada Juscash já fixa `neutral/800` via CSS Module com `!important`, então este prop fica neutralizado no skin Juscash. |
| `getPopupContainer`  | `(triggerNode) => HTMLElement` | Útil para SSR / casos de portal customizado. |
| `overlayClassName`   | `string` _(legacy)_        | Aceito e mesclado com `classNames.root` (`ds-tooltip`). |
| `overlayStyle`       | `CSSProperties` _(legacy)_ | Aceito e mesclado com `styles.root`. |
| `overlayInnerStyle`  | `CSSProperties` _(legacy)_ | Aceito e mesclado com `styles.container`. |
| `classNames`         | `{ root?, container?, arrow? } \| (({ props }) => …)` | API semântica nova do Antd 6, aceita objeto ou função. |
| `styles`             | `{ root?, container?, arrow? } \| (({ props }) => …)` | Idem. |

### 5.2. Composição

- `<Tooltip>` envolve qualquer elemento via `children` (mesmo padrão do
  Antd). O `children` precisa aceitar `ref` e props de evento (hover,
  focus) — botões, ícones, badges nativos servem.
- Conteúdo do tooltip vai em `title`. Strings e JSX são suportados.
- O posicionamento é decidido pelo Antd a partir de `placement`; a seta
  é gerada automaticamente.

### 5.3. Estilos aplicados via CSS Module

O `index.module.css` precisa permanecer **global** (`:global(.ds-tooltip)`)
porque o Antd renderiza o tooltip em portal fora da árvore do componente
React-side. Os seletores aplicam:

- `display: flex; align-items: center; justify-content: center` no
  container — bate com `4041:9017`.
- `gap: 8px; padding: 6px 8px; border-radius: 8px` — bate com
  `4041:9017` e `8735:14474`.
- `background: var(--color-neutral-800); color: var(--color-neutral-50)`
  — bate com `4041:9017`.
- `font-family: "Inter"; font-size: 13px; line-height: 1.2` — bate com
  `4041:9019`.
- `max-width: 200px` — bate com `8735:14474`.
- `border: none; box-shadow: none` — bate com `4041:9017` (nenhuma
  borda nem sombra no Figma).
- Seta dimensionada `11.5 × 5` (vertical, top/bottom) e `5 × 11.5`
  (horizontal, left/right) com `transform-origin` e `scale` — bate com
  `4041:9020`.

---

## 6. Comportamentos e interações

> Todos os comportamentos abaixo derivam de **defaults do Antd 6** ou da
> própria semântica de portal. **Não há comentário no Figma** documentando
> debounce ou outros tempos específicos para o tooltip Juscash nesta
> sessão MCP. Se houver — ver §11 — atualizar a partir de uma sessão MCP
> nova.

| Comportamento        | Padrão atual            | Origem                          |
| -------------------- | ----------------------- | ------------------------------- |
| Trigger default      | `hover`                 | Antd default                    |
| Delay para abrir     | `0.1s` (`mouseEnterDelay`) | Antd default                |
| Delay para fechar    | `0.1s` (`mouseLeaveDelay`) | Antd default                |
| Posicionamento       | `top` (default Antd)    | Antd default                    |
| Direção da seta      | Acompanha `placement`   | Override do `index.module.css` para alinhar com `4041:9018..9029` |
| Aparição em foco com teclado | Por default, tooltip abre apenas em `hover`. Para abertura por foco com teclado é necessário o consumidor passar `trigger={['hover', 'focus']}`. | Antd default |
| Fecha ao perder hover/focus | Imediato após `mouseLeaveDelay` | Antd default              |
| Renderização         | Portal em `document.body` (ou `getPopupContainer`) | Antd `Trigger` |
| Supressão e liberação de ancestral aninhado | Quando um Tooltip filho abre, o(s) ancestral(is) na mesma árvore React são **suprimidos** (escondidos visualmente); o estado natural de hover do Antd continua sendo rastreado. Quando o filho fecha, o ancestral é **liberado** e volta a aparecer se o cursor ainda estiver sobre seu âncora. Implementação via `TooltipParentControlContext` (suppress/release); funciona com tooltips uncontrolled e respeita `onOpenChange` quando controlled. | **Proprietário Juscash** — regra pedida pelo usuário, **não documentada no Figma**; evita empilhamento visual em áreas hoveráveis aninhadas e preserva continuidade de hover ao sair de elementos internos. |

---

## 7. Responsividade

O frame `4041:9017` e a instância `8735:14474` **não documentam variações
mobile/tablet/desktop**. As únicas restrições visuais são:

- `max-width: 200px` — força quebra de linha quando o texto for longo
  (visível na instância `8735:14474`, que tem altura 44 px para 2 linhas).
- Posicionamento delegado ao Antd, que reposiciona automaticamente quando
  o tooltip extrapolaria a viewport.

Não há tokens de breakpoint aplicados ao tooltip.

---

## 8. Acessibilidade (WCAG 2.1 AA)

| Critério                       | Status      | Notas                                                                                              |
| ------------------------------ | ----------- | -------------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum)       | OK          | `neutral/800 #262626` (fundo) × `neutral/50 #fafafa` (texto) = contraste `~16.6:1`, muito acima de 4.5:1. |
| 1.4.11 Non-text Contrast       | OK          | Seta usa o mesmo fundo do container — contraste do tooltip contra a página vem do `neutral/800`.   |
| 1.4.13 Content on Hover / Focus | Cobrir     | Texto deve ser dispensível (`Esc` fecha), pairável (não desaparecer ao mover mouse para o tooltip) e persistente até hover/focus saírem. O default do Antd já satisfaz "pairável" e "persistente"; "dispensível por Esc" depende do consumidor adicionar handler — recomendado documentar como uso. |
| 2.1.1 Keyboard                 | Cobrir      | Default do Antd 6 é `trigger="hover"`, que **não abre por teclado**. Para satisfazer o critério, o consumidor precisa estender explicitamente o `trigger` (ex.: `trigger={['hover', 'focus']}`) ao usar o tooltip em âncoras focalizáveis. Documentar no uso. |
| 2.4.7 Focus Visible            | N/A         | Tooltip não é elemento focalizável; o foco visível pertence ao âncora.                              |
| 4.1.2 Name, Role, Value        | OK          | Antd renderiza o conteúdo com `role="tooltip"` e associa via `aria-describedby` no âncora (padrão `rc-tooltip`). |

> **Recomendação para o consumidor**: usar `Tooltip` apenas para texto
> **complementar** — não colocar informação crítica no tooltip, porque
> nem todo dispositivo (touch sem hover) consegue acioná-lo
> previsivelmente.

---

## 9. Aderência às regras

| Regra                                              | Status                                            |
| -------------------------------------------------- | ------------------------------------------------- |
| `general.comment_language` = pt-BR                 | OK — JSDoc em pt-BR.                              |
| `general.max_file_lines` = 300                     | OK — `index.tsx` ~105 linhas.                     |
| `general.max_function_lines` = 50                  | OK — `resolveSemanticValue` (helper) ~10 linhas; `Tooltip` ~50 linhas. |
| `typescript.disallow_any` + `require_return_types` | OK — sem `any`; tipos de retorno declarados.       |
| `typescript.types_in_separate_file`                | OK — tipos em `src/types/components/Tooltip/index.ts`. |
| `architecture.max_props` = 8                       | OK — wrapper herda props do Antd, sem adicionar; nenhuma prop proprietária. |
| CSS Module + tokens                                | OK — `index.module.css` consome `var(--color-neutral-800)` e `var(--color-neutral-50)`. Padding Y = 6 px é literal (sem token equivalente). |

---

## 10. Análise da implementação atual

Cruzando os valores do MCP com `src/components/Tooltip/index.tsx` e
`index.module.css`:

| #  | Token Figma                          | Implementação                                       | Status |
| -- | ------------------------------------ | ---------------------------------------------------- | ------ |
| 1  | Container bg `neutral/800`           | `designSystemColors.neutral[800]` em `ConfigProvider` + `--color-neutral-800` no CSS Module | OK     |
| 2  | Texto cor `neutral/50`               | `designSystemColors.neutral[50]` + `--color-neutral-50` | OK     |
| 3  | Border radius `8`                     | `radius.xl` no `ConfigProvider` + `border-radius: 8px` no CSS Module | OK     |
| 4  | Font Inter 13 lh 1.2                  | `fontFamily: '"Inter", sans-serif'` + `fontSize: 13` + `lineHeight: 1.2` | OK     |
| 5  | Padding `6px 8px`                    | `padding: 6px 8px !important` no CSS Module          | OK     |
| 6  | Gap `8`                               | `gap: 8px !important` no CSS Module                  | OK     |
| 7  | Max width `200`                       | `max-width: 200px !important` no CSS Module + `MAX_TOOLTIP_WIDTH = 200` | OK     |
| 8  | Sem borda                             | `border: none !important`                            | OK     |
| 9  | Sem sombra                            | `box-shadow: none !important`                        | OK     |
| 10 | Seta `11.5 × 5` (vertical)            | `width: 11.5px; height: 5px` para `placement-top/bottom` | OK     |
| 11 | Seta `5 × 11.5` (horizontal)          | `width: 5px; height: 11.5px` para `placement-left/right` | OK     |
| 12 | Seta cor = `neutral/800`              | `background: var(--ds-tooltip-bg)` no `::before`     | OK     |

A implementação atual está alinhada com o frame `4041:9017`. Nenhuma
divergência detectada nos valores que foram inspecionados via MCP nesta
sessão.

---

## 11. Pendências, incertezas e ampliações

Itens que o **doc-reviewer** deve checar / itens não confirmados nesta
sessão MCP:

1. **Frame raiz `4041:11954`.** Tanto o JSDoc do componente
   (`src/components/Tooltip/index.tsx:30`) quanto a story
   (`Tooltip.stories.tsx:11`) referenciam este node como "base" do
   componente. Nesta sessão não foi possível inspecioná-lo via
   `get_metadata`, `get_variable_defs` ou `get_design_context` (rate-limit
   MCP). É necessário validar:
   - se existe e é o frame contêiner do componente Tooltip;
   - se publica **mais variantes** além do `side` (por exemplo, tamanhos,
     `state`, `kind=icon`);
   - se tem comentários/descrição com regras de delay, comportamentos,
     templates.
2. **Subcomponente "Icon tooltip"** listado em
   `design-system-tests/mapeamento.md` (item 45.1) — não foi encontrado
   como nó separado nesta sessão. Pode ser uma composição
   (`Tooltip` + ícone do Lucide como `children`), ou pode ser um frame
   próprio na página `Componentes`. Investigar com MCP num próximo
   ciclo.
3. **Padding Y = 6 px sem token equivalente.** A escala `spacing` tem
   apenas `1=4` e `2=8`, não `6`. Confirmado fiel ao Figma, mas pode ser
   sinal de gap na foundation `spacing` ou desvio do designer.
   doc-reviewer pode questionar.
4. **`max-width: 200 px`** foi extraído da instância de exemplo
   `8735:14474` (página `Badge`). Não há garantia, pelo MCP desta sessão,
   de que esse valor está no frame raiz do tooltip — pode ser um override
   da instância. Validar no `4041:11954` quando inspecionável.
5. **Comportamentos (delay de abertura/fechamento, animação)**: nenhum
   comentário do Figma foi lido nesta sessão. Defaults usados são do Antd
   (0.1 s). Se houver descrição no frame raiz, atualizar §6.
6. **Status colors / variantes destrutivas (erro/sucesso/aviso)**: outros
   componentes (Badge, Alert) publicam uma sub-paleta. **Não foi
   identificada matriz `kind=success|error|warning|info` no tooltip nesta
   sessão MCP.** Documentar apenas se aparecer em sessão futura.
7. **Posicionamentos extras do Antd** (`topLeft`, `topRight`,
   `bottomLeft`, `bottomRight`, `leftTop`, `leftBottom`, `rightTop`,
   `rightBottom`) **não estão no Figma** — só os 4 canônicos. A
   implementação repassa todos para o Antd (e o `Placements` story os
   exibe). Tratar como ampliação técnica funcional do wrapper, não como
   fidelidade ao Figma.
8. **Página de testes `design-system-tests/src/pages/tooltip/index.tsx`**
   está como placeholder (`<h1>Tooltip</h1>`). Falta cobrir as quatro
   posições (top/bottom/left/right), texto longo (com quebra), texto
   curto, e tooltip sobre ícone — sem `.map`, conforme regra do escopo de
   testes.
9. **Dimensões da seta para `left`/`right` (`5 × 11.5 px`)** estão
   marcadas como **inferido por rotação `-90deg`** a partir da seta
   vertical (`4041:9020`/`4041:9023`). Verificar diretamente nos nodes
   `4041:9026` (Arrow do `left`) e `4041:9029` (Arrow do `right`) na
   próxima sessão MCP — nesta sessão o `get_metadata` retornou
   `rate limit exceeded`.
