import {
  AtSign,
  BatteryCharging,
  Bell,
  Bluetooth,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Code2,
  Columns3,
  Compass,
  Check,
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
  Moon,
  Monitor,
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
} from 'lucide-react'
import {
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

type AppId = 'finder' | 'safari' | 'messages' | 'photos' | 'notes' | 'terminal' | 'settings' | 'about'
type DockId = AppId | 'launchpad' | 'mail' | 'trash'
type FinderView = 'icons' | 'list' | 'columns' | 'gallery'
type FinderPreferences = {
  view: FinderView
  showSidebar: boolean
  showPreview: boolean
  showStatusBar: boolean
  iconSize: number
}
type SystemPreferences = {
  dockAutoHide: boolean
  showRecentApps: boolean
  dockSize: number
  doNotDisturb: boolean
  volume: number
}
type AccentColorId = 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'graphite'
type SettingsSectionId = 'wifi' | 'bluetooth' | 'network' | 'notifications' | 'sound' | 'battery' | 'focus' | 'general' | 'appearance' | 'desktop'
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
  | null

type WindowState = {
  id: number
  app: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  z: number
  minimized: boolean
  maximized: boolean
}
type DesktopRevealEdge = 'left' | 'right' | 'bottom' | 'top'
type BootMode = 'startup' | 'restart' | null
type PowerState = 'awake' | 'sleeping' | 'shutdown'
type SystemDialog = 'force-quit' | null

const DESKTOP_REVEAL_EDGES: DesktopRevealEdge[] = ['left', 'right', 'bottom', 'top']

const DEFAULT_FINDER_PREFERENCES: FinderPreferences = {
  view: 'icons',
  showSidebar: true,
  showPreview: false,
  showStatusBar: true,
  iconSize: 58,
}

const DEFAULT_SYSTEM_PREFERENCES: SystemPreferences = {
  dockAutoHide: false,
  showRecentApps: true,
  dockSize: 50,
  doNotDisturb: false,
  volume: 45,
}

const ACCENT_COLORS: Record<AccentColorId, { label: string; color: string; deep: string }> = {
  blue: { label: 'Blue', color: '#168bf4', deep: '#0874d1' },
  purple: { label: 'Purple', color: '#8d67e8', deep: '#7450c8' },
  pink: { label: 'Pink', color: '#e65b9a', deep: '#ca3f7d' },
  orange: { label: 'Orange', color: '#ed8a3d', deep: '#d36d24' },
  green: { label: 'Green', color: '#43a96b', deep: '#328853' },
  graphite: { label: 'Graphite', color: '#727b86', deep: '#59616b' },
}

const SETTINGS_SECTIONS: { id: SettingsSectionId; label: string; icon: LucideIcon; tint: string }[] = [
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
]

const SETTINGS_PANEL_COPY: Record<Exclude<SettingsSectionId, 'appearance'>, { description: string; controls: { id: string; title: string; detail: string; defaultChecked: boolean }[] }> = {
  wifi: {
    description: 'Connect to nearby networks and manage wireless access.',
    controls: [
      { id: 'wifi-enabled', title: 'Wi-Fi', detail: 'Connected to Portfolio Studio', defaultChecked: true },
      { id: 'wifi-ask', title: 'Ask to join networks', detail: 'Show available networks when no known network is found.', defaultChecked: true },
    ],
  },
  bluetooth: {
    description: 'Connect keyboards, headphones, and other nearby devices.',
    controls: [
      { id: 'bluetooth-enabled', title: 'Bluetooth', detail: 'This Mac is discoverable as Renan\'s Mac.', defaultChecked: true },
      { id: 'bluetooth-airdrop', title: 'Nearby sharing', detail: 'Allow contacts to discover this device.', defaultChecked: true },
    ],
  },
  network: {
    description: 'Review connection privacy and network protections.',
    controls: [
      { id: 'network-firewall', title: 'Firewall', detail: 'Block unwanted incoming connections.', defaultChecked: true },
      { id: 'network-private', title: 'Private address', detail: 'Use a rotating address on Wi-Fi networks.', defaultChecked: true },
    ],
  },
  notifications: {
    description: 'Choose how portfolio updates appear while you explore.',
    controls: [
      { id: 'notifications-allow', title: 'Allow notifications', detail: 'Show useful updates from the portfolio.', defaultChecked: true },
      { id: 'notifications-preview', title: 'Show previews', detail: 'Include a short preview in notification cards.', defaultChecked: true },
    ],
  },
  sound: {
    description: 'Tune interface feedback and alert sounds.',
    controls: [
      { id: 'sound-interface', title: 'Play interface sounds', detail: 'Use subtle feedback for important actions.', defaultChecked: true },
      { id: 'sound-feedback', title: 'Play feedback when volume changes', detail: 'Confirm volume adjustments with a quiet tone.', defaultChecked: false },
    ],
  },
  battery: {
    description: 'Review power usage and choose how this desktop conserves energy.',
    controls: [
      { id: 'battery-low-power', title: 'Low Power Mode', detail: 'Reduce background activity and energy use.', defaultChecked: false },
      { id: 'battery-optimized', title: 'Optimized charging', detail: 'Reduce battery aging by learning your charging routine.', defaultChecked: true },
    ],
  },
  focus: {
    description: 'Reduce interruptions when you are concentrating.',
    controls: [
      { id: 'focus-dnd', title: 'Do Not Disturb', detail: 'Silence non-essential notifications.', defaultChecked: false },
      { id: 'focus-share', title: 'Share focus status', detail: 'Let supported apps know notifications are silenced.', defaultChecked: true },
    ],
  },
  general: {
    description: 'Keep this desktop experience current and connected.',
    controls: [
      { id: 'general-updates', title: 'Automatic updates', detail: 'Install portfolio improvements when available.', defaultChecked: true },
      { id: 'general-handoff', title: 'Continue between apps', detail: 'Keep the current portfolio context when opening another app.', defaultChecked: true },
    ],
  },
  desktop: {
    description: 'Adjust how the desktop and Dock behave.',
    controls: [
      { id: 'desktop-hide', title: 'Automatically hide the Dock', detail: 'Reveal it when the pointer reaches the screen edge.', defaultChecked: false },
      { id: 'desktop-recents', title: 'Show recent applications', detail: 'Keep recently used apps at the end of the Dock.', defaultChecked: true },
    ],
  },
}

function readFinderPreferences(): FinderPreferences {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:finder-preferences')
    if (!saved) return DEFAULT_FINDER_PREFERENCES
    return { ...DEFAULT_FINDER_PREFERENCES, ...JSON.parse(saved) as Partial<FinderPreferences> }
  } catch {
    return DEFAULT_FINDER_PREFERENCES
  }
}

function readSystemPreferences(): SystemPreferences {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:system-preferences')
    if (!saved) return DEFAULT_SYSTEM_PREFERENCES
    return { ...DEFAULT_SYSTEM_PREFERENCES, ...JSON.parse(saved) as Partial<SystemPreferences> }
  } catch {
    return DEFAULT_SYSTEM_PREFERENCES
  }
}

function readAccentColor(): AccentColorId {
  try {
    const saved = globalThis.localStorage?.getItem('macos27:accent-color') as AccentColorId | null
    return saved && saved in ACCENT_COLORS ? saved : 'blue'
  } catch {
    return 'blue'
  }
}

function readBrightness(): number {
  try {
    return Number(globalThis.localStorage?.getItem('macos27:display-brightness')) || 82
  } catch {
    return 82
  }
}

const TODAY_TASKS = [
  { id: 'details', label: 'Polish the tiny details.' },
  { id: 'ship', label: 'Ship something memorable.' },
  { id: 'reply', label: 'Reply to good people.' },
] as const

type TodayTaskId = (typeof TODAY_TASKS)[number]['id']
type NoteId = 'welcome' | 'care' | 'now'

function readCompletedTasks(): TodayTaskId[] {
  try {
    const saved = JSON.parse(globalThis.localStorage?.getItem('macos27:today-completed') ?? '[]') as unknown
    if (!Array.isArray(saved)) return []
    const taskIds = new Set<string>(TODAY_TASKS.map((task) => task.id))
    return saved.filter((id): id is TodayTaskId => typeof id === 'string' && taskIds.has(id))
  } catch {
    return []
  }
}

type WindowAction =
  | { type: 'open'; app: AppId }
  | { type: 'close'; id: number }
  | { type: 'focus'; id: number }
  | { type: 'move'; id: number; x: number; y: number }
  | { type: 'minimize'; id: number }
  | { type: 'toggleMaximize'; id: number }

const APP_META: Record<AppId, { title: string; width: number; height: number; x: number; y: number }> = {
  finder: { title: 'Portfolio', width: 980, height: 620, x: 210, y: 116 },
  safari: { title: 'Safari', width: 1020, height: 650, x: 250, y: 84 },
  messages: { title: 'Messages', width: 760, height: 560, x: 360, y: 140 },
  photos: { title: 'Photos', width: 900, height: 610, x: 290, y: 102 },
  notes: { title: 'Notes', width: 820, height: 580, x: 330, y: 122 },
  terminal: { title: 'renan — zsh', width: 760, height: 500, x: 390, y: 160 },
  settings: { title: 'System Settings', width: 880, height: 610, x: 310, y: 105 },
  about: { title: 'About This Mac', width: 510, height: 480, x: 500, y: 170 },
}

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
}

function windowReducer(state: WindowState[], action: WindowAction): WindowState[] {
  const nextZ = Math.max(0, ...state.map((window) => window.z)) + 1

  switch (action.type) {
    case 'open': {
      const existing = state.find((window) => window.app === action.app)
      if (existing) {
        return state.map((window) =>
          window.id === existing.id ? { ...window, minimized: false, z: nextZ } : window,
        )
      }
      const meta = APP_META[action.app]
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
      ]
    }
    case 'close':
      return state.filter((window) => window.id !== action.id)
    case 'focus':
      return state.map((window) => (window.id === action.id ? { ...window, z: nextZ } : window))
    case 'move':
      return state.map((window) =>
        window.id === action.id
          ? {
              ...window,
              x: Math.max(8, Math.min(action.x, globalThis.innerWidth - 180)),
              y: Math.max(28, Math.min(action.y, globalThis.innerHeight - 100)),
            }
          : window,
      )
    case 'minimize':
      return state.map((window) => (window.id === action.id ? { ...window, minimized: true } : window))
    case 'toggleMaximize':
      {
        const target = state.find((window) => window.id === action.id)
        if (!target) return state
        const enteringFullscreen = !target.maximized
        return state.map((window) => {
          if (window.id === action.id) return { ...window, maximized: enteringFullscreen, z: nextZ }
          return enteringFullscreen && window.maximized ? { ...window, maximized: false } : window
        })
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
]

const MENU_OVERLAYS: Record<string, Overlay> = {
  File: 'file',
  Edit: 'edit',
  View: 'view',
  Go: 'go',
  Window: 'window',
  Help: 'help',
}

const FINDER_FAVORITES = ['Recents', 'About Me', 'Applications', 'Desktop', 'Portfolio', 'Downloads', 'iCloud Drive']

type FinderEntry = {
  name: string
  kind: 'folder' | 'document' | 'application'
  glyph: 'user' | 'code' | 'text' | 'images' | 'terminal' | 'mail' | 'folder'
  app: AppId
}

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
}

const launchpadApps: { id: AppId; label: string }[] = [
  { id: 'finder', label: 'Finder' },
  { id: 'safari', label: 'Safari' },
  { id: 'messages', label: 'Messages' },
  { id: 'photos', label: 'Photos' },
  { id: 'notes', label: 'Notes' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'settings', label: 'Settings' },
  { id: 'about', label: 'About Me' },
]

function FilesAppGlyph() {
  return (
    <svg className="files-app-glyph" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 15.5c0-2.5 2-4.5 4.5-4.5h7.2l3.8 4H36c2.2 0 4 1.8 4 4v14.5c0 2.5-2 4.5-4.5 4.5h-23A4.5 4.5 0 0 1 8 33.5z" fill="currentColor" fillOpacity="0.94" />
      <path d="M11.5 20.5h25v12.3c0 1.2-1 2.2-2.2 2.2H13.7c-1.2 0-2.2-1-2.2-2.2z" fill="white" fillOpacity="0.3" />
      <path d="M17 27.5h14M17 31.5h9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PhotosAppGlyph() {
  return (
    <svg className="photos-app-glyph" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="9" y="10" width="30" height="28" rx="6" fill="white" fillOpacity="0.94" />
      <circle cx="30.5" cy="18.5" r="3.5" fill="currentColor" fillOpacity="0.72" />
      <path d="m13 33 8.2-8.7 5.3 5.1 3.4-3.2L35 33z" fill="currentColor" fillOpacity="0.86" />
    </svg>
  )
}

function NotesAppGlyph() {
  return (
    <svg className="notes-app-glyph" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 17.5h24M12 23.5h24M12 29.5h19M12 35.5h15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.62" />
    </svg>
  )
}

function AppIcon({ app, size = 48 }: { app: DockId; size?: number }) {
  const iconProps = { size: Math.round(size * 0.52), strokeWidth: 1.7 }
  const icons: Partial<Record<DockId, ReactNode>> = {
    finder: <FilesAppGlyph />,
    launchpad: <Grid2X2 {...iconProps} />,
    safari: <Compass {...iconProps} />,
    messages: <MessageCircle {...iconProps} fill="currentColor" />,
    mail: <Mail {...iconProps} />,
    photos: <PhotosAppGlyph />,
    notes: <NotesAppGlyph />,
    terminal: <SquareTerminal {...iconProps} />,
    settings: <Settings {...iconProps} />,
    trash: <Trash2 {...iconProps} />,
    about: <UserRound {...iconProps} />,
  }

  return (
    <span className={`app-icon app-icon--${app}`} style={{ '--icon-size': `${size}px` } as CSSProperties}>
      {icons[app]}
    </span>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M21.1 16.9c0-3.5 2.9-5.2 3-5.3-1.6-2.4-4.2-2.7-5.1-2.8-2.2-.2-4.2 1.3-5.3 1.3-1.1 0-2.8-1.3-4.6-1.2-2.3 0-4.5 1.4-5.7 3.5-2.5 4.3-.6 10.5 1.7 13.9 1.2 1.7 2.6 3.6 4.4 3.5 1.8-.1 2.4-1.1 4.6-1.1 2.1 0 2.7 1.1 4.6 1.1 1.9 0 3.1-1.7 4.2-3.4 1.4-1.9 1.9-3.8 1.9-3.9-.1 0-3.7-1.4-3.7-5.6ZM17.6 6.5c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.9 2-.8.9-1.5 2.5-1.3 4 1.5.1 3-.7 3.9-1.8Z" />
    </svg>
  )
}

function BatteryStatusGlyph({ level = 84 }: { level?: number }) {
  const fillWidth = Math.max(1.5, Math.min(9, level / 100 * 9))
  return (
    <svg className="native-status-icon" viewBox="0 0 18 16" aria-hidden="true">
      <rect x="1" y="4" width="13.5" height="8" rx="2.1" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <path d="M16 6.35v3.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.72" />
      <rect x="3" y="6" width={fillWidth} height="4" rx="0.9" fill="currentColor" />
    </svg>
  )
}

function ControlCenterGlyph() {
  return (
    <svg className="native-status-icon" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="2" y="3" width="14" height="5" rx="2.5" fill="currentColor" />
      <circle cx="12.8" cy="5.5" r="1.65" fill="var(--control-center-knob, white)" />
      <rect x="2" y="10" width="14" height="5" rx="2.5" fill="currentColor" />
      <circle cx="5.2" cy="12.5" r="1.65" fill="var(--control-center-knob, white)" />
    </svg>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = globalThis.setInterval(() => setNow(new Date()), 30_000)
    return () => globalThis.clearInterval(timer)
  }, [])
  return now
}

function MenuBar({
  activeApp,
  overlay,
  onOverlay,
  lowPower,
  doNotDisturb,
  setDoNotDisturb,
}: {
  activeApp: AppId
  overlay: Overlay
  onOverlay: (overlay: Overlay) => void
  lowPower: boolean
  doNotDisturb: boolean
  setDoNotDisturb: (value: boolean) => void
}) {
  const now = useClock()
  const title = activeApp === 'about' ? 'Finder' : APP_META[activeApp].title.replace('Portfolio', 'Finder')
  const menus = activeApp === 'finder' ? ['File', 'View', 'Go', 'Edit', 'Window', 'Help'] : ['File', 'Edit', 'View', 'Window', 'Help']

  return (
    <header className="menu-bar" aria-label="macOS menu bar">
      <nav className="menu-bar__left" aria-label="Application menu">
        <button type="button" className="brand-button" aria-label="Portfolio menu" onClick={() => onOverlay(overlay === 'apple' ? null : 'apple')}>
          <AppleMark />
        </button>
        <button type="button" className="active-app-name" onClick={() => onOverlay(null)}>{title}</button>
        {menus.map((menu) => {
          const target = MENU_OVERLAYS[menu]
          return <button type="button" key={menu} aria-expanded={overlay === target} onClick={() => onOverlay(overlay === target ? null : target)}>{menu}</button>
        })}
      </nav>
      <nav className="menu-bar__right" aria-label="System status">
        {doNotDisturb ? <button type="button" className="focus-status" aria-label="Do Not Disturb is on" onClick={() => setDoNotDisturb(false)}><Moon size={14} fill="currentColor" /></button> : null}
        <button type="button" aria-label="Wi-Fi" aria-expanded={overlay === 'wifi'} onClick={() => onOverlay(overlay === 'wifi' ? null : 'wifi')}><Wifi size={15} strokeWidth={1.8} /></button>
        <button type="button" className={`battery-status${lowPower ? ' is-low-power' : ''}`} aria-label="Battery, 84 percent" aria-expanded={overlay === 'battery'} onClick={() => onOverlay(overlay === 'battery' ? null : 'battery')}><BatteryStatusGlyph /></button>
        <button type="button" aria-label="Spotlight" onClick={() => onOverlay(overlay === 'spotlight' ? null : 'spotlight')}><Search size={15} /></button>
        <button type="button" aria-label="Siri" aria-expanded={overlay === 'siri'} className="siri-orb" onClick={() => onOverlay(overlay === 'siri' ? null : 'siri')}><span /></button>
        <button type="button" aria-label="Control Center" onClick={() => onOverlay(overlay === 'control' ? null : 'control')}><ControlCenterGlyph /></button>
        <button type="button" className="menu-clock" aria-label="Notifications" onClick={() => onOverlay(overlay === 'notifications' ? null : 'notifications')}>
          {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
          {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </button>
      </nav>
    </header>
  )
}

type WeatherSnapshot = {
  temperature: number
  apparentTemperature: number
  code: number
  isDay: boolean
}

const MARINGA_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-23.4205&longitude=-51.9333&current=temperature_2m,apparent_temperature,weather_code,is_day&timezone=America%2FSao_Paulo'

function weatherDescription(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 67 || (code >= 80 && code <= 82)) return 'Rain'
  if (code <= 77 || (code >= 85 && code <= 86)) return 'Snow'
  if (code >= 95) return 'Thunderstorms'
  return 'Mixed Conditions'
}

function useMaringaWeather() {
  const [weather, setWeather] = useState<WeatherSnapshot>({
    temperature: 24,
    apparentTemperature: 23,
    code: 0,
    isDay: true,
  })
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const refresh = async () => {
      try {
        const response = await fetch(MARINGA_WEATHER_URL, { signal: controller.signal })
        if (!response.ok) return
        const data = await response.json() as {
          current?: {
            temperature_2m?: number
            apparent_temperature?: number
            weather_code?: number
            is_day?: number
          }
        }
        const current = data.current
        if (!current || typeof current.temperature_2m !== 'number' || typeof current.weather_code !== 'number') return
        setWeather({
          temperature: current.temperature_2m,
          apparentTemperature: typeof current.apparent_temperature === 'number' ? current.apparent_temperature : current.temperature_2m,
          code: current.weather_code,
          isDay: current.is_day !== 0,
        })
        setUpdatedAt(new Date())
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // The last known or fallback Maringá conditions remain visible offline.
        }
      }
    }
    void refresh()
    const timer = globalThis.setInterval(refresh, 15 * 60 * 1000)
    return () => {
      controller.abort()
      globalThis.clearInterval(timer)
    }
  }, [])

  return { weather, updatedAt }
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
  windows: WindowState[]
  dark: boolean
  lowPower: boolean
  brightness: number
  completedTasks: TodayTaskId[]
  onToggleTask: (taskId: TodayTaskId) => void
  onOpenNote: (noteId: NoteId) => void
  openSettings: () => void
}) {
  const now = useClock()
  const { weather, updatedAt } = useMaringaWeather()
  const month = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const start = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const completed = new Set<TodayTaskId>(completedTasks)
  const remainingTasks = TODAY_TASKS.length - completedTasks.length
  const runningApps = windows.filter((window) => !window.minimized).length
  const conditions = weatherDescription(weather.code)

  return (
    <aside className="widgets" aria-label="Desktop widgets">
      <section className="widget widget--calendar">
        <div className="calendar-month">{month}</div>
        <div className="calendar-layout">
          <div className="calendar-grid" aria-label={month}>
            {'SMTWTFS'.split('').map((day, index) => <span className="calendar-weekday" key={`${day}-${index}`}>{day}</span>)}
            {Array.from({ length: start }).map((_, index) => <span key={`empty-${index}`} />)}
            {Array.from({ length: days }, (_, index) => index + 1).map((day) => (
              <span className={day === now.getDate() ? 'calendar-today' : ''} key={day}>{day}</span>
            ))}
          </div>
          <button type="button" className="calendar-event" onClick={() => onOpenNote('now')} aria-label="Open today's plan in Notes"><span>Design review — Portfolio</span><small>10:00 AM · Notes</small></button>
        </div>
      </section>
      <section className="widget widget--weather" aria-live="polite" aria-label={`Weather in Maringá, Paraná: ${Math.round(weather.temperature)} degrees, ${conditions}`}>
        <strong>Maringá, PR</strong>
        <div className="weather-temp">{weather.code === 0 ? (weather.isDay ? <Sun size={32} /> : <Moon size={32} />) : <CloudSun size={32} />} {Math.round(weather.temperature)}°</div>
        <small>{conditions} · Feels like {Math.round(weather.apparentTemperature)}°{updatedAt ? ` · Updated ${updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}` : ''}</small>
      </section>
      <section className="widget widget--today">
        <button type="button" className="widget-heading-button" onClick={() => onOpenNote('now')}>Today <span>Open Notes</span></button>
        {TODAY_TASKS.map((task) => (
          <label className={completed.has(task.id) ? 'is-complete' : ''} key={task.id}>
            <input type="checkbox" checked={completed.has(task.id)} onChange={() => onToggleTask(task.id)} />
            <span>{task.label}</span>
          </label>
        ))}
        <small aria-live="polite">{remainingTasks === 0 ? 'All complete' : `${remainingTasks} remaining`}</small>
      </section>
      <section className="widget widget--system" aria-label="Live system status">
        <button type="button" className="widget-heading-button" onClick={openSettings}>System Status <span>Open Settings</span></button>
        <button type="button" className="system-widget-row" onClick={openSettings}><span>Appearance</span><strong>{dark ? 'Dark' : 'Light'}</strong></button>
        <button type="button" className="system-widget-row" onClick={openSettings}><span>Display</span><strong>{brightness}%</strong></button>
        <button type="button" className="system-widget-row" onClick={openSettings}><span>Battery</span><strong className={lowPower ? 'is-low-power' : ''}>{lowPower ? 'Low Power' : '84%'}</strong></button>
        <small>{runningApps} {runningApps === 1 ? 'app' : 'apps'} active</small>
      </section>
    </aside>
  )
}

type DesktopFileId = 'selected-work' | 'read-me'

function DraggableDesktopFile({
  id,
  label,
  top,
  selected,
  onSelect,
  onOpen,
  children,
}: {
  id: DesktopFileId
  label: string
  top: number
  selected: boolean
  onSelect: (id: DesktopFileId) => void
  onOpen: () => void
  children: ReactNode
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef<{ pointerId: number; x: number; y: number; offsetX: number; offsetY: number; moved: boolean } | null>(null)

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onSelect(id)
    drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current
    if (!current || current.pointerId !== event.pointerId) return
    const deltaX = event.clientX - current.x
    const deltaY = event.clientY - current.y
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) current.moved = true
    setOffset({
      x: Math.max(-globalThis.innerWidth + 106, Math.min(current.offsetX + deltaX, 4)),
      y: Math.max(-top + 8, Math.min(current.offsetY + deltaY, globalThis.innerHeight - top - 164)),
    })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <button
      type="button"
      className={`desktop-file${selected ? ' is-selected' : ''}`}
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
  )
}

function DesktopFiles({
  openApp,
  selectedFile,
  onSelectFile,
}: {
  openApp: (app: AppId) => void
  selectedFile: DesktopFileId | null
  onSelectFile: (id: DesktopFileId) => void
}) {
  return (
    <div className="desktop-files" aria-label="Desktop files">
      <DraggableDesktopFile id="selected-work" label="Selected Work" top={8} selected={selectedFile === 'selected-work'} onSelect={onSelectFile} onOpen={() => openApp('photos')}>
        <span className="folder-icon"><Folder size={42} fill="oklch(0.72 0.15 240)" /></span>
      </DraggableDesktopFile>
      <DraggableDesktopFile id="read-me" label="Read Me.txt" top={96} selected={selectedFile === 'read-me'} onSelect={onSelectFile} onOpen={() => openApp('notes')}>
        <span className="document-icon"><FileText size={36} /></span>
      </DraggableDesktopFile>
    </div>
  )
}

function FinderContent({
  openApp,
  preferences,
  updatePreferences,
  section,
  setSection,
}: {
  openApp: (app: AppId) => void
  preferences: FinderPreferences
  updatePreferences: (patch: Partial<FinderPreferences>) => void
  section: string
  setSection: (section: string) => void
}) {
  const [query, setQuery] = useState('')
  const [toolbarMenu, setToolbarMenu] = useState<'share' | 'more' | null>(null)
  const [shareStatus, setShareStatus] = useState('')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const filteredItems = useMemo(() => {
    const sectionItems = FINDER_SECTIONS[section] ?? []
    const normalized = query.trim().toLocaleLowerCase()
    if (!normalized) return sectionItems
    return sectionItems.filter((item) => item.name.toLocaleLowerCase().includes(normalized))
  }, [query, section])
  const canResizeIcons = preferences.view === 'icons'

  const selectSection = (nextSection: string) => {
    setSection(nextSection)
    setQuery('')
    setToolbarMenu(null)
    setSelectedItem(null)
  }

  const shareInMessages = () => {
    setToolbarMenu(null)
    openApp('messages')
  }

  const copyPortfolioLink = async () => {
    try {
      await globalThis.navigator.clipboard.writeText(globalThis.location.href)
      setShareStatus('Link copied')
    } catch {
      setShareStatus('Portfolio link ready')
    }
  }

  return (
    <div className="finder-app">
      {preferences.showSidebar ? <aside className="finder-sidebar">
        <span className="sidebar-heading">Favorites</span>
        {FINDER_FAVORITES.map((item) => (
          <button type="button" key={item} className={section === item ? 'selected' : ''} aria-current={section === item ? 'page' : undefined} onClick={() => selectSection(item)}>
            {item === 'Portfolio' ? <Folder size={16} /> : item === 'About Me' ? <UserRound size={16} /> : <GalleryVerticalEnd size={16} />}
            {item}
          </button>
        ))}
        <span className="sidebar-heading">Locations</span>
        <button type="button"><BriefcaseBusiness size={16} />Renan's Mac</button>
        <button type="button"><CloudSun size={16} />iCloud</button>
        <button type="button" className={section === 'Trash' ? 'selected' : ''} aria-current={section === 'Trash' ? 'page' : undefined} onClick={() => selectSection('Trash')}><Trash2 size={16} />Trash</button>
        <span className="sidebar-heading">Tags</span>
        <button type="button"><i className="tag tag--red" />Important</button>
        <button type="button"><i className="tag tag--orange" />In progress</button>
        <button type="button"><i className="tag tag--green" />Shipped</button>
      </aside> : null}
      <main className="finder-content">
        <div className="finder-toolbar">
          <span className="window-nav"><ChevronLeft size={18} /><ChevronRight size={18} /></span>
          <div className="view-switcher">
            <button type="button" className={preferences.view === 'icons' ? 'selected' : ''} aria-label="View as Icons" onClick={() => updatePreferences({ view: 'icons' })}><Grid2X2 size={16} /></button>
            <button type="button" className={preferences.view === 'list' ? 'selected' : ''} aria-label="View as List" onClick={() => updatePreferences({ view: 'list' })}><List size={16} /></button>
            <button type="button" className={preferences.view === 'columns' ? 'selected' : ''} aria-label="View as Columns" onClick={() => updatePreferences({ view: 'columns' })}><Columns3 size={16} /></button>
            <button type="button" className={preferences.view === 'gallery' ? 'selected' : ''} aria-label="View as Gallery" onClick={() => updatePreferences({ view: 'gallery' })}><GalleryVerticalEnd size={16} /></button>
          </div>
          <span className="toolbar-spacer" />
          <button type="button" aria-label="Share" aria-haspopup="menu" aria-expanded={toolbarMenu === 'share'} onClick={() => { setShareStatus(''); setToolbarMenu(toolbarMenu === 'share' ? null : 'share') }}><Share size={16} /></button>
          <button type="button" aria-label="More" aria-haspopup="menu" aria-expanded={toolbarMenu === 'more'} onClick={() => setToolbarMenu(toolbarMenu === 'more' ? null : 'more')}><MoreHorizontal size={17} /></button>
          <label className="finder-search"><Search size={14} /><input aria-label="Search files" placeholder={`Search ${section}`} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          {toolbarMenu === 'share' ? <div className="finder-toolbar-popover finder-share-popover" role="menu" aria-label="Share Portfolio" onPointerDown={(event) => event.stopPropagation()}>
            <strong>Share “{section}”</strong>
            <button type="button" role="menuitem" onClick={shareInMessages}><MessageCircle size={15} /><span>Messages</span></button>
            <button type="button" role="menuitem" onClick={shareInMessages}><Mail size={15} /><span>Mail</span></button>
            <button type="button" role="menuitem" onClick={() => void copyPortfolioLink()}><ExternalLink size={15} /><span>Copy Link</span></button>
            <small aria-live="polite">{shareStatus}</small>
          </div> : null}
          {toolbarMenu === 'more' ? <div className="finder-toolbar-popover finder-more-popover" role="menu" aria-label="Finder actions" onPointerDown={(event) => event.stopPropagation()}>
            <button type="button" role="menuitemradio" aria-checked={preferences.view === 'icons'} onClick={() => { updatePreferences({ view: 'icons' }); setToolbarMenu(null) }}><span>{preferences.view === 'icons' ? <Check size={13} /> : null} Icons</span></button>
            <button type="button" role="menuitemradio" aria-checked={preferences.view === 'list'} onClick={() => { updatePreferences({ view: 'list' }); setToolbarMenu(null) }}><span>{preferences.view === 'list' ? <Check size={13} /> : null} List</span></button>
            <hr />
            <button type="button" role="menuitemcheckbox" aria-checked={preferences.showPreview} onClick={() => updatePreferences({ showPreview: !preferences.showPreview })}><span>{preferences.showPreview ? <Check size={13} /> : null} Show Preview</span></button>
            <button type="button" role="menuitemcheckbox" aria-checked={preferences.showStatusBar} onClick={() => updatePreferences({ showStatusBar: !preferences.showStatusBar })}><span>{preferences.showStatusBar ? <Check size={13} /> : null} Show Status Bar</span></button>
          </div> : null}
        </div>
        <div className="finder-workspace">
          <div className={`finder-files finder-files--${preferences.view}`} style={{ '--finder-icon-size': `${preferences.iconSize}px` } as CSSProperties} aria-label={`${section} files`} aria-live="polite">
            {filteredItems.map((item) => <FinderItem key={`${section}-${item.name}`} item={item} size={preferences.iconSize} selected={selectedItem === item.name} onSelect={() => setSelectedItem(item.name)} onOpen={() => openApp(item.app)} />)}
            {filteredItems.length === 0 ? <div className="finder-empty"><Search size={26} /><strong>No results</strong><span>No items in {section} match “{query}”.</span></div> : null}
          </div>
          {preferences.showPreview ? <aside className="finder-preview"><span className="finder-document"><FileText /></span><strong>About Me.md</strong><dl><div><dt>Kind</dt><dd>Markdown document</dd></div><div><dt>Size</dt><dd>12 KB</dd></div><div><dt>Created</dt><dd>Today, 10:09 AM</dd></div></dl></aside> : null}
        </div>
        {preferences.showStatusBar ? <div className="finder-status"><span>{filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}, 214.3 GB available</span><label className={canResizeIcons ? '' : 'is-disabled'}>Icon size <input aria-label="Icon size" aria-valuetext={`${preferences.iconSize} pixels`} type="range" min="40" max="88" step="4" value={preferences.iconSize} disabled={!canResizeIcons} onChange={(event) => updatePreferences({ iconSize: Number(event.target.value) })} /><output>{preferences.iconSize}px</output></label></div> : null}
      </main>
    </div>
  )
}

function FinderEntryIcon({ glyph }: { glyph: FinderEntry['glyph'] }) {
  switch (glyph) {
    case 'user': return <UserRound />
    case 'code': return <FileCode2 />
    case 'text': return <FileText />
    case 'images': return <Images />
    case 'terminal': return <SquareTerminal />
    case 'mail': return <Mail />
    case 'folder': return <Folder />
  }
}

function FinderItem({ item, size, selected, onSelect, onOpen }: { item: FinderEntry; size: number; selected: boolean; onSelect: () => void; onOpen: () => void }) {
  const kindLabel = item.kind === 'folder' ? 'Folder' : item.kind === 'application' ? 'Application' : 'Document'
  return (
    <button type="button" className={`finder-item${selected ? ' is-selected' : ''}`} aria-pressed={selected} onDoubleClick={onOpen} onClick={onSelect}>
      {item.kind === 'application'
        ? <span className="finder-application"><AppIcon app={item.app} size={Math.round(size * 0.82)} /></span>
        : <span className={item.kind === 'folder' ? 'finder-folder' : 'finder-document'}><FinderEntryIcon glyph={item.glyph} /></span>}
      <span>{item.name}</span>
      <span className="finder-item__metadata"><span>{kindLabel}</span><span>Today, 10:09 AM</span><span>{item.kind === 'folder' ? '—' : '12 KB'}</span></span>
    </button>
  )
}

function SafariContent() {
  return (
    <div className="safari-app">
      <div className="safari-toolbar">
        <PanelLeft size={17} /><ChevronLeft size={18} /><ChevronRight size={18} />
        <div className="address-bar"><span>renan.dev</span></div>
        <Share size={17} /><ExternalLink size={17} /><Grid2X2 size={17} />
      </div>
      <main className="portfolio-page">
        <nav><span>RENAN.DEV</span><div><a href="#work">Work</a><a href="#about">About</a><a href="mailto:hello@example.com">Contact</a></div></nav>
        <section className="portfolio-hero" id="about">
          <span className="availability"><i /> Available for interesting work</span>
          <h1>I build digital things with care.</h1>
          <p>Designer, developer, and relentless polisher of tiny details. This copy is a placeholder; the craft is real.</p>
          <a href="#work" className="hero-link">Explore selected work <span>↓</span></a>
        </section>
        <section className="portfolio-work" id="work">
          <article className="work-feature work-feature--blue"><span>01</span><div><small>PRODUCT · 2026</small><h2>Project Aurora</h2><p>A thoughtful digital product for ambitious teams.</p></div></article>
          <article className="work-feature work-feature--amber"><span>02</span><div><small>PLATFORM · 2025</small><h2>Project Sol</h2><p>A warm, fast interface that makes complexity feel obvious.</p></div></article>
        </section>
      </main>
    </div>
  )
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
    bullets: ['Open apps from the Dock.', 'Drag, focus, minimize, maximize, and close windows.', 'Use Spotlight to jump anywhere.', 'Explore placeholder projects in Safari and Finder.'],
    quote: 'The details are not the details. They make the design.',
    closing: 'Everything here is ready for real biography, work, contact details, and links when you are.',
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
    bullets: ['Clarity before cleverness.', 'Character without unnecessary noise.', 'Fast interactions with calm motion.', 'Details that reward attention.'],
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
    bullets: ['A more faithful macOS portfolio.', 'A reusable interface system.', 'A collection of carefully documented experiments.'],
    quote: 'Small, finished things compound.',
    closing: 'Next up: replacing the remaining placeholder work with real projects and writing.',
  },
] as const

function NotesContent({
  selectedId,
  setSelectedId,
  completedTasks,
  onToggleTask,
}: {
  selectedId: NoteId
  setSelectedId: (noteId: NoteId) => void
  completedTasks: TodayTaskId[]
  onToggleTask: (taskId: TodayTaskId) => void
}) {
  const note = NOTES.find((item) => item.id === selectedId) ?? NOTES[0]
  const completed = new Set<TodayTaskId>(completedTasks)

  return (
    <div className="notes-app">
      <aside className="notes-list">
        {NOTES.map((item) => (
          <button type="button" key={item.id} className={`note-row${selectedId === item.id ? ' selected' : ''}`} aria-current={selectedId === item.id ? 'page' : undefined} onClick={() => setSelectedId(item.id)}>
            <strong>{item.title}</strong><span>{item.date}</span><p>{item.preview}</p>
          </button>
        ))}
      </aside>
      <article className="note-editor" aria-live="polite">
        <time>{note.updated}</time>
        <h1>{note.editorTitle}</h1>
        <p>{note.intro}</p>
        <h2>{note.sectionTitle}</h2>
        {note.id === 'now' ? (
          <ul className="note-task-list">
            {TODAY_TASKS.map((task) => (
              <li className={completed.has(task.id) ? 'is-complete' : ''} key={task.id}>
                <label><input type="checkbox" checked={completed.has(task.id)} onChange={() => onToggleTask(task.id)} /><span>{task.label}</span></label>
              </li>
            ))}
          </ul>
        ) : <ul>{note.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
        <blockquote>{note.quote}</blockquote>
        <p>{note.closing}</p>
      </article>
    </div>
  )
}

function PhotosContent() {
  return (
    <div className="photos-app">
      <aside><strong>Photos</strong><button type="button" className="selected"><Images size={16} />Library</button><button type="button"><Sparkles size={16} />Featured</button><button type="button"><Folder size={16} />Projects</button></aside>
      <main>
        <div className="photos-heading"><div><h1>Library</h1><p>Placeholder visual work · 8 items</p></div><button type="button">Years&nbsp;&nbsp; Months&nbsp;&nbsp; Days&nbsp;&nbsp; <strong>All Photos</strong></button></div>
        <div className="photo-grid">
          {Array.from({ length: 8 }, (_, index) => <div className={`photo-tile photo-tile--${index + 1}`} key={index}><span>{['Aurora', 'Index', 'Tide', 'Mono', 'Field', 'Signal', 'Daylight', 'System'][index]}</span></div>)}
        </div>
      </main>
    </div>
  )
}

function MessagesContent() {
  const [sent, setSent] = useState(false)
  return (
    <div className="messages-app">
      <aside><div className="messages-search"><Search size={14} />Search</div><button type="button" className="selected"><span className="avatar">R</span><span><strong>Renan</strong><small>Ready when you are.</small></span></button><button type="button"><span className="avatar avatar--blue">W</span><span><strong>Work</strong><small>Three project files</small></span></button></aside>
      <main>
        <header><span className="avatar">R</span><strong>Renan</strong><small>renan@example.com</small></header>
        <div className="conversation"><time>Today 10:09 AM</time><p className="bubble bubble--incoming">Hey! Thanks for exploring my desktop.</p><p className="bubble bubble--incoming">Want to build something thoughtful together?</p>{sent ? <p className="bubble bubble--sent">Absolutely — let’s talk.</p> : null}</div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><button type="button" aria-label="Add attachment">＋</button><input aria-label="Message" placeholder="iMessage" /><button aria-label="Send message" type="submit"><Send size={16} /></button></form>
      </main>
    </div>
  )
}

function TerminalContent() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [lines, setLines] = useState<string[]>([
    'Last login: Fri Jul 17 10:09:42 on ttys001',
    'Welcome to Renan’s portfolio. Type “help” to explore.',
  ])
  const [command, setCommand] = useState('')
  const output: Record<string, string[]> = {
    help: ['Available commands: about, projects, contact, skills, date, clear'],
    about: ['Renan — designer and developer focused on crafted interfaces.'],
    projects: ['01  Project Aurora', '02  Project Sol', '03  This macOS portfolio'],
    contact: ['Email: renan@example.com', 'GitHub: github.com/renan', 'LinkedIn: linkedin.com/in/renan'],
    skills: ['React · TypeScript · Design systems · Product engineering'],
    date: [new Date().toString()],
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const normalized = command.trim().toLowerCase()
    if (!normalized) return
    if (normalized === 'clear') setLines([])
    else setLines((current) => [...current, `renan@portfolio ~ % ${command}`, ...(output[normalized] ?? [`zsh: command not found: ${command}`])])
    setCommand('')
    globalThis.requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className="terminal-app" role="region" aria-label="Terminal output" onPointerDown={() => inputRef.current?.focus()} onClick={() => inputRef.current?.focus()}>
      {lines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
      <form onSubmit={submit}><span><b>renan@portfolio</b> ~ %</span><input ref={inputRef} autoFocus aria-label="Terminal command" value={command} onChange={(event) => setCommand(event.target.value)} spellCheck={false} /></form>
    </div>
  )
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
  dark: boolean
  setDark: (value: boolean) => void
  accentColor: AccentColorId
  setAccentColor: (value: AccentColorId) => void
  selectedSection: SettingsSectionId
  setSelectedSection: (value: SettingsSectionId) => void
  lowPower: boolean
  setLowPower: (value: boolean) => void
  systemPreferences: SystemPreferences
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void
}) {
  const [accentOpen, setAccentOpen] = useState(false)
  const [toggleValues, setToggleValues] = useState<Record<string, boolean>>(() => Object.fromEntries(
    Object.values(SETTINGS_PANEL_COPY).flatMap((panel) => panel.controls.map((control) => [control.id, control.defaultChecked])),
  ))
  const selected = SETTINGS_SECTIONS.find((section) => section.id === selectedSection) ?? SETTINGS_SECTIONS[0]
  const SelectedIcon = selected.icon

  const settingChecked = (id: string) => {
    if (id === 'battery-low-power') return lowPower
    if (id === 'desktop-hide') return systemPreferences.dockAutoHide
    if (id === 'desktop-recents') return systemPreferences.showRecentApps
    if (id === 'focus-dnd') return systemPreferences.doNotDisturb
    return toggleValues[id] ?? false
  }

  const toggleSetting = (id: string) => {
    if (id === 'battery-low-power') return setLowPower(!lowPower)
    if (id === 'desktop-hide') return updateSystemPreferences({ dockAutoHide: !systemPreferences.dockAutoHide })
    if (id === 'desktop-recents') return updateSystemPreferences({ showRecentApps: !systemPreferences.showRecentApps })
    if (id === 'focus-dnd') return updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb })
    setToggleValues((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <div className="settings-app">
      <aside aria-label="System Settings sections">
        <div className="settings-user"><span className="avatar">R</span><span><strong>Renan</strong><small>Portfolio profile</small></span></div>
        <nav>
          {SETTINGS_SECTIONS.map((section) => {
            const SectionIcon = section.icon
            const isSelected = section.id === selectedSection
            return (
              <button
                type="button"
                className={isSelected ? 'selected' : ''}
                aria-current={isSelected ? 'page' : undefined}
                key={section.id}
                onClick={() => {
                  setSelectedSection(section.id)
                  setAccentOpen(false)
                }}
              >
                <span className="settings-sidebar-icon" style={{ '--settings-icon-tint': section.tint } as CSSProperties}><SectionIcon size={14} strokeWidth={2} /></span>
                <span>{section.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>
      <main>
        <header className="settings-heading">
          <span className="settings-heading-icon" style={{ '--settings-icon-tint': selected.tint } as CSSProperties}><SelectedIcon size={24} strokeWidth={1.8} /></span>
          <div><h1>{selected.label}</h1>{selectedSection !== 'appearance' ? <p>{SETTINGS_PANEL_COPY[selectedSection].description}</p> : <p>Choose how windows and controls look across the portfolio.</p>}</div>
        </header>

        {selectedSection === 'appearance' ? (
          <>
            <section>
              <h2>Appearance</h2>
              <div className="appearance-choices">
                <button type="button" onClick={() => setDark(false)} className={!dark ? 'selected' : ''} aria-pressed={!dark}><span className="appearance-preview appearance-preview--light" />Light</button>
                <button type="button" onClick={() => setDark(true)} className={dark ? 'selected' : ''} aria-pressed={dark}><span className="appearance-preview appearance-preview--dark" />Dark</button>
              </div>
            </section>
            <section className="settings-list" key="appearance-settings">
              <div className="accent-control">
                <button type="button" className="settings-row settings-row--button" aria-expanded={accentOpen} aria-controls="accent-color-picker" onClick={() => setAccentOpen((open) => !open)}>
                  <span><strong>Accent color</strong><small>{ACCENT_COLORS[accentColor].label} is used for selections and controls.</small></span>
                  <span className="accent-value"><i className="accent-dot" style={{ background: ACCENT_COLORS[accentColor].color }} /><ChevronRight size={15} aria-hidden="true" /></span>
                </button>
                {accentOpen ? (
                  <dialog className="accent-picker" id="accent-color-picker" aria-label="Accent color" open>
                    <strong>Accent color</strong>
                    <div>
                      {(Object.entries(ACCENT_COLORS) as [AccentColorId, (typeof ACCENT_COLORS)[AccentColorId]][]).map(([id, accent]) => (
                        <button type="button" key={id} aria-label={`${accent.label} accent color`} aria-pressed={accentColor === id} onClick={() => { setAccentColor(id); setAccentOpen(false) }}>
                          <span style={{ background: accent.color }}>{accentColor === id ? <Check size={14} /> : null}</span>
                          <small>{accent.label}</small>
                        </button>
                      ))}
                    </div>
                  </dialog>
                ) : null}
              </div>
              <label><span><strong>Allow wallpaper tinting</strong><small>Windows adapt to the desktop behind them.</small></span><input type="checkbox" defaultChecked /></label>
            </section>
          </>
        ) : (
          <>
            {selectedSection === 'battery' ? (
              <section className={`battery-settings-summary${lowPower ? ' is-low-power' : ''}`} aria-label="Battery status">
                <BatteryCharging size={34} />
                <span><strong>84%</strong><small>{lowPower ? 'Low Power Mode is active' : 'Power adapter connected'}</small></span>
              </section>
            ) : null}
            <section className="settings-list settings-list--section" key={`${selectedSection}-settings`}>
              {SETTINGS_PANEL_COPY[selectedSection].controls.map((control) => {
                return (
                  <label key={control.id}>
                    <span><strong>{control.title}</strong><small>{control.detail}</small></span>
                    <input type="checkbox" checked={settingChecked(control.id)} onChange={() => toggleSetting(control.id)} />
                  </label>
                )
              })}
              {selectedSection === 'sound' || selectedSection === 'desktop' ? (
                <label className="settings-slider-row">
                  <span><strong>{selectedSection === 'sound' ? 'Output volume' : 'Dock size'}</strong><small>{selectedSection === 'sound' ? 'Adjust the level used for interface audio.' : 'Resize application icons in the Dock.'}</small></span>
                  <input
                    aria-label={selectedSection === 'sound' ? 'Output volume' : 'Dock size'}
                    type="range"
                    min={selectedSection === 'sound' ? 0 : 36}
                    max={selectedSection === 'sound' ? 100 : 64}
                    value={selectedSection === 'sound' ? systemPreferences.volume : systemPreferences.dockSize}
                    onChange={(event) => updateSystemPreferences(selectedSection === 'sound'
                      ? { volume: Number(event.target.value) }
                      : { dockSize: Number(event.target.value) })}
                  />
                </label>
              ) : null}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function AboutContent() {
  return (
    <div className="about-app">
      <div className="mac-mark"><span>27</span></div>
      <h1>macOS</h1><h2>Tahoe 27.0</h2>
      <p className="about-device">Renan's Mac</p>
      <dl><div><dt>Chip</dt><dd>Apple M4 Pro</dd></div><div><dt>Memory</dt><dd>24 GB</dd></div><div><dt>Serial number</dt><dd>PORTFOLIO27</dd></div><div><dt>macOS</dt><dd>Version 27.0</dd></div></dl>
      <button type="button">More Info…</button>
      <footer><a href="https://github.com" aria-label="GitHub"><Code2 size={18} /></a><a href="https://linkedin.com" aria-label="LinkedIn"><BriefcaseBusiness size={18} /></a><a href="mailto:renan@example.com" aria-label="Email"><AtSign size={18} /></a></footer>
    </div>
  )
}

function WindowContent({ app, openApp, dark, setDark, accentColor, setAccentColor, settingsSection, setSettingsSection, lowPower, setLowPower, systemPreferences, updateSystemPreferences, finderPreferences, updateFinderPreferences, finderSection, setFinderSection, selectedNoteId, setSelectedNoteId, completedTasks, onToggleTask }: { app: AppId; openApp: (app: AppId) => void; dark: boolean; setDark: (value: boolean) => void; accentColor: AccentColorId; setAccentColor: (value: AccentColorId) => void; settingsSection: SettingsSectionId; setSettingsSection: (value: SettingsSectionId) => void; lowPower: boolean; setLowPower: (value: boolean) => void; systemPreferences: SystemPreferences; updateSystemPreferences: (patch: Partial<SystemPreferences>) => void; finderPreferences: FinderPreferences; updateFinderPreferences: (patch: Partial<FinderPreferences>) => void; finderSection: string; setFinderSection: (section: string) => void; selectedNoteId: NoteId; setSelectedNoteId: (noteId: NoteId) => void; completedTasks: TodayTaskId[]; onToggleTask: (taskId: TodayTaskId) => void }) {
  switch (app) {
    case 'finder': return <FinderContent openApp={openApp} preferences={finderPreferences} updatePreferences={updateFinderPreferences} section={finderSection} setSection={setFinderSection} />
    case 'safari': return <SafariContent />
    case 'messages': return <MessagesContent />
    case 'photos': return <PhotosContent />
    case 'notes': return <NotesContent selectedId={selectedNoteId} setSelectedId={setSelectedNoteId} completedTasks={completedTasks} onToggleTask={onToggleTask} />
    case 'terminal': return <TerminalContent />
    case 'settings': return <SettingsContent dark={dark} setDark={setDark} accentColor={accentColor} setAccentColor={setAccentColor} selectedSection={settingsSection} setSelectedSection={setSettingsSection} lowPower={lowPower} setLowPower={setLowPower} systemPreferences={systemPreferences} updateSystemPreferences={updateSystemPreferences} />
    case 'about': return <AboutContent />
  }
}

function desktopRevealTransform(window: WindowState, edge: DesktopRevealEdge): string {
  switch (edge) {
    case 'left': return `translate3d(calc(-100% - ${window.x}px + 52px), 0, 0)`
    case 'right': return `translate3d(calc(100vw - ${window.x + 52}px), 0, 0)`
    case 'bottom': return `translate3d(0, calc(100vh - ${window.y + 52}px), 0)`
    case 'top': return `translate3d(0, calc(-100% - ${window.y}px + 44px), 0)`
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
  window: WindowState
  active: boolean
  dispatch: (action: WindowAction) => void
  openApp: (app: AppId) => void
  dark: boolean
  setDark: (value: boolean) => void
  accentColor: AccentColorId
  setAccentColor: (value: AccentColorId) => void
  settingsSection: SettingsSectionId
  setSettingsSection: (value: SettingsSectionId) => void
  lowPower: boolean
  setLowPower: (value: boolean) => void
  systemPreferences: SystemPreferences
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void
  finderPreferences: FinderPreferences
  updateFinderPreferences: (patch: Partial<FinderPreferences>) => void
  finderSection: string
  setFinderSection: (section: string) => void
  selectedNoteId: NoteId
  setSelectedNoteId: (noteId: NoteId) => void
  completedTasks: TodayTaskId[]
  onToggleTask: (taskId: TodayTaskId) => void
  desktopRevealed: boolean
  revealEdge: DesktopRevealEdge
  revealIndex: number
}) {
  const windowElement = useRef<HTMLElement>(null)
  const drag = useRef<{
    startX: number
    startY: number
    x: number
    y: number
    lastX: number
    lastY: number
    frame: number | null
  } | null>(null)

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.maximized || (event.target as HTMLElement).closest('button')) return
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      x: window.x,
      y: window.y,
      lastX: event.clientX,
      lastY: event.clientY,
      frame: null,
    }
    windowElement.current?.classList.add('is-dragging')
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY
    if (drag.current.frame !== null) return
    drag.current.frame = globalThis.requestAnimationFrame(() => {
      const current = drag.current
      const element = windowElement.current
      if (!current || !element) return
      element.style.transform = `translate3d(${current.lastX - current.startX}px, ${current.lastY - current.startY}px, 0)`
      current.frame = null
    })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = drag.current
    const element = windowElement.current
    if (!current || !element) return
    if (current.frame !== null) globalThis.cancelAnimationFrame(current.frame)
    const nextX = Math.max(8, Math.min(current.x + event.clientX - current.startX, globalThis.innerWidth - 180))
    const nextY = Math.max(28, Math.min(current.y + event.clientY - current.startY, globalThis.innerHeight - 100))
    element.style.left = `${nextX}px`
    element.style.top = `${nextY}px`
    element.style.transform = 'translate3d(0, 0, 0)'
    drag.current = null
    dispatch({ type: 'move', id: window.id, x: nextX, y: nextY })
    globalThis.requestAnimationFrame(() => element.classList.remove('is-dragging'))
  }

  const toggleMaximize = () => {
    const element = windowElement.current
    if (!element) return dispatch({ type: 'toggleMaximize', id: window.id })
    const first = element.getBoundingClientRect()
    dispatch({ type: 'toggleMaximize', id: window.id })
    globalThis.requestAnimationFrame(() => {
      const last = element.getBoundingClientRect()
      const deltaX = first.left - last.left
      const deltaY = first.top - last.top
      const scaleX = first.width / last.width
      const scaleY = first.height / last.height
      element.animate(
        [
          { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})` },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        { duration: 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    })
  }

  const windowStyle: CSSProperties & {
    '--desktop-reveal-transform': string
    '--desktop-reveal-index': number
  } = {
    ...(window.maximized
      ? { zIndex: window.z }
      : { left: window.x, top: window.y, width: window.width, height: window.height, zIndex: window.z }),
    '--desktop-reveal-transform': desktopRevealTransform(window, revealEdge),
    '--desktop-reveal-index': revealIndex,
  }

  return (
    <section
      ref={windowElement}
      className={`app-window app-window--${window.app}${active ? ' is-active' : ' is-inactive'}${window.minimized ? ' is-minimized' : ''}${window.maximized ? ' is-maximized' : ''}`}
      style={windowStyle}
      data-desktop-edge={revealEdge}
      aria-hidden={desktopRevealed || undefined}
      onPointerDown={() => dispatch({ type: 'focus', id: window.id })}
      aria-label={`${window.title} window`}
    >
      <div className="window-titlebar" onDoubleClick={toggleMaximize} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <div className="traffic-lights">
          <button type="button" className="traffic traffic--close" aria-label={`Close ${window.title}`} onClick={() => dispatch({ type: 'close', id: window.id })} />
          <button type="button" className="traffic traffic--minimize" aria-label={`Minimize ${window.title}`} onClick={() => dispatch({ type: 'minimize', id: window.id })} />
          <button type="button" className="traffic traffic--maximize" aria-label={`${window.maximized ? 'Exit Full Screen' : 'Enter Full Screen'} ${window.title}`} onClick={toggleMaximize} />
        </div>
        <strong>{window.title}</strong>
        <span />
      </div>
      <div className="window-body"><WindowContent app={window.app} openApp={openApp} dark={dark} setDark={setDark} accentColor={accentColor} setAccentColor={setAccentColor} settingsSection={settingsSection} setSettingsSection={setSettingsSection} lowPower={lowPower} setLowPower={setLowPower} systemPreferences={systemPreferences} updateSystemPreferences={updateSystemPreferences} finderPreferences={finderPreferences} updateFinderPreferences={updateFinderPreferences} finderSection={finderSection} setFinderSection={setFinderSection} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId} completedTasks={completedTasks} onToggleTask={onToggleTask} /></div>
    </section>
  )
}

const MemoAppWindow = memo(AppWindow)

function Dock({ windows, launch, size, showRecentApps }: { windows: WindowState[]; launch: (app: DockId) => void; size: number; showRecentApps: boolean }) {
  const visibleApps = showRecentApps
    ? [...dockApps.slice(0, -1), { id: 'about' as const, label: 'About Me' }, dockApps[dockApps.length - 1]]
    : dockApps
  return (
    <nav className="dock" aria-label="Dock" style={{ '--dock-size': `${size}px` } as CSSProperties}>
      {visibleApps.map((app) => {
        const running = app.id !== 'launchpad' && app.id !== 'mail' && app.id !== 'trash' && windows.some((window) => window.app === app.id)
        const separated = app.id === (showRecentApps ? 'about' : 'trash')
        return (
          <button type="button" key={app.id} className={`dock-item${separated ? ' dock-item--separated' : ''}`} aria-label={app.label} onClick={() => launch(app.id)}>
            <span className="dock-tooltip">{app.label}</span><AppIcon app={app.id} size={Math.max(34, size - 2)} /><i className={running ? 'running' : ''} />
          </button>
        )
      })}
    </nav>
  )
}

function SystemMenu({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`system-menu ${className}`} onPointerDown={(event) => event.stopPropagation()}>{children}</div>
}

type AppleMenuProps = {
  openApp: (app: AppId) => void
  openSettings: () => void
  lock: () => void
  sleep: () => void
  forceQuit: () => void
  restart: () => void
  shutDown: () => void
}

function AppleMenu({ openApp, openSettings, lock, sleep, forceQuit, restart, shutDown }: AppleMenuProps) {
  const [recentOpen, setRecentOpen] = useState(false)
  return (
    <SystemMenu className="apple-menu">
      <button type="button" onClick={() => openApp('about')}>About This Mac</button><hr />
      <button type="button" onClick={openSettings}>{'System Settings\u2026'}</button>
      <button type="button" onClick={() => openApp('safari')}>{'App Store\u2026'}</button><hr />
      <button type="button" aria-expanded={recentOpen} onClick={() => setRecentOpen((current) => !current)}>Recent Items <span>{'\u203a'}</span></button>
      {recentOpen ? <div className="apple-recent-items" role="menu" aria-label="Recent Items"><button type="button" role="menuitem" onClick={() => openApp('safari')}>Project Aurora</button><button type="button" role="menuitem" onClick={() => openApp('notes')}>Read Me.txt</button><button type="button" role="menuitem" onClick={() => openApp('about')}>About Me.md</button></div> : null}
      <hr /><button type="button" onClick={forceQuit}>{'Force Quit\u2026'}</button><hr />
      <button type="button" onClick={sleep}>Sleep</button><button type="button" onClick={lock}>Lock Screen</button><button type="button" onClick={lock}>{'Log Out Renan\u2026'}</button><hr />
      <button type="button" onClick={restart}>{'Restart\u2026'}</button><button type="button" onClick={shutDown}>{'Shut Down\u2026'}</button>
    </SystemMenu>
  )
}

function ForceQuitDialog({ windows, onQuit, onClose }: { windows: WindowState[]; onQuit: (id: number) => void; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  return (
    <dialog ref={dialogRef} className="force-quit-dialog" aria-label="Force Quit Applications" onCancel={(event) => { event.preventDefault(); onClose() }} onPointerDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <header><strong>Force Quit Applications</strong><button type="button" aria-label="Close Force Quit" onClick={onClose}>Done</button></header>
      <p>{'If an app isn\u2019t responding, select it and click Force Quit.'}</p>
      <div className="force-quit-list">{windows.map((window) => <div key={window.id}><AppIcon app={window.app} size={32} /><span>{window.title}</span><button type="button" onClick={() => onQuit(window.id)}>Force Quit</button></div>)}{windows.length === 0 ? <span className="force-quit-empty">No apps are currently open.</span> : null}</div>
    </dialog>
  )
}

function FileMenu({ openApp }: { openApp: (app: AppId) => void }) {
  return <SystemMenu className="file-menu"><button type="button" onClick={() => openApp('finder')}>New Finder Window <kbd>⌘N</kbd></button><button type="button" onClick={() => openApp('notes')}>New Note <kbd>⌘⇧N</kbd></button><hr /><button type="button">Open… <kbd>⌘O</kbd></button><button type="button">Get Info <kbd>⌘I</kbd></button><hr /><button type="button">Move to Trash <kbd>⌘⌫</kbd></button></SystemMenu>
}

function MenuCommand({
  children,
  shortcut,
  checked = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode
  shortcut?: string
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      <span className="menu-command__label"><i>{checked ? <Check size={12} strokeWidth={2.5} /> : null}</i>{children}</span>
      {shortcut ? <kbd>{shortcut}</kbd> : null}
    </button>
  )
}

function EditMenu({ close }: { close: () => void }) {
  return (
    <SystemMenu className="edit-menu">
      <MenuCommand shortcut="⌘Z" disabled>Undo</MenuCommand>
      <MenuCommand shortcut="⇧⌘Z" disabled>Redo</MenuCommand>
      <hr />
      <MenuCommand shortcut="⌘X" onClick={close}>Cut</MenuCommand>
      <MenuCommand shortcut="⌘C" onClick={close}>Copy</MenuCommand>
      <MenuCommand shortcut="⌘V" onClick={close}>Paste</MenuCommand>
      <MenuCommand shortcut="⌘A" onClick={close}>Select All</MenuCommand>
      <hr />
      <MenuCommand onClick={close}>Start Dictation… <span>🎙</span></MenuCommand>
      <MenuCommand onClick={close}>Emoji & Symbols <span>›</span></MenuCommand>
    </SystemMenu>
  )
}

function ViewMenu({
  preferences,
  updatePreferences,
  maximize,
  close,
}: {
  preferences: FinderPreferences
  updatePreferences: (patch: Partial<FinderPreferences>) => void
  maximize: () => void
  close: () => void
}) {
  const selectView = (view: FinderView) => {
    updatePreferences({ view })
    close()
  }
  return (
    <SystemMenu className="view-menu">
      <MenuCommand checked={preferences.view === 'icons'} onClick={() => selectView('icons')}>as Icons</MenuCommand>
      <MenuCommand checked={preferences.view === 'list'} onClick={() => selectView('list')}>as List</MenuCommand>
      <MenuCommand checked={preferences.view === 'columns'} onClick={() => selectView('columns')}>as Columns</MenuCommand>
      <MenuCommand checked={preferences.view === 'gallery'} onClick={() => selectView('gallery')}>as Gallery</MenuCommand>
      <hr />
      <MenuCommand shortcut="⌥⌘S" checked={preferences.showSidebar} onClick={() => updatePreferences({ showSidebar: !preferences.showSidebar })}>Show Sidebar</MenuCommand>
      <MenuCommand shortcut="⇧⌘P" checked={preferences.showPreview} onClick={() => updatePreferences({ showPreview: !preferences.showPreview })}>Show Preview</MenuCommand>
      <MenuCommand shortcut="⌘/" checked={preferences.showStatusBar} onClick={() => updatePreferences({ showStatusBar: !preferences.showStatusBar })}>Show Status Bar</MenuCommand>
      <hr />
      <MenuCommand shortcut="⌃⌘F" onClick={maximize}>Enter Full Screen</MenuCommand>
    </SystemMenu>
  )
}

function GoMenu({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return (
    <SystemMenu className="go-menu">
      <MenuCommand shortcut="⌘[" onClick={close}>Back</MenuCommand>
      <MenuCommand shortcut="⌘]" disabled>Forward</MenuCommand>
      <MenuCommand onClick={close}>Enclosing Folder <span>›</span></MenuCommand>
      <hr />
      <MenuCommand shortcut="⇧⌘F" onClick={() => openApp('finder')}>Recents</MenuCommand>
      <MenuCommand shortcut="⇧⌘O" onClick={() => openApp('about')}>About Me</MenuCommand>
      <MenuCommand shortcut="⇧⌘D" onClick={() => openApp('finder')}>Desktop</MenuCommand>
      <MenuCommand shortcut="⇧⌘P" onClick={() => openApp('finder')}>Portfolio</MenuCommand>
      <MenuCommand shortcut="⌥⌘L" onClick={() => openApp('photos')}>Downloads</MenuCommand>
      <hr />
      <MenuCommand shortcut="⇧⌘G" onClick={close}>Go to Folder…</MenuCommand>
    </SystemMenu>
  )
}

function WindowMenu({
  window,
  minimize,
  maximize,
  close,
}: {
  window?: WindowState
  minimize: () => void
  maximize: () => void
  close: () => void
}) {
  return (
    <SystemMenu className="window-menu">
      <MenuCommand shortcut="⌘M" disabled={!window} onClick={minimize}>Minimize</MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>Zoom</MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>Fill</MenuCommand>
      <MenuCommand disabled>Center</MenuCommand>
      <MenuCommand>Move & Resize <span>›</span></MenuCommand>
      <hr />
      <MenuCommand disabled={!window} onClick={close}>Bring All to Front</MenuCommand>
      <hr />
      <MenuCommand checked={Boolean(window)} onClick={close}>{window?.title ?? 'No Open Windows'}</MenuCommand>
    </SystemMenu>
  )
}

function HelpMenu({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return (
    <SystemMenu className="help-menu">
      <label className="help-search"><Search size={13} /><input aria-label="Search Help" placeholder="Search" /></label>
      <hr />
      <MenuCommand onClick={() => openApp('notes')}>macOS Help</MenuCommand>
      <MenuCommand onClick={() => openApp('about')}>About This Portfolio</MenuCommand>
      <MenuCommand onClick={close}>Keyboard Shortcuts</MenuCommand>
    </SystemMenu>
  )
}

function WifiMenu({ openSettings }: { openSettings: (section: SettingsSectionId) => void }) {
  const [enabled, setEnabled] = useState(true)
  const [network, setNetwork] = useState('Studio Wi-Fi')
  const [showOtherNetworks, setShowOtherNetworks] = useState(false)
  return (
    <SystemMenu className="status-menu wifi-menu">
      <div className="status-menu__heading"><strong>Wi-Fi</strong><button type="button" className={`mac-switch${enabled ? ' is-on' : ''}`} aria-label="Toggle Wi-Fi" onClick={() => setEnabled(!enabled)}><i /></button></div>
      <hr />
      <span className="status-menu__label">Known Networks</span>
      {['Studio Wi-Fi', 'iPhone', 'Guest Network'].map((name, index) => (
        <button type="button" className="network-row" key={name} disabled={!enabled} onClick={() => setNetwork(name)}><Wifi size={15} /><span>{name}</span>{network === name ? <Check size={13} /> : index === 0 ? null : <span className="network-lock">●</span>}</button>
      ))}
      <hr />
      <button type="button" aria-expanded={showOtherNetworks} aria-controls="other-networks" onClick={() => setShowOtherNetworks((visible) => !visible)}>Other Networks… <span>{showOtherNetworks ? '⌄' : '›'}</span></button>
      {showOtherNetworks ? (
        <div className="other-networks" id="other-networks" role="region" aria-label="Other Networks">
          {['Coffee Shop Guest', 'Library Public', 'Phone Hotspot'].map((name, index) => (
            <button type="button" className="network-row" key={name} disabled={!enabled} onClick={() => { setNetwork(name); setShowOtherNetworks(false) }}><Wifi size={15} /><span>{name}</span>{network === name ? <Check size={13} /> : index === 1 ? null : <span className="network-lock">●</span>}</button>
          ))}
        </div>
      ) : null}
      <button type="button" onClick={() => openSettings('wifi')}>Wi-Fi Settings…</button>
    </SystemMenu>
  )
}

function BatteryMenu({ openSettings, lowPower, setLowPower }: { openSettings: (section: SettingsSectionId) => void; lowPower: boolean; setLowPower: (value: boolean) => void }) {
  return (
    <SystemMenu className="status-menu battery-menu">
      <div className={`battery-summary${lowPower ? ' is-low-power' : ''}`}><BatteryCharging size={32} /><span><strong>Battery</strong><small>{lowPower ? '84% · Low Power Mode' : '84% · Power Adapter'}</small></span></div>
      <hr />
      <div className="status-menu__heading"><span><strong>Low Power Mode</strong><small>Reduces energy use</small></span><button type="button" className={`mac-switch${lowPower ? ' is-on' : ''}`} aria-label="Toggle Low Power Mode" aria-pressed={lowPower} onClick={() => setLowPower(!lowPower)}><i /></button></div>
      <hr />
      <button type="button" onClick={() => openSettings('battery')}>Battery Settings…</button>
    </SystemMenu>
  )
}

function SiriMenu({ openApp }: { openApp: (app: AppId) => void }) {
  const [query, setQuery] = useState('')
  return (
    <div className="siri-panel" onPointerDown={(event) => event.stopPropagation()}>
      <div className="siri-panel__orb"><span /></div>
      <strong>{query ? 'Here’s what I found.' : 'What can I help with?'}</strong>
      <form onSubmit={(event) => { event.preventDefault(); if (query.toLowerCase().includes('project')) openApp('safari') }}><input autoFocus aria-label="Ask Siri" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask Siri" /></form>
      {query ? <p>Try “open projects” or use Spotlight with ⌘ Space.</p> : null}
    </div>
  )
}

function ControlCenter({
  dark,
  setDark,
  brightness,
  setBrightness,
  systemPreferences,
  updateSystemPreferences,
}: {
  dark: boolean
  setDark: (value: boolean) => void
  brightness: number
  setBrightness: (value: number) => void
  systemPreferences: SystemPreferences
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void
}) {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  return <SystemMenu className="control-center"><div className="control-grid"><button type="button" className={wifi ? 'on' : ''} onClick={() => setWifi(!wifi)}><span><Wifi size={18} /></span><div><strong>Wi-Fi</strong><small>{wifi ? 'Home' : 'Off'}</small></div></button><button type="button" className={bluetooth ? 'on' : ''} onClick={() => setBluetooth(!bluetooth)}><span><Bluetooth size={18} /></span><div><strong>Bluetooth</strong><small>{bluetooth ? 'On' : 'Off'}</small></div></button><button type="button" onClick={() => setDark(!dark)}><span>{dark ? <Moon size={18} /> : <Sun size={18} />}</span><div><strong>Appearance</strong><small>{dark ? 'Dark' : 'Light'}</small></div></button><button type="button" className={systemPreferences.doNotDisturb ? 'on' : ''} aria-pressed={systemPreferences.doNotDisturb} onClick={() => updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb })}><span><Moon size={18} /></span><div><strong>Focus</strong><small>{systemPreferences.doNotDisturb ? 'Do Not Disturb' : 'Off'}</small></div></button></div><label className="slider-control"><span><Volume2 size={16} /> Sound</span><input aria-label="Sound volume" type="range" min="0" max="100" value={systemPreferences.volume} onChange={(event) => updateSystemPreferences({ volume: Number(event.target.value) })} /></label><label className="slider-control"><span><Sun size={16} /> Display</span><input aria-label="Display brightness" type="range" min="10" max="100" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} /></label></SystemMenu>
}

function NotificationCenter({ doNotDisturb }: { doNotDisturb: boolean }) {
  const now = useClock()
  return <aside className="notification-center"><div className="notification-date"><span>{now.toLocaleDateString('en-US', { weekday: 'long' })}</span><strong>{now.getDate()}</strong></div>{doNotDisturb ? <div className="focus-notice"><span><Moon size={18} fill="currentColor" /></span><div><strong>Do Not Disturb</strong><p>Notifications are silenced.</p></div></div> : null}<div className={`notification${doNotDisturb ? ' is-silenced' : ''}`}><span className="notification-icon"><Sparkles size={18} /></span><div><strong>Portfolio</strong><small>Now</small><p>Welcome. Double-click a file or choose an app from the Dock.</p></div></div><div className={`notification${doNotDisturb ? ' is-silenced' : ''}`}><span className="notification-icon notification-icon--messages"><MessageCircle size={18} /></span><div><strong>Messages</strong><small>10m ago</small><p>There’s always room for another good idea.</p></div></div></aside>
}

function Spotlight({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => launchpadApps.filter((app) => app.label.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="spotlight"><div className="spotlight-search"><Search size={25} /><input autoFocus placeholder="Spotlight Search" value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="spotlight-results">{results.map((app) => <button type="button" key={app.id} onClick={() => { openApp(app.id); close() }}><AppIcon app={app.id} size={38} /><span><strong>{app.label}</strong><small>Application</small></span><kbd>↵</kbd></button>)}</div></div>
}

function Launchpad({ openApp, close }: { openApp: (app: AppId) => void; close: () => void }) {
  return <div className="launchpad"><label><Search size={16} /><input autoFocus placeholder="Search" /></label><div className="launchpad-grid">{launchpadApps.map((app) => <button type="button" key={app.id} onClick={() => { openApp(app.id); close() }}><AppIcon app={app.id} size={72} /><span>{app.label}</span></button>)}</div></div>
}

function BootScreen() {
  return <main className="boot-screen" aria-label="macOS is starting"><AppleMark /><div className="boot-progress" role="progressbar" aria-label="Starting macOS" aria-valuemin={0} aria-valuemax={100}><span className="boot-progress__fill" /></div></main>
}

function SleepScreen({ wake }: { wake: () => void }) {
  return <button type="button" className="sleep-screen" aria-label="Wake Mac" onClick={wake}><span>Click to wake</span></button>
}

function ShutdownScreen({ powerOn }: { powerOn: () => void }) {
  return <main className="shutdown-screen"><button type="button" onClick={powerOn}><AppleMark /><span>Start Up</span></button></main>
}

function LoginScreen({ enter }: { enter: () => void }) {
  const now = useClock()
  return (
    <button type="button" className="login-screen" onClick={enter} aria-label="Click to enter portfolio">
      <div className="login-time"><span>{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span><strong>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</strong></div>
      <div className="login-user"><span className="login-avatar">R</span><strong>Renan</strong><small>Click to log in</small></div>
    </button>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [windows, dispatch] = useReducer(windowReducer, [initialWindow])
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [dark, setDark] = useState(false)
  const [accentColor, setAccentColorState] = useState<AccentColorId>(readAccentColor)
  const [lowPower, setLowPower] = useState(false)
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId>('appearance')
  const [finderPreferences, setFinderPreferences] = useState<FinderPreferences>(readFinderPreferences)
  const [systemPreferences, setSystemPreferences] = useState<SystemPreferences>(readSystemPreferences)
  const [brightness, setBrightnessState] = useState(readBrightness)
  const [selectedNoteId, setSelectedNoteId] = useState<NoteId>('welcome')
  const [completedTasks, setCompletedTasks] = useState<TodayTaskId[]>(readCompletedTasks)
  const [showDesktop, setShowDesktop] = useState(false)
  const [finderSection, setFinderSection] = useState('Portfolio')
  const [selectedDesktopFile, setSelectedDesktopFile] = useState<DesktopFileId | null>(null)
  const [bootMode, setBootMode] = useState<BootMode>('startup')
  const [powerState, setPowerState] = useState<PowerState>('awake')
  const [systemDialog, setSystemDialog] = useState<SystemDialog>(null)

  const activeWindow = [...windows].filter((window) => !window.minimized).sort((a, b) => b.z - a.z)[0]
  const fullscreenWindow = windows.find((window) => window.maximized && !window.minimized)
  const activeApp = activeWindow?.app ?? 'finder'
  const accent = ACCENT_COLORS[accentColor]
  const desktopStyle = {
    '--system-blue': accent.color,
    '--system-blue-deep': accent.deep,
    '--keyboard-focus': accent.color,
    '--link-color': accent.deep,
  } as CSSProperties
  const openApp = useCallback((app: AppId) => {
    setShowDesktop(false)
    dispatch({ type: 'open', app })
    setOverlay(null)
  }, [])
  const openSettings = useCallback((section: SettingsSectionId) => {
    setSettingsSection(section)
    openApp('settings')
  }, [openApp])
  const launch = useCallback((app: DockId) => {
    setShowDesktop(false)
    if (app === 'launchpad') return setOverlay(overlay === 'launchpad' ? null : 'launchpad')
    if (app === 'mail') return openApp('messages')
    if (app === 'trash') {
      setFinderSection('Trash')
      return openApp('finder')
    }
    openApp(app)
  }, [openApp, overlay])
  const closeOverlay = useCallback(() => setOverlay(null), [])
  const updateFinderPreferences = useCallback((patch: Partial<FinderPreferences>) => {
    const next = { ...finderPreferences, ...patch }
    setFinderPreferences(next)
    try { globalThis.localStorage?.setItem('macos27:finder-preferences', JSON.stringify(next)) } catch { /* Keep the in-memory preference. */ }
  }, [finderPreferences])
  const updateSystemPreferences = useCallback((patch: Partial<SystemPreferences>) => {
    const next = { ...systemPreferences, ...patch }
    setSystemPreferences(next)
    try { globalThis.localStorage?.setItem('macos27:system-preferences', JSON.stringify(next)) } catch { /* Keep the in-memory preference. */ }
  }, [systemPreferences])
  const setBrightness = useCallback((value: number) => {
    setBrightnessState(value)
    try { globalThis.localStorage?.setItem('macos27:display-brightness', String(value)) } catch { /* Keep the in-memory brightness. */ }
  }, [])
  const updateAccentColor = useCallback((value: AccentColorId) => {
    setAccentColorState(value)
    try { globalThis.localStorage?.setItem('macos27:accent-color', value) } catch { /* Keep the in-memory accent. */ }
  }, [])
  const toggleTask = useCallback((taskId: TodayTaskId) => {
    const next = completedTasks.includes(taskId) ? completedTasks.filter((id) => id !== taskId) : [...completedTasks, taskId]
    setCompletedTasks(next)
    try { globalThis.localStorage?.setItem('macos27:today-completed', JSON.stringify(next)) } catch { /* Keep the in-memory checklist. */ }
  }, [completedTasks])
  const openNote = useCallback((noteId: NoteId) => {
    setSelectedNoteId(noteId)
    openApp('notes')
  }, [openApp])
  const minimizeActiveWindow = () => {
    setShowDesktop(false)
    if (activeWindow) dispatch({ type: 'minimize', id: activeWindow.id })
    setOverlay(null)
  }
  const maximizeActiveWindow = () => {
    setShowDesktop(false)
    if (activeWindow) dispatch({ type: 'toggleMaximize', id: activeWindow.id })
    setOverlay(null)
  }
  const focusActiveWindow = () => {
    setShowDesktop(false)
    if (activeWindow) dispatch({ type: 'focus', id: activeWindow.id })
    setOverlay(null)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Space') {
        event.preventDefault()
        setOverlay((current) => current === 'spotlight' ? null : 'spotlight')
      }
      if (event.key === 'Escape') {
        setOverlay(null)
        setShowDesktop(false)
      }
    }
    globalThis.addEventListener('keydown', onKeyDown)
    return () => globalThis.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!bootMode) return
    const timer = globalThis.setTimeout(() => setBootMode(null), 2000)
    return () => globalThis.clearTimeout(timer)
  }, [bootMode])

  if (bootMode) return <BootScreen />
  if (powerState === 'sleeping') return <SleepScreen wake={() => setPowerState('awake')} />
  if (powerState === 'shutdown') return <ShutdownScreen powerOn={() => { setPowerState('awake'); setBootMode('startup') }} />

  const revealableWindows = windows.filter((window) => !window.minimized && !window.maximized)
  const revealEdgeByWindow = new Map(revealableWindows.map((window, index) => [window.id, DESKTOP_REVEAL_EDGES[index % DESKTOP_REVEAL_EDGES.length]]))
  const revealIndexByWindow = new Map(revealableWindows.map((window, index) => [window.id, index]))

  const onDesktopPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    setOverlay(null)
    if (event.target !== event.currentTarget) return
    setSelectedDesktopFile(null)
    if (fullscreenWindow || revealableWindows.length === 0) return
    setShowDesktop((current) => !current)
  }

  return (
    <main className={`desktop${dark ? ' desktop--dark' : ''}${fullscreenWindow ? ' desktop--fullscreen' : ''}${showDesktop ? ' desktop--showing-desktop' : ''}${systemPreferences.dockAutoHide ? ' desktop--dock-autohide' : ''}`} style={desktopStyle} onPointerDown={onDesktopPointerDown}>
      {!loggedIn ? <LoginScreen enter={() => setLoggedIn(true)} /> : (
        <>
          <DesktopWidgets windows={windows} dark={dark} lowPower={lowPower} brightness={brightness} completedTasks={completedTasks} onToggleTask={toggleTask} onOpenNote={openNote} openSettings={() => openSettings('appearance')} />
          <DesktopFiles openApp={openApp} selectedFile={selectedDesktopFile} onSelectFile={setSelectedDesktopFile} />
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
          <MenuBar activeApp={activeApp} overlay={overlay} onOverlay={setOverlay} lowPower={lowPower} doNotDisturb={systemPreferences.doNotDisturb} setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })} />
          {overlay === 'apple' ? <AppleMenu openApp={openApp} openSettings={() => openSettings('appearance')} lock={() => { setShowDesktop(false); setLoggedIn(false); setOverlay(null) }} sleep={() => { setOverlay(null); setPowerState('sleeping') }} forceQuit={() => { setOverlay(null); setSystemDialog('force-quit') }} restart={() => { setOverlay(null); setLoggedIn(false); setBootMode('restart') }} shutDown={() => { setOverlay(null); setLoggedIn(false); setPowerState('shutdown') }} /> : null}
          {overlay === 'file' ? <FileMenu openApp={openApp} /> : null}
          {overlay === 'edit' ? <EditMenu close={closeOverlay} /> : null}
          {overlay === 'view' ? <ViewMenu preferences={finderPreferences} updatePreferences={updateFinderPreferences} maximize={maximizeActiveWindow} close={closeOverlay} /> : null}
          {overlay === 'go' ? <GoMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === 'window' ? <WindowMenu window={activeWindow} minimize={minimizeActiveWindow} maximize={maximizeActiveWindow} close={focusActiveWindow} /> : null}
          {overlay === 'help' ? <HelpMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === 'wifi' ? <WifiMenu openSettings={openSettings} /> : null}
          {overlay === 'battery' ? <BatteryMenu openSettings={openSettings} lowPower={lowPower} setLowPower={setLowPower} /> : null}
          {overlay === 'siri' ? <SiriMenu openApp={openApp} /> : null}
          {overlay === 'control' ? <ControlCenter dark={dark} setDark={setDark} brightness={brightness} setBrightness={setBrightness} systemPreferences={systemPreferences} updateSystemPreferences={updateSystemPreferences} /> : null}
          {overlay === 'notifications' ? <NotificationCenter doNotDisturb={systemPreferences.doNotDisturb} /> : null}
          {overlay === 'spotlight' ? <Spotlight openApp={openApp} close={() => setOverlay(null)} /> : null}
          {overlay === 'launchpad' ? <Launchpad openApp={openApp} close={() => setOverlay(null)} /> : null}
          {systemDialog === 'force-quit' ? <ForceQuitDialog windows={windows} onQuit={(id) => dispatch({ type: 'close', id })} onClose={() => setSystemDialog(null)} /> : null}
          <div className="dock-hotzone" aria-hidden="true" />
          <Dock windows={windows} launch={launch} size={systemPreferences.dockSize} showRecentApps={systemPreferences.showRecentApps} />
          <div className="display-dimmer" aria-hidden="true" style={{ opacity: Math.max(0, (100 - brightness) / 100 * 0.55) }} />
        </>
      )}
    </main>
  )
}
