# Typography — Critérios de Aceite

> Checklist de verificação objetiva derivado do parecer técnico
> `docs/componentes/Typography/Typography.md` (Loop A fechado, 0 divergências).
> Cada critério é verificável de forma binária (pass/fail) contra o código
> em `src/components/Typography/` e/ou os artefatos de Storybook/teste/tipos.
> O `acceptance-criteria-checker` deve usar este arquivo como fonte única.

- **Componente alvo:** `src/components/Typography/index.tsx`
- **Tipos:** `src/types/components/Typography/index.ts`
- **Stories:** `src/components/Typography/Typography.stories.tsx`
- **Testes:** `src/components/Typography/Typography.test.tsx`
- **Figma canônico:** `4002-5004` (frame `Tipografia`)

---

## 1. Variantes (prop `variant`)

### 1.1. `heading1`

- [ ] **AC-001** A prop `variant="heading1"` é aceita pelo `Typography` raiz sem erro de tipagem (tipo `TypographyVariant` em `src/types/components/Typography/index.ts` inclui `"heading1"`).
- [ ] **AC-002** Existe um subcomponente atalho `Heading1` exportado por `src/components/Typography/index.tsx` que renderiza `<Typography variant="heading1" />`.
- [ ] **AC-003** O `Typography` com `variant="heading1"` renderiza a tag HTML `<h1>` no DOM (via `Antd Title level={1}`).
- [ ] **AC-004** A variante `heading1` usa Inter Regular, peso `400`, tamanho `61px` (token `typographyToken.scale.heading1.px`), line-height `1.2`, letter-spacing `0`.

### 1.2. `heading2`

- [ ] **AC-005** A prop `variant="heading2"` é aceita pelo `Typography` raiz.
- [ ] **AC-006** Existe um subcomponente atalho `Heading2` exportado.
- [ ] **AC-007** `variant="heading2"` renderiza `<h2>` no DOM (Antd Title level=2).
- [ ] **AC-008** A variante `heading2` aplica Inter Regular, peso `400`, tamanho `49px`, line-height `1.2`, letter-spacing `0`.

### 1.3. `heading3`

- [ ] **AC-009** A prop `variant="heading3"` é aceita pelo `Typography` raiz.
- [ ] **AC-010** Existe um subcomponente atalho `Heading3` exportado.
- [ ] **AC-011** `variant="heading3"` renderiza `<h3>` no DOM (Antd Title level=3).
- [ ] **AC-012** A variante `heading3` aplica Inter Regular, peso `400`, tamanho `39px`, line-height `1.2`, letter-spacing `0`.

### 1.4. `heading4`

- [ ] **AC-013** A prop `variant="heading4"` é aceita pelo `Typography` raiz.
- [ ] **AC-014** Existe um subcomponente atalho `Heading4` exportado.
- [ ] **AC-015** `variant="heading4"` renderiza `<h4>` no DOM (Antd Title level=4).
- [ ] **AC-016** A variante `heading4` aplica Inter Regular, peso `400`, tamanho `31px`, line-height `1.2`, letter-spacing `0`.

### 1.5. `heading5`

- [ ] **AC-017** A prop `variant="heading5"` é aceita pelo `Typography` raiz.
- [ ] **AC-018** Existe um subcomponente atalho `Heading5` exportado.
- [ ] **AC-019** `variant="heading5"` renderiza `<h5>` no DOM (Antd Title level=5).
- [ ] **AC-020** A variante `heading5` aplica Inter Regular, peso `400`, tamanho `25px`, line-height `1.2`, letter-spacing `0`.

### 1.6. `heading6`

- [ ] **AC-021** A prop `variant="heading6"` é aceita pelo `Typography` raiz.
- [ ] **AC-022** Existe um subcomponente atalho `Heading6` exportado.
- [ ] **AC-023** `variant="heading6"` renderiza `<h5>` no DOM (limitação do Antd Title; documentada em §9.1 do parecer e por comentário em `index.tsx` linhas 73–75).
- [ ] **AC-024** A variante `heading6` aplica Inter Regular, peso `400`, tamanho `20px` (constante `HEADING6_SIZE`), line-height `1.2`, letter-spacing `0`.

### 1.7. `body1`

- [ ] **AC-025** A prop `variant="body1"` é aceita pelo `Typography` raiz.
- [ ] **AC-026** Existe um subcomponente atalho `Body1` exportado.
- [ ] **AC-027** `variant="body1"` renderiza com classe `ant-typography` no DOM (Antd Paragraph 6.2.x usa elemento bloco `<div class="ant-typography">`, não `<p>` — decisão do Antd para permitir aninhamento de blocos sem violar HTML).
- [ ] **AC-028** A variante `body1` aplica Inter Regular, peso `400`, tamanho `16px`, line-height `1.2`, letter-spacing `0`.

### 1.8. `body2`

- [ ] **AC-029** A prop `variant="body2"` é aceita pelo `Typography` raiz.
- [ ] **AC-030** Existe um subcomponente atalho `Body2` exportado.
- [ ] **AC-031** `variant="body2"` renderiza com classe `ant-typography` no DOM (Antd Paragraph 6.2.x renderiza como `<div class="ant-typography">`).
- [ ] **AC-032** A variante `body2` aplica Inter Regular, peso `400`, tamanho `13px`, line-height `1.2`, letter-spacing `0`.

### 1.9. `caption`

- [ ] **AC-033** A prop `variant="caption"` é aceita pelo `Typography` raiz.
- [ ] **AC-034** Existe um subcomponente atalho `Caption` exportado.
- [ ] **AC-035** `variant="caption"` renderiza `<span>` no DOM (via Antd Text).
- [ ] **AC-036** A variante `caption` aplica Inter Regular, peso `400`, tamanho `10px`, line-height `1.2`, letter-spacing `0`.

### 1.10. Default e cobertura completa

- [ ] **AC-037** O default de `variant` é `"body1"` quando o consumidor não passa a prop (verificado em `Typography(props)` linha 130 do `index.tsx`).
- [ ] **AC-038** O componente exporta um objeto agregado `TypographyComponents` contendo `Heading1..6`, `Body1`, `Body2`, `Caption`.
- [ ] **AC-039** O union `TypographyVariant` em `src/types/components/Typography/index.ts` tem exatamente 9 entradas (`heading1..heading6`, `body1`, `body2`, `caption`); nenhuma a mais, nenhuma a menos.

---

## 2. Cores (prop `color`)

### 2.1. Aceitação via prop

- [ ] **AC-040** O union `DSColor` em `src/types/components/Typography/index.ts` tem exatamente 9 entradas: `"primary"`, `"secondary"`, `"neutral"`, `"dark"`, `"error"`, `"warning"`, `"success"`, `"disabled"`, `"info"`.
- [ ] **AC-041** O componente `Typography` aceita a prop `color` de tipo `DSColor` sem erro de tipagem.
- [ ] **AC-042** Os subcomponentes `Heading1..6`, `Body1`, `Body2`, `Caption` aceitam a prop `color` de tipo `DSColor` sem erro de tipagem.

### 2.2. Resolução de token (objeto `colorMap` em `index.tsx`)

- [ ] **AC-043** `color="primary"` resolve para `designSystemColors.brand.primary[600]` (`#008633`).
- [ ] **AC-044** `color="secondary"` resolve para `designSystemColors.brand.secondary[600]` (`#105abc`).
- [ ] **AC-045** `color="neutral"` resolve para `designSystemColors.neutral[500]` (`#6d6d6e`).
- [ ] **AC-046** `color="dark"` resolve para `designSystemColors.neutral[800]` (`#262626`).
- [ ] **AC-047** `color="error"` resolve para `designSystemColors.feedback.red[500]` (`#d2190b`).
- [ ] **AC-048** `color="warning"` resolve para `designSystemColors.feedback.yellow[500]` (`#867400`).
- [ ] **AC-049** `color="success"` resolve para `designSystemColors.feedback.green[500]` (`#1e7e34`).
- [ ] **AC-050** `color="disabled"` resolve para `designSystemColors.neutral[400]` (`#a3a3a3`).
- [ ] **AC-051** `color="info"` resolve para `designSystemColors.feedback.blue[500]` (`#207ac3`).

### 2.3. Default

- [ ] **AC-052** O default de `color` é `"dark"` quando o consumidor não passa a prop (verificado em `Typography(props)` linha 130 do `index.tsx`).
- [ ] **AC-053** A cor resolvida é aplicada via `style.color` no elemento renderizado (mesclado em `baseStyle` no `Typography`, linhas 134–138).
- [ ] **AC-054** Sem `color` informado, o `Typography` renderiza com `style.color === "#262626"`.

---

## 3. Pass-through das props do Antd

- [ ] **AC-055** `Typography` aceita a prop `style` (`React.CSSProperties`) e a mescla sobre `{ margin: 0, color: <colorMap[color]> }` (linha 137 do `index.tsx`), preservando a precedência do consumidor.
- [ ] **AC-056** `Typography` aceita a prop `className` (herdada do superset Antd) e a repassa ao componente Antd subjacente via spread.
- [ ] **AC-057** O tipo `CustomTypographyProps` (em `src/types/components/Typography/index.ts`) é declarado como `AntdTypographyAllProps & { variant?: TypographyVariant; color?: DSColor }`, onde `AntdTypographyAllProps = Partial<Omit<TitleProps, "level"> & TextProps & ParagraphProps>`.
- [ ] **AC-058** A prop `level` do `Antd Title` é **omitida** do tipo público de `Typography` e `HeadingProps` (não pode ser passada diretamente pelo consumidor; o nível é derivado de `variant`).
- [ ] **AC-059** Props booleanas de ênfase do Antd (`strong`, `italic`, `underline`, `delete`, `code`, `mark`, `keyboard`) são repassadas via spread ao componente Antd subjacente e funcionam quando aplicáveis à variante.
- [ ] **AC-060** Props avançadas do Antd (`ellipsis`, `copyable`, `editable`) são repassadas via spread quando aplicáveis à variante (`Paragraph` aceita as três; `Text` aceita `copyable` e `ellipsis`; `Title` aceita as três).
- [ ] **AC-061** O `style` que o consumidor passa **sobrescreve** o `color` calculado pelo `colorMap` quando há colisão de chaves (spread `...style` vem **depois** de `color: textColor` em `baseStyle`).
- [ ] **AC-062** `Typography` força `margin: 0` no `baseStyle` (anula a margem default do Antd Title/Paragraph), mas o consumidor pode sobrescrever via `style={{ margin: ... }}`.

---

## 4. `displayName`

- [ ] **AC-063** `Typography.displayName === "Typography"` (linha 144).
- [ ] **AC-064** `Heading1.displayName === "Heading1"` (linha 147).
- [ ] **AC-065** `Heading2.displayName === "Heading2"` (linha 150).
- [ ] **AC-066** `Heading3.displayName === "Heading3"` (linha 153).
- [ ] **AC-067** `Heading4.displayName === "Heading4"` (linha 156).
- [ ] **AC-068** `Heading5.displayName === "Heading5"` (linha 159).
- [ ] **AC-069** `Heading6.displayName === "Heading6"` (linha 162).
- [ ] **AC-070** `Body1.displayName === "Body1"` (linha 165).
- [ ] **AC-071** `Body2.displayName === "Body2"` (linha 168).
- [ ] **AC-072** `Caption.displayName === "Caption"` (linha 171).

---

## 5. Tipos em arquivo separado

- [ ] **AC-073** O arquivo `src/types/components/Typography/index.ts` existe.
- [ ] **AC-074** O arquivo `src/types/components/Typography/index.ts` exporta o tipo `CustomTypographyProps`.
- [ ] **AC-075** O arquivo `src/types/components/Typography/index.ts` exporta o tipo `HeadingProps`.
- [ ] **AC-076** O arquivo `src/types/components/Typography/index.ts` exporta o tipo `BodyProps`.
- [ ] **AC-077** O arquivo `src/types/components/Typography/index.ts` exporta o tipo `CaptionProps`.
- [ ] **AC-078** O arquivo `src/types/components/Typography/index.ts` exporta o tipo/union `TypographyVariant`.
- [ ] **AC-079** O arquivo `src/types/components/Typography/index.ts` exporta o tipo/union `DSColor`.
- [ ] **AC-080** `src/components/Typography/index.tsx` **não declara** nenhum `type` ou `interface` de props (todas as declarações de tipo público vivem em `src/types/components/Typography/index.ts`).
- [ ] **AC-081** `src/components/Typography/index.tsx` importa os tipos usando `import type { ... }` a partir de `../../types/components/Typography`.

---

## 6. Stories (Storybook)

### 6.1. Cobertura mínima

- [ ] **AC-082** `src/components/Typography/Typography.stories.tsx` exporta uma story chamada `Default`.
- [ ] **AC-083** Existe uma story `HeadingVariants` que renderiza as 6 variantes `heading1..heading6` simultaneamente.
- [ ] **AC-084** Existe uma story `BodyVariants` que renderiza `body1`, `body2` e `caption` simultaneamente.
- [ ] **AC-085** Existe uma story `ColorVariants` que renderiza todas as 9 cores (`primary`, `secondary`, `neutral`, `dark`, `error`, `warning`, `success`, `disabled`, `info`).
- [ ] **AC-086** ~~Story `InlineStyles`~~ — **REMOVIDA**. O Figma não documenta inline styles (`strong`, `italic`, `underline`, `delete`, `code`); essas props existem apenas como pass-through do Antd via `...rest` e não devem ser demonstradas como feature do DS. Critério não se aplica.
- [ ] **AC-087** ~~Story `ParagraphExample`~~ — **REMOVIDA**. Era redundante com a story `BodyVariants` (que já cobre `Body1`/`Body2`/`Caption`). Critério não se aplica.
- [ ] **AC-088** Existe uma story `Playground` com controles (`argTypes`) para `variant` e `color`.

### 6.2. Metadata

- [ ] **AC-089** `meta.title === "Components/Typography"` (ou outra categoria oficial; conferir consistência com demais componentes).
- [ ] **AC-090** `meta.tags` contém `"autodocs"`.
- [ ] **AC-091** `meta.parameters.design.type === "figma"`.
- [ ] **AC-092** `meta.parameters.design.url` aponta para o nó `4002-5004` (ou seja, contém `node-id=4002-5004` no URL). O `FIGMA_URL` declarado em `Typography.stories.tsx` **não pode estar vazio** (pendência §9.7 do parecer).
- [ ] **AC-093** `meta.parameters.docs.description.component` está preenchida em pt-BR, com link da doc do Antd correspondente e exemplo de uso copiável.

---

## 7. Testes (Vitest)

### 7.1. Renderização de variantes

- [ ] **AC-094** Existe teste que verifica renderização de `Typography variant="heading1"` resultando em `<h1>` no DOM.
- [ ] **AC-095** Existe teste que verifica renderização de `Typography variant="heading2"` resultando em `<h2>` no DOM.
- [ ] **AC-096** Existe teste que verifica renderização de `Typography variant="heading3"` resultando em `<h3>` no DOM.
- [ ] **AC-097** Existe teste que verifica renderização de `Typography variant="heading4"` resultando em `<h4>` no DOM.
- [ ] **AC-098** Existe teste que verifica renderização de `Typography variant="heading5"` resultando em `<h5>` no DOM.
- [ ] **AC-099** Existe teste que verifica renderização de `Typography variant="heading6"` resultando em `<h5>` no DOM (com observação sobre a limitação do Antd em §9.1 do parecer).
- [ ] **AC-100** Existe teste que verifica renderização de `Typography variant="body1"` resultando em um bloco com classe `ant-typography` no DOM (Antd Paragraph 6.2.x usa `<div>`, não `<p>`).
- [ ] **AC-101** Existe teste que verifica renderização de `Typography variant="body2"` resultando em um bloco com classe `ant-typography` no DOM (Antd Paragraph 6.2.x usa `<div>`, não `<p>`).
- [ ] **AC-102** Existe teste que verifica renderização de `Typography variant="caption"` resultando em `<span>` no DOM.

### 7.2. Renderização de subcomponentes (atalhos)

- [ ] **AC-103** Existe teste que verifica renderização de `<Heading1>` resultando em `<h1>` no DOM.
- [ ] **AC-104** Existe teste que verifica renderização de `<Heading2>` resultando em `<h2>` no DOM.
- [ ] **AC-105** Existe teste que verifica renderização de `<Heading3>` resultando em `<h3>` no DOM.
- [ ] **AC-106** Existe teste que verifica renderização de `<Heading4>` resultando em `<h4>` no DOM.
- [ ] **AC-107** Existe teste que verifica renderização de `<Heading5>` resultando em `<h5>` no DOM.
- [ ] **AC-108** Existe teste que verifica renderização de `<Heading6>` resultando em `<h5>` no DOM.
- [ ] **AC-109** Existe teste que verifica renderização de `<Body1>` resultando em um bloco com classe `ant-typography` no DOM (Antd Paragraph 6.2.x usa `<div>`, não `<p>`).
- [ ] **AC-110** Existe teste que verifica renderização de `<Body2>` resultando em um bloco com classe `ant-typography` no DOM (Antd Paragraph 6.2.x usa `<div>`, não `<p>`).
- [ ] **AC-111** Existe teste que verifica renderização de `<Caption>` resultando em `<span>` no DOM.

### 7.3. Cobertura de cores

- [ ] **AC-112** Existe teste que verifica `color="primary"` resultando em `style.color === "#008633"`.
- [ ] **AC-113** Existe teste que verifica `color="secondary"` resultando em `style.color === "#105abc"`.
- [ ] **AC-114** Existe teste que verifica `color="neutral"` resultando em `style.color === "#6d6d6e"`.
- [ ] **AC-115** Existe teste que verifica `color="dark"` resultando em `style.color === "#262626"`.
- [ ] **AC-116** Existe teste que verifica `color="error"` resultando em `style.color === "#d2190b"`.
- [ ] **AC-117** Existe teste que verifica `color="warning"` resultando em `style.color === "#867400"`.
- [ ] **AC-118** Existe teste que verifica `color="success"` resultando em `style.color === "#1e7e34"`.
- [ ] **AC-119** Existe teste que verifica `color="disabled"` resultando em `style.color === "#a3a3a3"`.
- [ ] **AC-120** Existe teste que verifica `color="info"` resultando em `style.color === "#207ac3"`.
- [ ] **AC-121** Existe teste que verifica o default `color="dark"` quando a prop é omitida (resulta em `style.color === "#262626"`).

### 7.4. Pass-through e composição

- [ ] **AC-122** Existe teste que verifica que `className` passado pelo consumidor é aplicado ao elemento renderizado.
- [ ] **AC-123** Existe teste que verifica que `style` passado pelo consumidor sobrescreve o `color` calculado quando houver colisão.
- [ ] **AC-124** Existe teste que verifica o repasse de pelo menos uma prop booleana de ênfase do Antd (ex.: `strong`) ao componente subjacente.

---

## 8. Gates de código (regras de `.code-review.json` / CLAUDE.md)

- [ ] **AC-125** Nenhuma ocorrência de `any` (literal) em `src/components/Typography/index.tsx` ou `src/types/components/Typography/index.ts`.
- [ ] **AC-126** Nenhuma ocorrência de `console.log`, `console.warn`, `console.error` em `src/components/Typography/index.tsx`.
- [ ] **AC-127** Nenhuma ocorrência de `debugger` em `src/components/Typography/index.tsx`.
- [ ] **AC-128** Nenhum bloco de código comentado (linhas iniciadas por `// ` que contenham JSX ou statements em vez de explicação) em `src/components/Typography/index.tsx`. Comentários explicativos como o de `heading6` (linhas 73–75) são permitidos.
- [ ] **AC-129** Nenhum número mágico fora do conjunto `[-1, 0, 1, 2, 100, 1000]` aparece como literal em `src/components/Typography/index.tsx`. Todos os tamanhos vêm de `typographyToken.scale.*` ou estão em constantes nomeadas (`HEADING1_SIZE..CAPTION_SIZE`, `FONT_WEIGHT`, `LINE_HEIGHT`).
- [ ] **AC-130** Nenhum ternário aninhado em `src/components/Typography/index.tsx`. O mapeamento `variant → componente Antd` usa `switch` em `renderTypography` (linha 100).
- [ ] **AC-131** `src/components/Typography/index.tsx` tem ≤ 300 linhas (excluindo comentários e linhas em branco; arquivo atual ~193 linhas).
- [ ] **AC-132** Nenhuma função em `src/components/Typography/index.tsx` excede 50 linhas (`Typography` ~14 linhas; `renderTypography` ~23 linhas).
- [ ] **AC-133** `Typography` (raiz) expõe ≤ 8 props proprietárias (`variant`, `color`, `style`, `children` + props herdadas do Antd via spread). Atualmente 4 proprietárias — passa.
- [ ] **AC-134** Nenhuma função em `src/components/Typography/index.tsx` excede 4 parâmetros (`renderTypography` tem 3).
- [ ] **AC-135** Complexidade ciclomática de cada função em `src/components/Typography/index.tsx` ≤ 10 (`renderTypography` tem 1 switch com 9 cases + default = 10; passa).
- [ ] **AC-136** Toda função/componente exportado em `src/components/Typography/index.tsx` possui JSDoc em pt-BR (verificado para `Typography` na linha 124).
- [ ] **AC-137** Todos os imports em `src/components/Typography/index.tsx` são usados (sem imports mortos).
- [ ] **AC-138** Os tipos importados em `src/components/Typography/index.tsx` usam `import type` (linhas 3–14 do `index.tsx`).
- [ ] **AC-139** Nenhum import direto de `antd` em barrel público (`src/index.ts`); o `Typography` é exposto apenas via `@juscash/design-system`.
- [ ] **AC-140** `src/components/Typography/index.tsx` não importa `antd` de subpath profundo arbitrário; usa `from "antd"` para o agregado e `antd/es/typography/{Title|Text|Paragraph}` apenas para tipos (`import type`).

---

## 9. Ausência de CSS Module

- [ ] **AC-141** O arquivo `src/components/Typography/index.module.css` **não existe** (parecer §5.5 e §12: o componente aplica identidade via `ConfigProvider` do Antd e theme tokens; não precisa de CSS Module). Caso o parecer evolua e passe a exigir CSS Module, este critério deve ser atualizado em conjunto.
- [ ] **AC-142** `src/components/Typography/index.tsx` não importa nenhum arquivo `.module.css`.
- [ ] **AC-143** `src/components/Typography/index.tsx` não declara CSS global (sem `import "./global.css"` ou semelhante específico para Typography além do reset do Antd que já vem do `JuscashProvider`).

---

## 10. Página de variações em design-system-tests

- [ ] **AC-144** Pendente — será criada pelo `ds-tests-author`. Quando criada, deve viver em `design-system-tests/src/pages/typography/index.tsx` (parecer §9.8) e espelhar o padrão do Badge para validação WCAG via axe-core. Este critério deve ser **marcado pelo ds-tests-author** quando a página estiver pronta.

---

## Resumo

| Categoria                                       | Critérios       |
| ----------------------------------------------- | --------------- |
| 1. Variantes (prop `variant`)                   | AC-001 a AC-039 (39) |
| 2. Cores (prop `color`)                         | AC-040 a AC-054 (15) |
| 3. Pass-through das props do Antd               | AC-055 a AC-062 (8)  |
| 4. `displayName`                                | AC-063 a AC-072 (10) |
| 5. Tipos em arquivo separado                    | AC-073 a AC-081 (9)  |
| 6. Stories (Storybook)                          | AC-082 a AC-093 (12) |
| 7. Testes (Vitest)                              | AC-094 a AC-124 (31) |
| 8. Gates de código                              | AC-125 a AC-140 (16) |
| 9. Ausência de CSS Module                       | AC-141 a AC-143 (3)  |
| 10. Página de variações em design-system-tests  | AC-144 (1)           |
| **Total**                                       | **144**          |
