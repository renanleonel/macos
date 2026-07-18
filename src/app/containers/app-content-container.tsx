import { AboutContent } from '@/features/about/components/about-content';
import { SettingsContentContainer } from '@/app/containers/settings-content-container';
import { FinderContainer } from '@/features/finder/containers/finder-container';
import { MessagesContainer } from '@/features/messages/containers/messages-container';
import { NotesContainer } from '@/features/notes/containers/notes-container';
import { PhotosContent } from '@/features/photos/components/photos-content';
import { SafariContent } from '@/features/safari/components/safari-content';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { TerminalContainer } from '@/features/terminal/containers/terminal-container';
import { AppId } from '@/shared/domain/enums/app-id';

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
  switch (app) {
    case AppId.FINDER:
      return <FinderContainer openApp={openApp} />;
    case AppId.SAFARI:
      return <SafariContent />;
    case AppId.MESSAGES:
      return <MessagesContainer />;
    case AppId.PHOTOS:
      return <PhotosContent />;
    case AppId.NOTES:
      return <NotesContainer />;
    case AppId.TERMINAL:
      return <TerminalContainer />;
    case AppId.SETTINGS:
      return (
        <SettingsContentContainer
          settingsSection={settingsSection}
          setSettingsSection={setSettingsSection}
        />
      );
    case AppId.ABOUT:
      return <AboutContent />;
  }
}
