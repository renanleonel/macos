import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsSection } from '@/features/settings/domain/models/settings-section';

export const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: SettingsSectionId.WIFI, label: 'Wi-Fi', tint: '#168bf4' },
  { id: SettingsSectionId.BLUETOOTH, label: 'Bluetooth', tint: '#3879df' },
  { id: SettingsSectionId.NETWORK, label: 'Network', tint: '#54a464' },
  { id: SettingsSectionId.NOTIFICATIONS, label: 'Notifications', tint: '#dc5650' },
  { id: SettingsSectionId.SOUND, label: 'Sound', tint: '#d9568b' },
  { id: SettingsSectionId.BATTERY, label: 'Battery', tint: '#48a65d' },
  { id: SettingsSectionId.FOCUS, label: 'Focus', tint: '#7265d8' },
  { id: SettingsSectionId.GENERAL, label: 'General', tint: '#7a838e' },
  { id: SettingsSectionId.APPEARANCE, label: 'Appearance', tint: '#735cd8' },
  { id: SettingsSectionId.DESKTOP, label: 'Desktop & Dock', tint: '#328ab8' },
];
