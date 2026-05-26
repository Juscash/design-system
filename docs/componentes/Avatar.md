# Avatar — Parecer técnico

> Documento de referência do componente `Avatar` do Design System Juscash.
> Decisões visuais validadas no Figma via MCP (`get_metadata` +
> `get_variable_defs` + `get_design_context`).

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Avatar (4080:9746)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-9746)
- **Arquivo no repo:** `src/components/Avatar/index.tsx`
- **Tipos:** `src/types/components/Avatar/index.ts`
- **CSS Module:** `src/components/Avatar/index.module.css`
- **Stories:** `src/components/Avatar/Avatar.stories.tsx`
- **Testes:** `src/components/Avatar/Avatar.test.tsx`
- **Página de testes:** `design-system-tests/src/pages/avatar/index.tsx`

---

## 1. Contexto e finalidade

O `Avatar` exibe identidade visual de uma pessoa ou entidade. Suporta 3
tipos de conteúdo (iniciais, ícone, imagem), 2 tamanhos (`small` 32px,
`regular` 40px) e 2 formas (`round` círculo, `roundrect` retângulo
arredondado).

Variante adicional: **`avatarMenu`** — renderiza o avatar como botão com
`ChevronDown` ao lado, controlando um dropdown via callback. Útil para
menus de usuário no header.

---

## 2. Anatomia (Figma)

### 2.1. Matriz `avatar` (4146:14271)

3 fill × 2 size × 2 roundness = **12 símbolos**.

| Eixo        | Valores                                  |
| ----------- | ---------------------------------------- |
| `fill`      | `initials` · `icon` · `picture`          |
| `size`      | `regular` (40px) · `small` (32px)        |
| `roundness` | `round` (círculo) · `roundrect` (radius xl) |

### 2.2. Avatar Menu (`4146:14349`)

Variante "menu" — avatar 32px + ChevronDown 16px. 3 estados visuais:

| State     | Visual                                                              |
| --------- | ------------------------------------------------------------------- |
| `default` | avatar + chevron                                                    |
| `focus`   | + bg `neutral/50` + radius `full` + outline 3px `neutral/300`       |
| `active`  | (igual default visualmente; semântica = aberto)                     |

### 2.3. Avatar Stack (`4051:1932`)

Agrupamento de múltiplos avatares com sobreposição. 2 tamanhos: `small`
(80×32, ~3 avatares) e `regular` (104×40, ~3 avatares).

Mapeado para `AvatarGroup` (re-export do `Antd.Avatar.Group`).

---

## 3. Tokens extraídos do Figma

### 3.1. Container

| Token              | small             | regular           | Foundation                          |
| ------------------ | ----------------- | ----------------- | ----------------------------------- |
| Dimensão           | 32 × 32           | 40 × 40           | —                                   |
| Border             | 1px `neutral/50`  | 1px `neutral/50`  | `designSystemColors.neutral[50]`    |
| Background         | `neutral/200`     | `neutral/200`     | `designSystemColors.neutral[200]`   |
| Border radius (round)     | `50%`      | `50%`             | —                                   |
| Border radius (roundrect) | `8px`      | `8px`             | `radius.xl`                         |

### 3.2. Texto (iniciais)

| Token              | Valor                       | Foundation                          |
| ------------------ | --------------------------- | ----------------------------------- |
| Font family        | Inter Bold                  | `typography.fontFamily`             |
| **Font size**      | **13** (igual em ambos)     | `typography.scale.body2`            |
| Color              | `text/dark` (#262626)       | `designSystemColors.text.dark`      |
| Line height        | 1.2                         | `typography.lineHeight`             |

> **Atenção:** o Figma usa **13px em ambos os tamanhos** (não 12/14 como
> a implementação anterior). Corrigido.

### 3.3. Avatar menu

| Token              | Valor                       | Foundation                          |
| ------------------ | --------------------------- | ----------------------------------- |
| Gap avatar↔chevron | 4 (`spacing/1`)             | `spacing[1]`                        |
| Chevron            | Lucide `ChevronDown` 16px   | —                                   |
| Chevron color      | `text/dark`                 | `designSystemColors.text.dark`      |
| Focus background   | `neutral/50`                | `designSystemColors.neutral[50]`    |
| Focus radius       | `full` (9999)               | `radius.full`                       |
| Focus outline      | 3px `neutral/300`           | `shadow.focus`                      |

---

## 4. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.neutral[50, 200, 300, 800]
                                    designSystemColors.text.dark
src/theme/foundations/spacing     → spacing[1] (4)
src/theme/foundations/radius      → radius.xl (8), radius.full (9999)
src/theme/foundations/shadow      → shadow.focus
src/theme/foundations/typography  → body2 (13)
```

---

## 5. API do componente

### 5.1. Props proprietárias

| Prop                | Tipo                                | Default     | Descrição                                                              |
| ------------------- | ----------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `dsSize`            | `"small" \| "regular"`              | `"regular"` | Tamanho do avatar (32 ou 40 px).                                       |
| `roundness`         | `"round" \| "roundrect"`            | `"round"`   | Forma — círculo ou retângulo arredondado (8 px).                       |
| `avatarMenu`        | `boolean`                           | `false`     | Renderiza como botão com `ChevronDown` ao lado (variante menu).        |
| `menuOpen`          | `boolean`                           | —           | Estado controlado do menu (opcional). Quando informado, controlled.    |
| `onMenuOpenChange`  | `(open: boolean) => void`           | —           | Callback chamado quando o usuário clica/teclado no avatar-menu.        |
| `…`                 | (demais props do Antd)              | —           | Pass-through: `src`, `alt`, `icon`, `children`, etc.                   |

> Quando `avatarMenu === true`, o tamanho é fixado em `small` conforme o
> Figma (avatar menu sempre 32×32).

### 5.2. Tipos de conteúdo

- **Iniciais**: passe via `children` (ex.: `<Avatar>CN</Avatar>`).
- **Ícone**: passe via prop `icon` (ex.: `<Avatar icon={<User />} />`).
- **Imagem**: passe `src` (ex.: `<Avatar src="https://…/img.png" />`).

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério                       | Status   | Notas                                                                 |
| ------------------------------ | -------- | --------------------------------------------------------------------- |
| 1.1.1 Non-text Content         | ✅       | Imagens recebem `alt` via prop; iniciais são texto real.              |
| 1.3.1 Info and Relationships   | ✅       | Avatar menu tem `role="button"`, `aria-expanded`, `aria-haspopup`.    |
| 1.4.3 Contrast (Minimum)       | ✅       | Texto #262626 sobre #e5e5e5 = 9.6:1.                                  |
| 1.4.11 Non-text Contrast       | ⚠️       | Border 1px `neutral/50` sobre `neutral/200` é muito sutil.            |
| 2.1.1 Keyboard                 | ✅       | Avatar menu é `<button>` — recebe Tab e ativa com Enter/Space.        |
| 2.4.7 Focus Visible            | ✅       | `:focus-visible` aplica shadow.focus (3px neutral/300).               |
| 4.1.2 Name, Role, Value        | ✅       | Quando menu, expõe `aria-expanded` + `aria-haspopup="menu"`.          |

---

## 7. Divergências corrigidas

| #  | Gap                                                                                    | Estado     |
| -- | -------------------------------------------------------------------------------------- | ---------- |
| 1  | Font size 12 (small) / 14 (regular) — Figma define **13** em ambos.                    | ✅ corrigido |
| 2  | Border 1px `neutral/100` (#f5f5f5) — Figma usa `neutral/50` (#fafafa).                 | ✅ corrigido |
| 3  | Variante `avatarMenu` (com `ChevronDown` + estado open/close) ausente.                 | ✅ adicionada |
| 4  | Sem `index.module.css` na pasta — estilos do menu vão para CSS Module scoped.          | ✅ criado |

---

## 8. Aderência às regras

| Regra                                                | Status                                                                  |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| `general.comment_language` = pt-BR                   | ✅ JSDoc em pt-BR.                                                      |
| `general.max_file_lines` = 300                       | ✅ index.tsx ~140 linhas.                                               |
| `general.max_function_lines` = 50                    | ✅ funções helpers extraídas.                                            |
| `typescript.disallow_any` + `require_return_types`   | ✅ sem `any`; tipos de retorno explícitos.                              |
| `typescript.types_in_separate_file`                  | ✅ tipos em `src/types/components/Avatar/index.ts`.                     |
| `architecture.max_props` = 8                         | ✅ 5 props proprietárias + pass-through.                                 |
| Sem CSS global novo                                  | ✅ CSS Module local.                                                    |

---

## 9. Validação WCAG (resultado)

Executado via axe-core 4.10.2 na página `/avatar` do `design-system-tests`
(`http://localhost:5175/avatar`), cobrindo: matriz 3×2×2 (12 combinações),
avatar menu controlled/uncontrolled, iniciais (1/2/3 letras), imagens reais,
casos de borda (imagem quebrada, vazio).

**Resultado final:** `{ violations: 0, items: [] }` — 0 violações WCAG 2.1 AA.

### Correções aplicadas durante a validação

1. **`button-name`** (1 violação inicial): botão `ds-avatar-menu` sem nome
   acessível quando o conteúdo era só imagem/ícone.
   - **Solução:** `aria-label` automático com fallback em cascata:
     1. `aria-label` explicitamente passado pelo consumer;
     2. `alt` da imagem (`src` com alt);
     3. iniciais quando `children` é string;
     4. fallback genérico `"Menu do usuário"`.
