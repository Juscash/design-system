# Figma — `.component page header` (`4001:213`) — get_design_context

> Page header **canônico** usado por **todas as páginas de Componentes** (Button, Card, Modal, etc.) e Fundamentos. É um símbolo interno do Figma (não componente público); na biblioteca do consumidor, o equivalente é `PageHeader` (componente já mapeado em `figma/components/page-header/`).

## Estrutura

```tsx
const imgLogoWhite = "../../assets/img-logo-juscash-white.png";
const imgIconPaletteVector = "../../assets/palette.svg";
const imgIconPaletteStroke = "../../assets/img-icon-stroke-light-37x37-3.svg";

type ComponentPageHeaderProps = {
  className?: string;
  showDescription?: boolean;
};

function ComponentPageHeader({ className, showDescription = true }) {
  return (
    <div className={className || "bg-[var(--color/neutral/700,#404040)] flex flex-col gap-[48px] items-start p-[32px] rounded-tl-[32px] rounded-tr-[32px] w-[1680px]"}>
      {/* Logo Juscash white 113.863×20 */}
      <div className="h-[20px] w-[113.863px]" data-name="$eehd9xsz19k 1">
        <img src={imgLogoWhite} />
      </div>

      {/* icon/title/description */}
      <div className="flex flex-col gap-[16px] items-start w-full" data-name="icon/title/description">
        <div className="flex gap-[16px] items-center w-[1616px]" data-name="icon/title">
          {/* icon 40×40 (padrão: icon/palette; cada página override com seu icon) */}
          <div className="size-[40px]" data-name="icon/palette">
            <img src={imgIconPaletteVector} />
            <img src={imgIconPaletteStroke} />
          </div>
          <p className="font-['Inter:Bold'] text-[49px] text-[color:var(--color/neutral/50,#fafafa)]">Título</p>
        </div>
        {showDescription && (
          <div className="flex items-center justify-center pl-[56px] w-full" data-name="description">
            <p className="font-['Inter:Regular'] text-[20px] text-[color:var(--color/neutral/50,#fafafa)]">Description</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Tokens consumidos

- **Background:** `color/neutral/700` (#404040)
- **Logo:** PNG raster Juscash white (asset `img-logo-juscash-white.png`), tamanho 113.863×20px
- **Icon:** 40×40 (cada página customiza — `icon/palette`, `icon/message-square`, `icon/chart-pie`, `icon/upload`, etc.)
- **Título:** Inter Bold 49 (`heading/02`), cor `color/neutral/50` (#fafafa)
- **Descrição:** Inter Regular 20 (`heading/06`), cor `color/neutral/50`, padding-left 56 (alinhada após o icon 40 + gap 16)

## Geometria

- Padding 32 (`spacing.8`)
- gap entre logo / icon-title / description = 48 (`spacing.12`)
- rounded-top 32 (radius proprietário do header)
- width canônico do frame de docs = 1680px (ajustável no consumo)

Styles: heading/02 49px, heading/06 20px.
