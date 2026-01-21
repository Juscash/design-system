---
type: skill
name: Documentation
description: Generate documentation for Design System components
skillSlug: documentation
phases: [P, C]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 📚 Skill: Documentation

> Gerar documentação técnica para componentes do Design System JusCash.

## 📋 Estrutura de Documentação de Componente

### Template Básico

```markdown
# ComponentName

> Breve descrição do propósito do componente.

## Uso Básico

\`\`\`tsx
import { ComponentName } from "@juscash/design-system";

<ComponentName variant="primary">
  Conteúdo
</ComponentName>
\`\`\`

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| variant | `"primary" \| "secondary"` | `"primary"` | Estilo visual |
| dsSize | `"xs" \| "s" \| "m" \| "l"` | `"m"` | Tamanho do componente |
| disabled | `boolean` | `false` | Desabilita interação |

## Variantes

### Primary
\`\`\`tsx
<ComponentName variant="primary">Primary</ComponentName>
\`\`\`

### Secondary
\`\`\`tsx
<ComponentName variant="secondary">Secondary</ComponentName>
\`\`\`

## Tamanhos

| Tamanho | Código | Uso recomendado |
|---------|--------|-----------------|
| XS | `dsSize="xs"` | Contextos muito compactos |
| S | `dsSize="s"` | Ações secundárias |
| M | `dsSize="m"` | Uso padrão |
| L | `dsSize="l"` | CTAs principais |

## Tokens Utilizados

- **Cores:** `designSystemColors.brand.primary[600]`
- **Spacing:** `spacing[2]`, `spacing[4]`
- **Radius:** `radius.xl`

## Acessibilidade

- Suporta navegação por teclado
- Compatível com screen readers
- Contraste adequado em todos os estados
```

---

## 📝 Documentação de Props

### Como documentar cada prop

```markdown
| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
```

**Regras:**
1. **Tipo** - Usar sintaxe TypeScript
2. **Default** - Indicar valor padrão ou `-` se obrigatório
3. **Descrição** - Ser conciso e claro

### Exemplo Completo

```markdown
| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| type | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Estilo visual do botão |
| dsSize | `"xs" \| "s" \| "m"` | `"m"` | Tamanho do botão |
| loading | `boolean` | `false` | Exibe spinner de loading |
| disabled | `boolean` | `false` | Desabilita o botão |
| icon | `ReactNode` | - | Ícone à esquerda do texto |
| onClick | `() => void` | - | Callback de clique |
```

---

## 🎨 Documentação de Tokens

Sempre listar os tokens do Design System utilizados:

```markdown
## Tokens Utilizados

### Cores
- Primary: `designSystemColors.brand.primary[600]`
- Hover: `designSystemColors.brand.primary[800]`
- Disabled: `designSystemColors.neutral[300]`

### Spacing
- Padding horizontal: `spacing[4]` (16px)
- Padding vertical: `spacing[2]` (8px)

### Radius
- Border radius: `radius.xl` (8px)
```

---

## 📖 Seções Opcionais

### Migração do Antd

```markdown
## Migração do Antd

Se você estava usando o componente diretamente do Antd:

\`\`\`diff
- import { Button } from "antd";
+ import { Button } from "@juscash/design-system";

- <Button type="primary" size="small">
+ <Button type="primary" dsSize="s">
```

### Exemplos Avançados

```markdown
## Exemplos Avançados

### Com Ícone
\`\`\`tsx
import { LucideIcons } from "@juscash/design-system";

<Button type="primary" icon={<LucideIcons.Plus />}>
  Adicionar
</Button>
\`\`\`

### Loading State
\`\`\`tsx
<Button loading>Salvando...</Button>
\`\`\`
```

---

## ✅ Checklist de Documentação

- [ ] Descrição clara do propósito
- [ ] Exemplo de uso básico
- [ ] Tabela de props completa
- [ ] Documentação de variantes
- [ ] Documentação de tamanhos
- [ ] Tokens utilizados listados
- [ ] Notas de acessibilidade
