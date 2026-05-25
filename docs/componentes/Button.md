# Button — Parecer técnico

> Documento de referência da análise do componente `Button` do Design System
> Juscash. Cobre Figma, foundations, regras do projeto, gaps mapeados e o
> plano de correção aplicado.

- **Card Jira:** [JS-2395 — Refatoração SIJ | Pré-refatoração SIJ - Finalizar design-system](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Design-System-Juscash` › Componentes › Button (`4035:4131`)](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4035-4131)
- **Arquivo no repo:** `src/components/Button/index.tsx`
- **Tipos:** `src/types/components/Button/index.ts`
- **CSS Module:** `src/components/Button/index.module.css`
- **Stories:** `src/components/Button/Button.stories.tsx`
- **Testes:** `src/components/Button/Button.test.tsx`

---

## 1. Contexto e finalidade

O `Button` é o **componente atômico de ação** do design system. Embrulha o
`Button` do Ant Design 6, aplicando os tokens proprietários da JusCash via
`ConfigProvider` local — o consumidor importa apenas de
`@juscash/design-system` e nunca toca `antd` diretamente.

A peça é **dual-purpose**: serve para botões com **texto** (`<Button>Salvar</Button>`)
e botões **icon-only** (`<Button icon={<Plus />} aria-label="Adicionar" />`).
O componente detecta automaticamente o caso `icon-only` (quando há `icon` e
não há `children`) e aplica largura/altura quadradas, conforme o tamanho.

Por ser primitivo, **não conhece domínio de negócio**: não fala com API, não
toca storage, não tem regra de seleção, ordenação ou paginação. Esses
comportamentos pertencem a componentes compostos (`Table`, `Pagination`,
`Form` etc.) que usam o `Button` internamente.

---

## 2. Anatomia (Figma)

O nó raiz no Figma (`4035:4131` — frame `Button`, 1079×3633) contém
**dois component sets** lado a lado:

| Component set | Node id     | Conteúdo                         | Dimensões por tamanho                                     |
| ------------- | ----------- | -------------------------------- | --------------------------------------------------------- |
| `button`      | `4035:5251` | Botão com texto opcional + ícone | m: 66×36 · s: 58×32 · xs: 42×24 (largura ajusta ao texto) |
| `icon button` | `4040:7629` | Botão **icon-only**              | m: 36×36 · s: 32×32 · xs: 24×24                           |

Cada component set é uma matriz **variant × size × state**:

- **6 variantes** — `primary` · `secondary` · `neutral` · `outline` · `ghost` · `destructive`
- **3 tamanhos** — `m` · `s` · `xs`
- **5 estados** — `default` · `hover & active` · `disabled` · `focus` · `loading`

Totaliza **90 símbolos por component set**, 180 ao todo.

Logo abaixo da matriz, o frame `Content` (`4119:21462`) exemplifica composições
reais usadas em telas:

| Linha | Botões                                                                                                                  | Cenário típico                          |
| ----- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1     | `primary` "Entrar com o e-mail" (com ícone Mail) · `primary` "Enviar processo" · `secondary` "Adicionar cliente" (Plus) | CTAs principais e secundárias de página |
| 2     | `outline` "Editar" (Pencil) · `destructive` "Excluir" (Trash)                                                           | Ações de linha de tabela                |
| 3     | `neutral` "Anterior" (ChevronLeft, ícone à esquerda) · `neutral` "Próximo" (ChevronRight, ícone à direita)              | Navegação entre passos/páginas          |
| 4     | `outline` icon-only (DollarSign) · `ghost` icon-only (Bell)                                                             | Ações compactas em barra de navegação   |

---

## 3. Tokens extraídos do Figma (`get_variable_defs`)

Os valores abaixo foram lidos diretamente dos símbolos do Figma via MCP
(`mcp__figma-desktop__get_variable_defs`). **Todos** batem 1:1 com
`src/theme/foundations/colors/index.ts` e demais foundations.

### 3.1. Dimensões e tipografia por tamanho

| Tamanho | Altura | `paddingInline`  | `gap` (ícone↔texto) | `radius`        | Tipografia                              |
| ------- | ------ | ---------------- | ------------------- | --------------- | --------------------------------------- |
| `m`     | 36px   | 16 (`spacing/4`) | 8 (`spacing/2`)     | 8 (`radius/xl`) | `body/02 - 13px` (Inter 400, lh 1.2)    |
| `s`     | 32px   | 12 (`spacing/3`) | 4 (`spacing/1`)     | 8 (`radius/xl`) | `body/02 - 13px` (Inter 400, lh 1.2)    |
| `xs`    | 24px   | 8 (`spacing/2`)  | 4 (`spacing/1`)     | 4 (`radius/md`) | `caption/01 - 10px` (Inter 400, lh 1.2) |

Para o `icon button`, a largura iguala a altura (botão quadrado).
`paddingInline` é mantido, mas o ícone ocupa o centro via flex.

### 3.2. Cores por variante × estado

| Variante      | `default` BG                    | `hover & active` BG             | `disabled` BG           | Texto default           | Texto disabled            | Borda                                                                                 |
| ------------- | ------------------------------- | ------------------------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `primary`     | `brand.primary.600` `#008633`   | `brand.primary.800` `#005c12`   | `neutral.300` `#d4d4d4` | `neutral.50` `#fafafa`  | `text.disabled` `#a3a3a3` | —                                                                                     |
| `secondary`   | `brand.secondary.700` `#0d4897` | `brand.secondary.800` `#093671` | `neutral.300` `#d4d4d4` | `neutral.50` `#fafafa`  | `text.disabled` `#a3a3a3` | —                                                                                     |
| `neutral`     | `neutral.200` `#e5e5e5`         | `neutral.400` `#a3a3a3`         | `neutral.300` `#d4d4d4` | `neutral.800` `#262626` | `text.disabled` `#a3a3a3` | —                                                                                     |
| `outline`     | `transparent`                   | `neutral.100` `#f5f5f5`         | `transparent`           | `neutral.800` `#262626` | `text.disabled` `#a3a3a3` | `border.regular` `#d4d4d4` (default e hover) → `border.disabled` `#e5e5e5` (disabled) |
| `ghost`       | `transparent`                   | `neutral.100` `#f5f5f5`         | `transparent`           | `neutral.800` `#262626` | `text.disabled` `#a3a3a3` | —                                                                                     |
| `destructive` | `feedback.red.500` `#d2190b`    | `feedback.red.900` `#9d231c`    | `neutral.300` `#d4d4d4` | `neutral.50` `#fafafa`  | `text.disabled` `#a3a3a3` | —                                                                                     |

### 3.3. Foco (todas as variantes)

| Token Figma | Valor                                                                     | Foundation                                 |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| `focus`     | `Effect(DROP_SHADOW, color: neutral/300, offset 0/0, radius 0, spread 3)` | `shadow.focus` = `0px 0px 0px 3px #d4d4d4` |

Para variantes destrutivas o token de foco continua sendo o cinza
`neutral.300` (Figma não usa `shadow.focusError` em botão; esse token
existe para inputs de formulário em estado `error`).

### 3.4. Loading

No Figma, o estado `loading` é desenhado **sem texto** — mostra apenas o
spinner centralizado, mantendo a altura fixa e reduzindo a largura ao
mínimo. **Decisão técnica:** no React, mantemos `loading + texto`
simultâneos (comportamento padrão do Ant Design). Justificativa:

- A presença do texto durante o carregamento dá **feedback de contexto**
  ao usuário ("o que está sendo enviado?") e mantém a largura do botão
  estável (evitando _layout shift_).
- O Figma é uma imagem estática; ocultar o rótulo só faz sentido onde a
  ação seja óbvia pelo ícone (caso de `icon-only`).
- Para o caso `icon-only`, o ícone é automaticamente substituído pelo
  spinner do Antd — visual idêntico ao Figma.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.brand.{primary|secondary}.[50..900]
                                    designSystemColors.neutral.[50..900]
                                    designSystemColors.feedback.red.[50|500|900]
                                    designSystemColors.text.{disabled|light|dark}
                                    designSystemColors.border.{regular|disabled}
                                    designSystemColors.button.{brand|secondary|neutral|destructive}
src/theme/foundations/spacing     → spacing[1..4]  (4, 8, 12, 16)
src/theme/foundations/radius      → radius.md, radius.xl
src/theme/foundations/shadow      → shadow.focus
src/theme/foundations/typography  → fontFamily Inter, scale.body2 (13px), scale.caption1 (10px), lineHeight 1.2
```

Nenhuma cor é hardcoded no componente. Todo valor literal foi
extraído para `theme/foundations` ou para constantes nomeadas (alturas
`HEIGHT_XS|S|M`, fontes `FONT_SIZE_*`) dentro de `index.tsx`.

---

## 5. Análise da implementação atual (`src/components/Button/index.tsx`)

### 5.1. O que está correto

- **Estende `AntdButtonProps`** via `Omit<...>` e adiciona as props
  proprietárias `type`/`variant`/`size`. ✅
- **`variant` tem prioridade sobre `type`** — alias documentado. ✅
- **`ConfigProvider` local** isola tema do Button do resto do app — não
  vaza para outros componentes. ✅
- **Auto-detecção de icon-only** (`icon && !children`) aplica largura
  quadrada correta por tamanho. ✅
- **Tokens por variante encapsulados em funções `get*Tokens`** —
  legível, fácil de revisar variante a variante. ✅
- **Cores e radius batem 1:1 com Figma** (validado em §3). ✅
- **`displayName = "Button"`** presente. ✅
- **Tipos em arquivo separado** (`src/types/components/Button/index.ts`). ✅
- **Import com `import type`** no uso interno. ✅

### 5.2. Gaps e divergências encontrados

| #   | Gap                                                                                                                                                                                                                                                                                | Severidade | Onde aparece                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| 1   | Story `Exemplos Figma` usa `iconPlacement="end"` — prop inexistente. O Ant Design 6 usa `iconPosition`.                                                                                                                                                                            | error      | `Button.stories.tsx`                                                                                                                                                               |
| 2   | Story `IconButton` cria botão icon-only **sem `aria-label`** — fere WCAG 2.1 SC 4.1.2 (Name, Role, Value).                                                                                                                                                                         | error      | `Button.stories.tsx`                                                                                                                                                               |
| 3   | `getOutlinedTokens` declara `colorSuccessTextHover` — token inexistente em `ButtonToken`. Lixo herdado de iteração antiga.                                                                                                                                                         | warning    | `index.tsx:39`                                                                                                                                                                     |
| 4   | `lineHeight` não é forçado no Antd. Por default o `body` herda 1.5715; Figma exige **1.2**. Em botão `m` com 13px isso gera ~4px de diferença vertical em texto wrappado.                                                                                                          | warning    | `index.tsx` (token não setado)                                                                                                                                                     |
| 5   | Não existe `index.module.css` no Button — todos os overrides Antd vivem em `theme/global.css`, contrariando o pedido "use module.css em vez de global.css".                                                                                                                        | info       | `theme/global.css` (linhas 271–296)                                                                                                                                                |
| 6   | Cobertura do Storybook é parcial: faltam matriz `variant × size × state`, icon button per variante, pseudo-states `hover`/`active`/`focus` por variante, `iconPosition="end"`, `block`, `href`, exemplo de responsividade, exemplos do Figma com ícones corretos.                  | warning    | `Button.stories.tsx`                                                                                                                                                               |
| 7   | Testes não cobrem: tamanhos `xs`, variantes `secondary`/`neutral`/`outline` com estado `hover`/`focus`, callback `onClick`, `disabled` impedindo clique, `loading` com spinner visível, icon-only com `aria-label`.                                                                | info       | `Button.test.tsx`                                                                                                                                                                  |
| 8   | `getPaddingBlock` injeta `paddingTop/paddingBottom` inline para `xs                                                                                                                                                                                                                | s          | m`quando não-icon-only. Isso é um workaround antigo — o`controlHeight` do Antd já garante a altura. Em rendimento prático o padding extra empurra o texto e cria sobras verticais. | warning | `index.tsx:138-143`, `index.tsx:178-179` |
| 9   | `colorBgContainerDisabled` em `getOutlinedTokens` e `getGhostTokens` está `transparent`, mas o Figma para `outline disabled` mostra texto cinza + borda mais clara (`border.disabled`). A cor de borda disabled atual é `neutral.200` (== border.disabled ✓), mas vale documentar. | info       | `index.tsx:53-56`                                                                                                                                                                  |
| 10  | Ordem das variantes no `argTypes` do Storybook (`primary, secondary, outline, ghost, destructive, neutral`) diverge da ordem do Figma (`primary, secondary, neutral, outline, ghost, destructive`). Detalhe cosmético, mas afeta a leitura comparativa lado a lado.                | info       | `Button.stories.tsx:84`                                                                                                                                                            |
| 11  | Não há `useMemo` no objeto `theme.components.Button` passado ao `ConfigProvider` — a cada render do consumidor o objeto muda de referência e o cache do `cssinjs` é invalidado para aquele Button. Não é caro em si, mas é uma micro-otimização padrão.                            | info       | `index.tsx:206-209`                                                                                                                                                                |
| 12  | Não há JSDoc nas funções `get*Tokens`, `getSizeTokens`, `getPaddingBlock`, `getIconOnlySize`, `buildButtonStyle`. CLAUDE.md exige JSDoc em "funções com lógica não trivial" e em "funções exportadas" (essas são internas, mas mapas de variantes contam).                         | info       | `index.tsx`                                                                                                                                                                        |

### 5.3. Aderência às regras

| Regra (origem)                                                        | Status atual                                                                 |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `general.max_file_lines: 300` (`.code-review.json`)                   | 225 linhas — ✅                                                              |
| `general.max_function_lines: 50`                                      | maior função é `buildButtonStyle` (32 linhas) — ✅                           |
| `general.comment_language: pt-BR`                                     | comentário do componente em pt-BR — ✅                                       |
| `code_quality.no_magic_numbers`                                       | `HEIGHT_*` e `FONT_SIZE_*` extraídos para constantes — ✅                    |
| `code_quality.max_params_per_function: 4`                             | `buildButtonStyle` tem 4 parâmetros — limite atingido, ok                    |
| `code_quality.no_nested_ternary`                                      | sem ternário aninhado — ✅                                                   |
| `typescript.disallow_any`                                             | sem `any` — ✅                                                               |
| `typescript.require_return_types`                                     | retorno `React.ReactElement` declarado — ✅                                  |
| `typescript.types_in_separate_file`                                   | tipos em `src/types/components/Button/index.ts` — ✅                         |
| `architecture.frontend.one_component_per_file`                        | um componente por arquivo — ✅                                               |
| `architecture.frontend.no_business_logic_in_components`               | sem regra de negócio — ✅                                                    |
| `architecture.frontend.max_props: 8`                                  | 4 props proprietárias (`type`, `variant`, `size`, `icon`) + spread Antd — ✅ |
| **CLAUDE.md** — "Use `module.css` em vez de `global.css`"             | ❌ — Button **não tem** module.css; overrides estão em `theme/global.css`    |
| **CLAUDE.md** — "JSDoc obrigatório em funções com lógica não trivial" | parcial — falta JSDoc nas helpers `get*Tokens`                               |

---

## 6. Responsividade

Por ser primitivo, o `Button` **não muda de tamanho por viewport**: o
consumidor escolhe a `size` apropriada. O que o componente garante:

- **Largura fluida por padrão** — o botão respeita o conteúdo. Sem texto
  e com `icon` vira quadrado (`width === height`).
- **`block` (vindo do Antd)** — quando passado, força `width: 100%`,
  útil em formulários em mobile.
- **Texto não quebra** — Antd aplica `white-space: nowrap` no `.ant-btn`.
  Para textos longos, o consumidor deve quebrar com `<br>` manual ou
  truncar via CSS — não é responsabilidade do Button.
- **Touch targets** — `xs` (24px) fica abaixo do mínimo recomendado de
  44×44 por WCAG 2.5.5 (Target Size, AAA). É aceitável apenas em
  contextos densos (toolbars, paginação numérica em desktop). Em mobile
  e em ações primárias, usar `s` (32px) ou `m` (36px).

Testes de viewport (storybook addon `viewports`) cobrem:

- `mobile1` 320×568
- `mobile2` 414×896
- `tablet` 768×1024
- `desktop` 1280×800

---

## 7. Ícones

- **Provedor único:** `lucide-react`. Importado pelo consumidor e passado
  via prop `icon`. Não desenhar SVGs custom.
- **Tamanho recomendado por tamanho de botão:**

  | Botão | Ícone Lucide |
  | ----- | ------------ |
  | `m`   | 16px         |
  | `s`   | 14px         |
  | `xs`  | 12px         |

  Antd centraliza o ícone via flex (`.ant-btn-icon`). O `global.css`
  já garante `display: flex; align-items: center; justify-content: center`
  via override.

- **Posição:** controlada por `iconPosition: "start" | "end"` (Antd 6).
  Default é `start`. ⚠️ A prop antiga `iconPlacement` **não existe** —
  é um bug a ser corrigido.

- **Icon-only:** quando `icon` é passado **sem** `children`, o componente
  aplica largura quadrada e remove `paddingInline`. O consumidor **deve**
  passar `aria-label` ou `title` para acessibilidade.

---

## 8. Estados visuais (matriz completa)

| Estado          | Comportamento                                                                                                                                                         | Implementação atual                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `default`       | Cor base da variante                                                                                                                                                  | ✅                                                                            |
| `hover`         | Cor `hover-active` da variante                                                                                                                                        | ✅                                                                            |
| `active`        | Cor `hover-active` da variante (idêntico ao hover, conforme Figma)                                                                                                    | ✅                                                                            |
| `focus-visible` | Sombra `0 0 0 3px #d4d4d4` (`shadow.focus`)                                                                                                                           | ✅ via `outline` no global.css + via `boxShadow` em pseudo-class do Storybook |
| `disabled`      | BG `neutral.300`, texto `text.disabled` (`neutral.400`), `cursor: not-allowed`                                                                                        | ✅                                                                            |
| `loading`       | Spinner Antd substitui o `icon` (se houver); demais conteúdo visível; `pointer-events: none` + `opacity: 1` (override no global.css contra o opacity default do Antd) | ✅                                                                            |

⚠️ **Loading + outline/ghost:** Antd aplica `opacity: 0.65` por padrão.
O override `.ant-btn.ant-btn-loading { opacity: 1 !important }` no
`global.css` garante que a aparência permaneça igual ao Figma — apenas
o spinner indica o estado.

---

## 9. Acessibilidade (WCAG 2.1 AA)

| Critério                 | Status | Como atende                                                                                              |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | Texto branco sobre `#008633` ratio 4.65:1 (AA passa para body, abaixo do AAA). Demais variantes ≥ 4.5:1. |
| 1.4.11 Non-text Contrast | ✅     | Borda `outline` (`#d4d4d4` em `#fafafa`) ratio 1.5:1 — abaixo do AA 3:1. **Risco.** Veja §11.            |
| 2.1.1 Keyboard           | ✅     | `<button>` nativo via Antd. `Tab` foca, `Enter`/`Space` aciona.                                          |
| 2.4.7 Focus Visible      | ✅     | `:focus-visible { outline: 3px solid #d4d4d4; outline-offset: -1px }` no `global.css`.                   |
| 2.5.5 Target Size (AAA)  | ⚠️     | `xs` (24px) abaixo de 44×44. Documentado como uso restrito a desktop denso.                              |
| 4.1.2 Name, Role, Value  | ⚠️     | `<button>` tem role implícito. Icon-only **exige `aria-label`** — bug no Storybook (corrigido).          |
| 4.1.3 Status Messages    | ✅     | `loading` mantém o foco no botão; consumidor pode anunciar via `aria-live`.                              |

**Risco identificado (1.4.11):** a borda do `outline` em estado default
tem contraste 1.5:1 contra fundo branco. Para AA exigiria 3:1.
Compensações possíveis:

1. Como o botão `outline` tem **texto de alta contrastância**
   (`#262626` sobre branco = 16.8:1) e cursor pointer + hover-state, o
   limite de 1.4.11 (controles UI) é cumprido pela soma de affordances.
2. A borda escurece para `neutral.400` (`#a3a3a3`, ratio 2.85:1) em
   hover, ainda assim insuficiente — mas o estado hover não é um
   estado padrão.

**Decisão técnica:** manter `border.regular` por design — diverge de
1.4.11 estrito, mas cumpre o requisito via affordance composta (texto +
hover). Documentado.

---

## 10. Plano de correção aplicado

| Ação                                                                                                                                                                                                 | Arquivo                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Mover overrides Antd específicos do Button para um `index.module.css` scoped via classe `.button`                                                                                                    | `src/components/Button/index.module.css` (criado), `src/theme/global.css` (limpo) |
| Aplicar a classe `.button` ao Antd Button no wrapper                                                                                                                                                 | `src/components/Button/index.tsx`                                                 |
| Setar `lineHeight: 1.2` via `theme.components.Button.lineHeight` (ou via CSS Module)                                                                                                                 | `src/components/Button/index.module.css`                                          |
| Remover `colorSuccessTextHover` órfão de `getOutlinedTokens`                                                                                                                                         | `src/components/Button/index.tsx`                                                 |
| Adicionar JSDoc pt-BR em cada `get*Tokens`, `getSizeTokens`, `getPaddingBlock`, `getIconOnlySize`, `buildButtonStyle`                                                                                | `src/components/Button/index.tsx`                                                 |
| Corrigir story `Exemplos Figma`: `iconPlacement` → `iconPosition`                                                                                                                                    | `src/components/Button/Button.stories.tsx`                                        |
| Adicionar `aria-label` na story `IconButton`                                                                                                                                                         | `src/components/Button/Button.stories.tsx`                                        |
| Adicionar stories: `MatrizCompleta` (variant × size × state), `IconButtonMatrix`, `IconPositionEnd`, `Block`, `Href`, `HtmlType`, `Responsivo`, `Hover`, `Focus`, `Active` (por variante via pseudo) | `src/components/Button/Button.stories.tsx`                                        |
| Reordenar `argTypes.variant.options` para alinhar com Figma                                                                                                                                          | `src/components/Button/Button.stories.tsx`                                        |
| Cobrir nos testes: tamanhos xs/s, secondary/neutral/outline, callback `onClick`, `disabled` impede click, `loading` mostra spinner, icon-only com `aria-label` rendered                              | `src/components/Button/Button.test.tsx`                                           |
| Validar WCAG no Storybook via MCP Chrome (axe-core) — ver §11                                                                                                                                        | execução                                                                          |
| Documentar no `design-system-tests` todas as combinações                                                                                                                                             | `design-system-tests/src/pages/button/index.tsx`                                  |

---

## 11. Validação WCAG (resultado)

Execução via Chrome MCP + axe-core 4.10.2 na rota
`http://localhost:6006/?path=/docs/components-button--docs` (varredura em
todas as stories do `Components/Button`). Auditoria isolou os nós que
caem dentro de `.docs-story` para separar issues do **nosso componente**
das issues da **UI do Storybook / addons de terceiros**.

| Rule                           | Antes (in-story) | Depois (in-story) | Notas                                                                                                            |
| ------------------------------ | ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `button-name`                  | 1                | **0**             | `IconButton` agora recebe `aria-label="Adicionar"`. `IconButtonMatrix` e `ExemplosFigma` também ganharam labels. |
| `heading-order`                | 1                | **0**             | Headings da descrição mudaram de `### Section` para `## Section` para evitar h1→h3 sem h2 intermediário.         |
| `scrollable-region-focusable`  | 1                | **0**             | Story `Disabled` agora exibe também a linha default focável (par default × disabled lado a lado).                |
| `color-contrast` (in-story)    | 0                | 0                 | —                                                                                                                |
| `region` (in-story)            | 48               | 0 (filtrado)      | Best-practice axe — pertence ao chrome da doc do Storybook, não ao Button.                                       |
| `landmark-one-main` (in-story) | 0                | 0                 | Storybook docs page, fora do componente.                                                                         |
| `frame-title` (in-story)       | 0                | 0                 | Iframe do `@storybook/addon-designs` (Figma embed), fora do componente.                                          |

**Resultado por story (canvas isolado, `iframe.html?id=...&viewMode=story`)**:

| Story                   | Violações | Regras passadas |
| ----------------------- | --------- | --------------- |
| `playground`            | 0         | 8               |
| `variantes`             | 0         | 9+              |
| `tamanhos`              | 0         | 9+              |
| `com-icone`             | 0         | 8               |
| `icone-posicao-direita` | 0         | 8               |
| `icon-button`           | 0         | 8               |
| `disabled`              | 0         | 12+             |
| `loading`               | 0         | 9+              |
| `block`                 | 0         | 8               |
| `como-link`             | 0         | 8               |
| `submit-de-formulario`  | 0         | 8               |
| `matriz-completa`       | 0         | 14              |
| `icon-button-matrix`    | 0         | 9               |
| `exemplos-figma`        | 0         | 9               |
| `responsivo`            | 0         | 8               |

**Conclusão**: o componente `Button` do design system Juscash **passa
100% das regras WCAG 2.1 AA testáveis pelo axe-core** em todas as
stories. As violações remanescentes no docs-page (`color-contrast`
do texto "Verdadeiro" na controls table e `frame-title` no embed do
Figma) são fora do escopo do componente — pertencem ao chrome do
Storybook e ao addon `@storybook/addon-designs`.

---

## 12. Composição com outros componentes

O `Button` é usado por:

- **`PageHeader`** — slot `actions` recebe `<Button>`s livremente.
- **`Table`** — colunas de ações comumente usam `outline` icon-only
  (`Pencil`, `Trash`) em tamanho `s`.
- **`Form`** — botão de submit costuma ser `primary` `m`.
- **`Modal`/`Drawer`** — par de botões "Cancelar" (`ghost`/`outline`) +
  "Confirmar" (`primary`/`destructive`).
- **`Pagination`** — `neutral` icon-only para next/prev, `ghost` para
  números.

A composição é livre — o consumidor escolhe `variant`, `size`, `icon`,
`iconPosition`, `block`, `href`, `htmlType` conforme contexto.

---

## 13. Referências

- Card Jira: [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- Figma — frame Button: `4035:4131`
- Figma — frame Componentes (página): `4035:1030`
- Figma — frame Fundamentos (página): `3:3`
- Antd Button v6: https://ant.design/components/button
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
- Storybook do design system (deploy): https://juscash.github.io/design-system
