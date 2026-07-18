import { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type {
  SettingsPanel,
  SettingsPanelSectionId,
} from '@/features/settings/domain/models/settings-panel';

export const SETTINGS_PANEL_COPY: Record<SettingsPanelSectionId, SettingsPanel> = {
  [SettingsSectionId.WIFI]: {
    description: 'Connect to nearby networks and manage wireless access.',
    controls: [
      {
        id: SettingsControlId.WIFI_ENABLED,
        title: 'Wi-Fi',
        detail: 'Connected to Portfolio Studio',
        defaultChecked: true,
      },
      {
        id: SettingsControlId.WIFI_ASK,
        title: 'Ask to join networks',
        detail: 'Show available networks when no known network is found.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.BLUETOOTH]: {
    description: 'Connect keyboards, headphones, and other nearby devices.',
    controls: [
      {
        id: SettingsControlId.BLUETOOTH_ENABLED,
        title: 'Bluetooth',
        detail: "This Mac is discoverable as Renan's Mac.",
        defaultChecked: true,
      },
      {
        id: SettingsControlId.BLUETOOTH_AIRDROP,
        title: 'Nearby sharing',
        detail: 'Allow contacts to discover this device.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.NETWORK]: {
    description: 'Review connection privacy and network protections.',
    controls: [
      {
        id: SettingsControlId.NETWORK_FIREWALL,
        title: 'Firewall',
        detail: 'Block unwanted incoming connections.',
        defaultChecked: true,
      },
      {
        id: SettingsControlId.NETWORK_PRIVATE,
        title: 'Private address',
        detail: 'Use a rotating address on Wi-Fi networks.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.NOTIFICATIONS]: {
    description: 'Choose how portfolio updates appear while you explore.',
    controls: [
      {
        id: SettingsControlId.NOTIFICATIONS_ALLOW,
        title: 'Allow notifications',
        detail: 'Show useful updates from the portfolio.',
        defaultChecked: true,
      },
      {
        id: SettingsControlId.NOTIFICATIONS_PREVIEW,
        title: 'Show previews',
        detail: 'Include a short preview in notification cards.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.SOUND]: {
    description: 'Tune interface feedback and alert sounds.',
    controls: [
      {
        id: SettingsControlId.SOUND_INTERFACE,
        title: 'Play interface sounds',
        detail: 'Use subtle feedback for important actions.',
        defaultChecked: true,
      },
      {
        id: SettingsControlId.SOUND_FEEDBACK,
        title: 'Play feedback when volume changes',
        detail: 'Confirm volume adjustments with a quiet tone.',
        defaultChecked: false,
      },
    ],
  },
  [SettingsSectionId.BATTERY]: {
    description: 'Review power usage and choose how this desktop conserves energy.',
    controls: [
      {
        id: SettingsControlId.BATTERY_LOW_POWER,
        title: 'Low Power Mode',
        detail: 'Reduce background activity and energy use.',
        defaultChecked: false,
      },
      {
        id: SettingsControlId.BATTERY_OPTIMIZED,
        title: 'Optimized charging',
        detail: 'Reduce battery aging by learning your charging routine.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.FOCUS]: {
    description: 'Reduce interruptions when you are concentrating.',
    controls: [
      {
        id: SettingsControlId.FOCUS_DO_NOT_DISTURB,
        title: 'Do Not Disturb',
        detail: 'Silence non-essential notifications.',
        defaultChecked: false,
      },
      {
        id: SettingsControlId.FOCUS_SHARE,
        title: 'Share focus status',
        detail: 'Let supported apps know notifications are silenced.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.GENERAL]: {
    description: 'Keep this desktop experience current and connected.',
    controls: [
      {
        id: SettingsControlId.GENERAL_UPDATES,
        title: 'Automatic updates',
        detail: 'Install portfolio improvements when available.',
        defaultChecked: true,
      },
      {
        id: SettingsControlId.GENERAL_HANDOFF,
        title: 'Continue between apps',
        detail: 'Keep the current portfolio context when opening another app.',
        defaultChecked: true,
      },
    ],
  },
  [SettingsSectionId.DESKTOP]: {
    description: 'Adjust how the desktop and Dock behave.',
    controls: [
      {
        id: SettingsControlId.DESKTOP_AUTO_HIDE,
        title: 'Automatically hide the Dock',
        detail: 'Reveal it when the pointer reaches the screen edge.',
        defaultChecked: false,
      },
      {
        id: SettingsControlId.DESKTOP_RECENTS,
        title: 'Show recent applications',
        detail: 'Keep recently used apps at the end of the Dock.',
        defaultChecked: true,
      },
    ],
  },
};
