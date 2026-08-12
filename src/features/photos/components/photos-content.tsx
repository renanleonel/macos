import { Folder, Images, Sparkles } from 'lucide-react';

import { PHOTO_TITLES } from '@/features/photos/domain/constants/photo-titles';
import { cn } from '@/shared/utils/cn';

export function PhotosContent() {
  return (
    <div
      className={cn(
        'photos-app',
        '[&.photos-app]:h-full [&.photos-app]:flex [&.photos-app]:text-[oklch(0.2_0.01_250)] [&.photos-app]:[background:var(--material-content)]',
        '[&.photos-app_>_aside]:w-43.75 [&.photos-app_>_aside]:flex-[0_0_175px] [&.photos-app_>_aside]:flex [&.photos-app_>_aside]:flex-col [&.photos-app_>_aside]:gap-0.75 [&.photos-app_>_aside]:p-[18px_8px] [&.photos-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.photos-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.photos-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]',
        '[&.photos-app_aside_>_strong]:m-[0_10px_12px] [&.photos-app_aside_>_strong]:text-[18px]',
        '[&.photos-app_aside_button]:h-7.5 [&.photos-app_aside_button]:flex [&.photos-app_aside_button]:items-center [&.photos-app_aside_button]:gap-1.75 [&.photos-app_aside_button]:p-[0_10px] [&.photos-app_aside_button]:[border:0] [&.photos-app_aside_button]:rounded-[7px] [&.photos-app_aside_button]:[background:transparent] [&.photos-app_aside_button]:text-left',
        '[&.photos-app_aside_button.selected]:[background:oklch(0.71_0.13_245/0.55)] [&.photos-app_aside_button.selected]:text-(--ink) [&.photos-app_aside_button.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38),inset_0_0_0_1px_oklch(0.4_0.08_245/0.08)]',
        '[&.photos-app_main]:flex-1 [&.photos-app_main]:min-w-0 [&.photos-app_main]:p-5.5 [&.photos-app_main]:overflow-auto [&.photos-app_main]:[background:var(--material-content)]',
        'max-[900px]:[&.photos-app_>_aside]:w-41.25 max-[900px]:[&.photos-app_>_aside]:basis-41.25',
        'max-[600px]:[&.photos-app_>_aside]:hidden',
      )}
    >
      <aside>
        <strong>Photos</strong>
        <button type='button' className='selected'>
          <Images size={16} />
          Library
        </button>
        <button type='button'>
          <Sparkles size={16} />
          Featured
        </button>
        <button type='button'>
          <Folder size={16} />
          Projects
        </button>
      </aside>
      <main>
        <div
          className={cn(
            'photos-heading',
            '[&.photos-heading]:flex [&.photos-heading]:items-end [&.photos-heading]:justify-between [&.photos-heading]:mb-5',
            '[&.photos-heading_h1]:m-0 [&.photos-heading_h1]:text-[28px]',
            '[&.photos-heading_p]:m-[3px_0] [&.photos-heading_p]:text-[oklch(0.5_0.01_250)] [&.photos-heading_p]:text-[12px]',
            '[&.photos-heading_button]:p-[7px_10px] [&.photos-heading_button]:[border:0] [&.photos-heading_button]:rounded-[7px] [&.photos-heading_button]:[background:oklch(0.9_0.008_250)] [&.photos-heading_button]:text-[11px]',
          )}
        >
          <div>
            <h1>Library</h1>
            <p>Interface studies · 8 items</p>
          </div>
          <button type='button'>
            Years&nbsp;&nbsp; Months&nbsp;&nbsp; Days&nbsp;&nbsp; <strong>All Photos</strong>
          </button>
        </div>
        <div className='photo-grid [&.photo-grid]:grid [&.photo-grid]:grid-cols-[repeat(4,minmax(100px,1fr))] [&.photo-grid]:gap-1 max-[600px]:[&.photo-grid]:grid-cols-[repeat(2,1fr)]'>
          {PHOTO_TITLES.map((title, index) => (
            <div
              className={cn(
                `photo-tile photo-tile--${index + 1}`,
                '[&.photo-tile]:relative [&.photo-tile]:aspect-[1] [&.photo-tile]:overflow-hidden [&.photo-tile]:bg-cover [&.photo-tile]:bg-center',
                '[&.photo-tile_span]:absolute [&.photo-tile_span]:inset-[auto_8px_7px] [&.photo-tile_span]:text-[white] [&.photo-tile_span]:opacity-[0] [&.photo-tile_span]:[text-shadow:0_1px_4px_black] [&.photo-tile_span]:text-[12px] [&.photo-tile_span]:[transition:opacity_150ms]',
                '[&.photo-tile:hover_span]:opacity-[1]',
                '[&.photo-tile.photo-tile--1]:[background:radial-gradient(circle_at_30%_35%,oklch(0.9_0.15_80),transparent_20%),linear-gradient(135deg,oklch(0.57_0.18_252),oklch(0.78_0.13_210))]',
                '[&.photo-tile.photo-tile--2]:[background:linear-gradient(140deg,oklch(0.18_0.02_250)_0_45%,oklch(0.92_0.01_250)_45%)]',
                '[&.photo-tile.photo-tile--3]:[background:radial-gradient(ellipse_at_60%_20%,oklch(0.84_0.13_190),transparent_30%),linear-gradient(oklch(0.38_0.13_225),oklch(0.18_0.08_245))]',
                '[&.photo-tile.photo-tile--4]:[background:repeating-radial-gradient(circle_at_10%_100%,oklch(0.2_0.01_250)_0_10px,oklch(0.86_0.01_250)_12px_20px)]',
                '[&.photo-tile.photo-tile--5]:[background:linear-gradient(35deg,oklch(0.38_0.15_145),oklch(0.82_0.16_95))]',
                '[&.photo-tile.photo-tile--6]:[background:linear-gradient(115deg,oklch(0.73_0.22_28),oklch(0.61_0.2_325))]',
                '[&.photo-tile.photo-tile--7]:[background:radial-gradient(circle_at_70%_30%,white_0_5%,transparent_6%),linear-gradient(145deg,oklch(0.8_0.12_230),oklch(0.92_0.06_80))]',
                '[&.photo-tile.photo-tile--8]:[background:conic-gradient(from_20deg,oklch(0.42_0.17_260),oklch(0.71_0.2_330),oklch(0.78_0.18_75),oklch(0.42_0.17_260))]',
              )}
              key={title}
            >
              <span>{title}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
