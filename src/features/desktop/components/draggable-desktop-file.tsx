import { useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { getDesktopViewport } from '@/features/desktop/adapters/desktop-viewport';
import type { DesktopFileId } from '@/features/desktop/domain/enums/desktop-file-id';
import { cn } from '@/shared/utils/cn';

type DraggableDesktopFileProps = {
  id: DesktopFileId;
  label: string;
  top: number;
  selected: boolean;
  onSelect: (id: DesktopFileId) => void;
  onOpen: () => void;
  children: ReactNode;
};

export function DraggableDesktopFile({
  id,
  label,
  top,
  selected,
  onSelect,
  onOpen,
  children,
}: DraggableDesktopFileProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onSelect(id);
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - current.x;
    const deltaY = event.clientY - current.y;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) current.moved = true;
    const viewport = getDesktopViewport();
    setOffset({
      x: Math.max(-viewport.width + 106, Math.min(current.offsetX + deltaX, 4)),
      y: Math.max(-top + 8, Math.min(current.offsetY + deltaY, viewport.height - top - 164)),
    });
  };
  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <button
      type='button'
      className={cn(
        `desktop-file${selected ? ' is-selected' : ''}`,
        '[&.desktop-file]:absolute [&.desktop-file]:right-3 [&.desktop-file]:w-21.5 [&.desktop-file]:flex [&.desktop-file]:flex-col [&.desktop-file]:items-center [&.desktop-file]:gap-0.75 [&.desktop-file]:p-0 [&.desktop-file]:[border:0] [&.desktop-file]:text-[white] [&.desktop-file]:[background:transparent] [&.desktop-file]:cursor-default [&.desktop-file]:[text-shadow:0_1px_3px_oklch(0.08_0_0/0.75)] [&.desktop-file]:text-[12px] [&.desktop-file]:pointer-events-auto [&.desktop-file]:touch-none',
        '[&.desktop-file_>_span:last-child]:p-[2px_4px] [&.desktop-file_>_span:last-child]:rounded-sm',
        '[&.desktop-file:focus_>_span:last-child]:text-[white] [&.desktop-file:focus_>_span:last-child]:[background:var(--system-blue-deep)] [&.desktop-file:focus_>_span:last-child]:[box-shadow:0_0_0_1px_oklch(1_0_0/0.18)]',
        '[&.desktop-file.is-selected_>_span:last-child]:text-[white] [&.desktop-file.is-selected_>_span:last-child]:[background:var(--system-blue-deep)] [&.desktop-file.is-selected_>_span:last-child]:[box-shadow:0_0_0_1px_oklch(1_0_0/0.18)]',
      )}
      style={{ top, transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      aria-label={label}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      onDoubleClick={onOpen}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
