# Figma — Breadcrumb (`4080:20126`) — get_design_context

```tsx
const imgVectorStroke = "../../assets/img-icon-stroke-soft-12x3.svg";
const imgVectorStroke1 = "../../assets/img-icon-stroke-dark-12x3-2.svg";
const imgVectorStroke2 = "../../assets/img-icon-stroke-soft-5x9.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke3 = "../../assets/img-icon-stroke-light-33x37.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type BreadcrumbItensProps = {
  className?: string;
  states?: "default" | "hover" | "selected" | "focus";
  type?: "default" | "ellipsis";
};

/*
  Item do breadcrumb. Variantes:
  - type ∈ {default, ellipsis}
  - states ∈ {default, hover, selected, focus}
  - node-ids: default=6118:8777, hover=6118:8776, selected=6118:8775, focus=8340:10565 (focus aplica radius/md 4 + shadow focus)
  - Ellipsis variants: default=8116:9464, hover=8116:9469, selected=8116:9472, focus=8340:10567 (focus envelope com bg neutral/50, radius/md, shadow focus)
  - Texto default/focus: Inter Regular 13px text/text/soft (#6d6d6e)
  - Texto hover: Inter Regular 13px com underline + cor #262626
  - Texto selected: Inter Bold 13px text/text/dark (#262626)
  - Icon ellipsis: 16x16 inset 41.67% 12.5%
*/

function Breadcrumb({ className }: { className?: string }) {
  // Breadcrumb completo (4080:20394, gap 8px, h 36px, px 12px):
  // text "Home" (soft) + icon/chevron-right 16 (4080:20396) + icon/ellipsis 16 (4080:20526) + chevron-right (4080:20505) + "Components" (soft) + chevron-right (4080:20502) + "Breadcrumb" (bold, dark)
  return <div data-node-id="4080:20394" />;
}

export default function Breadcrumb1() {
  return (
    <div data-node-id="4080:20126" data-name="Breadcrumb">
      {/* Page header 4080:20127: icon/footprints 40px + "Breadcrumb" + "Mostra o caminho de navegação dentro do sistema, indicando a localização atual do usuário." */}
      {/* Component 8340:10454: 8 rows com states Default/Hover/Focus/Active (×2 sections: default type + ellipsis type) */}
      {/* Description 4148:11141: "Quando usar — Use o breadcrumb em interfaces com múltiplos níveis de navegação (ex.: Categoria → Subcategoria → Página) para indicar ao usuário onde ele está na hierarquia de páginas e permitir retorno rápido a níveis anteriores." */}
      {/* Exemplos 6903:8830 com Breadcrumb + popover menu/combobox 6903:8791 (Page 1, Page 2) */}
      {/* Tooltip support: 8735:14694 com tooltip 200x44 "Lorem ipsum dolor sit amet, consectetur adipiscing elit." */}
    </div>
  );
}
```

## Styles
- `heading/02 - 49px`, `heading/06 - 20px`, `body/02 - 13px`, `focus`, `heading/05 - 25px`, `shadow/m`
- Component descriptions: menu/combobox (4066:2716) "Popup, Popover"
