export function ControlCenterGlyph() {
  return (
    <svg
      className='native-status-icon [&.native-status-icon]:w-4.25 [&.native-status-icon]:h-4.25 [&.native-status-icon]:block'
      viewBox='0 0 18 18'
      aria-hidden='true'
    >
      <rect x='2' y='3' width='14' height='5' rx='2.5' fill='currentColor' />
      <circle cx='12.8' cy='5.5' r='1.65' fill='var(--control-center-knob, white)' />
      <rect x='2' y='10' width='14' height='5' rx='2.5' fill='currentColor' />
      <circle cx='5.2' cy='12.5' r='1.65' fill='var(--control-center-knob, white)' />
    </svg>
  );
}
