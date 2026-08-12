import { PROFILE } from '@/shared/domain/constants/profile';

/**
 * The header already carries name, role and company, so these add new detail.
 * Keep the values short — the window is narrow and long values wrap.
 */
export const ABOUT_DEVICE_SPECIFICATIONS = [
  ['Focus', 'React · TypeScript'],
  ['Also', 'Design systems · Testing'],
  ['Education', 'BSc Computer Science, UEM'],
  ['Languages', 'Portuguese · English (C1)'],
  ['Writing', PROFILE.site],
] as const;
