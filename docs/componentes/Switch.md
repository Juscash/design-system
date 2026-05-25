# Switch — Parecer técnico

> Documento de referência da análise do componente `Switch` do Design
> System Juscash.

- **Card Jira:** [JS-2395](https://juscash.atlassian.net/browse/JS-2395)
- **Figma — página Componentes:** [`Switch (4062:5352)`](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-5352)
- **Arquivo no repo:** `src/components/Switch/index.tsx`
- **Tipos:** `src/types/components/Switch/index.ts`
- **CSS Module:** `src/components/Switch/index.module.css`
- **Stories:** `src/components/Switch/Switch.stories.tsx`
- **Testes:** `src/components/Switch/Switch.test.tsx`

---

## 1. Contexto e finalidade

O `Switch` é o controle **binário com toggle visual** (on/off) — alternativa
ao Checkbox quando o estado tem **efeito imediato** ao alternar (ex.:
"ativar notificações", "modo escuro"). Embrulha o `Switch` do Ant Design 6
com tokens proprietários e adiciona a prop `error` para validação visual.

`RichSwitch` (em `src/components/RichSwitch`) é a variação card com label
e texto secundário — coberto em parecer próprio.

---

## 2. Anatomia (Figma)

| Component set       | Node id     | Conteúdo                                                                             | Dimensões |
| ------------------- | ----------- | ------------------------------------------------------------------------------------ | --------- |
| `switch`            | `4062:5487` | Track 33×18 — estados × checked                                                      | 162×526   |
| `switch group`      | `4062:5415` | Switch + label `body/02 - 13px` — `layout=inline` (75×24) ou `layout=list` (240×144) | 288×264   |
| `rich switch group` | `4062:5434` | Card com label + texto secundário                                                    | 288×184   |

> **Importante:** o Figma **não define** a variante `checkedChildren` /
> `unCheckedChildren` (texto interno ao track). Essa é uma prop nativa do
> Antd que **herdamos**, mas que **não faz parte da especificação JusCash**.
> Use com cautela — quando usada, o texto interno fica branco sobre o track
> claro e o contraste cai. O `index.module.css` força texto escuro nos
> inner labels quando o track está unchecked para mitigar.

### Matriz do `switch`

- **2 estados de `checked?`** — `false` · `true`
- **8 modos de `state`** — `default` · `hover` · `focus` · `disabled` + `error default` · `error hover` · `error focus` · `error disabled`

Total de **16 símbolos**.

### Dimensões do switch

| Token           | Valor                                                                |
| --------------- | -------------------------------------------------------------------- |
| Track largura   | 33px                                                                 |
| Track altura    | 18px                                                                 |
| Track radius    | `radius.2xl` (12) — completamente arredondado por causa da altura 18 |
| Handle (bola)   | ~14×14 (track - padding 2px × 2)                                     |
| Padding interno | 2px                                                                  |

> **Nota importante:** o código atual usa `TRACK_HEIGHT=24`, `TRACK_MIN_WIDTH=44`, `HANDLE_SIZE=20`
> — **muito maior** que o Figma (18/33/14). Será corrigido.

### Cores por estado × checked

| State / Checked    | Track BG                          | Handle BG    | Focus shadow            |
| ------------------ | --------------------------------- | ------------ | ----------------------- |
| default unchecked  | `neutral.200` (#e5e5e5)           | `neutral.50` | —                       |
| default checked    | `button.brand.default` (#008633)  | `neutral.50` | —                       |
| hover unchecked    | `neutral.200`                     | `neutral.50` | —                       |
| hover checked      | `button.brand.default`            | `neutral.50` | —                       |
| focus unchecked    | `neutral.200`                     | `neutral.50` | `0 0 0 3px neutral.300` |
| focus checked      | `button.brand.default`            | `neutral.50` | `0 0 0 3px neutral.300` |
| disabled unchecked | `button.brand.disabled` (#d4d4d4) | `neutral.50` | —                       |
| disabled checked   | `button.brand.disabled` (#d4d4d4) | `neutral.50` | —                       |
| error unchecked    | `neutral.200`                     | `neutral.50` | —                       |
| error checked      | `feedback.red.500` (#d2190b)      | `neutral.50` | —                       |

---

## 3. Foundations consumidos

```
src/theme/foundations/colors      → designSystemColors.brand.primary.[600]
                                    designSystemColors.neutral.[50, 200, 300]
                                    designSystemColors.feedback.red.[500]
                                    designSystemColors.border.{regular, disabled}
src/theme/foundations/spacing     → spacing[1] (4px)
src/theme/foundations/shadow      → shadow.xs (handle), shadow.focus
```

---

## 4. Gaps e divergências

| #   | Gap                                                                                                                  | Severidade | Onde                                    |
| --- | -------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------- |
| 1   | **Dimensões erradas**: `TRACK_HEIGHT=24`, `TRACK_MIN_WIDTH=44`, `HANDLE_SIZE=20` — Figma define 18/33/14.            | error      | `index.tsx:7-13`                        |
| 2   | **Sem classe `ds-switch`** no wrapper — overrides em `global.css` (`.ant-switch.pseudo-focus-visible`) não scopados. | warning    | `index.tsx`, `theme/global.css:489-491` |
| 3   | **`colorPrimaryHover: brand.primary.700`** — Figma mantém **mesma cor** em hover.                                    | warning    | `index.tsx:33`                          |
| 4   | **`errorTokenOverrides.colorPrimaryHover: red.900`** — mesma coisa, hover não muda no Figma.                         | warning    | `index.tsx:42`                          |
| 5   | **`colorBorder`/`colorBgContainer`/`colorText`** definidos mas não usados pelo Switch — ruído.                       | info       | `index.tsx:35-37, 44-46`                |
| 6   | **Cobertura mínima** (2 testes): faltam checked, loading, error, onChange, controlled.                               | warning    | `Switch.test.tsx`                       |
| 7   | **Override `.ant-switch.pseudo-focus-visible` em `global.css`** deve ir para module.css scoped via `.ds-switch`.     | info       | `theme/global.css:489-491`              |

---

## 5. Acessibilidade

| Critério                 | Status | Notas                                                                                       |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum) | ✅     | Texto branco sobre verde #008633 ratio 4.65:1. Handle sobre track (#fafafa em #008633) bom. |
| 2.1.1 Keyboard           | ✅     | `Space`/`Enter` alterna — nativo do Antd.                                                   |
| 2.4.7 Focus Visible      | ✅     | Outline 3px `neutral.300`.                                                                  |
| 2.5.5 Target Size        | ⚠️     | 33×18 abaixo de 24×24 (AA). Mitigado por área clicável + uso típico com label adjacente.    |
| 4.1.2 Name, Role, Value  | ✅     | `role="switch"` nativo do Antd. `aria-checked` refletindo estado.                           |

---

## 6. Plano de correção aplicado

1. Corrigir dimensões: 33×18 track, 14 handle, 2 padding.
2. Adicionar `BASE_CLASS = "ds-switch"` no wrapper.
3. Mover override `.ant-switch.pseudo-focus-visible` para `index.module.css` scoped.
4. Hover/active = mesma cor (sem mudança).
5. Remover tokens órfãos (`colorBorder`, etc. não usados).
6. Expandir testes para cobrir checked, loading, error, onChange, ds-switch class.
7. Criar página `/switch` em design-system-tests.

---

## 7. Validação WCAG (resultado)

Execução via Chrome MCP + axe-core 4.10.2 na página `/switch` do
design-system-tests (32 instâncias renderizadas).

### Issues corrigidos durante a validação

1. **`button-name`** (22 nodes) — switches sem accessible name. Resolução:
   adicionar `aria-label` em todos os switches da test page. Documentado no
   parecer como melhor prática para o consumer.
2. **`color-contrast`** (3 nodes) — texto branco dos inner labels
   (`checkedChildren` / `unCheckedChildren`) sobre track unchecked `#e5e5e5`
   tinha ratio 1.83. Resolução: forçar texto `neutral.700` (#404040) sobre
   o track unchecked via `index.module.css`, mantendo branco quando o track
   é colorido (verde/vermelho passam contraste).

### Resultado final

| Métrica                            | Resultado      |
| ---------------------------------- | -------------- |
| Violações WCAG                     | **0**          |
| Regras passadas                    | 18             |
| Testes unitários                   | 11/11 passaram |
| Switches renderizados na test page | 32             |

### Validação dimensional (Figma → runtime)

| Token                | Figma                            | Computed             | Status |
| -------------------- | -------------------------------- | -------------------- | ------ |
| Track default        | 33×18                            | 33×18                | ✅     |
| Track small          | ~26×14                           | 26×14                | ✅     |
| BG unchecked default | `neutral.200` (#e5e5e5)          | `rgb(229, 229, 229)` | ✅     |
| BG checked default   | `button.brand.default` (#008633) | `rgb(0, 134, 51)`    | ✅     |
| BG checked + error   | `feedback.red.500` (#d2190b)     | `rgb(210, 25, 11)`   | ✅     |
| Click toggle         | -                                | works ✅             | ✅     |
