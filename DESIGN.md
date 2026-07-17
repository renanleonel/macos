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

Menu bar, Dock, menus, widgets, and window sidebars use backdrop blur plus a thin inner highlight. Main application content stays more opaque for reading. Corners follow the reference: 16px windows, 14px widgets, and 20px Dock.

## Motion

Use fast exponential ease-out movement for opening, focusing, and Dock hover. Window dragging is direct. Minimize collapses toward the Dock. Reduced-motion users receive fades or instant state changes.

## Layout

The desktop fills the viewport with a 24px menu bar and a bottom Dock. Widgets sit in the top-left, desktop files in the top-right, and app windows occupy the central work area. On narrow screens, windows become inset full-screen sheets and nonessential widgets disappear.
