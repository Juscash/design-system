---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Architecture Notes

## System Architecture Overview
O repositorio e um monorepo npm com duas frentes:
- Biblioteca de componentes React (`packages/design-system`), baseada em Ant Design 6.
- Documentacao interativa via Storybook (`docs`).

Fluxo principal:
1. Componentes sao implementados em `packages/design-system/src/components`.
2. Exportacoes publicas saem por `packages/design-system/src/index.ts`.
3. Storybook consome o pacote local para showcase e validacao visual.
4. Build da lib e docs e orquestrado pelos scripts da raiz.

## Architectural Layers
- Foundation tokens: `packages/design-system/src/theme/foundations`
- Theme/provider: `packages/design-system/src/theme`
- UI components: `packages/design-system/src/components/*`
- Package API surface: `packages/design-system/src/index.ts`
- Docs runtime/storys: `docs/`
- Automation/scripts: `scripts/`

## Detected Design Patterns
| Pattern | Confidence | Locations | Description |
| --- | --- | --- | --- |
| Wrapper over Antd | High | `packages/design-system/src/components/*/*.tsx` | Componentes encapsulam componentes Antd com tokens e props do DS. |
| Local token mapping | High | `Button.tsx`, `Tabs.tsx`, `Alert.tsx` | Funcoes de tokens por variante mapeiam para tema/props. |
| Barrel exports | High | `packages/design-system/src/components/index.ts`, `packages/design-system/src/index.ts` | API publica centralizada para consumo externo. |
| Workspace split | High | `package.json`, `docs/package.json` | Separacao clara entre pacote de lib e pacote de docs. |

## Entry Points
- `package.json`
- `packages/design-system/src/index.ts`
- `docs/package.json`
- `docs/.storybook/main.ts`

## Public API
| Symbol Group | Type | Location |
| --- | --- | --- |
| Componentes (Button, Input, Badge, etc.) | React components | `packages/design-system/src/components/index.ts` |
| Tokens (`designSystemColors`, `spacing`, `radius`, etc.) | theme exports | `packages/design-system/src/theme/foundations/*.ts` |
| Provider (`JuscashProvider`) | React provider | `packages/design-system/src/theme/JuscashProvider.tsx` |

## External Dependencies
- `antd`: base de componentes.
- `react`/`react-dom`: runtime.
- `storybook`: docs e playground.
- `vitest` + testing-library: testes unitarios/componentes.
- `tsup`: build da biblioteca.

## Risks And Constraints
- Risco de divergencia visual se storys nao forem atualizadas junto com componente.
- Mudancas em tokens podem impactar varios componentes de uma vez.
- `docs/storybook-static` e artefato de build; nao e fonte primaria.

## Top Directories Snapshot
- `packages/`: codigo da biblioteca e build output.
- `docs/`: app de Storybook e build estatico.
- `documentacao/`: guias de processo e referencia interna.
- `scripts/`: versao/publicacao e utilitarios.

## Related Resources
- [Project Overview](./project-overview.md)
- [Development Workflow](./development-workflow.md)
- [Tooling](./tooling.md)
