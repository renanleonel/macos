import { useEffect, useRef } from 'react';
import { AppIcon } from '@/shared/components/app-icon';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { cn } from '@/shared/utils/cn';
type ForceQuitDialogProps = {
  windows: WindowState[];
  onQuit: (id: number) => void;
  onClose: () => void;
};
export function ForceQuitDialog({ windows, onQuit, onClose }: ForceQuitDialogProps) {
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
        'force-quit-dialog',
        '[&.force-quit-dialog]:w-[min(410px,calc(100vw-30px))] [&.force-quit-dialog]:p-4.5 [&.force-quit-dialog]:[border:0] [&.force-quit-dialog]:rounded-[14px] [&.force-quit-dialog]:text-(--label-primary) [&.force-quit-dialog]:[background:var(--material-popover)] [&.force-quit-dialog]:[box-shadow:0_18px_44px_oklch(0.04_0.02_250/0.38),inset_0_0_0_1px_var(--glass-stroke)]',
        '[&.force-quit-dialog::backdrop]:[background:oklch(0.05_0.01_250/0.24)] [&.force-quit-dialog::backdrop]:[backdrop-filter:blur(4px)]',
        '[&.force-quit-dialog_header]:flex [&.force-quit-dialog_header]:items-center [&.force-quit-dialog_header]:justify-between',
        '[&.force-quit-dialog_header_button]:min-h-6.75 [&.force-quit-dialog_header_button]:p-[3px_10px] [&.force-quit-dialog_header_button]:[border:0] [&.force-quit-dialog_header_button]:rounded-[7px] [&.force-quit-dialog_header_button]:text-[white] [&.force-quit-dialog_header_button]:[background:var(--system-blue-deep)]',
        '[&.force-quit-dialog_p]:m-[8px_0_14px] [&.force-quit-dialog_p]:text-(--label-secondary) [&.force-quit-dialog_p]:text-[12px]',
      )}
      aria-label='Force Quit Applications'
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header>
        <strong>Force Quit Applications</strong>
        <button type='button' aria-label='Close Force Quit' onClick={onClose}>
          Done
        </button>
      </header>
      <p>{'If an app isn’t responding, select it and click Force Quit.'}</p>
      <div
        className={cn(
          'force-quit-list',
          '[&.force-quit-list_button]:min-h-6.75 [&.force-quit-list_button]:p-[3px_10px] [&.force-quit-list_button]:[border:0] [&.force-quit-list_button]:rounded-[7px] [&.force-quit-list_button]:text-[white] [&.force-quit-list_button]:[background:var(--system-blue-deep)]',
          '[&.force-quit-list]:overflow-hidden [&.force-quit-list]:rounded-[9px] [&.force-quit-list]:[background:var(--material-raised)] [&.force-quit-list]:[box-shadow:inset_0_0_0_1px_var(--separator)]',
          '[&.force-quit-list_>_div]:min-h-12.5 [&.force-quit-list_>_div]:flex [&.force-quit-list_>_div]:items-center [&.force-quit-list_>_div]:gap-2.5 [&.force-quit-list_>_div]:p-2 [&.force-quit-list_>_div]:[border-bottom:1px_solid_var(--separator)]',
          '[&.force-quit-list_>_div:last-child]:[border-bottom:0]',
          '[&.force-quit-list_>_div_>_span:nth-child(2)]:min-w-0 [&.force-quit-list_>_div_>_span:nth-child(2)]:flex-1 [&.force-quit-list_>_div_>_span:nth-child(2)]:overflow-hidden [&.force-quit-list_>_div_>_span:nth-child(2)]:text-ellipsis [&.force-quit-list_>_div_>_span:nth-child(2)]:whitespace-nowrap',
        )}
      >
        {windows.map((window) => (
          <div key={window.id}>
            <AppIcon app={window.app} size={32} />
            <span>{window.title}</span>
            <button type='button' onClick={() => onQuit(window.id)}>
              Force Quit
            </button>
          </div>
        ))}
        {windows.length === 0 ? (
          <span className='force-quit-empty [&.force-quit-empty]:block [&.force-quit-empty]:p-5.5 [&.force-quit-empty]:text-(--label-secondary) [&.force-quit-empty]:text-center [&.force-quit-empty]:text-[12px]'>
            No apps are currently open.
          </span>
        ) : null}
      </div>
    </dialog>
  );
}
