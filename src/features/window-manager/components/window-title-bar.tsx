import type { PointerEventHandler } from 'react';

import { WindowControls } from '@/features/window-manager/components/window-controls';

type WindowTitleBarProps = {
  title: string;
  maximized: boolean;
  close: () => void;
  minimize: () => void;
  toggleMaximize: () => void;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
};

export function WindowTitleBar({
  title,
  maximized,
  close,
  minimize,
  toggleMaximize,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: WindowTitleBarProps) {
  return (
    <div
      className='window-titlebar [&.window-titlebar]:relative [&.window-titlebar]:h-12.5 [&.window-titlebar]:flex-[0_0_46px] [&.window-titlebar]:grid [&.window-titlebar]:grid-cols-[1fr_auto_1fr] [&.window-titlebar]:items-center [&.window-titlebar]:p-[0_12px] [&.window-titlebar]:[background:linear-gradient(180deg,oklch(1_0_0/0.18),transparent_42%),var(--material-titlebar)] [&.window-titlebar]:[backdrop-filter:blur(34px)_saturate(1.4)] [&.window-titlebar]:[border-bottom:1px_solid_var(--separator)] [&.window-titlebar]:cursor-default [&.window-titlebar]:touch-none [&.window-titlebar_>_strong]:text-[13px] [&.window-titlebar_>_strong]:font-[590] [&.window-titlebar]:basis-12.5 [&.window-titlebar]:px-3.5 [&.window-titlebar]:border-b-[oklch(0.34_0.012_250/0.16)] [&.window-titlebar]:[-webkit-backdrop-filter:blur(34px)_saturate(1.4)] [&.window-titlebar_>_strong]:tracking-[-0.006em] [@media(prefers-reduced-transparency:_reduce)]:[&.window-titlebar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.window-titlebar]:[-webkit-backdrop-filter:none]'
      onDoubleClick={toggleMaximize}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <WindowControls
        title={title}
        maximized={maximized}
        close={close}
        minimize={minimize}
        toggleMaximize={toggleMaximize}
      />
      <strong>{title}</strong>
      <span />
    </div>
  );
}
