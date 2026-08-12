import { Download, FileText } from 'lucide-react';

import { PROFILE } from '@/shared/domain/constants/profile';
import { cn } from '@/shared/utils/cn';

/**
 * Preview.app standing in for a PDF viewer.
 *
 * Embedded PDFs are unreliable on mobile Safari and Android Chrome — they often
 * render a blank box instead of the document. `<object>` shows its children when
 * it cannot display the resource, so the fallback below is a real download card
 * rather than an empty frame.
 */
export function PreviewContent() {
  return (
    <div className='preview-app [&.preview-app]:h-full [&.preview-app]:flex [&.preview-app]:flex-col [&.preview-app]:[background:var(--material-content)]'>
      <div
        className={cn(
          'preview-toolbar',
          '[&.preview-toolbar]:h-11 [&.preview-toolbar]:flex-[0_0_44px] [&.preview-toolbar]:flex [&.preview-toolbar]:items-center [&.preview-toolbar]:gap-2.5 [&.preview-toolbar]:p-[0_14px] [&.preview-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.preview-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.preview-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.preview-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)]',
          '[&.preview-toolbar_>_svg]:text-(--label-secondary)',
        )}
      >
        <FileText size={16} />
        <span className='preview-title [&.preview-title]:flex-1 [&.preview-title]:overflow-hidden [&.preview-title]:whitespace-nowrap [&.preview-title]:text-ellipsis [&.preview-title]:text-[13px] [&.preview-title]:font-[650]'>
          {PROFILE.resumeFileName}
        </span>
        <a
          className={cn(
            'preview-download',
            '[&.preview-download]:inline-flex [&.preview-download]:items-center [&.preview-download]:gap-1.5 [&.preview-download]:p-[5px_11px] [&.preview-download]:rounded-lg [&.preview-download]:text-[white] [&.preview-download]:[background:linear-gradient(180deg,oklch(0.68_0.18_248),var(--system-blue-deep))] [&.preview-download]:text-[12px] [&.preview-download]:font-[650] [&.preview-download]:[box-shadow:inset_0_1px_oklch(1_0_0/0.36),0_1px_3px_oklch(0.4_0.14_250/0.3)]',
            '[&.preview-download]:[transition:scale_120ms_ease-out] [&.preview-download:active]:scale-[0.97]',
          )}
          href={PROFILE.resumePath}
          download={PROFILE.resumeFileName}
        >
          <Download size={14} /> Download
        </a>
      </div>
      <div className='preview-canvas [&.preview-canvas]:flex-1 [&.preview-canvas]:min-h-0 [&.preview-canvas]:[background:var(--under-page-background)]'>
        <object
          className='preview-document [&.preview-document]:w-full [&.preview-document]:h-full'
          data={PROFILE.resumePath}
          type='application/pdf'
          aria-label={`${PROFILE.name} — ${PROFILE.role} résumé`}
        >
          <div
            className={cn(
              'preview-fallback',
              '[&.preview-fallback]:h-full [&.preview-fallback]:grid [&.preview-fallback]:place-items-center [&.preview-fallback]:p-8 [&.preview-fallback]:text-center',
              '[&.preview-fallback_p]:m-[8px_auto_16px] [&.preview-fallback_p]:max-w-[34ch] [&.preview-fallback_p]:text-(--label-secondary) [&.preview-fallback_p]:text-[13px] [&.preview-fallback_p]:leading-[1.5]',
              '[&.preview-fallback_strong]:mt-3 [&.preview-fallback_strong]:block [&.preview-fallback_strong]:text-[15px]',
              '[&.preview-fallback_>_div_>_svg]:mx-auto [&.preview-fallback_>_div_>_svg]:text-(--label-tertiary)',
              '[&.preview-fallback_a]:inline-flex [&.preview-fallback_a]:items-center [&.preview-fallback_a]:gap-1.5 [&.preview-fallback_a]:p-[7px_14px] [&.preview-fallback_a]:rounded-lg [&.preview-fallback_a]:text-[white] [&.preview-fallback_a]:[background:var(--system-blue-deep)] [&.preview-fallback_a]:text-[13px] [&.preview-fallback_a]:font-[650]',
            )}
          >
            <div>
              <FileText size={38} />
              <strong>{PROFILE.resumeFileName}</strong>
              <p>This browser cannot display PDFs inline. Download the file to read it.</p>
              <a href={PROFILE.resumePath} download={PROFILE.resumeFileName}>
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}
