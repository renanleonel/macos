import { cn } from '@/shared/utils/cn';

/**
 * Liquid Glass material (macOS 27 Tahoe), expressed as Tailwind class strings.
 *
 * A Tahoe surface is not one translucent fill. It is a lensing backdrop plus a
 * *directional* specular rim — brightest where light enters (top edge), softer
 * where it exits (bottom edge), dimmest on the sides. That asymmetry is the tell
 * that separates real glass from frosted plastic.
 *
 * Two constraints shape how this is written:
 *
 *  - The rim is stacked inset shadows, not a masked gradient border. Tailwind
 *    emits each arbitrary property as its own declaration and may order
 *    `mask-composite` before the `mask` shorthand, which resets it and leaves the
 *    gradient veiling the whole element instead of just its edge.
 *  - Every class is spelled out literally. Tailwind scans raw source text, so a
 *    class assembled from a template literal is never generated.
 *
 * Saturation stays low on purpose. Past roughly 1.3 the wallpaper's colour drags
 * through the surface and every panel turns blue.
 */

/** Backdrop lensing. Neutral enough that panels read grey-white, not tinted. */
const BACKDROP =
  '[backdrop-filter:blur(30px)_saturate(1.25)] [-webkit-backdrop-filter:blur(30px)_saturate(1.25)]';

/**
 * Menu-bar dropdowns and Control Center. Light and near-neutral, the way macOS
 * keeps menus readable over any wallpaper.
 */
export const GLASS_MENU = cn(
  'relative rounded-[14px] [background:oklch(1_0_0/0.62)]',
  BACKDROP,
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.8),inset_1px_0_0_oklch(1_0_0/0.34),inset_-1px_0_0_oklch(1_0_0/0.26),inset_0_-1px_0_oklch(1_0_0/0.5),0_16px_38px_oklch(0.08_0.03_245/0.2),0_3px_10px_oklch(0.08_0.03_245/0.12)]',
  '[.desktop--dark_&]:[background:oklch(0.21_0.008_250/0.74)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.22),inset_1px_0_0_oklch(1_0_0/0.09),inset_-1px_0_0_oklch(1_0_0/0.07),inset_0_-1px_0_oklch(1_0_0/0.14),0_16px_38px_oklch(0.01_0.005_250/0.46),0_3px_10px_oklch(0.01_0.005_250/0.3)]',
);

/** The Dock: more transparent than a menu, so the icons stay the subject. */
export const GLASS_DOCK = cn(
  'relative rounded-[22px] [background:oklch(1_0_0/0.3)]',
  BACKDROP,
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.8),inset_1px_0_0_oklch(1_0_0/0.34),inset_-1px_0_0_oklch(1_0_0/0.26),inset_0_-1px_0_oklch(1_0_0/0.5),0_10px_28px_oklch(0.08_0.03_245/0.18),0_2px_6px_oklch(0.08_0.03_245/0.12)]',
  '[.desktop--dark_&]:[background:oklch(0.18_0.008_250/0.46)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.22),inset_1px_0_0_oklch(1_0_0/0.09),inset_-1px_0_0_oklch(1_0_0/0.07),inset_0_-1px_0_oklch(1_0_0/0.14),0_10px_28px_oklch(0.01_0.005_250/0.42)]',
);

/**
 * A control nested on another glass surface: Control Center's tiles. It carries
 * no backdrop filter of its own — stacking blurs muddies what sits behind both.
 */
export const GLASS_TILE = cn(
  'relative rounded-[12px] [background:oklch(1_0_0/0.46)]',
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.66),inset_0_0_0_1px_oklch(1_0_0/0.26),0_1px_2px_oklch(0.08_0.03_245/0.06)]',
  '[transition:background-color_200ms_var(--ease-mac),box-shadow_200ms_var(--ease-mac),scale_140ms_ease-out]',
  'hover:[background:oklch(1_0_0/0.66)] hover:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.85),inset_0_0_0_1px_oklch(1_0_0/0.4),0_2px_7px_oklch(0.08_0.03_245/0.1)]',
  'active:scale-[0.97]',
  '[.desktop--dark_&]:[background:oklch(1_0_0/0.08)] [.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.12),inset_0_0_0_1px_oklch(1_0_0/0.08)]',
  '[.desktop--dark_&]:hover:[background:oklch(1_0_0/0.14)] [.desktop--dark_&]:hover:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.18),inset_0_0_0_1px_oklch(1_0_0/0.13)]',
);

/** Surfaces opt out of translucency when the user asks the system to reduce it. */
export const GLASS_REDUCED_TRANSPARENCY =
  '[@media(prefers-reduced-transparency:_reduce)]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[background:var(--window-background)]';
