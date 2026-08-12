/** Mail: a white envelope whose flap is cut from the tile's own blue. */
export function MailAppGlyph() {
  return (
    <svg
      className='mail-app-glyph [&.mail-app-glyph]:w-[86%] [&.mail-app-glyph]:h-[86%]'
      viewBox='0 0 48 48'
      aria-hidden='true'
    >
      <rect x='7' y='13' width='34' height='22' rx='4.5' fill='white' fillOpacity='0.96' />
      <path
        d='M9.5 16.5 24 27 38.5 16.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
