# Refactor and verification

## Required automated gate

Before structural work, record a passing baseline when possible:

```powershell
pnpm check
```

Run it again after each meaningful refactor stage and before handoff. The command runs:

```powershell
pnpm lint
pnpm build
```

`pnpm build` includes TypeScript project checking and the Vite production bundle. No automated test suite is configured, so a passing gate does not prove UI behavior.

## Safe refactor sequence

1. Identify the owning feature and read its architecture references.
2. Record runtime contracts: IDs, enum strings, storage keys, defaults, loading mode, CSS hooks, event order, and mount behavior.
3. Establish any shared domain interface before extracting consumers.
4. Move pure domain code and adapters before changing component composition.
5. Extract containers and components in small feature-owned stages.
6. Keep cross-feature UI composition in `src/app`.
7. Promote only proven multi-feature primitives to `shared`.
8. Run `pnpm check`, inspect the complete diff, and perform the browser checklist.
9. Update the architecture and feature docs that describe the changed contract.

Do not combine a behavior fix, visual redesign, state-library migration, storage migration, or broad formatting pass with a structural refactor unless the task explicitly includes it.

## Parallel agent boundaries

Before delegation, establish shared contracts, `AppId` changes, application metadata, import behavior, and app composition interfaces.

Delegate only disjoint file sets. Assign one owner per feature or infrastructure area and state exact allowed paths. Keep conflict-prone composition files, shared contracts, configuration, and root docs with one integration owner unless ownership is explicitly handed off.

Each delegated result must report:

- files created, moved, or changed;
- behavior-preservation concerns or unresolved coupling;
- commands and browser checks run;
- documentation that needs integration updates.

Do not edit the same file concurrently. Integrate in small batches and inspect for cross-feature UI imports, duplicate domain concepts, renamed runtime values, broken lazy imports, and styling changes.

## Manual browser checklist

Start the application with:

```powershell
pnpm dev
```

Use a clean server/browser session for final verification.

### Startup and session

- Complete startup boot and login; confirm timing, focus, and transitions.
- Lock or log out and return to login.
- Sleep and wake without losing the intended session state.
- Restart through the boot/login flow.
- Shut down and power on through startup.

### Application launch and loading

- Open every Dock application and utility.
- Open every application reachable from Launchpad, Finder entries, desktop files, Spotlight, Siri, and menus.
- Confirm Finder renders immediately and lazy applications show no broken or permanent loading state on first open.
- Verify titles, icons, labels, initial bounds, and single-instance restore behavior.
- Close and reopen each app; confirm only the documented local state resets.

### Window manager

- Focus overlapping windows and verify active styling and z-order.
- Drag through representative pointer paths; confirm smooth direct movement and final clamped state.
- Minimize, restore, maximize, unmaximize, center, move to each half, and close.
- Confirm only one window is maximized at a time.
- Reveal/hide the desktop and verify window transforms and accessibility state.
- Repeat key paths below and above the 900px and 600px responsive breakpoints.

### Desktop surfaces

- Exercise every menu-bar menu and supported command.
- Open/dismiss Wi-Fi, Battery, Siri, Control Center, Notification Center, Spotlight, and Launchpad.
- Verify Force Quit and Keyboard Shortcuts dialogs.
- Check Dock active/minimized/hover/reveal, auto-hide, size, and recents behavior.
- Select/open desktop files and interact with calendar, weather, system, and Today widgets.
- Verify Command/Ctrl + Space and Escape behavior.

### Simulated applications

- Finder: every section, search, selection, all views, sidebar, preview, status bar, icon size, share, copy link, and outside-menu dismissal.
- Safari: navigation anchors, scrolling, project content, and responsive work grid.
- Messages: conversation layout, composer submit, and local sent bubble.
- Photos: gallery and responsive overflow/layout.
- Notes: note selection and Today task toggles from both Notes and desktop widget.
- Terminal: all supported commands, unknown command, empty input, `date`, `clear`, and focus behavior.
- Settings: every section, appearance, accent picker, persistent controls, and session-only controls.
- About: content, outbound links, and intentionally inert More Info control.

### Persistence and failure behavior

- Reload and verify accent, brightness, system preferences, Finder preferences, and completed Today tasks.
- Confirm session-only state resets as documented.
- Test missing and malformed storage values when persistence code changes.
- Confirm blocked storage remains non-fatal.
- Verify weather fallback/offline behavior when weather code changes.
- Verify clipboard failure messaging when sharing code changes.

### Accessibility and console

- Navigate changed controls with the keyboard and verify visible focus.
- Verify labels, pressed/expanded state, dialog semantics, and dismissal.
- Exercise reduced motion; for material changes also check reduced transparency and increased contrast.
- Inspect the browser console throughout and introduce no new errors or warnings.

## Completion evidence

Before declaring behavior-preserving work complete, confirm:

- `pnpm check` passes from the final worktree.
- Every authored source filename is kebab-case and local source import uses `@/`.
- No feature UI imports another feature UI; `src/app` owns cross-feature composition.
- Domain code stays pure, reusable browser capabilities stay behind adapters, and scoped lifecycle access remains isolated to hooks or containers with cleanup.
- Application IDs, registry metadata, enum strings, storage keys, defaults, fallbacks, and lazy/eager boundaries are intact unless explicitly changed.
- Tailwind semantics, CSS hooks, accessibility, motion, responsive behavior, and mount/reset behavior were preserved.
- The relevant browser checklist was completed against the integrated build.
- Root and modular docs match the new implementation.

Record any skipped manual check explicitly. Do not treat a clean build as equivalent to browser regression coverage.
