type BatteryStatusGlyphProps = { level?: number };

export function BatteryStatusGlyph({ level = 84 }: BatteryStatusGlyphProps) {
  const fillWidth = Math.max(1.5, Math.min(9, (level / 100) * 9));
  return (
    <svg
      className='native-status-icon [&.native-status-icon]:w-4.25 [&.native-status-icon]:h-4.25 [&.native-status-icon]:block'
      viewBox='0 0 18 16'
      aria-hidden='true'
    >
      <rect
        x='1'
        y='4'
        width='13.5'
        height='8'
        rx='2.1'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.35'
      />
      <path
        d='M16 6.35v3.3'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        opacity='0.72'
      />
      <rect x='3' y='6' width={fillWidth} height='4' rx='0.9' fill='currentColor' />
    </svg>
  );
}
