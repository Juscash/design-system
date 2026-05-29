# Figma — Avatar menu (`4146:14349`) — get_design_context

> Avatar menu **não tem página própria** em Componentes — é uma seção dentro da página **Avatar** (`4080:9746`). Fica documentado aqui por ser um símbolo reutilizado (navbar, header).

## Estrutura

```tsx
const imgAvatarBg = "../../assets/img-bg-40x40-gray-200.svg";
const imgAvatarSmallInitials = "../../assets/img-bg-32x32-gray-200.svg";
const imgIconChevronDown = "../../assets/chevron-down.svg";
const imgIconChevronUp = "../../assets/chevron-up.svg";

type AvatarMenuProps = {
  className?: string;
  state?: "default" | "focus" | "ative";
};
```

Layout: `flex gap-[4px] items-center` — avatar 32×32 + chevron 16×16.

## Variantes (3 states)

| state | Node-id | Visual |
|---|---|---|
| **default** (4146:14348) | 4146:14348 | Avatar small (32×32, initials "CN" Inter Bold 13 cor `text/dark`) + `icon/chevron-down` 16×16. |
| **focus** (4146:14362) | 4146:14362 | Mesmo conteúdo, mas o container ganha bg `color/neutral/50` (#fafafa) + `rounded-full` 9999 + `box-shadow` `focus` (0 0 0 3px `color/neutral/300` #d4d4d4) + overflow-clip. |
| **ative** (4146:14356) | 4146:14356 | Avatar small + `icon/chevron-up` 16×16 (indica menu aberto). |

## Avatar (subcomponente, 4146:14272 etc.)

Avatar matriz interna usada aqui é a `size=small, roundness=round, fill=initials` (4146:14277): 32×32 com bg PNG + iniciais Inter Bold 13 cor `text/dark`. Variantes completas do Avatar estão em `../../components/avatar/design-context-4080-9746.md` (12 variants: fill {initials/icon/picture} × size {regular/small} × roundness {round/roundrect}).

## Tokens (variables-4146-14349.md)

| Token | Valor |
|---|---|
| `color/neutral/50` | `#fafafa` (bg state=focus) |
| `color/neutral/200` | `#e5e5e5` |
| `color/neutral/300` | `#d4d4d4` (shadow focus) |
| `color/text/dark` | `#262626` (iniciais) |
| `radius/full` | `9999` |
| `focus` | DROP_SHADOW color `color/neutral/300`, (0,0), 0, 3 |
| `body/02 - 13px` | Inter Regular 13 / 1.2 / 0 (iniciais Inter Bold 13) |

## Exemplos no Figma

- Dentro de **Avatar** page (`4080:9746` → Component `4146:14376`): matriz 3 states em Primary.
- Dentro de **Navbar** (`4146:12875`): instanciado no canto direito do topbar, ao lado do botão de notificação.
- Tooltip exemple (8735:14365): avatar menu + tooltip companion 200×44.

## Comportamento esperado

- Clique abre dropdown (menu/combobox) com itens de usuário (perfil, configurações, logout).
- `state="ative"` reflete `open=true`; chevron-down→chevron-up.
- Foco por teclado → state=focus (anel `focus` 3px).
- Em navbar mobile o avatar perde o chevron (ver `../../components/navbar/`).
