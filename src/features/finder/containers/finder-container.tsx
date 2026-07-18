import { useMemo, useState } from 'react';

import { copyPortfolioLink } from '@/features/finder/adapters/portfolio-link-clipboard';
import { FinderFiles } from '@/features/finder/components/finder-files';
import { FinderPreview } from '@/features/finder/components/finder-preview';
import { FinderSidebar } from '@/features/finder/components/finder-sidebar';
import { FinderStatusBar } from '@/features/finder/components/finder-status-bar';
import { FinderToolbar } from '@/features/finder/components/finder-toolbar';
import { FINDER_SECTIONS } from '@/features/finder/domain/constants/finder-sections';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { FinderToolbarMenu } from '@/features/finder/domain/enums/finder-toolbar-menu';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import { useFinderActions } from '@/features/finder/hooks/use-finder-actions';
import { useFinderState } from '@/features/finder/hooks/use-finder-state';
import { AppId } from '@/shared/domain/enums/app-id';

type FinderContainerProps = {
  openApp: (app: AppId) => void;
};

export function FinderContainer({ openApp }: FinderContainerProps) {
  const { preferences, section } = useFinderState();
  const { setSection, updatePreferences } = useFinderActions();
  const [query, setQuery] = useState('');
  const [toolbarMenu, setToolbarMenu] = useState<FinderToolbarMenu | null>(null);
  const [shareStatus, setShareStatus] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const filteredItems = useMemo(() => {
    const sectionItems = FINDER_SECTIONS[section] ?? [];
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return sectionItems;
    return sectionItems.filter((item) => item.name.toLocaleLowerCase().includes(normalized));
  }, [query, section]);
  const canResizeIcons = preferences.view === FinderView.ICONS;

  const selectSection = (nextSection: FinderSection) => {
    setSection(nextSection);
    setQuery('');
    setToolbarMenu(null);
    setSelectedItem(null);
  };

  const shareInMessages = () => {
    setToolbarMenu(null);
    openApp(AppId.MESSAGES);
  };

  const copyCurrentPortfolioLink = async () => {
    setShareStatus(await copyPortfolioLink());
  };

  return (
    <div className='finder-app [&.finder-app]:h-full [&.finder-app]:flex'>
      {preferences.showSidebar ? (
        <FinderSidebar section={section} onSelectSection={selectSection} />
      ) : null}
      <main className='finder-content [&.finder-content]:min-w-0 [&.finder-content]:flex-1 [&.finder-content]:flex [&.finder-content]:flex-col [&.finder-content]:[background:var(--material-content)] [&.finder-content]:text-(--text-color)'>
        <FinderToolbar
          section={section}
          query={query}
          toolbarMenu={toolbarMenu}
          shareStatus={shareStatus}
          preferences={preferences}
          onQueryChange={setQuery}
          onToggleShareMenu={() => {
            setShareStatus('');
            setToolbarMenu(
              toolbarMenu === FinderToolbarMenu.SHARE ? null : FinderToolbarMenu.SHARE,
            );
          }}
          onToggleMoreMenu={() =>
            setToolbarMenu(toolbarMenu === FinderToolbarMenu.MORE ? null : FinderToolbarMenu.MORE)
          }
          onCloseMenu={() => setToolbarMenu(null)}
          onShareInMessages={shareInMessages}
          onCopyPortfolioLink={() => void copyCurrentPortfolioLink()}
          onUpdatePreferences={updatePreferences}
        />
        <div className='finder-workspace [&.finder-workspace]:min-h-0 [&.finder-workspace]:flex-1 [&.finder-workspace]:flex'>
          <FinderFiles
            view={preferences.view}
            iconSize={preferences.iconSize}
            section={section}
            query={query}
            items={filteredItems}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            onOpenApp={openApp}
          />
          {preferences.showPreview ? <FinderPreview /> : null}
        </div>
        {preferences.showStatusBar ? (
          <FinderStatusBar
            itemCount={filteredItems.length}
            preferences={preferences}
            canResizeIcons={canResizeIcons}
            onUpdatePreferences={updatePreferences}
          />
        ) : null}
      </main>
    </div>
  );
}
