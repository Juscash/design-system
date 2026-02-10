---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Glossary

## Core Terms
- Design System: biblioteca de componentes e tokens reutilizaveis da JusCash.
- Token: valor de design reutilizavel (cor, espacamento, raio, sombra).
- Story: exemplo executavel no Storybook para demonstrar estado/uso do componente.
- Wrapper Component: componente do DS que encapsula um componente Ant Design.
- Provider: configuracao de tema/estilo global para o ecossistema do DS.

## Repository Terms
- Monorepo: repositorio com multiplos pacotes gerenciados por npm workspaces.
- Workspace root: raiz do repo, com scripts de orquestracao.
- Package `@Juscash/design-system`: biblioteca distribuida.
- Package `@Juscash/storybook`: docs e playground local.

## Testing Terms
- Vitest: runner de testes usado no pacote de design system.
- RTL (React Testing Library): utilitario para testes de comportamento/renderizacao.
- Test Storybook: validacao de stories no pacote de docs.

## Documentation Terms
- `.context/docs`: base de conhecimento para agentes.
- `.context/agents`: playbooks de agentes.
- `.context/skills`: instrucoes especializadas acionadas por contexto/tarefa.

## Domain Constraints
- Aderencia visual deve seguir Figma quando houver especificacao explicita.
- Aderencia comportamental deve respeitar API do Antd quando componente for wrapper.
- Mudancas em componente sem story/teste associado sao incompletas.
