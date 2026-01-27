---
type: skill
name: test-creation
description: Criar testes com React Testing Library e Vitest para componentes do DS
skillSlug: test-creation
phases: [E, V]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# ✅ Skill: test-creation

> Criar testes base para componentes do Design System.

## ✅ Quando usar

- Sempre que criar componente novo.
- Sempre que adicionar props novas.

## 🧭 Passos

1. Testar render basico.
2. Testar uma variacao real do Figma.
3. Testar props criadas (ex.: `dsSize`, `variant`).
4. Evitar snapshot por padrao.

## ✅ Obrigatorio no test

- React Testing Library + Vitest.
- Render basico.
- Variacao do Figma coberta.
- Props criadas testadas.

## ✍️ Template base

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NomeComponente } from "./NomeComponente";

describe("NomeComponente", () => {
  it("renderiza no estado padrao", () => {
    render(<NomeComponente />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("aplica variacao do Figma", () => {
    render(<NomeComponente variant="secondary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```
