# Domain and state

## Domain taxonomy

Feature domain code is deterministic. It must not import React, read browser globals, call `fetch`, or mutate the DOM.

Use these categories when the feature has them:

```text
domain/
  constants/   static data, defaults, registries, copy
  enums/       stable closed sets with persisted string values
  models/      object-shaped concepts and state contracts
  reducers/    deterministic state transitions
  selectors/   deterministic derived values
```

Pure operations that do not fit a category may live directly under `domain`, such as `execute-terminal-command.ts`, `calculate-window-layout.ts`, and `clamp-window-position.ts`.

Reusable or independently meaningful browser capabilities belong in `adapters`; hooks or containers coordinate them with React lifecycle. For example, the weather adapter performs `fetch`, while `use-maringa-weather.ts` owns cancellation, refresh cadence, and React state. A tightly scoped DOM subscription may remain in its workflow owner, as Finder's toolbar outside-pointer listener does, provided the effect performs explicit cleanup.

## Closed domain concepts

Use a dedicated string enum for a stable, closed concept when its values participate in state, persistence, rendering switches, or public contracts:

```ts
export enum FinderView {
  ICONS = 'icons',
  LIST = 'list',
  COLUMNS = 'columns',
  GALLERY = 'gallery',
}
```

Each enum lives in its own kebab-case file. Preserve existing string values exactly; `AppId`, Finder preferences, task IDs, overlay IDs, Settings sections, window actions, and power states all depend on them.

Use a union over existing enums when a concept combines two closed sets:

```ts
export type DockId = AppId | DockUtilityId;
```

Do not create enums for arbitrary UI copy, open-ended server values, or a boolean with no meaningful domain vocabulary.

## Provider tree and ownership

Long-lived state is composed in `src/app/app.tsx`:

```text
WindowManagerProvider
  DesktopProvider
    FinderProvider
      NotesProvider
        DesktopCompositionContainer
```

| Owner | State | Persistence |
| --- | --- | --- |
| `WindowManagerProvider` | Open windows, bounds, z-order, minimized/maximized flags | Session only |
| `DesktopProvider` session | Login, boot mode, power state, active system dialog | Session only |
| `DesktopProvider` appearance | Dark mode, accent, low-power mode, system preferences, brightness | Accent, preferences, and brightness persist |
| `DesktopProvider` interaction | Active overlay, desktop reveal, selected desktop file | Session only |
| `FinderProvider` | Current section and Finder preferences | Preferences persist; section is session-only |
| `NotesProvider` | Selected note and completed Today tasks | Completed tasks persist; selection is session-only |
| `DesktopCompositionContainer` | Selected System Settings section | Session only, survives closing the Settings window |
| `SettingsProvider` | Accent-picker disclosure and simulated panel toggles | Local to the mounted Settings content |
| Feature containers/components | Search text, selected item, Terminal lines, Messages conversation state, popovers | Local to the mounted feature |

Opening an already-open application restores and focuses the same window. Minimizing keeps its content mounted, so local state survives. Closing removes the window; reopening mounts fresh feature-local state. Provider-owned Finder and Notes state survives closing their windows because those providers live above application content.

## State and action contexts

Shared feature state uses separate state and action contexts:

```text
contexts/
  <feature>-state-context.ts
  <feature>-actions-context.ts
hooks/
  use-<feature>-state.ts
  use-<feature>-actions.ts
```

Consumers use the owning hooks instead of reading a context directly. The hooks fail clearly when called outside the provider.

Desktop is split further by update domain:

- session state/actions;
- appearance state/actions;
- interaction state/actions.

This keeps APIs cohesive without putting every desktop concern into one value. Do not create one context per field, and do not recombine the current contexts into an all-purpose desktop object.

## Reducers and deterministic transitions

The window manager uses `useReducer` because window actions form a coherent state machine. Its reducer owns:

- single-instance open/restore behavior;
- close and focus;
- final movement commits;
- calculated window arrangements;
- minimize and maximize transitions;
- z-order increments.

The reducer receives viewport information in actions instead of reading `window`, keeping it deterministic. `calculate-window-layout.ts` and `clamp-window-position.ts` remain pure domain operations.

Notes task completion is a smaller pure reducer function. Do not introduce `useReducer` only for uniformity when a feature has a few independent local values.

## Derived state

Prefer computing values during render over synchronizing redundant state. Current examples include:

- active and fullscreen windows selected from the window collection;
- filtered Finder entries derived from section, query, and constants;
- the current note selected from note ID and note constants;
- presentation lists derived from `APPLICATION_REGISTRY`.

Store the smallest source of truth. Use an effect only for lifecycle synchronization with an external system, event subscription, timer, persistence adapter, or imperative browser behavior.

Refs in Desktop, Finder, and Notes providers hold the latest state for action closures before writing a merged update. Preserve that atomic merge behavior when changing persisted state.

## Containers and local state

Containers coordinate a meaningful workflow; using state alone does not make a component a container.

- `FinderContainer` coordinates search, selection, popovers, preferences, clipboard, and app opening.
- `TerminalContainer` coordinates input and command history with the pure command executor.
- `MessagesContainer` owns conversation search and selection, the current draft, and sent replies grouped by contact.
- `SettingsContainer` scopes a Settings provider around Settings content.

Leaf components may keep ephemeral state that affects only themselves. Promote it only when siblings, system surfaces, persistence, or cross-feature workflows need it.

## React Compiler and memoization

React Compiler is enabled in `vite.config.ts`. Normal functions, object literals, and derived values inside components are compiled with automatic memoization where safe.

Do not add `memo`, `useMemo`, or `useCallback` by reflex. Use manual memoization only when:

- a browser or library API requires stable reference identity;
- a dependency array must represent a deliberately stable external subscription;
- profiling shows a meaningful calculation or subtree still needs an explicit boundary;
- compiler diagnostics require a targeted escape hatch.

Provider count is not itself a performance defect. The current ownership model keeps high-frequency window dragging out of React state until pointer-up and splits contexts by concern. Do not add an external store without profiler evidence of costly shared-state fan-out that cannot be solved with ownership or context boundaries.

## Adapters and failure behavior

Adapters are React-independent and own capability-specific fallback behavior:

- storage adapters validate or merge saved values with defaults;
- the shared local-storage adapter swallows browser access failures;
- the clipboard adapter reports a non-blocking fallback string;
- the weather adapter returns `null` for invalid responses;
- browser-window adapters expose viewport and animation-frame capabilities;
- boot and keyboard adapters wrap timers and document subscriptions.

Hooks and containers decide when to call adapters and how to clean up timers, listeners, requests, pointer state, or animation frames. Keep serialized values, timing, cleanup, and failure behavior stable during refactors.

See [`runtime-and-persistence.md`](runtime-and-persistence.md) for exact keys, lifecycle transitions, loading behavior, and external capabilities.
