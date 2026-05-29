# Figma — Button (`4035:4131`) — get_design_context (sparse metadata)

> O nó é grande demais para o limite de contexto. Retornou **metadata esparsa**. Para implementação completa, drillar nos sub-frames listados abaixo (uma chamada `get_design_context` por sub-node).

## Estrutura

```xml
<frame id="4035:4131" name="Button" x="-4157" y="-59" width="1079" height="3945">
  <instance id="4035:4132" name="Page header" x="0" y="0" width="1079" height="191" />
  <frame id="4035:4133" name="Content container" x="0" y="191" width="1079" height="3754">

    <!-- Bloco 1: button textual (1351px) -->
    <frame id="4035:5188" name="Component" x="64" y="64" width="951" height="1351">
      <frame id="4035:5189" name="Grid" .../>
      <frame id="4035:5213" name="Meta" .../>  <!-- Sections para size: m, s, xs com states Default/Hover &amp; Active/Disabled/Focus/Loading -->
      <frame id="4035:5245" name="Meta" .../>  <!-- Variantes em row: Primary | Secondary | Neutral | Outline | Ghost | Destructive -->
      <frame id="4035:5251" name="button" x="153" y="31" width="798" height="1320">
        <!-- 90 sub-symbols: 6 variants × 3 sizes × 5 states -->
        <!-- destructive m default/loading/disabled/hover&active/focus = 4035:5252/_12330/_5260/_5268/_5276 -->
        <!-- destructive s default/loading/disabled/hover&active/focus = 4035:5316/_12894/_5324/_5332/_5340 -->
        <!-- destructive xs default/loading/disabled/hover&active/focus = 4035:5348/_13225/_5356/_5364/_5372 -->
        <!-- ghost m default/loading/disabled/hover&active/focus = 4035:5380/_12338/_5388/_5396/_5404 -->
        <!-- ghost s default/loading/disabled/hover&active/focus = 4035:5444/_12902/_5452/_5460/_5468 -->
        <!-- ghost xs default/loading/disabled/hover&active/focus = 4035:5476/_13233/_5484/_5492/_5500 -->
        <!-- outline m default/loading/disabled/hover&active/focus = 4035:5508/_12346/_5516/_5524/_5532 -->
        <!-- outline s default/loading/disabled/hover&active/focus = 4035:5572/_12910/_5580/_5588/_5596 -->
        <!-- outline xs default/loading/disabled/hover&active/focus = 4035:5604/_13241/_5612/_5620/_5628 -->
        <!-- neutral m default/loading/disabled/hover&active/focus = 4035:5636/_12354/_5644/_5652/_5660 -->
        <!-- neutral s default/loading/disabled/hover&active/focus = 4035:5700/_12918/_5708/_5716/_5724 -->
        <!-- neutral xs default/loading/disabled/hover&active/focus = 4035:5732/_13249/_5740/_5748/_5756 -->
        <!-- primary m default/loading/disabled/hover&active/focus = 4035:5764/_12362/_5772/_5780/_5788 -->
        <!-- primary s default/loading/disabled/hover&active/focus = 4035:5828/_12926/_5836/_5844/_5852 -->
        <!-- primary xs default/loading/disabled/hover&active/focus = 4035:5860/_13257/_5868/_5876/_5884 -->
        <!-- secondary m default/loading/disabled/hover&active/focus = 4176:11969/_11973/_11975/_11979/_11983 -->
        <!-- secondary s default/loading/disabled/hover&active/focus = 4176:11987/_11991/_11993/_11997/_12001 -->
        <!-- secondary xs default/loading/disabled/hover&active/focus = 4176:12005/_12009/_12011/_12015/_12019 -->
      </frame>
    </frame>

    <!-- Bloco 2: icon button (1351px) -->
    <frame id="4040:7571" name="Component" x="64" y="1479" width="941" height="1351">
      <frame id="4040:7572" name="Grid" .../>
      <frame id="4040:7595" name="Meta" .../>
      <frame id="4040:7623" name="Meta" .../>
      <frame id="4040:7629" name="icon button" x="153" y="31" width="788" height="1320">
        <!-- 90 sub-symbols: 6 variants × 3 sizes × 5 states -->
        <!-- destructive m default/loading/disabled/hover&active/focus = 4040:7630/_7634/_7637/_7641/_7645 -->
        <!-- destructive s ... = 4040:7649/_7653/_7656/_7660/_7664 -->
        <!-- destructive xs ... = 4040:7668/_7672/_7675/_7679/_7683 -->
        <!-- ghost m/s/xs ... = 4040:7687/.../7740 -->
        <!-- outline m/s/xs ... = 4040:7744/.../7797 -->
        <!-- neutral m/s/xs ... = 4040:7801/.../7854 -->
        <!-- primary m/s/xs ... = 4040:7858/.../7911 -->
        <!-- secondary m/s/xs ... = 4179:12153/.../12181 -->
      </frame>
    </frame>

    <text id="4035:4389" name="Content" x="64" y="2894" width="951" height="30" />
    <symbol id="4035:13385" name=".spinner" x="64" y="2988" width="16" height="16" />
    <text id="4119:21816" name="Content" x="64" y="3068" width="951" height="30" />

    <!-- Exemplos de uso -->
    <frame id="4119:21462" name="Content" x="64" y="3162" width="514" height="216">
      <frame id="4119:21463" name="Section">
        <frame id="4119:21464" name="Row"> <!-- 3 botões: 4119:21465, 4138:14978, 4119:21466 -->
        <frame id="4119:21467" name="Row"> <!-- 2 botões: 4119:21468 (92px), 4119:21469 (97px) -->
        <frame id="4119:21475" name="Row"> <!-- 2 botões: 4119:21476 (106px), 4119:21477 (106px) -->
        <frame id="4120:8323" name="Row"> <!-- 2 icon buttons: 4120:8324 (36x36), 4120:8325 (36x36) -->
      </frame>
    </frame>

    <frame id="8733:12506" name="Description"> <!-- "Heading" + "Content" -->
    </frame>
    <frame id="8733:13465" name="Row"> <!-- tooltip 8733:13513 (200x44) e 8733:13517 (95x28), button 8733:13467, icon button 8733:13509 -->
  </frame>
</frame>
```

## Variant matrix oficial

| variant     | size m (36h) | size s (32h) | size xs (24h) | state |
|-------------|--------------|--------------|---------------|-------|
| primary     | 4035:5764    | 4035:5828    | 4035:5860     | default |
| primary     | 4035:5780    | 4035:5844    | 4035:5876     | hover & active |
| primary     | 4035:5772    | 4035:5836    | 4035:5868     | disabled |
| primary     | 4035:5788    | 4035:5852    | 4035:5884     | focus |
| primary     | 4035:12362   | 4035:12926   | 4035:13257    | loading |
| secondary   | 4176:11969   | 4176:11987   | 4176:12005    | default |
| neutral     | 4035:5636    | 4035:5700    | 4035:5732     | default |
| outline     | 4035:5508    | 4035:5572    | 4035:5604     | default |
| ghost       | 4035:5380    | 4035:5444    | 4035:5476     | default |
| destructive | 4035:5252    | 4035:5316    | 4035:5348     | default |

> Para extrair cada variante completa (com tokens, padding, gap, ícones), drillar cada node-id com `get_design_context`. Existem **90 botões textuais + 90 icon buttons + .spinner + exemplos** no frame Button. Total ≈ 180+ nós drillaveis.

> **Tokens já identificados na pré-leitura (via icon button):**
> - `color/button/destructive/default` `#d2190b`
> - `color/button/destructive/hover-active` `#9d231c`
> - `color/button/destructive/disabled` `#d4d4d4`
> - `color/button/neutral/default` `#e5e5e5`
> - `color/button/neutral/hover-active` `#a3a3a3`
> - `color/button/brand/default` `#008633`
> - `color/button/brand/hover-active` `#005c12`
> - `color/button/secondary/default` `#0d4897`
> - `color/button/secondary/hover-active` `#093671`
> - `radius/xl` 8 (button outline 4, demais 8 — ver doc)
> - Sizes: m = 36h (padding 8 16 8 16), s = 32h (padding 8 16), xs = 24h (padding 4 8)
> - Texto: Inter Regular 13px, leading 1.2
> - Focus: shadow `0 0 0 3px color/neutral/300 (#d4d4d4)` em volta
