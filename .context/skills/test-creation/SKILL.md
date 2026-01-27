---
type: skill
name: test-creation
description: Criar testes com RTL + Vitest seguindo o padrao do repo
skillSlug: test-creation
phases: [E, V]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# ✅ Skill: test-creation

> Criar testes base para componentes do Design System, refletindo estados do Figma.

## Perguntas ao usuario

- Sempre que precisar de uma decisao do usuario, faca uma pergunta com opcoes usando selecao (lista de escolhas).
- Evite pedir resposta livre.

## ✅ Quando usar

- Sempre que criar componente novo.
- Sempre que adicionar props novas.

## 🧭 Passos

1. Testar render basico (role ou texto principal).
2. Testar uma variacao real do Figma.
3. Testar props criadas (ex.: `dsSize`, `variant`, `layout`).
4. Se houver estado disabled/erro, cobrir pelo menos um.
5. Evitar snapshot por padrao.

## ✅ Obrigatorio no test

- React Testing Library + Vitest.
- Render basico com `getByRole` ou `getByText`.
- Variacao do Figma coberta.
- Props criadas testadas.
- Sem snapshot por padrao.

## 🧩 Padrao real do repo

- Usar `describe`/`it` do Vitest.
- Usar `render` e `screen` do RTL.
- Testes pequenos e diretos (sem mocks complexos).
- Validar a UI com `getByRole` quando possivel.

## ✍️ Template base

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NomeComponente } from "./NomeComponente";

describe("NomeComponente", () => {
  it("renderiza no estado padrao", () => {
    render(<NomeComponente>Label</NomeComponente>);
    expect(screen.getByRole("button", { name: /label/i })).toBeInTheDocument();
  });

  it("aplica variacao do Figma", () => {
    render(<NomeComponente variant="secondary">Secundario</NomeComponente>);
    expect(screen.getByRole("button", { name: /secundario/i })).toBeInTheDocument();
  });

  it("suporta props criadas", () => {
    render(<NomeComponente dsSize="s">Size S</NomeComponente>);
    expect(screen.getByRole("button", { name: /size s/i })).toBeInTheDocument();
  });
});
```

## ✅ Checklist rapido

- [ ] Render basico com role/label.
- [ ] Variacao real do Figma coberta.
- [ ] Props criadas testadas.
