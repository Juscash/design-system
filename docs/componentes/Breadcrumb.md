# Breadcrumb — Parecer técnico

> Documento de referência do componente `Breadcrumb` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Breadcrumb (4080:20126)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20126)
- **Arquivo no repo:** `src/components/Breadcrumb/index.tsx`
- **Tipos:** `src/types/components/Breadcrumb/index.ts`
- **CSS Module:** `src/components/Breadcrumb/index.module.css`
- **Stories:** `src/components/Breadcrumb/Breadcrumb.stories.tsx`
- **Testes:** `src/components/Breadcrumb/Breadcrumb.test.tsx`
- **Página de testes:** `design-system-tests/src/pages/breadcrumb/index.tsx`

---

## 1. Contexto e finalidade

O `Breadcrumb` é o componente de **navegação hierárquica** — exibe a trilha
"Home > Categoria > Item atual". Wrapper sobre o `Breadcrumb` do Ant Design
com a identidade visual do Juscash (`text/soft` para links, `text/dark` Bold
para o item atual, separador `ChevronRight` 16px).

---

## 2. Anatomia (Figma)

O nó raiz `4080:20126` contém um component set com:

| Variante                       | Node id      | Conteúdo                                   |
| ------------------------------ | ------------ | ------------------------------------------ |
| `breadcrumb itens` (sub-comp.) | `6118:8778`  | 4 estados × 2 types = 8 símbolos           |
| `Breadcrumb` (instance)        | `4080:20394` | `Home > ... > Components > **Breadcrumb**` |

### 2.1. Matriz `breadcrumb itens`

| Eixo     | Valores                                                |
| -------- | ------------------------------------------------------ |
| `states` | `default` · `hover` · `focus` · `selected`             |
| `type`   | `default` (texto) · `ellipsis` (ícone Lucide Ellipsis) |

### 2.2. Container

Estrutura confirmada via `get_design_context` em `4080:20394`:

```tsx
<div className="flex gap-[8px] h-[36px] items-center min-h-[36px] px-[12px]">
  <Item>Home</Item>
  <ChevronRight size={16} />
  <Ellipsis size={16} />
  <ChevronRight size={16} />
  <Item>Components</Item>
  <ChevronRight size={16} />
  <Item bold>Breadcrumb</Item>
</div>
```

---

## 3. Tokens extraídos do Figma

### 3.1. Container

| Token           | Valor            | Foundation   |
| --------------- | ---------------- | ------------ |
| Padding inline  | 12 (`spacing/3`) | `spacing[3]` |
| Gap entre itens | 8 (`spacing/2`)  | `spacing[2]` |
| Min height      | 36               | —            |

### 3.2. Item (`type=default`)

| Estado     | Color                 | Background             | Outras                                                              |
| ---------- | --------------------- | ---------------------- | ------------------------------------------------------------------- |
| `default`  | `text/soft` (#6d6d6e) | —                      | 13px Inter Regular, line-height 1.2                                 |
| `hover`    | `text/dark` (#262626) | —                      | + `text-decoration: underline`                                      |
| `focus`    | `text/soft`           | `neutral/50` (#fafafa) | + `border-radius: radius/md` (4) + `shadow.focus` (3px neutral/300) |
| `selected` | `text/dark`           | —                      | 13px Inter **Bold** (item atual)                                    |

### 3.3. Item (`type=ellipsis`)

Mesmos estados do tipo default, mas renderiza o ícone `Ellipsis` 16x16
(Lucide). Ao clicar, abre `menu/combobox` com os itens colapsados (segundo
`6903:8830` no Figma).

### 3.4. Separador

| Token | Valor                       | Foundation                     |
| ----- | --------------------------- | ------------------------------ |
| Ícone | Lucide `ChevronRight` 16x16 | —                              |
| Cor   | `text/soft` (#6d6d6e)       | `designSystemColors.text.soft` |

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.text.soft, text.dark
                                    designSystemColors.neutral[50, 300]
src/theme/foundations/spacing     → spacing[1] (4), spacing[2] (8), spacing[3] (12)
src/theme/foundations/radius      → radius.md (4)
src/theme/foundations/shadow      → shadow.focus
src/theme/foundations/typography  → body2 (13)
```

---

## 5. Anatomia da implementação

### 5.1. Props

Estende `AntdBreadcrumbProps` (sem `separator` — que é fixo no DS).

| Prop        | Tipo                   | Default | Descrição                                                            |
| ----------- | ---------------------- | ------- | -------------------------------------------------------------------- |
| `items`     | `BreadcrumbItemType[]` | —       | Lista de itens. O último recebe automaticamente o estilo "selected". |
| `className` | `string`               | —       | Classe extra mesclada ao container.                                  |
| `…`         | (demais props do Antd) | —       | Pass-through (params, itemRender, etc.).                             |

> **Decisão:** o separador é **fixo** no design system (`ChevronRight` 16px).
> Permitir customizar quebraria a identidade visual — quem precisa de outro
> separador deve usar o `Breadcrumb` do Antd direto.

### 5.2. Estados (CSS)

| Estado     | Implementação no CSS Module                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `default`  | cor `text/soft`                                                                                          |
| `hover`    | `:hover` aplica `text/dark` + `text-decoration: underline`                                               |
| `focus`    | `:focus-visible` aplica bg `neutral/50` + outline `shadow.focus`                                         |
| `selected` | Classe `.juscash-breadcrumb__item--current` (Bold + text/dark) — aplicada pelo componente ao último item |

---

## 6. Responsividade

O Breadcrumb é **fluido por padrão** — ocupa o espaço natural do container.
Não há media query interna. Quando a trilha for muito longa em telas
pequenas:

- O consumer pode usar o **ellipsis** (truncar via `items.length > N` + item
  customizado com `Ellipsis` + dropdown) — o Figma documenta esse padrão
  mas o componente deixa para o consumer.
- Recomendado: limitar a no máximo 4–5 itens visíveis em mobile.

---

## 7. Acessibilidade (WCAG 2.1 AA)

| Critério                     | Status | Notas                                                                                  |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------- |
| 1.3.1 Info and Relationships | ✅     | Antd Breadcrumb usa `<nav aria-label>` + `<ol>` por padrão.                            |
| 1.4.3 Contrast (Minimum)     | ✅     | `text/soft #6d6d6e` em `#fafafa` ratio 5.7:1. `text/dark #262626` em `#fafafa` 16.8:1. |
| 1.4.11 Non-text Contrast     | ✅     | Separador `ChevronRight` (16px) tem ratio adequado.                                    |
| 2.1.1 Keyboard               | ✅     | Links recebem foco via `Tab`; ellipsis pode ser botão acessível.                       |
| 2.4.7 Focus Visible          | ✅     | `:focus-visible` aplica outline 3px (`shadow.focus`).                                  |
| 2.5.5 Target Size            | ✅     | Container 36px de altura — suficiente para toque.                                      |
| 4.1.2 Name, Role, Value      | ✅     | Links `<a>` herdam role nativo; ícones com `aria-hidden`.                              |

---

## 8. Aderência às regras

| Regra                                              | Status                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| `general.comment_language` = pt-BR                 | ✅ JSDoc em pt-BR.                                                |
| `general.max_file_lines` = 300                     | ✅ index.tsx ~70 linhas.                                          |
| `general.max_function_lines` = 50                  | ✅ função única ~50 linhas.                                       |
| `typescript.disallow_any` + `require_return_types` | ✅ sem `any`; tipos de retorno explícitos.                        |
| `typescript.types_in_separate_file`                | ✅ tipos em `src/types/components/Breadcrumb/index.ts`.           |
| Sem CSS global novo                                | ✅ `index.module.css` na pasta do componente.                     |
| Sem `style` inline                                 | ✅ Removido `style={{ fontWeight: 700 }}` — agora via classe CSS. |

---

## 9. Divergências corrigidas

| #   | Gap                                                                        | Estado                                                              |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | Sem `padding: 0 12px` no container — Figma especifica padding inline 12px. | ✅ corrigido                                                        |
| 2   | Sem `min-height: 36px` no container.                                       | ✅ corrigido                                                        |
| 3   | Negrito do item atual aplicado via `style` inline (`fontWeight: 700`).     | ✅ migrado para CSS Module via `.juscash-breadcrumb__item--current` |
| 4   | Sem estado `focus` visível distinto (apenas hover).                        | ✅ adicionado bg + outline focus                                    |
| 5   | Hover sem underline.                                                       | ✅ adicionado `text-decoration: underline`                          |

---

## 10. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/breadcrumb` do `design-system-tests`
(`http://localhost:5175/breadcrumb`), cobrindo: exemplo do Figma (com
ellipsis), default texto simples, com links, 2 itens (mínimo), 5 itens
(caminho profundo) e casos de borda (textos longos, único item).

**Resultado:** `{ violations: 0, items: [] }` — 0 violações WCAG 2.1 AA.

### Tokens validados em runtime

| Token Figma     | Esperado     | Renderizado       | Status |
| --------------- | ------------ | ----------------- | ------ |
| Padding         | `0 12px`     | `0px 12px`        | ✅     |
| Min height      | `36px`       | `36px`            | ✅     |
| Font size       | `13px`       | `13px`            | ✅     |
| Item atual peso | `Bold (700)` | `700`             | ✅     |
| Item atual cor  | `#262626`    | `rgb(38, 38, 38)` | ✅     |
