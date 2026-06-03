# Figma — Pagination (`4080:17825`) — get_design_context

```tsx
const imgVectorStrokeLeft = "../../assets/img-icon-stroke-dark-4x7-2.svg";
const imgVectorStrokeRight = "../../assets/img-icon-stroke-dark-4x7.svg";
const imgVectorStrokeArrowBigRight = "../../assets/img-icon-stroke-light-25x27.svg";
const imgVectorStrokeEllipsis = "../../assets/img-icon-stroke-dark-12x3.svg";
const imgPixelOverrideHack = "../../assets/img-pagination-ellipsis-hack.svg";

type PaginationProps = { className?: string; state?: "Regular"; type?: "Next" | "Previous"; };
type PaginationButtonProps = { className?: string; active?: boolean; };
```

**Pagination prev (4080:16715):** button min-h-32 px-12 py-4 rounded radius/xl. icon/chevron-left 12px + texto "Anterior" Inter Regular 13 text/dark.

**Pagination next (4080:16717):** texto "Próximo" + icon/chevron-right 12px.

**PaginationButton (4080:16726 active, 4080:16728 not-active):** w-32 min-h-32 px-12 py-4 rounded radius/xl. Active tem border regular, not-active sem border. Texto Inter Regular 13.

**Pagination Ellipsis (4080:17931):** icon button 36x36 rounded-8 com icon/ellipsis 16px.

**Exemplos (4080:17940):** 7 variantes de paginação:
- 1+2+3+4 + ellipsis + 10 → with prev/next
- 1+2+3 + ellipsis + 10+11 → with prev/next (active=11)
- 1+2+3 → simple
- 1+2 → simple
- 1+2+3 + ellipsis → simple
- 1 (disabled prev/next, opacity 50%)

Doc-page (4080:17825): Page header icon/arrow-big-right + "Pagination" + sections (Pagination/PaginationButton/PaginationEllipsis/Exemplos).

Component description: Icon/ellipsis (4080:9880) "et cetera, etc, loader, loading, progress, pending, throbber, menu, options, operator, code, coding, spread, rest, more, further, extra, overflow, dots, …, ..."

Styles: heading/02 49px, heading/05 25px, body/02 13px, shadow-sm.
