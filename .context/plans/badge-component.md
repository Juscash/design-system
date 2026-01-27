# Badge component (Antd-based) Plan

> Create Badge component based on Figma, extending Ant Design Badge, with variants, tone prop for secondary, focus-visible state, and counter mapping to Antd count.

## Task Snapshot
- **Primary goal:** Implement a `Badge` component in the design system that matches Figma (`node-id=4080-6201`) while extending Ant Design `Badge`, supporting standalone label + overlay usage.
- **Success signal:** Component renders all Figma variants (primary, secondary, tertiary, outline, ghost, destructive, counter) with default/focus states; `tone` overrides secondary colors when provided; Antd `count`/`showZero`/`overflowCount` work; stories/tests pass; exports updated.
- **Key references:**
  - Figma: https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-6201
  - Antd: https://ant.design/components/badge
  - [Documentation Index](../docs/README.md)
  - [Agent Handbook](../agents/README.md)

## Scope
- **In scope:** New `Badge` component extending Antd `Badge`, standalone pill variant and overlay usage, variants and states from Figma, `tone` override for secondary background/text, counter mapping to Antd `count`, stories/tests, exports and docs architecture update if needed.
- **Out of scope:** New tokens, global theme changes, non-Figma variants, changes to Antd internals.

## Agent Lineup (custom only)
| Agent | Role in this plan | Playbook | First responsibility focus |
| --- | --- | --- | --- |
| component-creator | Orchestrate component creation using Figma and Antd. | [Component Creator](../agents/component-creator.md) | Figma parsing, component structure, variants mapping |
| component-docs-agent | Validate docs cross-links if structure changes. | [Component Docs Agent](../agents/component-docs-agent.md) | Update docs/README if required by new component folder |

## Documentation Touchpoints
| Guide | File | Primary Inputs |
| --- | --- | --- |
| Docs index | `docs/README.md` | Add cross-link to new Badge component if required by architecture rules |
| Agents index | `agents/README.md` | Only if new scaffold/docs are added beyond component folder |

## Risks & Dependencies
### Identified Risks
| Risk | Probability | Impact | Mitigation Strategy | Owner |
| --- | --- | --- | --- | --- |
| Token mapping mismatch (Figma colors vs DS tokens) | Medium | Medium | Map all colors to `designSystemColors` and verify against Figma variables | component-creator |
| Antd Badge API mismatch for overlay vs label | Low | Medium | Validate against Antd docs and existing component patterns | component-creator |

### Dependencies
- **Internal:** `packages/design-system/src/theme/*` tokens (`designSystemColors`, `spacing`, `radius`, `shadow`) and component patterns in `Button`, `Tag`, `Typography`.
- **External:** Ant Design Badge API; Figma node for truth source.

### Assumptions
- Design tokens already cover all colors shown in Figma; if not, use closest existing token and document delta in plan notes.
- Antd `Badge` can be used both standalone (no children) and overlay (with children) without breaking DS patterns.

## Working Phases
### Phase 1 — Discovery & Alignment (P)
**Objective:** Confirm mappings and props from Figma/Antd, finalize API surface.
**Steps**
1. Use `figma-mcp` to extract Badge specs, variants, sizes, focus style, and token mappings.
2. Review Antd Badge API and existing DS component patterns (e.g., `Tag`, `Button`) for prop/typing conventions.
3. Finalize props: `variant` mapping for all Figma variants, `tone` override for secondary (text + background), focus-visible behavior, counter mapping to Antd `count`.

**Deliverables**
- Variant matrix mapping (Figma → DS tokens/props)
- Proposed `BadgeProps` shape and default behavior

**Commit checkpoint**
- No commit required (planning only).

### Phase 2 — Implementation & Iteration (E)
**Objective:** Build component, stories, tests following DS conventions.
**Steps**
1. Create `packages/design-system/src/components/Badge/` with `Badge.tsx`, `Badge.stories.tsx`, `Badge.test.tsx`, `index.ts` using `component-creation` skill.
2. Implement Antd `Badge` extension with:
   - `variant` mapping for all Figma variants
   - `tone` override for secondary (custom `backgroundColor` and `color` props)
   - `focus-visible` styling using DS `shadow` token
   - Counter mapping using Antd `count`/`showZero`/`overflowCount`
3. Add stories using `story-creation` skill covering all variants and both usage modes (standalone label + overlay).
4. Add tests using `test-creation` skill for render baseline, at least one variant, and `tone` override.
5. Export in `packages/design-system/src/components/index.ts`.

**Deliverables**
- New `Badge` component folder and exports
- Storybook coverage of Figma variants
- Tests passing for core behaviors

**Commit checkpoint**
- After implementation: `feat(components): add badge component` (commit only if requested).

### Phase 3 — Validation & Handoff (V)
**Objective:** Validate build/tests and update docs if needed.
**Steps**
1. Run `npm run test` (and `npm run build` if required by repo rules).
2. If component folder changes require docs update, run `docs-architecture-update` skill and update `docs/README.md` links.
3. Capture evidence (test output, storybook snapshot or screenshots if requested).

**Deliverables**
- Test results and build confirmation
- Updated docs (if applicable)

**Commit checkpoint**
- `chore(docs): update design system indexes` (commit only if requested).

## Success Criteria
- `Badge` renders all Figma variants and counter style matches design.
- `tone` override applies custom background/text when provided and falls back to variant tokens otherwise.
- Focus-visible shadow matches Figma focus style.
- Antd props still pass through and overlay usage works with children.
- Stories and tests added; `npm run test` passes.

## Evidence & Follow-up
- Links: Figma node and Antd docs (above).
- Artifacts: Storybook story for Badge, test output, and optional screenshot of rendered component grid.
