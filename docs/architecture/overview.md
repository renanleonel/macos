# Architecture overview

## System shape

The project is a client-only Vite application that simulates a macOS desktop. React renders one desktop shell; applications are not routes or separate pages. Opening an application adds or restores a window in a shared reducer, and the app composition layer renders the matching feature inside that window.

The dependency direction is:

```text
src/main.tsx
  -> src/app
      -> src/features
          -> src/shared
```

- `src/app` owns provider composition, desktop-wide orchestration, cross-feature bridges, and the `AppId`-to-content switch.
- `src/features` owns the desktop shell, the window manager, and each simulated application.
- `src/shared` owns stable primitives consumed by multiple features, including application identity, initial window metadata, reusable glyphs, safe local-storage access, and `cn`.

Features do not compose other feature UIs. Cross-feature actions such as opening Messages from Finder or applying Desktop preferences inside Settings are passed through containers in `src/app`.

## Entry and provider tree

`src/main.tsx` imports the Inter variable font and global styles, mounts React in strict mode, renders `App`, and mounts the Vercel Web Analytics component once beside it. Analytics is a deployment integration, not a feature dependency or provider.

`src/app/app.tsx` establishes the long-lived provider order:

```text
WindowManagerProvider
  DesktopProvider
    FinderProvider
      NotesProvider
        DesktopCompositionContainer
```

Provider order matters because the composition container reads all four domains. The feature providers do not need to know about each other.

## Composition layer

`DesktopCompositionContainer` is the main integration seam. It:

- selects state and actions from the window, desktop, Finder, and Notes providers;
- owns the currently selected Settings section;
- translates Dock utilities into application actions;
- coordinates boot/login/power screens, overlays, system dialogs, widgets, desktop files, menu bar, Dock, and window instances;
- maps system-menu commands to the active window;
- passes cross-feature callbacks down instead of importing feature UI into another feature.

Each `WindowState` is rendered by `ManagedAppWindowContainer`. That container combines the application-agnostic `AppWindow` frame with `AppContentContainer`, which selects content by `AppId`.

## Application loading

Finder is imported eagerly because `INITIAL_WINDOW` always opens Finder at startup. The other application surfaces are split with `React.lazy` in `src/app/containers/app-content-container.tsx`:

- About
- Messages
- Notes
- Photos
- Safari
- System Settings
- Terminal

All application content renders under one `Suspense` boundary with `AppContentLoading` as the fallback. This is an intentional product and bundle boundary; adding a new application requires deciding whether it belongs in the initial bundle.

## Window flow

```text
Dock, Launchpad, Finder, Spotlight, or menu action
  -> DesktopCompositionContainer.openApp(AppId)
  -> WindowManagerProvider.openWindow(AppId)
  -> windowReducer
       existing app: restore and focus its window
       new app: create one WindowState from APPLICATION_REGISTRY
  -> ManagedAppWindowContainer
  -> AppWindow + AppContentContainer
```

The reducer enforces one window per application. Focus is represented by the greatest `z` value. Minimized windows stay mounted and are restored by another open action; closed windows are removed and feature-local state resets when they are opened again.

Dragging is intentionally hybrid. Pointer moves update the DOM transform inside `requestAnimationFrame` for direct feedback, and the final clamped position is committed to React state on pointer up. Maximize uses the Web Animations API for a FLIP-style transition after the reducer state changes.

## Settings bridge

Settings is the clearest cross-feature bridge:

```text
DesktopProvider appearance state/actions
  -> SettingsContentContainer in src/app
      -> SettingsContainer in src/features/settings
          -> SettingsProvider and SettingsContent
```

The Desktop feature owns persisted system preferences and appearance state. The Settings feature owns its navigation, accent-picker disclosure, and simulated panel toggles. `src/app` connects them. Settings currently imports Desktop-owned preference types for its prop contracts; this narrow domain dependency is tolerated but must not grow into UI coupling.

## Shared application metadata

`src/shared/domain/constants/application-registry.ts` is the canonical registry for application label, title, initial size, and initial position. It is consumed by the window manager and desktop presentation lists.

Presentation order remains feature-owned:

- `desktop/domain/constants/dock-applications.ts` controls Dock order and utilities.
- `desktop/domain/constants/launchpad-applications.ts` controls Launchpad order.
- `finder/domain/constants/finder-sections.ts` controls Finder entries.
- `app/containers/app-content-container.tsx` controls the UI implementation for each `AppId`.

This separation prevents the pure registry from importing React or presentation-specific icons.

## Styling and compilation

Tailwind CSS 4 is compiled through `@tailwindcss/vite`. Global keyframes and base rules live in `src/styles.css`; system variables and document-level defaults are declared on the root elements in `index.html`; feature styles are primarily colocated as Tailwind class strings.

React Compiler is explicitly enabled in `vite.config.ts` through the React compiler preset and Rolldown Babel plugin. The code should therefore rely on normal value derivation and component boundaries before adding manual `memo`, `useMemo`, or `useCallback`.

## Deployment analytics

`src/main.tsx` mounts `Analytics` from `@vercel/analytics/react` once at the root. A Vercel production deployment reports page views and visitor metrics after Web Analytics is enabled for the project. No feature module owns or imports this integration.

## Deeper references

- Placement and dependencies: [`project-structure.md`](project-structure.md)
- State and domain contracts: [`domain-and-state.md`](domain-and-state.md)
- Runtime, storage, and browser APIs: [`runtime-and-persistence.md`](runtime-and-persistence.md)
- React and styling conventions: [`component-conventions.md`](component-conventions.md)
- User-facing feature catalog: [`../features/README.md`](../features/README.md)
