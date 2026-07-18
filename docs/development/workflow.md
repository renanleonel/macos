# Development workflow

## Prerequisites and setup

The repository is a single-package pnpm project.

```powershell
pnpm install
pnpm dev
```

`package.json` declares pnpm 10.28.2. Vite prints the local development URL. A normal first load shows the boot screen for about two seconds, followed by login.

Generated paths are ignored:

- `node_modules/`
- `dist/`
- `.playwright-cli/`
- local `.agents`, `.codex`, and `.claude` tool directories
- PNG and log artifacts

Checked-in agent guidance therefore belongs in root `AGENTS.md` and `docs/`, not a local tool folder.

## Commands

| Command | What it verifies |
| --- | --- |
| `pnpm dev` | Starts Vite with hot module replacement. |
| `pnpm lint` | Runs ESLint over TypeScript/TSX and configuration source. |
| `pnpm build` | Runs `tsc -b`, then creates the Vite production bundle. |
| `pnpm check` | Runs lint and build in sequence; this is the required automated gate. |
| `pnpm preview` | Serves an existing production build. |

No automated test runner is configured. Do not describe `pnpm check` as a test command. Behavior-affecting work needs a focused browser pass after the automated gate.

## Before editing

1. Read `AGENTS.md` and the smallest relevant linked references.
2. Inspect the live source files; documentation describes contracts but source remains the final implementation evidence.
3. Check `git status --short` and preserve unrelated user changes.
4. For a behavior-preserving refactor, run `pnpm check` for a clean baseline.
5. Identify state ownership, persistence keys, app-loading boundaries, semantic classes, and browser integrations before moving code.

## Common change paths

### Edit portfolio content

Use the source map in [`../features/README.md`](../features/README.md). Content is feature-owned rather than loaded from a CMS.

Search for placeholder identity/contact values before editing because some copy appears independently in Safari, Terminal, Messages, About, Finder, and Notes. Preserve typed enums/models while replacing content.

### Add a simulated application

Follow the checklist in [`../architecture/project-structure.md`](../architecture/project-structure.md). The work normally touches `AppId`, `APPLICATION_REGISTRY`, one new feature folder, `AppContentContainer`, and selected Dock/Launchpad/Finder presentation lists.

Verify first-load chunking, launch from every surface, single-instance restore, minimize, maximize, close/reopen, and responsive layout.

### Add or change a preference

1. Decide whether the value is Desktop-wide, feature-wide, or component-local.
2. Define the model and default in the owning domain.
3. If persistent, add an owning adapter with validation and non-blocking failure behavior.
4. Update the owning provider action; Settings should consume Desktop preferences through the app bridge.
5. Preserve existing storage keys and serialized values, or create an explicit migration.
6. Update [`../architecture/runtime-and-persistence.md`](../architecture/runtime-and-persistence.md).

### Change a window interaction

Read `domain/reducers/window-reducer.ts`, `hooks/use-window-interactions.ts`, and the window sections of the architecture docs first.

Keep pointer-move feedback imperative and commit final movement through the reducer. Exercise mouse/pointer capture, clamping, focus, maximize animation, responsive bounds, and reduced motion.

### Add a browser integration

Keep browser access in an adapter, pure transformations in domain modules, and lifecycle/cleanup in a hook or container. Define unavailable, denied, malformed, offline, aborted, and unmount behavior before implementation.

### Change styling

Read `DESIGN.md` and [`../architecture/component-conventions.md`](../architecture/component-conventions.md). Preserve semantic state classes and root variables. Run `pnpm build` so Tailwind verifies scanned class strings.

## Validation

During implementation, use the narrowest useful feedback:

```powershell
pnpm lint
pnpm build
```

Before handoff, always run:

```powershell
pnpm check
```

For visual or behavior changes, start a clean dev server and perform the relevant subset of [`../architecture/refactor-verification.md`](../architecture/refactor-verification.md). Restart Vite before trusting the console if a large refactor produced stale Fast Refresh noise.

Report:

- files or contracts changed;
- `pnpm check` result;
- browser paths exercised;
- any manual checks not completed;
- known placeholder or intentionally inert behavior left unchanged.

## Deployment analytics

Vercel Web Analytics is installed as a runtime dependency and mounted once in `src/main.tsx`. To collect production traffic, enable Analytics for the Vercel project and redeploy. No environment variable is required. After deployment, visit the production site and verify an analytics request in the browser Network panel before relying on dashboard data.

## Documentation maintenance

Update the matching reference in the same change:

| Implementation change | Documentation |
| --- | --- |
| Script, dependency, compiler, or validation gate | Root `README.md`, `AGENTS.md`, this file |
| Runtime composition or lazy boundary | `architecture/overview.md`, `runtime-and-persistence.md` |
| State owner, context, reducer, or memoization policy | `architecture/domain-and-state.md` |
| Storage key, default, external request, browser API | `architecture/runtime-and-persistence.md` |
| Module boundary or placement convention | `architecture/project-structure.md` |
| Component, styling, accessibility, motion convention | `architecture/component-conventions.md` and possibly `DESIGN.md` |
| User-facing behavior or content source | `features/README.md` and root `README.md` |

Check relative links after moving documentation. Keep `AGENTS.md` concise; detailed explanations belong in linked docs.
