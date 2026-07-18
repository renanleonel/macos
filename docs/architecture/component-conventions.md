# Component conventions

## Component boundaries

Split a component when it owns a coherent visual or interaction responsibility, exposes a meaningful interface, repeats, or can be understood independently. Do not extract wrappers that only forward props or hide a few unremarkable elements.

Every React component lives in its own kebab-case file and uses a named function export:

```tsx
type FinderToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function FinderToolbar({ query, onQueryChange }: FinderToolbarProps) {
  // Rendering and direct interaction.
}
```

Keep a private prop type in the same file. Move a type to `domain/models` only when it represents shared domain vocabulary, not merely because it is long.

## Components and containers

Components render and handle direct interaction. Containers own workflows and connect state, domain operations, adapters, and components.

Use a container when it coordinates several of these concerns:

- provider state and actions;
- multiple sibling components;
- an adapter or browser capability;
- a pure domain operation;
- cross-feature callbacks supplied by `src/app`.

A local `useState` does not automatically require a container. For example, a disclosure component may own whether its own popover is open.

Keep props narrow and explicit. Pass events and domain values instead of entire provider objects. Prefer domain-specific callbacks such as `openSettings(section)` or `toggleTask(taskId)` over generic dispatch access in presentation components.

## Imports and exports

- Use named source exports.
- Use `@/` for every local source import.
- Import directly from the owning module; no feature barrels exist.
- Use `import type` when an import is type-only.
- Do not import another feature's component or container. Cross-feature UI composition belongs in `src/app`.

## Tailwind and CSS organization

The project uses Tailwind CSS 4 through the Vite plugin, without a `tailwind.config` file.

Styling is split deliberately:

- `index.html` contains document-level system tokens, root defaults, focus behavior, and reduced-motion utilities needed from first paint.
- `src/styles.css` imports Tailwind, declares the wallpaper rule, and owns global keyframes.
- `desktop/components/desktop-shell.tsx` colocates the `.desktop--dark` token overrides and dark descendant variants with the shell that activates them.
- Components own feature-specific utilities and state selectors in `className` strings.
- `src/shared/utils/cn.ts` joins conditional class values.

Many components use a semantic base class such as `app-window`, `finder-app`, or `settings-app` plus Tailwind descendant/state selectors. These class names are behavioral styling hooks. Preserve them when extracting or moving markup.

Do not casually rewrite class strings, convert them to a different styling system, or move them into global CSS. Structural work must preserve:

- selector specificity and descendant relationships;
- CSS-variable names and fallback chains;
- stacking contexts and pointer-event behavior;
- keyframe names, durations, delays, and easing;
- responsive breakpoints and compact-layout behavior;
- reduced-motion, reduced-transparency, and increased-contrast variants.

Run the production build after class changes. Tailwind scans source strings at build time; constructing utility names dynamically can omit required CSS.

## Design tokens

System colors and materials use CSS variables such as:

- `--system-blue` and `--system-blue-deep`;
- `--label-primary` through `--label-quaternary`;
- `--material-titlebar`, `--material-sidebar`, and `--material-content`;
- `--glass-*`, `--separator`, and `--shadow`;
- `--ease-mac`.

The selected accent is injected by `DesktopCompositionContainer` through inline CSS custom properties. Dark mode changes the token layer through `.desktop--dark` Tailwind variants in `desktop-shell.tsx`.

Use existing semantic tokens before introducing a new raw color. Add a token only when it represents a reusable design concept, not a one-off decoration.

## Application icons and metadata

Application identity is split between pure data and presentation:

- `APPLICATION_REGISTRY` owns labels, titles, and initial window bounds without importing React.
- `AppIcon` maps application and utility IDs to Lucide or custom glyph components.
- Dock and Launchpad constants own presentation order.
- `AppContentContainer` owns the application UI mapping.

Do not put JSX, React component references, or feature imports in the application registry.

## Accessibility

Preserve and extend the existing accessibility behavior:

- Use semantic controls (`button`, `input`, `a`, `dialog`) rather than clickable generic elements.
- Keep visible keyboard focus supplied by the root focus-visible rules.
- Maintain labels, `aria-pressed`, `aria-expanded`, `aria-controls`, window labels, and hidden-state semantics.
- Ensure Escape and outside-pointer dismissal continue to work where already supported.
- Keep meaningful control targets available to keyboard users.
- Respect `prefers-reduced-motion`, `prefers-reduced-transparency`, and increased-contrast behavior.
- Do not treat macOS visual fidelity as permission to remove web semantics.

When adding a new interaction, verify keyboard focus order, visible focus, activation, dismissal, and screen-reader naming in addition to pointer behavior.

## Motion and imperative interaction

Motion is part of the product contract. Preserve the current strategies:

- boot completion uses a managed timer;
- window opening/minimizing and desktop reveal use CSS animation and transitions;
- window dragging writes an imperative `translate3d` in `requestAnimationFrame` and commits React state on pointer-up;
- maximize/restore uses the Web Animations API for a FLIP-style transition;
- reduced-motion rules collapse animation durations globally.

Do not move pointer-move window coordinates into React state. That would change responsiveness and rerender behavior. Encapsulate imperative behavior behind hooks and adapters, and always clean up listeners, pointer capture, frames, timers, and animations.

## State and rendering

- Derive filtered, selected, and presentation values during render when possible.
- Keep state at the lowest owner shared by its consumers.
- Use separate state/action contexts at existing shared seams.
- React Compiler is enabled; do not add speculative manual memoization.
- Preserve component mount semantics. Minimized application content stays mounted, while closing a window unmounts it.
- Keep Finder eager and the other app surfaces lazy unless loading behavior is explicitly in scope.

Performance changes must be justified with runtime evidence and verified against interaction behavior, not inferred from component size or provider count alone.

## Behavior preservation

During structural or styling-neutral changes, preserve exactly:

- visible copy, application metadata, ordering, identifiers, and icons;
- current inert controls and placeholder behavior;
- event ordering, focus, selection, and dismissal behavior;
- persistence keys, values, defaults, and error fallbacks;
- window positions, dimensions, limits, and single-instance semantics;
- responsive rules and all Tailwind/CSS semantics.

Record suspected product defects separately instead of silently fixing them in an architecture-only change.
