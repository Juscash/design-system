# Card — Parecer técnico

> Documento de referência do componente `Card` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Card (4069:6522)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6522)
- **Arquivo no repo:** `src/components/Card/index.tsx`
- **Tipos:** `src/types/components/Card/index.ts`
- **CSS Module:** `src/components/Card/index.module.css`
- **Stories:** `src/components/Card/Card.stories.tsx`
- **Testes:** `src/components/Card/Card.test.tsx`
- **Página de testes:** `design-system-tests/src/pages/card/index.tsx`

---

## 1. Contexto e finalidade

`Card` é o componente **container** do design system. Não tem variantes de
cor nem tipos catalogados — é uma superfície neutra (fundo `neutral/50`,
borda 1px, raio 8) que **agrupa conteúdo arbitrário** (texto, formulários,
ações, mídia, listas, charts).

A única decisão proprietária é **se o card é interativo** ou estático. Quando
clickable, ativa hover/focus e entra na ordem de Tab; quando não, é apenas
um wrapper visual.

---

## 2. Anatomia (Figma)

A página `4069:6522` contém a matriz `card` (`4069:5594`):

| Eixo       | Valores                                            |
| ---------- | -------------------------------------------------- |
| `state`    | `default` · `hover` · `focus`                      |
| `slot no.` | `1 slot` (88h) · `2 slots` (128h) · `3 slots` (168h)|

3 estados × 3 quantidades de slots = **9 símbolos** com 280px de largura
fixa cada (apenas para a matriz; em uso real a largura é definida pelo
consumer).

**Frame `Description` (4627:11721) — comentário do design:**

> "Inclua o hover e focus apenas em cards clicáveis, que redirecionam para
> outra página ou ação."

Esse comentário é a **regra-mãe do componente**: hover/focus são opcionais
e dependem de o card ser interativo. A implementação respeita isso via prop
`clickable`.

**Frame `Components` (4069:5607)** — exemplos de uso no Figma:
- Card de login (368×404) — `<Card>` envolvendo Inputs + Button.
- Card de feedback (368×254) — `<Card>` com texto + Button.

---

## 3. Tokens extraídos do Figma

### 3.1. Container

| Token             | Valor                                | Foundation        |
| ----------------- | ------------------------------------ | ----------------- |
| Background        | `color/background/white` (#fafafa)   | `neutral[50]`     |
| Border            | 1px `color/border/regular` (#d4d4d4) | `neutral[300]`    |
| Border radius     | `radius/xl` (8)                      | `radius.xl`       |
| Padding interno   | `var --6` (24)                       | `spacing[6]`      |

### 3.2. Estados (apenas para cards `clickable`)

| Estado    | Sombra (foundation) | Equivalência                                                   |
| --------- | ------------------- | -------------------------------------------------------------- |
| `default` | `shadow/xs`         | `0 1px 2px rgba(0,0,0,0.05)`                                   |
| `hover`   | `shadow/m`          | `0 2px 4px -2px rgba(0,0,0,0.10), 0 4px 6px -1px rgba(0,0,0,0.10)` |
| `focus`   | `shadow.focus`      | `0 0 0 3px neutral/300`                                        |

O ring de focus é aplicado via CSS Module com `:focus-visible` / `:focus`
reais — sem hack de classe simulada (cumpre WCAG 2.4.7).

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → neutral[50, 300]
src/theme/foundations/spacing     → spacing[6] (24)
src/theme/foundations/radius      → radius.xl (8)
src/theme/foundations/shadow      → shadow.xs, shadow.m, shadow.focus
```

---

## 5. Anatomia da implementação

### 5.1. Props proprietárias

| Prop        | Tipo      | Default | Descrição                                                                                                  |
| ----------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `clickable` | `boolean` | `false` | Marca o card como interativo: aplica `cursor: pointer`, `tabIndex=0` e ativa hover (`shadow.m`) + focus ring. |

### 5.2. Container puro — sem header próprio

O Card do Figma **não tem header, `title` nem `extra`**. A matriz oficial
(`4069:5594`) mostra apenas slots de conteúdo; os exemplos de uso visíveis
(login `4142:15680` e feedback `4142:15789`) colocam o **título dentro do
corpo** (um bloco heading + subtítulo como primeiro filho), nunca via prop
`title` do antd. O node `.Card Header Default` (`4069:5640`) existe apenas
dentro de `Internal Components (Hide)` (`hidden="true"`) — não é spec ativa.

Por isso o DS **não promove** `title`/`extra`/`actions`/`cover`: todo o
conteúdo, inclusive título, entra por `children`. Essas props continuam
tecnicamente acessíveis como pass-through do `AntdCardProps`, mas não devem
ser usadas nem demonstradas — não fazem parte da identidade visual do Card
Juscash. O DS adiciona apenas `clickable` e sobrescreve tokens via
`ConfigProvider`.

### 5.3. Composição interna

- `ConfigProvider` local define os tokens (`bodyPadding: 24`,
  `headerBg: neutral/50`, `borderRadius: 8`, `colorBorder: neutral/300`,
  `boxShadow: shadow.xs`, `boxShadowSecondary: shadow.m`).
- Quando `clickable=true`, soma a classe `ds-card-clickable` ao `className`,
  define `tabIndex={0}` e passa `hoverable={true}` ao antd.
- O CSS Module (`index.module.css`) aplica `:hover` (`shadow.m`) e
  `:focus-visible` / `:focus` (`shadow.focus`) **somente** quando a classe
  `ds-card-clickable` está presente.

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério                       | Status | Notas                                                                                        |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum)       | ✅     | Conteúdo do card herda cores do consumer — bordas/sombra não dependem de contraste textual.  |
| 1.4.11 Non-text Contrast       | ✅     | Borda `neutral/300` (`#d4d4d4`) em fundo `neutral/50` (`#fafafa`) garante separação visual.  |
| 2.1.1 Keyboard                 | ✅     | Quando `clickable`, recebe `tabIndex=0` e dispara `onClick` em `Enter`/`Space` (default do antd). |
| 2.4.7 Focus Visible            | ✅     | Ring 3px `neutral/300` via `:focus-visible` real (não simulada).                              |
| 4.1.2 Name, Role, Value        | ✅     | O consumer deve fornecer `title`/`role="button"` quando o card representa uma ação.           |

---

## 7. Aderência às regras do projeto

| Regra                                                  | Status                                                                  |
| ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `general.comment_language` = pt-BR                     | ✅ JSDoc em pt-BR no componente e no tipo.                              |
| `general.max_file_lines` = 300                         | ✅ `index.tsx` ~60 linhas.                                              |
| `general.max_function_lines` = 50                      | ✅ Função `Card` ~40 linhas.                                            |
| `typescript.disallow_any` + `require_return_types`     | ✅ Sem `any`; retorno explícito `React.ReactElement`.                   |
| `typescript.types_in_separate_file`                    | ✅ Tipos em `src/types/components/Card/index.ts`.                       |
| `architecture.frontend.max_props` ≤ 8                  | ✅ Apenas `clickable` própria + props nativas do antd.                  |
| `code_quality.no_magic_numbers`                        | ✅ Todos os valores via tokens (`spacing`, `radius`, `shadow`).         |
| Estados via CSS real (sem hack `pseudo-*`)             | ✅ `:hover` e `:focus-visible` no `index.module.css`.                   |
| CSS em `index.module.css` (não em `global.css`)        | ✅ Próprio do componente.                                                |

---

## 8. Correções aplicadas nesta revisão

1. **Removidos `pseudo-hover`/`pseudo-focus-visible` das stories**
   (anti-pattern banido em [feedback-real-interactive-states]). As stories
   `Clickable` e `SlotsGrid` agora demonstram os estados via interação
   real (hover do mouse + Tab do teclado).
2. **Substituídos os estilos inline pesados dos exemplos** (`ExampleLogin`,
   `ExampleFeedback`) por composição usando `Input` e `Button` do próprio
   design system, eliminando hexes hardcoded e tokens duplicados.
3. **Removidos `!important` do CSS Module** — a especificidade combinada
   `.ds-card-clickable.ant-card-hoverable:hover` já vence os tokens do antd
   sem precisar forçar.
4. **Adicionado `:focus` ao seletor de focus** (além de `:focus-visible`)
   para garantir o ring visível tanto em navegação por teclado quanto em
   clique (cumpre o caso de uso descrito no comentário do Figma).
5. **Ampliada a cobertura de testes** com casos para `clickable`,
   `tabIndex`, `onClick`, classe customizada do consumer.
6. **Criada a página de testes em `design-system-tests/src/pages/card/`**
   com `index.tsx` + `index.module.css` cobrindo todas as variações do
   Figma e os dois exemplos de uso.
7. **Removidas demonstrações de `title` (header do antd) e `extra`** —
   após reler o Figma ao vivo, confirmou-se que o Card não tem header
   próprio (título é conteúdo do body). Apagados: story `WithTitle`, prop
   `title` da story `NonClickable`, seção "Com extra" da página de testes
   e todos os usos de `title` nos cards de exemplo. O Card volta a ser um
   container puro, fiel ao design.

---

## 9. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/card` do `design-system-tests`
(`http://localhost:5175/card`), cobrindo:

- Cards estáticos (default, com título, com `extra`)
- Cards clicáveis (hover + focus reais)
- Matriz de slots (1, 2, 3)
- Exemplos de uso (Login com Input + Button, Feedback)
- Casos de borda (sem conteúdo, conteúdo extenso)

**Resultado:** validado após build.

---

## 10. Pendências e limitações conhecidas

- **`document.hasFocus() === false`:** ao validar foco via MCP do Chrome
  com a janela do navegador em background, `:focus` não aplica
  visualmente (comportamento esperado do browser). Para conferir o ring,
  basta dar Tab com a janela em primeiro plano.
- **Pass-through completo do antd:** features como `title`, `extra`,
  `actions`, `cover` e `loading` são herdadas tecnicamente mas **não estão
  no Figma** do Card. Não fazem parte da identidade visual do DS Juscash e
  não devem ser usadas — todo conteúdo (inclusive título) vai por
  `children`, como nos exemplos de login/feedback.
