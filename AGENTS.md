# Repository agent guidance

This is the durable entry point for agents working in this repository. Keep this file short. Load only the references relevant to the task, and update the matching reference when an architectural or behavioral contract changes.

## Reference routing

| When the task involves | Read first |
| --- | --- |
| Product intent, visitor experience, or portfolio content | [`README.md`](README.md), [`PRODUCT.md`](PRODUCT.md), and [`docs/features/README.md`](docs/features/README.md) |
| Visual direction, styling, motion, or responsive behavior | [`DESIGN.md`](DESIGN.md) and [`docs/architecture/component-conventions.md`](docs/architecture/component-conventions.md) |
| Runtime composition or understanding how the application boots | [`docs/architecture/overview.md`](docs/architecture/overview.md) |
| Adding, moving, or importing modules; deciding feature boundaries | [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md) |
| Domain types, enums, state, contexts, reducers, hooks, or browser APIs | [`docs/architecture/domain-and-state.md`](docs/architecture/domain-and-state.md) |
| Persistence keys, power/session behavior, weather, clipboard, or lazy loading | [`docs/architecture/runtime-and-persistence.md`](docs/architecture/runtime-and-persistence.md) |
| React components, containers, naming, Tailwind, or render performance | [`docs/architecture/component-conventions.md`](docs/architecture/component-conventions.md) |
| Setup, commands, content edits, or documentation maintenance | [`docs/development/workflow.md`](docs/development/workflow.md) |
| Refactoring, delegation, validation, or behavior-preservation checks | [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md) |

Start at [`docs/README.md`](docs/README.md) when a task spans several areas.

## Durable rules

- Preserve the feature-first dependency direction: `src/app -> src/features -> src/shared`. `src/app` is the cross-feature UI composition layer.
- A feature must not import another feature's UI. The current Settings-to-Desktop dependency is limited to shared preference types passed through an app-owned bridge; do not expand it casually.
- Use kebab-case for authored filenames under `src`, named exports, and absolute `@/` imports for local source modules.
- Keep one React component and one domain enum per file. Do not add feature `index.ts` barrels unless the architecture is intentionally changed and documented.
- Keep domain modules deterministic and free of React and browser globals. Put reusable browser capabilities behind adapters, and keep scoped browser lifecycle work in hooks or containers with explicit cleanup.
- Preserve application IDs, serialized enum values, local-storage keys, fallback behavior, Tailwind/CSS semantics, accessibility behavior, animations, and known quirks during structural work.
- Finder is in the initial bundle. Other application content is lazy-loaded in `src/app/containers/app-content-container.tsx`; preserve that boundary unless the task explicitly changes loading behavior.
- React Compiler is enabled in `vite.config.ts`. Treat manual memoization as an exception for measured cost or required reference identity, not a default.
- No automated test runner is configured. Do not claim `pnpm check` runs tests, and do not add test tooling as part of an unrelated change.
- Do not edit the same file concurrently across agents. Establish shared contracts before delegating disjoint feature-owned paths.
- Keep docs synchronized with behavior. An architecture, persistence, command, feature, or content-source change is incomplete until the relevant linked document is updated.

## Commands

```powershell
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm check
pnpm preview
```

Run `pnpm check` before handoff. For behavior-affecting UI work, also complete the relevant browser checks in [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md).
