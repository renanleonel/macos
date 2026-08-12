# Design System

## Direction

Pixel-conscious macOS 27 Tahoe simulation: sunlit ocean wallpaper, transparent menu bar, dense Finder chrome, bright app icons, and liquid-glass surfaces that reveal the desktop beneath them.

## Color

- Brand seed: `oklch(0.817 0.161 75.1)` honey, used sparingly inside Notes and highlights.
- System blue: `oklch(0.67 0.17 245)` for selection and focus.
- Background: the ocean wallpaper; no flat application background.
- Window: translucent neutral whites, with high-opacity content regions.
- Ink: near-black `oklch(0.22 0.01 250)` for strong contrast.

## Typography

Use the native Apple system stack (`-apple-system`, BlinkMacSystemFont, `SF Pro Display`, `SF Pro Text`) so the simulation inherits the closest available San Francisco metrics. Window chrome uses 12–13px; content uses 14–17px; display moments stay restrained.

## Materials

Liquid Glass surfaces compose `GLASS_MENU`, `GLASS_DOCK`, or `GLASS_TILE` from `src/shared/domain/constants/liquid-glass.ts`. Each is a Tailwind class string pairing a lensing backdrop with a **directional** specular rim — brightest on the top edge where light enters, softer on the bottom where it exits, dimmest on the sides. That asymmetry is what separates glass from frosted plastic; a uniform `ring` reads flat. Each constant carries its own `.desktop--dark` variant, so dark appearance needs nothing added in `desktop-shell.tsx`.

Two constraints are baked into how that file is written, and both are easy to undo by accident:

- **The rim is stacked inset shadows, not a masked gradient border.** Tailwind emits each arbitrary property as a separate declaration and may order `mask-composite` before the `mask` shorthand, which resets it — leaving the gradient veiling the whole element instead of just its edge.
- **Classes are spelled out literally**, never assembled from template literals, because Tailwind scans raw source text and will not generate a class it cannot see.

Keep `saturate()` at or below ~1.3. Past that the wallpaper's colour drags through and every panel turns blue.

The menu bar carries **no** material at all — Tahoe's has no fill, blur, or divider. Legibility comes entirely from a soft shadow on the glyphs. Menu titles materialise a glass pill only on hover or while open.

Main application content stays more opaque for reading. Corners follow the reference: 16px windows, 14px widgets, and 24px Dock.

## Motion

Use fast exponential ease-out movement for opening, focusing, and Dock hover. Window dragging is direct. Minimize collapses toward the Dock. Reduced-motion users receive fades or instant state changes.

## Layout

The desktop fills the viewport with a 24px menu bar and a bottom Dock. Widgets sit in the top-left, desktop files in the top-right, and app windows occupy the central work area. On narrow screens, windows become inset full-screen sheets and nonessential widgets disappear.
