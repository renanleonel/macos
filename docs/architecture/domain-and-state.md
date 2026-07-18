# Domain and state

## Domain taxonomy

Keep feature domain code pure: it must not import React or read browser globals. Use these subfolders when the category exists:

```text
domain/
  enums/
  models/
  constants/
  reducers/
  selectors/
```

Pure operations that do not fit those categories may live directly under `domain`, for example `execute-terminal-command.ts` or `clamp-window-position.ts`.

Put object-shaped concepts such as `WindowState`, `FinderEntry`, `FinderPreferences`, and `SystemPreferences` in `domain/models`, with one primary model per kebab-case file. A model file may include a closely related supporting type when splitting it would harm locality.

## Enums

Represent every applicable stable, closed domain concept with a dedicated string-valued enum under the owning feature's `domain/enums` folder. Each enum gets its own kebab-case file:

```ts
export enum FinderView {
  ICONS = 'icons',
  LIST = 'list',
  COLUMNS = 'columns',
  GALLERY = 'gallery',
}
```

String values must preserve the existing runtime and persisted values exactly. Use enums for real domain vocabulary such as application IDs, settings sections, power states, overlay IDs, note IDs, desktop-file IDs, and Finder views. Do not create enums for arbitrary UI copy or generic helper values.

When a concept composes other closed sets, use a type alias over dedicated enums instead of duplicating enum members:

```ts
export enum AppId {
  FINDER = 'finder',
  SAFARI = 'safari',
}

export enum DockUtilityId {
  LAUNCHPAD = 'launchpad',
  TRASH = 'trash',
}

export type DockId = AppId | DockUtilityId;
```

## State ownership

Use React's built-in state primitives and a hybrid ownership model; do not introduce a new state library in this phase.

- The desktop shell owns system-wide state: windows, overlays, login and power state, appearance, and persisted system preferences.
- Feature containers own feature-local workflows and state, such as Finder selection and search, Terminal commands, or feature menus.
- Domain reducers and functions own deterministic state transitions.
- Presentational components receive small, explicit props.
- Leaf components may keep local ephemeral interaction state.

At high-update shared seams, separate state and action contexts. A consumer that only calls a stable action should not rerender whenever the corresponding state changes:

```text
contexts/
  window-state-context.ts
  window-actions-context.ts
```

Keep cohesive values grouped; do not create one context per field.

### State library performance decision

Retain the existing Context-based ownership model after the React 19 performance review. The
number of providers is not itself a meaningful performance bottleneck: state and actions are
already separated, root updates are low-frequency, window dragging remains imperative until its
final state commit, and React Compiler stabilizes provider values and unaffected render work.

Do not add Zustand without profiler evidence that consumers need selector-level subscriptions.
Reconsider an external store if a future high-frequency shared state path causes measurable
context fan-out that component locality and narrower contexts cannot address.

## Hooks and adapters

Hooks connect React lifecycle to domain operations and adapters. Examples include:

```text
features/desktop/hooks/use-clock.ts
features/desktop/hooks/use-weather.ts
features/desktop/hooks/use-desktop-shortcuts.ts
features/window-manager/hooks/use-window-drag.ts
```

Adapters are React-independent. Keep shared adapters as thin browser-capability wrappers, while feature adapters own domain semantics such as keys, defaults, validation, and fallback behavior:

```text
shared/adapters/local-storage.ts
features/finder/adapters/finder-preferences-storage.ts
features/desktop/adapters/system-preferences-storage.ts
```

Do not promote a browser capability to `shared` until multiple features genuinely consume it. Viewport measurement and animation-frame behavior may remain in `window-manager` while it is their sole owner.

Preserve all current storage keys, serialized values, defaults, validation behavior, browser timing, and fallbacks during extraction.
