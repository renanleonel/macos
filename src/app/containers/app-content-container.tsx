import { lazy, Suspense, type ReactNode } from 'react';

import { AppContentLoading } from '@/app/components/app-content-loading';
import { FinderContainer } from '@/features/finder/containers/finder-container';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { AppId } from '@/shared/domain/enums/app-id';

const AboutContent = lazy(() =>
  import('@/features/about/components/about-content').then(({ AboutContent }) => ({
    default: AboutContent,
  })),
);
const MessagesContainer = lazy(() =>
  import('@/features/messages/containers/messages-container').then(({ MessagesContainer }) => ({
    default: MessagesContainer,
  })),
);
const NotesContainer = lazy(() =>
  import('@/features/notes/containers/notes-container').then(({ NotesContainer }) => ({
    default: NotesContainer,
  })),
);
const PhotosContent = lazy(() =>
  import('@/features/photos/components/photos-content').then(({ PhotosContent }) => ({
    default: PhotosContent,
  })),
);
const SafariContent = lazy(() =>
  import('@/features/safari/components/safari-content').then(({ SafariContent }) => ({
    default: SafariContent,
  })),
);
const SettingsContentContainer = lazy(() =>
  import('@/app/containers/settings-content-container').then(({ SettingsContentContainer }) => ({
    default: SettingsContentContainer,
  })),
);
const TerminalContainer = lazy(() =>
  import('@/features/terminal/containers/terminal-container').then(({ TerminalContainer }) => ({
    default: TerminalContainer,
  })),
);

type AppContentContainerProps = {
  app: AppId;
  openApp: (app: AppId) => void;
  settingsSection: SettingsSectionId;
  setSettingsSection: (section: SettingsSectionId) => void;
};

export function AppContentContainer({
  app,
  openApp,
  settingsSection,
  setSettingsSection,
}: AppContentContainerProps) {
  let content: ReactNode;

  switch (app) {
    case AppId.FINDER:
      content = <FinderContainer openApp={openApp} />;
      break;
    case AppId.SAFARI:
      content = <SafariContent />;
      break;
    case AppId.MESSAGES:
      content = <MessagesContainer />;
      break;
    case AppId.PHOTOS:
      content = <PhotosContent />;
      break;
    case AppId.NOTES:
      content = <NotesContainer />;
      break;
    case AppId.TERMINAL:
      content = <TerminalContainer />;
      break;
    case AppId.SETTINGS:
      content = (
        <SettingsContentContainer
          settingsSection={settingsSection}
          setSettingsSection={setSettingsSection}
        />
      );
      break;
    case AppId.ABOUT:
      content = <AboutContent />;
      break;
  }

  return <Suspense fallback={<AppContentLoading />}>{content}</Suspense>;
}
