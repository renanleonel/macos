import { useEffect, useRef } from 'react';

import { cn } from '@/shared/utils/cn';

type KeyboardShortcutsDialogProps = {
  onClose: () => void;
};

const SHORTCUTS = [
  { keys: '⌘ / Ctrl + Space', label: 'Open Spotlight' },
  { keys: 'Esc', label: 'Close menus and overlays' },
  { keys: 'Double-click', label: 'Open a Finder item or toggle a window title bar' },
  { keys: 'Drag', label: 'Move a window by its title bar' },
] as const;

export function KeyboardShortcutsDialog({ onClose }: KeyboardShortcutsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'keyboard-shortcuts-dialog',
        '[&.keyboard-shortcuts-dialog]:w-[min(430px,calc(100vw-30px))] [&.keyboard-shortcuts-dialog]:p-4.5 [&.keyboard-shortcuts-dialog]:[border:0] [&.keyboard-shortcuts-dialog]:rounded-[14px] [&.keyboard-shortcuts-dialog]:text-(--label-primary) [&.keyboard-shortcuts-dialog]:[background:var(--material-popover)] [&.keyboard-shortcuts-dialog]:[box-shadow:0_18px_44px_oklch(0.04_0.02_250/0.38),inset_0_0_0_1px_var(--glass-stroke)]',
        '[&.keyboard-shortcuts-dialog::backdrop]:[background:oklch(0.05_0.01_250/0.24)] [&.keyboard-shortcuts-dialog::backdrop]:[backdrop-filter:blur(4px)]',
        '[&.keyboard-shortcuts-dialog_header]:flex [&.keyboard-shortcuts-dialog_header]:items-center [&.keyboard-shortcuts-dialog_header]:justify-between',
        '[&.keyboard-shortcuts-dialog_header_strong]:text-[15px]',
        '[&.keyboard-shortcuts-dialog_header_button]:min-h-6.75 [&.keyboard-shortcuts-dialog_header_button]:p-[3px_10px] [&.keyboard-shortcuts-dialog_header_button]:[border:0] [&.keyboard-shortcuts-dialog_header_button]:rounded-[7px] [&.keyboard-shortcuts-dialog_header_button]:text-[white] [&.keyboard-shortcuts-dialog_header_button]:text-[12px] [&.keyboard-shortcuts-dialog_header_button]:font-[650] [&.keyboard-shortcuts-dialog_header_button]:[background:var(--system-blue-deep)]',
        '[&.keyboard-shortcuts-dialog_p]:m-[8px_0_14px] [&.keyboard-shortcuts-dialog_p]:text-(--label-secondary) [&.keyboard-shortcuts-dialog_p]:text-[12px]',
        '[&.keyboard-shortcuts-dialog_dl]:m-0 [&.keyboard-shortcuts-dialog_dl]:overflow-hidden [&.keyboard-shortcuts-dialog_dl]:rounded-[9px] [&.keyboard-shortcuts-dialog_dl]:[background:var(--material-raised)] [&.keyboard-shortcuts-dialog_dl]:[box-shadow:inset_0_0_0_1px_var(--separator)]',
        '[&.keyboard-shortcuts-dialog_dl_>_div]:min-h-10.5 [&.keyboard-shortcuts-dialog_dl_>_div]:grid [&.keyboard-shortcuts-dialog_dl_>_div]:grid-cols-[136px_1fr] [&.keyboard-shortcuts-dialog_dl_>_div]:items-center [&.keyboard-shortcuts-dialog_dl_>_div]:gap-3 [&.keyboard-shortcuts-dialog_dl_>_div]:p-[7px_10px] [&.keyboard-shortcuts-dialog_dl_>_div]:[border-bottom:1px_solid_var(--separator)]',
        '[&.keyboard-shortcuts-dialog_dl_>_div:last-child]:[border-bottom:0]',
        '[&.keyboard-shortcuts-dialog_dt]:text-[12px] [&.keyboard-shortcuts-dialog_dt]:font-[650]',
        '[&.keyboard-shortcuts-dialog_dd]:m-0 [&.keyboard-shortcuts-dialog_dd]:text-(--label-secondary) [&.keyboard-shortcuts-dialog_dd]:text-[12px]',
      )}
      aria-label='Keyboard Shortcuts'
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header>
        <strong>Keyboard Shortcuts</strong>
        <button type='button' onClick={onClose}>
          Done
        </button>
      </header>
      <p>Quick ways to move around this portfolio.</p>
      <dl>
        {SHORTCUTS.map((shortcut) => (
          <div key={shortcut.keys}>
            <dt>{shortcut.keys}</dt>
            <dd>{shortcut.label}</dd>
          </div>
        ))}
      </dl>
    </dialog>
  );
}
