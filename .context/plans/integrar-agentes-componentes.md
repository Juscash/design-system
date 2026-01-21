---
title: Integração de Agentes de Componentes
summary: Ajustar Frontend Specialist, Feature Developer e Documentation Writer para utilizar Component Creator e Component Docs Agent na criação/ajuste de componentes.
status: completed
generated: 2026-01-21
authors:
  - Antigravity
gates:
  require_plan: false
  require_approval: true
---

# Integração de Agentes de Componentes

## Contexto
O projeto possui agentes altamente especializados para o Design System:
- `component-creator`: Especialista em criar componentes React/AntD seguindo os padrões do projeto.
- `component-docs-agent`: Especialista em documentar esses componentes.

No entanto, agentes generalistas (`frontend-specialist`, `feature-developer`) podem tentar implementar componentes por conta própria sem seguir esses padrões rigorosos se não forem instruídos explicitamente.

## Objetivo
Garantir que qualquer solicitação de criação ou ajuste de componentes UI seja roteada ou informada pelas diretrizes dos agentes especialistas (`component-creator` e `component-docs-agent`).

## Plano de Execução

### Fase 1: Atualização de Agentes de Desenvolvimento (P -> E)
**Agentes**: `frontend-specialist`, `feature-developer`

1. **Frontend Specialist**:
   - Adicionar diretiva explicita: "Ao criar, refatorar ou ajustar componentes do Design System, VOCÊ DEVE adotar as 'personas' e diretrizes do agente `component-creator`."
   - Adicionar diretiva sobre documentação: "Para documentação de componentes, siga o `component-docs-agent`."

2. **Feature Developer**:
   - Adicionar regra de verificação: "Antes de implementar UI, verifique se o componente existe. Se precisar criar, siga o padrão definido em `component-creator`."

### Fase 2: Atualização do Agente de Documentação (E -> V)
**Agente**: `documentation-writer`

1. **Documentation Writer**:
   - Adicionar seção "Documentação de Componentes":
     - "SE a tarefa for documentar um componente UI, IGNORE os padrões genéricos e use estritamente as instruções do `component-docs-agent`."
     - "Garanta que os exemplos e props tables sigam o padrão do Design System."

### Fase 3: Validação (V -> C)
- Verificar se os arquivos `.context/agents/*.md` foram atualizados corretamente.
- Simular (mentalmente) um prompt para garantir que a instrução seria ativada.

## Critérios de Aceite
- [x] `frontend-specialist.md` referencia `component-creator` e `component-docs-agent`.
- [x] `feature-developer.md` referencia `component-creator`.
- [x] `documentation-writer.md` referencia `component-docs-agent`.
transferred.
