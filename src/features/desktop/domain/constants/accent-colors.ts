import { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';

type AccentColor = {
  label: string;
  color: string;
  deep: string;
};

export const ACCENT_COLORS: Record<AccentColorId, AccentColor> = {
  [AccentColorId.BLUE]: { label: 'Blue', color: '#168bf4', deep: '#0874d1' },
  [AccentColorId.PURPLE]: { label: 'Purple', color: '#8d67e8', deep: '#7450c8' },
  [AccentColorId.PINK]: { label: 'Pink', color: '#e65b9a', deep: '#ca3f7d' },
  [AccentColorId.ORANGE]: { label: 'Orange', color: '#ed8a3d', deep: '#d36d24' },
  [AccentColorId.GREEN]: { label: 'Green', color: '#43a96b', deep: '#328853' },
  [AccentColorId.GRAPHITE]: { label: 'Graphite', color: '#727b86', deep: '#59616b' },
};
