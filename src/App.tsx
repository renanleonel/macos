import {
  AtSign,
  BatteryCharging,
  Bell,
  Bluetooth,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Code2,
  Columns3,
  Compass,
  ExternalLink,
  FileCode2,
  FileText,
  Folder,
  GalleryVerticalEnd,
  Globe2,
  Grid2X2,
  Images,
  List,
  Mail,
  MessageCircle,
  Monitor,
  Moon,
  MoreHorizontal,
  Palette,
  PanelLeft,
  Search,
  Send,
  Settings,
  Share,
  Sparkles,
  SquareTerminal,
  Sun,
  Trash2,
  UserRound,
  Volume2,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react';

type ClassValue = string | false | null | undefined;

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}
type AppId =
  | 'finder'
  | 'safari'
  | 'messages'
  | 'photos'
  | 'notes'
  | 'terminal'
  | 'settings'
  | 'about';
type DockId = AppId | 'launchpad' | 'mail' | 'trash';
type FinderView = 'icons' | 'list' | 'columns' | 'gallery';
type FinderPreferences = {
  view: FinderView;
  showSidebar: boolean;
  showPreview: boolean;
  showStatusBar: boolean;
  iconSize: number;
};
type SystemPreferences = {
  dockAutoHide: boolean;
  showRecentApps: boolean;
  dockSize: number;
  doNotDisturb: boolean;
  volume: number;
};
type AccentColorId = 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'graphite';
type SettingsSectionId =
  | 'wifi'
  | 'bluetooth'
  | 'network'
  | 'notifications'
  | 'sound'
  | 'battery'
  | 'focus'
  | 'general'
  | 'appearance'
  | 'desktop';
type Overlay =
  | 'apple'
  | 'file'
  | 'edit'
  | 'view'
  | 'go'
  | 'window'
  | 'help'
  | 'wifi'
  | 'battery'
  | 'siri'
  | 'control'
  | 'notifications'
  | 'spotlight'
  | 'launchpad'
  | null;

type WindowState = {
  id: number;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};
type DesktopRevealEdge = 'left' | 'right' | 'bottom' | 'top';
type BootMode = 'startup' | 'restart' | null;
type PowerState = 'awake' | 'sleeping' | 'shutdown';
type SystemDialog = 'force-quit' | null;

const DESKTOP_REVEAL_EDGES: DesktopRevealEdge[] = ['left', 'right', 'bottom', 'top'];

const DEFAULT_FINDER_PREFERENCES: FinderPreferences = {
  view: 'icons',
  showSidebar: true,
  showPreview: false,
  showStatusBar: true,
  iconSize: 58,
};

const DEFAULT_SYSTEM_PREFERENCES: SystemPreferences = {
  dockAutoHide: false,
  showRecentApps: true,
  dockSize: 50,
  doNotDisturb: false,
  volume: 45,
};

const ACCENT_COLORS: Record<AccentColorId, { label: string; color: string; deep: string }> = {
  blue: { label: 'Blue', color: '#168bf4', deep: '#0874d1' },
  purple: { label: 'Purple', color: '#8d67e8', deep: '#7450c8' },
  pink: { label: 'Pink', color: '#e65b9a', deep: '#ca3f7d' },
  orange: { label: 'Orange', color: '#ed8a3d', deep: '#d36d24' },
  green: { label: 'Green', color: '#43a96b', deep: '#328853' },
  graphite: { label: 'Graphite', color: '#727b86', deep: '#59616b' },
};

const SETTINGS_SECTIONS: {
  id: SettingsSectionId;
  label: string;
  icon: LucideIcon;
  tint: string;
}[] = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, tint: '#168bf4' },
  { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, tint: '#3879df' },
  { id: 'network', label: 'Network', icon: Globe2, tint: '#54a464' },
  { id: 'notifications', label: 'Notifications', icon: Bell, tint: '#dc5650' },
  { id: 'sound', label: 'Sound', icon: Volume2, tint: '#d9568b' },
  { id: 'battery', label: 'Battery', icon: BatteryCharging, tint: '#48a65d' },
  { id: 'focus', label: 'Focus', icon: Moon, tint: '#7265d8' },
  { id: 'general', label: 'General', icon: Settings, tint: '#7a838e' },
  { id: 'appearance', label: 'Appearance', icon: Palette, tint: '#735cd8' },
  { id: 'desktop', label: 'Desktop & Dock', icon: Monitor, tint: '#328ab8' },
];

const SETTINGS_PANEL_COPY: Record<
  Exclude<SettingsSectionId, 'appearance'>,
  {
    description: string;
    controls: { id: string; title: string; detail: string; defaultChecked: boolean }[];
  }
> = {
  wifi: {
    description: 'Connect to nearby networks and manage wireless access.',
    controls: [
      {
        id: 'wifi-enabled',
        title: 'Wi-Fi',
        detail: 'Connected to Portfolio Studio',
        defaultChecked: true,
      },
      {
        id: 'wifi-ask',
        title: 'Ask to join networks',
        detail: 'Show available networks when no known network is found.',
        defaultChecked: true,
      },
    ],
  },
  bluetooth: {
    description: 'Connect keyboards, headphones, and other nearby devices.',
    controls: [
      {
        id: 'bluetooth-enabled',
        title: 'Bluetooth',
        detail: "This Mac is discoverable as Renan's Mac.",
        defaultChecked: true,
      },
      {
        id: 'bluetooth-airdrop',
        title: 'Nearby sharing',
        detail: 'Allow contacts to discover this device.',
        defaultChecked: true,
      },
    ],
  },
  network: {
    description: 'Review connection privacy and network protections.',
    controls: [
      {
        id: 'network-firewall',
        title: 'Firewall',
        detail: 'Block unwanted incoming connections.',
        defaultChecked: true,
      },
      {
        id: 'network-private',
        title: 'Private address',
        detail: 'Use a rotating address on Wi-Fi networks.',
        defaultChecked: true,
      },
    ],
  },
  notifications: {
    description: 'Choose how portfolio updates appear while you explore.',
    controls: [
      {
        id: 'notifications-allow',
        title: 'Allow notifications',
        detail: 'Show useful updates from the portfolio.',
        defaultChecked: true,
      },
      {
        id: 'notifications-preview',
        title: 'Show previews',
        detail: 'Include a short preview in notification cards.',
        defaultChecked: true,
      },
    ],
  },
  sound: {
    description: 'Tune interface feedback and alert sounds.',
    controls: [
      {
        id: 'sound-interface',
        title: 'Play interface sounds',
        detail: 'Use subtle feedback for important actions.',
        defaultChecked: true,
      },
      {
        id: 'sound-feedback',
        title: 'Play feedback when volume changes',
        detail: 'Confirm volume adjustments with a quiet tone.',
        defaultChecked: false,
      },
    ],
  },
  battery: {
    description: 'Review power usage and choose how this desktop conserves energy.',
    controls: [
      {
        id: 'battery-low-power',
        title: 'Low Power Mode',
        detail: 'Reduce background activity and energy use.',
        defaultChecked: false,
      },
      {
        id: 'battery-optimized',
        title: 'Optimized charging',
        detail: 'Reduce battery aging by learning your charging routine.',
        defaultChecked: true,
      },
    ],
  },
  focus: {
    description: 'Reduce interruptions when you are concentrating.',
    controls: [
      {
        id: 'focus-dnd',
        title: 'Do Not Disturb',
        detail: 'Silence non-essential notifications.',
        defaultChecked: false,
      },
      {
        id: 'focus-share',
        title: 'Share focus status',
        detail: 'Let supported apps know notifications are silenced.',
        defaultChecked: true,
      },
    ],
  },
  general: {
    description: 'Keep this desktop experience current and connected.',
    controls: [
      {
        id: 'general-updates',
        title: 'Automatic updates',
        detail: 'Install portfolio improvements when available.',
        defaultChecked: true,
      },
      {
        id: 'general-handoff',
        title: 'Continue between apps',
        detail: 'Keep the current portfolio context when opening another app.',
        defaultChecked: true,
      },
    ],
  },
  desktop: {
    description: 'Adjust how the desktop and Dock behave.',
    controls: [
      {
        id: 'desktop-hide',
        title: 'Automatically hide the Dock',
        detail: 'Reveal it when the pointer reaches the screen edge.',
        defaultChecked: false,
      },
      {
        id: 'desktop-recents',
        title: 'Show recent applications',
        detail: 'Keep recently used apps at the end of the Dock.',
        defaultChecked: true,
      },
    ],
  },
};

function readFinderPreferences(): FinderPreferences {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:finder-preferences');
    if (!saved) return DEFAULT_FINDER_PREFERENCES;
    return { ...DEFAULT_FINDER_PREFERENCES, ...(JSON.parse(saved) as Partial<FinderPreferences>) };
  } catch {
    return DEFAULT_FINDER_PREFERENCES;
  }
}

function readSystemPreferences(): SystemPreferences {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:system-preferences');
    if (!saved) return DEFAULT_SYSTEM_PREFERENCES;
    return { ...DEFAULT_SYSTEM_PREFERENCES, ...(JSON.parse(saved) as Partial<SystemPreferences>) };
  } catch {
    return DEFAULT_SYSTEM_PREFERENCES;
  }
}

function readAccentColor(): AccentColorId {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:accent-color') as AccentColorId | null;
    return saved && saved in ACCENT_COLORS ? saved : 'blue';
  } catch {
    return 'blue';
  }
}

function readBrightness(): number {
  try {
    return Number(globalThis.localStorage?.getItem('macos27:display-brightness')) || 82;
  } catch {
    return 82;
  }
}

const TODAY_TASKS = [
  { id: 'details', label: 'Polish the tiny details.' },
  { id: 'ship', label: 'Ship something memorable.' },
  { id: 'reply', label: 'Reply to good people.' },
] as const;

type TodayTaskId = (typeof TODAY_TASKS)[number]['id'];
type NoteId = 'welcome' | 'care' | 'now';

function readCompletedTasks(): TodayTaskId[] {
  try {
    const saved = JSON.parse(
      globalThis.localStorage?.getItem('macos27:today-completed') ?? '[]',
    ) as unknown;
    if (!Array.isArray(saved)) return [];
    const taskIds = new Set<string>(TODAY_TASKS.map((task) => task.id));
    return saved.filter((id): id is TodayTaskId => typeof id === 'string' && taskIds.has(id));
  } catch {
    return [];
  }
}

type WindowAction =
  | { type: 'open'; app: AppId }
  | { type: 'close'; id: number }
  | { type: 'focus'; id: number }
  | { type: 'move'; id: number; x: number; y: number }
  | { type: 'minimize'; id: number }
  | { type: 'toggleMaximize'; id: number };

const APP_META: Record<
  AppId,
  { title: string; width: number; height: number; x: number; y: number }
> = {
  finder: { title: 'Portfolio', width: 980, height: 620, x: 210, y: 116 },
  safari: { title: 'Safari', width: 1020, height: 650, x: 250, y: 84 },
  messages: { title: 'Messages', width: 760, height: 560, x: 360, y: 140 },
  photos: { title: 'Photos', width: 900, height: 610, x: 290, y: 102 },
  notes: { title: 'Notes', width: 820, height: 580, x: 330, y: 122 },
  terminal: { title: 'renan — zsh', width: 760, height: 500, x: 390, y: 160 },
  settings: { title: 'System Settings', width: 880, height: 610, x: 310, y: 105 },
  about: { title: 'About This Mac', width: 510, height: 480, x: 500, y: 170 },
};

const initialWindow: WindowState = {
  id: 1,
  app: 'finder',
  title: 'Portfolio',
  x: APP_META.finder.x,
  y: APP_META.finder.y,
  width: APP_META.finder.width,
  height: APP_META.finder.height,
  z: 1,
  minimized: false,
  maximized: false,
};

function windowReducer(state: WindowState[], action: WindowAction): WindowState[] {
  const nextZ = Math.max(0, ...state.map((window) => window.z)) + 1;

  switch (action.type) {
    case 'open': {
      const existing = state.find((window) => window.app === action.app);
      if (existing) {
        return state.map((window) =>
          window.id === existing.id ? { ...window, minimized: false, z: nextZ } : window,
        );
      }
      const meta = APP_META[action.app];
      return [
        ...state,
        {
          id: Date.now(),
          app: action.app,
          title: meta.title,
          x: meta.x + (state.length % 4) * 18,
          y: meta.y + (state.length % 4) * 16,
          width: meta.width,
          height: meta.height,
          z: nextZ,
          minimized: false,
          maximized: false,
        },
      ];
    }
    case 'close':
      return state.filter((window) => window.id !== action.id);
    case 'focus':
      return state.map((window) => (window.id === action.id ? { ...window, z: nextZ } : window));
    case 'move':
      return state.map((window) =>
        window.id === action.id
          ? {
              ...window,
              x: Math.max(8, Math.min(action.x, globalThis.innerWidth - 180)),
              y: Math.max(28, Math.min(action.y, globalThis.innerHeight - 100)),
            }
          : window,
      );
    case 'minimize':
      return state.map((window) =>
        window.id === action.id ? { ...window, minimized: true } : window,
      );
    case 'toggleMaximize': {
      const target = state.find((window) => window.id === action.id);
      if (!target) return state;
      const enteringFullscreen = !target.maximized;
      return state.map((window) => {
        if (window.id === action.id) return { ...window, maximized: enteringFullscreen, z: nextZ };
        return enteringFullscreen && window.maximized ? { ...window, maximized: false } : window;
      });
    }
  }
}

const dockApps: { id: DockId; label: string }[] = [
  { id: 'finder', label: 'Finder' },
  { id: 'launchpad', label: 'Apps' },
  { id: 'safari', label: 'Safari' },
  { id: 'messages', label: 'Messages' },
  { id: 'mail', label: 'Mail' },
  { id: 'photos', label: 'Photos' },
  { id: 'notes', label: 'Notes' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'settings', label: 'System Settings' },
  { id: 'trash', label: 'Trash' },
];

const MENU_OVERLAYS: Record<string, Overlay> = {
  File: 'file',
  Edit: 'edit',
  View: 'view',
  Go: 'go',
  Window: 'window',
  Help: 'help',
};

const FINDER_FAVORITES = [
  'Recents',
  'About Me',
  'Applications',
  'Desktop',
  'Portfolio',
  'Downloads',
  'iCloud Drive',
];

type FinderEntry = {
  name: string;
  kind: 'folder' | 'document' | 'application';
  glyph: 'user' | 'code' | 'text' | 'images' | 'terminal' | 'mail' | 'folder';
  app: AppId;
};

const FINDER_SECTIONS: Record<string, FinderEntry[]> = {
  Recents: [
    { name: 'About Me.md', kind: 'document', glyph: 'user', app: 'about' },
    { name: 'Résumé.pdf', kind: 'document', glyph: 'text', app: 'notes' },
    { name: 'Project Aurora', kind: 'folder', glyph: 'code', app: 'safari' },
  ],
  'About Me': [
    { name: 'About Me.md', kind: 'document', glyph: 'user', app: 'about' },
    { name: 'Résumé.pdf', kind: 'document', glyph: 'text', app: 'notes' },
    { name: 'Contact.mail', kind: 'document', glyph: 'mail', app: 'messages' },
  ],
  Applications: [
    { name: 'Safari', kind: 'application', glyph: 'code', app: 'safari' },
    { name: 'Messages', kind: 'application', glyph: 'mail', app: 'messages' },
    { name: 'Photos', kind: 'application', glyph: 'images', app: 'photos' },
    { name: 'Notes', kind: 'application', glyph: 'text', app: 'notes' },
    { name: 'Terminal', kind: 'application', glyph: 'terminal', app: 'terminal' },
    { name: 'System Settings', kind: 'application', glyph: 'folder', app: 'settings' },
  ],
  Desktop: [
    { name: 'Selected Work', kind: 'folder', glyph: 'images', app: 'photos' },
    { name: 'Read Me.txt', kind: 'document', glyph: 'text', app: 'notes' },
  ],
  Portfolio: [
    { name: 'About Me.md', kind: 'document', glyph: 'user', app: 'about' },
    { name: 'Projects', kind: 'folder', glyph: 'code', app: 'safari' },
    { name: 'Résumé.pdf', kind: 'document', glyph: 'text', app: 'notes' },
    { name: 'Snapshots', kind: 'folder', glyph: 'images', app: 'photos' },
    { name: 'Now.sh', kind: 'document', glyph: 'terminal', app: 'terminal' },
  ],
  Downloads: [
    { name: 'Résumé.pdf', kind: 'document', glyph: 'text', app: 'notes' },
    { name: 'Selected Work', kind: 'folder', glyph: 'images', app: 'photos' },
  ],
  'iCloud Drive': [
    { name: 'Portfolio', kind: 'folder', glyph: 'folder', app: 'safari' },
    { name: 'Notes', kind: 'folder', glyph: 'text', app: 'notes' },
  ],
  Trash: [
    { name: 'Archive Projects', kind: 'folder', glyph: 'folder', app: 'photos' },
    { name: 'Draft Notes.txt', kind: 'document', glyph: 'text', app: 'notes' },
    { name: 'Old Resume.pdf', kind: 'document', glyph: 'text', app: 'about' },
  ],
};

const launchpadApps: { id: AppId; label: string }[] = [
  { id: 'finder', label: 'Finder' },
  { id: 'safari', label: 'Safari' },
  { id: 'messages', label: 'Messages' },
  { id: 'photos', label: 'Photos' },
  { id: 'notes', label: 'Notes' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'settings', label: 'Settings' },
  { id: 'about', label: 'About Me' },
];

function FilesAppGlyph() {
  return (
    <svg
      className='files-app-glyph [&.files-app-glyph]:w-[86%] [&.files-app-glyph]:h-[86%]'
      viewBox='0 0 48 48'
      aria-hidden='true'>
      <path
        d='M8 15.5c0-2.5 2-4.5 4.5-4.5h7.2l3.8 4H36c2.2 0 4 1.8 4 4v14.5c0 2.5-2 4.5-4.5 4.5h-23A4.5 4.5 0 0 1 8 33.5z'
        fill='currentColor'
        fillOpacity='0.94'
      />
      <path
        d='M11.5 20.5h25v12.3c0 1.2-1 2.2-2.2 2.2H13.7c-1.2 0-2.2-1-2.2-2.2z'
        fill='white'
        fillOpacity='0.3'
      />
      <path
        d='M17 27.5h14M17 31.5h9'
        fill='none'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}

function PhotosAppGlyph() {
  return (
    <svg
      className='photos-app-glyph [&.photos-app-glyph]:w-[86%] [&.photos-app-glyph]:h-[86%]'
      viewBox='0 0 48 48'
      aria-hidden='true'>
      <rect x='9' y='10' width='30' height='28' rx='6' fill='white' fillOpacity='0.94' />
      <circle cx='30.5' cy='18.5' r='3.5' fill='currentColor' fillOpacity='0.72' />
      <path d='m13 33 8.2-8.7 5.3 5.1 3.4-3.2L35 33z' fill='currentColor' fillOpacity='0.86' />
    </svg>
  );
}

function NotesAppGlyph() {
  return (
    <svg
      className='notes-app-glyph [&.notes-app-glyph]:w-[86%] [&.notes-app-glyph]:h-[86%]'
      viewBox='0 0 48 48'
      aria-hidden='true'>
      <path
        d='M12 17.5h24M12 23.5h24M12 29.5h19M12 35.5h15'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.62'
      />
    </svg>
  );
}

function AppIcon({ app, size = 48 }: { app: DockId; size?: number }) {
  const iconProps = { size: Math.round(size * 0.52), strokeWidth: 1.7 };
  const icons: Partial<Record<DockId, ReactNode>> = {
    finder: <FilesAppGlyph />,
    launchpad: <Grid2X2 {...iconProps} />,
    safari: <Compass {...iconProps} />,
    messages: <MessageCircle {...iconProps} fill='currentColor' />,
    mail: <Mail {...iconProps} />,
    photos: <PhotosAppGlyph />,
    notes: <NotesAppGlyph />,
    terminal: <SquareTerminal {...iconProps} />,
    settings: <Settings {...iconProps} />,
    trash: <Trash2 {...iconProps} />,
    about: <UserRound {...iconProps} />,
  };

  return (
    <span
      className={cn(
        `app-icon app-icon--${app}`,
        "[&.app-icon]:[--icon-size:48px] [&.app-icon]:w-(--icon-size) [&.app-icon]:h-(--icon-size) [&.app-icon]:grid [&.app-icon]:place-items-center [&.app-icon]:rounded-[calc(var(--icon-size)*0.235)] [&.app-icon]:text-[white] [&.app-icon]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.36),inset_0_-1px_oklch(0.12_0.03_250/0.12),0_3px_7px_oklch(0.08_0.03_245/0.28)] [&.app-icon]:overflow-hidden [&.app-icon]:relative [&.app-icon]:isolate", "[&.app-icon::before]:[content:''] [&.app-icon::before]:absolute [&.app-icon::before]:z-1 [&.app-icon::before]:inset-[1px_2px_46%] [&.app-icon::before]:rounded-[inherit] [&.app-icon::before]:[background:linear-gradient(180deg,oklch(1_0_0/0.48),transparent)] [&.app-icon::before]:mix-blend-soft-light [&.app-icon::before]:pointer-events-none", "[&.app-icon::after]:[content:''] [&.app-icon::after]:absolute [&.app-icon::after]:z-1 [&.app-icon::after]:inset-[54%_4px_3px] [&.app-icon::after]:rounded-[0_0_calc(var(--icon-size)*0.18)_calc(var(--icon-size)*0.18)] [&.app-icon::after]:[background:linear-gradient(180deg,transparent,oklch(0.08_0.03_250/0.12))] [&.app-icon::after]:pointer-events-none", "[&.app-icon_svg]:relative [&.app-icon_svg]:z-2 [&.app-icon_svg]:filter-[drop-shadow(0_1px_1px_oklch(0.08_0.02_250/0.12))]", "[&.app-icon.app-icon--finder]:[background:linear-gradient(145deg,#2c9bd8,#4663c5)]", "[&.app-icon.app-icon--launchpad]:[background:linear-gradient(145deg,#86909c,#4d5868)]", "[&.app-icon.app-icon--safari]:[background:linear-gradient(145deg,#37b7ad,#2365a8)]", "[&.app-icon.app-icon--messages]:[background:linear-gradient(145deg,#56b876,#2f8557)]", "[&.app-icon.app-icon--mail]:[background:linear-gradient(145deg,#568be7,#5d51be)]", "[&.app-icon.app-icon--photos]:text-[#b8456e] [&.app-icon.app-icon--photos]:[background:linear-gradient(145deg,#ffd176,#ef759c)]", "[&.app-icon.app-icon--notes]:text-[#654a16] [&.app-icon.app-icon--notes]:[background:linear-gradient(145deg,#ffdb69,#d8aa36)]", "[&.app-icon.app-icon--terminal]:text-[#8be3ad] [&.app-icon.app-icon--terminal]:[background:linear-gradient(145deg,#303a43,#12181e)]", "[&.app-icon.app-icon--settings]:[background:radial-gradient(circle_at_35%_28%,#9ba7b4,#515b68)]", "[&.app-icon.app-icon--trash]:text-[#52606d] [&.app-icon.app-icon--trash]:[background:linear-gradient(145deg,oklch(0.96_0.025_220/0.95),oklch(0.75_0.055_225/0.86))]", "[&.app-icon.app-icon--about]:[background:linear-gradient(145deg,#e59d4f,#a95863)]",
      )}
      style={{ '--icon-size': `${size}px` } as CSSProperties}>
      {icons[app]}
    </span>
  );
}

function AppleMark() {
  return (
    <svg viewBox='0 0 32 32' aria-hidden='true'>
      <path d='M21.1 16.9c0-3.5 2.9-5.2 3-5.3-1.6-2.4-4.2-2.7-5.1-2.8-2.2-.2-4.2 1.3-5.3 1.3-1.1 0-2.8-1.3-4.6-1.2-2.3 0-4.5 1.4-5.7 3.5-2.5 4.3-.6 10.5 1.7 13.9 1.2 1.7 2.6 3.6 4.4 3.5 1.8-.1 2.4-1.1 4.6-1.1 2.1 0 2.7 1.1 4.6 1.1 1.9 0 3.1-1.7 4.2-3.4 1.4-1.9 1.9-3.8 1.9-3.9-.1 0-3.7-1.4-3.7-5.6ZM17.6 6.5c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.9 2-.8.9-1.5 2.5-1.3 4 1.5.1 3-.7 3.9-1.8Z' />
    </svg>
  );
}

function BatteryStatusGlyph({ level = 84 }: { level?: number }) {
  const fillWidth = Math.max(1.5, Math.min(9, (level / 100) * 9));
  return (
    <svg
      className='native-status-icon [&.native-status-icon]:w-4.25 [&.native-status-icon]:h-4.25 [&.native-status-icon]:block'
      viewBox='0 0 18 16'
      aria-hidden='true'>
      <rect
        x='1'
        y='4'
        width='13.5'
        height='8'
        rx='2.1'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.35'
      />
      <path
        d='M16 6.35v3.3'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        opacity='0.72'
      />
      <rect x='3' y='6' width={fillWidth} height='4' rx='0.9' fill='currentColor' />
    </svg>
  );
}

function ControlCenterGlyph() {
  return (
    <svg
      className='native-status-icon [&.native-status-icon]:w-4.25 [&.native-status-icon]:h-4.25 [&.native-status-icon]:block'
      viewBox='0 0 18 18'
      aria-hidden='true'>
      <rect x='2' y='3' width='14' height='5' rx='2.5' fill='currentColor' />
      <circle cx='12.8' cy='5.5' r='1.65' fill='var(--control-center-knob, white)' />
      <rect x='2' y='10' width='14' height='5' rx='2.5' fill='currentColor' />
      <circle cx='5.2' cy='12.5' r='1.65' fill='var(--control-center-knob, white)' />
    </svg>
  );
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = globalThis.setInterval(() => setNow(new Date()), 30_000);
    return () => globalThis.clearInterval(timer);
  }, []);
  return now;
}

function MenuBar({
  activeApp,
  overlay,
  onOverlay,
  lowPower,
  doNotDisturb,
  setDoNotDisturb,
}: {
  activeApp: AppId;
  overlay: Overlay;
  onOverlay: (overlay: Overlay) => void;
  lowPower: boolean;
  doNotDisturb: boolean;
  setDoNotDisturb: (value: boolean) => void;
}) {
  const now = useClock();
  const title =
    activeApp === 'about' ? 'Finder' : APP_META[activeApp].title.replace('Portfolio', 'Finder');
  const menus =
    activeApp === 'finder'
      ? ['File', 'View', 'Go', 'Edit', 'Window', 'Help']
      : ['File', 'Edit', 'View', 'Window', 'Help'];

  return (
    <header
      className={cn(
        "menu-bar",
        "[&.menu-bar]:fixed [&.menu-bar]:inset-[0_0_auto] [&.menu-bar]:z-700 [&.menu-bar]:h-7 [&.menu-bar]:flex [&.menu-bar]:items-stretch [&.menu-bar]:justify-between [&.menu-bar]:p-[0_8px] [&.menu-bar]:text-[oklch(0.13_0.02_248)] [&.menu-bar]:[background:linear-gradient(180deg,oklch(1_0_0/0.24),transparent_42%),var(--glass-clear)] [&.menu-bar]:[backdrop-filter:blur(26px)_saturate(1.65)] [&.menu-bar]:[border-bottom:1px_solid_oklch(1_0_0/0.12)] [&.menu-bar]:[box-shadow:inset_0_-1px_oklch(0.22_0.02_245/0.12),0_1px_8px_oklch(0.08_0.03_245/0.09)] [&.menu-bar]:text-[13px] [&.menu-bar]:[--control-center-knob:oklch(1_0_0/0.94)] [&.menu-bar]:px-1.75 [&.menu-bar]:border-b-[oklch(1_0_0/0.3)] [&.menu-bar]:[-webkit-backdrop-filter:blur(26px)_saturate(1.65)]", "[&.menu-bar_nav]:flex [&.menu-bar_nav]:items-stretch", "[&.menu-bar_button]:h-7 [&.menu-bar_button]:p-[0_12px] [&.menu-bar_button]:[border:0] [&.menu-bar_button]:[background:transparent] [&.menu-bar_button]:rounded-[7px] [&.menu-bar_button]:cursor-default [&.menu-bar_button]:whitespace-nowrap", "[&.menu-bar_button:hover]:[background:oklch(1_0_0/0.3)] [&.menu-bar_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.16)]", "[&.menu-bar_.active-app-name]:font-bold [&.menu-bar_.active-app-name]:px-[9px_12px]", "[&.menu-bar_.menu-clock]:p-[0_4px_0_10px] [&.menu-bar_.menu-clock]:[font-variant-numeric:tabular-nums]", "[&.menu-bar_.battery-status]:[transition:color_180ms_ease-out,filter_180ms_ease-out]", "[&.menu-bar_.battery-status.is-low-power]:text-(--low-power-yellow) [&.menu-bar_.battery-status.is-low-power]:filter-[drop-shadow(0_0_4px_oklch(0.82_0.17_85/0.28))]", "[&.menu-bar_button[aria-expanded='true']]:[background:oklch(1_0_0/0.3)] [&.menu-bar_button[aria-expanded='true']]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.16)]", "[@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:[background:var(--window-background)]",
      )}
      aria-label='macOS menu bar'>
      <nav
        className='menu-bar__left [&.menu-bar\\_\\_left_.brand-button]:w-9 [&.menu-bar\\_\\_left_.brand-button]:p-[0_10px] [&.menu-bar\\_\\_left_.brand-button]:px-2.25 max-[900px]:[&.menu-bar\\_\\_left_button:not(.brand-button):not(.active-app-name)]:hidden'
        aria-label='Application menu'>
        <button
          type='button'
          className='brand-button [&.brand-button_svg]:w-4.25 [&.brand-button_svg]:h-4.25 [&.brand-button_svg]:fill-[currentColor] [&.brand-button_svg]:transform-[translateY(-0.2px)]'
          aria-label='Portfolio menu'
          onClick={() => onOverlay(overlay === 'apple' ? null : 'apple')}>
          <AppleMark />
        </button>
        <button type='button' className='active-app-name' onClick={() => onOverlay(null)}>
          {title}
        </button>
        {menus.map((menu) => {
          const target = MENU_OVERLAYS[menu];
          return (
            <button
              type='button'
              key={menu}
              aria-expanded={overlay === target}
              onClick={() => onOverlay(overlay === target ? null : target)}>
              {menu}
            </button>
          );
        })}
      </nav>
      <nav
        className='menu-bar__right [&.menu-bar\\_\\_right]:ml-auto [&.menu-bar\\_\\_right_button]:grid [&.menu-bar\\_\\_right_button]:place-items-center [&.menu-bar\\_\\_right_button]:px-2.25 max-[900px]:[&.menu-bar\\_\\_right_>_button:nth-child(-n+2)]:hidden max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:max-w-23 max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:overflow-hidden max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:pl-1.75 max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:text-[12px] max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:text-clip'
        aria-label='System status'>
        {doNotDisturb ? (
          <button
            type='button'
            className='focus-status [&.focus-status]:text-[oklch(0.36_0.02_270)]'
            aria-label='Do Not Disturb is on'
            onClick={() => setDoNotDisturb(false)}>
            <Moon size={14} fill='currentColor' />
          </button>
        ) : null}
        <button
          type='button'
          aria-label='Wi-Fi'
          aria-expanded={overlay === 'wifi'}
          onClick={() => onOverlay(overlay === 'wifi' ? null : 'wifi')}>
          <Wifi size={15} strokeWidth={1.8} />
        </button>
        <button
          type='button'
          className={cn(`battery-status${lowPower ? ' is-low-power' : ''}`)}
          aria-label='Battery, 84 percent'
          aria-expanded={overlay === 'battery'}
          onClick={() => onOverlay(overlay === 'battery' ? null : 'battery')}>
          <BatteryStatusGlyph />
        </button>
        <button
          type='button'
          aria-label='Spotlight'
          onClick={() => onOverlay(overlay === 'spotlight' ? null : 'spotlight')}>
          <Search size={15} />
        </button>
        <button
          type='button'
          aria-label='Siri'
          aria-expanded={overlay === 'siri'}
          className='siri-orb [&.siri-orb_span]:w-3.75 [&.siri-orb_span]:h-3.75 [&.siri-orb_span]:rounded-[50%] [&.siri-orb_span]:[background:conic-gradient(from_210deg,oklch(0.74_0.2_160),oklch(0.73_0.2_230),oklch(0.65_0.23_310),oklch(0.72_0.22_25),oklch(0.78_0.19_80),oklch(0.74_0.2_160))] [&.siri-orb_span]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.35)] max-[900px]:[&.siri-orb]:hidden'
          onClick={() => onOverlay(overlay === 'siri' ? null : 'siri')}>
          <span />
        </button>
        <button
          type='button'
          aria-label='Control Center'
          onClick={() => onOverlay(overlay === 'control' ? null : 'control')}>
          <ControlCenterGlyph />
        </button>
        <button
          type='button'
          className='menu-clock'
          aria-label='Notifications'
          onClick={() => onOverlay(overlay === 'notifications' ? null : 'notifications')}>
          {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
          {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </button>
      </nav>
    </header>
  );
}

type WeatherSnapshot = {
  temperature: number;
  apparentTemperature: number;
  code: number;
  isDay: boolean;
};

const MARINGA_WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-23.4205&longitude=-51.9333&current=temperature_2m,apparent_temperature,weather_code,is_day&timezone=America%2FSao_Paulo';

function weatherDescription(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67 || (code >= 80 && code <= 82)) return 'Rain';
  if (code <= 77 || (code >= 85 && code <= 86)) return 'Snow';
  if (code >= 95) return 'Thunderstorms';
  return 'Mixed Conditions';
}

function useMaringaWeather() {
  const [weather, setWeather] = useState<WeatherSnapshot>({
    temperature: 24,
    apparentTemperature: 23,
    code: 0,
    isDay: true,
  });
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch(MARINGA_WEATHER_URL, { signal: controller.signal });
        if (!response.ok) return;
        const data = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            apparent_temperature?: number;
            weather_code?: number;
            is_day?: number;
          };
        };
        const current = data.current;
        if (
          !current ||
          typeof current.temperature_2m !== 'number' ||
          typeof current.weather_code !== 'number'
        )
          return;
        setWeather({
          temperature: current.temperature_2m,
          apparentTemperature:
            typeof current.apparent_temperature === 'number'
              ? current.apparent_temperature
              : current.temperature_2m,
          code: current.weather_code,
          isDay: current.is_day !== 0,
        });
        setUpdatedAt(new Date());
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // The last known or fallback Maringá conditions remain visible offline.
        }
      }
    };
    void refresh();
    const timer = globalThis.setInterval(refresh, 15 * 60 * 1000);
    return () => {
      controller.abort();
      globalThis.clearInterval(timer);
    };
  }, []);

  return { weather, updatedAt };
}

function DesktopWidgets({
  windows,
  dark,
  lowPower,
  brightness,
  completedTasks,
  onToggleTask,
  onOpenNote,
  openSettings,
}: {
  windows: WindowState[];
  dark: boolean;
  lowPower: boolean;
  brightness: number;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
  onOpenNote: (noteId: NoteId) => void;
  openSettings: () => void;
}) {
  const now = useClock();
  const { weather, updatedAt } = useMaringaWeather();
  const month = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const start = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const completed = new Set<TodayTaskId>(completedTasks);
  const remainingTasks = TODAY_TASKS.length - completedTasks.length;
  const runningApps = windows.filter((window) => !window.minimized).length;
  const conditions = weatherDescription(weather.code);

  return (
    <aside
      className='widgets [&.widgets]:absolute [&.widgets]:z-1 [&.widgets]:top-9 [&.widgets]:left-3 [&.widgets]:w-86 [&.widgets]:grid [&.widgets]:grid-cols-[1fr_1fr] [&.widgets]:gap-3 [&.widgets]:pointer-events-none max-[900px]:[&.widgets]:hidden'
      aria-label='Desktop widgets'>
      <section className={cn(
        'widget',
        'widget--calendar',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]', '[&.widget_small]:text-[oklch(0.5_0.01_250)]', '[&.widget--calendar]:col-span-full [&.widget--calendar]:h-40',
      )}>
        <div className='calendar-month [&.calendar-month]:mb-1.75 [&.calendar-month]:text-[oklch(0.61_0.23_28)] [&.calendar-month]:font-bold'>
          {month}
        </div>
        <div className='calendar-layout [&.calendar-layout]:grid [&.calendar-layout]:grid-cols-[196px_1fr] [&.calendar-layout]:gap-3'>
          <div
            className='calendar-grid [&.calendar-grid]:grid [&.calendar-grid]:grid-cols-[repeat(7,1fr)] [&.calendar-grid]:items-center [&.calendar-grid]:text-center [&.calendar-grid]:text-[10px] [&.calendar-grid]:gap-y-0.75'
            aria-label={month}>
            {'SMTWTFS'.split('').map((day, index) => (
              <span
                className='calendar-weekday [&.calendar-weekday]:text-[oklch(0.55_0.01_250)] [&.calendar-weekday]:text-[8px] [&.calendar-weekday]:font-bold'
                key={`${day}-${index}`}>
                {day}
              </span>
            ))}
            {Array.from({ length: start }).map((_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {Array.from({ length: days }, (_, index) => index + 1).map((day) => (
              <span
                className={cn(
                  day === now.getDate() ? 'calendar-today' : '',
                  '[&.calendar-today]:w-4.5 [&.calendar-today]:h-4.5 [&.calendar-today]:justify-self-center [&.calendar-today]:grid [&.calendar-today]:place-items-center [&.calendar-today]:rounded-[50%] [&.calendar-today]:text-[white] [&.calendar-today]:[background:oklch(0.62_0.22_25)]',
                )}
                key={day}>
                {day}
              </span>
            ))}
          </div>
          <button
            type='button'
            className={cn(
              "calendar-event",
              "[&.calendar-event]:self-center [&.calendar-event]:min-w-0 [&.calendar-event]:p-[4px_0_4px_8px] [&.calendar-event]:[border:0] [&.calendar-event]:[border-left:0] [&.calendar-event]:flex [&.calendar-event]:flex-col [&.calendar-event]:overflow-hidden [&.calendar-event]:text-inherit [&.calendar-event]:[background:transparent] [&.calendar-event]:text-left [&.calendar-event]:cursor-default [&.calendar-event]:[transition:scale_120ms_ease-out] [&.calendar-event]:relative [&.calendar-event]:pl-3.25", "[&.calendar-event_span]:overflow-hidden [&.calendar-event_span]:whitespace-nowrap [&.calendar-event_span]:text-ellipsis", "[&.calendar-event_small]:text-[oklch(0.5_0.01_250)]", "[&.calendar-event:active]:scale-[0.98]", "[&.calendar-event::before]:[content:''] [&.calendar-event::before]:absolute [&.calendar-event::before]:left-px [&.calendar-event::before]:top-1.25 [&.calendar-event::before]:w-1.5 [&.calendar-event::before]:h-1.5 [&.calendar-event::before]:rounded-[50%] [&.calendar-event::before]:[background:var(--system-blue)] [&.calendar-event::before]:[box-shadow:0_0_0_3px_oklch(0.67_0.17_245/0.14)]",
            )}
            onClick={() => onOpenNote('now')}
            aria-label="Open today's plan in Notes">
            <span>Design review — Portfolio</span>
            <small>10:00 AM · Notes</small>
          </button>
        </div>
      </section>
      <section
        className={cn(
          'widget',
          'widget--weather',
          '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]', '[&.widget_small]:text-[oklch(0.5_0.01_250)]', '[&.widget--weather_>_small]:block [&.widget--weather_>_small]:overflow-hidden [&.widget--weather_>_small]:text-ellipsis [&.widget--weather_>_small]:whitespace-nowrap',
        )}
        aria-live='polite'
        aria-label={`Weather in Maringá, Paraná: ${Math.round(weather.temperature)} degrees, ${conditions}`}>
        <strong>Maringá, PR</strong>
        <div className='weather-temp [&.weather-temp]:flex [&.weather-temp]:items-center [&.weather-temp]:gap-2 [&.weather-temp]:m-[12px_0_22px] [&.weather-temp]:text-[30px] [&.weather-temp]:font-light [&.weather-temp_svg]:text-[oklch(0.82_0.17_80)] [&.weather-temp_svg]:fill-[currentColor]'>
          {weather.code === 0 ? (
            weather.isDay ? (
              <Sun size={32} />
            ) : (
              <Moon size={32} />
            )
          ) : (
            <CloudSun size={32} />
          )}{' '}
          {Math.round(weather.temperature)}°
        </div>
        <small>
          {conditions} · Feels like {Math.round(weather.apparentTemperature)}°
          {updatedAt
            ? ` · Updated ${updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
            : ''}
        </small>
      </section>
      <section className={cn(
        'widget',
        'widget--today',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]', '[&.widget_small]:text-[oklch(0.5_0.01_250)]', '[&.widget--today_>_label]:min-w-0 [&.widget--today_>_label]:flex [&.widget--today_>_label]:items-center [&.widget--today_>_label]:gap-1.5 [&.widget--today_>_label]:m-[7px_0]', '[&.widget--today_input]:flex-[0_0_auto] [&.widget--today_input]:m-0 [&.widget--today_input]:accent-(--system-blue)', '[&.widget--today_label_>_span]:min-w-0 [&.widget--today_label_>_span]:overflow-hidden [&.widget--today_label_>_span]:text-ellipsis [&.widget--today_label_>_span]:whitespace-nowrap', '[&.widget--today_label.is-complete_>_span]:text-[oklch(0.52_0.01_250)] [&.widget--today_label.is-complete_>_span]:[text-decoration:line-through]', '[&.widget--today_small]:block [&.widget--today_small]:mt-2',
      )}>
        <button
          type='button'
          className={cn(
            'widget-heading-button',
            '[&.widget-heading-button]:w-full [&.widget-heading-button]:flex [&.widget-heading-button]:items-baseline [&.widget-heading-button]:justify-between [&.widget-heading-button]:m-[0_0_6px] [&.widget-heading-button]:p-0 [&.widget-heading-button]:[border:0] [&.widget-heading-button]:text-inherit [&.widget-heading-button]:[background:transparent] [&.widget-heading-button]:font-bold [&.widget-heading-button]:text-left [&.widget-heading-button]:cursor-default [&.widget-heading-button]:[transition:scale_120ms_ease-out]', '[&.widget-heading-button_>_span]:text-(--system-blue-deep) [&.widget-heading-button_>_span]:text-[9px] [&.widget-heading-button_>_span]:font-semibold', '[&.widget-heading-button:active]:scale-[0.98]',
          )}
          onClick={() => onOpenNote('now')}>
          Today <span>Open Notes</span>
        </button>
        {TODAY_TASKS.map((task) => (
          <label className={cn(completed.has(task.id) ? 'is-complete' : '')} key={task.id}>
            <input
              type='checkbox'
              checked={completed.has(task.id)}
              onChange={() => onToggleTask(task.id)}
            />
            <span>{task.label}</span>
          </label>
        ))}
        <small aria-live='polite'>
          {remainingTasks === 0 ? 'All complete' : `${remainingTasks} remaining`}
        </small>
      </section>
      <section
        className={cn(
          'widget',
          'widget--system',
          '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]', '[&.widget_small]:text-[oklch(0.5_0.01_250)]', '[&.widget--system]:col-span-full [&.widget--system]:h-40 [&.widget--system]:py-3', '[&.widget--system_>_small]:block [&.widget--system_>_small]:mt-2',
        )}
        aria-label='Live system status'>
        <button
          type='button'
          className={cn(
            'widget-heading-button',
            '[&.widget-heading-button]:w-full [&.widget-heading-button]:flex [&.widget-heading-button]:items-baseline [&.widget-heading-button]:justify-between [&.widget-heading-button]:m-[0_0_6px] [&.widget-heading-button]:p-0 [&.widget-heading-button]:[border:0] [&.widget-heading-button]:text-inherit [&.widget-heading-button]:[background:transparent] [&.widget-heading-button]:font-bold [&.widget-heading-button]:text-left [&.widget-heading-button]:cursor-default [&.widget-heading-button]:[transition:scale_120ms_ease-out]', '[&.widget-heading-button_>_span]:text-(--system-blue-deep) [&.widget-heading-button_>_span]:text-[9px] [&.widget-heading-button_>_span]:font-semibold', '[&.widget-heading-button:active]:scale-[0.98]',
          )}
          onClick={openSettings}>
          System Status <span>Open Settings</span>
        </button>
        <button
          type='button'
          className={cn(
            'system-widget-row',
            '[&.system-widget-row]:w-full [&.system-widget-row]:min-h-7 [&.system-widget-row]:flex [&.system-widget-row]:items-center [&.system-widget-row]:justify-between [&.system-widget-row]:p-0 [&.system-widget-row]:[border:0] [&.system-widget-row]:[border-bottom:1px_solid_oklch(0.3_0.01_250/0.1)] [&.system-widget-row]:text-inherit [&.system-widget-row]:[background:transparent] [&.system-widget-row]:text-left [&.system-widget-row]:cursor-default [&.system-widget-row]:[transition:scale_120ms_ease-out]', '[&.system-widget-row_strong]:text-[11px] [&.system-widget-row_strong]:font-semibold', '[&.system-widget-row_strong.is-low-power]:text-(--low-power-yellow)', '[&.system-widget-row:active]:scale-[0.98]',
          )}
          onClick={openSettings}>
          <span>Appearance</span>
          <strong>{dark ? 'Dark' : 'Light'}</strong>
        </button>
        <button
          type='button'
          className={cn(
            'system-widget-row',
            '[&.system-widget-row]:w-full [&.system-widget-row]:min-h-7 [&.system-widget-row]:flex [&.system-widget-row]:items-center [&.system-widget-row]:justify-between [&.system-widget-row]:p-0 [&.system-widget-row]:[border:0] [&.system-widget-row]:[border-bottom:1px_solid_oklch(0.3_0.01_250/0.1)] [&.system-widget-row]:text-inherit [&.system-widget-row]:[background:transparent] [&.system-widget-row]:text-left [&.system-widget-row]:cursor-default [&.system-widget-row]:[transition:scale_120ms_ease-out]', '[&.system-widget-row_strong]:text-[11px] [&.system-widget-row_strong]:font-semibold', '[&.system-widget-row_strong.is-low-power]:text-(--low-power-yellow)', '[&.system-widget-row:active]:scale-[0.98]',
          )}
          onClick={openSettings}>
          <span>Display</span>
          <strong>{brightness}%</strong>
        </button>
        <button
          type='button'
          className={cn(
            'system-widget-row',
            '[&.system-widget-row]:w-full [&.system-widget-row]:min-h-7 [&.system-widget-row]:flex [&.system-widget-row]:items-center [&.system-widget-row]:justify-between [&.system-widget-row]:p-0 [&.system-widget-row]:[border:0] [&.system-widget-row]:[border-bottom:1px_solid_oklch(0.3_0.01_250/0.1)] [&.system-widget-row]:text-inherit [&.system-widget-row]:[background:transparent] [&.system-widget-row]:text-left [&.system-widget-row]:cursor-default [&.system-widget-row]:[transition:scale_120ms_ease-out]', '[&.system-widget-row_strong]:text-[11px] [&.system-widget-row_strong]:font-semibold', '[&.system-widget-row_strong.is-low-power]:text-(--low-power-yellow)', '[&.system-widget-row:active]:scale-[0.98]',
          )}
          onClick={openSettings}>
          <span>Battery</span>
          <strong className={cn(lowPower ? 'is-low-power' : '')}>
            {lowPower ? 'Low Power' : '84%'}
          </strong>
        </button>
        <small>
          {runningApps} {runningApps === 1 ? 'app' : 'apps'} active
        </small>
      </section>
    </aside>
  );
}

type DesktopFileId = 'selected-work' | 'read-me';

function DraggableDesktopFile({
  id,
  label,
  top,
  selected,
  onSelect,
  onOpen,
  children,
}: {
  id: DesktopFileId;
  label: string;
  top: number;
  selected: boolean;
  onSelect: (id: DesktopFileId) => void;
  onOpen: () => void;
  children: ReactNode;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
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

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - current.x;
    const deltaY = event.clientY - current.y;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) current.moved = true;
    setOffset({
      x: Math.max(-globalThis.innerWidth + 106, Math.min(current.offsetX + deltaX, 4)),
      y: Math.max(-top + 8, Math.min(current.offsetY + deltaY, globalThis.innerHeight - top - 164)),
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <button
      type='button'
      className={cn(
        `desktop-file${selected ? ' is-selected' : ''}`,
        '[&.desktop-file]:absolute [&.desktop-file]:right-3 [&.desktop-file]:w-21.5 [&.desktop-file]:flex [&.desktop-file]:flex-col [&.desktop-file]:items-center [&.desktop-file]:gap-0.75 [&.desktop-file]:p-0 [&.desktop-file]:[border:0] [&.desktop-file]:text-[white] [&.desktop-file]:[background:transparent] [&.desktop-file]:cursor-default [&.desktop-file]:[text-shadow:0_1px_3px_oklch(0.08_0_0/0.75)] [&.desktop-file]:text-[12px] [&.desktop-file]:pointer-events-auto [&.desktop-file]:touch-none', '[&.desktop-file_>_span:last-child]:p-[2px_4px] [&.desktop-file_>_span:last-child]:rounded-sm', '[&.desktop-file:focus_>_span:last-child]:text-[white] [&.desktop-file:focus_>_span:last-child]:[background:var(--system-blue-deep)] [&.desktop-file:focus_>_span:last-child]:[box-shadow:0_0_0_1px_oklch(1_0_0/0.18)]', '[&.desktop-file.is-selected_>_span:last-child]:text-[white] [&.desktop-file.is-selected_>_span:last-child]:[background:var(--system-blue-deep)] [&.desktop-file.is-selected_>_span:last-child]:[box-shadow:0_0_0_1px_oklch(1_0_0/0.18)]',
      )}
      style={{ top, transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      aria-label={label}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      onDoubleClick={onOpen}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}>
      {children}
      <span>{label}</span>
    </button>
  );
}

function DesktopFiles({
  openApp,
  selectedFile,
  onSelectFile,
}: {
  openApp: (app: AppId) => void;
  selectedFile: DesktopFileId | null;
  onSelectFile: (id: DesktopFileId) => void;
}) {
  return (
    <div
      className='desktop-files [&.desktop-files]:absolute [&.desktop-files]:z-2 [&.desktop-files]:inset-[28px_0_78px] [&.desktop-files]:pointer-events-none max-[900px]:[&.desktop-files]:top-11.5 max-[600px]:[&.desktop-files]:hidden'
      aria-label='Desktop files'>
      <DraggableDesktopFile
        id='selected-work'
        label='Selected Work'
        top={8}
        selected={selectedFile === 'selected-work'}
        onSelect={onSelectFile}
        onOpen={() => openApp('photos')}>
        <span className='folder-icon [&.folder-icon]:w-14.5 [&.folder-icon]:h-12 [&.folder-icon]:grid [&.folder-icon]:place-items-center [&.folder-icon]:filter-[drop-shadow(0_3px_3px_oklch(0.08_0.04_245/0.3))] [&.folder-icon]:text-[oklch(0.72_0.15_240)]'>
          <Folder size={42} fill='oklch(0.72 0.15 240)' />
        </span>
      </DraggableDesktopFile>
      <DraggableDesktopFile
        id='read-me'
        label='Read Me.txt'
        top={96}
        selected={selectedFile === 'read-me'}
        onSelect={onSelectFile}
        onOpen={() => openApp('notes')}>
        <span className='document-icon [&.document-icon]:w-10.5 [&.document-icon]:h-12.5 [&.document-icon]:grid [&.document-icon]:place-items-center [&.document-icon]:text-[oklch(0.45_0.01_250)] [&.document-icon]:[background:white] [&.document-icon]:rounded-[3px_3px_6px_3px] [&.document-icon]:[box-shadow:0_3px_6px_oklch(0.08_0.03_245/0.24)] [&.document-icon]:text-shadow-none'>
          <FileText size={36} />
        </span>
      </DraggableDesktopFile>
    </div>
  );
}

function FinderContent({
  openApp,
  preferences,
  updatePreferences,
  section,
  setSection,
}: {
  openApp: (app: AppId) => void;
  preferences: FinderPreferences;
  updatePreferences: (patch: Partial<FinderPreferences>) => void;
  section: string;
  setSection: (section: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [toolbarMenu, setToolbarMenu] = useState<'share' | 'more' | null>(null);
  const [shareStatus, setShareStatus] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const filteredItems = useMemo(() => {
    const sectionItems = FINDER_SECTIONS[section] ?? [];
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return sectionItems;
    return sectionItems.filter((item) => item.name.toLocaleLowerCase().includes(normalized));
  }, [query, section]);
  const canResizeIcons = preferences.view === 'icons';

  const selectSection = (nextSection: string) => {
    setSection(nextSection);
    setQuery('');
    setToolbarMenu(null);
    setSelectedItem(null);
  };

  const shareInMessages = () => {
    setToolbarMenu(null);
    openApp('messages');
  };

  const copyPortfolioLink = async () => {
    try {
      await globalThis.navigator.clipboard.writeText(globalThis.location.href);
      setShareStatus('Link copied');
    } catch {
      setShareStatus('Portfolio link ready');
    }
  };

  return (
    <div className='finder-app [&.finder-app]:h-full [&.finder-app]:flex'>
      {preferences.showSidebar ? (
        <aside className={cn(
          'finder-sidebar',
          '[&.finder-sidebar]:w-56.25 [&.finder-sidebar]:flex-[0_0_225px] [&.finder-sidebar]:p-[12px_6px] [&.finder-sidebar]:overflow-y-auto [&.finder-sidebar]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.finder-sidebar]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.finder-sidebar]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)] [&.finder-sidebar]:[border-right:1px_solid_oklch(0.36_0.01_250/0.15)]', '[&.finder-sidebar_button]:w-full [&.finder-sidebar_button]:h-7.25 [&.finder-sidebar_button]:flex [&.finder-sidebar_button]:items-center [&.finder-sidebar_button]:gap-2 [&.finder-sidebar_button]:p-[0_10px] [&.finder-sidebar_button]:[border:0] [&.finder-sidebar_button]:rounded-[7px] [&.finder-sidebar_button]:[background:transparent] [&.finder-sidebar_button]:text-left [&.finder-sidebar_button]:text-[13px]', '[&.finder-sidebar_button.selected]:text-(--ink) [&.finder-sidebar_button.selected]:[background:oklch(0.71_0.13_245/0.55)] [&.finder-sidebar_button.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38),inset_0_0_0_1px_oklch(0.4_0.08_245/0.08)]', '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-sidebar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-sidebar]:[-webkit-backdrop-filter:none]', 'max-[900px]:[&.finder-sidebar]:w-41.25 max-[900px]:[&.finder-sidebar]:basis-41.25', 'max-[600px]:[&.finder-sidebar]:hidden',
        )}>
          <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
            Favorites
          </span>
          {FINDER_FAVORITES.map((item) => (
            <button
              type='button'
              key={item}
              className={cn(section === item ? 'selected' : '')}
              aria-current={section === item ? 'page' : undefined}
              onClick={() => selectSection(item)}>
              {item === 'Portfolio' ? (
                <Folder size={16} />
              ) : item === 'About Me' ? (
                <UserRound size={16} />
              ) : (
                <GalleryVerticalEnd size={16} />
              )}
              {item}
            </button>
          ))}
          <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
            Locations
          </span>
          <button type='button'>
            <BriefcaseBusiness size={16} />
            Renan's Mac
          </button>
          <button type='button'>
            <CloudSun size={16} />
            iCloud
          </button>
          <button
            type='button'
            className={cn(section === 'Trash' ? 'selected' : '')}
            aria-current={section === 'Trash' ? 'page' : undefined}
            onClick={() => selectSection('Trash')}>
            <Trash2 size={16} />
            Trash
          </button>
          <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
            Tags
          </span>
          <button type='button'>
            <i className='tag tag--red [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--red]:[background:oklch(0.66_0.23_25)]' />
            Important
          </button>
          <button type='button'>
            <i className='tag tag--orange [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--orange]:[background:oklch(0.76_0.18_65)]' />
            In progress
          </button>
          <button type='button'>
            <i className='tag tag--green [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--green]:[background:oklch(0.69_0.2_145)]' />
            Shipped
          </button>
        </aside>
      ) : null}
      <main className='finder-content [&.finder-content]:min-w-0 [&.finder-content]:flex-1 [&.finder-content]:flex [&.finder-content]:flex-col [&.finder-content]:[background:var(--material-content)] [&.finder-content]:text-(--text-color)'>
        <div className={cn(
          "finder-toolbar",
          "[&.finder-toolbar]:relative [&.finder-toolbar]:h-12.5 [&.finder-toolbar]:flex-[0_0_46px] [&.finder-toolbar]:flex [&.finder-toolbar]:items-center [&.finder-toolbar]:gap-3.25 [&.finder-toolbar]:p-[0_12px] [&.finder-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.finder-toolbar]:basis-12.5 [&.finder-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.finder-toolbar]:border-b-[oklch(0.36_0.01_250/0.15)] [&.finder-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.finder-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)]", "[&.finder-toolbar_>_button]:[border:0] [&.finder-toolbar_>_button]:[background:transparent] [&.finder-toolbar_>_button]:p-1 [&.finder-toolbar_>_button]:text-[oklch(0.34_0.012_250)]", "[&.finder-toolbar_>_button[aria-expanded='true']]:rounded-[7px] [&.finder-toolbar_>_button[aria-expanded='true']]:[background:oklch(1_0_0/0.52)] [&.finder-toolbar_>_button[aria-expanded='true']]:[box-shadow:inset_0_0_0_1px_oklch(0.35_0.01_250/0.1),0_1px_3px_oklch(0.12_0.02_250/0.12)]", "[@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar]:[-webkit-backdrop-filter:none]",
        )}>
          <span className='window-nav [&.window-nav]:flex [&.window-nav]:gap-2.5 [&.window-nav]:text-[oklch(0.52_0.01_250)]'>
            <ChevronLeft size={18} />
            <ChevronRight size={18} />
          </span>
          <div className={cn(
            'view-switcher',
            '[&.view-switcher]:flex [&.view-switcher]:gap-px [&.view-switcher]:items-center [&.view-switcher]:p-0.75 [&.view-switcher]:rounded-[10px] [&.view-switcher]:[background:oklch(0.8_0.012_250/0.3)] [&.view-switcher]:[box-shadow:inset_0_0_0_1px_oklch(0.35_0.01_250/0.1),inset_0_1px_oklch(1_0_0/0.42)]', '[&.view-switcher_button]:w-6.75 [&.view-switcher_button]:h-6 [&.view-switcher_button]:grid [&.view-switcher_button]:place-items-center [&.view-switcher_button]:p-0 [&.view-switcher_button]:[border:0] [&.view-switcher_button]:rounded-[7px] [&.view-switcher_button]:[background:transparent]', '[&.view-switcher_button.selected]:[background:oklch(1_0_0/0.72)] [&.view-switcher_button.selected]:[box-shadow:0_1px_3px_oklch(0.16_0.02_250/0.2),inset_0_0_0_1px_oklch(1_0_0/0.5)]',
          )}>
            <button
              type='button'
              className={cn(preferences.view === 'icons' ? 'selected' : '')}
              aria-label='View as Icons'
              onClick={() => updatePreferences({ view: 'icons' })}>
              <Grid2X2 size={16} />
            </button>
            <button
              type='button'
              className={cn(preferences.view === 'list' ? 'selected' : '')}
              aria-label='View as List'
              onClick={() => updatePreferences({ view: 'list' })}>
              <List size={16} />
            </button>
            <button
              type='button'
              className={cn(preferences.view === 'columns' ? 'selected' : '')}
              aria-label='View as Columns'
              onClick={() => updatePreferences({ view: 'columns' })}>
              <Columns3 size={16} />
            </button>
            <button
              type='button'
              className={cn(preferences.view === 'gallery' ? 'selected' : '')}
              aria-label='View as Gallery'
              onClick={() => updatePreferences({ view: 'gallery' })}>
              <GalleryVerticalEnd size={16} />
            </button>
          </div>
          <span className='toolbar-spacer [&.toolbar-spacer]:flex-1' />
          <button
            type='button'
            aria-label='Share'
            aria-haspopup='menu'
            aria-expanded={toolbarMenu === 'share'}
            onClick={() => {
              setShareStatus('');
              setToolbarMenu(toolbarMenu === 'share' ? null : 'share');
            }}>
            <Share size={16} />
          </button>
          <button
            type='button'
            aria-label='More'
            aria-haspopup='menu'
            aria-expanded={toolbarMenu === 'more'}
            onClick={() => setToolbarMenu(toolbarMenu === 'more' ? null : 'more')}>
            <MoreHorizontal size={17} />
          </button>
          <label className={cn(
            'finder-search',
            '[&.finder-search]:w-45 [&.finder-search]:h-7 [&.finder-search]:flex [&.finder-search]:items-center [&.finder-search]:gap-1.5 [&.finder-search]:p-[0_10px] [&.finder-search]:rounded-[999px] [&.finder-search]:text-[oklch(0.53_0.01_250)] [&.finder-search]:[background:oklch(1_0_0/0.56)] [&.finder-search]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)]', '[&.finder-search_input]:min-w-0 [&.finder-search_input]:w-full [&.finder-search_input]:[border:0] [&.finder-search_input]:[outline:0] [&.finder-search_input]:[background:transparent] [&.finder-search_input]:text-[12px]', 'max-[600px]:[&.finder-search]:hidden',
          )}>
            <Search size={14} />
            <input
              aria-label='Search files'
              placeholder={`Search ${section}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {toolbarMenu === 'share' ? (
            <div
              className={cn(
                'finder-toolbar-popover',
                'finder-share-popover',
                '[&.finder-toolbar-popover]:absolute [&.finder-toolbar-popover]:z-60 [&.finder-toolbar-popover]:top-10.5 [&.finder-toolbar-popover]:w-47.5 [&.finder-toolbar-popover]:p-1.5 [&.finder-toolbar-popover]:rounded-[13px] [&.finder-toolbar-popover]:[background:linear-gradient(145deg,oklch(1_0_0/0.42),oklch(1_0_0/0)_48%),oklch(0.975_0.008_245/0.9)] [&.finder-toolbar-popover]:[backdrop-filter:blur(46px)_saturate(1.55)] [&.finder-toolbar-popover]:[-webkit-backdrop-filter:blur(46px)_saturate(1.55)] [&.finder-toolbar-popover]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_14px_34px_oklch(0.08_0.03_245/0.24)]', '[&.finder-toolbar-popover_>_strong]:block [&.finder-toolbar-popover_>_strong]:p-[6px_8px_7px] [&.finder-toolbar-popover_>_strong]:text-[12px]', '[&.finder-toolbar-popover_button]:w-full [&.finder-toolbar-popover_button]:min-h-7.25 [&.finder-toolbar-popover_button]:flex [&.finder-toolbar-popover_button]:items-center [&.finder-toolbar-popover_button]:gap-2 [&.finder-toolbar-popover_button]:p-[4px_8px] [&.finder-toolbar-popover_button]:[border:0] [&.finder-toolbar-popover_button]:rounded-[7px] [&.finder-toolbar-popover_button]:[background:transparent] [&.finder-toolbar-popover_button]:text-left', '[&.finder-toolbar-popover_button:hover]:[background:oklch(1_0_0/0.52)] [&.finder-toolbar-popover_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.4)]', '[&.finder-toolbar-popover_button_>_span]:min-w-0 [&.finder-toolbar-popover_button_>_span]:flex [&.finder-toolbar-popover_button_>_span]:items-center [&.finder-toolbar-popover_button_>_span]:gap-1.5', '[&.finder-toolbar-popover_button_>_span_svg]:w-3.25', '[&.finder-toolbar-popover_hr]:m-[4px_7px] [&.finder-toolbar-popover_hr]:[border:0] [&.finder-toolbar-popover_hr]:[border-top:1px_solid_var(--separator)]', '[&.finder-toolbar-popover_>_small]:min-h-4.25 [&.finder-toolbar-popover_>_small]:block [&.finder-toolbar-popover_>_small]:p-[3px_8px_1px] [&.finder-toolbar-popover_>_small]:text-(--muted) [&.finder-toolbar-popover_>_small]:text-[10px]', '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[background:var(--material-menu)]', '[&.finder-share-popover]:right-52.5',
              )}
              role='menu'
              aria-label='Share Portfolio'
              onPointerDown={(event) => event.stopPropagation()}>
              <strong>Share “{section}”</strong>
              <button type='button' role='menuitem' onClick={shareInMessages}>
                <MessageCircle size={15} />
                <span>Messages</span>
              </button>
              <button type='button' role='menuitem' onClick={shareInMessages}>
                <Mail size={15} />
                <span>Mail</span>
              </button>
              <button type='button' role='menuitem' onClick={() => void copyPortfolioLink()}>
                <ExternalLink size={15} />
                <span>Copy Link</span>
              </button>
              <small aria-live='polite'>{shareStatus}</small>
            </div>
          ) : null}
          {toolbarMenu === 'more' ? (
            <div
              className={cn(
                'finder-toolbar-popover',
                'finder-more-popover',
                '[&.finder-toolbar-popover]:absolute [&.finder-toolbar-popover]:z-60 [&.finder-toolbar-popover]:top-10.5 [&.finder-toolbar-popover]:w-47.5 [&.finder-toolbar-popover]:p-1.5 [&.finder-toolbar-popover]:rounded-[13px] [&.finder-toolbar-popover]:[background:linear-gradient(145deg,oklch(1_0_0/0.42),oklch(1_0_0/0)_48%),oklch(0.975_0.008_245/0.9)] [&.finder-toolbar-popover]:[backdrop-filter:blur(46px)_saturate(1.55)] [&.finder-toolbar-popover]:[-webkit-backdrop-filter:blur(46px)_saturate(1.55)] [&.finder-toolbar-popover]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_14px_34px_oklch(0.08_0.03_245/0.24)]', '[&.finder-toolbar-popover_>_strong]:block [&.finder-toolbar-popover_>_strong]:p-[6px_8px_7px] [&.finder-toolbar-popover_>_strong]:text-[12px]', '[&.finder-toolbar-popover_button]:w-full [&.finder-toolbar-popover_button]:min-h-7.25 [&.finder-toolbar-popover_button]:flex [&.finder-toolbar-popover_button]:items-center [&.finder-toolbar-popover_button]:gap-2 [&.finder-toolbar-popover_button]:p-[4px_8px] [&.finder-toolbar-popover_button]:[border:0] [&.finder-toolbar-popover_button]:rounded-[7px] [&.finder-toolbar-popover_button]:[background:transparent] [&.finder-toolbar-popover_button]:text-left', '[&.finder-toolbar-popover_button:hover]:[background:oklch(1_0_0/0.52)] [&.finder-toolbar-popover_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.4)]', '[&.finder-toolbar-popover_button_>_span]:min-w-0 [&.finder-toolbar-popover_button_>_span]:flex [&.finder-toolbar-popover_button_>_span]:items-center [&.finder-toolbar-popover_button_>_span]:gap-1.5', '[&.finder-toolbar-popover_button_>_span_svg]:w-3.25', '[&.finder-toolbar-popover_hr]:m-[4px_7px] [&.finder-toolbar-popover_hr]:[border:0] [&.finder-toolbar-popover_hr]:[border-top:1px_solid_var(--separator)]', '[&.finder-toolbar-popover_>_small]:min-h-4.25 [&.finder-toolbar-popover_>_small]:block [&.finder-toolbar-popover_>_small]:p-[3px_8px_1px] [&.finder-toolbar-popover_>_small]:text-(--muted) [&.finder-toolbar-popover_>_small]:text-[10px]', '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[background:var(--material-menu)]', '[&.finder-more-popover]:right-43.5',
              )}
              role='menu'
              aria-label='Finder actions'
              onPointerDown={(event) => event.stopPropagation()}>
              <button
                type='button'
                role='menuitemradio'
                aria-checked={preferences.view === 'icons'}
                onClick={() => {
                  updatePreferences({ view: 'icons' });
                  setToolbarMenu(null);
                }}>
                <span>{preferences.view === 'icons' ? <Check size={13} /> : null} Icons</span>
              </button>
              <button
                type='button'
                role='menuitemradio'
                aria-checked={preferences.view === 'list'}
                onClick={() => {
                  updatePreferences({ view: 'list' });
                  setToolbarMenu(null);
                }}>
                <span>{preferences.view === 'list' ? <Check size={13} /> : null} List</span>
              </button>
              <hr />
              <button
                type='button'
                role='menuitemcheckbox'
                aria-checked={preferences.showPreview}
                onClick={() => updatePreferences({ showPreview: !preferences.showPreview })}>
                <span>{preferences.showPreview ? <Check size={13} /> : null} Show Preview</span>
              </button>
              <button
                type='button'
                role='menuitemcheckbox'
                aria-checked={preferences.showStatusBar}
                onClick={() => updatePreferences({ showStatusBar: !preferences.showStatusBar })}>
                <span>
                  {preferences.showStatusBar ? <Check size={13} /> : null} Show Status Bar
                </span>
              </button>
            </div>
          ) : null}
        </div>
        <div className='finder-workspace [&.finder-workspace]:min-h-0 [&.finder-workspace]:flex-1 [&.finder-workspace]:flex'>
          <div
            className={cn(
              `finder-files finder-files--${preferences.view}`,
              "[&.finder-files]:[--finder-icon-size:58px] [&.finder-files]:min-w-0 [&.finder-files]:flex-1 [&.finder-files]:flex [&.finder-files]:content-start [&.finder-files]:flex-wrap [&.finder-files]:gap-[26px_24px] [&.finder-files]:p-8.5 [&.finder-files]:overflow-auto [&.finder-files]:[background:var(--material-content)]", "[&.finder-files.finder-files--list]:block [&.finder-files.finder-files--list]:p-[20px_12px]", "[&.finder-files.finder-files--columns]:grid [&.finder-files.finder-files--columns]:grid-cols-[repeat(3,minmax(150px,1fr))] [&.finder-files.finder-files--columns]:grid-rows-[repeat(3,34px)] [&.finder-files.finder-files--columns]:grid-flow-col [&.finder-files.finder-files--columns]:content-stretch [&.finder-files.finder-files--columns]:gap-0 [&.finder-files.finder-files--columns]:p-[10px_0]", "[&.finder-files.finder-files--columns::after]:[content:''] [&.finder-files.finder-files--columns::after]:sticky [&.finder-files.finder-files--columns::after]:right-0 [&.finder-files.finder-files--columns::after]:w-px [&.finder-files.finder-files--columns::after]:h-full [&.finder-files.finder-files--columns::after]:[background:var(--separator)]", "[&.finder-files.finder-files--gallery]:flex-nowrap [&.finder-files.finder-files--gallery]:items-end [&.finder-files.finder-files--gallery]:justify-start [&.finder-files.finder-files--gallery]:gap-3 [&.finder-files.finder-files--gallery]:p-8 [&.finder-files.finder-files--gallery]:[background:linear-gradient(180deg,oklch(0.96_0.01_250),oklch(0.99_0_0))]",
            )}
            style={{ '--finder-icon-size': `${preferences.iconSize}px` } as CSSProperties}
            aria-label={`${section} files`}
            aria-live='polite'>
            {filteredItems.map((item) => (
              <FinderItem
                key={`${section}-${item.name}`}
                item={item}
                size={preferences.iconSize}
                selected={selectedItem === item.name}
                onSelect={() => setSelectedItem(item.name)}
                onOpen={() => openApp(item.app)}
              />
            ))}
            {filteredItems.length === 0 ? (
              <div className={cn(
                'finder-empty',
                '[&.finder-empty]:w-full [&.finder-empty]:min-h-45 [&.finder-empty]:flex [&.finder-empty]:flex-col [&.finder-empty]:items-center [&.finder-empty]:justify-center [&.finder-empty]:gap-1.25 [&.finder-empty]:text-(--muted) [&.finder-empty]:text-center', '[&.finder-empty_strong]:text-inherit [&.finder-empty_strong]:text-[13px]', '[&.finder-empty_span]:text-[11px]',
              )}>
                <Search size={26} />
                <strong>No results</strong>
                <span>
                  No items in {section} match “{query}”.
                </span>
              </div>
            ) : null}
          </div>
          {preferences.showPreview ? (
            <aside className={cn(
              'finder-preview',
              '[&.finder-preview]:w-57.5 [&.finder-preview]:flex-[0_0_230px] [&.finder-preview]:flex [&.finder-preview]:flex-col [&.finder-preview]:items-center [&.finder-preview]:gap-2.5 [&.finder-preview]:p-[34px_20px] [&.finder-preview]:[border-left:1px_solid_var(--separator)] [&.finder-preview]:[background:oklch(0.96_0.005_250)]', '[&.finder-preview_.finder-document]:[--finder-icon-size:88px]', '[&.finder-preview_dl]:w-full [&.finder-preview_dl]:mt-4 [&.finder-preview_dl]:text-[11px]', '[&.finder-preview_dl_div]:grid [&.finder-preview_dl_div]:grid-cols-[0.7fr_1.3fr] [&.finder-preview_dl_div]:gap-2 [&.finder-preview_dl_div]:m-[7px_0]', '[&.finder-preview_dt]:text-[oklch(0.5_0.01_250)] [&.finder-preview_dt]:text-right', '[&.finder-preview_dd]:m-0',
            )}>
              <span className={cn(
                'finder-document',
                '[&.finder-document]:relative [&.finder-document]:w-(--finder-icon-size) [&.finder-document]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-document]:grid [&.finder-document]:place-items-center [&.finder-document]:flex-[0_0_auto] [&.finder-document]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-document]:text-[oklch(0.45_0.01_250)] [&.finder-document]:[background:linear-gradient(135deg,white_0_79%,oklch(0.91_0.015_245)_80%)] [&.finder-document]:rounded-[5%_5%_12%_5%] [&.finder-document]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.09),0_3px_7px_oklch(0.1_0.02_250/0.16)]', '[&.finder-document_svg]:relative [&.finder-document_svg]:z-2 [&.finder-document_svg]:w-[40%] [&.finder-document_svg]:h-[40%] [&.finder-document_svg]:stroke-[1.8]', '[.finder-files--list_&.finder-document]:[--finder-icon-size:20px] [.finder-files--list_&.finder-document]:[transition:none]', '[.finder-files--columns_&.finder-document]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-document]:flex-[0_0_24px]',
              )}>
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
          ) : null}
        </div>
        {preferences.showStatusBar ? (
          <div className={cn(
            'finder-status',
            '[&.finder-status]:h-6.5 [&.finder-status]:flex [&.finder-status]:items-center [&.finder-status]:justify-between [&.finder-status]:gap-3 [&.finder-status]:p-[0_12px] [&.finder-status]:text-(--label-secondary) [&.finder-status]:[border-top:1px_solid_var(--separator)] [&.finder-status]:text-[10px] [&.finder-status]:[background:var(--material-status)]', '[&.finder-status_label]:flex [&.finder-status_label]:items-center [&.finder-status_label]:gap-1.75 [&.finder-status_label]:whitespace-nowrap', '[&.finder-status_label.is-disabled]:opacity-[0.48]', '[&.finder-status_input]:w-26.25 [&.finder-status_input]:accent-(--system-blue)', '[&.finder-status_output]:w-7.25 [&.finder-status_output]:[font-variant-numeric:tabular-nums] [&.finder-status_output]:text-right',
          )}>
            <span>
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}, 214.3 GB
              available
            </span>
            <label className={cn(canResizeIcons ? '' : 'is-disabled')}>
              Icon size{' '}
              <input
                aria-label='Icon size'
                aria-valuetext={`${preferences.iconSize} pixels`}
                type='range'
                min='40'
                max='88'
                step='4'
                value={preferences.iconSize}
                disabled={!canResizeIcons}
                onChange={(event) => updatePreferences({ iconSize: Number(event.target.value) })}
              />
              <output>{preferences.iconSize}px</output>
            </label>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function FinderEntryIcon({ glyph }: { glyph: FinderEntry['glyph'] }) {
  switch (glyph) {
    case 'user':
      return <UserRound />;
    case 'code':
      return <FileCode2 />;
    case 'text':
      return <FileText />;
    case 'images':
      return <Images />;
    case 'terminal':
      return <SquareTerminal />;
    case 'mail':
      return <Mail />;
    case 'folder':
      return <Folder />;
  }
}

function FinderItem({
  item,
  size,
  selected,
  onSelect,
  onOpen,
}: {
  item: FinderEntry;
  size: number;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  const kindLabel =
    item.kind === 'folder' ? 'Folder' : item.kind === 'application' ? 'Application' : 'Document';
  return (
    <button
      type='button'
      className={cn(
        `finder-item${selected ? ' is-selected' : ''}`,
        '[&.finder-item]:w-[calc(var(--finder-icon-size)+24px)] [&.finder-item]:flex [&.finder-item]:flex-col [&.finder-item]:items-center [&.finder-item]:gap-1.5 [&.finder-item]:p-0 [&.finder-item]:[border:0] [&.finder-item]:[background:transparent] [&.finder-item]:text-[12px] [&.finder-item]:leading-[1.2]', '[&.finder-item_>_span:last-child]:max-w-full [&.finder-item_>_span:last-child]:p-[2px_3px] [&.finder-item_>_span:last-child]:rounded-sm', '[&.finder-item:focus_>_span:nth-child(2)]:text-[white] [&.finder-item:focus_>_span:nth-child(2)]:[background:var(--system-blue-deep)]', '[&.finder-item.is-selected_>_span:nth-child(2)]:text-[white] [&.finder-item.is-selected_>_span:nth-child(2)]:[background:var(--system-blue-deep)]', '[.finder-files--list_&.finder-item]:w-full [.finder-files--list_&.finder-item]:h-8.5 [.finder-files--list_&.finder-item]:grid [.finder-files--list_&.finder-item]:grid-cols-[28px_minmax(120px,1fr)_minmax(240px,0.85fr)] [.finder-files--list_&.finder-item]:gap-2 [.finder-files--list_&.finder-item]:p-[0_8px] [.finder-files--list_&.finder-item]:rounded-[5px] [.finder-files--list_&.finder-item]:text-left', '[.finder-files--list_&.finder-item:nth-child(even)]:[background:oklch(0.94_0.005_250/0.62)]', '[.finder-files--list_&.finder-item.is-selected]:text-[white] [.finder-files--list_&.finder-item.is-selected]:[background:var(--system-blue-deep)]', '[.finder-files--list_&.finder-item.is-selected_.finder-item\\_\\_metadata]:text-[oklch(1_0_0/0.78)]', '[.finder-files--list_&.finder-item.is-selected_>_span:nth-child(2)]:[background:transparent]', '[.finder-files--list_&.finder-item_>_span:nth-child(2)]:[justify-self:start]', '[.finder-files--columns_&.finder-item]:w-full [.finder-files--columns_&.finder-item]:h-8.5 [.finder-files--columns_&.finder-item]:flex-row [.finder-files--columns_&.finder-item]:gap-1.75 [.finder-files--columns_&.finder-item]:p-[0_10px] [.finder-files--columns_&.finder-item]:rounded-[5px] [.finder-files--columns_&.finder-item]:text-left', '[.finder-files--gallery_&.finder-item]:[--finder-icon-size:88px] [.finder-files--gallery_&.finder-item]:flex-[0_0_126px] [.finder-files--gallery_&.finder-item]:w-31.5 [.finder-files--gallery_&.finder-item]:p-3 [.finder-files--gallery_&.finder-item]:rounded-[9px] [.finder-files--gallery_&.finder-item]:[background:oklch(1_0_0/0.72)] [.finder-files--gallery_&.finder-item]:[box-shadow:0_5px_12px_oklch(0.2_0.02_250/0.12)]',
      )}
      aria-pressed={selected}
      onDoubleClick={onOpen}
      onClick={onSelect}>
      {item.kind === 'application' ? (
        <span className={cn(
          'finder-application',
          '[&.finder-application]:relative [&.finder-application]:w-(--finder-icon-size) [&.finder-application]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-application]:grid [&.finder-application]:place-items-center [&.finder-application]:flex-[0_0_auto] [&.finder-application]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)]', '[&.finder-application_.app-icon]:[--icon-size:calc(var(--finder-icon-size)*0.82)]!', '[.finder-files--list_&.finder-application]:[--finder-icon-size:20px] [.finder-files--list_&.finder-application]:[transition:none]', '[.finder-files--columns_&.finder-application]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-application]:flex-[0_0_24px]',
        )}>
          <AppIcon app={item.app} size={Math.round(size * 0.82)} />
        </span>
      ) : (
        <span
          className={cn(
            item.kind === 'folder' ? 'finder-folder' : 'finder-document',
            "[&.finder-folder]:relative [&.finder-folder]:w-(--finder-icon-size) [&.finder-folder]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-folder]:grid [&.finder-folder]:place-items-center [&.finder-folder]:flex-[0_0_auto] [&.finder-folder]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-folder]:text-[oklch(0.98_0_0)] [&.finder-folder]:filter-[drop-shadow(0_3px_4px_oklch(0.1_0.03_245/0.2))]", "[&.finder-folder::before]:[content:''] [&.finder-folder::before]:absolute [&.finder-folder::before]:z-0 [&.finder-folder::before]:left-[6%] [&.finder-folder::before]:top-[4%] [&.finder-folder::before]:w-[44%] [&.finder-folder::before]:h-[26%] [&.finder-folder::before]:rounded-[12%_16%_0_0] [&.finder-folder::before]:[background:oklch(0.79_0.13_226)]", "[&.finder-folder::after]:[content:''] [&.finder-folder::after]:absolute [&.finder-folder::after]:z-1 [&.finder-folder::after]:inset-[17%_0_2%] [&.finder-folder::after]:rounded-[9%_9%_13%_13%] [&.finder-folder::after]:[background:linear-gradient(180deg,oklch(0.84_0.11_225),oklch(0.62_0.19_245))] [&.finder-folder::after]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38)]", "[&.finder-folder_svg]:relative [&.finder-folder_svg]:z-2 [&.finder-folder_svg]:w-[40%] [&.finder-folder_svg]:h-[40%] [&.finder-folder_svg]:stroke-[1.8]", "[.finder-files--list_&.finder-folder]:[--finder-icon-size:20px] [.finder-files--list_&.finder-folder]:[transition:none]", "[.finder-files--columns_&.finder-folder]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-folder]:flex-[0_0_24px]", "[&.finder-document]:relative [&.finder-document]:w-(--finder-icon-size) [&.finder-document]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-document]:grid [&.finder-document]:place-items-center [&.finder-document]:flex-[0_0_auto] [&.finder-document]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-document]:text-[oklch(0.45_0.01_250)] [&.finder-document]:[background:linear-gradient(135deg,white_0_79%,oklch(0.91_0.015_245)_80%)] [&.finder-document]:rounded-[5%_5%_12%_5%] [&.finder-document]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.09),0_3px_7px_oklch(0.1_0.02_250/0.16)]", "[&.finder-document_svg]:relative [&.finder-document_svg]:z-2 [&.finder-document_svg]:w-[40%] [&.finder-document_svg]:h-[40%] [&.finder-document_svg]:stroke-[1.8]", "[.finder-files--list_&.finder-document]:[--finder-icon-size:20px] [.finder-files--list_&.finder-document]:[transition:none]", "[.finder-files--columns_&.finder-document]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-document]:flex-[0_0_24px]",
          )}>
          <FinderEntryIcon glyph={item.glyph} />
        </span>
      )}
      <span>{item.name}</span>
      <span className={cn(
        'finder-item__metadata',
        '[&.finder-item\\_\\_metadata]:hidden', '[.finder-files--list_&.finder-item\\_\\_metadata]:w-full [.finder-files--list_&.finder-item\\_\\_metadata]:grid [.finder-files--list_&.finder-item\\_\\_metadata]:grid-cols-[1fr_1.2fr_0.5fr] [.finder-files--list_&.finder-item\\_\\_metadata]:gap-3 [.finder-files--list_&.finder-item\\_\\_metadata]:text-[oklch(0.5_0.01_250)] [.finder-files--list_&.finder-item\\_\\_metadata]:text-[11px]',
      )}>
        <span>{kindLabel}</span>
        <span>Today, 10:09 AM</span>
        <span>{item.kind === 'folder' ? '—' : '12 KB'}</span>
      </span>
    </button>
  );
}

function SafariContent() {
  return (
    <div className='safari-app [&.safari-app]:h-full [&.safari-app]:flex [&.safari-app]:flex-col [&.safari-app]:[background:oklch(0.985_0_0)]'>
      <div className='safari-toolbar [&.safari-toolbar]:h-12.5 [&.safari-toolbar]:flex-[0_0_46px] [&.safari-toolbar]:flex [&.safari-toolbar]:items-center [&.safari-toolbar]:gap-4.25 [&.safari-toolbar]:p-[0_14px] [&.safari-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.safari-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.safari-toolbar]:basis-12.5 [&.safari-toolbar]:border-b-[oklch(0.36_0.01_250/0.15)] [&.safari-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar_>_svg]:text-[oklch(0.34_0.012_250)] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[-webkit-backdrop-filter:none]'>
        <PanelLeft size={17} />
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
        <div className='address-bar [&.address-bar]:h-7 [&.address-bar]:flex-1 [&.address-bar]:grid [&.address-bar]:place-items-center [&.address-bar]:rounded-lg [&.address-bar]:[background:oklch(1_0_0/0.56)] [&.address-bar]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)] [&.address-bar]:text-[oklch(0.4_0.01_250)] [&.address-bar]:text-[12px]'>
          <span>renan.dev</span>
        </div>
        <Share size={17} />
        <ExternalLink size={17} />
        <Grid2X2 size={17} />
      </div>
      <main className={cn(
        'portfolio-page',
        '[&.portfolio-page]:flex-1 [&.portfolio-page]:overflow-auto [&.portfolio-page]:text-[oklch(0.16_0.01_250)] [&.portfolio-page]:[background:oklch(0.985_0.004_250)] [&.portfolio-page]:[user-select:text] [&.portfolio-page]:scroll-smooth', '[&.portfolio-page_nav]:h-18 [&.portfolio-page_nav]:flex [&.portfolio-page_nav]:items-center [&.portfolio-page_nav]:justify-between [&.portfolio-page_nav]:max-w-225 [&.portfolio-page_nav]:m-auto [&.portfolio-page_nav]:p-[0_30px] [&.portfolio-page_nav]:text-[12px] [&.portfolio-page_nav]:font-bold [&.portfolio-page_nav]:tracking-[0.02em]', '[&.portfolio-page_nav_div]:flex [&.portfolio-page_nav_div]:gap-6.5 [&.portfolio-page_nav_div]:font-medium',
      )}>
        <nav>
          <span>RENAN.DEV</span>
          <div>
            <a href='#work'>Work</a>
            <a href='#about'>About</a>
            <a href='mailto:hello@example.com'>Contact</a>
          </div>
        </nav>
        <section
          className={cn(
            'portfolio-hero',
            '[&.portfolio-hero]:max-w-225 [&.portfolio-hero]:min-h-125 [&.portfolio-hero]:m-auto [&.portfolio-hero]:p-[80px_30px_70px]', '[&.portfolio-hero_h1]:max-w-190 [&.portfolio-hero_h1]:m-0 [&.portfolio-hero_h1]:text-[clamp(3.2rem,7vw,5.6rem)] [&.portfolio-hero_h1]:leading-[0.96] [&.portfolio-hero_h1]:tracking-[-0.04em] [&.portfolio-hero_h1]:text-balance', '[&.portfolio-hero_p]:max-w-145 [&.portfolio-hero_p]:m-[30px_0] [&.portfolio-hero_p]:text-[oklch(0.38_0.01_250)] [&.portfolio-hero_p]:text-[18px] [&.portfolio-hero_p]:leading-[1.6] [&.portfolio-hero_p]:text-pretty', 'max-[600px]:[&.portfolio-hero]:pt-13.75', 'max-[600px]:[&.portfolio-hero_h1]:text-[clamp(2.8rem,16vw,4.7rem)]',
          )}
          id='about'>
          <span className='availability [&.availability]:inline-flex [&.availability]:items-center [&.availability]:gap-2 [&.availability]:mb-7 [&.availability]:text-[oklch(0.39_0.04_150)] [&.availability]:text-[12px] [&.availability]:font-semibold [&.availability_i]:w-2 [&.availability_i]:h-2 [&.availability_i]:rounded-[50%] [&.availability_i]:[background:oklch(0.72_0.2_145)] [&.availability_i]:[box-shadow:0_0_0_4px_oklch(0.72_0.2_145/0.12)]'>
            <i /> Available for interesting work
          </span>
          <h1>I build digital things with care.</h1>
          <p>
            Designer, developer, and relentless polisher of tiny details. This copy is a
            placeholder; the craft is real.
          </p>
          <a
            href='#work'
            className='hero-link [&.hero-link]:inline-flex [&.hero-link]:gap-3 [&.hero-link]:items-center [&.hero-link]:font-[650] [&.hero-link]:[border-bottom:1px_solid_currentColor] [&.hero-link]:pb-0.75'>
            Explore selected work <span>↓</span>
          </a>
        </section>
        <section
          className='portfolio-work [&.portfolio-work]:grid [&.portfolio-work]:grid-cols-[1fr_1fr] [&.portfolio-work]:min-h-107.5 max-[600px]:[&.portfolio-work]:grid-cols-[1fr]'
          id='work'>
          <article className={cn(
            'work-feature',
            'work-feature--blue',
            '[&.work-feature]:relative [&.work-feature]:flex [&.work-feature]:items-end [&.work-feature]:justify-between [&.work-feature]:p-9 [&.work-feature]:text-[white]', '[&.work-feature_>_span]:self-start [&.work-feature_>_span]:text-[12px]', '[&.work-feature_h2]:m-[10px_0] [&.work-feature_h2]:text-[34px] [&.work-feature_h2]:tracking-tight', '[&.work-feature_p]:max-w-[30ch] [&.work-feature_p]:m-0 [&.work-feature_p]:leading-normal', '[&.work-feature--blue]:[background:oklch(0.48_0.16_245)]',
          )}>
            <span>01</span>
            <div>
              <small>PRODUCT · 2026</small>
              <h2>Project Aurora</h2>
              <p>A thoughtful digital product for ambitious teams.</p>
            </div>
          </article>
          <article className={cn(
            'work-feature',
            'work-feature--amber',
            '[&.work-feature]:relative [&.work-feature]:flex [&.work-feature]:items-end [&.work-feature]:justify-between [&.work-feature]:p-9 [&.work-feature]:text-[white]', '[&.work-feature_>_span]:self-start [&.work-feature_>_span]:text-[12px]', '[&.work-feature_h2]:m-[10px_0] [&.work-feature_h2]:text-[34px] [&.work-feature_h2]:tracking-tight', '[&.work-feature_p]:max-w-[30ch] [&.work-feature_p]:m-0 [&.work-feature_p]:leading-normal', '[&.work-feature--amber]:[background:oklch(0.72_0.16_75)] [&.work-feature--amber]:text-[oklch(0.2_0.03_60)]',
          )}>
            <span>02</span>
            <div>
              <small>PLATFORM · 2025</small>
              <h2>Project Sol</h2>
              <p>A warm, fast interface that makes complexity feel obvious.</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

const NOTES = [
  {
    id: 'welcome',
    title: 'Welcome to my desktop',
    editorTitle: 'Welcome to my desktop 👋',
    date: 'Today',
    preview: 'A little about this place…',
    updated: 'July 17, 2026 at 10:00 AM',
    intro: 'This website is a tiny operating system and a personal home on the internet.',
    sectionTitle: 'What you can do',
    bullets: [
      'Open apps from the Dock.',
      'Drag, focus, minimize, maximize, and close windows.',
      'Use Spotlight to jump anywhere.',
      'Explore placeholder projects in Safari and Finder.',
    ],
    quote: 'The details are not the details. They make the design.',
    closing:
      'Everything here is ready for real biography, work, contact details, and links when you are.',
  },
  {
    id: 'care',
    title: 'Things I care about',
    editorTitle: 'Things I care about',
    date: 'Yesterday',
    preview: 'Craft, clarity, character…',
    updated: 'July 16, 2026 at 6:42 PM',
    intro: 'Good software should feel considered before it feels impressive.',
    sectionTitle: 'Principles',
    bullets: [
      'Clarity before cleverness.',
      'Character without unnecessary noise.',
      'Fast interactions with calm motion.',
      'Details that reward attention.',
    ],
    quote: 'Make every interaction explain itself.',
    closing: 'The goal is simple: useful work with a point of view.',
  },
  {
    id: 'now',
    title: 'Now',
    editorTitle: 'Now',
    date: 'Jul 14',
    preview: 'Currently building…',
    updated: 'July 14, 2026 at 9:18 AM',
    intro: 'A small snapshot of what currently has my attention.',
    sectionTitle: 'Currently building',
    bullets: [
      'A more faithful macOS portfolio.',
      'A reusable interface system.',
      'A collection of carefully documented experiments.',
    ],
    quote: 'Small, finished things compound.',
    closing: 'Next up: replacing the remaining placeholder work with real projects and writing.',
  },
] as const;

function NotesContent({
  selectedId,
  setSelectedId,
  completedTasks,
  onToggleTask,
}: {
  selectedId: NoteId;
  setSelectedId: (noteId: NoteId) => void;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
}) {
  const note = NOTES.find((item) => item.id === selectedId) ?? NOTES[0];
  const completed = new Set<TodayTaskId>(completedTasks);

  return (
    <div className='notes-app [&.notes-app]:h-full [&.notes-app]:flex [&.notes-app]:[background:var(--material-content)]'>
      <aside className='notes-list [&.notes-list]:w-61.25 [&.notes-list]:flex-[0_0_245px] [&.notes-list]:p-2 [&.notes-list]:[border-right:1px_solid_var(--separator)] [&.notes-list]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.notes-list]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.notes-list]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)] max-[900px]:[&.notes-list]:w-41.25 max-[900px]:[&.notes-list]:basis-41.25 max-[600px]:[&.notes-list]:hidden'>
        {NOTES.map((item) => (
          <button
            type='button'
            key={item.id}
            className={cn(
              `note-row${selectedId === item.id ? ' selected' : ''}`,
              '[&.note-row]:w-full [&.note-row]:p-2.5 [&.note-row]:grid [&.note-row]:grid-cols-[1fr_auto] [&.note-row]:[border:0] [&.note-row]:rounded-[7px] [&.note-row]:[background:transparent] [&.note-row]:text-left', '[&.note-row:not(.selected):hover]:[background:oklch(0.82_0.04_84/0.38)]', '[&.note-row.selected]:[background:oklch(0.83_0.12_84/0.84)] [&.note-row.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.45)]', '[&.note-row_strong]:overflow-hidden [&.note-row_strong]:whitespace-nowrap [&.note-row_strong]:text-ellipsis', '[&.note-row_span]:text-[oklch(0.5_0.01_250)] [&.note-row_span]:text-[11px]', '[&.note-row_p]:col-span-full [&.note-row_p]:m-[3px_0_0] [&.note-row_p]:text-[oklch(0.48_0.01_250)] [&.note-row_p]:text-[12px] [&.note-row_p]:whitespace-nowrap [&.note-row_p]:overflow-hidden [&.note-row_p]:text-ellipsis',
            )}
            aria-current={selectedId === item.id ? 'page' : undefined}
            onClick={() => setSelectedId(item.id)}>
            <strong>{item.title}</strong>
            <span>{item.date}</span>
            <p>{item.preview}</p>
          </button>
        ))}
      </aside>
      <article
        className={cn(
          'note-editor',
          '[&.note-editor]:flex-1 [&.note-editor]:p-[35px_46px] [&.note-editor]:overflow-auto [&.note-editor]:text-[oklch(0.22_0.01_250)] [&.note-editor]:[user-select:text] [&.note-editor]:[background:var(--material-content)]', '[&.note-editor_time]:block [&.note-editor_time]:mb-6 [&.note-editor_time]:text-[oklch(0.58_0.01_250)] [&.note-editor_time]:text-center [&.note-editor_time]:text-[11px]', '[&.note-editor_h1]:m-[0_0_20px] [&.note-editor_h1]:text-[25px]', '[&.note-editor_h2]:m-[28px_0_8px] [&.note-editor_h2]:text-[17px]', '[&.note-editor_p]:text-[15px] [&.note-editor_p]:leading-[1.6]', '[&.note-editor_li]:text-[15px] [&.note-editor_li]:leading-[1.6]', '[&.note-editor_ul]:pl-5', '[&.note-editor_blockquote]:m-[28px_0] [&.note-editor_blockquote]:p-[12px_16px] [&.note-editor_blockquote]:rounded-[10px] [&.note-editor_blockquote]:[background:oklch(0.94_0.05_85)] [&.note-editor_blockquote]:text-[16px]',
        )}
        aria-live='polite'>
        <time>{note.updated}</time>
        <h1>{note.editorTitle}</h1>
        <p>{note.intro}</p>
        <h2>{note.sectionTitle}</h2>
        {note.id === 'now' ? (
          <ul className={cn(
            'note-task-list',
            '[&.note-task-list_input]:flex-[0_0_auto] [&.note-task-list_input]:m-0 [&.note-task-list_input]:accent-(--system-blue)', '[&.note-task-list_li.is-complete_span]:text-[oklch(0.52_0.01_250)] [&.note-task-list_li.is-complete_span]:[text-decoration:line-through]', '[&.note-task-list]:[list-style:none]', '[&.note-task-list_li]:m-[7px_0]', '[&.note-task-list_label]:flex [&.note-task-list_label]:items-center [&.note-task-list_label]:gap-2.25',
          )}>
            {TODAY_TASKS.map((task) => (
              <li className={cn(completed.has(task.id) ? 'is-complete' : '')} key={task.id}>
                <label>
                  <input
                    type='checkbox'
                    checked={completed.has(task.id)}
                    onChange={() => onToggleTask(task.id)}
                  />
                  <span>{task.label}</span>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {note.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <blockquote>{note.quote}</blockquote>
        <p>{note.closing}</p>
      </article>
    </div>
  );
}

function PhotosContent() {
  return (
    <div className={cn(
      'photos-app',
      '[&.photos-app]:h-full [&.photos-app]:flex [&.photos-app]:text-[oklch(0.2_0.01_250)] [&.photos-app]:[background:var(--material-content)]', '[&.photos-app_>_aside]:w-43.75 [&.photos-app_>_aside]:flex-[0_0_175px] [&.photos-app_>_aside]:flex [&.photos-app_>_aside]:flex-col [&.photos-app_>_aside]:gap-0.75 [&.photos-app_>_aside]:p-[18px_8px] [&.photos-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.photos-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.photos-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]', '[&.photos-app_aside_>_strong]:m-[0_10px_12px] [&.photos-app_aside_>_strong]:text-[18px]', '[&.photos-app_aside_button]:h-7.5 [&.photos-app_aside_button]:flex [&.photos-app_aside_button]:items-center [&.photos-app_aside_button]:gap-1.75 [&.photos-app_aside_button]:p-[0_10px] [&.photos-app_aside_button]:[border:0] [&.photos-app_aside_button]:rounded-[7px] [&.photos-app_aside_button]:[background:transparent] [&.photos-app_aside_button]:text-left', '[&.photos-app_aside_button.selected]:[background:oklch(0.71_0.13_245/0.55)] [&.photos-app_aside_button.selected]:text-(--ink) [&.photos-app_aside_button.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38),inset_0_0_0_1px_oklch(0.4_0.08_245/0.08)]', '[&.photos-app_main]:flex-1 [&.photos-app_main]:min-w-0 [&.photos-app_main]:p-5.5 [&.photos-app_main]:overflow-auto [&.photos-app_main]:[background:var(--material-content)]', 'max-[900px]:[&.photos-app_>_aside]:w-41.25 max-[900px]:[&.photos-app_>_aside]:basis-41.25', 'max-[600px]:[&.photos-app_>_aside]:hidden',
    )}>
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
        <div className={cn(
          'photos-heading',
          '[&.photos-heading]:flex [&.photos-heading]:items-end [&.photos-heading]:justify-between [&.photos-heading]:mb-5', '[&.photos-heading_h1]:m-0 [&.photos-heading_h1]:text-[28px]', '[&.photos-heading_p]:m-[3px_0] [&.photos-heading_p]:text-[oklch(0.5_0.01_250)] [&.photos-heading_p]:text-[12px]', '[&.photos-heading_button]:p-[7px_10px] [&.photos-heading_button]:[border:0] [&.photos-heading_button]:rounded-[7px] [&.photos-heading_button]:[background:oklch(0.9_0.008_250)] [&.photos-heading_button]:text-[11px]',
        )}>
          <div>
            <h1>Library</h1>
            <p>Placeholder visual work · 8 items</p>
          </div>
          <button type='button'>
            Years&nbsp;&nbsp; Months&nbsp;&nbsp; Days&nbsp;&nbsp; <strong>All Photos</strong>
          </button>
        </div>
        <div className='photo-grid [&.photo-grid]:grid [&.photo-grid]:grid-cols-[repeat(4,minmax(100px,1fr))] [&.photo-grid]:gap-1 max-[600px]:[&.photo-grid]:grid-cols-[repeat(2,1fr)]'>
          {Array.from({ length: 8 }, (_, index) => (
            <div
              className={cn(
                `photo-tile photo-tile--${index + 1}`,
                '[&.photo-tile]:relative [&.photo-tile]:aspect-[1] [&.photo-tile]:overflow-hidden [&.photo-tile]:bg-cover [&.photo-tile]:bg-center', '[&.photo-tile_span]:absolute [&.photo-tile_span]:inset-[auto_8px_7px] [&.photo-tile_span]:text-[white] [&.photo-tile_span]:opacity-[0] [&.photo-tile_span]:[text-shadow:0_1px_4px_black] [&.photo-tile_span]:text-[12px] [&.photo-tile_span]:[transition:opacity_150ms]', '[&.photo-tile:hover_span]:opacity-[1]', '[&.photo-tile.photo-tile--1]:[background:radial-gradient(circle_at_30%_35%,oklch(0.9_0.15_80),transparent_20%),linear-gradient(135deg,oklch(0.57_0.18_252),oklch(0.78_0.13_210))]', '[&.photo-tile.photo-tile--2]:[background:linear-gradient(140deg,oklch(0.18_0.02_250)_0_45%,oklch(0.92_0.01_250)_45%)]', '[&.photo-tile.photo-tile--3]:[background:radial-gradient(ellipse_at_60%_20%,oklch(0.84_0.13_190),transparent_30%),linear-gradient(oklch(0.38_0.13_225),oklch(0.18_0.08_245))]', '[&.photo-tile.photo-tile--4]:[background:repeating-radial-gradient(circle_at_10%_100%,oklch(0.2_0.01_250)_0_10px,oklch(0.86_0.01_250)_12px_20px)]', '[&.photo-tile.photo-tile--5]:[background:linear-gradient(35deg,oklch(0.38_0.15_145),oklch(0.82_0.16_95))]', '[&.photo-tile.photo-tile--6]:[background:linear-gradient(115deg,oklch(0.73_0.22_28),oklch(0.61_0.2_325))]', '[&.photo-tile.photo-tile--7]:[background:radial-gradient(circle_at_70%_30%,white_0_5%,transparent_6%),linear-gradient(145deg,oklch(0.8_0.12_230),oklch(0.92_0.06_80))]', '[&.photo-tile.photo-tile--8]:[background:conic-gradient(from_20deg,oklch(0.42_0.17_260),oklch(0.71_0.2_330),oklch(0.78_0.18_75),oklch(0.42_0.17_260))]',
              )}
              key={index}>
              <span>
                {
                  ['Aurora', 'Index', 'Tide', 'Mono', 'Field', 'Signal', 'Daylight', 'System'][
                    index
                  ]
                }
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function MessagesContent() {
  const [sent, setSent] = useState(false);
  return (
    <div className={cn(
      'messages-app',
      '[&.messages-app]:h-full [&.messages-app]:flex [&.messages-app]:text-[oklch(0.21_0.01_250)] [&.messages-app]:[background:var(--material-content)]', '[&.messages-app_>_aside]:w-61.25 [&.messages-app_>_aside]:flex-[0_0_245px] [&.messages-app_>_aside]:p-[10px_8px] [&.messages-app_>_aside]:[border-right:1px_solid_var(--separator)] [&.messages-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.messages-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.messages-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]', '[&.messages-app_aside_button]:w-full [&.messages-app_aside_button]:flex [&.messages-app_aside_button]:items-center [&.messages-app_aside_button]:gap-2.25 [&.messages-app_aside_button]:p-2.25 [&.messages-app_aside_button]:[border:0] [&.messages-app_aside_button]:rounded-lg [&.messages-app_aside_button]:[background:transparent] [&.messages-app_aside_button]:text-left', '[&.messages-app_aside_button.selected]:text-[white] [&.messages-app_aside_button.selected]:[background:var(--system-blue)]', '[&.messages-app_aside_button_>_span:last-child]:min-w-0 [&.messages-app_aside_button_>_span:last-child]:flex [&.messages-app_aside_button_>_span:last-child]:flex-col', '[&.messages-app_aside_small]:overflow-hidden [&.messages-app_aside_small]:whitespace-nowrap [&.messages-app_aside_small]:text-ellipsis [&.messages-app_aside_small]:opacity-[0.72]', '[&.messages-app_main]:min-w-0 [&.messages-app_main]:flex-1 [&.messages-app_main]:flex [&.messages-app_main]:flex-col [&.messages-app_main]:[background:var(--material-content)]', '[&.messages-app_main_>_header]:h-16.5 [&.messages-app_main_>_header]:flex-[0_0_66px] [&.messages-app_main_>_header]:flex [&.messages-app_main_>_header]:flex-col [&.messages-app_main_>_header]:items-center [&.messages-app_main_>_header]:justify-center [&.messages-app_main_>_header]:[border-bottom:1px_solid_var(--separator)]', '[&.messages-app_main_header_.avatar]:absolute [&.messages-app_main_header_.avatar]:transform-[translateX(-58px)] [&.messages-app_main_header_.avatar]:w-10.5 [&.messages-app_main_header_.avatar]:h-10.5', '[&.messages-app_main_header_small]:text-[oklch(0.5_0.01_250)]', '[&.messages-app_form]:flex [&.messages-app_form]:items-center [&.messages-app_form]:gap-1.75 [&.messages-app_form]:p-[10px_14px]', '[&.messages-app_form_input]:flex-1 [&.messages-app_form_input]:h-8.25 [&.messages-app_form_input]:p-[0_13px] [&.messages-app_form_input]:[border:0] [&.messages-app_form_input]:rounded-[999px] [&.messages-app_form_input]:[outline:none] [&.messages-app_form_input]:[background:oklch(1_0_0/0.72)] [&.messages-app_form_input]:[box-shadow:inset_0_0_0_1px_oklch(0.36_0.01_250/0.2),inset_0_1px_oklch(1_0_0/0.7)]', '[&.messages-app_form_button]:w-7 [&.messages-app_form_button]:h-7 [&.messages-app_form_button]:grid [&.messages-app_form_button]:place-items-center [&.messages-app_form_button]:p-0 [&.messages-app_form_button]:[border:0] [&.messages-app_form_button]:rounded-[50%] [&.messages-app_form_button]:text-[white] [&.messages-app_form_button]:[background:var(--system-blue)]', 'max-[900px]:[&.messages-app_>_aside]:w-41.25 max-[900px]:[&.messages-app_>_aside]:basis-41.25', 'max-[600px]:[&.messages-app_>_aside]:hidden',
    )}>
      <aside>
        <div className='messages-search [&.messages-search]:h-6.75 [&.messages-search]:flex [&.messages-search]:items-center [&.messages-search]:gap-1.5 [&.messages-search]:m-[0_5px_8px] [&.messages-search]:p-[0_9px] [&.messages-search]:rounded-[7px] [&.messages-search]:text-[oklch(0.48_0.01_250)] [&.messages-search]:[background:oklch(0.85_0.01_250/0.7)] [&.messages-search]:text-[12px]'>
          <Search size={14} />
          Search
        </div>
        <button type='button' className='selected'>
          <span className='avatar [&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold'>
            R
          </span>
          <span>
            <strong>Renan</strong>
            <small>Ready when you are.</small>
          </span>
        </button>
        <button type='button'>
          <span className={cn(
            'avatar',
            'avatar--blue',
            '[&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold', '[&.avatar--blue]:[background:linear-gradient(145deg,oklch(0.76_0.14_225),oklch(0.55_0.2_260))]',
          )}>
            W
          </span>
          <span>
            <strong>Work</strong>
            <small>Three project files</small>
          </span>
        </button>
      </aside>
      <main>
        <header>
          <span className='avatar [&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold'>
            R
          </span>
          <strong>Renan</strong>
          <small>renan@example.com</small>
        </header>
        <div className='conversation [&.conversation]:flex-1 [&.conversation]:p-5 [&.conversation]:overflow-auto [&.conversation]:flex [&.conversation]:flex-col [&.conversation]:items-start [&.conversation_time]:self-center [&.conversation_time]:mb-3.5 [&.conversation_time]:text-[oklch(0.55_0.01_250)] [&.conversation_time]:text-[10px]'>
          <time>Today 10:09 AM</time>
          <p className='bubble bubble--incoming [&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]'>
            Hey! Thanks for exploring my desktop.
          </p>
          <p className='bubble bubble--incoming [&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]'>
            Want to build something thoughtful together?
          </p>
          {sent ? (
            <p className={cn(
              'bubble',
              'bubble--sent',
              '[&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]', '[&.bubble--sent]:self-end [&.bubble--sent]:text-[white] [&.bubble--sent]:[background:var(--system-blue-deep)]',
            )}>
              Absolutely — let’s talk.
            </p>
          ) : null}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}>
          <button type='button' aria-label='Add attachment'>
            ＋
          </button>
          <input aria-label='Message' placeholder='iMessage' />
          <button aria-label='Send message' type='submit'>
            <Send size={16} />
          </button>
        </form>
      </main>
    </div>
  );
}

function TerminalContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<string[]>([
    'Last login: Fri Jul 17 10:09:42 on ttys001',
    'Welcome to Renan’s portfolio. Type “help” to explore.',
  ]);
  const [command, setCommand] = useState('');
  const output: Record<string, string[]> = {
    help: ['Available commands: about, projects, contact, skills, date, clear'],
    about: ['Renan — designer and developer focused on crafted interfaces.'],
    projects: ['01  Project Aurora', '02  Project Sol', '03  This macOS portfolio'],
    contact: [
      'Email: renan@example.com',
      'GitHub: github.com/renan',
      'LinkedIn: linkedin.com/in/renan',
    ],
    skills: ['React · TypeScript · Design systems · Product engineering'],
    date: [new Date().toString()],
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;
    if (normalized === 'clear') setLines([]);
    else
      setLines((current) => [
        ...current,
        `renan@portfolio ~ % ${command}`,
        ...(output[normalized] ?? [`zsh: command not found: ${command}`]),
      ]);
    setCommand('');
    globalThis.requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div
      className={cn(
        "terminal-app",
        "[&.terminal-app]:h-full [&.terminal-app]:p-[13px_15px] [&.terminal-app]:overflow-auto [&.terminal-app]:text-[oklch(0.89_0.02_145)] [&.terminal-app]:[background:oklch(0.09_0.01_250/0.95)] [&.terminal-app]:[font:13px/1.55_'SFMono-Regular',Consolas,'Liberation_Mono',monospace] [&.terminal-app]:[user-select:text]", "[&.terminal-app_form]:flex [&.terminal-app_form]:gap-1.75", "[&.terminal-app_b]:text-[oklch(0.75_0.16_150)]", "[&.terminal-app_input]:min-w-0 [&.terminal-app_input]:flex-1 [&.terminal-app_input]:[border:0] [&.terminal-app_input]:[outline:0] [&.terminal-app_input]:text-[oklch(0.93_0.01_250)] [&.terminal-app_input]:[background:transparent] [&.terminal-app_input]:caret-[white]",
      )}
      role='region'
      aria-label='Terminal output'
      onPointerDown={() => inputRef.current?.focus()}
      onClick={() => inputRef.current?.focus()}>
      {lines.map((line, index) => (
        <div key={`${line}-${index}`}>{line}</div>
      ))}
      <form onSubmit={submit}>
        <span>
          <b>renan@portfolio</b> ~ %
        </span>
        <input
          ref={inputRef}
          autoFocus
          aria-label='Terminal command'
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          spellCheck={false}
        />
      </form>
    </div>
  );
}

function SettingsContent({
  dark,
  setDark,
  accentColor,
  setAccentColor,
  selectedSection,
  setSelectedSection,
  lowPower,
  setLowPower,
  systemPreferences,
  updateSystemPreferences,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  selectedSection: SettingsSectionId;
  setSelectedSection: (value: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
}) {
  const [accentOpen, setAccentOpen] = useState(false);
  const [toggleValues, setToggleValues] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      Object.values(SETTINGS_PANEL_COPY).flatMap((panel) =>
        panel.controls.map((control) => [control.id, control.defaultChecked]),
      ),
    ),
  );
  const selected =
    SETTINGS_SECTIONS.find((section) => section.id === selectedSection) ?? SETTINGS_SECTIONS[0];
  const SelectedIcon = selected.icon;

  const settingChecked = (id: string) => {
    if (id === 'battery-low-power') return lowPower;
    if (id === 'desktop-hide') return systemPreferences.dockAutoHide;
    if (id === 'desktop-recents') return systemPreferences.showRecentApps;
    if (id === 'focus-dnd') return systemPreferences.doNotDisturb;
    return toggleValues[id] ?? false;
  };

  const toggleSetting = (id: string) => {
    if (id === 'battery-low-power') return setLowPower(!lowPower);
    if (id === 'desktop-hide')
      return updateSystemPreferences({ dockAutoHide: !systemPreferences.dockAutoHide });
    if (id === 'desktop-recents')
      return updateSystemPreferences({ showRecentApps: !systemPreferences.showRecentApps });
    if (id === 'focus-dnd')
      return updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb });
    setToggleValues((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className={cn(
      'settings-app',
      '[&.settings-app]:h-full [&.settings-app]:flex [&.settings-app]:text-[oklch(0.22_0.01_250)] [&.settings-app]:[background:var(--material-content)]', '[&.settings-app_>_aside]:w-56.25 [&.settings-app_>_aside]:flex-[0_0_225px] [&.settings-app_>_aside]:p-[10px_8px] [&.settings-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.settings-app_>_aside]:overflow-auto [&.settings-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.settings-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]', '[&.settings-app_aside_nav]:flex [&.settings-app_aside_nav]:flex-col [&.settings-app_aside_nav]:gap-0.5', '[&.settings-app_aside_button]:w-full [&.settings-app_aside_button]:h-8 [&.settings-app_aside_button]:flex [&.settings-app_aside_button]:items-center [&.settings-app_aside_button]:gap-2 [&.settings-app_aside_button]:p-[0_8px] [&.settings-app_aside_button]:[border:0] [&.settings-app_aside_button]:rounded-[7px] [&.settings-app_aside_button]:[background:transparent] [&.settings-app_aside_button]:text-left', '[&.settings-app_aside_button.selected]:text-[white] [&.settings-app_aside_button.selected]:[background:var(--system-blue-deep)]', '[&.settings-app_aside_button.selected_.settings-sidebar-icon]:[background:oklch(1_0_0/0.22)] [&.settings-app_aside_button.selected_.settings-sidebar-icon]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.18)]', '[&.settings-app_main]:flex-1 [&.settings-app_main]:p-[24px_28px] [&.settings-app_main]:overflow-auto [&.settings-app_main]:[background:var(--material-content)]', '[&.settings-app_h1]:m-0 [&.settings-app_h1]:text-[24px]', '[&.settings-app_section]:mb-4.5 [&.settings-app_section]:p-4 [&.settings-app_section]:rounded-xl [&.settings-app_section]:[background:var(--material-raised)] [&.settings-app_section]:[box-shadow:0_1px_3px_oklch(0.16_0.02_250/0.12),inset_0_0_0_1px_oklch(0.3_0.01_250/0.06)]', '[&.settings-app_section_h2]:m-[0_0_14px] [&.settings-app_section_h2]:text-[15px]', 'max-[900px]:[&.settings-app_>_aside]:w-41.25 max-[900px]:[&.settings-app_>_aside]:basis-41.25', 'max-[600px]:[&.settings-app_>_aside]:hidden',
    )}>
      <aside aria-label='System Settings sections'>
        <div className={cn(
          'settings-user',
          '[&.settings-user]:flex [&.settings-user]:gap-2.5 [&.settings-user]:items-center [&.settings-user]:m-[5px_8px_15px]', '[&.settings-user_>_span:last-child]:flex [&.settings-user_>_span:last-child]:flex-col', '[&.settings-user_small]:text-[oklch(0.5_0.01_250)]',
        )}>
          <span className='avatar [&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold'>
            R
          </span>
          <span>
            <strong>Renan</strong>
            <small>Portfolio profile</small>
          </span>
        </div>
        <nav>
          {SETTINGS_SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            const isSelected = section.id === selectedSection;
            return (
              <button
                type='button'
                className={cn(isSelected ? 'selected' : '')}
                aria-current={isSelected ? 'page' : undefined}
                key={section.id}
                onClick={() => {
                  setSelectedSection(section.id);
                  setAccentOpen(false);
                }}>
                <span
                  className='settings-sidebar-icon [&.settings-sidebar-icon]:w-5 [&.settings-sidebar-icon]:h-5 [&.settings-sidebar-icon]:flex-[0_0_20px] [&.settings-sidebar-icon]:grid [&.settings-sidebar-icon]:place-items-center [&.settings-sidebar-icon]:rounded-[5px] [&.settings-sidebar-icon]:text-[white] [&.settings-sidebar-icon]:[background:var(--settings-icon-tint)] [&.settings-sidebar-icon]:[box-shadow:inset_0_1px_oklch(1_0_0/0.28)]'
                  style={{ '--settings-icon-tint': section.tint } as CSSProperties}>
                  <SectionIcon size={14} strokeWidth={2} />
                </span>
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main>
        <header className='settings-heading [&.settings-heading]:flex [&.settings-heading]:items-center [&.settings-heading]:gap-3 [&.settings-heading]:mb-4.5 [&.settings-heading_p]:max-w-[52ch] [&.settings-heading_p]:m-[2px_0_0] [&.settings-heading_p]:text-(--label-secondary) [&.settings-heading_p]:text-[12px] [&.settings-heading_p]:leading-[1.35]'>
          <span
            className='settings-heading-icon [&.settings-heading-icon]:w-11 [&.settings-heading-icon]:h-11 [&.settings-heading-icon]:flex-[0_0_44px] [&.settings-heading-icon]:grid [&.settings-heading-icon]:place-items-center [&.settings-heading-icon]:rounded-[11px] [&.settings-heading-icon]:text-[white] [&.settings-heading-icon]:[background:var(--settings-icon-tint)] [&.settings-heading-icon]:[box-shadow:inset_0_1px_oklch(1_0_0/0.32),0_3px_7px_oklch(0.15_0.02_250/0.15)]'
            style={{ '--settings-icon-tint': selected.tint } as CSSProperties}>
            <SelectedIcon size={24} strokeWidth={1.8} />
          </span>
          <div>
            <h1>{selected.label}</h1>
            {selectedSection !== 'appearance' ? (
              <p>{SETTINGS_PANEL_COPY[selectedSection].description}</p>
            ) : (
              <p>Choose how windows and controls look across the portfolio.</p>
            )}
          </div>
        </header>

        {selectedSection === 'appearance' ? (
          <>
            <section>
              <h2>Appearance</h2>
              <div className={cn(
                'appearance-choices',
                '[&.appearance-choices]:flex [&.appearance-choices]:gap-3.75', '[&.appearance-choices_button]:flex [&.appearance-choices_button]:flex-col [&.appearance-choices_button]:items-center [&.appearance-choices_button]:gap-1.75 [&.appearance-choices_button]:p-1.25 [&.appearance-choices_button]:[border:2px_solid_transparent] [&.appearance-choices_button]:rounded-[10px] [&.appearance-choices_button]:[background:transparent] [&.appearance-choices_button]:text-[12px]', '[&.appearance-choices_button.selected]:border-(--system-blue)',
              )}>
                <button
                  type='button'
                  onClick={() => setDark(false)}
                  className={cn(!dark ? 'selected' : '')}
                  aria-pressed={!dark}>
                  <span className='appearance-preview appearance-preview--light [&.appearance-preview]:w-27.5 [&.appearance-preview]:h-17.5 [&.appearance-preview]:rounded-[7px] [&.appearance-preview]:[background:linear-gradient(145deg,oklch(0.97_0_0)_0_30%,oklch(0.8_0.02_250)_30%_33%,oklch(0.91_0.01_250)_33%)] [&.appearance-preview]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.2)]' />
                  Light
                </button>
                <button
                  type='button'
                  onClick={() => setDark(true)}
                  className={cn(dark ? 'selected' : '')}
                  aria-pressed={dark}>
                  <span className={cn(
                    'appearance-preview',
                    'appearance-preview--dark',
                    '[&.appearance-preview]:w-27.5 [&.appearance-preview]:h-17.5 [&.appearance-preview]:rounded-[7px] [&.appearance-preview]:[background:linear-gradient(145deg,oklch(0.97_0_0)_0_30%,oklch(0.8_0.02_250)_30%_33%,oklch(0.91_0.01_250)_33%)] [&.appearance-preview]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.2)]', '[&.appearance-preview--dark]:[background:linear-gradient(145deg,oklch(0.18_0.01_250)_0_30%,oklch(0.42_0.02_250)_30%_33%,oklch(0.28_0.01_250)_33%)]',
                  )} />
                  Dark
                </button>
              </div>
            </section>
            <section
              className={cn(
                'settings-list',
                '[&.settings-list]:p-0!', '[&.settings-list_label]:min-h-15.5 [&.settings-list_label]:flex [&.settings-list_label]:items-center [&.settings-list_label]:justify-between [&.settings-list_label]:p-[10px_15px] [&.settings-list_label]:[border-bottom:1px_solid_var(--separator)]', '[&.settings-list_.settings-row]:min-h-15.5 [&.settings-list_.settings-row]:flex [&.settings-list_.settings-row]:items-center [&.settings-list_.settings-row]:justify-between [&.settings-list_.settings-row]:p-[10px_15px] [&.settings-list_.settings-row]:[border-bottom:1px_solid_var(--separator)]', '[&.settings-list_>_:last-child]:[border-bottom:0]', '[&.settings-list_label_>_span]:min-w-0 [&.settings-list_label_>_span]:flex [&.settings-list_label_>_span]:flex-col', '[&.settings-list_.settings-row_>_span:first-child]:min-w-0 [&.settings-list_.settings-row_>_span:first-child]:flex [&.settings-list_.settings-row_>_span:first-child]:flex-col', '[&.settings-list_small]:text-(--label-secondary) [&.settings-list_small]:leading-[1.35]', '[&.settings-list_input]:w-8.5 [&.settings-list_input]:accent-(--system-blue)', '[&.settings-list_.accent-control:last-child]:[border-bottom:0]',
              )}
              key='appearance-settings'>
              <div className={cn(
                'accent-control',
                '[&.accent-control]:[border-bottom:1px_solid_var(--separator)]', '[&.accent-control_.settings-row]:[border-bottom:0]',
              )}>
                <button
                  type='button'
                  className='settings-row settings-row--button [&.settings-row--button]:w-full [&.settings-row--button]:[border:0] [&.settings-row--button]:text-inherit [&.settings-row--button]:[background:transparent] [&.settings-row--button]:text-left'
                  aria-expanded={accentOpen}
                  aria-controls='accent-color-picker'
                  onClick={() => setAccentOpen((open) => !open)}>
                  <span>
                    <strong>Accent color</strong>
                    <small>
                      {ACCENT_COLORS[accentColor].label} is used for selections and controls.
                    </small>
                  </span>
                  <span className='accent-value [&.accent-value]:flex! [&.accent-value]:flex-row! [&.accent-value]:items-center [&.accent-value]:gap-2'>
                    <i
                      className='accent-dot [&.accent-dot]:w-6 [&.accent-dot]:h-6 [&.accent-dot]:rounded-[50%] [&.accent-dot]:[background:var(--system-blue)] [&.accent-dot]:[box-shadow:inset_0_0_0_2px_oklch(1_0_0/0.5)]'
                      style={{ background: ACCENT_COLORS[accentColor].color }}
                    />
                    <ChevronRight size={15} aria-hidden='true' />
                  </span>
                </button>
                {accentOpen ? (
                  <dialog
                    className={cn(
                      "accent-picker",
                      "[&.accent-picker]:p-[12px_15px_15px] [&.accent-picker]:[border-bottom:1px_solid_var(--separator)] [&.accent-picker]:animate-[accent-picker-in_150ms_var(--ease-mac)_both] [&.accent-picker]:static [&.accent-picker]:w-auto [&.accent-picker]:max-w-none [&.accent-picker]:m-0 [&.accent-picker]:[border:0] [&.accent-picker]:text-inherit [&.accent-picker]:[background:transparent]", "[&.accent-picker_>_strong]:block [&.accent-picker_>_strong]:mb-2.5 [&.accent-picker_>_strong]:text-[12px]", "[&.accent-picker_>_div]:flex [&.accent-picker_>_div]:flex-wrap [&.accent-picker_>_div]:gap-3", "[&.accent-picker_button]:min-w-11 [&.accent-picker_button]:flex [&.accent-picker_button]:flex-col [&.accent-picker_button]:items-center [&.accent-picker_button]:gap-1.25 [&.accent-picker_button]:p-0 [&.accent-picker_button]:[border:0] [&.accent-picker_button]:[background:transparent]", "[&.accent-picker_button_>_span]:w-7 [&.accent-picker_button_>_span]:h-7 [&.accent-picker_button_>_span]:grid [&.accent-picker_button_>_span]:place-items-center [&.accent-picker_button_>_span]:rounded-[50%] [&.accent-picker_button_>_span]:text-[white] [&.accent-picker_button_>_span]:[box-shadow:inset_0_0_0_2px_oklch(1_0_0/0.52),0_1px_3px_oklch(0.15_0.02_250/0.2)]", "[&.accent-picker_button[aria-pressed='true']_>_span]:[outline:2px_solid_var(--system-blue)] [&.accent-picker_button[aria-pressed='true']_>_span]:outline-offset-2", "[&.accent-picker_button_small]:text-[10px]",
                    )}
                    id='accent-color-picker'
                    aria-label='Accent color'
                    open>
                    <strong>Accent color</strong>
                    <div>
                      {(
                        Object.entries(ACCENT_COLORS) as [
                          AccentColorId,
                          (typeof ACCENT_COLORS)[AccentColorId],
                        ][]
                      ).map(([id, accent]) => (
                        <button
                          type='button'
                          key={id}
                          aria-label={`${accent.label} accent color`}
                          aria-pressed={accentColor === id}
                          onClick={() => {
                            setAccentColor(id);
                            setAccentOpen(false);
                          }}>
                          <span style={{ background: accent.color }}>
                            {accentColor === id ? <Check size={14} /> : null}
                          </span>
                          <small>{accent.label}</small>
                        </button>
                      ))}
                    </div>
                  </dialog>
                ) : null}
              </div>
              <label>
                <span>
                  <strong>Allow wallpaper tinting</strong>
                  <small>Windows adapt to the desktop behind them.</small>
                </span>
                <input type='checkbox' defaultChecked />
              </label>
            </section>
          </>
        ) : (
          <>
            {selectedSection === 'battery' ? (
              <section
                className={cn(
                  `battery-settings-summary${lowPower ? ' is-low-power' : ''}`,
                  '[&.battery-settings-summary]:flex [&.battery-settings-summary]:items-center [&.battery-settings-summary]:gap-3.25 [&.battery-settings-summary]:min-h-18', '[&.battery-settings-summary_>_svg]:text-[#48a65d]', '[&.battery-settings-summary.is-low-power_>_svg]:text-(--low-power-yellow) [&.battery-settings-summary.is-low-power_>_svg]:filter-[drop-shadow(0_0_5px_oklch(0.82_0.17_85/0.3))]', '[&.battery-settings-summary_>_span]:flex [&.battery-settings-summary_>_span]:flex-col', '[&.battery-settings-summary_>_span_>_strong]:text-[22px] [&.battery-settings-summary_>_span_>_strong]:[font-variant-numeric:tabular-nums]', '[&.battery-settings-summary_small]:text-(--label-secondary)',
                )}
                aria-label='Battery status'>
                <BatteryCharging size={34} />
                <span>
                  <strong>84%</strong>
                  <small>{lowPower ? 'Low Power Mode is active' : 'Power adapter connected'}</small>
                </span>
              </section>
            ) : null}
            <section
              className={cn(
                'settings-list',
                'settings-list--section',
                '[&.settings-list]:p-0!', '[&.settings-list_label]:min-h-15.5 [&.settings-list_label]:flex [&.settings-list_label]:items-center [&.settings-list_label]:justify-between [&.settings-list_label]:p-[10px_15px] [&.settings-list_label]:[border-bottom:1px_solid_var(--separator)]', '[&.settings-list_.settings-row]:min-h-15.5 [&.settings-list_.settings-row]:flex [&.settings-list_.settings-row]:items-center [&.settings-list_.settings-row]:justify-between [&.settings-list_.settings-row]:p-[10px_15px] [&.settings-list_.settings-row]:[border-bottom:1px_solid_var(--separator)]', '[&.settings-list_>_:last-child]:[border-bottom:0]', '[&.settings-list_label_>_span]:min-w-0 [&.settings-list_label_>_span]:flex [&.settings-list_label_>_span]:flex-col', '[&.settings-list_.settings-row_>_span:first-child]:min-w-0 [&.settings-list_.settings-row_>_span:first-child]:flex [&.settings-list_.settings-row_>_span:first-child]:flex-col', '[&.settings-list_small]:text-(--label-secondary) [&.settings-list_small]:leading-[1.35]', '[&.settings-list_input]:w-8.5 [&.settings-list_input]:accent-(--system-blue)', '[&.settings-list_.accent-control:last-child]:[border-bottom:0]', '[&.settings-list--section]:overflow-hidden',
              )}
              key={`${selectedSection}-settings`}>
              {SETTINGS_PANEL_COPY[selectedSection].controls.map((control) => {
                return (
                  <label key={control.id}>
                    <span>
                      <strong>{control.title}</strong>
                      <small>{control.detail}</small>
                    </span>
                    <input
                      type='checkbox'
                      checked={settingChecked(control.id)}
                      onChange={() => toggleSetting(control.id)}
                    />
                  </label>
                );
              })}
              {selectedSection === 'sound' || selectedSection === 'desktop' ? (
                <label className="settings-slider-row [&.settings-slider-row]:gap-5 [&.settings-slider-row_input[type='range']]:w-[min(180px,45%)]">
                  <span>
                    <strong>{selectedSection === 'sound' ? 'Output volume' : 'Dock size'}</strong>
                    <small>
                      {selectedSection === 'sound'
                        ? 'Adjust the level used for interface audio.'
                        : 'Resize application icons in the Dock.'}
                    </small>
                  </span>
                  <input
                    aria-label={selectedSection === 'sound' ? 'Output volume' : 'Dock size'}
                    type='range'
                    min={selectedSection === 'sound' ? 0 : 36}
                    max={selectedSection === 'sound' ? 100 : 64}
                    value={
                      selectedSection === 'sound'
                        ? systemPreferences.volume
                        : systemPreferences.dockSize
                    }
                    onChange={(event) =>
                      updateSystemPreferences(
                        selectedSection === 'sound'
                          ? { volume: Number(event.target.value) }
                          : { dockSize: Number(event.target.value) },
                      )
                    }
                  />
                </label>
              ) : null}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function AboutContent() {
  return (
    <div className={cn(
      'about-app',
      '[&.about-app]:h-full [&.about-app]:p-7 [&.about-app]:flex [&.about-app]:flex-col [&.about-app]:items-center [&.about-app]:text-[oklch(0.2_0.01_250)] [&.about-app]:[background:var(--material-content)] [&.about-app]:text-center', '[&.about-app_h1]:m-[13px_0_0] [&.about-app_h1]:text-[28px] [&.about-app_h1]:tracking-[-0.03em]', '[&.about-app_h2]:m-[1px_0_10px] [&.about-app_h2]:text-[14px] [&.about-app_h2]:font-medium', '[&.about-app_dl]:w-70 [&.about-app_dl]:m-[0_0_12px]', '[&.about-app_dl_div]:grid [&.about-app_dl_div]:grid-cols-[1fr_1.4fr] [&.about-app_dl_div]:gap-2.5 [&.about-app_dl_div]:text-[12px] [&.about-app_dl_div]:text-left [&.about-app_dl_div]:leading-[1.6]', '[&.about-app_dt]:text-[oklch(0.48_0.01_250)] [&.about-app_dt]:text-right', '[&.about-app_dd]:m-0', '[&.about-app_>_button]:p-[6px_16px] [&.about-app_>_button]:[border:0] [&.about-app_>_button]:rounded-[7px] [&.about-app_>_button]:text-[white] [&.about-app_>_button]:[background:var(--system-blue-deep)] [&.about-app_>_button]:text-[12px]', '[&.about-app_footer]:flex [&.about-app_footer]:gap-3.25 [&.about-app_footer]:mt-auto', '[&.about-app_footer_a]:text-[oklch(0.44_0.01_250)]',
    )}>
      <div className='mac-mark [&.mac-mark]:w-27 [&.mac-mark]:h-27 [&.mac-mark]:grid [&.mac-mark]:place-items-center [&.mac-mark]:rounded-[25px] [&.mac-mark]:text-[white] [&.mac-mark]:[background:radial-gradient(circle_at_70%_20%,oklch(0.9_0.12_210),transparent_25%),linear-gradient(145deg,oklch(0.45_0.16_250),oklch(0.64_0.2_310),oklch(0.8_0.17_75))] [&.mac-mark]:[box-shadow:0_7px_14px_oklch(0.2_0.07_270/0.25),inset_0_0_0_1px_oklch(1_0_0/0.4)] [&.mac-mark_span]:text-[38px] [&.mac-mark_span]:font-bold [&.mac-mark_span]:tracking-tighter [&.mac-mark_span]:[text-shadow:0_2px_8px_oklch(0.2_0.05_250/0.3)]'>
        <span>27</span>
      </div>
      <h1>macOS</h1>
      <h2>Tahoe 27.0</h2>
      <p className='about-device [&.about-device]:m-[0_0_12px] [&.about-device]:text-[14px] [&.about-device]:font-[650]'>
        Renan's Mac
      </p>
      <dl>
        <div>
          <dt>Chip</dt>
          <dd>Apple M4 Pro</dd>
        </div>
        <div>
          <dt>Memory</dt>
          <dd>24 GB</dd>
        </div>
        <div>
          <dt>Serial number</dt>
          <dd>PORTFOLIO27</dd>
        </div>
        <div>
          <dt>macOS</dt>
          <dd>Version 27.0</dd>
        </div>
      </dl>
      <button type='button'>More Info…</button>
      <footer>
        <a href='https://github.com' aria-label='GitHub'>
          <Code2 size={18} />
        </a>
        <a href='https://linkedin.com' aria-label='LinkedIn'>
          <BriefcaseBusiness size={18} />
        </a>
        <a href='mailto:renan@example.com' aria-label='Email'>
          <AtSign size={18} />
        </a>
      </footer>
    </div>
  );
}

function WindowContent({
  app,
  openApp,
  dark,
  setDark,
  accentColor,
  setAccentColor,
  settingsSection,
  setSettingsSection,
  lowPower,
  setLowPower,
  systemPreferences,
  updateSystemPreferences,
  finderPreferences,
  updateFinderPreferences,
  finderSection,
  setFinderSection,
  selectedNoteId,
  setSelectedNoteId,
  completedTasks,
  onToggleTask,
}: {
  app: AppId;
  openApp: (app: AppId) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  settingsSection: SettingsSectionId;
  setSettingsSection: (value: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
  finderPreferences: FinderPreferences;
  updateFinderPreferences: (patch: Partial<FinderPreferences>) => void;
  finderSection: string;
  setFinderSection: (section: string) => void;
  selectedNoteId: NoteId;
  setSelectedNoteId: (noteId: NoteId) => void;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
}) {
  switch (app) {
    case 'finder':
      return (
        <FinderContent
          openApp={openApp}
          preferences={finderPreferences}
          updatePreferences={updateFinderPreferences}
          section={finderSection}
          setSection={setFinderSection}
        />
      );
    case 'safari':
      return <SafariContent />;
    case 'messages':
      return <MessagesContent />;
    case 'photos':
      return <PhotosContent />;
    case 'notes':
      return (
        <NotesContent
          selectedId={selectedNoteId}
          setSelectedId={setSelectedNoteId}
          completedTasks={completedTasks}
          onToggleTask={onToggleTask}
        />
      );
    case 'terminal':
      return <TerminalContent />;
    case 'settings':
      return (
        <SettingsContent
          dark={dark}
          setDark={setDark}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          selectedSection={settingsSection}
          setSelectedSection={setSettingsSection}
          lowPower={lowPower}
          setLowPower={setLowPower}
          systemPreferences={systemPreferences}
          updateSystemPreferences={updateSystemPreferences}
        />
      );
    case 'about':
      return <AboutContent />;
  }
}

function desktopRevealTransform(window: WindowState, edge: DesktopRevealEdge): string {
  switch (edge) {
    case 'left':
      return `translate3d(calc(-100% - ${window.x}px + 52px), 0, 0)`;
    case 'right':
      return `translate3d(calc(100vw - ${window.x + 52}px), 0, 0)`;
    case 'bottom':
      return `translate3d(0, calc(100vh - ${window.y + 52}px), 0)`;
    case 'top':
      return `translate3d(0, calc(-100% - ${window.y}px + 44px), 0)`;
  }
}

function AppWindow({
  window,
  active,
  dispatch,
  openApp,
  dark,
  setDark,
  accentColor,
  setAccentColor,
  settingsSection,
  setSettingsSection,
  lowPower,
  setLowPower,
  systemPreferences,
  updateSystemPreferences,
  finderPreferences,
  updateFinderPreferences,
  finderSection,
  setFinderSection,
  selectedNoteId,
  setSelectedNoteId,
  completedTasks,
  onToggleTask,
  desktopRevealed,
  revealEdge,
  revealIndex,
}: {
  window: WindowState;
  active: boolean;
  dispatch: (action: WindowAction) => void;
  openApp: (app: AppId) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  settingsSection: SettingsSectionId;
  setSettingsSection: (value: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
  finderPreferences: FinderPreferences;
  updateFinderPreferences: (patch: Partial<FinderPreferences>) => void;
  finderSection: string;
  setFinderSection: (section: string) => void;
  selectedNoteId: NoteId;
  setSelectedNoteId: (noteId: NoteId) => void;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
  desktopRevealed: boolean;
  revealEdge: DesktopRevealEdge;
  revealIndex: number;
}) {
  const windowElement = useRef<HTMLElement>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    frame: number | null;
  } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.maximized || (event.target as HTMLElement).closest('button')) return;
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      x: window.x,
      y: window.y,
      lastX: event.clientX,
      lastY: event.clientY,
      frame: null,
    };
    windowElement.current?.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;
    if (drag.current.frame !== null) return;
    drag.current.frame = globalThis.requestAnimationFrame(() => {
      const current = drag.current;
      const element = windowElement.current;
      if (!current || !element) return;
      element.style.transform = `translate3d(${current.lastX - current.startX}px, ${current.lastY - current.startY}px, 0)`;
      current.frame = null;
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    const element = windowElement.current;
    if (!current || !element) return;
    if (current.frame !== null) globalThis.cancelAnimationFrame(current.frame);
    const nextX = Math.max(
      8,
      Math.min(current.x + event.clientX - current.startX, globalThis.innerWidth - 180),
    );
    const nextY = Math.max(
      28,
      Math.min(current.y + event.clientY - current.startY, globalThis.innerHeight - 100),
    );
    element.style.left = `${nextX}px`;
    element.style.top = `${nextY}px`;
    element.style.transform = 'translate3d(0, 0, 0)';
    drag.current = null;
    dispatch({ type: 'move', id: window.id, x: nextX, y: nextY });
    globalThis.requestAnimationFrame(() => element.classList.remove('is-dragging'));
  };

  const toggleMaximize = () => {
    const element = windowElement.current;
    if (!element) return dispatch({ type: 'toggleMaximize', id: window.id });
    const first = element.getBoundingClientRect();
    dispatch({ type: 'toggleMaximize', id: window.id });
    globalThis.requestAnimationFrame(() => {
      const last = element.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const scaleX = first.width / last.width;
      const scaleY = first.height / last.height;
      element.animate(
        [
          { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})` },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        { duration: 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    });
  };

  const windowStyle: CSSProperties & {
    '--desktop-reveal-transform': string;
    '--desktop-reveal-index': number;
  } = {
    ...(window.maximized
      ? { zIndex: window.z }
      : {
          left: window.x,
          top: window.y,
          width: window.width,
          height: window.height,
          zIndex: window.z,
        }),
    '--desktop-reveal-transform': desktopRevealTransform(window, revealEdge),
    '--desktop-reveal-index': revealIndex,
  };

  return (
    <section
      ref={windowElement}
      className={cn(
        `app-window app-window--${window.app}${active ? ' is-active' : ' is-inactive'}${window.minimized ? ' is-minimized' : ''}${window.maximized ? ' is-maximized' : ''}`,
        "[&.app-window]:absolute [&.app-window]:z-100 [&.app-window]:flex [&.app-window]:flex-col [&.app-window]:min-w-107.5 [&.app-window]:min-h-75 [&.app-window]:overflow-hidden [&.app-window]:rounded-[18px] [&.app-window]:[background:var(--material-content)] [&.app-window]:[box-shadow:var(--shadow),inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight)] [&.app-window]:origin-[bottom_center] [&.app-window]:animate-[window-open_220ms_var(--ease-mac)] [&.app-window]:[transition:opacity_160ms_ease-in,transform_220ms_var(--ease-mac),filter_180ms_ease-out,box-shadow_180ms_ease-out] [&.app-window]:[backdrop-filter:none] [&.app-window]:[-webkit-backdrop-filter:none]", "[&.app-window.is-minimized]:opacity-[0] [&.app-window.is-minimized]:transform-[translateY(calc(100vh-80px))_scale(0.08)] [&.app-window.is-minimized]:pointer-events-none", "[&.app-window.is-maximized]:inset-0 [&.app-window.is-maximized]:w-auto [&.app-window.is-maximized]:h-auto [&.app-window.is-maximized]:rounded-none", "[&.app-window.is-dragging]:[transition:none] [&.app-window.is-dragging]:will-change-transform", "[&.app-window.is-dragging_.window-titlebar]:cursor-grabbing", "[&.app-window::before]:[content:''] [&.app-window::before]:absolute [&.app-window::before]:z-30 [&.app-window::before]:inset-[0_18px_auto] [&.app-window::before]:h-px [&.app-window::before]:[background:linear-gradient(90deg,transparent,var(--glass-highlight)_18%,var(--glass-highlight)_82%,transparent)] [&.app-window::before]:pointer-events-none", "[&.app-window.is-inactive]:filter-[saturate(0.78)] [&.app-window.is-inactive]:[box-shadow:var(--shadow-inactive),inset_0_0_0_1px_oklch(1_0_0/0.36)]", "[&.app-window.is-inactive_.window-titlebar]:text-[oklch(0.42_0.01_250)] [&.app-window.is-inactive_.window-titlebar]:[background:oklch(0.91_0.006_250/0.93)] [&.app-window.is-inactive_.window-titlebar]:[backdrop-filter:blur(18px)_saturate(0.8)]", "[&.app-window.is-inactive_.traffic]:[background:oklch(0.71_0.008_250)] [&.app-window.is-inactive_.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.01_250/0.18)]", "[&.app-window.is-inactive_.traffic::before]:opacity-[0]", "[&.app-window.is-inactive_.traffic::after]:opacity-[0]", "contrast-more:[&.app-window]:[outline:1px_solid_var(--separator)]", "max-[900px]:[&.app-window:not(.is-maximized)]:inset-[34px_8px_82px]! max-[900px]:[&.app-window:not(.is-maximized)]:w-auto! max-[900px]:[&.app-window:not(.is-maximized)]:h-auto! max-[900px]:[&.app-window:not(.is-maximized)]:min-w-0 max-[900px]:[&.app-window:not(.is-maximized)]:min-h-0", "max-[900px]:[&.app-window.is-maximized]:inset-0! max-[900px]:[&.app-window.is-maximized]:w-auto! max-[900px]:[&.app-window.is-maximized]:h-auto! max-[900px]:[&.app-window.is-maximized]:min-w-0 max-[900px]:[&.app-window.is-maximized]:min-h-0",
      )}
      style={windowStyle}
      data-desktop-edge={revealEdge}
      aria-hidden={desktopRevealed || undefined}
      onPointerDown={() => dispatch({ type: 'focus', id: window.id })}
      aria-label={`${window.title} window`}>
      <div
        className='window-titlebar [&.window-titlebar]:relative [&.window-titlebar]:h-12.5 [&.window-titlebar]:flex-[0_0_46px] [&.window-titlebar]:grid [&.window-titlebar]:grid-cols-[1fr_auto_1fr] [&.window-titlebar]:items-center [&.window-titlebar]:p-[0_12px] [&.window-titlebar]:[background:linear-gradient(180deg,oklch(1_0_0/0.18),transparent_42%),var(--material-titlebar)] [&.window-titlebar]:[backdrop-filter:blur(34px)_saturate(1.4)] [&.window-titlebar]:[border-bottom:1px_solid_var(--separator)] [&.window-titlebar]:cursor-default [&.window-titlebar]:touch-none [&.window-titlebar_>_strong]:text-[13px] [&.window-titlebar_>_strong]:font-[590] [&.window-titlebar]:basis-12.5 [&.window-titlebar]:px-3.5 [&.window-titlebar]:border-b-[oklch(0.34_0.012_250/0.16)] [&.window-titlebar]:[-webkit-backdrop-filter:blur(34px)_saturate(1.4)] [&.window-titlebar_>_strong]:tracking-[-0.006em] [@media(prefers-reduced-transparency:_reduce)]:[&.window-titlebar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.window-titlebar]:[-webkit-backdrop-filter:none]'
        onDoubleClick={toggleMaximize}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}>
        <div className={cn(
          'traffic-lights',
          '[&.traffic-lights]:flex [&.traffic-lights]:gap-2 [&.traffic-lights]:items-center', '[&.traffic-lights:hover_.traffic::before]:opacity-[0.72]', '[&.traffic-lights:hover_.traffic::after]:opacity-[0.72]',
        )}>
          <button
            type='button'
            className={cn(
              "traffic",
              "traffic--close",
              "[&.traffic]:relative [&.traffic]:w-3.25 [&.traffic]:h-3.25 [&.traffic]:p-0 [&.traffic]:[border:0] [&.traffic]:rounded-[50%] [&.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.02_250/0.2)]", "[&.traffic::before]:[content:''] [&.traffic::before]:absolute [&.traffic::before]:left-[50%] [&.traffic::before]:top-[50%] [&.traffic::before]:opacity-[0] [&.traffic::before]:[transition:opacity_90ms_ease-out]", "[&.traffic::after]:[content:''] [&.traffic::after]:absolute [&.traffic::after]:left-[50%] [&.traffic::after]:top-[50%] [&.traffic::after]:opacity-[0] [&.traffic::after]:[transition:opacity_90ms_ease-out]", "[&.traffic--close]:[background:oklch(0.675_0.209_27.5)]", "[&.traffic--close::before]:w-1.5 [&.traffic--close::before]:h-px [&.traffic--close::before]:rounded-[1px] [&.traffic--close::before]:[background:oklch(0.31_0.08_27)] [&.traffic--close::before]:transform-[translate(-50%,-50%)_rotate(45deg)]", "[&.traffic--close::after]:w-1.5 [&.traffic--close::after]:h-px [&.traffic--close::after]:rounded-[1px] [&.traffic--close::after]:[background:oklch(0.31_0.08_27)] [&.traffic--close::after]:transform-[translate(-50%,-50%)_rotate(-45deg)]",
            )}
            aria-label={`Close ${window.title}`}
            onClick={() => dispatch({ type: 'close', id: window.id })}
          />
          <button
            type='button'
            className={cn(
              "traffic",
              "traffic--minimize",
              "[&.traffic]:relative [&.traffic]:w-3.25 [&.traffic]:h-3.25 [&.traffic]:p-0 [&.traffic]:[border:0] [&.traffic]:rounded-[50%] [&.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.02_250/0.2)]", "[&.traffic::before]:[content:''] [&.traffic::before]:absolute [&.traffic::before]:left-[50%] [&.traffic::before]:top-[50%] [&.traffic::before]:opacity-[0] [&.traffic::before]:[transition:opacity_90ms_ease-out]", "[&.traffic::after]:[content:''] [&.traffic::after]:absolute [&.traffic::after]:left-[50%] [&.traffic::after]:top-[50%] [&.traffic::after]:opacity-[0] [&.traffic::after]:[transition:opacity_90ms_ease-out]", "[&.traffic--minimize]:[background:oklch(0.819_0.173_81.4)]", "[&.traffic--minimize::before]:w-1.5 [&.traffic--minimize::before]:h-px [&.traffic--minimize::before]:rounded-[1px] [&.traffic--minimize::before]:[background:oklch(0.38_0.08_75)] [&.traffic--minimize::before]:transform-[translate(-50%,-50%)]",
            )}
            aria-label={`Minimize ${window.title}`}
            onClick={() => dispatch({ type: 'minimize', id: window.id })}
          />
          <button
            type='button'
            className={cn(
              "traffic",
              "traffic--maximize",
              "[&.traffic]:relative [&.traffic]:w-3.25 [&.traffic]:h-3.25 [&.traffic]:p-0 [&.traffic]:[border:0] [&.traffic]:rounded-[50%] [&.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.02_250/0.2)]", "[&.traffic::before]:[content:''] [&.traffic::before]:absolute [&.traffic::before]:left-[50%] [&.traffic::before]:top-[50%] [&.traffic::before]:opacity-[0] [&.traffic::before]:[transition:opacity_90ms_ease-out]", "[&.traffic::after]:[content:''] [&.traffic::after]:absolute [&.traffic::after]:left-[50%] [&.traffic::after]:top-[50%] [&.traffic::after]:opacity-[0] [&.traffic::after]:[transition:opacity_90ms_ease-out]", "[&.traffic--maximize]:[background:oklch(0.72_0.215_143.1)]", "[&.traffic--maximize::before]:w-1 [&.traffic--maximize::before]:h-1 [&.traffic--maximize::before]:[background:oklch(0.31_0.09_145)] [&.traffic--maximize::before]:[clip-path:polygon(0_0,100%_0,0_100%)] [&.traffic--maximize::before]:transform-[translate(-3px,-3px)]", "[&.traffic--maximize::after]:w-1 [&.traffic--maximize::after]:h-1 [&.traffic--maximize::after]:[background:oklch(0.31_0.09_145)] [&.traffic--maximize::after]:[clip-path:polygon(100%_0,100%_100%,0_100%)] [&.traffic--maximize::after]:transform-[translate(-1px,-1px)]",
            )}
            aria-label={`${window.maximized ? 'Exit Full Screen' : 'Enter Full Screen'} ${window.title}`}
            onClick={toggleMaximize}
          />
        </div>
        <strong>{window.title}</strong>
        <span />
      </div>
      <div className='window-body [&.window-body]:flex-1 [&.window-body]:min-h-0 [&.window-body]:overflow-hidden'>
        <WindowContent
          app={window.app}
          openApp={openApp}
          dark={dark}
          setDark={setDark}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          settingsSection={settingsSection}
          setSettingsSection={setSettingsSection}
          lowPower={lowPower}
          setLowPower={setLowPower}
          systemPreferences={systemPreferences}
          updateSystemPreferences={updateSystemPreferences}
          finderPreferences={finderPreferences}
          updateFinderPreferences={updateFinderPreferences}
          finderSection={finderSection}
          setFinderSection={setFinderSection}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          completedTasks={completedTasks}
          onToggleTask={onToggleTask}
        />
      </div>
    </section>
  );
}

const MemoAppWindow = memo(AppWindow);

function Dock({
  windows,
  launch,
  size,
  showRecentApps,
}: {
  windows: WindowState[];
  launch: (app: DockId) => void;
  size: number;
  showRecentApps: boolean;
}) {
  const visibleApps = showRecentApps
    ? [
        ...dockApps.slice(0, -1),
        { id: 'about' as const, label: 'About Me' },
        dockApps[dockApps.length - 1],
      ]
    : dockApps;
  return (
    <nav
      className={cn(
        "dock",
        "[&.dock]:fixed [&.dock]:z-650 [&.dock]:left-[50%] [&.dock]:bottom-2.75 [&.dock]:h-[calc(var(--dock-size,50px)+16px)] [&.dock]:flex [&.dock]:items-end [&.dock]:gap-1.25 [&.dock]:p-[8px_10px] [&.dock]:rounded-[22px] [&.dock]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),oklch(0.88_0.022_240/0.17)),var(--glass-clear)] [&.dock]:[backdrop-filter:blur(42px)_saturate(1.75)] [&.dock]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),inset_0_-1px_oklch(0.24_0.02_245/0.12),0_12px_30px_var(--glass-shadow),0_3px_8px_oklch(0.08_0.03_245/0.18)] [&.dock]:transform-[translateX(-50%)] [&.dock]:[transition:opacity_180ms_ease-out,transform_220ms_var(--ease-mac)] [&.dock]:[-webkit-backdrop-filter:blur(42px)_saturate(1.75)]", "[&.dock::before]:[content:''] [&.dock::before]:absolute [&.dock::before]:inset-[1px_18px_auto] [&.dock::before]:h-px [&.dock::before]:rounded-[50%] [&.dock::before]:[background:linear-gradient(90deg,transparent,oklch(1_0_0/0.9),transparent)] [&.dock::before]:pointer-events-none", "contrast-more:[&.dock]:[outline:1px_solid_var(--separator)]", "[@media(prefers-reduced-transparency:_reduce)]:[&.dock]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.dock]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.dock]:[background:var(--window-background)]", "max-[900px]:[&.dock]:max-w-[calc(100vw-12px)] max-[900px]:[&.dock]:overflow-x-auto max-[900px]:[&.dock]:overflow-y-hidden max-[900px]:[&.dock]:scrollbar-none", "max-[900px]:[&.dock_.app-icon]:[--icon-size:44px]!",
      )}
      aria-label='Dock'
      style={{ '--dock-size': `${size}px` } as CSSProperties}>
      {visibleApps.map((app) => {
        const running =
          app.id !== 'launchpad' &&
          app.id !== 'mail' &&
          app.id !== 'trash' &&
          windows.some((window) => window.app === app.id);
        const separated = app.id === (showRecentApps ? 'about' : 'trash');
        return (
          <button
            type='button'
            key={app.id}
            className={cn(
              `dock-item${separated ? ' dock-item--separated' : ''}`,
              "[&.dock-item]:relative [&.dock-item]:w-(--dock-size,50px) [&.dock-item]:h-(--dock-size,50px) [&.dock-item]:flex-[0_0_var(--dock-size,50px)] [&.dock-item]:p-0 [&.dock-item]:[border:0] [&.dock-item]:[background:transparent] [&.dock-item]:basis-(--dock-size,50px)", "[&.dock-item_>_i]:absolute [&.dock-item_>_i]:left-[50%] [&.dock-item_>_i]:-bottom-1.25 [&.dock-item_>_i]:w-1 [&.dock-item_>_i]:h-1 [&.dock-item_>_i]:rounded-[50%] [&.dock-item_>_i]:[background:oklch(0.2_0.01_250)] [&.dock-item_>_i]:opacity-[0] [&.dock-item_>_i]:transform-[translateX(-50%)]", "[&.dock-item_>_i.running]:opacity-[0.82]", "[&.dock-item:hover_.dock-tooltip]:opacity-[1] [&.dock-item:hover_.dock-tooltip]:transform-[translate(-50%,0)]", "max-[900px]:[&.dock-item]:w-11 max-[900px]:[&.dock-item]:h-11 max-[900px]:[&.dock-item]:basis-11", "[&.dock-item--separated]:ml-3", "[&.dock-item--separated::before]:[content:''] [&.dock-item--separated::before]:absolute [&.dock-item--separated::before]:-left-2.25 [&.dock-item--separated::before]:top-0.75 [&.dock-item--separated::before]:w-px [&.dock-item--separated::before]:h-10.75 [&.dock-item--separated::before]:[background:oklch(0.18_0.018_250/0.22)] [&.dock-item--separated::before]:[box-shadow:1px_0_oklch(1_0_0/0.28)]",
            )}
            aria-label={app.label}
            onClick={() => launch(app.id)}>
            <span className='dock-tooltip [&.dock-tooltip]:absolute [&.dock-tooltip]:left-[50%] [&.dock-tooltip]:bottom-[calc(100%+12px)] [&.dock-tooltip]:p-[5px_9px] [&.dock-tooltip]:rounded-lg [&.dock-tooltip]:text-[oklch(0.2_0.01_250)] [&.dock-tooltip]:[background:var(--glass-regular)] [&.dock-tooltip]:[backdrop-filter:blur(26px)_saturate(1.45)] [&.dock-tooltip]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),0_5px_12px_oklch(0.08_0.03_245/0.2)] [&.dock-tooltip]:opacity-[0] [&.dock-tooltip]:pointer-events-none [&.dock-tooltip]:whitespace-nowrap [&.dock-tooltip]:text-[12px] [&.dock-tooltip]:transform-[translate(-50%,5px)] [&.dock-tooltip]:[transition:opacity_130ms,transform_130ms] [&.dock-tooltip]:[-webkit-backdrop-filter:blur(26px)_saturate(1.45)]'>
              {app.label}
            </span>
            <AppIcon app={app.id} size={Math.max(34, size - 2)} />
            <i className={cn(running ? 'running' : '')} />
          </button>
        );
      })}
    </nav>
  );
}

function SystemMenu({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        `system-menu ${className}`,
        '[&.system-menu]:fixed [&.system-menu]:z-800 [&.system-menu]:rounded-[14px] [&.system-menu]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.system-menu]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.system-menu]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.system-menu]:top-7.75 [&.system-menu]:w-61.25 [&.system-menu]:p-1.5 [&.system-menu]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)]', '[&.system-menu_button]:w-full [&.system-menu_button]:min-h-6.75 [&.system-menu_button]:flex [&.system-menu_button]:items-center [&.system-menu_button]:justify-between [&.system-menu_button]:p-[3px_9px] [&.system-menu_button]:[border:0] [&.system-menu_button]:rounded-[7px] [&.system-menu_button]:[background:transparent] [&.system-menu_button]:text-left [&.system-menu_button]:text-[13px] [&.system-menu_button]:[transition-property:scale] [&.system-menu_button]:duration-120 [&.system-menu_button]:ease-[ease-out]', '[&.system-menu_button:hover]:text-[white] [&.system-menu_button:hover]:[background:var(--system-blue-deep)] [&.system-menu_button:hover]:[box-shadow:inset_0_1px_oklch(1_0_0/0.2)]', '[&.system-menu_hr]:m-[4px_7px] [&.system-menu_hr]:[border:0] [&.system-menu_hr]:[border-top:1px_solid_var(--separator)]', '[&.system-menu_kbd]:opacity-[0.58] [&.system-menu_kbd]:font-[inherit]', '[&.system-menu_button:disabled]:text-[oklch(0.46_0.01_250/0.52)] [&.system-menu_button:disabled]:pointer-events-none', '[&.system-menu_.network-row]:grid [&.system-menu_.network-row]:grid-cols-[20px_1fr_18px] [&.system-menu_.network-row]:gap-1', '[&.system-menu_button:active]:scale-[0.96]', 'contrast-more:[&.system-menu]:[outline:1px_solid_var(--separator)]', '[@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[background:var(--material-menu)]',
      )}
      onPointerDown={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
}

type AppleMenuProps = {
  openApp: (app: AppId) => void;
  openSettings: () => void;
  lock: () => void;
  sleep: () => void;
  forceQuit: () => void;
  restart: () => void;
  shutDown: () => void;
};

function AppleMenu({
  openApp,
  openSettings,
  lock,
  sleep,
  forceQuit,
  restart,
  shutDown,
}: AppleMenuProps) {
  const [recentOpen, setRecentOpen] = useState(false);
  return (
    <SystemMenu className='apple-menu [&.apple-menu]:left-2'>
      <button type='button' onClick={() => openApp('about')}>
        About This Mac
      </button>
      <hr />
      <button type='button' onClick={openSettings}>
        {'System Settings\u2026'}
      </button>
      <button type='button' onClick={() => openApp('safari')}>
        {'App Store\u2026'}
      </button>
      <hr />
      <button
        type='button'
        aria-expanded={recentOpen}
        onClick={() => setRecentOpen((current) => !current)}>
        Recent Items <span>{'\u203a'}</span>
      </button>
      {recentOpen ? (
        <div
          className='apple-recent-items [&.apple-recent-items]:m-[2px_0_3px_12px] [&.apple-recent-items]:pl-1.5 [&.apple-recent-items]:[border-left:1px_solid_var(--separator)] [&.apple-recent-items_button]:min-h-6 [&.apple-recent-items_button]:text-(--label-secondary) [&.apple-recent-items_button]:text-[12px]'
          role='menu'
          aria-label='Recent Items'>
          <button type='button' role='menuitem' onClick={() => openApp('safari')}>
            Project Aurora
          </button>
          <button type='button' role='menuitem' onClick={() => openApp('notes')}>
            Read Me.txt
          </button>
          <button type='button' role='menuitem' onClick={() => openApp('about')}>
            About Me.md
          </button>
        </div>
      ) : null}
      <hr />
      <button type='button' onClick={forceQuit}>
        {'Force Quit\u2026'}
      </button>
      <hr />
      <button type='button' onClick={sleep}>
        Sleep
      </button>
      <button type='button' onClick={lock}>
        Lock Screen
      </button>
      <button type='button' onClick={lock}>
        {'Log Out Renan\u2026'}
      </button>
      <hr />
      <button type='button' onClick={restart}>
        {'Restart\u2026'}
      </button>
      <button type='button' onClick={shutDown}>
        {'Shut Down\u2026'}
      </button>
    </SystemMenu>
  );
}

function ForceQuitDialog({
  windows,
  onQuit,
  onClose,
}: {
  windows: WindowState[];
  onQuit: (id: number) => void;
  onClose: () => void;
}) {
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
        '[&.force-quit-dialog]:w-[min(410px,calc(100vw-30px))] [&.force-quit-dialog]:p-4.5 [&.force-quit-dialog]:[border:0] [&.force-quit-dialog]:rounded-[14px] [&.force-quit-dialog]:text-(--label-primary) [&.force-quit-dialog]:[background:var(--material-popover)] [&.force-quit-dialog]:[box-shadow:0_18px_44px_oklch(0.04_0.02_250/0.38),inset_0_0_0_1px_var(--glass-stroke)]', '[&.force-quit-dialog::backdrop]:[background:oklch(0.05_0.01_250/0.24)] [&.force-quit-dialog::backdrop]:[backdrop-filter:blur(4px)]', '[&.force-quit-dialog_header]:flex [&.force-quit-dialog_header]:items-center [&.force-quit-dialog_header]:justify-between', '[&.force-quit-dialog_header_button]:min-h-6.75 [&.force-quit-dialog_header_button]:p-[3px_10px] [&.force-quit-dialog_header_button]:[border:0] [&.force-quit-dialog_header_button]:rounded-[7px] [&.force-quit-dialog_header_button]:text-[white] [&.force-quit-dialog_header_button]:[background:var(--system-blue-deep)]', '[&.force-quit-dialog_p]:m-[8px_0_14px] [&.force-quit-dialog_p]:text-(--label-secondary) [&.force-quit-dialog_p]:text-[12px]',
      )}
      aria-label='Force Quit Applications'
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <header>
        <strong>Force Quit Applications</strong>
        <button type='button' aria-label='Close Force Quit' onClick={onClose}>
          Done
        </button>
      </header>
      <p>{'If an app isn\u2019t responding, select it and click Force Quit.'}</p>
      <div className={cn(
        'force-quit-list',
        '[&.force-quit-list_button]:min-h-6.75 [&.force-quit-list_button]:p-[3px_10px] [&.force-quit-list_button]:[border:0] [&.force-quit-list_button]:rounded-[7px] [&.force-quit-list_button]:text-[white] [&.force-quit-list_button]:[background:var(--system-blue-deep)]', '[&.force-quit-list]:overflow-hidden [&.force-quit-list]:rounded-[9px] [&.force-quit-list]:[background:var(--material-raised)] [&.force-quit-list]:[box-shadow:inset_0_0_0_1px_var(--separator)]', '[&.force-quit-list_>_div]:min-h-12.5 [&.force-quit-list_>_div]:flex [&.force-quit-list_>_div]:items-center [&.force-quit-list_>_div]:gap-2.5 [&.force-quit-list_>_div]:p-2 [&.force-quit-list_>_div]:[border-bottom:1px_solid_var(--separator)]', '[&.force-quit-list_>_div:last-child]:[border-bottom:0]', '[&.force-quit-list_>_div_>_span:nth-child(2)]:min-w-0 [&.force-quit-list_>_div_>_span:nth-child(2)]:flex-1 [&.force-quit-list_>_div_>_span:nth-child(2)]:overflow-hidden [&.force-quit-list_>_div_>_span:nth-child(2)]:text-ellipsis [&.force-quit-list_>_div_>_span:nth-child(2)]:whitespace-nowrap',
      )}>
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

function FileMenu({ openApp }: { openApp: (app: AppId) => void }) {
  return (
    <SystemMenu className='file-menu [&.file-menu]:left-28.75'>
      <button type='button' onClick={() => openApp('finder')}>
        New Finder Window <kbd>⌘N</kbd>
      </button>
      <button type='button' onClick={() => openApp('notes')}>
        New Note <kbd>⌘⇧N</kbd>
      </button>
      <hr />
      <button type='button'>
        Open… <kbd>⌘O</kbd>
      </button>
      <button type='button'>
        Get Info <kbd>⌘I</kbd>
      </button>
      <hr />
      <button type='button'>
        Move to Trash <kbd>⌘⌫</kbd>
      </button>
    </SystemMenu>
  );
}

function MenuCommand({
  children,
  shortcut,
  checked = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type='button' disabled={disabled} onClick={onClick}>
      <span className={cn(
        'menu-command__label',
        '[&.menu-command\\_\\_label]:min-w-0 [&.menu-command\\_\\_label]:flex [&.menu-command\\_\\_label]:items-center [&.menu-command\\_\\_label]:gap-1', '[&.menu-command\\_\\_label_>_i]:w-3.5 [&.menu-command\\_\\_label_>_i]:h-3.5 [&.menu-command\\_\\_label_>_i]:grid [&.menu-command\\_\\_label_>_i]:place-items-center [&.menu-command\\_\\_label_>_i]:-ml-0.75',
      )}>
        <i>{checked ? <Check size={12} strokeWidth={2.5} /> : null}</i>
        {children}
      </span>
      {shortcut ? <kbd>{shortcut}</kbd> : null}
    </button>
  );
}

function EditMenu({ close }: { close: () => void }) {
  return (
    <SystemMenu className='edit-menu [&.edit-menu]:left-65.25'>
      <MenuCommand shortcut='⌘Z' disabled>
        Undo
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘Z' disabled>
        Redo
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌘X' onClick={close}>
        Cut
      </MenuCommand>
      <MenuCommand shortcut='⌘C' onClick={close}>
        Copy
      </MenuCommand>
      <MenuCommand shortcut='⌘V' onClick={close}>
        Paste
      </MenuCommand>
      <MenuCommand shortcut='⌘A' onClick={close}>
        Select All
      </MenuCommand>
      <hr />
      <MenuCommand onClick={close}>
        Start Dictation… <span>🎙</span>
      </MenuCommand>
      <MenuCommand onClick={close}>
        Emoji & Symbols <span>›</span>
      </MenuCommand>
    </SystemMenu>
  );
}

function ViewMenu({
  preferences,
  updatePreferences,
  maximize,
  close,
}: {
  preferences: FinderPreferences;
  updatePreferences: (patch: Partial<FinderPreferences>) => void;
  maximize: () => void;
  close: () => void;
}) {
  const selectView = (view: FinderView) => {
    updatePreferences({ view });
    close();
  };
  return (
    <SystemMenu className='view-menu [&.view-menu]:left-40.5'>
      <MenuCommand checked={preferences.view === 'icons'} onClick={() => selectView('icons')}>
        as Icons
      </MenuCommand>
      <MenuCommand checked={preferences.view === 'list'} onClick={() => selectView('list')}>
        as List
      </MenuCommand>
      <MenuCommand checked={preferences.view === 'columns'} onClick={() => selectView('columns')}>
        as Columns
      </MenuCommand>
      <MenuCommand checked={preferences.view === 'gallery'} onClick={() => selectView('gallery')}>
        as Gallery
      </MenuCommand>
      <hr />
      <MenuCommand
        shortcut='⌥⌘S'
        checked={preferences.showSidebar}
        onClick={() => updatePreferences({ showSidebar: !preferences.showSidebar })}>
        Show Sidebar
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘P'
        checked={preferences.showPreview}
        onClick={() => updatePreferences({ showPreview: !preferences.showPreview })}>
        Show Preview
      </MenuCommand>
      <MenuCommand
        shortcut='⌘/'
        checked={preferences.showStatusBar}
        onClick={() => updatePreferences({ showStatusBar: !preferences.showStatusBar })}>
        Show Status Bar
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌃⌘F' onClick={maximize}>
        Enter Full Screen
      </MenuCommand>
    </SystemMenu>
  );
}

function GoMenu({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return (
    <SystemMenu className='go-menu [&.go-menu]:left-54.5'>
      <MenuCommand shortcut='⌘[' onClick={close}>
        Back
      </MenuCommand>
      <MenuCommand shortcut='⌘]' disabled>
        Forward
      </MenuCommand>
      <MenuCommand onClick={close}>
        Enclosing Folder <span>›</span>
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⇧⌘F' onClick={() => openApp('finder')}>
        Recents
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘O' onClick={() => openApp('about')}>
        About Me
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘D' onClick={() => openApp('finder')}>
        Desktop
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘P' onClick={() => openApp('finder')}>
        Portfolio
      </MenuCommand>
      <MenuCommand shortcut='⌥⌘L' onClick={() => openApp('photos')}>
        Downloads
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⇧⌘G' onClick={close}>
        Go to Folder…
      </MenuCommand>
    </SystemMenu>
  );
}

function WindowMenu({
  window,
  minimize,
  maximize,
  close,
}: {
  window?: WindowState;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}) {
  return (
    <SystemMenu className='window-menu [&.window-menu]:left-77.5 [&.window-menu]:w-66.25'>
      <MenuCommand shortcut='⌘M' disabled={!window} onClick={minimize}>
        Minimize
      </MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>
        Zoom
      </MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>
        Fill
      </MenuCommand>
      <MenuCommand disabled>Center</MenuCommand>
      <MenuCommand>
        Move & Resize <span>›</span>
      </MenuCommand>
      <hr />
      <MenuCommand disabled={!window} onClick={close}>
        Bring All to Front
      </MenuCommand>
      <hr />
      <MenuCommand checked={Boolean(window)} onClick={close}>
        {window?.title ?? 'No Open Windows'}
      </MenuCommand>
    </SystemMenu>
  );
}

function HelpMenu({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return (
    <SystemMenu className='help-menu [&.help-menu]:left-97 [&.help-menu]:w-70'>
      <label className={cn(
        'help-search',
        '[&.help-search]:h-6.75 [&.help-search]:flex [&.help-search]:items-center [&.help-search]:gap-1.5 [&.help-search]:m-0.5 [&.help-search]:p-[0_8px] [&.help-search]:rounded-md [&.help-search]:[background:oklch(1_0_0/0.56)] [&.help-search]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)]', '[&.help-search_input]:min-w-0 [&.help-search_input]:flex-1 [&.help-search_input]:[border:0] [&.help-search_input]:[outline:0] [&.help-search_input]:[background:transparent] [&.help-search_input]:text-[12px]',
      )}>
        <Search size={13} />
        <input aria-label='Search Help' placeholder='Search' />
      </label>
      <hr />
      <MenuCommand onClick={() => openApp('notes')}>macOS Help</MenuCommand>
      <MenuCommand onClick={() => openApp('about')}>About This Portfolio</MenuCommand>
      <MenuCommand onClick={close}>Keyboard Shortcuts</MenuCommand>
    </SystemMenu>
  );
}

function WifiMenu({ openSettings }: { openSettings: (section: SettingsSectionId) => void }) {
  const [enabled, setEnabled] = useState(true);
  const [network, setNetwork] = useState('Studio Wi-Fi');
  const [showOtherNetworks, setShowOtherNetworks] = useState(false);
  return (
    <SystemMenu className='status-menu wifi-menu [&.status-menu]:w-65 [&.wifi-menu]:right-68'>
      <div className={cn(
        'status-menu__heading',
        '[&.status-menu\\_\\_heading]:min-h-10 [&.status-menu\\_\\_heading]:flex [&.status-menu\\_\\_heading]:items-center [&.status-menu\\_\\_heading]:justify-between [&.status-menu\\_\\_heading]:p-[4px_8px]', '[&.status-menu\\_\\_heading_>_span]:flex [&.status-menu\\_\\_heading_>_span]:flex-col', '[&.status-menu\\_\\_heading_small]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_heading_small]:text-[11px] [&.status-menu\\_\\_heading_small]:font-normal',
      )}>
        <strong>Wi-Fi</strong>
        <button
          type='button'
          className={cn(
            `mac-switch${enabled ? ' is-on' : ''}`,
            '[&.mac-switch]:relative [&.mac-switch]:w-9.5! [&.mac-switch]:min-h-5.5! [&.mac-switch]:flex-[0_0_38px] [&.mac-switch]:p-0! [&.mac-switch]:rounded-[999px]! [&.mac-switch]:[background:oklch(0.76_0.01_250)]! [&.mac-switch]:[transition:background-color_150ms_ease-out]', '[&.mac-switch_i]:absolute [&.mac-switch_i]:top-0.5 [&.mac-switch_i]:left-0.5 [&.mac-switch_i]:w-4.5 [&.mac-switch_i]:h-4.5 [&.mac-switch_i]:rounded-[50%] [&.mac-switch_i]:[background:white] [&.mac-switch_i]:[box-shadow:0_1px_3px_oklch(0.2_0.01_250/0.3)] [&.mac-switch_i]:[transition:transform_170ms_var(--ease-mac)]', '[&.mac-switch.is-on]:[background:var(--system-blue-deep)]!', '[&.mac-switch.is-on_i]:transform-[translateX(16px)]',
          )}
          aria-label='Toggle Wi-Fi'
          onClick={() => setEnabled(!enabled)}>
          <i />
        </button>
      </div>
      <hr />
      <span className='status-menu__label [&.status-menu\\_\\_label]:block [&.status-menu\\_\\_label]:p-[4px_9px] [&.status-menu\\_\\_label]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_label]:text-[11px] [&.status-menu\\_\\_label]:font-[650]'>
        Known Networks
      </span>
      {['Studio Wi-Fi', 'iPhone', 'Guest Network'].map((name, index) => (
        <button
          type='button'
          className='network-row'
          key={name}
          disabled={!enabled}
          onClick={() => setNetwork(name)}>
          <Wifi size={15} />
          <span>{name}</span>
          {network === name ? (
            <Check size={13} />
          ) : index === 0 ? null : (
            <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
              ●
            </span>
          )}
        </button>
      ))}
      <hr />
      <button
        type='button'
        aria-expanded={showOtherNetworks}
        aria-controls='other-networks'
        onClick={() => setShowOtherNetworks((visible) => !visible)}>
        Other Networks… <span>{showOtherNetworks ? '⌄' : '›'}</span>
      </button>
      {showOtherNetworks ? (
        <div
          className='other-networks [&.other-networks]:m-[2px_0_4px] [&.other-networks]:p-1 [&.other-networks]:rounded-lg [&.other-networks]:[background:oklch(0.82_0.012_250/0.34)] [&.other-networks]:[box-shadow:inset_0_0_0_1px_oklch(0.34_0.01_250/0.08)] [&.other-networks]:animate-[other-networks-in_140ms_var(--ease-mac)_both] [&.other-networks_.network-row]:min-h-6.75'
          id='other-networks'
          role='region'
          aria-label='Other Networks'>
          {['Coffee Shop Guest', 'Library Public', 'Phone Hotspot'].map((name, index) => (
            <button
              type='button'
              className='network-row'
              key={name}
              disabled={!enabled}
              onClick={() => {
                setNetwork(name);
                setShowOtherNetworks(false);
              }}>
              <Wifi size={15} />
              <span>{name}</span>
              {network === name ? (
                <Check size={13} />
              ) : index === 1 ? null : (
                <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
                  ●
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
      <button type='button' onClick={() => openSettings('wifi')}>
        Wi-Fi Settings…
      </button>
    </SystemMenu>
  );
}

function BatteryMenu({
  openSettings,
  lowPower,
  setLowPower,
}: {
  openSettings: (section: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
}) {
  return (
    <SystemMenu className='status-menu battery-menu [&.status-menu]:w-65 [&.battery-menu]:right-54.5'>
      <div
        className={cn(
          `battery-summary${lowPower ? ' is-low-power' : ''}`,
          '[&.battery-summary_small]:text-[oklch(0.49_0.01_250)] [&.battery-summary_small]:text-[11px] [&.battery-summary_small]:font-normal', '[&.battery-summary]:min-h-13 [&.battery-summary]:flex [&.battery-summary]:items-center [&.battery-summary]:gap-2.75 [&.battery-summary]:p-[4px_8px]', '[&.battery-summary_>_span]:flex [&.battery-summary_>_span]:flex-col', '[&.battery-summary.is-low-power_>_svg]:text-(--low-power-yellow) [&.battery-summary.is-low-power_>_svg]:filter-[drop-shadow(0_0_4px_oklch(0.82_0.17_85/0.28))]',
        )}>
        <BatteryCharging size={32} />
        <span>
          <strong>Battery</strong>
          <small>{lowPower ? '84% · Low Power Mode' : '84% · Power Adapter'}</small>
        </span>
      </div>
      <hr />
      <div className={cn(
        'status-menu__heading',
        '[&.status-menu\\_\\_heading]:min-h-10 [&.status-menu\\_\\_heading]:flex [&.status-menu\\_\\_heading]:items-center [&.status-menu\\_\\_heading]:justify-between [&.status-menu\\_\\_heading]:p-[4px_8px]', '[&.status-menu\\_\\_heading_>_span]:flex [&.status-menu\\_\\_heading_>_span]:flex-col', '[&.status-menu\\_\\_heading_small]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_heading_small]:text-[11px] [&.status-menu\\_\\_heading_small]:font-normal',
      )}>
        <span>
          <strong>Low Power Mode</strong>
          <small>Reduces energy use</small>
        </span>
        <button
          type='button'
          className={cn(
            `mac-switch${lowPower ? ' is-on' : ''}`,
            '[&.mac-switch]:relative [&.mac-switch]:w-9.5! [&.mac-switch]:min-h-5.5! [&.mac-switch]:flex-[0_0_38px] [&.mac-switch]:p-0! [&.mac-switch]:rounded-[999px]! [&.mac-switch]:[background:oklch(0.76_0.01_250)]! [&.mac-switch]:[transition:background-color_150ms_ease-out]', '[&.mac-switch_i]:absolute [&.mac-switch_i]:top-0.5 [&.mac-switch_i]:left-0.5 [&.mac-switch_i]:w-4.5 [&.mac-switch_i]:h-4.5 [&.mac-switch_i]:rounded-[50%] [&.mac-switch_i]:[background:white] [&.mac-switch_i]:[box-shadow:0_1px_3px_oklch(0.2_0.01_250/0.3)] [&.mac-switch_i]:[transition:transform_170ms_var(--ease-mac)]', '[&.mac-switch.is-on]:[background:var(--system-blue-deep)]!', '[&.mac-switch.is-on_i]:transform-[translateX(16px)]',
          )}
          aria-label='Toggle Low Power Mode'
          aria-pressed={lowPower}
          onClick={() => setLowPower(!lowPower)}>
          <i />
        </button>
      </div>
      <hr />
      <button type='button' onClick={() => openSettings('battery')}>
        Battery Settings…
      </button>
    </SystemMenu>
  );
}

function SiriMenu({ openApp }: { openApp: (app: AppId) => void }) {
  const [query, setQuery] = useState('');
  return (
    <div
      className={cn(
        'siri-panel',
        '[&.siri-panel]:fixed [&.siri-panel]:z-810 [&.siri-panel]:top-9 [&.siri-panel]:right-26 [&.siri-panel]:w-85 [&.siri-panel]:min-h-45 [&.siri-panel]:flex [&.siri-panel]:flex-col [&.siri-panel]:items-center [&.siri-panel]:p-5 [&.siri-panel]:rounded-[18px] [&.siri-panel]:text-[white] [&.siri-panel]:[background:oklch(0.12_0.035_270/0.6)] [&.siri-panel]:[backdrop-filter:blur(48px)_saturate(1.55)] [&.siri-panel]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.22),inset_0_1px_oklch(1_0_0/0.24),0_18px_44px_oklch(0.06_0.04_260/0.34)] [&.siri-panel]:[-webkit-backdrop-filter:blur(48px)_saturate(1.55)]', '[&.siri-panel_form]:w-full [&.siri-panel_form]:mt-3.5', '[&.siri-panel_input]:w-full [&.siri-panel_input]:h-8.5 [&.siri-panel_input]:p-[0_12px] [&.siri-panel_input]:[border:0] [&.siri-panel_input]:rounded-[9px] [&.siri-panel_input]:[outline:0] [&.siri-panel_input]:text-[white] [&.siri-panel_input]:[background:oklch(1_0_0/0.15)] [&.siri-panel_input]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.14)]', '[&.siri-panel_input::placeholder]:text-[oklch(1_0_0/0.65)]', '[&.siri-panel_p]:m-[10px_0_0] [&.siri-panel_p]:text-[oklch(0.9_0.02_260)] [&.siri-panel_p]:text-[12px]',
      )}
      onPointerDown={(event) => event.stopPropagation()}>
      <div className={cn(
        'siri-panel__orb',
        '[&.siri-panel\\_\\_orb]:w-14 [&.siri-panel\\_\\_orb]:h-14 [&.siri-panel\\_\\_orb]:p-1 [&.siri-panel\\_\\_orb]:mb-2.5 [&.siri-panel\\_\\_orb]:rounded-[50%] [&.siri-panel\\_\\_orb]:[background:conic-gradient(from_220deg,oklch(0.7_0.21_160),oklch(0.68_0.22_225),oklch(0.63_0.26_305),oklch(0.69_0.23_20),oklch(0.78_0.2_80),oklch(0.7_0.21_160))] [&.siri-panel\\_\\_orb]:animate-[siri-orbit_4s_linear_infinite]', '[&.siri-panel\\_\\_orb_span]:block [&.siri-panel\\_\\_orb_span]:w-full [&.siri-panel\\_\\_orb_span]:h-full [&.siri-panel\\_\\_orb_span]:rounded-[inherit] [&.siri-panel\\_\\_orb_span]:[background:oklch(0.16_0.04_270/0.7)] [&.siri-panel\\_\\_orb_span]:[box-shadow:inset_0_0_16px_oklch(0.75_0.24_305/0.6)]',
      )}>
        <span />
      </div>
      <strong>{query ? 'Here’s what I found.' : 'What can I help with?'}</strong>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (query.toLowerCase().includes('project')) openApp('safari');
        }}>
        <input
          autoFocus
          aria-label='Ask Siri'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Ask Siri'
        />
      </form>
      {query ? <p>Try “open projects” or use Spotlight with ⌘ Space.</p> : null}
    </div>
  );
}

function ControlCenter({
  dark,
  setDark,
  brightness,
  setBrightness,
  systemPreferences,
  updateSystemPreferences,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
}) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  return (
    <SystemMenu className='control-center [&.control-center]:fixed [&.control-center]:z-800 [&.control-center]:rounded-[14px] [&.control-center]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.control-center]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.control-center]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.control-center]:top-8.5 [&.control-center]:right-2.5 [&.control-center]:w-82.5 [&.control-center]:p-3 [&.control-center]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)] contrast-more:[&.control-center]:[outline:1px_solid_var(--separator)] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[background:var(--material-menu)] max-[600px]:[&.control-center]:right-1.5 max-[600px]:[&.control-center]:w-[min(330px,calc(100vw-12px))]'>
      <div className={cn(
        'control-grid',
        '[&.control-grid]:grid [&.control-grid]:grid-cols-[1fr_1fr] [&.control-grid]:gap-2', '[&.control-grid_button]:min-h-15.25 [&.control-grid_button]:flex [&.control-grid_button]:items-center [&.control-grid_button]:gap-2.25 [&.control-grid_button]:p-2 [&.control-grid_button]:[border:0] [&.control-grid_button]:rounded-xl [&.control-grid_button]:[background:oklch(1_0_0/0.5)] [&.control-grid_button]:text-left [&.control-grid_button]:[transition-property:background-color,box-shadow,filter,scale] [&.control-grid_button]:duration-[180ms,180ms,180ms,120ms] [&.control-grid_button]:ease-[var(--ease-mac),var(--ease-mac),var(--ease-mac),ease-out] [&.control-grid_button]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)] [&.control-grid_button]:overflow-hidden [&.control-grid_button]:text-(--label-primary) [&.control-grid_button]:bg-[oklch(1_0_0/0.48)] [&.control-grid_button]:bg-[linear-gradient(145deg,oklch(1_0_0/0.46),oklch(1_0_0/0)_62%)] [&.control-grid_button]:[backdrop-filter:blur(18px)_saturate(1.25)] [&.control-grid_button]:[-webkit-backdrop-filter:blur(18px)_saturate(1.25)]', '[&.control-grid_button_>_span]:w-8 [&.control-grid_button_>_span]:h-8 [&.control-grid_button_>_span]:grid [&.control-grid_button_>_span]:place-items-center [&.control-grid_button_>_span]:rounded-[50%] [&.control-grid_button_>_span]:[background:oklch(0.84_0.01_250)]', '[&.control-grid_button.on_>_span]:text-[white] [&.control-grid_button.on_>_span]:[background:var(--system-blue-deep)]', '[&.control-grid_button_div]:flex [&.control-grid_button_div]:flex-col', '[&.control-grid_small]:text-inherit [&.control-grid_small]:opacity-[0.66]', '[&.control-grid_button:active]:scale-[0.96]', '[&.control-grid_button:hover]:text-(--label-primary) [&.control-grid_button:hover]:bg-(--control-hover) [&.control-grid_button:hover]:bg-[linear-gradient(145deg,oklch(1_0_0/0.46),oklch(1_0_0/0)_62%)] [&.control-grid_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.62),inset_0_1px_oklch(1_0_0/0.76),0_5px_13px_oklch(0.08_0.025_245/0.12)] [&.control-grid_button:hover]:filter-[saturate(1.06)_brightness(1.02)]',
      )}>
        <button type='button' className={cn(wifi ? 'on' : '')} onClick={() => setWifi(!wifi)}>
          <span>
            <Wifi size={18} />
          </span>
          <div>
            <strong>Wi-Fi</strong>
            <small>{wifi ? 'Home' : 'Off'}</small>
          </div>
        </button>
        <button
          type='button'
          className={cn(bluetooth ? 'on' : '')}
          onClick={() => setBluetooth(!bluetooth)}>
          <span>
            <Bluetooth size={18} />
          </span>
          <div>
            <strong>Bluetooth</strong>
            <small>{bluetooth ? 'On' : 'Off'}</small>
          </div>
        </button>
        <button type='button' onClick={() => setDark(!dark)}>
          <span>{dark ? <Moon size={18} /> : <Sun size={18} />}</span>
          <div>
            <strong>Appearance</strong>
            <small>{dark ? 'Dark' : 'Light'}</small>
          </div>
        </button>
        <button
          type='button'
          className={cn(systemPreferences.doNotDisturb ? 'on' : '')}
          aria-pressed={systemPreferences.doNotDisturb}
          onClick={() =>
            updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb })
          }>
          <span>
            <Moon size={18} />
          </span>
          <div>
            <strong>Focus</strong>
            <small>{systemPreferences.doNotDisturb ? 'Do Not Disturb' : 'Off'}</small>
          </div>
        </button>
      </div>
      <label className={cn(
        'slider-control',
        '[&.slider-control]:block [&.slider-control]:mt-2 [&.slider-control]:p-2.5 [&.slider-control]:rounded-xl [&.slider-control]:[background:oklch(1_0_0/0.5)] [&.slider-control]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)]', '[&.slider-control_span]:flex [&.slider-control_span]:items-center [&.slider-control_span]:gap-1.5 [&.slider-control_span]:text-[12px] [&.slider-control_span]:font-[650]', '[&.slider-control_input]:w-full [&.slider-control_input]:mt-2 [&.slider-control_input]:accent-[white]',
      )}>
        <span>
          <Volume2 size={16} /> Sound
        </span>
        <input
          aria-label='Sound volume'
          type='range'
          min='0'
          max='100'
          value={systemPreferences.volume}
          onChange={(event) => updateSystemPreferences({ volume: Number(event.target.value) })}
        />
      </label>
      <label className={cn(
        'slider-control',
        '[&.slider-control]:block [&.slider-control]:mt-2 [&.slider-control]:p-2.5 [&.slider-control]:rounded-xl [&.slider-control]:[background:oklch(1_0_0/0.5)] [&.slider-control]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)]', '[&.slider-control_span]:flex [&.slider-control_span]:items-center [&.slider-control_span]:gap-1.5 [&.slider-control_span]:text-[12px] [&.slider-control_span]:font-[650]', '[&.slider-control_input]:w-full [&.slider-control_input]:mt-2 [&.slider-control_input]:accent-[white]',
      )}>
        <span>
          <Sun size={16} /> Display
        </span>
        <input
          aria-label='Display brightness'
          type='range'
          min='10'
          max='100'
          value={brightness}
          onChange={(event) => setBrightness(Number(event.target.value))}
        />
      </label>
    </SystemMenu>
  );
}

function NotificationCenter({ doNotDisturb }: { doNotDisturb: boolean }) {
  const now = useClock();
  return (
    <aside className='notification-center [&.notification-center]:fixed [&.notification-center]:z-800 [&.notification-center]:rounded-[11px] [&.notification-center]:[background:transparent] [&.notification-center]:[backdrop-filter:none] [&.notification-center]:[box-shadow:none] [&.notification-center]:top-8.25 [&.notification-center]:right-3 [&.notification-center]:w-85 [&.notification-center]:p-3'>
      <div className={cn(
        'notification-date',
        '[&.notification-date]:p-[10px_8px] [&.notification-date]:text-[white] [&.notification-date]:[text-shadow:0_2px_6px_oklch(0.1_0.03_245/0.45)]', '[&.notification-date_span]:block [&.notification-date_span]:text-[22px] [&.notification-date_span]:font-[650]', '[&.notification-date_strong]:text-[58px] [&.notification-date_strong]:leading-[0.95]',
      )}>
        <span>{now.toLocaleDateString('en-US', { weekday: 'long' })}</span>
        <strong>{now.getDate()}</strong>
      </div>
      {doNotDisturb ? (
        <div className={cn(
          'focus-notice',
          '[&.focus-notice]:flex [&.focus-notice]:items-center [&.focus-notice]:gap-2.5 [&.focus-notice]:m-[0_0_9px] [&.focus-notice]:p-[11px_12px] [&.focus-notice]:rounded-[15px] [&.focus-notice]:text-(--label-primary) [&.focus-notice]:[background:var(--glass-regular)] [&.focus-notice]:[backdrop-filter:blur(38px)_saturate(1.45)] [&.focus-notice]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_8px_20px_oklch(0.08_0.03_245/0.2)]', '[&.focus-notice_>_span]:w-8.5 [&.focus-notice_>_span]:h-8.5 [&.focus-notice_>_span]:flex-[0_0_34px] [&.focus-notice_>_span]:grid [&.focus-notice_>_span]:place-items-center [&.focus-notice_>_span]:rounded-[50%] [&.focus-notice_>_span]:text-[white] [&.focus-notice_>_span]:[background:#7265d8]', '[&.focus-notice_strong]:text-[13px]', '[&.focus-notice_p]:m-[2px_0_0] [&.focus-notice_p]:text-(--label-secondary) [&.focus-notice_p]:text-[12px]',
        )}>
          <span>
            <Moon size={18} fill='currentColor' />
          </span>
          <div>
            <strong>Do Not Disturb</strong>
            <p>Notifications are silenced.</p>
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          `notification${doNotDisturb ? ' is-silenced' : ''}`,
          '[&.notification]:flex [&.notification]:gap-2.5 [&.notification]:mt-2.25 [&.notification]:p-3 [&.notification]:rounded-[15px] [&.notification]:[background:var(--glass-regular)] [&.notification]:[backdrop-filter:blur(38px)_saturate(1.45)] [&.notification]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_8px_20px_oklch(0.08_0.03_245/0.2)] [&.notification]:[-webkit-backdrop-filter:blur(38px)_saturate(1.45)]', '[&.notification_div]:relative [&.notification_div]:flex-1', '[&.notification_small]:absolute [&.notification_small]:top-0 [&.notification_small]:right-0 [&.notification_small]:text-[oklch(0.5_0.01_250)]', '[&.notification_p]:m-[4px_0_0] [&.notification_p]:text-[12px] [&.notification_p]:leading-[1.35]', '[&.notification.is-silenced]:opacity-[0.64]',
        )}>
        <span className='notification-icon [&.notification-icon]:w-8.5 [&.notification-icon]:h-8.5 [&.notification-icon]:flex-[0_0_34px] [&.notification-icon]:grid [&.notification-icon]:place-items-center [&.notification-icon]:rounded-lg [&.notification-icon]:text-[white] [&.notification-icon]:[background:linear-gradient(145deg,oklch(0.72_0.19_75),oklch(0.58_0.22_330))]'>
          <Sparkles size={18} />
        </span>
        <div>
          <strong>Portfolio</strong>
          <small>Now</small>
          <p>Welcome. Double-click a file or choose an app from the Dock.</p>
        </div>
      </div>
      <div
        className={cn(
          `notification${doNotDisturb ? ' is-silenced' : ''}`,
          '[&.notification]:flex [&.notification]:gap-2.5 [&.notification]:mt-2.25 [&.notification]:p-3 [&.notification]:rounded-[15px] [&.notification]:[background:var(--glass-regular)] [&.notification]:[backdrop-filter:blur(38px)_saturate(1.45)] [&.notification]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_8px_20px_oklch(0.08_0.03_245/0.2)] [&.notification]:[-webkit-backdrop-filter:blur(38px)_saturate(1.45)]', '[&.notification_div]:relative [&.notification_div]:flex-1', '[&.notification_small]:absolute [&.notification_small]:top-0 [&.notification_small]:right-0 [&.notification_small]:text-[oklch(0.5_0.01_250)]', '[&.notification_p]:m-[4px_0_0] [&.notification_p]:text-[12px] [&.notification_p]:leading-[1.35]', '[&.notification.is-silenced]:opacity-[0.64]',
        )}>
        <span className={cn(
          'notification-icon',
          'notification-icon--messages',
          '[&.notification-icon]:w-8.5 [&.notification-icon]:h-8.5 [&.notification-icon]:flex-[0_0_34px] [&.notification-icon]:grid [&.notification-icon]:place-items-center [&.notification-icon]:rounded-lg [&.notification-icon]:text-[white] [&.notification-icon]:[background:linear-gradient(145deg,oklch(0.72_0.19_75),oklch(0.58_0.22_330))]', '[&.notification-icon--messages]:[background:oklch(0.68_0.22_145)]',
        )}>
          <MessageCircle size={18} />
        </span>
        <div>
          <strong>Messages</strong>
          <small>10m ago</small>
          <p>There’s always room for another good idea.</p>
        </div>
      </div>
    </aside>
  );
}

function Spotlight({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => launchpadApps.filter((app) => app.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <div className='spotlight [&.spotlight]:fixed [&.spotlight]:z-800 [&.spotlight]:rounded-[14px] [&.spotlight]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.spotlight]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.spotlight]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.spotlight]:top-[18%] [&.spotlight]:left-[50%] [&.spotlight]:w-[min(680px,calc(100vw-30px))] [&.spotlight]:overflow-hidden [&.spotlight]:transform-[translateX(-50%)] [&.spotlight]:animate-[spotlight-in_160ms_var(--ease-mac)_both] [&.spotlight]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[background:var(--material-menu)]'>
      <div className='spotlight-search [&.spotlight-search]:h-18 [&.spotlight-search]:flex [&.spotlight-search]:items-center [&.spotlight-search]:gap-3.25 [&.spotlight-search]:p-[0_20px] [&.spotlight-search_input]:min-w-0 [&.spotlight-search_input]:flex-1 [&.spotlight-search_input]:[border:0] [&.spotlight-search_input]:[outline:0] [&.spotlight-search_input]:[background:transparent] [&.spotlight-search_input]:text-[23px]'>
        <Search size={25} />
        <input
          autoFocus
          placeholder='Spotlight Search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={cn(
        'spotlight-results',
        '[&.spotlight-results]:max-h-82.5 [&.spotlight-results]:p-[0_8px_8px] [&.spotlight-results]:overflow-auto [&.spotlight-results]:[border-top:1px_solid_var(--separator)] [&.spotlight-results]:border-t-[oklch(0.34_0.01_250/0.15)]', '[&.spotlight-results_button]:w-full [&.spotlight-results_button]:h-14.5 [&.spotlight-results_button]:flex [&.spotlight-results_button]:items-center [&.spotlight-results_button]:gap-3 [&.spotlight-results_button]:p-[7px_10px] [&.spotlight-results_button]:[border:0] [&.spotlight-results_button]:rounded-lg [&.spotlight-results_button]:[background:transparent] [&.spotlight-results_button]:text-left', '[&.spotlight-results_button:hover]:text-[white] [&.spotlight-results_button:hover]:[background:var(--system-blue-deep)]', '[&.spotlight-results_button_>_span:nth-child(2)]:flex [&.spotlight-results_button_>_span:nth-child(2)]:flex-1 [&.spotlight-results_button_>_span:nth-child(2)]:flex-col', '[&.spotlight-results_small]:opacity-[0.65]', '[&.spotlight-results_kbd]:font-[inherit] [&.spotlight-results_kbd]:opacity-[0.6]',
      )}>
        {results.map((app) => (
          <button
            type='button'
            key={app.id}
            onClick={() => {
              openApp(app.id);
              close();
            }}>
            <AppIcon app={app.id} size={38} />
            <span>
              <strong>{app.label}</strong>
              <small>Application</small>
            </span>
            <kbd>↵</kbd>
          </button>
        ))}
      </div>
    </div>
  );
}

function Launchpad({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return (
    <div className={cn(
      'launchpad',
      '[&.launchpad]:fixed [&.launchpad]:inset-[24px_0_0] [&.launchpad]:z-600 [&.launchpad]:pt-[8vh] [&.launchpad]:text-[white] [&.launchpad]:[background:oklch(0.12_0.04_245/0.55)] [&.launchpad]:[backdrop-filter:blur(38px)_saturate(1.15)] [&.launchpad]:animate-[launchpad-in_220ms_var(--ease-mac)_both]', '[&.launchpad_>_label]:w-57.5 [&.launchpad_>_label]:h-7 [&.launchpad_>_label]:flex [&.launchpad_>_label]:items-center [&.launchpad_>_label]:gap-2 [&.launchpad_>_label]:m-[0_auto_55px] [&.launchpad_>_label]:p-[0_10px] [&.launchpad_>_label]:rounded-[7px] [&.launchpad_>_label]:[background:oklch(1_0_0/0.2)] [&.launchpad_>_label]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.25)]', '[&.launchpad_label_input]:min-w-0 [&.launchpad_label_input]:flex-1 [&.launchpad_label_input]:[border:0] [&.launchpad_label_input]:[outline:0] [&.launchpad_label_input]:text-[white] [&.launchpad_label_input]:[background:transparent] [&.launchpad_label_input]:text-center', '[&.launchpad_label_input::placeholder]:text-[oklch(1_0_0/0.7)]',
    )}>
      <label>
        <Search size={16} />
        <input autoFocus placeholder='Search' />
      </label>
      <div className={cn(
        'launchpad-grid',
        '[&.launchpad-grid_button]:[transition-property:scale] [&.launchpad-grid_button]:duration-120 [&.launchpad-grid_button]:ease-[ease-out] [&.launchpad-grid_button]:flex [&.launchpad-grid_button]:flex-col [&.launchpad-grid_button]:items-center [&.launchpad-grid_button]:gap-2.25 [&.launchpad-grid_button]:[border:0] [&.launchpad-grid_button]:text-[white] [&.launchpad-grid_button]:[background:transparent] [&.launchpad-grid_button]:[text-shadow:0_2px_5px_oklch(0.1_0.03_245/0.5)]', '[&.launchpad-grid_button:active]:scale-[0.96]', '[&.launchpad-grid]:max-w-185 [&.launchpad-grid]:m-auto [&.launchpad-grid]:grid [&.launchpad-grid]:grid-cols-[repeat(4,1fr)] [&.launchpad-grid]:gap-[44px_80px]', '[&.launchpad-grid_button:hover_.app-icon]:transform-[scale(1.07)]', '[&.launchpad-grid_.app-icon]:[transition:transform_150ms_var(--ease-mac)]', 'max-[900px]:[&.launchpad-grid]:max-w-130 max-[900px]:[&.launchpad-grid]:grid-cols-[repeat(4,1fr)] max-[900px]:[&.launchpad-grid]:gap-8.75', 'max-[600px]:[&.launchpad-grid]:grid-cols-[repeat(3,1fr)] max-[600px]:[&.launchpad-grid]:gap-[32px_22px]', 'max-[600px]:[&.launchpad-grid_.app-icon]:[--icon-size:62px]!',
      )}>
        {launchpadApps.map((app) => (
          <button
            type='button'
            key={app.id}
            onClick={() => {
              openApp(app.id);
              close();
            }}>
            <AppIcon app={app.id} size={72} />
            <span>{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BootScreen() {
  return (
    <main
      className={cn(
        'boot-screen',
        '[&.boot-screen]:fixed [&.boot-screen]:inset-0 [&.boot-screen]:z-3000 [&.boot-screen]:w-full [&.boot-screen]:h-full [&.boot-screen]:[border:0] [&.boot-screen]:text-[white] [&.boot-screen]:[background:#000] [&.boot-screen]:grid [&.boot-screen]:place-content-center [&.boot-screen]:justify-items-center [&.boot-screen]:gap-12.5', '[&.boot-screen_>_svg]:w-15.5 [&.boot-screen_>_svg]:h-15.5 [&.boot-screen_>_svg]:fill-[currentColor]',
      )}
      aria-label='macOS is starting'>
      <AppleMark />
      <div
        className='boot-progress [&.boot-progress]:w-45 [&.boot-progress]:h-1 [&.boot-progress]:overflow-hidden [&.boot-progress]:rounded-[999px] [&.boot-progress]:[background:oklch(0.38_0_0)]'
        role='progressbar'
        aria-label='Starting macOS'
        aria-valuemin={0}
        aria-valuemax={100}>
        <span className='boot-progress__fill [&.boot-progress\\_\\_fill]:block [&.boot-progress\\_\\_fill]:w-full [&.boot-progress\\_\\_fill]:h-full [&.boot-progress\\_\\_fill]:rounded-[inherit] [&.boot-progress\\_\\_fill]:[background:white] [&.boot-progress\\_\\_fill]:transform-[scaleX(0)] [&.boot-progress\\_\\_fill]:origin-[left] [&.boot-progress\\_\\_fill]:animate-[boot-progress-fill_2s_linear_forwards]' />
      </div>
    </main>
  );
}

function SleepScreen({ wake }: { wake: () => void }) {
  return (
    <button
      type='button'
      className={cn(
        'sleep-screen',
        '[&.sleep-screen]:fixed [&.sleep-screen]:inset-0 [&.sleep-screen]:z-3000 [&.sleep-screen]:w-full [&.sleep-screen]:h-full [&.sleep-screen]:[border:0] [&.sleep-screen]:text-[white] [&.sleep-screen]:[background:#000] [&.sleep-screen]:grid [&.sleep-screen]:[place-items:end_center] [&.sleep-screen]:pb-9 [&.sleep-screen]:cursor-default', '[&.sleep-screen_span]:text-[oklch(1_0_0/0.42)] [&.sleep-screen_span]:text-[12px] [&.sleep-screen_span]:opacity-[0] [&.sleep-screen_span]:[transition:opacity_180ms_var(--ease-mac)]', '[&.sleep-screen:hover_span]:opacity-[1]',
      )}
      aria-label='Wake Mac'
      onClick={wake}>
      <span>Click to wake</span>
    </button>
  );
}

function ShutdownScreen({ powerOn }: { powerOn: () => void }) {
  return (
    <main className={cn(
      'shutdown-screen',
      '[&.shutdown-screen]:fixed [&.shutdown-screen]:inset-0 [&.shutdown-screen]:z-3000 [&.shutdown-screen]:w-full [&.shutdown-screen]:h-full [&.shutdown-screen]:[border:0] [&.shutdown-screen]:text-[white] [&.shutdown-screen]:[background:#000] [&.shutdown-screen]:grid [&.shutdown-screen]:place-items-center', '[&.shutdown-screen_button]:flex [&.shutdown-screen_button]:flex-col [&.shutdown-screen_button]:items-center [&.shutdown-screen_button]:gap-3 [&.shutdown-screen_button]:[border:0] [&.shutdown-screen_button]:text-[oklch(1_0_0/0.78)] [&.shutdown-screen_button]:[background:transparent]', '[&.shutdown-screen_svg]:w-10 [&.shutdown-screen_svg]:h-10 [&.shutdown-screen_svg]:fill-[currentColor]', '[&.shutdown-screen_span]:text-[12px]',
    )}>
      <button type='button' onClick={powerOn}>
        <AppleMark />
        <span>Start Up</span>
      </button>
    </main>
  );
}

function LoginScreen({ enter }: { enter: () => void }) {
  const now = useClock();
  return (
    <button
      type='button'
      className='login-screen [&.login-screen]:absolute [&.login-screen]:inset-0 [&.login-screen]:z-1000 [&.login-screen]:w-full [&.login-screen]:h-full [&.login-screen]:flex [&.login-screen]:flex-col [&.login-screen]:items-center [&.login-screen]:[border:0] [&.login-screen]:text-[white] [&.login-screen]:[background:oklch(0.12_0.04_245/0.22)] [&.login-screen]:[backdrop-filter:blur(11px)_saturate(0.9)] [&.login-screen]:[text-shadow:0_2px_12px_oklch(0.08_0.03_245/0.4)] [&.login-screen]:cursor-default [&.login-screen]:animate-[login-in_500ms_ease-out_both]'
      onClick={enter}
      aria-label='Click to enter portfolio'>
      <div className={cn(
        'login-time',
        '[&.login-time]:flex [&.login-time]:flex-col [&.login-time]:items-center [&.login-time]:mt-[17vh]', '[&.login-time_span]:text-[22px] [&.login-time_span]:font-[550]', '[&.login-time_strong]:mt-0.75 [&.login-time_strong]:text-[clamp(4.5rem,8vw,6rem)] [&.login-time_strong]:leading-none [&.login-time_strong]:tracking-[-0.04em] [&.login-time_strong]:font-[650] [&.login-time_strong]:[font-variant-numeric:tabular-nums]', 'max-[600px]:[&.login-time_span]:text-[18px]',
      )}>
        <span>
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <strong>
          {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </strong>
      </div>
      <div className={cn(
        'login-user',
        '[&.login-user]:flex [&.login-user]:flex-col [&.login-user]:items-center [&.login-user]:mt-auto [&.login-user]:mb-[12vh]', '[&.login-user_strong]:text-[15px]', '[&.login-user_small]:mt-2 [&.login-user_small]:text-[13px]',
      )}>
        <span className='login-avatar [&.login-avatar]:w-24 [&.login-avatar]:h-24 [&.login-avatar]:grid [&.login-avatar]:place-items-center [&.login-avatar]:mb-2.5 [&.login-avatar]:rounded-[50%] [&.login-avatar]:text-[white] [&.login-avatar]:[background:linear-gradient(145deg,oklch(0.75_0.17_70),oklch(0.48_0.18_245))] [&.login-avatar]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.45),0_9px_28px_oklch(0.08_0.03_245/0.25)] [&.login-avatar]:text-[34px] [&.login-avatar]:font-[650]'>
          R
        </span>
        <strong>Renan</strong>
        <small>Click to log in</small>
      </div>
    </button>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windows, dispatch] = useReducer(windowReducer, [initialWindow]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [dark, setDark] = useState(false);
  const [accentColor, setAccentColorState] = useState<AccentColorId>(readAccentColor);
  const [lowPower, setLowPower] = useState(false);
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId>('appearance');
  const [finderPreferences, setFinderPreferences] =
    useState<FinderPreferences>(readFinderPreferences);
  const [systemPreferences, setSystemPreferences] =
    useState<SystemPreferences>(readSystemPreferences);
  const [brightness, setBrightnessState] = useState(readBrightness);
  const [selectedNoteId, setSelectedNoteId] = useState<NoteId>('welcome');
  const [completedTasks, setCompletedTasks] = useState<TodayTaskId[]>(readCompletedTasks);
  const [showDesktop, setShowDesktop] = useState(false);
  const [finderSection, setFinderSection] = useState('Portfolio');
  const [selectedDesktopFile, setSelectedDesktopFile] = useState<DesktopFileId | null>(null);
  const [bootMode, setBootMode] = useState<BootMode>('startup');
  const [powerState, setPowerState] = useState<PowerState>('awake');
  const [systemDialog, setSystemDialog] = useState<SystemDialog>(null);

  const activeWindow = [...windows]
    .filter((window) => !window.minimized)
    .sort((a, b) => b.z - a.z)[0];
  const fullscreenWindow = windows.find((window) => window.maximized && !window.minimized);
  const activeApp = activeWindow?.app ?? 'finder';
  const accent = ACCENT_COLORS[accentColor];
  const desktopStyle = {
    '--system-blue': accent.color,
    '--system-blue-deep': accent.deep,
    '--keyboard-focus': accent.color,
    '--link-color': accent.deep,
  } as CSSProperties;
  const openApp = useCallback((app: AppId) => {
    setShowDesktop(false);
    dispatch({ type: 'open', app });
    setOverlay(null);
  }, []);
  const openSettings = useCallback(
    (section: SettingsSectionId) => {
      setSettingsSection(section);
      openApp('settings');
    },
    [openApp],
  );
  const launch = useCallback(
    (app: DockId) => {
      setShowDesktop(false);
      if (app === 'launchpad') return setOverlay(overlay === 'launchpad' ? null : 'launchpad');
      if (app === 'mail') return openApp('messages');
      if (app === 'trash') {
        setFinderSection('Trash');
        return openApp('finder');
      }
      openApp(app);
    },
    [openApp, overlay],
  );
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const updateFinderPreferences = useCallback(
    (patch: Partial<FinderPreferences>) => {
      const next = { ...finderPreferences, ...patch };
      setFinderPreferences(next);
      try {
        globalThis.localStorage?.setItem('macos27:finder-preferences', JSON.stringify(next));
      } catch {
        /* Keep the in-memory preference. */
      }
    },
    [finderPreferences],
  );
  const updateSystemPreferences = useCallback(
    (patch: Partial<SystemPreferences>) => {
      const next = { ...systemPreferences, ...patch };
      setSystemPreferences(next);
      try {
        globalThis.localStorage?.setItem('macos27:system-preferences', JSON.stringify(next));
      } catch {
        /* Keep the in-memory preference. */
      }
    },
    [systemPreferences],
  );
  const setBrightness = useCallback((value: number) => {
    setBrightnessState(value);
    try {
      globalThis.localStorage?.setItem('macos27:display-brightness', String(value));
    } catch {
      /* Keep the in-memory brightness. */
    }
  }, []);
  const updateAccentColor = useCallback((value: AccentColorId) => {
    setAccentColorState(value);
    try {
      globalThis.localStorage?.setItem('macos27:accent-color', value);
    } catch {
      /* Keep the in-memory accent. */
    }
  }, []);
  const toggleTask = useCallback(
    (taskId: TodayTaskId) => {
      const next = completedTasks.includes(taskId)
        ? completedTasks.filter((id) => id !== taskId)
        : [...completedTasks, taskId];
      setCompletedTasks(next);
      try {
        globalThis.localStorage?.setItem('macos27:today-completed', JSON.stringify(next));
      } catch {
        /* Keep the in-memory checklist. */
      }
    },
    [completedTasks],
  );
  const openNote = useCallback(
    (noteId: NoteId) => {
      setSelectedNoteId(noteId);
      openApp('notes');
    },
    [openApp],
  );
  const minimizeActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) dispatch({ type: 'minimize', id: activeWindow.id });
    setOverlay(null);
  };
  const maximizeActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) dispatch({ type: 'toggleMaximize', id: activeWindow.id });
    setOverlay(null);
  };
  const focusActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) dispatch({ type: 'focus', id: activeWindow.id });
    setOverlay(null);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Space') {
        event.preventDefault();
        setOverlay((current) => (current === 'spotlight' ? null : 'spotlight'));
      }
      if (event.key === 'Escape') {
        setOverlay(null);
        setShowDesktop(false);
      }
    };
    globalThis.addEventListener('keydown', onKeyDown);
    return () => globalThis.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!bootMode) return;
    const timer = globalThis.setTimeout(() => setBootMode(null), 2000);
    return () => globalThis.clearTimeout(timer);
  }, [bootMode]);

  if (bootMode) return <BootScreen />;
  if (powerState === 'sleeping') return <SleepScreen wake={() => setPowerState('awake')} />;
  if (powerState === 'shutdown')
    return (
      <ShutdownScreen
        powerOn={() => {
          setPowerState('awake');
          setBootMode('startup');
        }}
      />
    );

  const revealableWindows = windows.filter((window) => !window.minimized && !window.maximized);
  const revealEdgeByWindow = new Map(
    revealableWindows.map((window, index) => [
      window.id,
      DESKTOP_REVEAL_EDGES[index % DESKTOP_REVEAL_EDGES.length],
    ]),
  );
  const revealIndexByWindow = new Map(revealableWindows.map((window, index) => [window.id, index]));

  const onDesktopPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    setOverlay(null);
    if (event.target !== event.currentTarget) return;
    setSelectedDesktopFile(null);
    if (fullscreenWindow || revealableWindows.length === 0) return;
    setShowDesktop((current) => !current);
  };

  return (
    <main
      className={cn(
        `desktop${dark ? ' desktop--dark' : ''}${fullscreenWindow ? ' desktop--fullscreen' : ''}${showDesktop ? ' desktop--showing-desktop' : ''}${systemPreferences.dockAutoHide ? ' desktop--dock-autohide' : ''}`,
        "[&.desktop]:relative [&.desktop]:w-full [&.desktop]:h-full [&.desktop]:min-w-[320px] [&.desktop]:overflow-hidden [&.desktop]:isolate [&.desktop]:[background:oklch(0.36_0.09_231)_url('/wallpaper-tahoe-day.jpg')_center/cover_no-repeat] [&.desktop]:[user-select:none] [&.desktop]:text-(--label-primary) [&.desktop]:scheme-light", "[&.desktop::before]:[content:''] [&.desktop::before]:absolute [&.desktop::before]:inset-0 [&.desktop::before]:z-[-1] [&.desktop::before]:[background:oklch(0.08_0.03_245/0)] [&.desktop::before]:pointer-events-none [&.desktop::before]:[transition:background_240ms_var(--ease-mac)]", "[&.desktop:not(.desktop--showing-desktop)_.app-window]:delay-[0ms]", "contrast-more:[&.desktop]:[--separator:oklch(0.25_0.008_250/0.54)] contrast-more:[&.desktop]:[--glass-stroke:oklch(1_0_0/0.72)]", "[&.desktop--dark::before]:[background:oklch(0.08_0.03_245/0.46)]", "[&.desktop--dark_.menu-bar]:text-[white] [&.desktop--dark_.menu-bar]:[background:linear-gradient(180deg,oklch(1_0_0/0.045),transparent_42%),var(--glass-clear)] [&.desktop--dark_.menu-bar]:[--control-center-knob:oklch(0.13_0.008_250)]", "[&.desktop--dark_.widget]:text-[white] [&.desktop--dark_.widget]:[background:oklch(0.19_0.01_250/0.78)]", "[&.desktop--dark_.widget_small]:text-[oklch(0.8_0.01_250)]", "[&.desktop--dark_.widget-heading-button_>_span]:text-[oklch(0.8_0.12_235)]", "[&.desktop--dark_.widget--today_label.is-complete_>_span]:text-[oklch(0.68_0.01_250)]", "[&.desktop--dark_.app-window]:[--glass-strong:var(--material-content)] [&.desktop--dark_.app-window]:text-(--label-primary) [&.desktop--dark_.app-window]:[background:var(--material-content)] [&.desktop--dark_.app-window]:[box-shadow:0_26px_64px_oklch(0.01_0.005_250/0.58),0_5px_18px_oklch(0.01_0.005_250/0.42),inset_0_0_0_1px_var(--glass-stroke)]", "[&.desktop--dark_.window-titlebar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]", "[&.desktop--dark_.finder-sidebar]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]", "[&.desktop--dark_.finder-content]:text-(--label-primary) [&.desktop--dark_.finder-content]:[background:var(--material-content)]", "[&.desktop--dark_.dock]:[background:linear-gradient(145deg,oklch(1_0_0/0.1),oklch(0.12_0.02_250/0.1)),var(--glass-clear)]", "[&.desktop--dark_.dock-item_>_i]:[background:white]", "[&.desktop--dark]:[--system-blue:#0091ff] [&.desktop--dark]:[--system-blue-deep:#087bd9] [&.desktop--dark]:[--label-primary:oklch(0.955_0.004_250)] [&.desktop--dark]:[--label-secondary:oklch(0.75_0.006_250)] [&.desktop--dark]:[--label-tertiary:oklch(0.61_0.006_250)] [&.desktop--dark]:[--label-quaternary:oklch(0.5_0.006_250)] [&.desktop--dark]:[--window-frame-text:var(--label-primary)] [&.desktop--dark]:[--text-color:var(--label-primary)] [&.desktop--dark]:[--placeholder-text:var(--label-tertiary)] [&.desktop--dark]:[--disabled-control-text:oklch(0.7_0.005_250/0.48)] [&.desktop--dark]:[--window-background:oklch(0.17_0.007_250)] [&.desktop--dark]:[--control-background:oklch(1_0_0/0.1)] [&.desktop--dark]:[--text-background:oklch(0.135_0.006_250)] [&.desktop--dark]:[--under-page-background:oklch(0.1_0.006_250)] [&.desktop--dark]:[--control-hover:oklch(1_0_0/0.16)] [&.desktop--dark]:[--control-active:oklch(1_0_0/0.22)] [&.desktop--dark]:[--unemphasized-selection:oklch(0.38_0.008_250/0.78)] [&.desktop--dark]:[--selected-control-text:white] [&.desktop--dark]:[--keyboard-focus:#5cb8ff] [&.desktop--dark]:[--link-color:#5ac8fa] [&.desktop--dark]:[--ink:var(--label-primary)] [&.desktop--dark]:[--muted:var(--label-secondary)] [&.desktop--dark]:[--glass-clear:oklch(0.15_0.014_250/0.48)] [&.desktop--dark]:[--glass-regular:oklch(0.18_0.009_250/0.82)] [&.desktop--dark]:[--material-titlebar:oklch(0.19_0.008_250/0.94)] [&.desktop--dark]:[--material-toolbar:oklch(0.19_0.008_250/0.92)] [&.desktop--dark]:[--material-sidebar:oklch(0.17_0.009_250/0.9)] [&.desktop--dark]:[--material-menu:oklch(0.19_0.008_250/0.9)] [&.desktop--dark]:[--material-popover:oklch(0.2_0.008_250/0.94)] [&.desktop--dark]:[--material-content:var(--text-background)] [&.desktop--dark]:[--material-raised:oklch(0.22_0.007_250/0.98)] [&.desktop--dark]:[--material-status:oklch(0.19_0.006_250/0.96)] [&.desktop--dark]:[--glass-highlight:oklch(1_0_0/0.13)] [&.desktop--dark]:[--glass-stroke:oklch(1_0_0/0.16)] [&.desktop--dark]:[--separator:oklch(0.78_0.01_250/0.2)] [&.desktop--dark]:text-(--label-primary) [&.desktop--dark]:scheme-dark", "[&.desktop--dark_.app-window::before]:[background:linear-gradient(90deg,transparent,oklch(1_0_0/0.12)_18%,oklch(1_0_0/0.12)_82%,transparent)]", "[&.desktop--dark_.app-window.is-inactive]:filter-[saturate(0.65)_brightness(0.92)]", "[&.desktop--dark_.app-window.is-inactive_.window-titlebar]:text-[oklch(0.65_0.008_250)] [&.desktop--dark_.app-window.is-inactive_.window-titlebar]:[background:oklch(0.18_0.008_250/0.94)]", "[&.desktop--dark_.app-window.is-inactive_.traffic]:[background:oklch(0.39_0.008_250)]", "[&.desktop--dark_.finder-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]", "[&.desktop--dark_.safari-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]", "[&.desktop--dark_.notes-list]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]", "[&.desktop--dark_.photos-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]", "[&.desktop--dark_.settings-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]", "[&.desktop--dark_.messages-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]", "[&.desktop--dark_.finder-files]:text-(--label-primary) [&.desktop--dark_.finder-files]:[background:var(--material-content)]", "[&.desktop--dark_.notes-app]:text-(--label-primary) [&.desktop--dark_.notes-app]:[background:var(--material-content)]", "[&.desktop--dark_.note-editor]:text-(--label-primary) [&.desktop--dark_.note-editor]:[background:var(--material-content)]", "[&.desktop--dark_.photos-app]:text-(--label-primary) [&.desktop--dark_.photos-app]:[background:var(--material-content)]", "[&.desktop--dark_.photos-app_main]:text-(--label-primary) [&.desktop--dark_.photos-app_main]:[background:var(--material-content)]", "[&.desktop--dark_.messages-app]:text-(--label-primary) [&.desktop--dark_.messages-app]:[background:var(--material-content)]", "[&.desktop--dark_.messages-app_main]:text-(--label-primary) [&.desktop--dark_.messages-app_main]:[background:var(--material-content)]", "[&.desktop--dark_.settings-app]:text-(--label-primary) [&.desktop--dark_.settings-app]:[background:var(--material-content)]", "[&.desktop--dark_.settings-app_main]:text-(--label-primary) [&.desktop--dark_.settings-app_main]:[background:var(--material-content)]", "[&.desktop--dark_.about-app]:text-(--label-primary) [&.desktop--dark_.about-app]:[background:var(--material-content)]", "[&.desktop--dark_.finder-status]:text-(--label-secondary) [&.desktop--dark_.finder-status]:[background:var(--material-status)]", "[&.desktop--dark_.finder-toolbar-popover]:text-(--label-primary) [&.desktop--dark_.finder-toolbar-popover]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-popover)]", "[&.desktop--dark_.finder-toolbar-popover_button:hover]:text-(--label-primary) [&.desktop--dark_.finder-toolbar-popover_button:hover]:[background:var(--control-hover)] [&.desktop--dark_.finder-toolbar-popover_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.13)]", "[&.desktop--dark_.finder-preview]:text-(--label-primary) [&.desktop--dark_.finder-preview]:[background:var(--material-raised)]", "[&.desktop--dark_.finder-files--list_.finder-item:nth-child(even)]:[background:oklch(1_0_0/0.035)]", "[&.desktop--dark_.finder-files--gallery]:[background:linear-gradient(180deg,var(--material-content),var(--under-page-background))]", "[&.desktop--dark_.finder-files--gallery_.finder-item]:[background:var(--material-raised)]", "[&.desktop--dark_.settings-app_section]:[background:var(--material-raised)]", "[&.desktop--dark_.finder-sidebar_button.selected]:text-[white] [&.desktop--dark_.finder-sidebar_button.selected]:[background:oklch(0.56_0.16_247/0.68)]", "[&.desktop--dark_.photos-app_aside_button.selected]:text-[white] [&.desktop--dark_.photos-app_aside_button.selected]:[background:oklch(0.56_0.16_247/0.68)]", "[&.desktop--dark_.finder-search]:text-[white] [&.desktop--dark_.finder-search]:[background:oklch(1_0_0/0.09)]", "[&.desktop--dark_.address-bar]:text-[white] [&.desktop--dark_.address-bar]:[background:oklch(1_0_0/0.09)]", "[&.desktop--dark_.help-search]:text-[white] [&.desktop--dark_.help-search]:[background:oklch(1_0_0/0.09)]", "[&.desktop--dark_.messages-app_form_input]:text-[white] [&.desktop--dark_.messages-app_form_input]:[background:oklch(1_0_0/0.09)]", "[&.desktop--dark_.view-switcher]:[background:oklch(1_0_0/0.08)]", "[&.desktop--dark_.view-switcher_button.selected]:[background:oklch(1_0_0/0.16)]", "[&.desktop--dark_.dock-tooltip]:text-[oklch(0.96_0.004_250)] [&.desktop--dark_.dock-tooltip]:[background:oklch(0.19_0.008_250/0.94)] [&.desktop--dark_.dock-tooltip]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.16),0_5px_12px_oklch(0.01_0.01_250/0.4)]", "[&.desktop--dark_.control-grid_button]:bg-[oklch(1_0_0/0.1)] [&.desktop--dark_.control-grid_button]:text-(--label-primary) [&.desktop--dark_.control-grid_button]:bg-[linear-gradient(145deg,oklch(1_0_0/0.1),oklch(1_0_0/0)_62%)]", "[&.desktop--dark_.slider-control]:bg-[oklch(1_0_0/0.1)]", "[&.desktop--dark_.system-menu]:text-(--label-primary) [&.desktop--dark_.system-menu]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]", "[&.desktop--dark_.control-center]:text-(--label-primary) [&.desktop--dark_.control-center]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]", "[&.desktop--dark_.spotlight]:text-(--label-primary) [&.desktop--dark_.spotlight]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]", "[&.desktop--dark_.control-grid_button:hover]:text-[oklch(0.98_0_0)] [&.desktop--dark_.control-grid_button:hover]:bg-[oklch(1_0_0/0.17)] [&.desktop--dark_.control-grid_button:hover]:bg-[linear-gradient(145deg,oklch(1_0_0/0.1),oklch(1_0_0/0)_62%)] [&.desktop--dark_.control-grid_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.18),inset_0_1px_oklch(1_0_0/0.2),0_5px_13px_oklch(0.02_0.01_250/0.2)]", "[&.desktop--dark_.bubble]:text-[white] [&.desktop--dark_.bubble]:[background:oklch(0.28_0.01_250)]", "[&.desktop--dark_.bubble--sent]:[background:var(--system-blue-deep)]", "[&.desktop--dark_.sidebar-heading]:text-(--label-secondary)", "[&.desktop--dark_.settings-user_small]:text-(--label-secondary)", "[&.desktop--dark_.settings-list_small]:text-(--label-secondary)", "[&.desktop--dark_.note-row_span]:text-(--label-secondary)", "[&.desktop--dark_.note-row_p]:text-(--label-secondary)", "[&.desktop--dark_.note-editor_time]:text-(--label-secondary)", "[&.desktop--dark_.photos-heading_p]:text-(--label-secondary)", "[&.desktop--dark_.messages-app_main_header_small]:text-(--label-secondary)", "[&.desktop--dark_.conversation_time]:text-(--label-secondary)", "[&.desktop--dark_.finder-item\\_\\_metadata]:text-(--label-secondary)", "contrast-more:[&.desktop--dark]:[--separator:oklch(0.9_0.004_250/0.42)] contrast-more:[&.desktop--dark]:[--glass-stroke:oklch(1_0_0/0.32)]", "[&.desktop--fullscreen_.menu-bar]:hidden", "[&.desktop--fullscreen_.dock]:hidden", "[&.desktop--fullscreen_.dock-hotzone]:hidden", "[&.desktop--dock-autohide_.dock]:opacity-[0] [&.desktop--dock-autohide_.dock]:pointer-events-none [&.desktop--dock-autohide_.dock]:transform-[translate3d(-50%,calc(100%+18px),0)] [&.desktop--dock-autohide_.dock]:ease-[ease-in,ease-in]", "[&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:opacity-[1] [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:pointer-events-auto [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:ease-[ease-out,var(--ease-mac)]", "[&.desktop--dock-autohide_.dock:hover]:opacity-[1] [&.desktop--dock-autohide_.dock:hover]:pointer-events-auto [&.desktop--dock-autohide_.dock:hover]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock:hover]:ease-[ease-out,var(--ease-mac)]", "[&.desktop--dock-autohide_.dock:focus-within]:opacity-[1] [&.desktop--dock-autohide_.dock:focus-within]:pointer-events-auto [&.desktop--dock-autohide_.dock:focus-within]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock:focus-within]:ease-[ease-out,var(--ease-mac)]", "[&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:transform-(--desktop-reveal-transform)! [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:filter-[saturate(0.82)_brightness(0.94)] [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:pointer-events-none [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:delay-[calc(var(--desktop-reveal-index,0)*16ms)] [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:will-change-[transform,filter]", "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='left']]:transform-[translate3d(calc(-100%+44px),0,0)]!", "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='right']]:transform-[translate3d(calc(100%-44px),0,0)]!", "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='top']]:transform-[translate3d(0,calc(-100%+44px),0)]!", "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='bottom']]:transform-[translate3d(0,calc(100%-44px),0)]!", "motion-reduce:[&.desktop--showing-desktop_.app-window]:delay-[0ms]!",
      )}
      style={desktopStyle}
      onPointerDown={onDesktopPointerDown}>
      {!loggedIn ? (
        <LoginScreen enter={() => setLoggedIn(true)} />
      ) : (
        <>
          <DesktopWidgets
            windows={windows}
            dark={dark}
            lowPower={lowPower}
            brightness={brightness}
            completedTasks={completedTasks}
            onToggleTask={toggleTask}
            onOpenNote={openNote}
            openSettings={() => openSettings('appearance')}
          />
          <DesktopFiles
            openApp={openApp}
            selectedFile={selectedDesktopFile}
            onSelectFile={setSelectedDesktopFile}
          />
          {windows.map((window) => (
            <MemoAppWindow
              key={window.id}
              window={window}
              active={window.id === activeWindow?.id}
              dispatch={dispatch}
              openApp={openApp}
              dark={dark}
              setDark={setDark}
              accentColor={accentColor}
              setAccentColor={updateAccentColor}
              settingsSection={settingsSection}
              setSettingsSection={setSettingsSection}
              lowPower={lowPower}
              setLowPower={setLowPower}
              systemPreferences={systemPreferences}
              updateSystemPreferences={updateSystemPreferences}
              finderPreferences={finderPreferences}
              updateFinderPreferences={updateFinderPreferences}
              finderSection={finderSection}
              setFinderSection={setFinderSection}
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              completedTasks={completedTasks}
              onToggleTask={toggleTask}
              desktopRevealed={showDesktop}
              revealEdge={revealEdgeByWindow.get(window.id) ?? 'left'}
              revealIndex={revealIndexByWindow.get(window.id) ?? 0}
            />
          ))}
          <MenuBar
            activeApp={activeApp}
            overlay={overlay}
            onOverlay={setOverlay}
            lowPower={lowPower}
            doNotDisturb={systemPreferences.doNotDisturb}
            setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })}
          />
          {overlay === 'apple' ? (
            <AppleMenu
              openApp={openApp}
              openSettings={() => openSettings('appearance')}
              lock={() => {
                setShowDesktop(false);
                setLoggedIn(false);
                setOverlay(null);
              }}
              sleep={() => {
                setOverlay(null);
                setPowerState('sleeping');
              }}
              forceQuit={() => {
                setOverlay(null);
                setSystemDialog('force-quit');
              }}
              restart={() => {
                setOverlay(null);
                setLoggedIn(false);
                setBootMode('restart');
              }}
              shutDown={() => {
                setOverlay(null);
                setLoggedIn(false);
                setPowerState('shutdown');
              }}
            />
          ) : null}
          {overlay === 'file' ? <FileMenu openApp={openApp} /> : null}
          {overlay === 'edit' ? <EditMenu close={closeOverlay} /> : null}
          {overlay === 'view' ? (
            <ViewMenu
              preferences={finderPreferences}
              updatePreferences={updateFinderPreferences}
              maximize={maximizeActiveWindow}
              close={closeOverlay}
            />
          ) : null}
          {overlay === 'go' ? <GoMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === 'window' ? (
            <WindowMenu
              window={activeWindow}
              minimize={minimizeActiveWindow}
              maximize={maximizeActiveWindow}
              close={focusActiveWindow}
            />
          ) : null}
          {overlay === 'help' ? <HelpMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === 'wifi' ? <WifiMenu openSettings={openSettings} /> : null}
          {overlay === 'battery' ? (
            <BatteryMenu
              openSettings={openSettings}
              lowPower={lowPower}
              setLowPower={setLowPower}
            />
          ) : null}
          {overlay === 'siri' ? <SiriMenu openApp={openApp} /> : null}
          {overlay === 'control' ? (
            <ControlCenter
              dark={dark}
              setDark={setDark}
              brightness={brightness}
              setBrightness={setBrightness}
              systemPreferences={systemPreferences}
              updateSystemPreferences={updateSystemPreferences}
            />
          ) : null}
          {overlay === 'notifications' ? (
            <NotificationCenter doNotDisturb={systemPreferences.doNotDisturb} />
          ) : null}
          {overlay === 'spotlight' ? (
            <Spotlight openApp={openApp} close={() => setOverlay(null)} />
          ) : null}
          {overlay === 'launchpad' ? (
            <Launchpad openApp={openApp} close={() => setOverlay(null)} />
          ) : null}
          {systemDialog === 'force-quit' ? (
            <ForceQuitDialog
              windows={windows}
              onQuit={(id) => dispatch({ type: 'close', id })}
              onClose={() => setSystemDialog(null)}
            />
          ) : null}
          <div
            className='dock-hotzone [&.dock-hotzone]:fixed [&.dock-hotzone]:z-649 [&.dock-hotzone]:inset-[auto_0_0] [&.dock-hotzone]:h-4'
            aria-hidden='true'
          />
          <Dock
            windows={windows}
            launch={launch}
            size={systemPreferences.dockSize}
            showRecentApps={systemPreferences.showRecentApps}
          />
          <div
            className='display-dimmer [&.display-dimmer]:fixed [&.display-dimmer]:inset-0 [&.display-dimmer]:z-2000 [&.display-dimmer]:pointer-events-none [&.display-dimmer]:[background:oklch(0_0_0)] [&.display-dimmer]:[transition:opacity_120ms_ease-out]'
            aria-hidden='true'
            style={{ opacity: Math.max(0, ((100 - brightness) / 100) * 0.55) }}
          />
        </>
      )}
    </main>
  );
}
