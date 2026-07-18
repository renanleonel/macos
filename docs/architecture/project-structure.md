# Project structure

## Architecture direction

Organize source code by feature first, then by role inside each feature:

```text
src/
  app/
    app.tsx
    containers/
      app-content-container.tsx
  features/
    desktop/
    window-manager/
    finder/
    safari/
    notes/
    photos/
    messages/
    terminal/
    settings/
    about/
  shared/
    components/
    adapters/
    domain/
    hooks/
    utils/
```

Create only folders that have a current responsibility. Do not create empty folders to make every feature match a template.

Each simulated application is an independent feature. Group the menu bar, Dock, desktop files and widgets, login and power screens, and system overlays under `features/desktop`. Keep `features/window-manager` separate because its focus, stacking, dragging, minimizing, maximizing, and window-state behavior form an independent domain.

## Composition and dependencies

`src/app` is the sole composition layer allowed to import all feature containers. Put application-to-container composition, such as mapping an application ID to its rendered feature container, in `src/app/containers/app-content-container.tsx`.

The window manager accepts rendered content and must not know which simulated applications exist. Feature modules must not import another feature's UI to compose the application. Move a module to `shared` only when at least two features genuinely use the same stable interface and neither feature owns it.

Do not add feature `index.ts` entrypoints in this phase. Import the owning module directly with an absolute source alias:

```ts
import { FinderView } from '@/features/finder/domain/enums/finder-view';
```

Every local source import must begin with `@/`. Package imports such as `react` and `lucide-react` remain package imports.

## Feature roles

A feature may use these roles when needed:

```text
feature/
  components/
  containers/
  hooks/
  adapters/
  domain/
    enums/
    models/
    constants/
    reducers/
    selectors/
  utils/
```

- `components`: presentation and direct user interaction.
- `containers`: feature-level workflow ownership and coordination of state, domain operations, adapters, and components.
- `hooks`: React lifecycle coordination, especially between components or containers and adapters.
- `adapters`: React-independent access to browser or external capabilities.
- `domain`: pure feature vocabulary, state transitions, invariants, and deterministic operations.
- `utils`: small deterministic helpers that are genuinely generic within their scope; do not use it as a miscellaneous dumping ground.

Leaf components may own truly local ephemeral UI state, such as whether their own popover is open. Do not create a pass-through container for every stateful component.

## File and symbol conventions

- All authored files under `src` use kebab-case, including `src/app/app.tsx`.
- React components, containers, domain models, and enums use `PascalCase`.
- Enum members and module-level constants use `UPPER_SNAKE_CASE`.
- Functions, selectors, adapters, and variables use `camelCase`.
- Hooks use `useCamelCase`.
- Source modules use named exports. Configuration files may retain the export style required by their tooling.
- Keep one React component per file and one enum per file.
- Keep a component's private prop type in its component file. Move a type into the domain only when multiple modules share the domain concept.
