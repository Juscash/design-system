# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo layout

NPM Workspaces monorepo with two workspaces:

- `packages/design-system` — the library `@juscash/design-system` (published to **GitHub Packages**, not npm). Built with **tsup** (CJS + ESM + `.d.ts`); CSS is copied to `dist/index.css` via tsup `onSuccess`.
- `docs` — workspace named `@juscash/storybook` (private). Storybook 10 / Next.js-Vite framework. It reads stories directly from `packages/design-system/src/**/*.stories.tsx` and aliases `@juscash/design-system` to the package's `src/` in dev and `dist/` in build (see `docs/.storybook/main.mts`).

The root `package.json` runs every multi-package command via `-w <workspace>`. There is no `apps/` directory despite stale references in `AGENTS.md`.

## Commands

| Task | Command | Notes |
|---|---|---|
| Install | `npm install` | Required at the root — workspaces resolve from here. |
| Dev | `npm run dev` | Runs Storybook on port 6006 (not Vite). `scripts/kill-port-6006.js` clears the port first. |
| Build everything | `npm run build` | Builds the library, then `build-storybook`. |
| Build only library | `npm run build:design-system` | |
| Build only docs | `npm run build:docs` | `GITHUB_PAGES=true` env switches base path for Pages deploy. |
| Test library | `npm run test -w @juscash/design-system` | Vitest watch. Append a name pattern after `--` to filter, e.g. `npm run test -w @juscash/design-system -- Button`. |
| Test library (CI) | `npm run test:run -w @juscash/design-system` | One-shot. |
| Test storybook | `npm run test:docs` | Runs Vitest via `@storybook/addon-vitest` + Playwright. |
| Lint | none | Root `lint` script is a stub (`echo`). Prettier is configured (`.prettierrc`) but there is no eslint setup. |
| Bump version | `npm run version:{patch\|minor\|major}` | Updates `packages/design-system/package.json` only — does not commit. |
| Release | `npm run version:publish [patch\|minor\|major]` | Bumps, commits (`chore: bump ... to X.Y.Z`), tags `vX.Y.Z`, pushes both. CI takes it from there. |

## Release pipeline

Two GitHub Actions, both in `.github/workflows/`:

- `publish.yml` — triggered by tag push `v*`. Installs only in `packages/design-system`, builds with tsup, runs `npm publish` to `https://npm.pkg.github.com`. Auth uses `GITHUB_TOKEN`. **Tests are not run in this workflow** — verify locally before tagging.
- `deploy-docs.yml` — triggered by push to `main`. Builds DS then docs, deploys `docs/storybook-static` to GitHub Pages.

`version:publish` does the bump-commit-tag-push end-to-end; manual steps are echoed by `scripts/version.js` if you only want the bump.

## Library architecture

The library is a thin opinionated wrapper around **Ant Design 6**. The public API in `packages/design-system/src/index.ts` is in three layers:

1. **Customized components** (`./components/*`) — re-exported first so they win the name collision against antd.
2. **Theme** (`./theme/*`) — `JuscashProvider` (the top-level `ConfigProvider` with pt-BR locale, dayjs locale, and `AntdRegistry`) + design tokens (`colors`, `radius`, `shadow`, `spacing`, `breakpoints`) under `./theme/foundations/`.
3. **Passthrough re-exports** of antd primitives that aren't customized (Layout, Form, Pagination, Tooltip, etc.). The base antd `Button` is re-exported as `AntButton` so it stays accessible. `LucideIcons` is re-exported as a namespace from `lucide-react`.

**CSS:** `src/theme/global.css` is copied to `dist/index.css` at build time. Consumers must import it: `import "@juscash/design-system/dist/index.css"`. Storybook handles this via the preview decorator.

**Externals (tsup):** `react`, `react-dom`, `antd`, `@ant-design/cssinjs` — these stay as peer deps so consumers' antd version is used.

## Component pattern (important when adding/editing)

Each customized component lives in `packages/design-system/src/components/<Name>/` with four files:

```
<Name>.tsx          // implementation
<Name>.stories.tsx  // CSF3 stories
<Name>.test.tsx     // Vitest + Testing Library
index.ts            // export * from "./<Name>"
```

The Juscash style is applied **per-instance** by wrapping the antd primitive in a local `ConfigProvider` with token overrides — not globally. See `Button.tsx` for the canonical pattern: each variant has its own `getXxxTokens(): Partial<ButtonToken>` function returning antd component-level tokens, and the render path does:

```tsx
<ConfigProvider theme={{ components: { Button: { ...tokens, ...sizeTokens } } }}>
  <AntdButton type={antdType} ... />
</ConfigProvider>
```

When adding a new variant or component, follow this token-override pattern rather than CSS overrides. Pull color/radius/spacing/shadow values from `../../theme` (foundations) instead of hardcoding hex/px.

**Pseudo-focus class:** the `pseudo-focus-visible` / `pseudo-focus` className (from `storybook-addon-pseudo-states`) is checked at runtime to apply `shadow.focus` as `boxShadow`. This is so the addon's "show focus state" toggle works in Storybook — keep the check when copying the Button pattern.

## Testing

- Runner: **Vitest 4** + jsdom. Setup in `packages/design-system/vitest.setup.ts` (just `@testing-library/jest-dom/vitest`).
- Match pattern: `src/**/*.test.{ts,tsx}`.
- Single file/test: pass a name filter after `--`, e.g. `npm run test:run -w @juscash/design-system -- Button.test`.
- Storybook tests are a separate Vitest project under `docs/` using `@storybook/addon-vitest` + Playwright browser mode.

## Conventions

- **Conventional Commits** — `chore: bump @juscash/design-system to X.Y.Z` is auto-generated; the rest of the history is freer (`fix:`, `chore:`).
- **Prettier**: `printWidth: 130`, `experimentalTernaries: true`, `experimentalOperatorPosition: "start"`, double quotes, trailing commas.
- **Locale**: components ship pt-BR strings via `JuscashProvider` (e.g., the Table sort tooltips are overridden in Portuguese). Don't introduce hardcoded English copy.
- **Icons**: use `lucide-react` only — antd's icon package isn't a dependency.

## Side directories

- `.context/` — agent playbooks, skill definitions, architectural docs. Reference material for agents; not consumed by the build.
- `.changeset/` — changesets is configured (`config.json`) but the active release flow uses the `scripts/version*.js` path; changesets isn't currently wired to CI.
- `documentacao/` — internal Portuguese docs (Confluence exports, install/creation guides). Edit when adding user-facing docs.
- `assets/`, `JS-2050.txt`, `prompt.md` — legacy reference material, not part of the build.
