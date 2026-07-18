# Repository agent guidance

This file contains the durable rules for work in this repository. Read only the references relevant to the task; for a structural refactor, read all four before editing source files.

## Reference routing

| When the task involves                                                 | Read first                                                                                 |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Adding, moving, or importing modules; deciding feature boundaries      | [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md)         |
| Domain types, enums, state, contexts, reducers, hooks, or browser APIs | [`docs/architecture/domain-and-state.md`](docs/architecture/domain-and-state.md)           |
| React components, containers, naming, styling, or render performance   | [`docs/architecture/component-conventions.md`](docs/architecture/component-conventions.md) |
| Refactoring, delegation, validation, or behavior-preservation checks   | [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md) |

## Durable rules

- Use a feature-first `src/app -> src/features -> src/shared` architecture. `src/app` is the sole cross-feature composition layer.
- Use kebab-case for every authored filename under `src`, absolute `@/` imports for every local source import, and named exports throughout `src`.
- Keep one React component and one domain enum per file. Do not add feature `index.ts` entrypoints yet.
- Preserve existing behavior, persisted values and keys, Tailwind/CSS semantics, animations, and known quirks during structural work.
- Do not add tests or lazy loading in this refactor phase. Lazy loading is a documented follow-up, not part of the current change.
- Do not edit the same file concurrently across agents. Establish shared contracts before delegating disjoint feature-owned files.

## Commands

```powershell
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm check
pnpm preview
```

Run `pnpm check` after each refactor stage. Before declaring behavior-preserving work complete, also perform the browser checklist in [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md).
