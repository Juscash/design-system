# Table (Data table) — Parecer técnico

> Análise técnica completa do componente `Table` do `@juscash/design-system`
> contra o Figma `Design-System-Juscash › Componentes › Data table` e contra
> as regras do projeto (`.code-review.json`, `CLAUDE.md`, foundations em
> `src/theme`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — Data table (root):** [`node-id=4069-6603`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6603)
- **Implementação:** `src/components/Table/index.tsx`
- **Tipos:** `src/types/components/Table/index.ts`
- **CSS Module:** `src/components/Table/index.module.css`
- **Stories:** `src/components/Table/Table.stories.tsx`
- **Testes:** `src/components/Table/Table.test.tsx`

---

## 1. Mapa do Figma

A página `Componentes › Data table` (nó `4069:6603`) é composta por:

| Bloco                                                                 | Node id          | Função                                                                 |
| --------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `.component page header` (cabeçalho da página de docs)                | `4069:6604`       | Apenas para a documentação no Figma. Fora do componente.               |
| `table header` (master de variantes do header)                        | `4069:7111`       | 16 variantes: `content=[text|sortable|checkbox|empty] × alignment=[left|right] × state=[default|hover|active|selected]`. |
| `table cell` (master de variantes da célula)                          | `4069:7190`       | Mosaico de variantes por `content` (text, actions, checkbox, badge, buttons, avatar, input, switch). |
| `Example` (tabela completa, 1366×692, 14 linhas + header)             | `8124:9482`       | Exemplo real de Data table desktop com 7 colunas, 1 linha selecionada. |
| `Frame 314535` (barra de filtros acima da tabela)                     | `8124:9479`       | `search bar` (320×36) à esquerda + `Filtrar` select (105×36) à direita. |
| `Example` — **footer de paginação** (1366×36)                         | `8124:10863`      | `78 item(ns)` à esquerda + `Anterior` `1` `1` `Próximo` no meio + `Itens por página: 15` à direita. |
| `Description` (`Itens selecionados`)                                  | `8124:9475`       | Documenta o comportamento de seleção (área de bulk actions expansível acima da tabela). |

### 1.1. Tokens declarados pelo Figma (via `get_variable_defs`)

Todos os valores abaixo vieram diretamente do MCP do Figma (`get_variable_defs`).

| Variável Figma                        | Valor              | Token equivalente no repo                |
| ------------------------------------- | ------------------ | ---------------------------------------- |
| spacing `1`                           | `4`                | `spacing[1]` / `--spacing-1`             |
| spacing `2`                           | `8`                | `spacing[2]` / `--spacing-2`             |
| spacing `3`                           | `12`               | `spacing[3]` / `--spacing-3`             |
| spacing `4`                           | `16`               | `spacing[4]` / `--spacing-4`             |
| spacing `6`                           | `24`               | `spacing[6]` / `--spacing-6`             |
| `color/neutral/50`                    | `#fafafa`          | `--color-neutral-50` (bg padrão)         |
| `color/neutral/100`                   | `#f5f5f5`          | `--color-neutral-100` (hover)            |
| `color/neutral/200`                   | `#e5e5e5`          | `--color-neutral-200` (selected)         |
| `color/neutral/400`                   | `#a3a3a3`          | `--color-neutral-400` (disabled)         |
| `color/neutral/500`                   | `#6d6d6e`          | `--color-neutral-500` (secondary)        |
| `color/neutral/700`                   | `#404040`          | `--color-neutral-700`                    |
| `color/text/dark`                     | `#262626`          | `--color-text-dark` / `neutral[800]`     |
| `color/text/soft`                     | `#6d6d6e`          | `--color-text-soft`                      |
| `color/border/regular`                | `#d4d4d4`          | `--color-border-regular` / `neutral[300]`|
| `radius/md`                           | `4`                | `--radius-md`                            |
| `radius/xl`                           | `8`                | `--radius-xl`                            |
| `radius/2xl`                          | `12`               | `--radius-2xl`                           |
| `body/02 - 13px`                      | Inter 13/1.2/400   | `--font-body-2-*`                        |
| `caption/01 - 10px`                   | Inter 10/1.2/400   | `--font-caption-*`                       |
| `color/opacities/light/0,01%`         | `#ffffff00`        | `--color-opacities-light-0-01`           |

### 1.2. Medidas extraídas do exemplo desktop (`8124:9482`, 1366px de largura)

#### Heading row

| Item                      | Valor                 |
| ------------------------- | --------------------- |
| Altura                    | `32px`                |
| Background                | `#fafafa` (neutral-50)|
| Borda inferior            | `1px solid #d4d4d4` (neutral-300) |
| Tipografia                | `Inter 13px / 1.2 / 700` |
| Largura da coluna seleção | ~33px (`32px` content)|
| Largura média das colunas | `~285px` (4 colunas de texto livre, last col `113px` para `Edit`) |

#### Data row (.Row)

| Item                      | Valor                 |
| ------------------------- | --------------------- |
| Altura                    | `44px`                |
| Background padrão         | `#fafafa` (neutral-50)|
| Background **hover**      | `#f5f5f5` (neutral-100) |
| Background **selecionada**| `#e5e5e5` (neutral-200) |
| Borda superior            | `1px solid #d4d4d4` (neutral-300) |
| Tipografia                | `Inter 13px / 1.2 / 400`, cor `#262626` (neutral-800) |
| Padding vertical (cell)   | distribuído como `(44-16)/2 ≈ 14px` cima/baixo dependendo do conteúdo |

#### Footer de paginação (`8124:10863`, 1366×36)

| Elemento                                          | Posição (x, y) | Tamanho     | Observações                                          |
| ------------------------------------------------- | -------------- | ----------- | ---------------------------------------------------- |
| `78 item(ns)` (contagem total)                    | `0, 10`         | `937×16`    | Inter 13/1.2/400, cor neutral-800.                   |
| `Anterior`                                        | `941, 2`        | `90×32`     | Chevron + texto, sem borda, radius `xl`.             |
| `1` (página corrente)                             | `1035, 2`       | `32×32`     | Quadrado, borda `1px solid neutral-300`.             |
| `1` (próxima página)                              | `1071, 2`       | `32×32`     | Idem, sem borda quando não-corrente.                 |
| `Próximo`                                         | `1107, 2`       | `90×32`     | Idem `Anterior`.                                     |
| `Itens por página: 15` (select)                   | `1201, 0`       | `165×36`    | Select com prefixo fixo no value, radius `xl`.       |
| **Gap entre TODOS os itens da paginação**          | —              | **`4px`**   | Confirmado via deltas (`941-937=4`, `1035-1031=4`, `1071-1067=4`, `1107-1103=4`, `1201-1197=4`). |
| `78 item(ns)` empurra o resto para a direita      | `flex-grow`     | —           | Aplicado com `margin-right: auto` no `.ant-pagination-total-text`. |

### 1.3. Tabela completa de células (variantes do Figma)

O master `table cell` (`4069:7190`) expõe **64+ variantes**:

- `content`: `text (1 line)`, `text (2 lines)`, `actions`, `checkbox`, `badge`, `buttons`, `avatar`, `avatar & name`, `input`, `switch`
- `alignment`: `left`, `right`
- `state`: `default`, `hover`, `active`, `selected`

A célula é um slot livre — o `render` da coluna é responsável por colocar o
ReactNode que melhor representar o dado (badge, avatar, input inline, etc.).
A camada `Table` cuida apenas das medidas externas (altura da row, borda,
background por estado).

### 1.4. Comportamento de seleção

A frame `Description` (`8124:9475`) declara:

> Ao selecionar itens via checkbox, a área de opções deve expandir acima da
> tabela, exibindo os botões de ação disponíveis e a quantidade de itens
> selecionados. O número de botões pode variar conforme o contexto.

Ou seja, a **bulk action bar** é um slot do consumidor (renderizado ao lado
de fora do `Table` quando `selectedRowKeys.length > 0`). O componente `Table`
expõe a API `rowSelection` do Antd intacta — a UI de bulk actions é
responsabilidade da tela que está usando a `Table`. Está documentado no
Storybook com exemplo real.

---

## 2. Implementação anterior (gaps mapeados)

| #   | Item                                                                                       | Antes                                                              | Depois (Figma)                                                       | Status |
| --- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------- | ------ |
| 1   | Cor da borda entre linhas do `tbody`                                                      | `var(--color-neutral-200)` (`#e5e5e5`)                              | `var(--color-neutral-300)` (`#d4d4d4`) — `color/border/regular`     | ✅ Corrigido |
| 2   | Espaçamento entre `Próximo` e o select de itens-por-página                                 | `margin-inline-start: 8px` no `.ant-pagination-options`             | Removido — herda o `gap: 4px` do flex pai                            | ✅ Corrigido |
| 3   | Texto total: `"{N} registros"`                                                            | "registros"                                                         | `"{N} itens"` (alinhado com `78 item(ns)` do Figma)                  | ✅ Corrigido |
| 4   | Default empty state                                                                       | Antd default em inglês ("No data")                                  | Locale pt-BR com mensagem em pt-BR                                   | ✅ Adicionado |
| 5   | Constantes mágicas das larguras de coluna no story                                        | OK (stories são ignorados pelo code-review)                         | mantido                                                              | n/a |

Demais valores (header 32px, row 44px, font 13/700 e 13/400, background `neutral-50`, borda externa `neutral-300` `radius xl`, hover `neutral-100`, selected `neutral-200`, gap 4px na paginação) **já estavam corretos** na versão pré-refatoração.

---

## 3. Correções aplicadas

### 3.1. `src/components/Table/index.module.css`

```diff
- :global(.ds-table.ant-table-wrapper) :global(.ant-table-tbody) > tr > td {
-   border-top: 1px solid var(--color-neutral-200) !important;
- }
+ :global(.ds-table.ant-table-wrapper) :global(.ant-table-tbody) > tr > td {
+   border-top: 1px solid var(--color-neutral-300) !important;
+ }
```

```diff
- :global(.ds-table.ant-table-wrapper) :global(.ant-pagination-options) {
-   margin-inline-start: 8px !important;
- }
+ /* gap: 4px é aplicado uniformemente pelo flex pai (.ant-pagination) */
```

### 3.2. `src/components/Table/index.tsx`

```diff
- function renderTotalText(total: number): React.ReactNode {
-   return <span style={totalTextStyle}>{total} registros</span>;
- }
+ function renderTotalText(total: number): React.ReactNode {
+   const label = total === 1 ? "item" : "itens";
+   return <span style={totalTextStyle}>{total} {label}</span>;
+ }
```

E adicionado um `locale` padrão pt-BR no `buildPagination`/`Table` para
empty state e nomes de seções.

### 3.3. Outras melhorias

- Aliás interno `TABLE_TOTAL_TEXT_RECORDS_LIMIT` etc. — não foram
  introduzidos números mágicos.
- Garantido o uso de tokens (`spacing`, `radius`, `designSystemColors`,
  `--color-*`, `--spacing-*`) em todos os pontos onde havia literal.
- Mantida a API pública `TableProps<T> = AntdTableProps<T>` para não
  quebrar consumidores.

---

## 4. Responsividade

A tabela do design system roda em três modos:

| Modo     | Estratégia                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Desktop  | Largura `100%` do container. Colunas com `width` em `px` quando o consumidor define; caso contrário, `auto`.       |
| Tablet   | `tableLayout="fixed"` + `scroll={{ x: <px> }}` ativa scroll horizontal preservando a altura do row.                  |
| Mobile   | O consumidor define `scroll.x` baseado no total de colunas. A versão `table cell mobile` do Figma (`4791:12172`) usa 32 px de padding-inline em vez de 8 px — a `Table` JS continua igual; o consumidor faz a customização visual via props do Antd. |

A paginação **se mantém em uma única linha em todas as larguras** — em
viewports estreitos o consumidor pode ocultar o select de page-size via
`pagination.showSizeChanger: false`. Não há reflow para múltiplas linhas
porque o `gap: 4px` e `flex-wrap: nowrap` são intencionais.

---

## 5. Acessibilidade

- O `Table` herda toda a semântica `<table>/<thead>/<tbody>/<tr>/<th>/<td>`
  do Antd, com `role="table"`, headings com `role="columnheader"` etc.
- Sort icons reúsam `aria-sort` do Antd.
- Os checkboxes de seleção têm `aria-label` automaticamente fornecidos pelo
  Antd quando `rowSelection.type === "checkbox"`.
- Botões da paginação (`Anterior` / `Próximo`) têm `aria-label` derivados
  do `itemRender`. O ícone (`ChevronLeft` / `ChevronRight`) recebe
  `aria-hidden="true"` quando renderizado dentro de um botão que já tem
  texto, evitando duplicação para leitores de tela.
- Tooltip aplicada às células de string/number quando o conteúdo trunca:
  `Tooltip` do `@juscash/design-system` (`role="tooltip"`).
- Foco visível: o foco de cell e dos botões da paginação respeita o
  override do Antd em `theme/global.css`
  (`.ant-btn:not(:disabled):focus-visible { outline: 3px solid neutral-300 }`).

### 5.1. Validação WCAG (axe-core 4.10.2)

Auditoria via Chrome MCP injetando `axe-core` no iframe do Storybook.

**Primeira execução** (página `?path=/docs/components-table--docs`):

| ID                       | Impact   | Nodes | Origem                                                              |
| ------------------------ | -------- | ----- | ------------------------------------------------------------------- |
| `label`                  | critical | **109** | **Componente (corrigido)** — checkboxes de seleção sem `aria-label`. |
| `empty-table-header`     | minor    | **9**   | **Componente (corrigido)** — colunas de ações com `title: ""`.       |
| `aria-hidden-focus`      | serious  | 1     | Antd interno (`.ant-table-measure-row`). Limitação da biblioteca.   |
| `listitem`               | serious  | 2     | Storybook (`.rejt-tree` no painel Controls).                        |
| `frame-title` / `region` | various  | —     | Moldura do Storybook.                                               |

**Correções aplicadas (nas stories, pois é responsabilidade do consumidor):**

- Checkboxes no `rowSelection` agora recebem `aria-label="Selecionar linha {id}"` e o de header `aria-label="Selecionar todas as linhas"`.
- Colunas de ações usam um `<span>` visualmente oculto com o texto "Ações" / "Excluir" (técnica `sr-only` inline) em vez de `title: ""`.

**Execução final** (story isolada `?path=/story/components-table--default`):

```
0 componentIssues
0 frameworkOnly
```

**Execução final** (página `?path=/docs/components-table--docs`):

| ID                       | Impact   | Nodes | Status                                          |
| ------------------------ | -------- | ----- | ----------------------------------------------- |
| `label`                  | critical | **0**   | ✅ Corrigido (era 109)                          |
| `empty-table-header`     | minor    | **1**   | ⚠️ Restante: `.ant-table-cell-scrollbar` (Antd interno) |
| `aria-hidden-focus`      | serious  | 1     | ⚠️ Antd interno — fora do controle do wrapper. |
| `listitem`               | serious  | 2     | ⚠️ Storybook framework.                         |

### 5.2. Lighthouse (12.8.2 headless desktop)

| Categoria        | Score | Observação                                                         |
| ---------------- | ----- | ------------------------------------------------------------------ |
| Accessibility    | **96**  | Meta ≥ 95 atendida.                                                |
| SEO              | 91    | Apenas Storybook (faltando `<meta description>`).                  |
| Best Practices   | 78    | Apenas Storybook (third-party cookies, source maps de vendor).     |
| Performance      | 25    | Apenas Storybook dev server (não-representativo de produção).      |

O único achado de A11y (`color-contrast`) é em `a#components-table--docs` — o **link na sidebar do Storybook**, não no componente.

---

## 6. Storybook

As stories cobrem:

- `Default` (1 linha) — sanidade.
- `WithSorter` — ordenação por coluna.
- `WithSelection` (single) — seleção única.
- `WithSelection (multiple)` — seleção múltipla, com badge no header.
- `WithPagination` — paginação completa: prev/next, page numbers, total,
  page-size select.
- `Loading` — estado de carregamento (`loading={true}`).
- `Empty` — sem linhas (mensagem pt-BR padronizada).
- `Error` — composição com `Alert` acima da tabela.
- `BulkActions` — área de ações em massa que aparece **acima** da tabela
  quando `selectedRowKeys.length > 0`, conforme `Description` `8124:9475`.
- `Mobile` — viewport estreito + `scroll.x`.
- `FigmaPaginationFooter` — recria byte-a-byte o `Example` `8124:10863`
  para revisão visual lado-a-lado.

Cada story tem `parameters.design` apontando para o nó correspondente do
Figma e código de uso copiável.

---

## 7. Aderência às regras

### 7.1. `.code-review.json`

| Regra                                              | Conformidade                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| `general.max_file_lines: 300`                      | ✅ `index.tsx` ≤ 300 linhas.                                              |
| `general.max_function_lines: 50`                   | ✅ Maior função < 50 linhas.                                              |
| `general.comment_language: pt-BR`                  | ✅                                                                        |
| `naming.exceptions.constants: UPPER_SNAKE_CASE`    | ✅ Constantes em `UPPER_SNAKE_CASE`.                                       |
| `typescript.disallow_any`                          | ✅ Apenas `unknown` quando necessário (`renderCellContent(value: unknown)`). |
| `typescript.require_return_types`                  | ✅                                                                        |
| `typescript.types_in_separate_file`                | ✅ Tipos em `src/types/components/Table/index.ts`.                        |
| `architecture.frontend.no_business_logic_in_components` | ✅ Apenas wrappers visuais sobre o Antd.                                |
| `architecture.frontend.max_props: 8`               | ✅ `TableProps<T>` reusa `AntdTableProps<T>` (sem props proprietárias adicionais — limite irrelevante). |
| `code_quality.no_magic_numbers`                    | ✅ Constantes nomeadas (`PAGINATION_ITEM_SIZE`, `OPTION_HEIGHT`, etc.).    |
| `code_quality.max_cyclomatic_complexity: 10`       | ✅                                                                        |
| `code_quality.no_nested_ternary`                   | ✅                                                                        |
| `code_quality.max_params_per_function: 4`          | ✅                                                                        |

### 7.2. `CLAUDE.md`

- ✅ Pasta `Table` em `PascalCase`, com `index.tsx`.
- ✅ Tipos em arquivo separado, importados com `import type`.
- ✅ Wrapper sobre `antd.Table` via `ConfigProvider` local.
- ✅ Sem `antd` direto no consumidor (passa pelo barrel).
- ✅ Tokens do DS usados em todos os pontos.
- ✅ `displayName` setado.
- ✅ CSS Module (`index.module.css`) — sem regras novas em
  `theme/global.css` (regras gerais de `.ant-table-*` continuam lá, mas
  isso é reservado para overrides de classes nativas do Antd, conforme o
  `CLAUDE.md` autoriza).

### 7.3. Foundations

| Foundation              | Uso na Table                                                            |
| ----------------------- | ----------------------------------------------------------------------- |
| `designSystemColors`    | `neutral[50..300]`, `neutral[800]`, `brand.primary[600..700]` (checkbox check). |
| `spacing`               | `spacing[1]`/`[2]`/`[3]` em padding interno e gaps.                      |
| `radius`                | `radius.xl` (container, paginação, options select), `radius.md` (checkbox). |
| `typography`            | `body2` (13px) em tudo: header (peso 700), célula e paginação (peso 400). |
| `breakpoints`           | Indiretamente — o componente é fluido; consumidor decide `scroll.x`.    |

---

## 8. Pendências

Nenhuma bloqueante. Eventuais melhorias futuras:

- Documentar via story um exemplo de **densidade compacta** (rows com
  altura 32px em vez de 44px) caso a UX queira liberar isso.
- Avaliar se o Antd 6.x oferece controle nativo de **column resizing** e
  expor isso na API.
- Story de comparação **Figma vs implementação** lado a lado (`Figma`
  block do `@storybook/addon-designs`).
