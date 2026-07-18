# Runtime and persistence

## Runtime phases

The desktop renders one of five top-level modes, coordinated by `DesktopProvider` and `DesktopCompositionContainer`:

```text
startup or restart boot -> login -> awake desktop
                                 -> sleep -> awake desktop
                                 -> shutdown -> power on -> startup boot
                                 -> logout/lock -> login
```

- `BootMode.STARTUP` and `BootMode.RESTART` show `BootScreen` for two seconds through the boot timer adapter.
- After boot, `loggedIn` is false and `LoginScreen` is shown.
- Sleep keeps the session state and reveals `SleepScreen`; wake returns to the desktop.
- Shutdown clears the logged-in view and shows `ShutdownScreen`; power-on starts a new boot animation.
- Restart clears login and starts `BootMode.RESTART`.

These states are not persisted. A full page reload always begins with the startup boot flow and the reducer's initial Finder window.

## Window lifecycle

`WindowManagerProvider` starts with one Finder `WindowState`. All application actions go through the pure `windowReducer`.

- Opening a closed app creates a window from `APPLICATION_REGISTRY` and adds a small cascade offset.
- Opening an existing app restores it if minimized and raises its z-order.
- Only one window may exist per `AppId`.
- Focusing assigns the next highest z-order.
- Moving commits a clamped final position.
- Center and half-screen layouts use viewport-aware domain calculations.
- Maximize permits only one maximized window at a time.
- Minimize preserves the mounted content; close unmounts and removes it.

Window positions and open applications are session-only and reset on reload.

## Application loading

`AppContentContainer` is the loading boundary.

| Content | Loading behavior | Reason |
| --- | --- | --- |
| Finder | Eager | It is the initial window and must render immediately after login. |
| Safari, Messages, Photos, Notes, Terminal, Settings, About | `React.lazy` | They are loaded only after a user opens the app. |

All lazy content shares `AppContentLoading` through `Suspense`. Keep named-export adaptation in each dynamic import. A loading change must verify first open, reopen, minimize/restore, build chunking, focus, and fallback appearance.

## Persistent browser contracts

The application persists a small allowlist through the shared safe local-storage adapter.

| Key | Owner | Shape and default | Validation/fallback |
| --- | --- | --- | --- |
| `macos27:accent-color` | Desktop | `AccentColorId`; blue | Accepts only IDs present in `ACCENT_COLORS`. |
| `macos27:display-brightness` | Desktop | Number; `82` | Coerces to a number and falls back when the result is falsy. |
| `macos27:system-preferences` | Desktop | JSON `SystemPreferences` | Merges parsed partial data over `DEFAULT_SYSTEM_PREFERENCES`; malformed JSON uses all defaults. |
| `macos27:finder-preferences` | Finder | JSON `FinderPreferences` | Merges parsed partial data over `DEFAULT_FINDER_PREFERENCES`; malformed JSON uses all defaults. |
| `macos27:today-completed` | Notes | JSON array of `TodayTaskId` | Keeps only string IDs that exist in `TODAY_TASKS`; malformed/non-array data becomes empty. |

`readLocalStorage` returns `null` when storage is missing, blocked, or throws. `writeLocalStorage` makes failures non-blocking. The interface always keeps the in-memory value even when persistence fails.

Storage key strings, enum string values, serialized shapes, merge behavior, and defaults are compatibility contracts. Do not rename or consolidate them without an explicit migration and documentation update.

## Session-only state

The following deliberately resets on reload:

- login, boot, sleep, shutdown, and dialog state;
- open windows, their positions, z-order, minimize/maximize state;
- dark mode and low-power mode;
- active overlay and desktop reveal;
- selected desktop file, Finder section/search/selection, and selected note;
- selected Settings section and simulated Settings panel toggles;
- Messages sent state and Terminal history.

Closing and reopening an app resets state local to that app's mounted content. Finder and Notes provider state remains because their providers live above the window content.

## Settings persistence boundaries

System Settings mixes real desktop state with simulated panel state:

- Persistent: accent color; Dock auto-hide, size, and recent apps; Do Not Disturb; volume; display brightness when changed from system surfaces.
- Session-only but desktop-wide: dark mode and low-power mode.
- Settings-local simulation: controls represented only by `SettingsProvider.toggleValues`, plus the native uncontrolled wallpaper-tinting checkbox.

The Settings feature must not write storage directly for Desktop-owned values. `SettingsContentContainer` passes Desktop actions into it so there remains one persistence owner.

## Browser capabilities

Browser and external APIs are concentrated in adapters or in a scoped hook/container that owns the corresponding lifecycle:

| Capability | Owner | Behavior |
| --- | --- | --- |
| Local storage | `shared/adapters/local-storage.ts` plus feature storage adapters | Safe read/write with feature-owned parsing and defaults. |
| Viewport and animation frames | `window-manager/adapters/browser-window.ts` | Window IDs, viewport reads, and request/cancel animation frame. |
| Clipboard | `finder/adapters/portfolio-link-clipboard.ts` | Copies the current URL; returns a friendly fallback string on failure. |
| Boot timer | `desktop/adapters/boot-timer.ts` | Schedules/cancels the two-second boot completion. |
| Keyboard events | `desktop/adapters/desktop-keyboard.ts` | Subscribes to document keydown for desktop shortcuts. |
| Weather request | `desktop/adapters/maringa-weather.ts` | Fetches current conditions from Open-Meteo for Maringa. |
| Terminal focus | `terminal/adapters/schedule-input-focus.ts` | Schedules input focus on the next animation frame. |
| Finder outside-pointer dismissal | `finder/containers/finder-container.tsx` | Installs a toolbar-scoped document listener inside an effect and removes it during cleanup. |

Hooks and containers own lifecycle cleanup around these capabilities. Domain code never calls browser APIs directly.

## Weather behavior

`useMaringaWeather` starts with `DEFAULT_WEATHER`, requests current conditions immediately, and refreshes every 15 minutes. The request uses an `AbortController`; unmount aborts the request and clears the interval.

Invalid responses, non-success status codes, offline errors, and non-abort exceptions leave the last known or default weather visible. Weather is not stored and is the application's only runtime network request.

## Keyboard and dismissal behavior

Global desktop shortcuts are active while the composition container is mounted:

- Command/Ctrl + Space toggles Spotlight.
- Escape closes the active overlay and cancels desktop reveal.

Individual features may add scoped dismissal, such as Finder toolbar menus closing on an outside pointer event. Keep global and scoped listeners in hooks or containers with explicit cleanup.

## Changing a runtime contract

For a new persisted value or browser capability:

1. Put the pure model/default/validation in the owning domain.
2. Add a narrow adapter around the browser capability.
3. Coordinate it from the owning provider, container, or hook.
4. Define missing, malformed, blocked, offline, and unmount behavior.
5. Preserve or migrate existing serialized values.
6. Update this document and the persistence summary in the root README.
7. Run `pnpm check` and manually verify first load, reload, invalid data, and capability failure.
