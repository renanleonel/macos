type DisplayDimmerProps = { brightness: number };
export function DisplayDimmer({ brightness }: DisplayDimmerProps) {
  return (
    <div
      className='display-dimmer [&.display-dimmer]:fixed [&.display-dimmer]:inset-0 [&.display-dimmer]:z-2000 [&.display-dimmer]:pointer-events-none [&.display-dimmer]:[background:oklch(0_0_0)] [&.display-dimmer]:[transition:opacity_120ms_ease-out]'
      aria-hidden='true'
      style={{ opacity: Math.max(0, ((100 - brightness) / 100) * 0.55) }}
    />
  );
}
