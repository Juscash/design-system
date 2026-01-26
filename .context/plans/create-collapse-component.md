---
type: plan
title: Create Collapse Component
status: defined
generated: 2026-01-21
description: Implement Collapse component wrapping Ant Design's Collapse, following JusCash Design System patterns.
agents:
  - type: component-creator
    role: Lead Developer for Component
phases:
  - id: planning
    name: Planning & Requirements
    prevc: P
    description: Gather requirements and confirm design details.
  - id: implementation
    name: Component Implementation
    prevc: E
    description: Create the component code.
  - id: verification
    name: Verification
    prevc: V
    description: Verify component functionality.
---

# 🏗️ Plan: Create Collapse Component

This plan outlines the steps to create the `Collapse` component for the JusCash Design System, wrapping the Ant Design component.

## 👥 Agents

- **Component Creator**: Responsible for implementing the component following strict design system guidelines.

## 📅 Phase 1: Planning (P)

### 1.1 Requirements Gathering
Before implementation, we must answer the **Essential Questions** from the Component Creator agent playbook.

**QUESTIONS FOR USER CONFIRMATION:**
1.  📛 **Nome do componente:** Collapse
2.  🧱 **Componente base do Antd:** `Collapse` do antd
3.  🎯 **Propósito:** Organizar conteúdo em painéis colapsáveis.
4.  🎨 **Variantes:** (Preciso da sua confirmação: `default`, `borderless`, `ghost`?)
5.  ⚙️ **Props extras:** (Alguma prop customizada? ex: `dsSize`?)
6.  🖼️ **Design Figma:** (Existe nodeId ou link?)

### 1.2 Design Analysis (Completed)
- **Figma Node:** `4069:5252` (Accordion)
- **Token Mapping:**
  - `radius/xl` (8px) -> `radius.lg` (JusCash System)
  - `color/neutral/50` (#fafafa) -> `designSystemColors.neutral[50]` (Background?)
  - `color/neutral/300` (#d4d4d4) -> `designSystemColors.neutral[300]` (Border)
  - `focus` effect -> Apply box-shadow on focus state.
- **States identified:** Open, Closed, Hover, Focus.

## 🚀 Phase 2: Implementation (E)

### 2.1 File Creation
- Create `packages/design-system/src/components/Collapse.tsx`.
- Ensure `"use client"` directive.

### 2.2 Implementation Details
- Import `Collapse as AntdCollapse` and `ConfigProvider` from `antd`.
- Define `CollapseProps` using mapped types (clean Antd props).
- Implement token mapping:
  - **Border Radius**: `radius.lg` (8px).
  - **Colors**: Map `neutral` palette from Figma to `designSystemColors`.
- Apply `ConfigProvider` theme overrides for:
  - `headerBg`: Transparent or `neutral[50]`.
  - `contentBg`: Transparent or `neutral[50]`.
  - `borderColor`: `neutral[300]`.

```typescript
// Proposed Implementation Structure
import { Collapse as AntdCollapse, ConfigProvider } from "antd";
import { designSystemColors, radius } from "../theme";

// Types ...

export function Collapse(props: CollapseProps) {
  // Mapping logic
  const tokens = {
    borderRadius: radius.lg, // Mapped from Figma radius/xl (8px)
    colorBorder: designSystemColors.neutral[300],
    // ...
  };
  
  return (
    <ConfigProvider theme={{ components: { Collapse: tokens } }}>
      <AntdCollapse {...props} />
    </ConfigProvider>
  );
}
```

### 2.3 Exports
- Export component in `packages/design-system/src/components/index.ts`.

## ✅ Phase 3: Verification (V)

### 3.1 Validation Checklist
- [ ] Component renders correctly.
- [ ] Styles matches tokens.
- [ ] Props are correctly typed and passed.
- [ ] No hardcoded colors.

## 🏁 Success Criteria
- [ ] `Collapse` component exists in `src/components/`.
- [ ] Component extends Ant Design `Collapse`.
- [ ] Component uses Design System tokens.
