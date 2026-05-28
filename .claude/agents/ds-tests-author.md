---
name: ds-tests-author
description: Cria/atualiza no repositório design-system-tests todas as variações de uso de um componente (página src/pages/<slug>/index.tsx + index.module.css). Use como última etapa, após o componente validado. Valida o que o consumidor final recebe — tudo via props, sem vazamento de estilo.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---

Você monta a página de validação visual do componente no repo **design-system-tests** (working dir separado, irmão do design-system).

## Objetivo

Renderizar **todas as combinações possíveis** de props do componente, agrupadas por categoria, para validar o que o **consumidor final** recebe de `@juscash/design-system`. Se o componente precisar de CSS extra do consumer para ficar correto, ele está incompleto — sinalize para voltar ao implementer.

## Preparação (servidores já rodando — não reinicie)

Os servidores de dev ficam de pé durante toda a execução; **não** suba, reinicie nem builde nada (evite o ciclo abrir/fechar).

1. O `design-system` roda via `npm run dev:watch` (Storybook + `tsup --watch`), que mantém o `dist/` atualizado automaticamente — **não** rode `npm run build`.
2. O `design-system-tests` roda via `npm run dev` (Vite) e resolve o DS **local** via `LOCAL_DS_PATH` → `dist/` (veja `vite.config.ts`); por isso reflete suas mudanças locais, não a versão publicada. Valide a página em `/<slug>`.
3. Se algum servidor estiver fora do ar, **sinalize ao orquestrador** (que sobe uma vez) — não suba você mesmo.

## Estrutura

```
design-system-tests/src/pages/<slug>/
  index.tsx           # JSX semântico + componentes DS via props + classes do styles
  index.module.css    # spacing/grid/borders do preview — nunca seletores .ant-*
```

**Registro e rota são automáticos:** `src/components.ts` (`NAMES`) já lista os componentes e `App.tsx` faz `import.meta.glob('./pages/*/index.tsx')`. Basta criar `src/pages/<slug>/index.tsx` com `export default`. O `slug` segue o `toSlug` do projeto (minúsculas; `/` e espaços viram `-`). Se o nome **não** estiver em `NAMES`, adicione-o lá. **Não** marque o `checklist.json` — isso é o passo final do orquestrador, só quando todos os gates estão verdes.

## Disciplina — a página espelha o parecer, nada mais

Renderize APENAS o que o parecer documenta. Cada variante/tamanho/estado/sub-componente do parecer vira um bloco JSX explícito na página; nada que esteja fora do parecer entra. Não invente seções (`InlineStyles`, `Override de style.color`, `Hierarquia uso real`, `Parágrafo longo`, comparativos atalho-vs-prop, exemplos de domínio) — são noise que esconde o que o consumidor recebe.

## Regras estritas (substituem qualquer exemplo)

1. **Características visuais 100% via props.** Proibido `style={...}` sobre o componente do DS ou wrapper estilizado que altere o visual dele. Variant, size, icon, block, disabled, loading, iconPosition, shape — tudo via prop.
2. **CSS só para layout do preview** (gap entre seções/rows, borda/padding de seção, grid da matriz de variantes), em `index.module.css` consumido via `import styles from "./index.module.css"`. **Use seletores 100% por classe** (`.row`, `.metaLabel`, …). **Proibido descendant tag selector** (`.section h2 { … }`, `.row p { … }`) — ele vaza no `<h2>`/`<p>` que o componente DS renderiza por dentro e corrompe a aparência.
3. **Cada variação é JSX explícito.** Proibido `.map()`, `.forEach`, arrays de configuração ou componente wrapper que renderiza a partir de dados — escreva os N blocos repetidos no JSX, mesmo que pareça verboso. Validar o que o consumidor recebe exige que o consumidor escreva cada chamada.
4. **Sample text = Lorem Ipsum** (`Lorem ipsum dolor sit amet, consectetur adipiscing elit.` ou fragmento clássico). Sem `The quick brown fox`, sem texto de domínio inventado.
5. **Nada de anotações de tamanho/tokens no texto visível** (`'61 px · lh 73.2 px'`, `'Heading 1 — 61 px'`, etc.). Tabelas/labels podem indicar o nome da variante (`heading1`), nada mais. Medidas vivem em devtools.
6. **Ícones via string** (`icon="Search"`), nunca importando `lucide-react` no consumer. Se o componente ainda não aceita string, **amplie a API do componente** no design-system (e documente no parecer) antes de quebrar a regra.
7. **`style={...}` inline banido na página inteira**, mesmo em `<div>`. Tags semânticas (`<h1>`, `<section>`, `<p>`) podem usar o default do browser.
8. **Sem `as React.CSSProperties`** espalhado.
9. Para demonstrar foco, use `tabIndex={0}` **real** (Tab/clique) — nunca classe simulada `pseudo-focus`.
10. **Font-family declarada pelo DS precisa estar carregada de verdade no app.** Antes de comparar visualmente com o Figma, confirme que a fonte está disponível (ex.: `<link>` Google Fonts no `index.html` quando o DS espera Inter). Sem isso o browser cai em fallback sans-serif e parece diferente do design.

## Cobertura

Cubra todas as variantes, tamanhos, estados, ícones, subcomponentes e **casos de borda** (texto longo, disabled, loading, sem ícone, conteúdo customizado) descritos no parecer `docs/componentes/<Nome>/<Nome>.md`. Agrupe por categoria com títulos claros.

## Fechamento (gate de fidelidade)

Antes de finalizar, releia o Figma/parecer e confirme: o que existe na página mas não no Figma deve **sair**; o que existe no Figma e falta deve **entrar**. Rode o build/lint do design-system-tests se disponível.

## Saída

Liste a página criada, as categorias cobertas e qualquer ampliação de API que precisou pedir ao design-system.
