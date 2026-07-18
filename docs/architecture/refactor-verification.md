# Refactor verification

## Migration sequence

Perform structural extraction incrementally:

1. Record a passing `pnpm check` baseline.
2. Add the `@/` alias and foundational domain contracts.
3. Extract enums, models, constants, reducers, selectors, and adapters.
4. Extract the window manager and desktop shell.
5. Extract each simulated application feature independently.
6. Promote only proven multi-feature modules to `shared`.
7. Reduce `src/app/app.tsx` to composition.
8. Run the automated gate and complete the browser regression checklist.

Run after every stage:

```powershell
pnpm check
```

`pnpm check` runs both repository gates:

```powershell
pnpm lint
pnpm build
```

Do not add a test runner or test files in this phase. A passing automated gate is necessary but does not prove behavior preservation; complete the manual browser pass as well.

## Parallel agent boundaries

Establish shared domain contracts, application IDs, import alias behavior, and composition interfaces before parallel extraction.

Delegate only disjoint, feature-owned file sets. Assign one owner per feature or infrastructure area and state the exact allowed paths. Agents must not edit the same file concurrently. Keep shared composition, shared contracts, configuration, and conflict-prone root files with a single integration owner unless ownership is explicitly handed off.

Each delegated result must report:

- Files created, moved, or changed.
- Any behavior-preservation concern or unresolved coupling.
- Commands run and their results.

Integrate and run `pnpm check` after each batch. Inspect the combined diff for cross-feature imports, duplicate domain concepts, renamed runtime values, and style changes before starting the next batch.

## Manual browser checklist

Start the application with:

```powershell
pnpm dev
```

Verify the same behavior and visual state before and after the refactor:

- Complete the boot and login flow, including the same initial focus and transition behavior.
- Open every Dock application and every application reachable through Launchpad or menus.
- Confirm application titles, icons, initial window sizes and positions, and single-instance or multi-instance behavior remain unchanged.
- Focus and reorder overlapping windows; verify active styling and stacking order.
- Drag windows through the same pointer paths and confirm movement remains smooth and commits at the same time.
- Minimize, restore, maximize, unmaximize, and close windows from every supported control and entry point.
- Verify Dock active, minimized, hover, and reveal behavior.
- Exercise menu-bar menus, system overlays, desktop reveal, and dismissal by outside click, keyboard, or existing actions.
- Exercise Finder navigation, selection, search, all Finder views, sidebar actions, and preferences.
- Exercise each application's feature-specific controls, including controls intentionally left inert.
- Exercise Settings changes, dark mode and appearance changes, and persistence after reload.
- Verify clock, weather, timers, keyboard shortcuts, and viewport-dependent behavior update on the same cadence and events.
- Exercise sleep, wake, restart, shutdown, logout, and return-to-login flows that the UI exposes.
- Reload the page and confirm stored preferences, identifiers, defaults, and recovery from missing or invalid storage match the previous behavior.
- Check responsive or constrained viewport layouts used by the current application.
- Inspect the browser console throughout the pass; introduce no new errors or warnings.

Treat current quirks as contractual behavior for this phase. Record suspected defects separately instead of fixing them during extraction.

## Completion evidence

Before declaring the refactor complete, confirm all of the following from the current worktree:

- `pnpm check` passes after the integrated refactor.
- Every authored source filename is kebab-case.
- Every local source import uses `@/`, and no feature `index.ts` entrypoint was introduced.
- Each component and enum has its own file, and applicable closed domain concepts use the agreed string enums.
- `src/app` is the only layer composing feature UIs; the window manager is application-agnostic.
- No test tooling, lazy loading, styling redesign, behavior fix, storage-key change, or runtime-value change was mixed into the refactor.
- The full manual browser checklist was completed against the integrated build.

Lazy loading remains a follow-up performance phase. It must include explicit loading-state design and its own behavior verification rather than being folded into this structural change.
