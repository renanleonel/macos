/**
 * Terminal: the tile itself is the screen, so the glyph is just the prompt —
 * a chevron and a cursor rule, with a hairline standing in for the title bar.
 */
export function TerminalAppGlyph() {
  return (
    <svg
      className='terminal-app-glyph [&.terminal-app-glyph]:w-[86%] [&.terminal-app-glyph]:h-[86%]'
      viewBox='0 0 48 48'
      aria-hidden='true'
    >
      <path
        d='M8 14.5h32'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.32'
      />
      <path
        d='m13.5 22 6.5 5.5-6.5 5.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='3.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.5 33h10'
        fill='none'
        stroke='currentColor'
        strokeWidth='3.2'
        strokeLinecap='round'
      />
    </svg>
  );
}
