import { CalendarWidget } from '@/features/desktop/components/calendar-widget';
import { SystemStatusWidget } from '@/features/desktop/components/system-status-widget';
import { TodayWidget } from '@/features/desktop/components/today-widget';
import { WeatherWidget } from '@/features/desktop/components/weather-widget';
import { useClock } from '@/features/desktop/hooks/use-clock';
import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

type DesktopWidgetsProps = {
  windows: WindowState[];
  dark: boolean;
  lowPower: boolean;
  brightness: number;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
  onOpenNote: (noteId: NoteId) => void;
  openSettings: () => void;
};

export function DesktopWidgets(props: DesktopWidgetsProps) {
  const now = useClock();
  return (
    <aside
      className='widgets [&.widgets]:absolute [&.widgets]:z-1 [&.widgets]:top-9 [&.widgets]:left-3 [&.widgets]:w-86 [&.widgets]:grid [&.widgets]:grid-cols-[1fr_1fr] [&.widgets]:gap-3 [&.widgets]:pointer-events-none max-[900px]:[&.widgets]:hidden'
      aria-label='Desktop widgets'
    >
      <CalendarWidget now={now} />
      <WeatherWidget />
      <TodayWidget
        completedTasks={props.completedTasks}
        onToggleTask={props.onToggleTask}
        onOpenNote={props.onOpenNote}
      />
      <SystemStatusWidget
        windows={props.windows}
        dark={props.dark}
        lowPower={props.lowPower}
        brightness={props.brightness}
        openSettings={props.openSettings}
      />
    </aside>
  );
}
