---
status: draft
generated: 2026-01-21
agents:
  - type: "component-creator"
    role: "Agente que usará as skills e docs criados"
  - type: "documentation-writer"
    role: "Criar documentação clara e completa"
docs:
  - "architecture.md"
  - "glossary.md"
  - "tooling.md"
  - "development-workflow.md"
phases:
  - id: "phase-1"
    name: "Análise e Planejamento"
    prevc: "P"
  - id: "phase-2"
    name: "Criação de Skills e Docs"
    prevc: "E"
  - id: "phase-3"
    name: "Validação"
    prevc: "V"
---

# 📚 Skills e Docs para Component Creator

> Criar skills customizadas e preencher docs que serão utilizados pelo agente `component-creator` para criação de componentes do Design System JusCash.

## Task Snapshot

- **Primary goal:** Criar skill `component-creation` e preencher docs relevantes para o agente
- **Success signal:** Agente `component-creator` tem acesso a skills e docs úteis para criar componentes
- **Key references:**
  - [Agente Component Creator](../agents/component-creator.md)
  - [Skills Existentes](../skills/README.md)
  - [Theme Foundations](../../packages/design-system/src/theme/foundations/)

---

## 📊 Análise de Skills Existentes

### Skills Built-in (status: unfilled - precisam preencher!)

| Skill | Status | Útil para Component Creator? | Ação |
|-------|--------|------------------------------|------|
| `commit-message` | ❌ Vazio | ✅ Sim | 📝 Preencher |
| `code-review` | ❌ Vazio | ✅ Sim | 📝 Preencher |
| `documentation` | ❌ Vazio | ✅ Sim | 📝 Preencher |
| `test-generation` | ❌ Vazio | ✅ Sim | 📝 Preencher |
| `refactoring` | ❌ Vazio | ⚠️ Parcial | ⏳ Depois |
| `pr-review` | ❌ Vazio | ⚠️ Parcial | ⏳ Depois |
| `feature-breakdown` | ❌ Vazio | ❌ Não | ⏭️ Ignorar |
| `api-design` | ❌ Vazio | ❌ Não | ⏭️ Ignorar |
| `bug-investigation` | ❌ Vazio | ❌ Não | ⏭️ Ignorar |
| `security-audit` | ❌ Vazio | ❌ Não | ⏭️ Ignorar |

### Skills a Preencher (Prioridade Alta)

| Skill | Localização | Conteúdo Necessário |
|-------|-------------|---------------------|
| **`commit-message`** | `.context/skills/commit-message/SKILL.md` | Padrão Gitmoji do projeto |
| **`code-review`** | `.context/skills/code-review/SKILL.md` | Checklist de revisão para componentes |
| **`documentation`** | `.context/skills/documentation/SKILL.md` | Como documentar componentes |
| **`test-generation`** | `.context/skills/test-generation/SKILL.md` | Gerar testes para componentes React |

### Skills Customizadas a Criar

| Skill | Descrição | Prioridade |
|-------|-----------|------------|
| **`component-creation`** | Skill específica para criar componentes estendendo Antd | 🔴 Alta |

---

## 📄 Análise de Docs a Preencher

### Docs Relevantes para Component Creator

| Doc | Status Atual | Conteúdo Necessário | Prioridade |
|-----|--------------|---------------------|------------|
| `architecture.md` | ❌ Vazio | Estrutura do Design System, padrões de componentes | 🔴 Alta |
| `glossary.md` | ❌ Vazio | Tokens, tipos, terminologia do DS | 🔴 Alta |
| `tooling.md` | ❌ Vazio | Figma MCP, build tools, scripts | 🟡 Média |
| `development-workflow.md` | ❌ Vazio | Fluxo de criação de componentes | 🟡 Média |

---

## 🎯 Decisões

### 1. Skill `component-creation`
**Decisão:** Criar uma skill customizada nova

**Justificativa:**
- Nenhuma skill existente cobre criação de componentes React/Antd
- Precisamos de instruções específicas para o Design System JusCash
- A skill deve incluir templates, tokens e checklist

### 2. Docs a Preencher
**Decisão:** Focar em `architecture.md` e `glossary.md` primeiro

**Justificativa:**
- São os mais úteis para o agente entender o contexto
- `architecture.md` = estrutura do projeto
- `glossary.md` = tokens e terminologia

---

## 📋 Working Phases

### Phase 1 — Análise e Planejamento ✅
**Concluído neste plano**
- Analisar skills existentes
- Identificar gaps
- Definir prioridades

### Phase 2 — Criação de Skills e Docs

#### 2.1 Criar Skill `component-creation`
```
.context/skills/component-creation/
├── SKILL.md          # Instruções da skill
├── templates/        # Templates de código
│   └── component.tsx.hbs
└── examples/         # Exemplos de uso
    └── Button.md
```

**Conteúdo da Skill:**
- Instruções passo-a-passo
- Template de componente
- Mapeamento de tokens Antd ↔ DS JusCash
- Checklist de validação

#### 2.2 Preencher `architecture.md`
**Conteúdo:**
- Estrutura do monorepo
- Arquitetura do Design System
- Padrões de componentes (ConfigProvider, extensão de props)
- Relação com Ant Design

#### 2.3 Preencher `glossary.md`
**Conteúdo:**
- Tokens de cores (`designSystemColors`)
- Tokens de spacing
- Tokens de radius
- Tokens de shadow
- Terminologia (CleanAntdProps, dsSize, etc.)

#### 2.4 Preencher `tooling.md`
**Conteúdo:**
- Figma MCP (ferramentas disponíveis)
- Build tools (tsup)
- Scripts úteis

#### 2.5 Preencher `development-workflow.md`
**Conteúdo:**
- Fluxo de criação de componente
- Onde salvar arquivos
- Como exportar no index

**Commit Checkpoint**
- `📚 docs: preenche docs do design system para component-creator`
- `✨ feat: cria skill component-creation`

### Phase 3 — Validação
- Verificar que skill está acessível
- Verificar que docs estão completos
- Atualizar README.md de skills se necessário

---

## 📦 Entregáveis

### Skills a Preencher
| Entregável | Localização | Status |
|------------|-------------|--------|
| Skill `commit-message` | `.context/skills/commit-message/SKILL.md` | ⏳ Pendente |
| Skill `code-review` | `.context/skills/code-review/SKILL.md` | ⏳ Pendente |
| Skill `documentation` | `.context/skills/documentation/SKILL.md` | ⏳ Pendente |
| Skill `test-generation` | `.context/skills/test-generation/SKILL.md` | ⏳ Pendente |
| Skill `component-creation` (NOVA) | `.context/skills/component-creation/SKILL.md` | ⏳ Pendente |

### Docs a Preencher
| Entregável | Localização | Status |
|------------|-------------|--------|
| Doc Architecture | `.context/docs/architecture.md` | ⏳ Pendente |
| Doc Glossary | `.context/docs/glossary.md` | ⏳ Pendente |
| Doc Tooling | `.context/docs/tooling.md` | ⏳ Pendente |
| Doc Development Workflow | `.context/docs/development-workflow.md` | ⏳ Pendente |

---

## 📚 Referência: Tokens do Design System

### Cores (`designSystemColors`)
```typescript
// Brand
brand.primary[50-900]    // Verde (#008633 é o 600)
brand.secondary[50-900]  // Azul (#105ABC é o 600)

// Neutral
neutral[50-900]          // Cinzas

// Feedback
feedback.green[50,500,900]
feedback.red[50,500,900]
feedback.yellow[50,500,900]
feedback.blue[50,500,900]
feedback.orange[50,500,900]
```

### Spacing
```typescript
spacing[1] = 4px
spacing[2] = 8px
spacing[3] = 12px
spacing[4] = 16px
...até spacing[24] = 96px
```

### Radius
```typescript
radius.md = 4px
radius.xl = 8px
radius["2xl"] = 12px
radius["3xl"] = 16px
radius.full = 9999px
```

### Shadow
```typescript
shadow.xs, shadow.s, shadow.m, shadow.l, shadow.xl
shadow.focus, shadow.focusError
```

---

## Evidence & Follow-up

- [ ] Skill `component-creation` criada e funcional
- [ ] Docs preenchidos com conteúdo relevante
- [ ] Agente `component-creator` referencia novos recursos
