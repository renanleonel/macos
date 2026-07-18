# Component conventions

## Extraction boundaries

Split components by coherent responsibility, not by an arbitrary line limit. Extract a component when it has its own interaction, meaningful interface, repeated structure, or independently understandable visual responsibility.

Do not create components that only forward props or render an otherwise unremarkable wrapper. Every React component that is created must live in its own kebab-case file. Keep private prop types colocated with the component:

```tsx
type FinderToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function FinderToolbar({ query, onQueryChange }: FinderToolbarProps) {
  // Existing rendering and interaction behavior.
}
```

Use named exports and absolute `@/` imports. Do not add feature entrypoint files.

## Components and containers

Components render and handle direct interaction. Containers own feature workflows, coordinate domain state, and connect hooks or adapters to components. A local state value alone does not make a module a container.

Keep props narrow and explicit. Prefer derived values to redundant state. Keep state near the components that consume it, and use stable callbacks at shared seams. Apply memoization only when component cost or measurement justifies it; do not add speculative memoization.

## Behavior and style preservation

This refactor is structural. Preserve exactly:

- Tailwind class strings and CSS semantics, including cross-component selectors.
- Theme variables, keyframes, transition durations, easing, and visual stacking.
- Labels, accessibility attributes, focus behavior, pointer behavior, keyboard shortcuts, and event ordering.
- Current inert controls and unfinished interactions, including behavior that looks like a bug or omission.
- Application metadata, ordering, identifiers, icons, and persistence semantics.

Move existing styles with their owning components; do not redesign tokens or clean up styles in the same change.

Preserve the current imperative window interaction strategy. Window dragging continues to update the element through `requestAnimationFrame` during pointer movement and commits React state when dragging ends. Maximize and restore continue to use the existing FLIP-style animation. Encapsulate these mechanisms behind window-manager hooks or adapters without replacing them with React state updates on every pointer event.

## Application metadata

Keep pure application identity and window metadata in one domain registry so Dock, Launchpad, Finder mappings, titles, and application IDs do not redefine the same facts. Presentation-specific icon mappings remain in components, and ordered presentation lists decide which registered applications appear in the Dock or Launchpad.

The registry must not import React. `src/app` maps registered application IDs to feature containers; neither the registry nor the window manager imports application UI.

## Performance scope

In this phase, improve render behavior only through appropriate state locality, narrow props, stable context actions, and justified memoization. Do not add lazy loading or asynchronous loading states. Record application-level lazy loading as a future optimization after the behavior-preserving structural refactor is complete.
