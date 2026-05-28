# Typography — Parecer técnico

> Documento de referência do componente `Typography` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`).

- **Figma — página Fundamentos:** [`↳ Fundamentos (3:3)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=3-3)
- **Figma — frame `Tipografia`:** [`Tipografia (4002:5004)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4002-5004)
- **Arquivo no repo:** `src/components/Typography/index.tsx`
- **Tipos:** `src/types/components/Typography/index.ts`
- **Stories:** `src/components/Typography/Typography.stories.tsx`
- **Testes:** `src/components/Typography/Typography.test.tsx`
- **Foundation TypeScript:** `src/theme/foundations/typography/index.ts`
- **Storybook de tokens (Fundamentos / Tipografia):**
  `src/theme/foundations/typography/Typography.stories.tsx`

> **Observação introdutória — onde vive o sistema tipográfico no Figma.** A
> página `↳ Fundamentos` (`3:3`) publica **oito frames** de tokens: `Cores`,
> `Sombras`, `Breakpoints`, `Espaçamentos`, `Bordas`, `Ícones`, `Logotipo` e
> **`Tipografia` (`4002:5004`)**. O frame `Tipografia` é uma página de
> documentação de tela cheia (1680 × 1626 px, posição x=348/y=10614) com:
>
> - **page header** `.component page header` (`4002:5005`) — título
>   "Tipografia" em `Plus Jakarta Sans Bold 48px`, fundo `color/neutral/700`
>   (`#404040`);
> - seção "Família tipográfica" (Inter Bold 49px, `#6d6d6e`) com amostra
>   "Inter" em `Inter Bold 31px` (`color/neutral/70 = #677176`) seguida do
>   alfabeto/numerais em `Inter Regular 16px` (`color/neutral/70`);
> - seção "Escala" (Inter Bold 49px, `#6d6d6e`) — tabela `4002:5012` com
>   **10 linhas × 5 colunas** (header + 9 variantes) renderizando cada Text
>   Style no tamanho real.
>
> A entrada `Typography ⚠️` em `design-system-tests/mapeamento.md`, item 46,
> já antecipa essa particularidade ("A Tipografia está na página de
> Fundamentos"): não é um componente de UI atômico, é uma página de
> referência cujas Text Styles + variáveis (`heading/01..06`, `body/01..02`,
> `caption/01`) são consumidas por outros componentes do sistema (Badge,
> Card, Modal, EmptyState, PageHeader, Tabs, KpiCard, Drawer, ConfirmModal,
> RangePicker, Notification, Segmented).

---

## 1. Contexto e finalidade

O `Typography` é o componente raiz para **renderizar texto** no Design System
Juscash. Centraliza a escala tipográfica do Figma (Inter Regular, peso `400`,
line-height `1.2` unitless, letter-spacing `0`), as cores semânticas de texto
e a semântica HTML (`h1..h5`, `p`, `span`).

Wrapper sobre o `Typography` do Ant Design 6 (`Title` + `Paragraph` + `Text`).
Cada chamada cria um `ConfigProvider` local que injeta os tokens da variante
escolhida no tema do Antd.

Componentes prontos disponíveis (atalhos):

- `Heading1`, `Heading2`, `Heading3`, `Heading4`, `Heading5`, `Heading6`
- `Body1`, `Body2`
- `Caption`

E o objeto agregado `TypographyComponents` (`Heading1..6`, `Body1`, `Body2`,
`Caption`) para consumo via namespace.

---

## 2. Anatomia (Figma)

### 2.1. Estrutura no Figma

A página `↳ Fundamentos` (`3:3`) contém os seguintes frames de tokens:

| Frame                              | ID          | Conteúdo                                                                                                                |
| ---------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Cores`                            | `4001:2405` | Paletas brand, neutral, feedback e tokens semânticos (text, border, background, button)                                 |
| `Sombras`                          | `4001:441`  | Efeitos de elevação (`shadow/*`, `focus`)                                                                               |
| `Bordas`                           | `4031:1960` | Raios e cores de borda                                                                                                  |
| `Breakpoints`                      | `4001:690`  | Larguras de referência (mobile/tablet/desktop). **Não inspecionado nesta análise** — usado por outros componentes; ver §10 |
| `Espaçamentos`                     | `4026:3185` | Tokens de spacing                                                                                                       |
| `Ícones`                           | `4032:2713` | Matriz de ícones (Lucide)                                                                                               |
| `Logotipo`                         | `4138:1065` | Variantes do logo                                                                                                       |
| **`Tipografia`**                   | `4002:5004` | **Página inteira de documentação tipográfica** — page header, seção "Família tipográfica" e tabela "Escala" com as 9 variantes renderizadas no tamanho real |

O frame `Tipografia` é, portanto, o nó canônico para o sistema tipográfico —
e não, como o documento anterior afirmava, "inexistente". As Text Styles +
variáveis `heading/01..06`, `body/01..02`, `caption/01` continuam sendo a
fonte de verdade técnica (consumidas por outros componentes), mas o catálogo
visual vive em `4002:5004`.

### 2.2. Slots e subcomponentes

A escala tipográfica do Figma define **9 entradas**, todas publicadas como
variáveis e todas renderizadas na tabela "Escala" do frame Tipografia:

| Variante (token Figma)   | Linha no frame Tipografia | Aplicação típica (documentada na coluna `description`)             |
| ------------------------ | -------------------------- | ------------------------------------------------------------------- |
| `heading/01 - 61px`      | `4002:5019` (Frame 1)      | "Títulos em destaques como heros."                                  |
| `heading/02 - 49px`      | `4002:5025` (Frame 3)      | "." _(placeholder; uso documentado em outros componentes — page-headers)_ |
| `heading/03 - 39px`      | `4002:5031` (Frame 4)      | "."                                                                 |
| `heading/04 - 31px`      | `4002:5037` (Frame 5)      | "."                                                                 |
| `heading/05 - 25px`      | `4002:5043` (Frame 6)      | "."                                                                 |
| `heading/06 - 20px`      | `4002:5049` (Frame 7)      | "Títulos em cards, telas."                                          |
| `body/01 - 16px`         | `4002:5055` (Frame 8)      | "Textos longos em telas com mais espaço"                            |
| `body/02 - 13px`         | `4002:5061` (Frame 9)      | "Textos longos em telas com menos espaço, tabelas"                  |
| `caption/01 - 10px`      | `4002:5073` (Frame 11)     | "Descrições complementares"                                         |

#### 2.2.1. Estrutura da tabela `Escala`

A tabela `4002:5012` (1552 × 913 px) é organizada em **5 colunas oficiais**:

| Coluna           | Largura | Header (Inter Bold 16px `color/text/soft`) | Conteúdo                                                                     |
| ---------------- | ------- | ------------------------------------------ | ---------------------------------------------------------------------------- |
| `variant/token`  | 476 px  | `variant/token`                            | Sample da variante em tamanho real (`Inter Regular`, cor `text-black`) + tag pequena (`JetBrains Mono Bold 13px`, cor `color/text/soft`) com o token (ex.: `heading.1`) |
| `px`             | 200 px  | `px`                                       | Tamanho em px (ex.: `61`) em `JetBrains Mono Bold 16px`, cor `color/text/soft` |
| `rem`            | 200 px  | `rem`                                      | Tamanho em rem (ex.: `3.813rem`) em `JetBrains Mono Bold 16px`, cor `color/text/soft` |
| `line height`    | 200 px  | `line height`                              | **Aparente bug do design:** a coluna mostra `0px` em todas as linhas (`JetBrains Mono Bold 16px`, `color/text/soft`). O line-height real `1.2` está na variável Text Style, não nesta célula — provavelmente o label `line height` foi colocado por engano sobre uma coluna que pretendia exibir letter-spacing ou outra métrica. **Verificar com design.** |
| `description`    | 476 px  | `description`                              | Descrição textual em `JetBrains Mono Bold 16px`, cor `color/text/soft` (vide §2.3) |

A primeira linha da tabela (`4002:5013`) é o header (56 px de altura) usando
`Inter Bold 16px` com cor `color/text/soft = #6d6d6e`. Cada linha de dados
ocupa altura proporcional ao tamanho do sample (de 133 px em Heading 1 até
72 px em Caption). Todas as células têm `border-b` + `border-r` em
`color/border/regular = #d4d4d4` e padding `16px`.

### 2.3. Comentários e descrições

O frame `Tipografia` traz descrições próprias na 5ª coluna (`description`)
da tabela, distintas das descrições semânticas usadas no storybook. A tabela
abaixo cruza as duas fontes:

| Token       | Descrição Figma (coluna `description`)                  | Descrição storybook (`Fundamentos/Tipografia`)              |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| `heading1`  | "Títulos em destaques como heros."                       | "Títulos em destaques como heros"                             |
| `heading2`  | "." _(placeholder vazio)_                                | _(sem entrada)_                                               |
| `heading3`  | "." _(placeholder vazio)_                                | _(sem entrada)_                                               |
| `heading4`  | "." _(placeholder vazio)_                                | _(sem entrada)_                                               |
| `heading5`  | "." _(placeholder vazio)_                                | _(sem entrada)_                                               |
| `heading6`  | "Títulos em cards, telas."                               | "Títulos em cards, telas"                                     |
| `body1`     | "Textos longos em telas com mais espaço"                 | "Textos longos em telas com mais espaço"                      |
| `body2`     | "Textos longos em telas com menos espaço, tabelas"       | "Textos longos em telas com menos espaço, tabelas"            |
| `caption1`  | "Descrições complementares"                              | "Descrições complementares"                                   |

> **Comportamento textual (truncate, ellipsis, line-clamp, italic, underline)
> não está documentado dentro do frame `Tipografia`.** Esses comportamentos
> são herdados do Antd Typography e não constam como tokens publicados — ver
> §9.5 e §10.

---

## 3. Tokens extraídos do Figma

### 3.1. Família, peso, line-height e letter-spacing (uniformes)

Confirmado em **todas** as instâncias inspecionadas (Badge `4080:6201`,
Card `4069:6522`, Modal `4090:7467`, EmptyState `4237:10769`, Alert
`4077:7402`, PageHeader `8220:10535`, KpiCard `5088:13986`,
ConfirmModal `4098:6577`, Tabs `4077:9817`, Segmented `4886:14656`,
Notification `4098:8063`, RangePicker `4080:9747`, frame Tipografia
`4002:5004` e o nó-mestre Componentes `4035:1030`):

| Atributo         | Valor    | Token Figma                                                   |
| ---------------- | -------- | ------------------------------------------------------------- |
| `font-family`    | `Inter`  | embutido na Text Style                                         |
| `font-weight`    | `400`    | embutido na Text Style (`style: Regular`)                      |
| `line-height`    | `1.2`    | embutido na Text Style (`lineHeight: 1.2000000476837158`)     |
| `letter-spacing` | `0`      | embutido na Text Style (`letterSpacing: 0`)                    |

> Não há, no Figma, variáveis de tipografia para `bold`, `italic`,
> `underline`, `strikethrough`, `code` ou `text-transform`. O design só define
> a escala `Regular` como variável. Variações de ênfase aplicadas dentro do
> próprio frame `Tipografia` (page header `Plus Jakarta Sans Bold 48px`,
> section headers `Inter Bold 49px`, samples `Inter Bold 31px`, células
> `JetBrains Mono Bold 13/16px`) **não são variáveis publicadas** — são
> styles soltos da própria página de documentação. Ver §9.5.

### 3.2. Escala (tamanhos)

| Token Figma         | `font-size` | `rem`     | Status no Figma | Confirmado em uso                                                  |
| ------------------- | ----------- | --------- | --------------- | ------------------------------------------------------------------ |
| `heading/01 - 61px` | 61          | 3.813rem  | ✅ publicado como Text Style + variável; renderizado em `4002:5019` (linha "Heading 1" da tabela Escala) | Sem uso em componentes pequenos da matriz — exibido apenas no catálogo Tipografia |
| `heading/02 - 49px` | 49          | 3.063rem  | ✅              | Badge, Card, Modal, EmptyState, PageHeader, KpiCard, Tabs, etc.    |
| `heading/03 - 39px` | 39          | 2.438rem  | ✅ publicado como Text Style + variável; renderizado em `4002:5031` (linha "Heading 3" da tabela Escala) | Sem uso em componentes pequenos da matriz — exibido apenas no catálogo Tipografia |
| `heading/04 - 31px` | 31          | 1.938rem  | ✅              | KpiCard, nó-mestre Componentes                                     |
| `heading/05 - 25px` | 25          | 1.563rem  | ✅              | Badge (section), Card, Modal, EmptyState, KpiCard, Tabs, Segmented |
| `heading/06 - 20px` | 20          | 1.25rem   | ✅              | Badge (description), Card, Modal, EmptyState, Tabs, Segmented      |
| `body/01 - 16px`    | 16          | 1rem      | ✅              | Card, EmptyState, Alert, PageHeader, ConfirmModal, KpiCard         |
| `body/02 - 13px`    | 13          | 0.813rem  | ✅              | Badge (label), Card, Modal, EmptyState, Alert, PageHeader, Tabs, KpiCard, Segmented |
| `caption/01 - 10px` | 10          | 0.625rem  | ✅              | Badge (counter), KpiCard, Segmented, Tabs                          |

`rem` calculado a partir do root 16 px (convenção do projeto). Os valores em
`rem` vêm da foundation `src/theme/foundations/typography/index.ts` e batem
exatamente com a coluna `rem` da tabela Escala (`3.813rem`, `3.063rem`,
`2.438rem`, ...).

### 3.3. Cores semânticas para texto

Confirmadas como variáveis publicadas no Figma (`get_variable_defs` em
`3:3`):

| Token Figma                  | Hex       | Foundation TS                                                       | Status                                                              |
| ---------------------------- | --------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `color/text/dark`            | `#262626` | `designSystemColors.text.dark` (= `neutral[800]`)                   | ✅ publicado e aplicado a texto em vários componentes               |
| `color/text/soft`            | `#6d6d6e` | `designSystemColors.text.soft` (= `neutral[500]`)                   | ✅ publicado; aplicado extensivamente como cor dos headers e células de documentação no frame `Tipografia` (`4002:5004`) e em legendas/labels de outros componentes |
| `color/text/light`           | `#fafafa` | `designSystemColors.text.light` (= `neutral[50]`)                   | ✅ publicado e aplicado a texto sobre fundos escuros                |
| `color/text/disabled`        | `#a3a3a3` | `designSystemColors.text.disabled` (= `neutral[400]`)               | ✅ publicado e aplicado a estados disabled                          |
| `color/text/links/default`   | `#207ac3` | `designSystemColors.text.linksDefault` (= `feedback.blue[500]`)     | ✅ publicado em Figma; **não aplicado** a texto em nenhum componente inspecionado — provavelmente reservada para links em Body/Paragraph |
| `color/text/links/hover`     | `#1d4f79` | `designSystemColors.text.linksHover` (= `feedback.blue[900]`)       | ✅ publicado em Figma; **não aplicado** em texto durante a varredura — idem ao default |

> **Atenção à grafia:** os tokens de link usam **barra** (`color/text/links/default`)
> e não hífen. Foundation TS usa camelCase (`linksDefault`/`linksHover`).

### 3.4. Margin / padding intrínsecos

Toda a escala do Figma usa **line-height unitless `1.2`** — não há `margin`
nem `padding` declarados nas Text Styles. Os espaçamentos entre parágrafos /
seções vêm do componente consumidor (gap do flex, padding do container) e
não da tipografia em si.

### 3.5. Estados visuais

A escala tipográfica Figma **não define estados próprios** (sem `hover`,
`focus`, `disabled`, `error`, `success`). Estes só aparecem quando a
tipografia é usada como link (variante de cor `color/text/links/default`
→ `color/text/links/hover`) ou dentro de um componente interativo (botão,
link, input) que tem o próprio estado.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → text.{dark, soft, light, disabled,
                                          linksDefault, linksHover}
                                    brand.primary[600]
                                    brand.secondary[600]
                                    neutral[400, 500, 600, 800]
                                    feedback.{red, green, yellow, blue}[500]
src/theme/foundations/typography  → fontFamily, fontWeight, lineHeight,
                                    letterSpacing, scale.{heading1..6,
                                    body1, body2, caption1}
```

Tabela com os valores correntes da foundation TS (`src/theme/foundations/typography/index.ts`):

```ts
fontFamily:     "Inter"
fontWeight:     400
lineHeight:     1.2
letterSpacing:  0
scale: {
  heading1:  { px: 61, rem: "3.813rem" },
  heading2:  { px: 49, rem: "3.063rem" },
  heading3:  { px: 39, rem: "2.438rem" },
  heading4:  { px: 31, rem: "1.938rem" },
  heading5:  { px: 25, rem: "1.563rem" },
  heading6:  { px: 20, rem: "1.25rem"  },
  body1:     { px: 16, rem: "1rem"     },
  body2:     { px: 13, rem: "0.813rem" },
  caption1:  { px: 10, rem: "0.625rem" },
}
```

Equivalente CSS publicado em `src/theme/global.css` (todas as variáveis
estão lá: `--font-heading-1-size: 61px`, …, `--font-caption-size: 10px`).

> A foundation TS expõe `text.soft = neutral[500] = #6d6d6e`, equivalente à
> variável Figma `color/text/soft`. Esse alias é usado na documentação mas
> não é referenciado pelo `colorMap` interno do componente (ver §5.3).

---

## 5. Anatomia da implementação

### 5.1. Props proprietárias

#### 5.1.1. `Typography` (raiz)

| Prop       | Tipo                                                          | Default    | Descrição                                                                                                  |
| ---------- | ------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `variant`  | `"heading1"|"heading2"|"heading3"|"heading4"|"heading5"|"heading6"|"body1"|"body2"|"caption"` | `"body1"`  | Aplica a entrada correspondente da escala do Figma. Decide também a tag HTML renderizada (ver §6).         |
| `color`    | `"primary"|"secondary"|"neutral"|"dark"|"error"|"warning"|"success"|"disabled"|"info"`        | `"dark"`   | Aplica uma cor semântica ao texto (resolvida via `colorMap` interno; ver §5.3).                            |
| `style`    | `React.CSSProperties`                                         | —          | Estilos inline adicionais. São mesclados sobre `{ margin: 0, color: <colorMap[color]> }`.                  |
| `children` | `ReactNode`                                                   | —          | Conteúdo textual.                                                                                          |
| _(demais)_ | `Partial<TitleProps & TextProps & ParagraphProps>` do Antd    | —          | Repassadas ao componente Antd subjacente (`strong`, `italic`, `underline`, `delete`, `code`, `mark`, `ellipsis`, `copyable`, `editable`, `keyboard`, etc.). |

Tipos resolvidos em `src/types/components/Typography/index.ts` como:

```ts
type AntdTypographyAllProps =
  Partial<Omit<TitleProps, "level"> & TextProps & ParagraphProps>;

export type CustomTypographyProps = AntdTypographyAllProps & {
  variant?: TypographyVariant;
  color?: DSColor;
};
```

> A prop `level` do `Antd Title` é **omitida** do tipo público — o nível é
> derivado de `variant`. O consumidor não pode passar `level` diretamente.

#### 5.1.2. `Heading1..6`

| Prop       | Tipo                                  | Default | Descrição                                  |
| ---------- | ------------------------------------- | ------- | ------------------------------------------ |
| `color`    | `DSColor`                             | `"dark"`| Igual à raiz.                              |
| _(demais)_ | `Omit<TitleProps, "level">` do Antd   | —       | Repassadas ao `Title` do Antd.             |

#### 5.1.3. `Body1`, `Body2`

| Prop       | Tipo             | Default | Descrição                                  |
| ---------- | ---------------- | ------- | ------------------------------------------ |
| `color`    | `DSColor`        | `"dark"`| Igual à raiz.                              |
| _(demais)_ | `ParagraphProps` | —       | Repassadas ao `Paragraph` do Antd.         |

#### 5.1.4. `Caption`

| Prop       | Tipo        | Default | Descrição                                  |
| ---------- | ----------- | ------- | ------------------------------------------ |
| `color`    | `DSColor`   | `"dark"`| Igual à raiz.                              |
| _(demais)_ | `TextProps` | —       | Repassadas ao `Text` do Antd.              |

### 5.2. Mapeamento `variant` → tag HTML

`renderTypography` (em `src/components/Typography/index.tsx`) faz o
mapeamento:

| `variant`  | Componente Antd | Tag HTML (`level`) | Notas                                                                |
| ---------- | --------------- | ------------------ | -------------------------------------------------------------------- |
| `heading1` | `Title`         | `<h1>` (level=1)   | Tamanho 61 px (token `heading/01`).                                  |
| `heading2` | `Title`         | `<h2>` (level=2)   | Tamanho 49 px (token `heading/02`).                                  |
| `heading3` | `Title`         | `<h3>` (level=3)   | Tamanho 39 px (token `heading/03`).                                  |
| `heading4` | `Title`         | `<h4>` (level=4)   | Tamanho 31 px (token `heading/04`).                                  |
| `heading5` | `Title`         | `<h5>` (level=5)   | Tamanho 25 px (token `heading/05`).                                  |
| `heading6` | `Title`         | `<h5>` (level=5)   | **Particularidade**: o Antd `Title` só aceita level 1–5. `heading6` é renderizado como `<h5>` com o token `heading/05` sobrescrito por `HEADING6_SIZE = 20px`, preservando a hierarquia visual. Ver §9.1. |
| `body1`    | `Paragraph`     | `<div class="ant-typography">` | Tamanho 16 px (token `body/01`). **Particularidade**: o Antd `Paragraph` 6.2.x renderiza como `<div>` (não `<p>`) para permitir blocos aninhados sem violar HTML. |
| `body2`    | `Paragraph`     | `<div class="ant-typography">` | Tamanho 13 px (token `body/02`). Mesma observação de `body1` (Antd `Paragraph` renderiza como `<div>`).                                     |
| `caption`  | `Text`          | `<span>`           | Tamanho 10 px (token `caption/01`).                                  |

### 5.3. Mapeamento `color` → token de cor

`colorMap` (em `src/components/Typography/index.tsx`):

| `color`      | Token resolvido                          | Hex       |
| ------------ | ---------------------------------------- | --------- |
| `primary`    | `designSystemColors.brand.primary[600]`  | `#008633` |
| `secondary`  | `designSystemColors.brand.secondary[600]`| `#105abc` |
| `neutral`    | `designSystemColors.neutral[500]`        | `#6d6d6e` |
| `dark`       | `designSystemColors.neutral[800]`        | `#262626` |
| `error`      | `designSystemColors.feedback.red[500]`   | `#d2190b` |
| `warning`    | `designSystemColors.feedback.yellow[500]`| `#867400` |
| `success`    | `designSystemColors.feedback.green[500]` | `#1e7e34` |
| `disabled`   | `designSystemColors.neutral[400]`        | `#a3a3a3` |
| `info`       | `designSystemColors.feedback.blue[500]`  | `#207ac3` |

> Observação: a foundation `text` no `colors.ts` declara aliases semânticos
> (`text.dark`, `text.soft`, `text.light`, `text.disabled`,
> `text.linksDefault`, `text.linksHover`). A implementação do `Typography`
> **não usa esses aliases** — usa diretamente `neutral` e `feedback`. Ver §9.

### 5.4. Composição

- Para `heading*`: `<Title level={...}>` envolvido em `<ConfigProvider
  theme={{ components: { Typography: tokens } }}>` (na verdade aplicado em
  `theme.token`; ver §9.2).
- Para `body1`/`body2`: `<Paragraph>` com `style` adicional para forçar
  `fontSize` e `lineHeight` (override defensivo além do `ConfigProvider`).
- Para `caption`: `<Text>` apenas com o estilo via `ConfigProvider`.
- O componente raiz aplica `margin: 0` em todos os casos (anulando a margem
  default do Antd Title/Paragraph).

### 5.5. Estilos (CSS Module)

**O componente `Typography` não possui `index.module.css`**. Toda a
identidade visual é injetada via `ConfigProvider` do Antd (tokens
`fontSizeHeading1..5`, `lineHeightHeading1..5`, `fontWeightStrong`,
`colorTextHeading`, `fontSize`, `lineHeight`, `colorText`).

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério                          | Status | Notas                                                                                                                                                                       |
| --------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum)          | ✅     | `dark #262626` em fundo branco `#fafafa`: 15.94:1. `soft #6d6d6e`: 4.84:1. `disabled #a3a3a3`: 2.78:1 — só atinge AA Large (≥ 18 pt), ou seja, `heading1..5` e `heading6` em ≥ 18.66 pt. Para corpo (`body1`, `body2`, `caption`), o consumidor não deve usar `color="disabled"` como cor primária de leitura. |
| 1.3.1 Info and Relationships      | ✅/⚠️  | Headings usam `h1..h5` reais (semântica), parágrafos usam `<div class="ant-typography">` (Antd Paragraph 6.2.x renderiza `<div>`, não `<p>`), caption usa `<span>`. Hierarquia de headings preservada — exceto `heading6` que renderiza `<h5>` (ver §9.1).            |
| 2.4.6 Headings and Labels         | ⚠️     | `heading6` renderiza como `<h5>` (mesmo nível DOM que `heading5`). Hierarquia visual está correta, mas a árvore semântica não distingue h5 de h6. Discutido em §9.1.        |
| 1.4.4 Resize Text                 | ✅     | Todos os tamanhos têm equivalente em `rem` na foundation — quando o consumidor usar `rem`, o zoom do navegador funciona. A implementação atual usa `px`, o que limita o zoom de texto. Ver §10. |
| 1.4.12 Text Spacing               | ✅     | `line-height: 1.2` unitless permite que o usuário ajuste para 1.5× via stylesheet de usuário (CSS `unitless` é preservado em multiplicações).                                 |
| 4.1.2 Name, Role, Value            | ✅/⚠️  | Tags semânticas: h1..h5 corretas; `caption` em `<span>` correto; `body1`/`body2` saem como `<div class="ant-typography">` (limitação do Antd Paragraph 6.2.x — renderiza `<div>`, não `<p>`). Em todos os casos, screen readers obtêm conteúdo de texto sem perdas; apenas a tag semântica de bloco difere. |

---

## 7. Aderência às regras

| Regra                                              | Status                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `general.comment_language` = pt-BR                 | ✅ JSDoc em pt-BR no `index.tsx`.                                            |
| `general.max_file_lines` = 300                     | ✅ `src/components/Typography/index.tsx` ~ 193 linhas.                       |
| `general.max_function_lines` = 50                  | ⚠️ `renderTypography` tem 23 linhas. `Typography` (componente) tem 14. OK.    |
| `typescript.disallow_any` + `require_return_types` | ⚠️ Há um `rest: object` em `renderTypography` que é genérico demais; melhor tipar como `Record<string, unknown>` ou os tipos específicos do Antd. Ver §9. |
| `typescript.types_in_separate_file`                | ✅ tipos em `src/types/components/Typography/index.ts`.                       |
| `architecture.no_business_logic_in_components`     | ✅ apenas mapas de variantes e mapeamento de tokens.                          |
| `architecture.max_props`                           | ✅ `Typography` exibe 4 props proprietárias (`variant`, `color`, `style`, `children`); demais são herdadas do Antd. |
| `code_quality.no_magic_numbers`                    | ✅ todas as constantes extraídas (`HEADING1_SIZE..CAPTION_SIZE`, `FONT_WEIGHT`, `LINE_HEIGHT`). |
| `code_quality.no_nested_ternary`                   | ✅ usa `switch` em `renderTypography`.                                        |

---

## 8. Análise da implementação atual

Tokens **conferidos** contra o Figma:

| #   | Token Figma                        | Implementação                                                              | Status |
| --- | ---------------------------------- | -------------------------------------------------------------------------- | ------ |
| 1   | `heading/02 - 49px`                | `typographyToken.scale.heading2.px = 49`                                   | ✅     |
| 2   | `heading/04 - 31px`                | `typographyToken.scale.heading4.px = 31`                                   | ✅     |
| 3   | `heading/05 - 25px`                | `typographyToken.scale.heading5.px = 25`                                   | ✅     |
| 4   | `heading/06 - 20px`                | `typographyToken.scale.heading6.px = 20`                                   | ✅     |
| 5   | `body/01 - 16px`                   | `typographyToken.scale.body1.px = 16`                                      | ✅     |
| 6   | `body/02 - 13px`                   | `typographyToken.scale.body2.px = 13`                                      | ✅     |
| 7   | `caption/01 - 10px`                | `typographyToken.scale.caption1.px = 10`                                   | ✅     |
| 8   | `Inter` family                     | `typographyToken.fontFamily = "Inter"`                                     | ✅     |
| 9   | `Regular` (weight 400)             | `typographyToken.fontWeight = 400`                                         | ✅     |
| 10  | `lineHeight 1.2`                   | `typographyToken.lineHeight = 1.2`                                         | ✅     |
| 11  | `letterSpacing 0`                  | `typographyToken.letterSpacing = 0`                                        | ✅     |
| 12  | `color/text/dark = #262626`        | `colorMap.dark = neutral[800] = #262626`                                   | ✅     |
| 13  | `color/text/disabled = #a3a3a3`    | `colorMap.disabled = neutral[400] = #a3a3a3`                               | ✅     |
| 14  | `heading/01 - 61px`                | `typographyToken.scale.heading1.px = 61`                                   | ✅ publicado no Figma como Text Style + variável; consumo apenas no frame de documentação `Tipografia` (`4002:5004`), sem uso em componentes pequenos da matriz |
| 15  | `heading/03 - 39px`                | `typographyToken.scale.heading3.px = 39`                                   | ✅ publicado no Figma como Text Style + variável; consumo apenas no frame de documentação `Tipografia` (`4002:5004`), sem uso em componentes pequenos da matriz |

Tokens declarados **mas sem uso aplicado a texto** durante a varredura
(estão publicados no Figma — ver §10):

| #   | Foundation TS                            | Status no Figma                                                            |
| --- | ---------------------------------------- | -------------------------------------------------------------------------- |
| 16  | `text.linksDefault = feedback.blue[500]` | ✅ publicado como `color/text/links/default`; sem aplicação a texto vista. |
| 17  | `text.linksHover = feedback.blue[900]`   | ✅ publicado como `color/text/links/hover`; sem aplicação a texto vista.   |

---

## 9. Pendências e ampliações

### 9.1. `heading6` renderiza como `<h5>` (semântica)

Como o Antd `Typography.Title` só aceita `level: 1 | 2 | 3 | 4 | 5`, a
variante `heading6` é renderizada como `<h5>` no DOM. O arquivo já tem o
comentário explicando essa escolha:

```tsx
// O Antd `Typography.Title` aceita `level` 1–5; "Heading 6" é renderizado
// como `level={5}` e usa propositalmente os tokens de heading5 sobrescritos
// com o tamanho HEADING6_SIZE (20px) para preservar a hierarquia visual.
```

**Impacto**:

- ✅ Aparência respeita o token `heading/06 - 20px`.
- ⚠️ Acessibilidade: `heading5` e `heading6` ficam indistinguíveis no leitor
  de tela / outline do documento. Para preservar a hierarquia DOM, considerar
  trocar a tag para um `<h6>` direto (via `as` ou criando um wrapper sem
  usar `Title`) — mas isso exigiria sair do `Antd Title` para esse caso.

### 9.2. Aplicação do tema via `theme.token` em vez de `theme.components.Typography`

A implementação usa `<ConfigProvider theme={{ token: { fontWeightStrong:
FONT_WEIGHT, ...variantTheme } }}>` — ou seja, sobrescreve **tokens globais
do Antd** dentro de uma árvore React, não tokens específicos do componente.
Isso funciona, mas pode vazar para descendentes (por exemplo, um botão
dentro de um `Typography` herdaria `fontSizeHeading1`). Idealmente, usar
`theme={{ components: { Typography: {...} } }}` para escopar.

### 9.3. `Typography` é `<Paragraph>` por default mas a tipagem mistura `Title + Text + Paragraph`

O tipo `CustomTypographyProps` mistura `Partial<TitleProps & TextProps &
ParagraphProps>`, e o `renderTypography` faz casts para o tipo específico de
cada `case`. Isso é funcional, mas o IDE pode sugerir props que não fazem
sentido em todos os casos (ex.: `code` em `heading1`). Vale considerar:

1. Separar `TypographyProps` em uniões discriminadas por `variant`, ou
2. Documentar (já feito no JSDoc) que `Typography` aceita o superset.

### 9.4. `rest: object` em `renderTypography`

O parâmetro `rest` em `renderTypography(variant, baseStyle, rest)` é tipado
como `object`. A regra `typescript.disallow_any` proíbe `any`, mas `object`
é quase um sinônimo. Recomenda-se tipar como
`Partial<TitleProps & TextProps & ParagraphProps>` para preservar a inferência.

### 9.5. Inline ênfase (`strong`, `italic`, `underline`, `delete`, `code`, `mark`) e styles soltos do frame `Tipografia`

O Antd Typography expõe essas props booleans no `Text` e `Paragraph`. A
implementação repassa via spread. **Nenhuma dessas variações está
publicada como variável no Figma** — a escala oficial só define `Inter
Regular`.

Dentro do próprio frame `Tipografia` (`4002:5004`), existem variações
tipográficas aplicadas **como styles soltos da documentação**, não como
tokens reutilizáveis:

| Onde                                                  | Estilo                                                | Token Figma?               |
| ----------------------------------------------------- | ----------------------------------------------------- | -------------------------- |
| Page header `4002:5005` (título "Tipografia")         | `Plus Jakarta Sans Bold 48px`, cor `color/neutral/50` | ❌ style solto              |
| Section headers `4010:1873`/`4010:1875` ("Família tipográfica", "Escala") | `Inter Bold 49px`, cor `#6d6d6e`                      | ❌ style solto              |
| Sample "Inter" `4002:5009` (alfa do frame)            | `Inter Bold 31px`, cor `color/neutral/70 = #677176`   | ❌ style solto              |
| Alfabeto/numerais `4002:5010` (sob a sample)          | `Inter Regular 16px`, cor `color/neutral/70`          | ✅ usa Text Style `body/01 - 16px` + variável `color/neutral/70` — não é style solto |
| Headers de coluna (`variant/token`, `px`, `rem`, `line height`, `description`) | `Inter Bold 16px`, cor `color/text/soft`              | ❌ style solto              |
| Células `px`, `rem`, `line height`, tag `heading.1`   | `JetBrains Mono Bold 13px` (tag) ou `16px` (células), cor `color/text/soft` | ❌ style solto              |
| Samples na coluna `variant/token` (Heading 1, Heading 2, ..., Caption) | Text Styles oficiais `heading/01..06`, `body/01..02`, `caption/01` com cor literal `text-black` (`#000000`) | ⚠️ Text Style oficial (heading/01..06, body/01..02, caption/01) aplicada com cor literal text-black (#000000) — só a cor é style solto |

Vale documentar isso na story como "feature do Antd, não do design Juscash"
para o usuário entender que `strong/italic` não é um token oficial e que
**Plus Jakarta Sans** e **JetBrains Mono** aparecem apenas na página de
documentação — não devem ser usadas em produto.

### 9.6. Cor `info` não existe no Figma

`colorMap.info = feedback.blue[500]` — não foi visto como cor de texto em
nenhum componente, mas é uma cor semântica válida (usada no Badge
`statusColor=info`). Manter para coerência.

### 9.7. Falta de link Figma no `FIGMA_URL` da story

`src/components/Typography/Typography.stories.tsx` declara `const FIGMA_URL
= ""`. **Recomendação:** apontar `FIGMA_URL` diretamente para o frame
`Tipografia` (`4002:5004`), que é o nó canônico do sistema tipográfico:

```ts
const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4002-5004";
```

### 9.8. Página de testes ausente

Não existe `design-system-tests/src/pages/typography/`. Recomenda-se criar
para validação WCAG via axe-core, espelhando o padrão do Badge.

### 9.9. Cobertura de testes

`src/components/Typography/Typography.test.tsx` cobre apenas: `body1`,
`heading1`, `heading2`, `body1` (de novo, via `Body1`), `caption`. Faltam:

- `heading3`, `heading4`, `heading5`, `heading6`
- Aplicação de `color` (validar `style.color` resolvido)
- Aplicação de `variant` via `Typography` raiz (não só via atalhos)
- Repasse de props do Antd (`strong`, `italic`, `underline`, `delete`,
  `code`, `mark`, `ellipsis`)
- Atributo `level` resultante em headings (semântica)

### 9.10. Ampliações sugeridas (props proprietárias futuras)

Não fazem parte do design Figma atual, mas valeriam discussão:

| Prop sugerida | Comportamento                                                                 |
| ------------- | ----------------------------------------------------------------------------- |
| `truncate`    | `true` / `number` aplica `Antd ellipsis: { rows: <n> }`. Reduz boilerplate.   |
| `align`       | `"left" \| "center" \| "right" \| "justify"`. Mapa para `textAlign`.          |
| `weight`      | `"regular" \| "medium" \| "bold"`. **Só se** o design adicionar pesos no Figma. |
| `as`          | `keyof JSX.IntrinsicElements`. Permite trocar a tag DOM sem perder a variante. |

---

## 10. Pontos ambíguos no Figma — verificar com design

São itens declarados na foundation TS, no `global.css` e nas stories do
storybook **que merecem atenção**. O reviewer deve confirmar com o time de
design se ainda existem, foram renomeados ou descontinuados:

1. **`color/text/links/default` e `color/text/links/hover`** — variáveis
   publicadas no Figma (`#207ac3` e `#1d4f79`), mas **não aplicadas como cor
   de texto em nenhuma instância da varredura**. Provavelmente reservadas
   para links em `Body1`/`Body2` (componente `Link` ainda não inspecionado
   nesta análise) ou para `Breadcrumb`. Confirmar se está em uso em algum
   componente fora do escopo deste parecer e quando o design pretende
   exercitá-las.

2. **Tabela `Escala` (frame `4002:5012`) — coluna `line height` exibe `0px`
   em todas as linhas.** O label da coluna é `line height`, mas o valor
   renderizado é literal `0px` (ver `4002:5023` para Heading 1). Como o
   line-height real `1.2` está apenas na variável Text Style, **suspeita-se
   de bug do design**: o label deveria ser `letter-spacing` (`0` faz sentido
   nesse contexto) ou o conteúdo deveria mostrar `1.2`. Verificar com o
   time.

3. **Frame `Breakpoints` (`4001:690`) — responsividade tipográfica.** Existe
   na página `Fundamentos`, mas **não foi inspecionado nesta análise**. As
   instâncias de componentes inspecionadas (Badge, Card, Modal, etc.) usam
   a escala uniforme em todas as larguras, então até agora não há evidência
   de variação responsiva da tipografia. Recomenda-se que o reviewer abra o
   frame `Breakpoints` para confirmar se há tokens tipográficos por viewport
   (ex.: `heading-1-mobile`) ou se a regra é manter a escala única.

4. **Itálico, negrito, sublinhado, strikethrough, code** — o storybook
   `InlineStyles` mostra `strong`, `italic`, `underline`, `delete`, `code`
   funcionando. Como o Figma só publica `Inter Regular` na escala, esses
   estilos são **comportamento herdado do Antd**, não tokens do Design
   System. Confirmar se devem permanecer expostos ou se devem ser
   suprimidos (para forçar o consumidor a usar variantes proprietárias).

5. **Responsividade** — não há, no Figma inspecionado dentro do frame
   `Tipografia`, breakpoints com tamanhos tipográficos diferentes. A escala
   é uniforme entre `mobile (320)`, `tablet (768)` e `desktop (1366)`.
   Confirmar com base no item 3 acima se essa é a intenção definitiva ou se
   há plano de adicionar `heading-1-mobile`, etc.

6. **Variável `paragraph small/medium` (legado Untitled UI / shadcn?)** — em
   alguns nós apareceu uma variável `paragraph small/medium`:
   `Font(family: "Geist", style: Medium, size: 14, weight: 500, lineHeight:
   1.5, letterSpacing: 0.5)`. Isso usa **Geist** (não Inter) e tem
   `lineHeight 1.5` — completamente fora do sistema Juscash. Provavelmente
   é leftover de alguma instância vinda de outra biblioteca. Confirmar e
   expurgar.

---

## 11. Resumo da matriz `variant × tag × token`

| Variante   | Tag DOM (atual)     | Tag DOM (ideal) | Token Figma         | `font-size` | `line-height` | `font-weight` | `letter-spacing` | Cor default              |
| ---------- | ------------------- | --------------- | ------------------- | ----------- | ------------- | ------------- | ---------------- | ------------------------ |
| `heading1` | `<h1>` (Title L1)   | `<h1>`          | `heading/01 - 61px` | 61          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `heading2` | `<h2>` (Title L2)   | `<h2>`          | `heading/02 - 49px` | 49          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `heading3` | `<h3>` (Title L3)   | `<h3>`          | `heading/03 - 39px` | 39          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `heading4` | `<h4>` (Title L4)   | `<h4>`          | `heading/04 - 31px` | 31          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `heading5` | `<h5>` (Title L5)   | `<h5>`          | `heading/05 - 25px` | 25          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `heading6` | `<h5>` (Title L5)   | `<h6>`          | `heading/06 - 20px` | 20          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `body1`    | `<div class="ant-typography">` (Paragraph) | `<p>` (ideal) | `body/01 - 16px`    | 16          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `body2`    | `<div class="ant-typography">` (Paragraph) | `<p>` (ideal) | `body/02 - 13px`    | 13          | 1.2           | 400           | 0                | `dark` (#262626)         |
| `caption`  | `<span>` (Text)     | `<span>`        | `caption/01 - 10px` | 10          | 1.2           | 400           | 0                | `neutral[600]` (#525252) — _ambíguo: o storybook do componente usa `neutral[600]` no `colorText` para a variante `caption`, mas o `colorMap.dark` é `neutral[800]`. Quando o consumidor não passar `color`, `dark` ganha e o texto vai como `#262626`. **No frame `Tipografia` (`4002:5004`), o sample de Caption em `4002:5074` usa a classe `text-black` (`#000000` literal)**, nem `color/text/dark` nem `neutral[600]`. Verificar intenção com design._ |

---

## 12. Decisão técnica resumida

| Pergunta                                        | Resposta curta                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| Quantas variantes o Figma define?               | **9** (`heading/01..06`, `body/01..02`, `caption/01`); todas publicadas e renderizadas no frame Tipografia (`4002:5004`); 7 também em uso em componentes; `heading/01` e `heading/03` ainda sem uso em componentes pequenos. |
| Quais pesos / estilos existem?                  | **Só `Regular` (400)** como variável publicada. Sem italic, bold, underline em variáveis. Page header / section headers / células do frame `Tipografia` usam styles soltos (Plus Jakarta Sans Bold, Inter Bold, JetBrains Mono Bold) — não são tokens. |
| Há diferença responsiva?                        | **Não** (mesma escala em mobile/tablet/desktop, até onde foi inspecionado; frame `Breakpoints` ainda não conferido). |
| O componente tem CSS Module próprio?            | **Não.** Identidade aplicada via `ConfigProvider` do Antd.                              |
| O componente expõe ícone/slot?                  | **Não.**                                                                                |
| O componente expõe estados (hover/focus/error)? | **Não nativamente.** Estados vêm do consumidor (link, button).                          |
| `Heading6` é semântico?                         | **Não totalmente**: renderiza como `<h5>` por limitação do Antd Title.                  |
