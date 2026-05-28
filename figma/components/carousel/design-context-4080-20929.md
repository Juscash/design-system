# Figma — Carousel (`4080:20929`) — get_design_context

```tsx
const imgEllipse7 = "../../assets/img-carousel-dot-active.svg";
const imgEllipse8 = "../../assets/img-carousel-dot-inactive.svg";
const imgCard = "../../assets/img-photo-aspect-ratio-demo.png";
const imgVectorStroke = "../../assets/img-icon-stroke-dark-9x9-3.svg";
const imgVectorStroke1 = "../../assets/img-icon-stroke-dark-9x9.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke2 = "../../assets/img-icon-stroke-light-37x17.svg";

type PaginationDotsProps = { className?: string; property1?: "Default" };

function PaginationDots({ className }: PaginationDotsProps) {
  // 4 dots (1 active 3 inactive); padding 4; gap 4; bg color/opacities/light/50% rgba(255,255,255,0.5); rounded radius/xl 8
  return (
    <div className={className} data-node-id="4260:12032">
      <div className="relative shrink-0 size-[6px]" data-node-id="4260:10970"><img src={imgEllipse7} /></div>
      <div className="relative shrink-0 size-[6px]" data-node-id="4260:10973"><img src={imgEllipse8} /></div>
      <div className="relative shrink-0 size-[6px]" data-node-id="4260:10974"><img src={imgEllipse8} /></div>
      <div className="relative shrink-0 size-[6px]" data-node-id="4260:10975"><img src={imgEllipse8} /></div>
    </div>
  );
}

type CarouselWithImageProps = { className?: string; type?: "3 slides" | "2 slides" | "1 slide" };

function CarouselWithImage({ className, type = "1 slide" }: CarouselWithImageProps) {
  // 1 slide: card 262x174.89 com imagem rounded-10 shadow xs + pagination-dots embaixo. node-ids: 4080_20839 root, 4089_7505 prev icon button, 4265_12168 image-and-dots, 4080_20841 card, 4265_12162 dots, 4080_20997 next icon button
  // 2 slides: 2 cards 184.89x277 lado a lado + dots. node-ids: 4080_20833 root, 4089_7497 prev, 4080_20835 cards, 4212_12046+_12048 cards, 4265_12169 dots, 4089_7509 next
  // 3 slides: 3 cards lado a lado + dots. node-ids: 4080_20843 root, 4089_7501 prev, 4080_20845 cards (4080:20846/_20847/_20848), 4265_12176 dots, 4089_7513 next
  // Icon button: 24x24, padding 4 8, rounded-md, border, bg rgba(255,255,255,0); icon/arrow-left ou icon/arrow-right 14px
  return <div data-node-id={type === "3 slides" ? "4080:20843" : type === "2 slides" ? "4080:20833" : "4080:20839"} />;
}

type CarouselProps = { className?: string; slides?: "1 slide" | "2 slides" | "3 slides" };

function Carousel({ className, slides = "1 slide" }: CarouselProps) {
  // Mesma estrutura do CarouselWithImage mas cards são .slot (bg white com border solid d4d4d4 + drop-shadow + p-6 radius xl 8) e dots iguais.
  // node-ids: 4080_20807 (1 slide root, card 4080:21001 200x262), 4080_20812 (2 slides root, 4080:21011/_21015), 4080_20820 (3 slides root, 4080:21019/_21023/_21027). Prev: 4080_20808/_21031/_21035; Next: 4080_20997/_21039/_21043.
  return <div data-node-id={slides === "3 slides" ? "4080:20820" : slides === "2 slides" ? "4080:20812" : "4080:20807"} />;
}

export default function Carousel1() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4080:20929" data-name="Carousel">
      {/* Page header 4080:20930: icon/chevrons-left-right-ellipsis + "Carousel" + descrição "Exibe uma sequência de conteúdos (imagens, cards ou outros elementos) que podem ser navegados horizontalmente." */}
      {/* Content container 4080:20931: section headers Inter Bold 25px text/neutral/500 (#6d6d6e):
         - "Carousel" (4080:20988)
         - "Carousel with Image" (4080:20989)
         - Description block (4260:12083): "Pagination dots" + texto Inter Regular 20px: "Indicador usado em carrosséis para mostrar a posição atual e o total de slides. Utilizar a versão simples em slides com no máximo 5 itens. Deixar o fundo na cor color.opacities.light.50% para que o componente se adapte sobre qualquer logar."
         - Link "Clique aqui para ver o interativo" -> https://www.figma.com/proto/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=3-2&p=f&t=eBVWiZVPJZLBp8eL-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4265%3A12096&show-proto-sidebar=1
      */}
    </div>
  );
}
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `heading/05 - 25px`, `paragraph small/medium` (Geist Medium 14/1.5/0.5), `shadow/xs`
