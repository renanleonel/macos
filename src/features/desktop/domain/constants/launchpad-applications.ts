import type { LaunchpadApplication } from '@/features/desktop/domain/models/launchpad-application';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';

const LAUNCHPAD_APPLICATION_IDS = [
  AppId.FINDER,
  AppId.SAFARI,
  AppId.MESSAGES,
  AppId.PHOTOS,
  AppId.NOTES,
  AppId.TERMINAL,
  AppId.SETTINGS,
  AppId.ABOUT,
] as const;

export const LAUNCHPAD_APPLICATIONS: LaunchpadApplication[] = LAUNCHPAD_APPLICATION_IDS.map(
  (id) => {
    const application = APPLICATION_REGISTRY[id];
    return { id, label: application.launchpadLabel ?? application.label };
  },
);
