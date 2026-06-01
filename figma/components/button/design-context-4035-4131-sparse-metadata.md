# Figma — Button (`4035:4131`) — get_design_context (completo)

> Versão completa do design-context com **todas as 180 variantes drilladas** via `get_variable_defs` no MCP figma-desktop.
>
> O nó raiz `4035:4131` retornava apenas metadata esparsa pelo `get_design_context` (excede o limite de contexto), por isso este documento agrega os tokens (cores, paddings, font, radius) extraídos node a node nas 90 variantes textuais (frame `4035:5251`) + 90 variantes icon button (frame `4040:7629`) + .spinner.

## Stack identificada

### Spacings (referenciados por id numérico no Figma)

| token | px  |
| ----- | --- |
| `1`   | 4   |
| `2`   | 8   |
| `3`   | 12  |
| `4`   | 16  |

### Por tamanho (`size`)

| size | altura | padding vertical | padding horizontal | font token          | font size | radius token | radius px |
| ---- | ------ | ---------------- | ------------------ | ------------------- | --------- | ------------ | --------- |
| m    | 36 px  | `2` = 8          | `4` = 16           | `body/02 - 13px`    | 13        | `radius/xl`  | 8         |
| s    | 32 px  | `1` = 4          | `3` = 12           | `body/02 - 13px`    | 13        | `radius/xl`  | 8         |
| xs   | 24 px  | `1` = 4          | `2` = 8            | `caption/01 - 10px` | 10        | `radius/md`  | 4         |

> Atenção: o **xs** quebra o padrão visual — usa tipografia `caption/01` (10 px) e radius `md` (4 px) em vez de `body/02` (13 px) e `radius/xl` (8 px) das outras duas escalas.

### Por estado (`state`) — observações factuais dos tokens

| state          | observação a partir do `get_variable_defs`                                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default        | referencia o token `color/button/<variant>/default` (exceto outline/ghost, que não têm token de bg).                                                                                                                                                                |
| hover & active | primary/secondary/neutral/destructive referenciam `color/button/<variant>/hover-active`. Outline e ghost referenciam `color/neutral/100` = `#f5f5f5`.                                                                                                              |
| disabled       | primary/secondary/neutral/destructive referenciam `color/button/<variant>/disabled` = `#d4d4d4`; texto `color/text/disabled` = `#a3a3a3` (exceto icon button destructive disabled, que mantém `color/text/light`).                                                  |
| focus          | referencia `color/neutral/300` + token `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0,0), radius: 0, spread: 3)`.                                                                                                                       |
| loading        | mesmos tokens de bg da variante `default`. Largura do símbolo encolhe (ex.: primary m: 66×36 default → 48×36 loading; xs: 42×24 → 32×24).                                                                                                                          |

### Tipografia

| token               | definição (Figma)                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `body/02 - 13px`    | `Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2, letterSpacing: 0)` — usado em m e s. |
| `caption/01 - 10px` | `Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2, letterSpacing: 0)` — usado em xs.    |

### Efeito `focus`

`focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` — equivalente CSS: `box-shadow: 0 0 0 3px #d4d4d4;`. **Idêntico em todas as variantes e tamanhos**.

## Cores resumidas (extraídas literalmente do `get_variable_defs`)

### Tokens encontrados por variante × estado

| variante    | default                                                  | hover & active                                                        | disabled                                                                 |
| ----------- | -------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| primary     | bg `color/button/brand/default` = `#008633`              | bg `color/button/brand/hover-active` = `#005c12`                      | bg `color/button/brand/disabled` = `#d4d4d4`                             |
| secondary   | bg `color/button/secondary/default` = `#0d4897`          | bg `color/button/secondary/hover-active` = `#093671`                  | bg `color/button/secondary/disabled` = `#d4d4d4`                         |
| neutral     | bg `color/button/neutral/default` = `#e5e5e5`            | bg `color/button/neutral/hover-active` = `#a3a3a3`                    | bg `color/button/neutral/disabled` = `#d4d4d4`                           |
| outline     | borda `color/border/regular` = `#d4d4d4` (sem token de bg) | bg `color/neutral/100` = `#f5f5f5` + borda `color/border/regular`   | borda `color/border/disabled` = `#e5e5e5` (sem token de bg)              |
| ghost       | (nenhum token de bg/borda)                               | bg `color/neutral/100` = `#f5f5f5` (sem borda)                        | (nenhum token de bg/borda)                                               |
| destructive | bg `color/button/destructive/default` = `#d2190b`        | bg `color/button/destructive/hover-active` = `#9d231c`                | bg `color/button/destructive/disabled` = `#d4d4d4`                       |

### Texto/ícone — tokens efetivamente referenciados pelos símbolos

Tokens distintos aparecem entre Button textual e IconButton:

| variante      | textual (default / hover & active)    | textual (disabled)        | textual (loading)         | icon button (default / hover & active) | icon button (disabled)    | icon button (loading)     |
| ------------- | -------------------------------------- | ------------------------- | ------------------------- | -------------------------------------- | ------------------------- | ------------------------- |
| primary       | `color/neutral/50` = `#fafafa`         | `color/text/disabled`     | `color/text/light` = `#fafafa` | `color/text/light` = `#fafafa`     | `color/text/disabled`     | `color/text/light`        |
| secondary     | `color/neutral/50` = `#fafafa`         | `color/text/disabled`     | `color/text/light`        | `color/text/light`                     | `color/text/disabled`     | `color/text/light`        |
| neutral       | `color/text/dark` = `#262626`          | `color/text/disabled`     | `color/text/dark`         | `color/text/dark`                      | `color/text/disabled`     | `color/text/dark`         |
| outline       | `color/text/dark`                      | `color/text/disabled`     | `color/text/dark`         | `color/text/dark`                      | `color/text/disabled`     | `color/text/dark`         |
| ghost         | `color/text/dark`                      | `color/text/disabled`     | `color/text/dark`         | `color/text/dark`                      | `color/text/disabled`     | `color/text/dark`         |
| destructive   | `color/text/light` = `#fafafa`         | `color/text/disabled`     | `color/text/light`        | `color/text/light`                     | `color/text/light` (!)    | `color/text/light`        |

Notas factuais sobre os tokens:

- **Botões textuais** primary e secondary usam o alias `color/neutral/50` para texto branco; destructive usa `color/text/light`. Os dois resolvem para `#fafafa`, mas o alias declarado no Figma é diferente.
- **IconButton destructive disabled** mantém `color/text/light` (em vez de `color/text/disabled`) — divergência intencional documentada nos tokens.
- Variante **outline focus** referencia também `color/opacities/light/0,01%` = `#ffffff00` — provavelmente um bg transparente explícito para o estado.
- Variante **ghost** só referencia `color/opacities/light/0,01%` (alguns estados) ou nenhum token de bg — a transparência é declarada por ausência de fill em outros.

## Variantes textuais (frame `4035:5251` — 798×1320)

#### Variante: `primary`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                    |
| ---- | -------------- | ------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4035:5764`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                                |
| m    | hover & active | `4035:5780`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                           |
| m    | disabled       | `4035:5772`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                            |
| m    | focus          | `4035:5788`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4035:12362` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                                                                                                                                                                   |
| s    | default        | `4035:5828`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                                |
| s    | hover & active | `4035:5844`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                           |
| s    | disabled       | `4035:5836`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                            |
| s    | focus          | `4035:5852`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4035:12926` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                                                                                                                                                                   |
| xs   | default        | `4035:5860`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/brand/default` = `#008633`                                                                                                                                              |
| xs   | hover & active | `4035:5876`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                         |
| xs   | disabled       | `4035:5868`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                          |
| xs   | focus          | `4035:5884`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4035:13257` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/brand/default` = `#008633`                                                                                                                                                                                                                                                                                    |

#### Variante: `secondary`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | -------------- | ------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4176:11969` | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                                |
| m    | hover & active | `4176:11979` | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                           |
| m    | disabled       | `4176:11975` | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                            |
| m    | focus          | `4176:11983` | 66 × 36        | `2` = `8`; `4` = `16`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4176:11973` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                                                                                                                                                                   |
| s    | default        | `4176:11987` | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                                |
| s    | hover & active | `4176:11997` | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                           |
| s    | disabled       | `4176:11993` | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                            |
| s    | focus          | `4176:12001` | 58 × 32        | `1` = `4`; `3` = `12`; `color/neutral/50` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4176:11991` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                                                                                                                                                                   |
| xs   | default        | `4176:12005` | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/secondary/default` = `#0d4897`                                                                                                                                              |
| xs   | hover & active | `4176:12015` | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                         |
| xs   | disabled       | `4176:12011` | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                          |
| xs   | focus          | `4176:12019` | 42 × 24        | `1` = `4`; `2` = `8`; `color/neutral/50` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4176:12009` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/secondary/default` = `#0d4897`                                                                                                                                                                                                                                                                                    |

#### Variante: `neutral`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                     |
| ---- | -------------- | ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4035:5636`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                                |
| m    | hover & active | `4035:5652`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                           |
| m    | disabled       | `4035:5644`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                           |
| m    | focus          | `4035:5660`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4035:12354` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                                                                                                                                                                   |
| s    | default        | `4035:5700`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                                |
| s    | hover & active | `4035:5716`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                           |
| s    | disabled       | `4035:5708`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                           |
| s    | focus          | `4035:5724`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4035:12918` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                                                                                                                                                                   |
| xs   | default        | `4035:5732`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                              |
| xs   | hover & active | `4035:5748`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                         |
| xs   | disabled       | `4035:5740`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                         |
| xs   | focus          | `4035:5756`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4035:13249` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                                                                                                                                                                    |

#### Variante: `outline`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---- | -------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4035:5508`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/border/regular` = `#d4d4d4`                                                                                                                                                                                        |
| m    | hover & active | `4035:5524`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                       |
| m    | disabled       | `4035:5516`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/border/disabled` = `#e5e5e5`                                                                                                                                                                                   |
| m    | focus          | `4035:5532`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4035:12346` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/border/regular` = `#d4d4d4`                                                                                                                                                                                                                                                                                                                           |
| s    | default        | `4035:5572`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                           |
| s    | hover & active | `4035:5588`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                       |
| s    | disabled       | `4035:5580`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/disabled` = `#e5e5e5`                                                                                                                                      |
| s    | focus          | `4035:5596`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4035:12910` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                                                                                                                                                              |
| xs   | default        | `4035:5604`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                         |
| xs   | hover & active | `4035:5620`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                     |
| xs   | disabled       | `4035:5612`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/disabled` = `#e5e5e5`                                                                                                                                    |
| xs   | focus          | `4035:5628`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4035:13241` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                                                                                                                                                               |

#### Variante: `ghost`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                 |
| ---- | -------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4035:5380`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`                                                                                                                                                                                        |
| m    | hover & active | `4035:5396`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                       |
| m    | disabled       | `4035:5388`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`                                                                                                                                                                                    |
| m    | focus          | `4035:5404`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4035:12338` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`                                                                                                                                                                                                                                                                                                                           |
| s    | default        | `4035:5444`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                           |
| s    | hover & active | `4035:5460`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                       |
| s    | disabled       | `4035:5452`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`                                                                                                                                                                                    |
| s    | focus          | `4035:5468`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4035:12902` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                                                                                                                                                              |
| xs   | default        | `4035:5476`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                         |
| xs   | hover & active | `4035:5492`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                     |
| xs   | disabled       | `4035:5484`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`                                                                                                                                                                                  |
| xs   | focus          | `4035:5500`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4035:13233` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                                                                                                                                                               |

#### Variante: `destructive`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                                                                                                                          |
| ---- | -------------- | ------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4035:5252`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                                |
| m    | hover & active | `4035:5268`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                           |
| m    | disabled       | `4035:5260`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                            |
| m    | focus          | `4035:5276`  | 66 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| m    | loading        | `4035:12330` | 48 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                                                                                                                                                                   |
| s    | default        | `4035:5316`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                                |
| s    | hover & active | `4035:5332`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                           |
| s    | disabled       | `4035:5324`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                            |
| s    | focus          | `4035:5340`  | 58 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `body/02 - 13px` = Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`   |
| s    | loading        | `4035:12894` | 40 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                                                                                                                                                                   |
| xs   | default        | `4035:5348`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/destructive/default` = `#d2190b`                                                                                                                                              |
| xs   | hover & active | `4035:5364`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                         |
| xs   | disabled       | `4035:5356`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                          |
| xs   | focus          | `4035:5372`  | 42 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `caption/01 - 10px` = Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0); `radius/md` = `4`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| xs   | loading        | `4035:13225` | 32 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/destructive/default` = `#d2190b`                                                                                                                                                                                                                                                                                    |

## Variantes icon button (frame `4040:7629` — 788×1320)

#### Variante: `primary`

| size | state          | nodeId      | width × height | tokens (do Figma)                                                                                                                                                                                                                                               |
| ---- | -------------- | ----------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4040:7858` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                              |
| m    | hover & active | `4040:7869` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                         |
| m    | disabled       | `4040:7865` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                          |
| m    | focus          | `4040:7873` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4040:7862` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                              |
| s    | default        | `4040:7877` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                              |
| s    | hover & active | `4040:7888` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                         |
| s    | disabled       | `4040:7884` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                          |
| s    | focus          | `4040:7892` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4040:7881` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/brand/default` = `#008633`                                                                                                                                              |
| xs   | default        | `4040:7896` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/brand/default` = `#008633`                                                                                                                                               |
| xs   | hover & active | `4040:7907` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/brand/hover-active` = `#005c12`                                                                                                                                          |
| xs   | disabled       | `4040:7903` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`; `color/button/brand/disabled` = `#d4d4d4`                                                                                                                                           |
| xs   | focus          | `4040:7911` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/brand/hover-active` = `#005c12`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4040:7900` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/brand/default` = `#008633`                                                                                                                                               |

#### Variante: `secondary`

| size | state          | nodeId       | width × height | tokens (do Figma)                                                                                                                                                                                                                                                   |
| ---- | -------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4179:12153` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                              |
| m    | hover & active | `4179:12159` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                         |
| m    | disabled       | `4179:12157` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                          |
| m    | focus          | `4179:12161` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4179:12155` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                              |
| s    | default        | `4179:12163` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                              |
| s    | hover & active | `4179:12169` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                         |
| s    | disabled       | `4179:12167` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                          |
| s    | focus          | `4179:12171` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4179:12165` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/secondary/default` = `#0d4897`                                                                                                                                              |
| xs   | default        | `4179:12173` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/secondary/default` = `#0d4897`                                                                                                                                               |
| xs   | hover & active | `4179:12179` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/secondary/hover-active` = `#093671`                                                                                                                                          |
| xs   | disabled       | `4179:12177` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`; `color/button/secondary/disabled` = `#d4d4d4`                                                                                                                                           |
| xs   | focus          | `4179:12181` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/secondary/hover-active` = `#093671`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4179:12175` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/secondary/default` = `#0d4897`                                                                                                                                               |

#### Variante: `neutral`

| size | state          | nodeId      | width × height | tokens (do Figma)                                                                                                                                                                                                                                                |
| ---- | -------------- | ----------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4040:7801` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                              |
| m    | hover & active | `4040:7812` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                         |
| m    | disabled       | `4040:7808` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                         |
| m    | focus          | `4040:7816` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4040:7805` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                              |
| s    | default        | `4040:7820` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                              |
| s    | hover & active | `4040:7831` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                         |
| s    | disabled       | `4040:7827` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                         |
| s    | focus          | `4040:7835` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4040:7824` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                              |
| xs   | default        | `4040:7839` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                               |
| xs   | hover & active | `4040:7850` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/button/neutral/hover-active` = `#a3a3a3`                                                                                                                                          |
| xs   | disabled       | `4040:7846` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`; `color/button/neutral/disabled` = `#d4d4d4`                                                                                                                                          |
| xs   | focus          | `4040:7854` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/button/neutral/hover-active` = `#a3a3a3`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4040:7843` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/button/neutral/default` = `#e5e5e5`                                                                                                                                               |

#### Variante: `outline`

| size | state          | nodeId      | width × height | tokens (do Figma)                                                                                                                                                                                                                                                                                |
| ---- | -------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| m    | default        | `4040:7744` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                         |
| m    | hover & active | `4040:7755` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                     |
| m    | disabled       | `4040:7751` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/disabled` = `#e5e5e5`                                                                                                                                    |
| m    | focus          | `4040:7759` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4040:7748` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/border/regular` = `#d4d4d4`                                                                                                                                                                                      |
| s    | default        | `4040:7763` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                         |
| s    | hover & active | `4040:7774` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                     |
| s    | disabled       | `4040:7770` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/disabled` = `#e5e5e5`                                                                                                                                    |
| s    | focus          | `4040:7778` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4040:7767` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                         |
| xs   | default        | `4040:7782` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                          |
| xs   | hover & active | `4040:7793` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/neutral/100` = `#f5f5f5`; `color/border/regular` = `#d4d4d4`                                                                                                                                                      |
| xs   | disabled       | `4040:7789` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/disabled` = `#e5e5e5`                                                                                                                                     |
| xs   | focus          | `4040:7797` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4040:7786` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/border/regular` = `#d4d4d4`                                                                                                                                          |

#### Variante: `ghost`

| size | state          | nodeId      | width × height | tokens (do Figma)                                                                                                                                                                                                                                            |
| ---- | -------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| m    | default        | `4040:7687` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`                                                                                                                                                                                      |
| m    | hover & active | `4040:7698` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                     |
| m    | disabled       | `4040:7694` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`                                                                                                                                                                                  |
| m    | focus          | `4040:7702` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4040:7691` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/dark` = `#262626`; `radius/xl` = `8`                                                                                                                                                                                      |
| s    | default        | `4040:7706` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                         |
| s    | hover & active | `4040:7717` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                     |
| s    | disabled       | `4040:7713` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`                                                                                                                                                                                  |
| s    | focus          | `4040:7721` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4040:7710` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/dark` = `#262626`; `radius/xl` = `8`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                         |
| xs   | default        | `4040:7725` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                          |
| xs   | hover & active | `4040:7736` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/neutral/100` = `#f5f5f5`                                                                                                                                                      |
| xs   | disabled       | `4040:7732` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`                                                                                                                                                                                   |
| xs   | focus          | `4040:7740` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4040:7729` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/dark` = `#262626`; `radius/md` = `4`; `color/opacities/light/0,01%` = `#ffffff00`                                                                                                                                          |

#### Variante: `destructive`

| size | state          | nodeId      | width × height | tokens (do Figma)                                                                                                                                                                                                                                                     |
| ---- | -------------- | ----------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| m    | default        | `4040:7630` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                              |
| m    | hover & active | `4040:7641` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                         |
| m    | disabled       | `4040:7637` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                             |
| m    | focus          | `4040:7645` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| m    | loading        | `4040:7634` | 36 × 36        | `2` = `8`; `4` = `16`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                              |
| s    | default        | `4040:7649` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                              |
| s    | hover & active | `4040:7660` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                         |
| s    | disabled       | `4040:7656` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/disabled` = `#a3a3a3`; `radius/xl` = `8`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                          |
| s    | focus          | `4040:7664` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)` |
| s    | loading        | `4040:7653` | 32 × 32        | `1` = `4`; `3` = `12`; `color/text/light` = `#fafafa`; `radius/xl` = `8`; `color/button/destructive/default` = `#d2190b`                                                                                                                                              |
| xs   | default        | `4040:7668` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/destructive/default` = `#d2190b`                                                                                                                                               |
| xs   | hover & active | `4040:7679` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/destructive/hover-active` = `#9d231c`                                                                                                                                          |
| xs   | disabled       | `4040:7675` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/disabled` = `#a3a3a3`; `radius/md` = `4`; `color/button/destructive/disabled` = `#d4d4d4`                                                                                                                                           |
| xs   | focus          | `4040:7683` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/destructive/hover-active` = `#9d231c`; `color/neutral/300` = `#d4d4d4`; `focus` = `Effect(type: DROP_SHADOW, color: color/neutral/300, offset: (0, 0), radius: 0, spread: 3)`  |
| xs   | loading        | `4040:7672` | 24 × 24        | `1` = `4`; `2` = `8`; `color/text/light` = `#fafafa`; `radius/md` = `4`; `color/button/destructive/default` = `#d2190b`                                                                                                                                               |

## Símbolo `.spinner` (`4035:13385`)

- Dimensões do símbolo: **16×16** (do `get_metadata`).
- Tokens referenciados (do `get_variable_defs`): `color/neutral/500` = `#6d6d6e`.
- Nos símbolos de botão com `state=loading`, o token de texto/ícone referenciado é `color/text/light` (#fafafa) para variantes saturadas e `color/text/dark` (#262626) para neutral/outline/ghost — esses são os tokens declarados nas variantes `loading`, não no símbolo `.spinner` em si.

## Textos escritos no Figma (anotações do componente)

Textos literais lidos do screenshot do componente.

### Heading `.Spinner` (text node `4035:4389`)

> .Spinner

### Heading `Exemplos` (text node `4119:21816`)

> Exemplos

### Bloco `Tooltip` — heading + descrição (frame `8733:12506`)

Heading (`8733:12508`):

> Tooltip

Descrição (`8733:12507`):

> Botões com label podem ter tooltip opcionalmente. Botões de ícone sempre devem ter tooltip com o nome da ação, sem exceção.

## Exemplos de uso (frame `4119:21462` — 514×216)

Conteúdo lido do screenshot. Tokens só confirmados via `get_variable_defs` onde indicado — o resto está rate-limited no Figma desktop MCP e fica só com o que é visível.

| Row | nodeId               | dimensões         | label visível                  | ícone visível                         | tokens confirmados                                                                 |
| --- | -------------------- | ----------------- | ------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | `4119:21465`         | 36 h (m default)  | "Entrar com o e-mail"          | ícone de envelope à esquerda          | `color/button/brand/default` = `#008633`, padding `2/4` = 8/16, `radius/xl` = 8     |
| 1   | `4138:14978`         | 36 h (m default)  | "Enviar processo"              | sem ícone                             | `color/button/brand/default` = `#008633`, padding `2/4` = 8/16, `radius/xl` = 8     |
| 1   | `4119:21466`         | 36 h (m default)  | "Adicionar cliente"            | ícone de `+` à esquerda               | _(rate-limited)_ — visualmente bg azul                                              |
| 2   | `4119:21468` (92px)  | 36 h (m default)  | "Editar"                       | ícone de lápis à esquerda             | _(rate-limited)_ — visualmente bg branco com borda                                  |
| 2   | `4119:21469` (97px)  | 36 h (m default)  | "Excluir"                      | ícone de lixeira à esquerda           | _(rate-limited)_ — visualmente bg vermelho                                          |
| 3   | `4119:21476` (106px) | 36 h (m default)  | "Anterior"                     | chevron à esquerda                    | _(rate-limited)_ — visualmente bg cinza claro                                       |
| 3   | `4119:21477` (106px) | 36 h (m default)  | "Próximo"                      | chevron à direita                     | _(rate-limited)_ — visualmente bg cinza claro                                       |
| 4   | `4120:8324`          | 36×36             | (sem texto)                    | ícone de `$` (cifrão)                 | _(rate-limited)_ — visualmente bg branco com borda                                  |
| 4   | `4120:8325`          | 36×36             | (sem texto)                    | ícone de sino                         | _(rate-limited)_ — visualmente bg transparente sem borda                            |

## Bloco Tooltip (`8733:13465`)

Conteúdo visível no screenshot:

- `8733:13513` — tooltip dark 200×44 com texto literal **"Lorem ipsum dolor sit amet, consectetur adipiscing elit."** (multilinha).
- `8733:13467` — button m default 130×36 com label **"Enviar processo"**, bg verde (ancorado ao tooltip 200×44 acima dele).
- `8733:13517` — tooltip dark 95×28 com texto literal **"Lorem ipsum"** (linha única).
- `8733:13509` — icon button m default 36×36, ícone de `$` (cifrão), bg branco com borda (ancorado ao tooltip 95×28 à sua direita).

> Tokens dos botões aqui não foram drillados individualmente (rate limit). Visualmente correspondem às variantes já documentadas acima.

## Estrutura do nó (metadata XML completa)

```xml
<frame id="4035:4131" name="Button" x="-4157" y="-59" width="1079" height="3945">
  <instance id="4035:4132" name="Page header" x="0" y="0" width="1079" height="191" />
  <frame id="4035:4133" name="Content container" x="0" y="191" width="1079" height="3754">
    <frame id="4035:5188" name="Component" x="64" y="64" width="951" height="1351">
      <frame id="4035:5189" name="Grid" x="153" y="31" width="798" height="1320">
        <frame id="4035:5190" name="Rows" x="0" y="0" width="798" height="1320">
          <rounded-rectangle id="4035:5191" name="Row" x="0" y="0" width="798" height="88" />
          <rounded-rectangle id="4035:5192" name="Row" x="0" y="88" width="798" height="88" />
          <rounded-rectangle id="4035:5193" name="Row" x="0" y="176" width="798" height="88" />
          <rounded-rectangle id="4035:5194" name="Row" x="0" y="264" width="798" height="88" />
          <rounded-rectangle id="4035:5195" name="Row" x="0" y="352" width="798" height="88" />
          <rounded-rectangle id="4035:5196" name="Row" x="0" y="440" width="798" height="88" />
          <rounded-rectangle id="4035:5197" name="Row" x="0" y="528" width="798" height="88" />
          <rounded-rectangle id="4035:5198" name="Row" x="0" y="616" width="798" height="88" />
          <rounded-rectangle id="4035:5199" name="Row" x="0" y="704" width="798" height="88" />
          <rounded-rectangle id="4035:5200" name="Row" x="0" y="792" width="798" height="88" />
          <rounded-rectangle id="4035:5201" name="Row" x="0" y="880" width="798" height="88" />
          <rounded-rectangle id="4035:5202" name="Row" x="0" y="968" width="798" height="88" />
          <rounded-rectangle id="4035:5203" name="Row" x="0" y="1056" width="798" height="88" />
          <rounded-rectangle id="4035:5204" name="Row" x="0" y="1144" width="798" height="88" />
          <rounded-rectangle id="4035:5205" name="Row" x="0" y="1232" width="798" height="88" />
        </frame>
        <frame id="4035:5207" name="Columns" x="0" y="0" width="798" height="1320">
          <vector id="4035:5208" name="Column" x="0" y="0" width="133" height="1320" />
          <vector id="4035:5209" name="Column" x="133" y="0" width="133" height="1320" />
          <vector id="4035:5210" name="Column" x="266" y="0" width="133" height="1320" />
          <vector id="4035:5211" name="Column" x="399" y="0" width="133" height="1320" />
          <vector id="4035:5212" name="Column" x="532" y="0" width="133" height="1320" />
          <vector id="4176:12050" name="Column" x="665" y="0" width="133" height="1320" />
        </frame>
      </frame>
      <frame id="4035:5213" name="Meta" x="0" y="31" width="137" height="1320">
        <frame id="4035:5214" name="Sections" x="48" y="0" width="89" height="1764">
          <frame id="4035:5215" name="Section" x="0" y="0" width="89" height="441">
            <text id="4035:5216" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4035:5217" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4035:5218" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4035:5219" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4035:12490" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
          <frame id="4035:12820" name="Section" x="0" y="441" width="89" height="441">
            <text id="4035:12821" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4035:12822" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4035:12823" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4035:12824" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4035:12825" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
          <frame id="4035:13054" name="Section" x="0" y="882" width="89" height="441">
            <text id="4035:13055" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4035:13056" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4035:13057" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4035:13058" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4035:13059" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
        </frame>
        <frame id="4035:5235" name="Brackets" x="32" y="17" width="24" height="1303">
          <vector id="4035:5236" name="Bracket" x="0" y="12" width="24" height="410.3333435058594" />
          <vector id="4035:5238" name="Bracket" x="0" y="446.3333435058594" width="24" height="410.33331298828125" />
          <vector id="4035:5239" name="Bracket" x="0" y="880.6666259765625" width="24" height="410.33331298828125" />
        </frame>
        <frame id="4035:5240" name="Sections" x="4" y="0" width="12" height="1308">
          <text id="4035:5241" name="m" x="-4.2408447265625" y="24" width="16.2408447265625" height="388" />
          <text id="4035:5243" name="s" x="0.355621337890625" y="460" width="11.644379615783691" height="388" />
          <text id="4035:5244" name="xs" x="2.5006370544433594" y="896" width="9.499361991882324" height="388" />
        </frame>
      </frame>
      <frame id="4035:5245" name="Meta" x="153" y="0" width="798" height="15">
        <text id="4035:5246" name="Primary" x="24" y="0" width="85" height="15" />
        <text id="4035:5247" name="Secondary" x="157" y="0" width="85" height="15" />
        <text id="4176:12051" name="Neutral" x="290" y="0" width="85" height="15" />
        <text id="4035:5248" name="Outline" x="423" y="0" width="85" height="15" />
        <text id="4035:5249" name="Ghost" x="556" y="0" width="85" height="15" />
        <text id="4035:5250" name="Destructive" x="689" y="0" width="85" height="15" />
      </frame>
      <frame id="4035:5251" name="button" x="153" y="31" width="798" height="1320">
        <symbol id="4035:5252" name="variant=destructive, size=m, state=default" x="701" y="26" width="66" height="36" />
        <symbol id="4035:12330" name="variant=destructive, size=m, state=loading" x="710" y="378" width="48" height="36" />
        <symbol id="4035:5260" name="variant=destructive, size=m, state=disabled" x="701" y="202" width="66" height="36" />
        <symbol id="4035:5268" name="variant=destructive, size=m, state=hover &amp; active" x="701" y="114" width="66" height="36" />
        <symbol id="4035:5276" name="variant=destructive, size=m, state=focus" x="701" y="290" width="66" height="36" />
        <symbol id="4035:5316" name="variant=destructive, size=s, state=default" x="705" y="466" width="58" height="32" />
        <symbol id="4035:12894" name="variant=destructive, size=s, state=loading" x="714" y="818" width="40" height="32" />
        <symbol id="4035:5324" name="variant=destructive, size=s, state=disabled" x="705" y="642" width="58" height="32" />
        <symbol id="4035:5332" name="variant=destructive, size=s, state=hover &amp; active" x="705" y="554" width="58" height="32" />
        <symbol id="4035:5340" name="variant=destructive, size=s, state=focus" x="705" y="730" width="58" height="32" />
        <symbol id="4035:5348" name="variant=destructive, size=xs, state=default" x="713" y="910" width="42" height="24" />
        <symbol id="4035:13225" name="variant=destructive, size=xs, state=loading" x="718" y="1265" width="32" height="24" />
        <symbol id="4035:5356" name="variant=destructive, size=xs, state=disabled" x="713" y="1086" width="42" height="24" />
        <symbol id="4035:5364" name="variant=destructive, size=xs, state=hover &amp; active" x="713" y="998" width="42" height="24" />
        <symbol id="4035:5372" name="variant=destructive, size=xs, state=focus" x="713" y="1177" width="42" height="24" />
        <symbol id="4035:5380" name="variant=ghost, size=m, state=default" x="568.5" y="26" width="66" height="36" />
        <symbol id="4035:12338" name="variant=ghost, size=m, state=loading" x="577.5" y="378" width="48" height="36" />
        <symbol id="4035:5388" name="variant=ghost, size=m, state=disabled" x="568.5" y="202" width="66" height="36" />
        <symbol id="4035:5396" name="variant=ghost, size=m, state=hover &amp; active" x="568.5" y="114" width="66" height="36" />
        <symbol id="4035:5404" name="variant=ghost, size=m, state=focus" x="568.5" y="290" width="66" height="36" />
        <symbol id="4035:5444" name="variant=ghost, size=s, state=default" x="572.5" y="466" width="58" height="32" />
        <symbol id="4035:12902" name="variant=ghost, size=s, state=loading" x="581.5" y="818" width="40" height="32" />
        <symbol id="4035:5452" name="variant=ghost, size=s, state=disabled" x="572.5" y="642" width="58" height="32" />
        <symbol id="4035:5460" name="variant=ghost, size=s, state=hover &amp; active" x="572.5" y="554" width="58" height="32" />
        <symbol id="4035:5468" name="variant=ghost, size=s, state=focus" x="572.5" y="730" width="58" height="32" />
        <symbol id="4035:5476" name="variant=ghost, size=xs, state=default" x="580.5" y="910" width="42" height="24" />
        <symbol id="4035:13233" name="variant=ghost, size=xs, state=loading" x="585.5" y="1265" width="32" height="24" />
        <symbol id="4035:5484" name="variant=ghost, size=xs, state=disabled" x="580.5" y="1086" width="42" height="24" />
        <symbol id="4035:5492" name="variant=ghost, size=xs, state=hover &amp; active" x="580.5" y="998" width="42" height="24" />
        <symbol id="4035:5500" name="variant=ghost, size=xs, state=focus" x="580.5" y="1177" width="42" height="24" />
        <symbol id="4035:5508" name="variant=outline, size=m, state=default" x="435.75" y="26" width="66" height="36" />
        <symbol id="4035:12346" name="variant=outline, size=m, state=loading" x="444.75" y="378" width="48" height="36" />
        <symbol id="4035:5516" name="variant=outline, size=m, state=disabled" x="435.75" y="202" width="66" height="36" />
        <symbol id="4035:5524" name="variant=outline, size=m, state=hover &amp; active" x="435.75" y="114" width="66" height="36" />
        <symbol id="4035:5532" name="variant=outline, size=m, state=focus" x="435.75" y="290" width="66" height="36" />
        <symbol id="4035:5572" name="variant=outline, size=s, state=default" x="439.75" y="466" width="58" height="32" />
        <symbol id="4035:12910" name="variant=outline, size=s, state=loading" x="448.75" y="818" width="40" height="32" />
        <symbol id="4035:5580" name="variant=outline, size=s, state=disabled" x="439.75" y="642" width="58" height="32" />
        <symbol id="4035:5588" name="variant=outline, size=s, state=hover &amp; active" x="439.75" y="554" width="58" height="32" />
        <symbol id="4035:5596" name="variant=outline, size=s, state=focus" x="439.75" y="730" width="58" height="32" />
        <symbol id="4035:5604" name="variant=outline, size=xs, state=default" x="447.75" y="910" width="42" height="24" />
        <symbol id="4035:13241" name="variant=outline, size=xs, state=loading" x="452.75" y="1265" width="32" height="24" />
        <symbol id="4035:5612" name="variant=outline, size=xs, state=disabled" x="447.75" y="1086" width="42" height="24" />
        <symbol id="4035:5620" name="variant=outline, size=xs, state=hover &amp; active" x="447.75" y="998" width="42" height="24" />
        <symbol id="4035:5628" name="variant=outline, size=xs, state=focus" x="447.75" y="1177" width="42" height="24" />
        <symbol id="4035:5636" name="variant=neutral, size=m, state=default" x="303.25" y="26" width="66" height="36" />
        <symbol id="4035:12354" name="variant=neutral, size=m, state=loading" x="312.25" y="378" width="48" height="36" />
        <symbol id="4035:5644" name="variant=neutral, size=m, state=disabled" x="303.25" y="202" width="66" height="36" />
        <symbol id="4035:5652" name="variant=neutral, size=m, state=hover &amp; active" x="303.25" y="114" width="66" height="36" />
        <symbol id="4035:5660" name="variant=neutral, size=m, state=focus" x="303.25" y="290" width="66" height="36" />
        <symbol id="4035:5700" name="variant=neutral, size=s, state=default" x="307.25" y="466" width="58" height="32" />
        <symbol id="4035:12918" name="variant=neutral, size=s, state=loading" x="316.25" y="818" width="40" height="32" />
        <symbol id="4035:5708" name="variant=neutral, size=s, state=disabled" x="307.25" y="642" width="58" height="32" />
        <symbol id="4035:5716" name="variant=neutral, size=s, state=hover &amp; active" x="307.25" y="554" width="58" height="32" />
        <symbol id="4035:5724" name="variant=neutral, size=s, state=focus" x="307.25" y="730" width="58" height="32" />
        <symbol id="4035:5732" name="variant=neutral, size=xs, state=default" x="315.25" y="910" width="42" height="24" />
        <symbol id="4035:13249" name="variant=neutral, size=xs, state=loading" x="320.25" y="1265" width="32" height="24" />
        <symbol id="4035:5740" name="variant=neutral, size=xs, state=disabled" x="315.25" y="1086" width="42" height="24" />
        <symbol id="4035:5748" name="variant=neutral, size=xs, state=hover &amp; active" x="315.25" y="998" width="42" height="24" />
        <symbol id="4035:5756" name="variant=neutral, size=xs, state=focus" x="315.25" y="1177" width="42" height="24" />
        <symbol id="4035:5764" name="variant=primary, size=m, state=default" x="34" y="26" width="66" height="36" />
        <symbol id="4176:11969" name="variant=secondary, size=m, state=default" x="169" y="26" width="66" height="36" />
        <symbol id="4035:12362" name="variant=primary, size=m, state=loading" x="43" y="378" width="48" height="36" />
        <symbol id="4176:11973" name="variant=secondary, size=m, state=loading" x="178" y="378" width="48" height="36" />
        <symbol id="4035:5772" name="variant=primary, size=m, state=disabled" x="34" y="202" width="66" height="36" />
        <symbol id="4176:11975" name="variant=secondary, size=m, state=disabled" x="169" y="202" width="66" height="36" />
        <symbol id="4035:5780" name="variant=primary, size=m, state=hover &amp; active" x="34" y="114" width="66" height="36" />
        <symbol id="4176:11979" name="variant=secondary, size=m, state=hover &amp; active" x="169" y="114" width="66" height="36" />
        <symbol id="4035:5788" name="variant=primary, size=m, state=focus" x="34" y="290" width="66" height="36" />
        <symbol id="4176:11983" name="variant=secondary, size=m, state=focus" x="169" y="290" width="66" height="36" />
        <symbol id="4035:5828" name="variant=primary, size=s, state=default" x="38" y="466" width="58" height="32" />
        <symbol id="4176:11987" name="variant=secondary, size=s, state=default" x="173" y="466" width="58" height="32" />
        <symbol id="4035:12926" name="variant=primary, size=s, state=loading" x="47" y="818" width="40" height="32" />
        <symbol id="4176:11991" name="variant=secondary, size=s, state=loading" x="182" y="818" width="40" height="32" />
        <symbol id="4035:5836" name="variant=primary, size=s, state=disabled" x="38" y="642" width="58" height="32" />
        <symbol id="4176:11993" name="variant=secondary, size=s, state=disabled" x="173" y="642" width="58" height="32" />
        <symbol id="4035:5844" name="variant=primary, size=s, state=hover &amp; active" x="38" y="554" width="58" height="32" />
        <symbol id="4176:11997" name="variant=secondary, size=s, state=hover &amp; active" x="173" y="554" width="58" height="32" />
        <symbol id="4035:5852" name="variant=primary, size=s, state=focus" x="38" y="730" width="58" height="32" />
        <symbol id="4176:12001" name="variant=secondary, size=s, state=focus" x="173" y="730" width="58" height="32" />
        <symbol id="4035:5860" name="variant=primary, size=xs, state=default" x="46" y="910" width="42" height="24" />
        <symbol id="4176:12005" name="variant=secondary, size=xs, state=default" x="181" y="910" width="42" height="24" />
        <symbol id="4035:13257" name="variant=primary, size=xs, state=loading" x="51" y="1265" width="32" height="24" />
        <symbol id="4176:12009" name="variant=secondary, size=xs, state=loading" x="186" y="1265" width="32" height="24" />
        <symbol id="4035:5868" name="variant=primary, size=xs, state=disabled" x="46" y="1086" width="42" height="24" />
        <symbol id="4176:12011" name="variant=secondary, size=xs, state=disabled" x="181" y="1086" width="42" height="24" />
        <symbol id="4035:5876" name="variant=primary, size=xs, state=hover &amp; active" x="46" y="998" width="42" height="24" />
        <symbol id="4176:12015" name="variant=secondary, size=xs, state=hover &amp; active" x="181" y="998" width="42" height="24" />
        <symbol id="4035:5884" name="variant=primary, size=xs, state=focus" x="46" y="1177" width="42" height="24" />
        <symbol id="4176:12019" name="variant=secondary, size=xs, state=focus" x="181" y="1177" width="42" height="24" />
      </frame>
    </frame>
    <frame id="4040:7571" name="Component" x="64" y="1479" width="941" height="1351">
      <frame id="4040:7572" name="Grid" x="153" y="31" width="788" height="1320">
        <frame id="4040:7573" name="Rows" x="0" y="0" width="788" height="1320">
          <rounded-rectangle id="4040:7574" name="Row" x="0" y="0" width="788" height="88" />
          <rounded-rectangle id="4040:7575" name="Row" x="0" y="88" width="788" height="88" />
          <rounded-rectangle id="4040:7576" name="Row" x="0" y="176" width="788" height="88" />
          <rounded-rectangle id="4040:7577" name="Row" x="0" y="264" width="788" height="88" />
          <rounded-rectangle id="4040:7578" name="Row" x="0" y="352" width="788" height="88" />
          <rounded-rectangle id="4040:7579" name="Row" x="0" y="440" width="788" height="88" />
          <rounded-rectangle id="4040:7580" name="Row" x="0" y="528" width="788" height="88" />
          <rounded-rectangle id="4040:7581" name="Row" x="0" y="616" width="788" height="88" />
          <rounded-rectangle id="4040:7582" name="Row" x="0" y="704" width="788" height="88" />
          <rounded-rectangle id="4040:7583" name="Row" x="0" y="792" width="788" height="88" />
          <rounded-rectangle id="4040:7584" name="Row" x="0" y="880" width="788" height="88" />
          <rounded-rectangle id="4040:7585" name="Row" x="0" y="968" width="788" height="88" />
          <rounded-rectangle id="4040:7586" name="Row" x="0" y="1056" width="788" height="88" />
          <rounded-rectangle id="4040:7587" name="Row" x="0" y="1144" width="788" height="88" />
          <rounded-rectangle id="4040:7588" name="Row" x="0" y="1232" width="788" height="88" />
        </frame>
        <frame id="4040:7589" name="Columns" x="0" y="0" width="788" height="1320">
          <vector id="4179:12198" name="Column" x="0" y="0" width="131.3333282470703" height="1320" />
          <vector id="4040:7591" name="Column" x="131.3333282470703" y="0" width="131.33334350585938" height="1320" />
          <vector id="4179:12200" name="Column" x="262.66668701171875" y="0" width="131.33334350585938" height="1320" />
          <vector id="4040:7592" name="Column" x="394.0000305175781" y="0" width="131.33334350585938" height="1320" />
          <vector id="4040:7593" name="Column" x="525.3333740234375" y="0" width="131.33334350585938" height="1320" />
          <vector id="4040:7594" name="Column" x="656.666748046875" y="0" width="131.33334350585938" height="1320" />
        </frame>
      </frame>
      <frame id="4040:7595" name="Meta" x="0" y="31" width="137" height="1320">
        <frame id="4040:7596" name="Sections" x="48" y="0" width="89" height="1764">
          <frame id="4040:7597" name="Section" x="0" y="0" width="89" height="441">
            <text id="4040:7598" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4040:7599" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4040:7600" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4040:7601" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4040:7602" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
          <frame id="4040:7603" name="Section" x="0" y="441" width="89" height="441">
            <text id="4040:7604" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4040:7605" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4040:7606" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4040:7607" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4040:7608" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
          <frame id="4040:7609" name="Section" x="0" y="882" width="89" height="441">
            <text id="4040:7610" name="Default" x="44" y="24" width="45" height="40.20000076293945" />
            <text id="4040:7611" name="Hover &amp; Active" x="0" y="112.19999694824219" width="89" height="40.20000076293945" />
            <text id="4040:7612" name="Disabled" x="38" y="200.39999389648438" width="51" height="40.20000076293945" />
            <text id="4040:7613" name="Focus" x="57" y="288.5999755859375" width="32" height="40.20000457763672" />
            <text id="4040:7614" name="Loading" x="44" y="376.79998779296875" width="45" height="40.20000457763672" />
          </frame>
        </frame>
        <frame id="4040:7615" name="Brackets" x="32" y="17" width="24" height="1303">
          <vector id="4040:7616" name="Bracket" x="0" y="12" width="24" height="410.3333435058594" />
          <vector id="4040:7617" name="Bracket" x="0" y="446.3333435058594" width="24" height="410.33331298828125" />
          <vector id="4040:7618" name="Bracket" x="0" y="880.6666259765625" width="24" height="410.33331298828125" />
        </frame>
        <frame id="4040:7619" name="Sections" x="4" y="0" width="12" height="1308">
          <text id="4040:7620" name="m" x="-4.2408447265625" y="24" width="16.2408447265625" height="388" />
          <text id="4040:7621" name="s" x="0.355621337890625" y="460" width="11.644379615783691" height="388" />
          <text id="4040:7622" name="xs" x="2.5006370544433594" y="896" width="9.499361991882324" height="388" />
        </frame>
      </frame>
      <frame id="4040:7623" name="Meta" x="153" y="0" width="788" height="15">
        <text id="4040:7624" name="Primary" x="24" y="0" width="83.33333587646484" height="15" />
        <text id="4040:7625" name="Secondary" x="155.33334350585938" y="0" width="83.33332824707031" height="15" />
        <text id="4179:12199" name="Neutral" x="286.66668701171875" y="0" width="83.33332824707031" height="15" />
        <text id="4040:7626" name="Outline" x="418" y="0" width="83.33332824707031" height="15" />
        <text id="4040:7627" name="Ghost" x="549.3333129882812" y="0" width="83.33332824707031" height="15" />
        <text id="4040:7628" name="Destructive" x="680.6666259765625" y="0" width="83.33332824707031" height="15" />
      </frame>
      <frame id="4040:7629" name="icon button" x="153" y="31" width="788" height="1320">
        <symbol id="4040:7630" name="variant=destructive, size=m, state=default" x="711.5" y="26" width="36" height="36" />
        <symbol id="4040:7634" name="variant=destructive, size=m, state=loading" x="711.5" y="378" width="36" height="36" />
        <symbol id="4040:7637" name="variant=destructive, size=m, state=disabled" x="711.5" y="202" width="36" height="36" />
        <symbol id="4040:7641" name="variant=destructive, size=m, state=hover &amp; active" x="711.5" y="114" width="36" height="36" />
        <symbol id="4040:7645" name="variant=destructive, size=m, state=focus" x="711.5" y="290" width="36" height="36" />
        <symbol id="4040:7649" name="variant=destructive, size=s, state=default" x="713.5" y="466" width="32" height="32" />
        <symbol id="4040:7653" name="variant=destructive, size=s, state=loading" x="713.5" y="818" width="32" height="32" />
        <symbol id="4040:7656" name="variant=destructive, size=s, state=disabled" x="713.5" y="642" width="32" height="32" />
        <symbol id="4040:7660" name="variant=destructive, size=s, state=hover &amp; active" x="713.5" y="554" width="32" height="32" />
        <symbol id="4040:7664" name="variant=destructive, size=s, state=focus" x="713.5" y="730" width="32" height="32" />
        <symbol id="4040:7668" name="variant=destructive, size=xs, state=default" x="717.5" y="910" width="24" height="24" />
        <symbol id="4040:7672" name="variant=destructive, size=xs, state=loading" x="717.5" y="1265" width="24" height="24" />
        <symbol id="4040:7675" name="variant=destructive, size=xs, state=disabled" x="717.5" y="1086" width="24" height="24" />
        <symbol id="4040:7679" name="variant=destructive, size=xs, state=hover &amp; active" x="717.5" y="998" width="24" height="24" />
        <symbol id="4040:7683" name="variant=destructive, size=xs, state=focus" x="717.5" y="1177" width="24" height="24" />
        <symbol id="4040:7687" name="variant=ghost, size=m, state=default" x="579" y="26" width="36" height="36" />
        <symbol id="4040:7691" name="variant=ghost, size=m, state=loading" x="579" y="378" width="36" height="36" />
        <symbol id="4040:7694" name="variant=ghost, size=m, state=disabled" x="579" y="202" width="36" height="36" />
        <symbol id="4040:7698" name="variant=ghost, size=m, state=hover &amp; active" x="579" y="114" width="36" height="36" />
        <symbol id="4040:7702" name="variant=ghost, size=m, state=focus" x="579" y="290" width="36" height="36" />
        <symbol id="4040:7706" name="variant=ghost, size=s, state=default" x="581" y="466" width="32" height="32" />
        <symbol id="4040:7710" name="variant=ghost, size=s, state=loading" x="581" y="818" width="32" height="32" />
        <symbol id="4040:7713" name="variant=ghost, size=s, state=disabled" x="581" y="642" width="32" height="32" />
        <symbol id="4040:7717" name="variant=ghost, size=s, state=hover &amp; active" x="581" y="554" width="32" height="32" />
        <symbol id="4040:7721" name="variant=ghost, size=s, state=focus" x="581" y="730" width="32" height="32" />
        <symbol id="4040:7725" name="variant=ghost, size=xs, state=default" x="585" y="910" width="24" height="24" />
        <symbol id="4040:7729" name="variant=ghost, size=xs, state=loading" x="585" y="1265" width="24" height="24" />
        <symbol id="4040:7732" name="variant=ghost, size=xs, state=disabled" x="585" y="1086" width="24" height="24" />
        <symbol id="4040:7736" name="variant=ghost, size=xs, state=hover &amp; active" x="585" y="998" width="24" height="24" />
        <symbol id="4040:7740" name="variant=ghost, size=xs, state=focus" x="585" y="1177" width="24" height="24" />
        <symbol id="4040:7744" name="variant=outline, size=m, state=default" x="444.5" y="26" width="36" height="36" />
        <symbol id="4040:7748" name="variant=outline, size=m, state=loading" x="444.5" y="378" width="36" height="36" />
        <symbol id="4040:7751" name="variant=outline, size=m, state=disabled" x="444.5" y="202" width="36" height="36" />
        <symbol id="4040:7755" name="variant=outline, size=m, state=hover &amp; active" x="444.5" y="114" width="36" height="36" />
        <symbol id="4040:7759" name="variant=outline, size=m, state=focus" x="444.5" y="290" width="36" height="36" />
        <symbol id="4040:7763" name="variant=outline, size=s, state=default" x="446.5" y="466" width="32" height="32" />
        <symbol id="4040:7767" name="variant=outline, size=s, state=loading" x="446.5" y="818" width="32" height="32" />
        <symbol id="4040:7770" name="variant=outline, size=s, state=disabled" x="446.5" y="642" width="32" height="32" />
        <symbol id="4040:7774" name="variant=outline, size=s, state=hover &amp; active" x="446.5" y="554" width="32" height="32" />
        <symbol id="4040:7778" name="variant=outline, size=s, state=focus" x="446.5" y="730" width="32" height="32" />
        <symbol id="4040:7782" name="variant=outline, size=xs, state=default" x="450.5" y="910" width="24" height="24" />
        <symbol id="4040:7786" name="variant=outline, size=xs, state=loading" x="450.5" y="1265" width="24" height="24" />
        <symbol id="4040:7789" name="variant=outline, size=xs, state=disabled" x="450.5" y="1086" width="24" height="24" />
        <symbol id="4040:7793" name="variant=outline, size=xs, state=hover &amp; active" x="450.5" y="998" width="24" height="24" />
        <symbol id="4040:7797" name="variant=outline, size=xs, state=focus" x="450.5" y="1177" width="24" height="24" />
        <symbol id="4040:7801" name="variant=neutral, size=m, state=default" x="312" y="26" width="36" height="36" />
        <symbol id="4040:7805" name="variant=neutral, size=m, state=loading" x="312" y="378" width="36" height="36" />
        <symbol id="4040:7808" name="variant=neutral, size=m, state=disabled" x="312" y="202" width="36" height="36" />
        <symbol id="4040:7812" name="variant=neutral, size=m, state=hover &amp; active" x="312" y="114" width="36" height="36" />
        <symbol id="4040:7816" name="variant=neutral, size=m, state=focus" x="312" y="290" width="36" height="36" />
        <symbol id="4040:7820" name="variant=neutral, size=s, state=default" x="314" y="466" width="32" height="32" />
        <symbol id="4040:7824" name="variant=neutral, size=s, state=loading" x="314" y="818" width="32" height="32" />
        <symbol id="4040:7827" name="variant=neutral, size=s, state=disabled" x="314" y="642" width="32" height="32" />
        <symbol id="4040:7831" name="variant=neutral, size=s, state=hover &amp; active" x="314" y="554" width="32" height="32" />
        <symbol id="4040:7835" name="variant=neutral, size=s, state=focus" x="314" y="730" width="32" height="32" />
        <symbol id="4040:7839" name="variant=neutral, size=xs, state=default" x="318" y="910" width="24" height="24" />
        <symbol id="4040:7843" name="variant=neutral, size=xs, state=loading" x="318" y="1265" width="24" height="24" />
        <symbol id="4040:7846" name="variant=neutral, size=xs, state=disabled" x="318" y="1086" width="24" height="24" />
        <symbol id="4040:7850" name="variant=neutral, size=xs, state=hover &amp; active" x="318" y="998" width="24" height="24" />
        <symbol id="4040:7854" name="variant=neutral, size=xs, state=focus" x="318" y="1177" width="24" height="24" />
        <symbol id="4040:7858" name="variant=primary, size=m, state=default" x="48" y="26" width="36" height="36" />
        <symbol id="4179:12153" name="variant=secondary, size=m, state=default" x="179" y="26" width="36" height="36" />
        <symbol id="4040:7862" name="variant=primary, size=m, state=loading" x="48" y="378" width="36" height="36" />
        <symbol id="4179:12155" name="variant=secondary, size=m, state=loading" x="179" y="378" width="36" height="36" />
        <symbol id="4040:7865" name="variant=primary, size=m, state=disabled" x="48" y="202" width="36" height="36" />
        <symbol id="4179:12157" name="variant=secondary, size=m, state=disabled" x="179" y="202" width="36" height="36" />
        <symbol id="4040:7869" name="variant=primary, size=m, state=hover &amp; active" x="48" y="114" width="36" height="36" />
        <symbol id="4179:12159" name="variant=secondary, size=m, state=hover &amp; active" x="179" y="113" width="36" height="36" />
        <symbol id="4040:7873" name="variant=primary, size=m, state=focus" x="48" y="290" width="36" height="36" />
        <symbol id="4179:12161" name="variant=secondary, size=m, state=focus" x="179" y="290" width="36" height="36" />
        <symbol id="4040:7877" name="variant=primary, size=s, state=default" x="50" y="466" width="32" height="32" />
        <symbol id="4179:12163" name="variant=secondary, size=s, state=default" x="181" y="466" width="32" height="32" />
        <symbol id="4040:7881" name="variant=primary, size=s, state=loading" x="50" y="818" width="32" height="32" />
        <symbol id="4179:12165" name="variant=secondary, size=s, state=loading" x="181" y="818" width="32" height="32" />
        <symbol id="4040:7884" name="variant=primary, size=s, state=disabled" x="50" y="642" width="32" height="32" />
        <symbol id="4179:12167" name="variant=secondary, size=s, state=disabled" x="181" y="642" width="32" height="32" />
        <symbol id="4040:7888" name="variant=primary, size=s, state=hover &amp; active" x="50" y="554" width="32" height="32" />
        <symbol id="4179:12169" name="variant=secondary, size=s, state=hover &amp; active" x="181" y="554" width="32" height="32" />
        <symbol id="4040:7892" name="variant=primary, size=s, state=focus" x="50" y="730" width="32" height="32" />
        <symbol id="4179:12171" name="variant=secondary, size=s, state=focus" x="181" y="730" width="32" height="32" />
        <symbol id="4040:7896" name="variant=primary, size=xs, state=default" x="54" y="910" width="24" height="24" />
        <symbol id="4179:12173" name="variant=secondary, size=xs, state=default" x="185" y="910" width="24" height="24" />
        <symbol id="4040:7900" name="variant=primary, size=xs, state=loading" x="54" y="1265" width="24" height="24" />
        <symbol id="4179:12175" name="variant=secondary, size=xs, state=loading" x="185" y="1265" width="24" height="24" />
        <symbol id="4040:7903" name="variant=primary, size=xs, state=disabled" x="54" y="1086" width="24" height="24" />
        <symbol id="4179:12177" name="variant=secondary, size=xs, state=disabled" x="185" y="1086" width="24" height="24" />
        <symbol id="4040:7907" name="variant=primary, size=xs, state=hover &amp; active" x="54" y="998" width="24" height="24" />
        <symbol id="4179:12179" name="variant=secondary, size=xs, state=hover &amp; active" x="185" y="998" width="24" height="24" />
        <symbol id="4040:7911" name="variant=primary, size=xs, state=focus" x="54" y="1177" width="24" height="24" />
        <symbol id="4179:12181" name="variant=secondary, size=xs, state=focus" x="185" y="1177" width="24" height="24" />
      </frame>
    </frame>
    <text id="4035:4389" name="Content" x="64" y="2894" width="951" height="30" />
    <symbol id="4035:13385" name=".spinner" x="64" y="2988" width="16" height="16" />
    <text id="4119:21816" name="Content" x="64" y="3068" width="951" height="30" />
    <frame id="4119:21462" name="Content" x="64" y="3162" width="514" height="216">
      <frame id="4119:21463" name="Section" x="0" y="0" width="514" height="216">
        <frame id="4119:21464" name="Row" x="0" y="0" width="514" height="36">
          <instance id="4119:21465" name="button" x="0" y="0" width="177" height="36" />
          <instance id="4138:14978" name="button" x="201" y="0" width="130" height="36" />
          <instance id="4119:21466" name="button" x="355" y="0" width="159" height="36" />
        </frame>
        <frame id="4119:21467" name="Row" x="0" y="60" width="213" height="36">
          <instance id="4119:21468" name="button" x="0" y="0" width="92" height="36" />
          <instance id="4119:21469" name="button" x="116" y="0" width="97" height="36" />
        </frame>
        <frame id="4119:21475" name="Row" x="0" y="120" width="236" height="36">
          <instance id="4119:21476" name="button" x="0" y="0" width="106" height="36" />
          <instance id="4119:21477" name="button" x="130" y="0" width="106" height="36" />
        </frame>
        <frame id="4120:8323" name="Row" x="0" y="180" width="96" height="36">
          <instance id="4120:8324" name="icon button" x="0" y="0" width="36" height="36" />
          <instance id="4120:8325" name="icon button" x="60" y="0" width="36" height="36" />
        </frame>
      </frame>
    </frame>
    <frame id="8733:12506" name="Description" x="64" y="3442" width="951" height="94">
      <text id="8733:12507" name="Content" x="0" y="0" width="951" height="30" />
      <text id="8733:12508" name="Heading" x="0" y="46" width="951" height="48" />
    </frame>
    <frame id="8733:13465" name="Row" x="64" y="3600" width="294" height="90">
      <instance id="8733:13513" name="tooltip" x="-36" y="0" width="200" height="44" />
      <instance id="8733:13517" name="tooltip" x="199" y="58" width="95" height="28" />
      <instance id="8733:13467" name="button" x="0" y="54" width="130" height="36" />
      <instance id="8733:13509" name="icon button" x="154" y="54" width="36" height="36" />
    </frame>
  </frame>
</frame>
```
