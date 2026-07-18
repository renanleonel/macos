import type { DockApplication } from '@/features/desktop/domain/models/dock-application';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';

function registeredApplication(id: AppId): DockApplication {
  const application = APPLICATION_REGISTRY[id];
  return { id, label: application.dockLabel ?? application.label };
}

export const DOCK_APPLICATIONS: DockApplication[] = [
  registeredApplication(AppId.FINDER),
  { id: DockUtilityId.LAUNCHPAD, label: 'Apps' },
  registeredApplication(AppId.SAFARI),
  registeredApplication(AppId.MESSAGES),
  { id: DockUtilityId.MAIL, label: 'Mail' },
  registeredApplication(AppId.PHOTOS),
  registeredApplication(AppId.NOTES),
  registeredApplication(AppId.TERMINAL),
  registeredApplication(AppId.SETTINGS),
  { id: DockUtilityId.TRASH, label: 'Trash' },
];
