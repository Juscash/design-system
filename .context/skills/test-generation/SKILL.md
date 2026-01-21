---
type: skill
name: Test Generation
description: Generate tests for Design System React components
skillSlug: test-generation
phases: [E, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🧪 Skill: Test Generation

> Gerar testes para componentes React do Design System JusCash.

## 📋 Estrutura de Testes

### Localização

```
packages/design-system/src/components/__tests__/
├── Button.test.tsx
├── Input.test.tsx
└── ...
```

### Template Básico

```typescript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComponentName } from "../ComponentName";

describe("ComponentName", () => {
  // Renderização básica
  it("should render correctly", () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  // Variantes
  describe("variants", () => {
    it("should render primary variant", () => {
      render(<ComponentName variant="primary">Primary</ComponentName>);
      // assertions
    });

    it("should render secondary variant", () => {
      render(<ComponentName variant="secondary">Secondary</ComponentName>);
      // assertions
    });
  });

  // Tamanhos
  describe("sizes", () => {
    it.each(["xs", "s", "m", "l"])("should render size %s", (size) => {
      render(<ComponentName dsSize={size as any}>Test</ComponentName>);
      // assertions
    });
  });

  // Estados
  describe("states", () => {
    it("should handle disabled state", () => {
      render(<ComponentName disabled>Disabled</ComponentName>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should handle loading state", () => {
      render(<ComponentName loading>Loading</ComponentName>);
      // assertions
    });
  });

  // Eventos
  describe("events", () => {
    it("should call onClick when clicked", () => {
      const handleClick = jest.fn();
      render(<ComponentName onClick={handleClick}>Click me</ComponentName>);
      
      fireEvent.click(screen.getByText("Click me"));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(<ComponentName disabled onClick={handleClick}>Click me</ComponentName>);
      
      fireEvent.click(screen.getByText("Click me"));
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
```

---

## 🎯 Categorias de Testes

### 1. Renderização Básica

```typescript
it("should render correctly", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});

it("should render with default props", () => {
  render(<Button>Default</Button>);
  // Verificar que usa variant="primary" e dsSize="m" por padrão
});
```

### 2. Props e Variantes

```typescript
it("should apply custom className", () => {
  render(<Button className="custom-class">Test</Button>);
  expect(screen.getByRole("button")).toHaveClass("custom-class");
});

it("should forward ref", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>Test</Button>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
```

### 3. Acessibilidade

```typescript
it("should have correct aria attributes", () => {
  render(<Button aria-label="Custom label">Icon</Button>);
  expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
});

it("should be focusable", () => {
  render(<Button>Focusable</Button>);
  const button = screen.getByRole("button");
  button.focus();
  expect(button).toHaveFocus();
});
```

### 4. Integração com Antd

```typescript
it("should pass through Antd props", () => {
  render(<Button htmlType="submit">Submit</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
});
```

---

## 📊 Cobertura Recomendada

| Categoria | Prioridade | Descrição |
|-----------|------------|-----------|
| Renderização | 🔴 Alta | Componente renderiza sem erros |
| Variantes | 🔴 Alta | Todas as variantes funcionam |
| Tamanhos | 🟡 Média | Todos os tamanhos funcionam |
| Estados | 🔴 Alta | disabled, loading, etc. |
| Eventos | 🔴 Alta | onClick, onChange, etc. |
| Acessibilidade | 🟡 Média | aria-*, keyboard nav |
| Props forwarding | 🟢 Baixa | Props do Antd passam |

---

## ✅ Checklist de Testes

Para cada componente:

- [ ] Renderização básica
- [ ] Todas as variantes
- [ ] Todos os tamanhos (dsSize)
- [ ] Estado disabled
- [ ] Estado loading (se aplicável)
- [ ] Eventos principais (onClick, onChange)
- [ ] Acessibilidade básica
- [ ] Props do Antd são repassadas
- [ ] Snapshot test (opcional)

---

## 🛠️ Utilitários de Teste

### Custom Render com Provider

```typescript
// test-utils.tsx
import { render } from "@testing-library/react";
import { JuscashProvider } from "../theme";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <JuscashProvider>{children}</JuscashProvider>,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
```

### Mocks Comuns

```typescript
// Mock para Lucide Icons
jest.mock("lucide-react", () => ({
  Plus: () => <span data-testid="icon-plus" />,
  Check: () => <span data-testid="icon-check" />,
}));
```
