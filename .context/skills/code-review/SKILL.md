---
type: skill
name: Code Review
description: Review code quality for Design System components following JusCash patterns
skillSlug: code-review
phases: [R, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🔍 Skill: Code Review

> Revisar qualidade de código para componentes do Design System JusCash.

## Perguntas ao usuario

- Sempre que precisar de uma decisao do usuario, faca uma pergunta com opcoes usando selecao (lista de escolhas).
- Evite pedir resposta livre.

## 📋 Checklist de Revisão

### 1. Estrutura do Arquivo

- [ ] Arquivo está em `packages/design-system/src/components/`
- [ ] Nome do arquivo é PascalCase (ex: `Button.tsx`, `Avatar.tsx`)
- [ ] Diretiva `"use client"` no topo do arquivo
- [ ] Imports organizados (antd → types → theme)

### 2. Tipagem

- [ ] Usa `CleanAntdProps` com mapped types (não `Omit`)
- [ ] Props type está exportado
- [ ] Types do Antd importados corretamente
- [ ] Não há `any` no código

```typescript
// ✅ Correto
type CleanAntdProps = {
  [K in keyof AntdInputProps as K extends "size" ? never : K]: AntdInputProps[K];
};

// ❌ Evitar
type Props = Omit<AntdInputProps, "size">;
```

### 3. Tokens do Tema

- [ ] Usa `designSystemColors` (não cores hardcoded)
- [ ] Usa `spacing` para espaçamentos
- [ ] Usa `radius` para border-radius
- [ ] Usa `shadow` para box-shadow

```typescript
// ✅ Correto
colorPrimary: designSystemColors.brand.primary[600]

// ❌ Evitar
colorPrimary: "#008633"
```

### 4. Padrão de Componente

- [ ] Componente Antd importado com alias (`as AntdButton`)
- [ ] ConfigProvider envolvendo o componente
- [ ] Tokens aplicados via `theme.components`
- [ ] `displayName` definido

```typescript
// ✅ Padrão correto
export function Button(props: ButtonProps): React.ReactElement {
  return (
    <ConfigProvider theme={{ components: { Button: tokens } }}>
      <AntdButton {...rest} />
    </ConfigProvider>
  );
}

Button.displayName = "Button";
```

### 5. Exports

- [ ] Componente exportado como named export
- [ ] Props type exportado
- [ ] Adicionado em `components/index.ts`

---

## ⚠️ Alertas Comuns

### Cores Hardcoded
```typescript
// ❌ Alerta: Cor hardcoded
color: "#FF0000"

// ✅ Correção
color: designSystemColors.feedback.red[500]
```

### Omit ao invés de Mapped Types
```typescript
// ❌ Alerta: Omit pode quebrar tipagem
type Props = Omit<AntdProps, "size">

// ✅ Correção
type CleanProps = {
  [K in keyof AntdProps as K extends "size" ? never : K]: AntdProps[K];
};
```

### Faltando displayName
```typescript
// ❌ Alerta: Sem displayName
export function Avatar(props) { ... }

// ✅ Correção
export function Avatar(props) { ... }
Avatar.displayName = "Avatar";
```

### Import direto do Antd sem alias
```typescript
// ❌ Alerta: Import direto confunde
import { Button } from "antd";

// ✅ Correção
import { Button as AntdButton } from "antd";
```

---

## 📊 Níveis de Severidade

| Nível | Descrição | Ação |
|-------|-----------|------|
| 🔴 **Crítico** | Cor hardcoded, sem ConfigProvider | Bloquear merge |
| 🟡 **Médio** | Omit ao invés de mapped types | Sugerir correção |
| 🟢 **Sugestão** | Ordem de imports | Opcional |

---

## 📝 Template de Feedback

```markdown
## Code Review - [NomeComponente]

### ✅ Positivos
- [O que está bom]

### 🔴 Críticos (bloquear merge)
- [Problemas sérios]

### 🟡 Sugestões
- [Melhorias recomendadas]

### 📋 Checklist
- [x] Estrutura correta
- [x] Tipagem adequada
- [ ] Faltando displayName
```
