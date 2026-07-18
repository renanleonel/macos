import { FileText } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

export function FinderPreview() {
  return (
    <aside
      className={cn(
        'finder-preview',
        '[&.finder-preview]:w-57.5 [&.finder-preview]:flex-[0_0_230px] [&.finder-preview]:flex [&.finder-preview]:flex-col [&.finder-preview]:items-center [&.finder-preview]:gap-2.5 [&.finder-preview]:p-[34px_20px] [&.finder-preview]:[border-left:1px_solid_var(--separator)] [&.finder-preview]:[background:oklch(0.96_0.005_250)]',
        '[&.finder-preview_.finder-document]:[--finder-icon-size:88px]',
        '[&.finder-preview_dl]:w-full [&.finder-preview_dl]:mt-4 [&.finder-preview_dl]:text-[11px]',
        '[&.finder-preview_dl_div]:grid [&.finder-preview_dl_div]:grid-cols-[0.7fr_1.3fr] [&.finder-preview_dl_div]:gap-2 [&.finder-preview_dl_div]:m-[7px_0]',
        '[&.finder-preview_dt]:text-[oklch(0.5_0.01_250)] [&.finder-preview_dt]:text-right',
        '[&.finder-preview_dd]:m-0',
      )}
    >
      <span
        className={cn(
          'finder-document',
          '[&.finder-document]:relative [&.finder-document]:w-(--finder-icon-size) [&.finder-document]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-document]:grid [&.finder-document]:place-items-center [&.finder-document]:flex-[0_0_auto] [&.finder-document]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-document]:text-[oklch(0.45_0.01_250)] [&.finder-document]:[background:linear-gradient(135deg,white_0_79%,oklch(0.91_0.015_245)_80%)] [&.finder-document]:rounded-[5%_5%_12%_5%] [&.finder-document]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.09),0_3px_7px_oklch(0.1_0.02_250/0.16)]',
          '[&.finder-document_svg]:relative [&.finder-document_svg]:z-2 [&.finder-document_svg]:w-[40%] [&.finder-document_svg]:h-[40%] [&.finder-document_svg]:stroke-[1.8]',
          '[.finder-files--list_&.finder-document]:[--finder-icon-size:20px] [.finder-files--list_&.finder-document]:[transition:none]',
          '[.finder-files--columns_&.finder-document]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-document]:flex-[0_0_24px]',
        )}
      >
        <FileText />
      </span>
      <strong>About Me.md</strong>
      <dl>
        <div>
          <dt>Kind</dt>
          <dd>Markdown document</dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>12 KB</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>Today, 10:09 AM</dd>
        </div>
      </dl>
    </aside>
  );
}
