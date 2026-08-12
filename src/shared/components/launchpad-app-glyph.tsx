const LAUNCHPAD_TILES = [
  { x: 6.5, y: 6.5, fill: '#ff6b5e' },
  { x: 19.5, y: 6.5, fill: '#5ac8fa' },
  { x: 32.5, y: 6.5, fill: '#66d17f' },
  { x: 6.5, y: 19.5, fill: '#c07ce8' },
  { x: 19.5, y: 19.5, fill: '#ffd35c' },
  { x: 32.5, y: 19.5, fill: '#4dd0c4' },
  { x: 6.5, y: 32.5, fill: '#ff9f4a' },
  { x: 19.5, y: 32.5, fill: '#6f8ef5' },
  { x: 32.5, y: 32.5, fill: '#ff7ba8' },
];

/** Launchpad: the 3x3 grid of miniature app tiles. */
export function LaunchpadAppGlyph() {
  return (
    <svg
      className='launchpad-app-glyph [&.launchpad-app-glyph]:w-[80%] [&.launchpad-app-glyph]:h-[80%]'
      viewBox='0 0 48 48'
      aria-hidden='true'
    >
      {LAUNCHPAD_TILES.map((tile) => (
        <rect
          key={`${tile.x}-${tile.y}`}
          x={tile.x}
          y={tile.y}
          width='9'
          height='9'
          rx='2.6'
          fill={tile.fill}
          fillOpacity='0.95'
        />
      ))}
    </svg>
  );
}
