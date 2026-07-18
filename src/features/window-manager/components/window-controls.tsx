import { cn } from '@/shared/utils/cn';

type WindowControlsProps = {
  title: string;
  maximized: boolean;
  close: () => void;
  minimize: () => void;
  toggleMaximize: () => void;
};

const TRAFFIC_CLASS_NAME =
  '[&.traffic]:relative [&.traffic]:w-3.25 [&.traffic]:h-3.25 [&.traffic]:p-0 [&.traffic]:[border:0] [&.traffic]:rounded-[50%] [&.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.02_250/0.2)]';
const TRAFFIC_BEFORE_CLASS_NAME =
  "[&.traffic::before]:[content:''] [&.traffic::before]:absolute [&.traffic::before]:left-[50%] [&.traffic::before]:top-[50%] [&.traffic::before]:opacity-[0] [&.traffic::before]:[transition:opacity_90ms_ease-out]";
const TRAFFIC_AFTER_CLASS_NAME =
  "[&.traffic::after]:[content:''] [&.traffic::after]:absolute [&.traffic::after]:left-[50%] [&.traffic::after]:top-[50%] [&.traffic::after]:opacity-[0] [&.traffic::after]:[transition:opacity_90ms_ease-out]";

export function WindowControls({
  title,
  maximized,
  close,
  minimize,
  toggleMaximize,
}: WindowControlsProps) {
  return (
    <div
      className={cn(
        'traffic-lights',
        '[&.traffic-lights]:flex [&.traffic-lights]:gap-2 [&.traffic-lights]:items-center',
        '[&.traffic-lights:hover_.traffic::before]:opacity-[0.72]',
        '[&.traffic-lights:hover_.traffic::after]:opacity-[0.72]',
      )}
    >
      <button
        type='button'
        className={cn(
          'traffic',
          'traffic--close',
          TRAFFIC_CLASS_NAME,
          TRAFFIC_BEFORE_CLASS_NAME,
          TRAFFIC_AFTER_CLASS_NAME,
          '[&.traffic--close]:[background:oklch(0.675_0.209_27.5)] [&.traffic--close::before]:w-1.5 [&.traffic--close::before]:h-px [&.traffic--close::before]:rounded-[1px] [&.traffic--close::before]:[background:oklch(0.31_0.08_27)] [&.traffic--close::before]:transform-[translate(-50%,-50%)_rotate(45deg)] [&.traffic--close::after]:w-1.5 [&.traffic--close::after]:h-px [&.traffic--close::after]:rounded-[1px] [&.traffic--close::after]:[background:oklch(0.31_0.08_27)] [&.traffic--close::after]:transform-[translate(-50%,-50%)_rotate(-45deg)]',
        )}
        aria-label={`Close ${title}`}
        onClick={close}
      />
      <button
        type='button'
        className={cn(
          'traffic',
          'traffic--minimize',
          TRAFFIC_CLASS_NAME,
          TRAFFIC_BEFORE_CLASS_NAME,
          TRAFFIC_AFTER_CLASS_NAME,
          '[&.traffic--minimize]:[background:oklch(0.819_0.173_81.4)] [&.traffic--minimize::before]:w-1.5 [&.traffic--minimize::before]:h-px [&.traffic--minimize::before]:rounded-[1px] [&.traffic--minimize::before]:[background:oklch(0.38_0.08_75)] [&.traffic--minimize::before]:transform-[translate(-50%,-50%)]',
        )}
        aria-label={`Minimize ${title}`}
        onClick={minimize}
      />
      <button
        type='button'
        className={cn(
          'traffic',
          'traffic--maximize',
          TRAFFIC_CLASS_NAME,
          TRAFFIC_BEFORE_CLASS_NAME,
          TRAFFIC_AFTER_CLASS_NAME,
          '[&.traffic--maximize]:[background:oklch(0.72_0.215_143.1)] [&.traffic--maximize::before]:w-1 [&.traffic--maximize::before]:h-1 [&.traffic--maximize::before]:[background:oklch(0.31_0.09_145)] [&.traffic--maximize::before]:[clip-path:polygon(0_0,100%_0,0_100%)] [&.traffic--maximize::before]:transform-[translate(-3px,-3px)] [&.traffic--maximize::after]:w-1 [&.traffic--maximize::after]:h-1 [&.traffic--maximize::after]:[background:oklch(0.31_0.09_145)] [&.traffic--maximize::after]:[clip-path:polygon(100%_0,100%_100%,0_100%)] [&.traffic--maximize::after]:transform-[translate(-1px,-1px)]',
        )}
        aria-label={`${maximized ? 'Exit Full Screen' : 'Enter Full Screen'} ${title}`}
        onClick={toggleMaximize}
      />
    </div>
  );
}
