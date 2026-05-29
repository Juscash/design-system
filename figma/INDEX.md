# Figma — Dump local do Design System Juscash

Snapshot offline de **todas** as chamadas necessárias ao Figma MCP (`get_metadata`, `get_design_context`, `get_variable_defs`) para implementar a biblioteca sem reabrir o Figma. Tudo que aparecia em `http://localhost:3845/assets/<hash>` foi baixado em `./assets/` e os caminhos nos arquivos foram reescritos para `../../assets/<hash>` (`./assets/<hash>` na raiz).

**Arquivo Figma:** `T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash`

## Estrutura

```
figma/
├── INDEX.md                # este arquivo
├── assets/                 # 155 arquivos locais (59 SVGs Lucide nomeados + 93 hashes + 3 PNGs). Ver assets/README.md.
├── pages/                  # metadata das páginas do Figma
│   ├── 0-0-doc-root-metadata.json
│   ├── introducao-0-1-metadata.md
│   ├── 4035-1030-componentes-metadata.json
│   ├── 4035-1030-componentes-variables.md
│   ├── 4247-12021-componentes-internos-metadata.md
│   └── componentes-internos-design-context-4041-12783.md
├── fundamentos/            # tipografia, cores, espaçamento, etc.
│   ├── 3-3-metadata-full.json
│   ├── 3-3-variables.md
│   ├── tipografia/, espacamento/, bordas/, sombras/, breakpoints/
│   ├── cores/, container/, aspect-ratio/, icones/, logotipo/
└── components/             # 1 pasta por componente da página Componentes
    ├── alert/, avatar/, avatar-menu/, back-to-top/, badge/, breadcrumb/
    ├── button/, card/, carousel/, charts/, checkbox/, collapse/
    ├── confirm-modal/, date-picker/, drawer/, empty-state/
    ├── form-item/, input/, input-chips/, kpi-card/, loading/
    ├── menu-combobox/, modal/, multiselect/, navbar/, navigation-menu/
    ├── notification/, page-header/, pagination/, popover/, progress/
    ├── radio/, range-picker/, scroll-area/, search-bar/, segmented/
    ├── select/, separator/, sidebar/, skeleton/, slider/, switch/
    ├── table/, tabs/, tag/, textarea/, toggle-group/, tooltip/
    └── typography/ (redirect → fundamentos/tipografia), upload/
```

## Tipos de arquivo

- **`design-context-<id>.md`** — saída de `get_design_context` (TSX gerado pelo Figma, convertido para markdown com explicações). Quando o componente é muito grande, vai como `.json` (bruto) ou um par de `.md` resumido + `.json` integral.
- **`sparse-metadata-<id>.md`** — quando o design ultrapassa o limite de contexto, o Figma retorna metadata estruturado (XML-like) listando IDs dos sub-frames. Útil para drill-down posterior.
- **`variables-<id>.md`** — saída de `get_variable_defs` (tokens visíveis no escopo do frame).
- **`*-metadata.json`** / **`*-metadata.md`** — saída de `get_metadata` (estrutura completa do frame, sem renderização).

## Nomeclatura

Slug das pastas é o nome do componente em kebab-case-pt-BR (mesma da Storybook). Quando há divergência (ex.: a página é chamada `Tipografia` no Figma e `Typography` no DS), criamos uma pasta-redirect.

## Componentes internos vs públicos

Algumas pastas (`tag/`, `form-item/`, `page-header/`) referenciam **símbolos internos do Figma** (página `Componentes internos`, 4247:12021). Cada arquivo dessa pasta deixa explícito que **não é um componente público do DS**. O equivalente público (quando existir):
- `tag` → use **Badge** (4061:13095).
- `form-item` → use **antd Form / Form.Item** (re-exportado pelo barrel).
- `page-header` → existe componente público em `8220:10535` (`page-header/design-context-8220-10535.md`); o `.component page header` (4001:213) só é usado dentro do próprio Figma.

## Como usar este dump

1. Para implementar um componente, abra `components/<slug>/design-context-*.md`. Quando houver `variables-*.md`, leia também para mapear tokens.
2. Para descobrir tokens base (cores, spacing, radius, shadow, breakpoints, tipografia), abra `fundamentos/<tópico>/design-context-*.md`.
3. Os assets (logo, ícones, ilustrações) estão em `./assets/<hash>.<ext>`. Os caminhos nos `.md`/`.json` já apontam para esses arquivos via path relativo.
4. Se um sub-frame estiver listado em `sparse-metadata-*.md` e for relevante, use o id (`<frame-id>`) para chamar `get_design_context` num próximo dump (e arquivar ao lado).

## Cobertura

✅ Todos os 49 componentes da página Componentes (alguns em `.json` integral quando excedem o limite de contexto).
✅ Todos os Fundamentos: Tipografia, Cores, Espaçamento, Bordas, Sombras, Breakpoints, Container, Aspect Ratio, Logotipo, Ícones.
✅ Página Componentes internos (helpers do Figma).
✅ Metadata raiz do documento (lista todas as páginas/canvas).
✅ 155 assets baixados localmente; 0 URLs `localhost:3845` restantes nos `.md`/`.json`.
✅ 59 ícones Lucide React renomeados para `<icon-name>.svg` (chevron-down, bell, palette, heart, etc.). Mapping em `.icon-map.json`, lista de renames em `.icon-renames.json`, índice legível em `assets/README.md`.

## O que **não** está coberto

- **Tag** e **Form item** como componentes públicos: não existem na página Componentes do Figma (os únicos matches foram `.tag` interno e `.form exemple` em outro frame). Na implementação use **Badge** e **antd Form** respectivamente.
- **Componentes específicos da página Componentes internos** (Slot, Quote, .px, arrow, notes handoff) — são apenas helpers do próprio Figma e estão documentados no `pages/componentes-internos-design-context-4041-12783.md` para referência.
