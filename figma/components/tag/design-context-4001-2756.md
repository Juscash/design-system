# Figma — `.tag` (`4001:2756`) — get_design_context (Componentes internos)

> Importante: este `.tag` mora em **Componentes internos** (página 4247:12021) e **não** é um componente do design system. É um helper usado dentro dos próprios docs do Figma (linhas de tabela de cor, etc.). Para um "chip/tag" de UI real, use **Badge** (4061:13095).

## Estrutura

```tsx
const imgVectorStrokeHash = "../../assets/hash-soft-10.svg";

function Tag({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[var(--color/background/grey,#f5f5f5)] flex gap-[4px] items-center px-[4px] py-[2px] rounded-[4px]"} data-node-id="4001:2756">
      <div className="overflow-clip size-[12px]" data-name="icon/hash">
        <img src={imgVectorStrokeHash} />
      </div>
      <p className="font-['JetBrains_Mono:Bold',sans-serif] text-[13px] text-[color:var(--color/text/soft,#6d6d6e)]">FF80EE</p>
    </div>
  );
}
```

- Bg: `color/background/grey` (#f5f5f5)
- Padding: 2/4, gap-4, rounded-4
- Icon: 12×12 (`icon/hash` para hex, `icon/link` para token reference)
- Texto: JetBrains Mono Bold 13, cor `color/text/soft` (#6d6d6e)

## Uso real (visto em DocumentationTable e Tipografia)

| Conteúdo | Icon | Label exemplo |
|---|---|---|
| Hex | `icon/hash` | `FF80EE`, `2CBD62` |
| Token reference | `icon/link` | `color/primary/400`, `body.1`, etc. |

**Não implementar como componente público do DS.** Apenas referenciado aqui para completude do dump.
