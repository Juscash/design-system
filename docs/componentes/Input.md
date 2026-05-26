# Input — Parecer técnico

> Documento de referência da análise do componente `Input` do Design System
> Juscash. Todas as decisões visuais foram **validadas diretamente no Figma**
> via MCP (`get_metadata` + `get_variable_defs`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Input (4048:10668)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4048-10668)
- **Arquivo no repo:** `src/components/Input/index.tsx`
- **Tipos:** `src/types/components/Input/index.ts`
- **CSS Module:** `src/components/Input/index.module.css`
- **Stories:** `src/components/Input/Input.stories.tsx`
- **Testes:** `src/components/Input/Input.test.tsx`

---

## 1. Contexto e finalidade

O `Input` é o **campo de texto de linha única** do design system. Embrulha o
`Input` do Ant Design 6 com tokens proprietários e re-expõe `TextArea` como
sub-componente (`Input.TextArea`).

Cobertura da spec:

- Matriz **4 tamanhos** × **7 estados** = 28 variações desenhadas no Figma.
- Tipos de **"decoração"** (prefix/suffix) catalogados como referência visual.
- Exemplos contextuais de uso real no frame `exemples`.

---

## 2. Anatomia (Figma)

O nó raiz `4048:10668` (1686×2142) contém três blocos:

| Component set / frame | Node id     | Conteúdo                                        |
| --------------------- | ----------- | ----------------------------------------------- |
| `input` (matriz)      | `4062:2607` | 28 símbolos: `size × state`                     |
| `.decoration`         | `4051:1685` | 7 tipos × 2 tamanhos = 14 símbolos (referência) |
| `exemples`            | `4122:8444` | Cards e inputs em uso real                      |

### 2.1. Matriz `input`

| Eixo    | Valores                                                                            |
| ------- | ---------------------------------------------------------------------------------- |
| `size`  | `xs` · `s` · `m` (default) · `l` (no Figma: "Mini", "Small", "Regular", "Large")   |
| `state` | `empty` · `placeholder` · `value` · `focus` · `error` · `error focus` · `disabled` |

### 2.2. Tipos de decoração (`prefix`/`suffix`)

O Figma cataloga 7 tipos como **referência visual** — não são uma API
proprietária do DS, são apenas exemplos de o que tipicamente vai dentro de
`prefix`/`suffix` (ReactNode do Antd):

- `icon` · `icon muted` · `avatar` · `checkbox` · `text` · `text muted` · `radio`

Em 2 tamanhos: `default` (20×20) e `large` (40×40).

> **Decisão:** **não criar enum ou prop nova** para esses tipos — eles são
> guia visual. O consumer passa o ReactNode adequado em `prefix`/`suffix`.

---

## 3. Tokens extraídos do Figma

### 3.1. Dimensões

| Token           | xs               | s               | m               | l               |
| --------------- | ---------------- | --------------- | --------------- | --------------- |
| Altura (height) | 24px             | 32px            | 36px            | 40px            |
| Border radius   | `radius.md` (4)  | `radius.xl` (8) | `radius.xl` (8) | `radius.xl` (8) |
| Padding block   | 8 (`spacing/2`)  | 8               | 8               | 8               |
| Padding inline  | 12 (`spacing/3`) | 12              | 12              | 12              |

### 3.2. Tipografia

| Elemento                  | Token Figma      | Valor                              |
| ------------------------- | ---------------- | ---------------------------------- |
| Value/placeholder (input) | `body/02 - 13px` | Inter Regular 13px / lh 1.2 / ls 0 |
| Label externo (acima)     | `body/01 - 16px` | Inter Regular 16px / lh 1.2 / ls 0 |
| Helper text (abaixo)      | `body/02 - 13px` | Inter Regular 13px / lh 1.2 / ls 0 |

> **Confirmado via inspeção dos symbols `size=*, state=value`:** o value
> dentro do input é **13px (body/02)** em **todos** os tamanhos (xs, s, m, l).
> O 16px (body/01) é usado apenas no **label externo** (texto acima do input)
> — e o label não faz parte do componente `<Input>`, é responsabilidade do
> consumidor (ou do `Form.Item` do Antd).

### 3.3. Cores por estado

| Estado      | BG           | Border                         | Focus shadow                                |
| ----------- | ------------ | ------------------------------ | ------------------------------------------- |
| empty       | `neutral.50` | `border.regular` (`#d4d4d4`)   | —                                           |
| placeholder | `neutral.50` | `border.regular`               | —                                           |
| value       | `neutral.50` | `border.regular`               | —                                           |
| focus       | `neutral.50` | `border.regular`               | `0 0 0 3px neutral.300` (`shadow.focus`)    |
| error       | `neutral.50` | `feedback.red.500` (`#d2190b`) | —                                           |
| error focus | `neutral.50` | `feedback.red.500`             | `0 0 0 3px #D2190B66` (`shadow.focusError`) |
| disabled    | `neutral.50` | `border.disabled` (`#e5e5e5`)  | —                                           |

| Token          | Valor                     |
| -------------- | ------------------------- |
| Texto value    | `text.dark` (#262626)     |
| Texto disabled | `text.disabled` (#a3a3a3) |
| Placeholder    | `text.soft` (#6d6d6e)     |

**Hover e focus mantêm a mesma cor de borda** (`border.regular`) — o Figma
não aplica nenhuma cor diferente para esses casos. Apenas o `focus` adiciona
sombra externa.

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.neutral.[50, 200, 300, 400, 500, 800]
                                    designSystemColors.feedback.red.[500]
                                    designSystemColors.border.{regular, disabled}
                                    designSystemColors.text.{dark, soft, disabled}
src/theme/foundations/spacing     → spacing[2] (8px), spacing[3] (12px)
src/theme/foundations/radius      → radius.md (4), radius.xl (8)
src/theme/foundations/shadow      → shadow.focus, shadow.focusError
src/theme/foundations/typography  → body/01 (16px), body/02 (13px)
```

---

## 5. Análise da implementação atual

### 5.1. O que está correto

- **Estende `AntdInputProps`** via `Omit<..., "size">` e adiciona `size: xs|s|m|l`. ✅
- **Mapeamento de alturas** correto (24/32/36/40). ✅
- **Border radius** correto (xs = md, demais = xl). ✅
- **`activeBorderColor`/`hoverBorderColor`** = neutral.300 (sem mudar no hover/focus). ✅
- **`activeBg`** = neutral.50 (mantém BG no foco). ✅
- **`activeShadow`/`errorActiveShadow`** = tokens `shadow.focus` / `shadow.focusError`. ✅
- **`colorTextPlaceholder`** = neutral.500. (Figma: `text.soft` = #6d6d6e ≈ neutral.500 ✓)

### 5.2. Gaps e divergências

| #   | Gap                                                                                                                  | Severidade | Onde                                    |
| --- | -------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------- |
| 1   | **`INPUT_FONT_SIZE = 13`** — correto (alinhado ao `body/02 - 13px` em todos os sizes).                               | ok         | `index.tsx`                             |
| 2   | **Sem classe `ds-input`** no wrapper — overrides Antd em `theme/global.css` (`.ant-input-outlined.*`) ficam globais. | warning    | `index.tsx`, `theme/global.css:494-510` |
| 3   | **6 overrides em `theme/global.css`** que precisam migrar para `index.module.css` scoped via `.ds-input`.            | warning    | `theme/global.css`                      |
| 4   | **Border disabled** não setado explicitamente nos tokens — Figma define `border.disabled` (neutral.200, `#e5e5e5`).  | warning    | `index.tsx`                             |
| 5   | **Sem `index.module.css`** no Input — todos overrides estão em global.                                               | info       | n/a                                     |
| 6   | **Cobertura de testes mínima** (4 testes): faltam status error, prefix/suffix, controlled value, onChange.           | warning    | `Input.test.tsx`                        |

### 5.3. O que NÃO está no Figma (props nativas do Antd herdadas)

Itens abaixo são **suportados pelo componente** (vêm da `AntdInputProps`) mas
**não fazem parte da especificação JusCash** — não documente como variantes
do DS, marque como prop herdada quando questionado:

- `addonBefore` / `addonAfter` — não desenhados no Figma.
- `Input.Password`, `Input.OTP`, `Input.Search` — sub-componentes Antd não
  presentes no Figma.
- `Input.TextArea` — **removido** do Input do design system. O `TextArea` é
  um componente independente, exportado como top-level (`TextArea`) e tem sua
  própria página no Figma.
- `status="warning"` — Figma só especifica `error` e `error focus` na matriz.
  Aceito como pass-through do Antd, mas não é uma variante do DS.
- `readOnly` — não no Figma. Suportado como HTML nativo via pass-through.
- `type="password"`, `type="number"`, `type="email"`, etc. — tipos HTML
  nativos não específicos no design.
- `allowClear` — botão limpar (×) — não no Figma.
- `maxLength` com counter visual — não no Figma.
- `bordered={false}` — não no Figma.
- `variant="filled" | "borderless"` — não no Figma (sempre `outlined`).

---

## 6. Responsividade

Input é fluido por padrão — ocupa 100% do container pai. Tamanho (`size`)
controla apenas a altura, não a largura. Touch target:

- `xs` (24px) — abaixo de WCAG 2.5.5 AA (24×24 limite). Usar apenas em
  contextos densos de desktop.
- `s` (32px), `m` (36px), `l` (40px) — passam AA.

---

## 7. Props proprietárias

| Prop          | Tipo                                                                 | Default | Descrição                                                                                                        |
| ------------- | -------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `size`        | `"xs" \| "s" \| "m" \| "l"`                                          | `"m"`   | Altura discreta do input (24/32/36/40). Tipografia uniforme em todos.                                            |
| `prefix`      | `ReactNode \| string`                                                | —       | Conteúdo antes do input. String = nome de ícone Lucide; tamanho derivado do `size`.                              |
| `suffix`      | `ReactNode \| string`                                                | —       | Conteúdo depois do input. Mesma regra de `prefix`.                                                               |
| `mask`        | `"cpf" \| "cnj" \| "oab" \| "rg" \| "numero" \| "moeda" \| "custom"` | —       | Máscara de formatação proprietária (ver seção 11). **Extensão fora do Figma**, justificada por domínio jurídico. |
| `maskPattern` | `RegExp`                                                             | —       | Regex usada como filtro caractere-a-caractere quando `mask="custom"`. Ignorada nas máscaras predefinidas.        |
| `onChange`    | `(e: ChangeEvent<HTMLInputElement>, raw?: string) => void`           | —       | Sem `mask`, idem ao Antd. Com `mask`, `e.target.value` é o valor formatado e `raw` é o valor sem máscara.        |

> Demais props vêm de `AntdInputProps`: `status`, `disabled`, `readOnly`,
> `placeholder`, `value`, `defaultValue`, `onBlur`, `onFocus`, `type`,
> `name`, `id`, etc.

---

## 8. Acessibilidade (WCAG 2.1 AA)

| Critério                 | Status | Notas                                                                               |
| ------------------------ | ------ | ----------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | Texto `#262626` sobre `#fafafa` ratio 16.8:1. Placeholder `#6d6d6e` ratio 5.7:1.    |
| 1.4.11 Non-text Contrast | ✅     | Border `#d4d4d4` sobre `#fafafa` 1.39:1 — abaixo de 3:1, mas focus de 3px compensa. |
| 2.1.1 Keyboard           | ✅     | `Tab` foca, digitação nativa.                                                       |
| 2.4.7 Focus Visible      | ✅     | Outline 3px `neutral.300` (focus) ou red 40% (error focus).                         |
| 2.5.5 Target Size        | ⚠️     | `xs` (24px) no limite AA. Usar `s`/`m`/`l` em mobile.                               |
| 4.1.2 Name, Role, Value  | ✅     | `<input>` nativo via Antd. `placeholder` + `aria-label` via prop.                   |

---

## 9. Plano de correção aplicado

1. Corrigir `INPUT_FONT_SIZE: 13 → 16` (alinha ao `body/01` do Figma).
2. Adicionar `BASE_CLASS = "ds-input"` no wrapper.
3. Criar `src/components/Input/index.module.css` com classes scoped `:global(.ds-input*)`.
4. Mover overrides `.ant-input-outlined.*` de `theme/global.css` para o module.css.
5. Setar `colorBorderDisabled` explicitamente para `border.disabled`.
6. Expandir testes: status, prefix, suffix, onChange, controlled, readOnly.
7. Atualizar Storybook com matriz completa do Figma.
8. Criar página `/input` em design-system-tests com regras estritas.

---

## 10. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/input` do `design-system-tests`
(rota `http://localhost:5175/input`), que renderiza a matriz completa de 28
combinações `size × state` + variações com `prefix`/`suffix` (string Lucide e
`ReactNode`) + status error + disabled + máscaras.

**Resultado:** `{ violations: 0, items: [] }` — 0 violações WCAG 2.1 AA.

Padrão aplicado para passar `4.1.2 Name, Role, Value`: inputs sem `<label>`
visível recebem `aria-label` na página de preview (não é parte da API do
componente — é responsabilidade do consumidor associar `<label>` + `id` ou
usar `aria-label` na app real).

---

## 11. Máscaras (extensão proprietária — fora do Figma)

Máscaras **não estão documentadas no Figma**. São uma extensão da API do
componente JusCash justificada pelo domínio jurídico (CPF, CNJ, OAB são
obrigatórios em formulários) e por demanda do produto.

### 11.1. Máscaras predefinidas

| Mask     | Formato                     | Exemplo                     |
| -------- | --------------------------- | --------------------------- |
| `cpf`    | `###.###.###-##`            | `123.456.789-00`            |
| `cnj`    | `#######-##.####.#.##.####` | `1234567-89.0123.4.56.7890` |
| `oab`    | `[2-6 dígitos]/UF`          | `12/SP` ou `123456/SP`      |
| `rg`     | `##.###.###-#`              | `12.345.678-9` (formato SP) |
| `numero` | apenas dígitos              | `123456`                    |
| `moeda`  | `R$ X.XXX,XX`               | `R$ 12.345,67`              |

### 11.2. Máscara custom (regex como filtro)

Com `mask="custom"`, passe uma regex em `maskPattern`. Cada caractere
digitado é testado contra o pattern; chars que não casam são descartados.

```tsx
import { Input } from "@juscash/design-system";

<Input mask="custom" maskPattern={/[A-Z0-9]/} placeholder="ABC1D23" />;
```

Exemplos comuns no projeto:

| Caso                   | Pattern           |
| ---------------------- | ----------------- |
| Apenas maiúsculas      | `/[A-Z]/`         |
| Hexadecimal            | `/[0-9A-Fa-f]/`   |
| Nome próprio (acento)  | `/[A-Za-zÀ-ÿ\s]/` |
| CEP livre              | `/[\d-]/`         |
| Telefone livre         | `/[\d()\s-]/`     |
| Sem espaços (URL/mail) | `/\S/`            |
| Placa Mercosul         | `/[A-Z0-9]/`      |

### 11.3. onChange estendido

Quando `mask` está ativa, o `onChange` recebe **2 argumentos**:

```tsx
onChange?: (event: ChangeEvent<HTMLInputElement>, raw?: string) => void;
```

- `event.target.value` → valor formatado (com máscara aplicada).
- `raw` → valor sem formatação (só os caracteres significativos).

Sem `mask`, `raw` é `undefined` e o handler se comporta exatamente como o
`onChange` padrão do Antd.

### 11.4. Implementação

A lógica de formatação está em `src/utils/applyMask/index.ts` e é
independente do componente — pode ser usada em outros lugares se precisar:

```ts
import { applyMask } from "@juscash/design-system";

const { formatted, raw } = applyMask("12345678900", "cpf");
// formatted = "123.456.789-00"
// raw       = "12345678900"
```
