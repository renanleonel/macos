# Project structure

## Source tree

The repository uses a feature-first structure. Folders exist only when they have a current responsibility.

```text
src/
  main.tsx                         browser entry point
  styles.css                      global Tailwind import, keyframes, dark tokens
  app/
    app.tsx                       long-lived provider composition
    components/                   app-layer presentation such as loading UI
    containers/                   cross-feature orchestration and bridges
  features/
    about/                        About This Mac content
    desktop/                      shell, menu bar, Dock, overlays, session, appearance
    finder/                       portfolio file browser and preferences
    messages/                     simulated conversation
    notes/                        notes and Today tasks
    photos/                       static gallery
    safari/                       portfolio webpage
    settings/                     settings navigation and panels
    terminal/                     local command interpreter
    window-manager/               window state, layout, frame, and interactions
  shared/
    adapters/                     stable browser wrappers shared by features
    components/                   reusable application glyphs
    domain/                       shared application identity and metadata
    utils/                        small deterministic helpers
```

At the repository root:

- `index.html` defines the document shell, root accessibility/motion utilities, and global system CSS variables.
- `vite.config.ts` configures React, React Compiler, Tailwind, and the `@/` alias.
- `tsconfig.app.json` type-checks browser source; `tsconfig.node.json` type-checks Vite configuration.
- `PRODUCT.md` and `DESIGN.md` define product and visual intent.
- `AGENTS.md` routes agent work to the modular docs under `docs/`.
- `public/` contains assets copied as-is by Vite.

## Dependency rules

The intended direction is:

```text
app -> features -> shared
```

### `src/app`

This is the sole cross-feature UI composition layer. It may import any feature container needed to assemble the desktop.

Current responsibilities are deliberately small:

- `app.tsx` establishes provider order.
- `desktop-composition-container.tsx` coordinates desktop-wide workflows and cross-feature actions.
- `managed-app-window-container.tsx` combines a window frame with application content.
- `app-content-container.tsx` maps every `AppId` to a feature UI and owns lazy-loading boundaries.
- `settings-content-container.tsx` bridges Desktop-owned preferences into the Settings feature.

Do not move feature rendering or feature-to-feature coordination into `main.tsx` or a feature module.

### `src/features`

Each feature owns its UI, feature-local workflows, domain vocabulary, and integrations. A feature must not import another feature's component or container.

Cross-feature behavior is expressed through one of these seams:

1. A callback passed from `src/app`, such as Finder's `openApp`.
2. A shared domain primitive, such as `AppId` or `APPLICATION_REGISTRY`.
3. An app-owned bridge, such as `SettingsContentContainer`.

The Settings feature currently imports `AccentColorId` and `SystemPreferences` types from Desktop because Desktop owns the values it edits. This is a narrow domain-type dependency, not permission to import Desktop UI or state hooks directly. If several features begin consuming those contracts, move the stable vocabulary to `shared/domain` and update the architecture docs.

### `src/shared`

Move a module to `shared` only when at least two features genuinely depend on a stable interface and neither feature is the natural owner.

Current shared responsibilities are:

- safe local-storage primitives;
- application and Dock identifiers;
- canonical application window metadata;
- application glyphs used in more than one surface;
- the `cn` class-name helper.

Do not use `shared` as a miscellaneous folder. Feature-specific browser access, icons, copy, selectors, or helpers stay with their feature.

## Feature roles

A feature may use these roles when needed:

```text
feature/
  components/
  containers/
  contexts/
  hooks/
  adapters/
  domain/
    constants/
    enums/
    models/
    reducers/
    selectors/
  utils/
```

- `components`: presentation and direct user interaction.
- `containers`: workflow ownership and coordination of state, domain operations, adapters, and components.
- `contexts`: typed React context definitions, normally split into state and actions.
- `hooks`: lifecycle coordination and safe context consumers.
- `adapters`: React-independent access to browser or external capabilities.
- `domain`: pure vocabulary, defaults, state transitions, invariants, selectors, and deterministic operations.
- `utils`: small deterministic helpers specific to the owning scope; not a catch-all.

Do not create empty role folders or force a small feature to mirror a template. About and Photos correctly need only a component and a constants file; Desktop needs nearly every role.

## File and symbol conventions

- All authored filenames under `src` use kebab-case, including `src/app/app.tsx`.
- Local source imports use the `@/` alias. Package imports remain package imports.
- Source modules use named exports. Tool configuration may use the export style required by the tool.
- React components, containers, domain models, and enums use `PascalCase`.
- Enum members and module-level constants use `UPPER_SNAKE_CASE`.
- Functions, selectors, adapters, and variables use `camelCase`.
- Hooks begin with `use`.
- Keep one React component and one domain enum per file.
- Keep private prop types in the component file. Extract a model when multiple modules share the concept.
- Import the owning module directly. Do not add feature `index.ts` barrels unless the project intentionally adopts and documents that policy.

Example:

```ts
import { FinderView } from '@/features/finder/domain/enums/finder-view';
```

## Adding a simulated application

An application is a cross-cutting contract. Add it in this order:

1. Add a string member to `src/shared/domain/enums/app-id.ts`. The serialized value is a runtime contract.
2. Add title, label, initial size, and initial position to `APPLICATION_REGISTRY`.
3. Create the owning feature under `src/features/<application>/` with only the roles it needs.
4. Add the application UI mapping in `src/app/containers/app-content-container.tsx`. Prefer a lazy import unless it is required in the initial desktop bundle.
5. Add the application to the intended presentation lists: Dock, Launchpad, Finder sections, menus, Spotlight, or desktop files.
6. Add or reuse an application glyph without putting React in the registry.
7. Update `docs/features/README.md`, the root README application table, and any persistence documentation.
8. Run `pnpm check` and exercise every launch, restore, focus, minimize, maximize, close, and responsive path.

The window reducer intentionally enforces one window per `AppId`. Supporting multiple instances would require an explicit product and domain change, not only a new component.

## Adding shared behavior

Before promoting code to `shared`, answer:

- Which two or more features consume it now?
- Is the interface stable and independent of either feature's UI?
- Can it stay pure, or is a browser adapter required?
- Does moving it force extra dependencies into consumers?

Prefer a feature-owned callback passed through `src/app` when the behavior is cross-feature orchestration rather than a stable shared primitive.

## Assets and styling placement

- Static public assets belong in `public/` and are referenced by their root URL.
- Imported assets that need bundling would belong under the owning source feature.
- Document and root variables belong in `index.html` only when they apply globally from first paint.
- The Tailwind import, wallpaper rule, and global keyframes belong in `src/styles.css`.
- Dark-mode token overrides stay with the activating shell in `desktop/components/desktop-shell.tsx`.
- Feature-specific styling stays with the owning component as Tailwind class strings.

Do not move or rename styles during an unrelated structural change; several component class names are hooks for descendant selectors and animation states.
