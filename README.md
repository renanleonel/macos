# Renan's macOS Portfolio

An interactive personal portfolio presented as a macOS 27 Tahoe desktop. The operating system is the navigation model: visitors can open applications, manage windows, browse portfolio files, change system preferences, use Spotlight, and explore the work instead of scrolling through a conventional landing page.

The project is a client-only React application. There is no backend or authentication layer; portfolio content is currently stored in typed source modules, lightweight interaction state lives in React, and selected preferences are persisted in the browser.

> The interface and interaction model are intentionally detailed, while biography, project, contact, and social-link content still contains placeholders. See [Customizing the portfolio](#customizing-the-portfolio).

## Experience highlights

- A boot, login, sleep, restart, shutdown, wake, and power-on flow.
- A desktop shell with menu bar, Dock, Launchpad, Spotlight, widgets, desktop files, Control Center, Notification Center, Siri, and system dialogs.
- A reducer-driven window manager with focus, stacking, dragging, minimizing, maximizing, closing, centering, half-screen layouts, and desktop reveal.
- Eight simulated applications: Finder, Safari, Messages, Photos, Notes, Terminal, System Settings, and About This Mac.
- Finder search, sections, multiple views, preview/status/sidebar preferences, sharing, and cross-application navigation.
- Appearance, accent-color, Dock, Focus, sound, battery, and display controls; selected settings survive reloads.
- Responsive window behavior, keyboard focus states, reduced-motion handling, and reduced-transparency fallbacks.
- Live Maringa weather from Open-Meteo with an offline fallback.

## Applications

| Application | What it does |
| --- | --- |
| Finder | Presents the portfolio as a file system, with searchable sections, view controls, preview/status/sidebar options, link sharing, and entries that open other apps. |
| Safari | Renders a portfolio page with placeholder project stories and contact navigation. |
| Messages | Simulates a conversation and a local one-message send interaction. It does not send data to a server. |
| Photos | Displays a generated gallery of named visual tiles. |
| Notes | Shows authored notes and a Today checklist shared with the desktop widget; task completion persists locally. |
| Terminal | Implements a small local command interpreter for `help`, `about`, `projects`, `contact`, `skills`, `date`, and `clear`. |
| System Settings | Controls appearance and a subset of desktop behavior. Some controls are persistent, some are session-only simulations. |
| About This Mac | Presents the portfolio identity as device information and exposes placeholder social/contact links. |

The detailed behavior and source-of-truth files for each application are documented in [`docs/features/README.md`](docs/features/README.md).

## Tech stack

- React 19 and React DOM
- TypeScript in strict mode
- Vite 8
- Tailwind CSS 4 through the Vite plugin
- React Compiler through the Vite React compiler preset
- Lucide React icons plus small custom glyph components
- pnpm 10.28.2
- ESLint 9 with TypeScript, React Hooks, and React Refresh rules

## Quick start

### Prerequisites

- A current Node.js release compatible with Vite 8
- pnpm; the repository declares `pnpm@10.28.2` in `package.json`

### Install and run

```powershell
pnpm install
pnpm dev
```

Open the local URL printed by Vite. The app starts with a two-second boot sequence, then shows the login screen.

### Available commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm lint` | Run ESLint over the repository. |
| `pnpm build` | Type-check both TypeScript projects and create the production bundle in `dist/`. |
| `pnpm check` | Run the required repository gate: lint, then build. |
| `pnpm preview` | Serve the production build locally. Run `pnpm build` first. |

There is currently no automated test suite. UI behavior is verified with `pnpm check` plus the manual browser checklist in [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md).

## Architecture at a glance

```text
src/main.tsx
  -> src/app/app.tsx                         provider composition
      -> WindowManagerProvider              window reducer and actions
      -> DesktopProvider                    session, appearance, interactions
      -> FinderProvider                     Finder section and preferences
      -> NotesProvider                      selected note and task completion
      -> DesktopCompositionContainer        cross-feature orchestration
          -> ManagedAppWindowContainer      window frame + application content
              -> AppContentContainer        AppId-to-feature mapping and lazy loading
```

Source code follows a feature-first dependency direction:

```text
src/app       cross-feature composition and application routing
    |
    v
src/features  desktop, window manager, and simulated applications
    |
    v
src/shared    stable primitives used by more than one feature
```

`src/app` is the only layer that composes feature UIs. Each feature groups the roles it actually needs: `components`, `containers`, `contexts`, `hooks`, `adapters`, `domain`, and `utils`. Shared application identity and initial window metadata live in `src/shared/domain/constants/application-registry.ts`.

Finder is eagerly imported because it is the initial window. Safari, Messages, Photos, Notes, Terminal, Settings, and About are loaded through `React.lazy` and rendered under `Suspense` when requested.

Read [`docs/architecture/overview.md`](docs/architecture/overview.md) for the full runtime map and [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md) for placement and dependency rules.

## State and persistence

State stays close to its owner:

- `WindowManagerProvider` owns the open-window collection and reducer actions.
- `DesktopProvider` owns power/session, appearance, preferences, overlays, and desktop interaction state through separate state/action contexts.
- `FinderProvider` owns Finder navigation and persisted Finder preferences.
- `NotesProvider` owns note selection and persisted Today-task completion.
- Feature containers own short-lived workflows such as Terminal history, Messages send state, Finder search, and Settings-only controls.

The browser stores only these contracts:

| Key | Data |
| --- | --- |
| `macos27:accent-color` | Selected system accent color. |
| `macos27:display-brightness` | Display brightness value. |
| `macos27:system-preferences` | Dock auto-hide/size/recents, Do Not Disturb, and volume. |
| `macos27:finder-preferences` | Finder view, sidebar, preview, status bar, and icon size. |
| `macos27:today-completed` | Completed Notes/Today task IDs. |

Storage reads are validated or merged with defaults, and unavailable storage never blocks the interface. Dark mode, low-power mode, login state, windows, selected app content, and most simulated settings are intentionally session-only. See [`docs/architecture/runtime-and-persistence.md`](docs/architecture/runtime-and-persistence.md) for exact ownership and fallback behavior.

## Customizing the portfolio

The current experience is production-shaped, but much of the personal content is placeholder copy. These are the main editing points:

| Content | Source |
| --- | --- |
| Product purpose and positioning | [`PRODUCT.md`](PRODUCT.md) |
| Visual direction and design tokens | [`DESIGN.md`](DESIGN.md), `index.html`, `src/styles.css`, and `src/features/desktop/components/desktop-shell.tsx` for dark-theme overrides |
| Safari projects and hero/contact copy | `src/features/safari/domain/constants/portfolio-projects.ts` and `src/features/safari/components/safari-content.tsx` |
| Finder portfolio hierarchy | `src/features/finder/domain/constants/finder-sections.ts` |
| Notes copy and Today tasks | `src/features/notes/domain/constants/notes.ts` and `today-tasks.ts` |
| Messages contacts and conversation | `src/features/messages/domain/constants/` |
| Terminal biography, project, and contact output | `src/features/terminal/domain/constants/terminal-command-output.ts` |
| About device facts and links | `src/features/about/domain/constants/about-device-specifications.ts` and `about-content.tsx` |
| Wallpaper | `public/wallpaper-tahoe-day.jpg` |

When changing content that appears in several applications, search for the placeholder value first. Some identity and contact copy is intentionally duplicated in feature-owned presentation modules and has not yet been centralized.

## Documentation

The documentation is modular so humans and agents can load only the context they need:

- [`AGENTS.md`](AGENTS.md): compact repository rules and task router.
- [`docs/README.md`](docs/README.md): complete documentation index and maintenance map.
- [`docs/architecture/overview.md`](docs/architecture/overview.md): runtime composition and major data flows.
- [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md): dependency and file-placement rules.
- [`docs/architecture/domain-and-state.md`](docs/architecture/domain-and-state.md): domain taxonomy, providers, contexts, and performance decisions.
- [`docs/architecture/runtime-and-persistence.md`](docs/architecture/runtime-and-persistence.md): lifecycle, lazy loading, browser integrations, storage keys, and fallbacks.
- [`docs/architecture/component-conventions.md`](docs/architecture/component-conventions.md): React, Tailwind, accessibility, and motion conventions.
- [`docs/features/README.md`](docs/features/README.md): feature catalog and source-of-truth map.
- [`docs/development/workflow.md`](docs/development/workflow.md): setup, change workflows, and doc upkeep.
- [`docs/architecture/refactor-verification.md`](docs/architecture/refactor-verification.md): automated and manual verification.

## Project status and boundaries

- Portfolio projects, biography, email addresses, and social URLs still include placeholders.
- Messages, Photos, Terminal, and most Settings panels are local simulations, not integrations with real services.
- Open-Meteo weather is the only runtime network request.
- The app has no backend, accounts, analytics, or server persistence.
- The current automated gate covers linting, type-checking, and production bundling; browser behavior remains a manual check.

These boundaries are deliberate and should be preserved during architecture-only work. Product changes should update both the implementation and the relevant documentation.
